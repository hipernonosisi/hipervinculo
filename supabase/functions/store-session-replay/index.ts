// Ingests rrweb session replay chunks. Public (no JWT) — anyone visiting the
// ebook landing can post their own session events.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MAX_EVENTS_PER_CHUNK = 2000;
const MAX_BYTES = 1_500_000; // 1.5 MB per chunk safety cap

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "method_not_allowed" }), {
      status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const raw = await req.text();
    if (raw.length > MAX_BYTES) {
      return new Response(JSON.stringify({ error: "payload_too_large" }), {
        status: 413, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const body = JSON.parse(raw);
    const { session_id, chunk_index, events, page_url, user_agent, geo } = body ?? {};

    if (
      typeof session_id !== "string" ||
      typeof chunk_index !== "number" ||
      !Array.isArray(events) ||
      events.length === 0 ||
      events.length > MAX_EVENTS_PER_CHUNK
    ) {
      return new Response(JSON.stringify({ error: "invalid_payload" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { error } = await supabase.from("session_replay_chunks").insert({
      session_id: session_id.slice(0, 120),
      chunk_index,
      events,
      page_url: typeof page_url === "string" ? page_url.slice(0, 500) : null,
      user_agent: typeof user_agent === "string" ? user_agent.slice(0, 500) : null,
      geo: geo && typeof geo === "object" ? geo : null,
    });

    if (error) {
      console.error("[store-session-replay] insert error:", error.message);
      return new Response(JSON.stringify({ error: "insert_failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[store-session-replay] error:", (e as Error).message);
    return new Response(JSON.stringify({ error: "bad_request" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
