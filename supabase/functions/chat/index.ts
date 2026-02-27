import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Expose-Headers": "X-Conversation-Id",
};

const COMPANY_KNOWLEDGE = `
You are the AI assistant for Hipervínculo, a digital growth agency based in South Florida.

## Company Information
- **Name**: Hipervínculo
- **Location**: 2645 Executive Park Dr, Suite 146, Weston, FL 33331
- **Phone**: +1 (786) 529-0679
- **WhatsApp**: +1 (954) 205-9049
- **Email**: info@hipervinculo.net
- **Website**: hipervinculo.net
- **Experience**: 20+ years in digital growth

## Services & Pricing

### 1. Lead Generation Systems
Conversion-focused websites, landing pages, call/form optimization, WhatsApp intake, Google Ads for high-intent searches, and tracking infrastructure.
- Website builds start around **$3,000**
- Monthly lead gen management starts at **$1,250/month**
- No long-term contracts
- Best for: service businesses (plumbers, lawyers, contractors, clinics) that want consistent inbound inquiries

### 2. Conversion Website Development
High-converting sites with optimized UX, built for capturing leads and driving action. Includes full website build/redesign, landing pages, forms + call integration, WhatsApp conversion options, analytics + event tracking.
- Pricing varies by project scope — contact for quote

### 3. Google Ads Management
Search, Shopping, Performance Max — managed for profitability, not just traffic. Profit-first bidding strategies.
- Best for: businesses with proven products/services and clear margins wanting to scale paid search profitably

### 4. eCommerce Growth Partners
Full-funnel paid media for Shopify brands across Meta, Google, Amazon, TikTok — optimized for Net ROAS.
- **Performance Retainer**: Conditional fee — if diagnostic confirms viability, pay only on results (min. 2.5x Net ROAS target)
- **Growth Partnership**: 5% of Net Shopify Sales — for qualified brands with strong historical data
- Best for: eCommerce brands doing $50K+/month in revenue

### 5. Meta Ads Management
- **Starter Plan**: $1,250/month retainer (for Shopify stores billing <$20K/month)
- **Growth Partner**: 5% of net Shopify revenue (for stores billing >$20K/month)
- Includes: static creative design and video editing (no filming/UGC production)
- Uses WeTracked.io for attribution

### 6. Amazon Seller Services
Full-service Amazon account management — advertising, listings, strategy. No logistics/fulfillment.
- Options: Advertising Only (PPC management) or Full Account Management
- Best for: existing Amazon sellers with their own logistics

### 7. Tracking & Attribution
Server-side tracking, GA4, Conversion APIs, custom dashboards. Tools: GTM Server, Meta CAPI, GA4, Triple Whale, Northbeam.
- Essential for businesses spending $10K+/month on paid media

### 8. Custom Enterprise Applications
Tailored web apps: inventory control, production management, CRM, operations dashboards.
- Best for: businesses that have outgrown spreadsheets and need custom workflows

### 9. Landing Page Development
Single-URL conversion tool with full tracking instrumentation (Pixel, GA4, GTM, CAPI, Server-side).
- **Standard**: $1,500
- **Premium**: $2,000
- All packages include hosting

### 10. Shopify Web Development
- **Starter**: $3,000 (up to 5 products)
- **Professional**: $5,000 (up to 25 products)
- **Enterprise**: $10,000+ (custom Liquid development)
- Add-ons: Copywriting ($500), Store Management ($500/month)
- Note: Shopify account creation is NOT included

### 11. Brand Identity Manual Design
Professional brand identity system: logo design, color palettes, typography, usage guidelines, mockups (signage, packaging, merch).
- Excludes source files (AI, PSD, Figma)
- Contact for pricing

## Portfolio / Web Development Case Studies
We've built conversion-focused websites across multiple industries. When discussing projects, ALWAYS include the link to the case study so users can see the details.

Full portfolio: https://hipervinculo.net/portfolio

1. **Step Solution USA** (Manufacturing) — Custom stair treads & nosing manufacturer. Built conversion website with intelligent forms, order collection system, and custom admin dashboard for project management.
   - Live site: https://stepsolutionusa.com/
   - Case study: https://hipervinculo.net/portfolio/step-solution-usa
   - Services: Website Development, Lead Generation Systems, Custom Admin Dashboard
   - Results: +320% qualified leads, 45% reduction in support tickets, +150% dealer network growth

2. **ZERMA Latin America** (Industrial Machinery) — Bilingual digital hub for industrial recycling machinery leader across LATAM. Product catalog, quote request system, ISO-certified brand positioning.
   - Live site: https://zerma-la.com/
   - Case study: https://hipervinculo.net/portfolio/zerma-latin-america
   - Services: Website Development, Multilingual SEO, Lead Generation
   - Results: +200% quote requests, 3x LATAM market reach, +85% organic visibility

3. **Filtro Láser para Plástico** (Industrial Equipment) — Dedicated product landing page for high-precision self-cleaning filters with AI-powered chat for product questions.
   - Live site: https://filtrolaserparaplastico.com/
   - Case study: https://hipervinculo.net/portfolio/filtro-laser
   - Services: Landing Page Development, AI Chatbot, Lead Generation
   - Results: +170% qualified leads, 4.2% conversion rate, 28s avg. time to first interaction

4. **Pulverizadores Industriales** (Industrial Equipment) — Spanish-language website for Reduction International's industrial pulverizers targeting LATAM market. Video integration and AI product assistant.
   - Live site: https://pulverizadoresindustriales.com/
   - Case study: https://hipervinculo.net/portfolio/pulverizadores-industriales
   - Services: Website Development, AI Chatbot, Video Integration, Lead Generation
   - Results: +220% quote requests, 60% leads from LATAM, +110% organic traffic

5. **Stillwater Day Spa** (Wellness & Spa) — Luxury day spa website with online booking integration, first-visit specials, and membership enrollment flow.
   - Live site: https://stillwaterdayspa.com/
   - Case study: https://hipervinculo.net/portfolio/stillwater-day-spa
   - Services: Website Development, Booking Integration, Lead Generation
   - Results: +240% online bookings, 35% new clients from web, +90% membership sign-ups

6. **Rasetta Innovations** (Interior Design) — Premium web presence for residential and commercial design studio. Elegant visual identity optimized for lead generation.
   - Live site: https://rasettainnovations.com/
   - Case study: https://hipervinculo.net/portfolio/rasetta-innovations
   - Services: Website Development, Brand Identity, Lead Generation
   - Results: +180% consultation requests, 2.1s page load, +65% organic traffic

7. **Lajex LLC** (Plumbing & Water Purification) — Bilingual website for licensed plumbing and KENAI water purification systems in South Florida (Miami-Dade, Broward, Palm Beach).
   - Live site: https://lajexllc.com/
   - Case study: https://hipervinculo.net/portfolio/lajex-llc
   - Services: Website Development, AI Chatbot, Lead Generation
   - Results: +95% inquiries, 1.8s page load, +70% organic traffic

IMPORTANT: When users ask about portfolio, projects, or examples of work, always share the relevant case study links. If they ask generally, link to the full portfolio page.
CRITICAL: ALL links to our website MUST use the domain hipervinculo.net. NEVER use hipervinculo.lovable.app or any other domain. Our official domain is hipervinculo.net.

## Key Differentiators
- Performance marketing and measurable ROI focus
- Bilingual team (English and Spanish)
- Data-driven approach with advanced tracking
- Full-service digital growth partner
- Overall results: +250% Revenue Growth, +180% ROAS Improvement, +320% Qualified Leads

## How to Get Started
- **Free Audit**: Request a free growth audit at https://hipervinculo.net/audit
- **Contact**: Email info@hipervinculo.net or call +1 (786) 529-0679
- **WhatsApp**: Message us at +1 (954) 205-9049
- **Consultation**: Schedule a strategy call

## Response Guidelines
- Be helpful, professional, and friendly
- Answer questions about services, pricing, and processes with specific details from above
- When discussing pricing, share the ranges listed above and note that final pricing depends on project scope
- Encourage users to request a free audit or get in touch for a personalized quote
- If you don't know something specific, suggest contacting the team directly
- IMPORTANT: Detect the language of the user's message and respond in the same language (English or Spanish)
- Keep responses concise — use bullet points when listing multiple items
- CRITICAL: When someone asks what a service includes or how much it costs, ALWAYS lead with the STRATEGIC VALUE and business outcomes first (e.g. "Our Shopify development isn't just building a store — it's engineering a conversion system designed to maximize revenue from day one"). Then briefly mention what's included. Never just list features like a commodity. Frame every service as a growth investment, not a product you buy. Emphasize what makes us different: strategy, tracking, conversion focus, and measurable ROI. Anyone can build a Shopify store for less — we build growth systems.
- CRITICAL: When someone asks "what services do you offer" or similar, you MUST list ALL 11 services. Never skip or summarize. The complete list is: 1) Lead Generation Systems, 2) Conversion Website Development, 3) Google Ads Management, 4) eCommerce Growth Partners, 5) Meta Ads Management, 6) Amazon Seller Services, 7) Tracking & Attribution, 8) Custom Enterprise Applications, 9) Landing Page Development, 10) Shopify Web Development, 11) Brand Identity Manual Design. Always include all 11.
- CRITICAL: NEVER use the domain "lovable.app" in any link. Our official website domain is hipervinculo.net. All internal links must point to https://hipervinculo.net/...
- CRITICAL: When including links, ALWAYS use descriptive markdown link text, NOT the raw URL. For example: [Ver Portfolio](https://hipervinculo.net/portfolio) or [View our Portfolio](https://hipervinculo.net/portfolio). NEVER write [https://hipervinculo.net/portfolio](https://hipervinculo.net/portfolio). The link text should be human-readable like "Ver Portfolio", "Solicitar Auditoría", "Step Solution USA case study", etc.
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
