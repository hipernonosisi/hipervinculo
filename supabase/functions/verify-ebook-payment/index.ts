import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const Body = z.object({ session_id: z.string().trim().min(5).max(200) });

function genToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function sendEmail(to: string, name: string, downloadUrl: string) {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  if (!RESEND_API_KEY || !LOVABLE_API_KEY) {
    console.warn("Missing email keys; skipping send");
    return;
  }
  const html = `<!doctype html><html><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#ffffff;padding:24px;text-align:center;border-bottom:1px solid #f0f0f0;">
          <img src="https://hipervinculo.net/logo-hipervinculo.png" alt="Hipervínculo" width="160" style="display:block;margin:0 auto;background:#ffffff;" />
        </td></tr>
        <tr><td style="padding:32px 28px;">
          <h1 style="margin:0 0 12px;color:#2F4F3E;font-size:24px;font-weight:800;">¡Gracias por tu compra, ${name}!</h1>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#333;">Tu guía <strong>"Amazon FBA Sin Inventario"</strong> está lista para descargar.</p>
          <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#333;">Haz clic en el botón. El enlace es personal: vence en <strong>7 días</strong> y permite hasta <strong>5 descargas</strong>.</p>
          <table cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr><td style="background:#2F4F3E;border-radius:8px;">
            <a href="${downloadUrl}" style="display:inline-block;padding:14px 28px;color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;">Descargar mi guía PDF</a>
          </td></tr></table>
          <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#666;">Si el botón no funciona, copia este enlace en tu navegador:<br/><span style="word-break:break-all;color:#2F4F3E;">${downloadUrl}</span></p>
        </td></tr>
        <tr><td style="background:#f9fafb;padding:20px;text-align:center;font-size:12px;color:#666;border-top:1px solid #f0f0f0;">
          Hipervínculo · info@hipervinculo.net<br/>Si tienes dudas, responde este correo.
        </td></tr>
      </table>
    </td></tr></table></body></html>`;

  const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": RESEND_API_KEY,
    },
    body: JSON.stringify({
      from: "Hipervínculo <noreply@hipervinculo.net>",
      to: [to],
      subject: "Tu guía Amazon FBA Sin Inventario está lista 📘",
      html,
    }),
  });
  if (!res.ok) console.error("Resend send error", res.status, await res.text());
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const parsed = Body.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "invalid session_id" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { session_id } = parsed.data;

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2025-08-27.basil" });
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status !== "paid") {
      return new Response(JSON.stringify({ status: "pending" }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Idempotency: did we already record this session?
    const { data: existing } = await supabase
      .from("ebook_purchases").select("*").eq("stripe_session_id", session_id).maybeSingle();

    const origin = req.headers.get("origin") || "https://hipervinculo.net";
    const projectUrl = Deno.env.get("SUPABASE_URL")!;
    const buildLink = (token: string) =>
      `${projectUrl}/functions/v1/download-ebook?token=${token}`;

    if (existing) {
      return new Response(JSON.stringify({
        status: "ok",
        name: existing.name,
        email: existing.email,
        download_url: buildLink(existing.download_token),
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const md = session.metadata || {};
    const email = session.customer_details?.email || session.customer_email || "";
    const name = md.name || session.customer_details?.name || "Cliente";
    const phone = md.phone || session.customer_details?.phone || null;
    const variant = md.variant || "default";
    const token = genToken();

    const { data: inserted, error: insertErr } = await supabase
      .from("ebook_purchases").insert({
        email, name, phone,
        stripe_session_id: session.id,
        stripe_payment_intent: typeof session.payment_intent === "string" ? session.payment_intent : null,
        amount_cents: session.amount_total ?? 4999,
        currency: session.currency ?? "usd",
        price_variant: variant,
        download_token: token,
        paid_at: new Date().toISOString(),
      }).select().single();

    if (insertErr) throw insertErr;

    const downloadUrl = buildLink(token);
    try {
      await sendEmail(email, name, downloadUrl);
      await supabase.from("ebook_purchases").update({ email_sent_at: new Date().toISOString() }).eq("id", inserted.id);
    } catch (e) {
      console.error("Email send failure", e);
    }

    return new Response(JSON.stringify({
      status: "ok", name, email, download_url: downloadUrl,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("verify-ebook-payment error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
