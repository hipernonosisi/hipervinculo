import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { Resend } from "npm:resend@2.0.0";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const LOGO = "https://fshfuwinreztcqlumjzp.supabase.co/storage/v1/object/public/email-assets/logo.png?v=1";

const Body = z.object({
  session_id: z.string().trim().min(5).max(200),
  fbp: z.string().optional(),
  fbc: z.string().optional(),
  user_agent: z.string().optional(),
});

const META_PIXEL_ID = "1488250718116666";

type ProductConfig = {
  name: string;
  content_name: string;
  content_ids: string[];
  file_path: string;
  email_subject: string;
  email_title: string;
  admin_label: string;
};

const PRODUCTS: Record<string, ProductConfig> = {
  "amazon-fba": {
    name: "Amazon FBA Sin Inventario",
    content_name: "Amazon FBA Sin Inventario",
    content_ids: ["amazon-fba-ebook"],
    file_path: "amazon-fba-sin-inventario/Amazon_FBA_Sin_Inventario_Hipervinculo.pdf",
    email_subject: "Tu guía Amazon FBA Sin Inventario está lista 📘",
    email_title: "Amazon FBA Sin Inventario",
    admin_label: "Amazon FBA Sin Inventario (eBook PDF)",
  },
  "amazon-ppc": {
    name: "Publicidad en Amazon Sin Quemar tu Dinero",
    content_name: "Publicidad en Amazon Sin Quemar tu Dinero",
    content_ids: ["publicidad-en-amazon"],
    file_path: "publicidad-en-amazon/Publicidad_en_Amazon_SQTD_RELLENABLE_Hipervinculo.pdf",
    email_subject: "Tu guía Publicidad en Amazon Sin Quemar tu Dinero está lista 📘",
    email_title: "Publicidad en Amazon Sin Quemar tu Dinero",
    admin_label: "Publicidad en Amazon Sin Quemar tu Dinero (eBook PDF)",
  },
};

function getProduct(md?: Record<string, string>): ProductConfig {
  const legacy = md?.product;
  const key = (md?.product_key || (legacy === "amazon-fba-sin-inventario" ? "amazon-fba" : "")) || "amazon-fba";
  return PRODUCTS[key] || PRODUCTS["amazon-fba"];
}

async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s.trim().toLowerCase()));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function sendMetaCapiPurchase(p: {
  event_id: string;
  email: string;
  name: string;
  phone: string | null;
  value: number;
  currency: string;
  client_ip: string | null;
  user_agent: string | null;
  fbp: string | null;
  fbc: string | null;
  event_source_url: string;
  product: ProductConfig;
}) {
  const token = Deno.env.get("META_CAPI_ACCESS_TOKEN");
  if (!token) { console.warn("META_CAPI_ACCESS_TOKEN missing, skipping CAPI"); return; }

  const [firstName, ...rest] = (p.name || "").trim().split(/\s+/);
  const lastName = rest.join(" ");
  const phoneDigits = (p.phone || "").replace(/\D/g, "");

  const user_data: Record<string, string | string[]> = {};
  if (p.email) user_data.em = [await sha256Hex(p.email)];
  if (phoneDigits) user_data.ph = [await sha256Hex(phoneDigits)];
  if (firstName) user_data.fn = [await sha256Hex(firstName)];
  if (lastName) user_data.ln = [await sha256Hex(lastName)];
  if (p.client_ip) user_data.client_ip_address = p.client_ip;
  if (p.user_agent) user_data.client_user_agent = p.user_agent;
  if (p.fbp) user_data.fbp = p.fbp;
  if (p.fbc) user_data.fbc = p.fbc;

  const payload: Record<string, unknown> = {
    data: [{
      event_name: "Purchase",
      event_time: Math.floor(Date.now() / 1000),
      event_id: p.event_id,
      action_source: "website",
      event_source_url: p.event_source_url,
      user_data,
      custom_data: {
        currency: p.currency.toUpperCase(),
        value: p.value,
        content_name: p.product.content_name,
        content_type: "product",
        content_ids: p.product.content_ids,
        num_items: 1,
      },
    }],
  };
  const testCode = Deno.env.get("META_TEST_EVENT_CODE");
  if (testCode) (payload as { test_event_code?: string }).test_event_code = testCode;

  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    if (!res.ok) console.error("Meta CAPI error", res.status, text);
    else console.log("Meta CAPI ok", text);
  } catch (e) { console.error("Meta CAPI fetch error", e); }
}


function genToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function sendCustomerEmail(to: string, name: string, downloadUrl: string, product: ProductConfig) {
  const html = `<!doctype html><html><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;padding:32px 0;"><tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <tr><td style="background:#ffffff;padding:24px;text-align:center;border-bottom:1px solid #f0f0f0;">
        <img src="${LOGO}" alt="Hipervínculo" width="160" style="display:block;margin:0 auto;background:#ffffff;" />
      </td></tr>
      <tr><td style="padding:32px 28px;">
        <h1 style="margin:0 0 12px;color:#2F4F3E;font-size:24px;font-weight:800;">¡Gracias por tu compra, ${name}!</h1>
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#333;">Tu guía <strong>"${product.email_title}"</strong> está lista para descargar.</p>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#333;">Haz clic en el botón. El enlace es personal: vence en <strong>7 días</strong> y permite hasta <strong>5 descargas</strong>.</p>
        <table cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr><td style="background:#2F4F3E;border-radius:8px;">
          <a href="${downloadUrl}" style="display:inline-block;padding:14px 28px;color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;">Descargar mi guía PDF</a>
        </td></tr></table>
        <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#666;">Si el botón no funciona, copia este enlace:<br/><span style="word-break:break-all;color:#2F4F3E;">${downloadUrl}</span></p>
      </td></tr>
      <tr><td style="background:#f9fafb;padding:20px;text-align:center;font-size:12px;color:#666;border-top:1px solid #f0f0f0;">
        Hipervínculo · info@hipervinculo.net
      </td></tr>
    </table>
  </td></tr></table></body></html>`;
  await resend.emails.send({
    from: "Hipervínculo <info@hipervinculo.net>",
    to: [to],
    subject: product.email_subject,
    html,
  });
}

