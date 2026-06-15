import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const resend = new Resend(Deno.env.get("RESEND_API_KEY") || "");

const OFFER_URL = "https://hipervinculo.net/amazon-fba-ebook/oferta";

function recoveryHtml(name: string) {
  const firstName = (name || "").split(" ")[0] || "hola";
  return `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
    <div style="text-align:center; padding: 16px 0 24px;">
      <img src="https://hipervinculo.net/logo.png" alt="Hipervínculo" style="height: 36px;" />
    </div>
    <h1 style="font-size: 22px; margin: 0 0 16px; color: #2F4F3E;">${firstName}, te guardamos tu acceso 👇</h1>
    <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
      Vimos que ayer empezaste a comprar la <strong>Guía Amazon FBA Sin Inventario</strong> pero no llegaste a completar el pago.
    </p>
    <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
      Para que no te quedes fuera, te dejamos un acceso directo con el precio especial de <strong>$47 USD</strong> (en lugar de $90).
      Recibirás el PDF en tu correo en menos de 2 minutos después de pagar.
    </p>
    <div style="text-align:center; margin: 28px 0;">
      <a href="${OFFER_URL}?utm_source=email&utm_medium=recovery&utm_campaign=ebook_cart_recovery"
         style="display:inline-block; background:#8BC34A; color:#2F4F3E; text-decoration:none; font-weight:800; padding:14px 28px; border-radius:10px; font-size:16px;">
        Completar mi compra ($47)
      </a>
    </div>
    <p style="font-size: 13px; color:#666; line-height: 1.6; margin: 0 0 8px;">
      Garantía de 7 días: si no te aporta valor, te devolvemos el 100%.
    </p>
    <p style="font-size: 13px; color:#666; line-height: 1.6; margin: 0;">
      ¿Tuviste algún problema con el pago? Respóndeme a este correo y te ayudo personalmente.
    </p>
    <hr style="border:none; border-top:1px solid #eee; margin: 28px 0 16px;" />
    <p style="font-size: 11px; color:#999; text-align:center; margin: 0;">
      Hipervínculo · info@hipervinculo.net
    </p>
  </div>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Find leads redirected to Stripe between 24h and 72h ago
    // that never completed payment and have not yet received recovery email
    const since = new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString();
    const until = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data: leads, error } = await supabase
      .from("ebook_leads")
      .select("id, name, email")
      .eq("checkout_status", "redirected")
      .is("recovery_email_sent_at", null)
      .gte("created_at", since)
      .lte("created_at", until)
      .limit(50);

    if (error) throw error;

    let sent = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const lead of leads || []) {
      // Skip if this email already purchased
      const { data: purchase } = await supabase
        .from("ebook_purchases")
        .select("id")
        .eq("email", lead.email)
        .maybeSingle();

      if (purchase) {
        await supabase
          .from("ebook_leads")
          .update({ recovery_email_sent_at: new Date().toISOString(), checkout_status: "completed" })
          .eq("id", lead.id);
        skipped++;
        continue;
      }

      try {
        await resend.emails.send({
          from: "Hipervínculo <info@hipervinculo.net>",
          to: [lead.email],
          subject: "¿Tuviste algún problema con tu compra? Tu acceso sigue activo",
          html: recoveryHtml(lead.name),
        });
        await supabase
          .from("ebook_leads")
          .update({ recovery_email_sent_at: new Date().toISOString() })
          .eq("id", lead.id);
        sent++;
      } catch (e) {
        const msg = (e as Error).message || String(e);
        errors.push(`${lead.email}: ${msg}`);
        console.error("recovery send failed", lead.email, msg);
      }
    }

    return new Response(
      JSON.stringify({ scanned: leads?.length || 0, sent, skipped, errors }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 },
    );
  } catch (e) {
    const msg = (e as Error).message || String(e);
    console.error("ebook-cart-recovery error", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
