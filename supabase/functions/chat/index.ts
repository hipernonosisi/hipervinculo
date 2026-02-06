import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const COMPANY_KNOWLEDGE = `
You are the AI assistant for Hipervínculo, a digital marketing agency based in Miami, Florida.

## Company Information
- **Name**: Hipervínculo
- **Location**: 2645 Executive Park Dr, Suite 146, Weston, FL 33331
- **Phone**: +1 (786) 529-0679
- **Email**: info@hipervinculo.net
- **Website**: hipervinculo.net

## Services Offered
1. **Lead Generation Systems**: High-converting lead generation campaigns and infrastructure
2. **Conversion Website Development**: Websites built to capture demand and convert visitors
3. **Google Ads Management**: Expert PPC campaign management and optimization
4. **eCommerce Growth Partners**: Full-service eCommerce growth strategies for Shopify, WooCommerce, etc.
5. **Amazon Seller Services**: Amazon marketplace optimization, listings, advertising
6. **Tracking & Attribution**: Advanced analytics, conversion tracking, and attribution modeling
7. **Custom Enterprise Applications**: Custom web applications for inventory control, production management, CRM, and more

## Key Differentiators
- Focus on performance marketing and measurable ROI
- Bilingual team (English and Spanish)
- Data-driven approach with advanced tracking
- Full-service digital marketing partner
- Results: +250% Revenue Growth, +180% ROAS Improvement, +320% Qualified Leads

## How to Get Started
- Free Audit: Visit the website and request a free growth audit
- Contact: Email info@hipervinculo.net or call +1 (786) 529-0679
- Consultation: Schedule a strategy call to discuss specific needs

## Pricing
- Custom pricing based on project scope and business needs
- Free initial audit and consultation
- Contact for a personalized quote

## Response Guidelines
- Be helpful, professional, and friendly
- Answer questions about services, pricing, and processes
- If asked about specific pricing, explain that it's custom and encourage them to request a free audit
- If you don't know something specific, suggest contacting the team directly
- IMPORTANT: Detect the language of the user's message and respond in the same language (English or Spanish)
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, conversationId, sessionId, language } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create or get conversation
    let currentConversationId = conversationId;
    if (!currentConversationId) {
      const { data: newConversation, error: convError } = await supabase
        .from("chat_conversations")
        .insert({ session_id: sessionId, visitor_language: language })
        .select()
        .single();
      
      if (convError) {
        console.error("Error creating conversation:", convError);
        throw new Error("Failed to create conversation");
      }
      currentConversationId = newConversation.id;
    }

    // Save user message
    const lastUserMessage = messages[messages.length - 1];
    if (lastUserMessage && lastUserMessage.role === "user") {
      await supabase.from("chat_messages").insert({
        conversation_id: currentConversationId,
        role: "user",
        content: lastUserMessage.content,
      });
    }

    // Update conversation timestamp
    await supabase
      .from("chat_conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", currentConversationId);

    const languageInstruction = language === 'es' 
      ? "The user prefers Spanish. Respond in Spanish unless they switch to English."
      : "The user prefers English. Respond in English unless they switch to Spanish.";

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { 
            role: "system", 
            content: `${COMPANY_KNOWLEDGE}\n\n${languageInstruction}` 
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    // Return streaming response with conversation ID in header
    return new Response(response.body, {
      headers: { 
        ...corsHeaders, 
        "Content-Type": "text/event-stream",
        "X-Conversation-Id": currentConversationId,
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
