import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation constants
const MAX_CONTENT_LENGTH = 10000;
const RATE_LIMIT_MAX_REQUESTS = 20;
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
    const rateLimitKey = `save-msg:${clientIp}`;
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
        JSON.stringify({ error: "Too many requests. Please wait a moment." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { conversationId, content } = await req.json();

    // Input validation
    if (!conversationId || typeof conversationId !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid conversationId" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(conversationId)) {
      return new Response(
        JSON.stringify({ error: "Invalid conversationId format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!content || typeof content !== "string" || content.length > MAX_CONTENT_LENGTH) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid content" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate that the conversation exists before inserting
    const { data: existingConv, error: convCheckError } = await supabase
      .from("chat_conversations")
      .select("id")
      .eq("id", conversationId)
      .single();

    if (convCheckError || !existingConv) {
      console.error("Conversation not found:", conversationId);
      return new Response(
        JSON.stringify({ error: "Invalid conversation" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { error } = await supabase.from("chat_messages").insert({
      conversation_id: conversationId,
      role: "assistant",
      content: content.substring(0, MAX_CONTENT_LENGTH),
    });

    if (error) {
      console.error("Error saving assistant message:", error);
      throw new Error("Failed to save message");
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Save message error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
