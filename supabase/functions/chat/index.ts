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

// Input validation constants
const MAX_MESSAGE_LENGTH = 2000;
const MAX_MESSAGES = 50;
const RATE_LIMIT_MAX_REQUESTS = 10;
const RATE_LIMIT_WINDOW_SECONDS = 60;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("x-real-ip") || 
                     "unknown";
    
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Rate limiting check
    const rateLimitKey = `chat:${clientIp}`;
    const { data: isAllowed, error: rateLimitError } = await supabase.rpc("check_rate_limit", {
      p_key: rateLimitKey,
      p_max_requests: RATE_LIMIT_MAX_REQUESTS,
      p_window_seconds: RATE_LIMIT_WINDOW_SECONDS,
    });

    if (rateLimitError) {
      console.error("Rate limit check error:", rateLimitError);
      // Continue on error - don't block legitimate requests
    } else if (!isAllowed) {
      console.log(`Rate limit exceeded for ${clientIp}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please wait a moment before trying again." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { messages, conversationId, sessionId, language } = await req.json();
    
    // Input validation
    if (!sessionId || typeof sessionId !== "string" || sessionId.length > 100) {
      return new Response(
        JSON.stringify({ error: "Invalid session ID" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate message content
    const lastUserMessage = messages[messages.length - 1];
    if (!lastUserMessage || lastUserMessage.role !== "user" || 
        typeof lastUserMessage.content !== "string" || 
        lastUserMessage.content.length > MAX_MESSAGE_LENGTH) {
      return new Response(
        JSON.stringify({ error: "Invalid message content" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Session validation: if conversationId is provided, verify it belongs to this session
    let currentConversationId = conversationId;
    if (currentConversationId) {
      const { data: existingConv, error: convCheckError } = await supabase
        .from("chat_conversations")
        .select("session_id")
        .eq("id", currentConversationId)
        .single();

      if (convCheckError || !existingConv) {
        console.error("Conversation not found:", currentConversationId);
        return new Response(
          JSON.stringify({ error: "Invalid conversation" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (existingConv.session_id !== sessionId) {
        console.error(`Session mismatch: expected ${existingConv.session_id}, got ${sessionId}`);
        return new Response(
          JSON.stringify({ error: "Session mismatch" }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    } else {
      // Create new conversation
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
    await supabase.from("chat_messages").insert({
      conversation_id: currentConversationId,
      role: "user",
      content: lastUserMessage.content.substring(0, MAX_MESSAGE_LENGTH),
    });

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
          ...messages.slice(-10).map((m: { role: string; content: string }) => ({
            role: m.role,
            content: typeof m.content === "string" ? m.content.substring(0, MAX_MESSAGE_LENGTH) : "",
          })),
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