async function sendAdminEmail(p: { name: string; email: string; phone: string | null; amount_cents: number; currency: string; session_id: string; variant: string; marketing_opt_in: boolean; product: ProductConfig }) {
  const amt = `$${(p.amount_cents / 100).toFixed(2)} ${p.currency.toUpperCase()}`;
  const optBadge = p.marketing_opt_in
    ? '<span style="color:#2F4F3E;font-weight:700;">✅ SÍ acepta marketing (1 email/mes)</span>'
    : '<span style="color:#9ca3af;">❌ No acepta marketing</span>';
  const html = `<!doctype html><html><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;padding:32px 0;"><tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <tr><td style="background:#ffffff;padding:20px;text-align:center;border-bottom:1px solid #f0f0f0;">
        <img src="${LOGO}" alt="Hipervínculo" width="140" style="display:block;margin:0 auto;background:#ffffff;" />
      </td></tr>
      <tr><td style="padding:28px;">
        <div style="display:inline-block;background:#8BC34A;color:#1a2e22;font-size:11px;font-weight:800;padding:4px 10px;border-radius:999px;margin-bottom:12px;">NUEVA VENTA</div>
        <h1 style="margin:0 0 8px;color:#2F4F3E;font-size:22px;font-weight:800;">Pago recibido: ${amt}</h1>
        <p style="margin:0 0 20px;color:#666;font-size:14px;">Producto: ${p.product.admin_label}</p>
        <table width="100%" cellpadding="8" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;font-size:14px;">
          <tr><td style="color:#666;width:35%;">Nombre</td><td style="color:#1a1a1a;font-weight:600;">${p.name}</td></tr>
          <tr style="background:#f9fafb;"><td style="color:#666;">Email</td><td style="color:#1a1a1a;font-weight:600;">${p.email}</td></tr>
          <tr><td style="color:#666;">Teléfono</td><td style="color:#1a1a1a;font-weight:600;">${p.phone || "—"}</td></tr>
          <tr style="background:#f9fafb;"><td style="color:#666;">Monto</td><td style="color:#2F4F3E;font-weight:800;">${amt}</td></tr>
          <tr><td style="color:#666;">Variante</td><td style="color:#1a1a1a;">${p.variant}</td></tr>
          <tr style="background:#f9fafb;"><td style="color:#666;">Marketing</td><td>${optBadge}</td></tr>
          <tr><td style="color:#666;">Stripe Session</td><td style="color:#1a1a1a;font-family:monospace;font-size:11px;word-break:break-all;">${p.session_id}</td></tr>
        </table>

        <p style="margin:20px 0 0;font-size:13px;color:#666;">Email de descarga enviado automáticamente al cliente.</p>
      </td></tr>
    </table>
  </td></tr></table></body></html>`;
  await resend.emails.send({
    from: "Hipervínculo Ventas <info@hipervinculo.net>",
    to: ["info@hipervinculo.net"],
    subject: `💰 Nueva venta eBook: ${amt} · ${p.name}`,
    html,
  });
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
    const { session_id, fbp, fbc, user_agent } = parsed.data;
    const client_ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || null;
    const ua = user_agent || req.headers.get("user-agent") || null;

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

    const md = session.metadata || {};
    const product = getProduct(md);

    const { data: existing } = await supabase
      .from("ebook_purchases").select("*").eq("stripe_session_id", session_id).maybeSingle();

    const projectUrl = Deno.env.get("SUPABASE_URL")!;
    const buildLink = (token: string) => `${projectUrl}/functions/v1/download-ebook?token=${token}`;

    if (existing) {
      return new Response(JSON.stringify({
        status: "ok", name: existing.name, email: existing.email,
        download_url: buildLink(existing.download_token),
        amount_cents: existing.amount_cents, currency: existing.currency,
        product_key: existing.product_key || productKeyFromSession(session),
        content_name: product.content_name,
        session_id: existing.stripe_session_id, already_processed: true,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const email = session.customer_details?.email || session.customer_email || "";
    const name = md.name || session.customer_details?.name || "Cliente";
    const phone = md.phone || session.customer_details?.phone || null;
    const variant = md.variant || "default";
    const marketingOptIn = md.marketing_opt_in === "1";
    const token = genToken();

    // Geolocate the purchase IP (best effort)
    let geo = { country: null as string | null, city: null as string | null, region: null as string | null };
    if (client_ip) {
      try {
        const r = await fetch(`http://ip-api.com/json/${client_ip}?fields=status,country,regionName,city`);
        const j = await r.json();
        if (j.status === "success") geo = { country: j.country || null, city: j.city || null, region: j.regionName || null };
      } catch (e) { console.warn("geo lookup failed", e); }
    }

    const productKey = md.product_key || (md.product === "amazon-fba-sin-inventario" ? "amazon-fba" : "amazon-fba");

    const { data: inserted, error: insertErr } = await supabase
      .from("ebook_purchases").insert({
        email, name, phone,
        product_key: productKey,
        stripe_session_id: session.id,
        stripe_payment_intent: typeof session.payment_intent === "string" ? session.payment_intent : null,
        amount_cents: session.amount_total ?? 4999,
        currency: session.currency ?? "usd",
        price_variant: variant,
        download_token: token,
        marketing_opt_in: marketingOptIn,
        paid_at: new Date().toISOString(),
        client_ip, user_agent: ua,
        country: geo.country, city: geo.city, region: geo.region,
        utm_source: md.utm_source || null,
        utm_medium: md.utm_medium || null,
        utm_campaign: md.utm_campaign || null,
        utm_term: md.utm_term || null,
        utm_content: md.utm_content || null,
        referrer: md.referrer || null,
        fbp: md.fbp || fbp || null,
        fbc: md.fbc || fbc || null,
      }).select().single();


    if (insertErr) throw insertErr;

    const downloadUrl = buildLink(token);
    try {
      await sendCustomerEmail(email, name, downloadUrl, product);
      await supabase.from("ebook_purchases").update({ email_sent_at: new Date().toISOString() }).eq("id", inserted.id);
    } catch (e) { console.error("Customer email error", e); }
    try {
      await sendAdminEmail({
        name, email, phone,
        amount_cents: session.amount_total ?? 4999,
        currency: session.currency ?? "usd",
        session_id: session.id, variant,
        marketing_opt_in: marketingOptIn,
        product,
      });
    } catch (e) { console.error("Admin email error", e); }

    // Meta Conversions API (server-side, deduplicated with browser pixel via event_id)
    try {
      await sendMetaCapiPurchase({
        event_id: session.id,
        email, name, phone,
        value: (session.amount_total ?? 4999) / 100,
        currency: session.currency ?? "usd",
        client_ip,
        user_agent: ua,
        fbp: fbp || null,
        fbc: fbc || null,
        event_source_url: `https://hipervinculo.net/${productKey === "amazon-ppc" ? "publicidad-en-amazon" : "amazon-fba-ebook"}/gracias`,
        product,
      });
    } catch (e) { console.error("Meta CAPI error", e); }



    return new Response(JSON.stringify({
      status: "ok", name, email, download_url: downloadUrl,
      amount_cents: session.amount_total ?? 4999,
      currency: session.currency ?? "usd",
      product_key: productKey,
      content_name: product.content_name,
      session_id: session.id, already_processed: false,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error("verify-ebook-payment error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function productKeyFromSession(session: any) {
  const md = session.metadata || {};
  return md.product_key || (md.product === "amazon-fba-sin-inventario" ? "amazon-fba" : "amazon-fba");
}
