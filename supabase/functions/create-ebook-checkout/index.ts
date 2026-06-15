import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { Resend } from "npm:resend@2.0.0";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PRICE_ID = "price_1TgYZJLvqyfYabJSEaUNMhHp";
const ADMIN_EMAIL = "info@hipervinculo.net";

const BodySchema = z.object({
  email: z.string().trim().email().max(255),
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(7).max(30),
  variant: z.string().trim().max(40).optional().default("default"),
  marketing_opt_in: z.boolean().optional().default(false),
  utm_source: z.string().trim().max(120).optional(),
  utm_medium: z.string().trim().max(120).optional(),
  utm_campaign: z.string().trim().max(120).optional(),
  utm_term: z.string().trim().max(120).optional(),
  utm_content: z.string().trim().max(120).optional(),
  referrer: z.string().trim().max(500).optional(),
  fbp: z.string().trim().max(200).optional(),
  fbc: z.string().trim().max(300).optional(),
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const resend = new Resend(Deno.env.get("RESEND_API_KEY") || "");

async function notifyAdmin(subject: string, html: string) {
  try {
    await resend.emails.send({
      from: "Hipervínculo <info@hipervinculo.net>",
      to: [ADMIN_EMAIL],
      subject,
      html,
    });
  } catch (e) {
    console.error("notifyAdmin failed", e);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  let leadId: string | null = null;
  let parsedEmail = "(desconocido)";
  let parsedName = "";

  try {
    const raw = await req.json();
    const parsed = BodySchema.safeParse(raw);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const d = parsed.data;
    parsedEmail = d.email;
    parsedName = d.name;

    // Capture IP / UA
    const xff = req.headers.get("x-forwarded-for") || "";
    const client_ip = xff.split(",")[0]?.trim() || null;
    const user_agent = req.headers.get("user-agent") || null;

    // 1) Save lead BEFORE anything else, so we never lose it
    const { data: lead, error: leadErr } = await supabase
      .from("ebook_leads")
      .insert({
        email: d.email,
        name: d.name,
        phone: d.phone,
        variant: d.variant,
        marketing_opt_in: d.marketing_opt_in,
        checkout_status: "pending",
        client_ip,
        user_agent,
        utm_source: d.utm_source,
        utm_medium: d.utm_medium,
        utm_campaign: d.utm_campaign,
        utm_term: d.utm_term,
        utm_content: d.utm_content,
        referrer: d.referrer,
        fbp: d.fbp,
        fbc: d.fbc,
      })
      .select("id")
      .single();

    if (leadErr) {
      console.error("lead insert failed", leadErr);
    } else {
      leadId = lead.id;
    }

    // 2) Create Stripe session
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const origin = req.headers.get("origin") || "https://hipervinculo.net";
    const optStr = d.marketing_opt_in ? "1" : "0";

    const md: Record<string, string> = {
      name: d.name, phone: d.phone, variant: d.variant,
      marketing_opt_in: optStr, product: "amazon-fba-sin-inventario",
    };
    if (d.utm_source) md.utm_source = d.utm_source.slice(0, 500);
    if (d.utm_medium) md.utm_medium = d.utm_medium.slice(0, 500);
    if (d.utm_campaign) md.utm_campaign = d.utm_campaign.slice(0, 500);
    if (d.utm_term) md.utm_term = d.utm_term.slice(0, 500);
    if (d.utm_content) md.utm_content = d.utm_content.slice(0, 500);
    if (d.referrer) md.referrer = d.referrer.slice(0, 500);
    if (d.fbp) md.fbp = d.fbp.slice(0, 500);
    if (d.fbc) md.fbc = d.fbc.slice(0, 500);
    if (leadId) md.lead_id = leadId;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: d.email,
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      // Let Stripe auto-detect best methods for the user's region (card, link, cashapp, etc.)
      automatic_payment_methods: { enabled: true },
      allow_promotion_codes: true,
      success_url: `${origin}/amazon-fba-ebook/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/amazon-fba-ebook?canceled=1`,
      metadata: md,
      payment_intent_data: { metadata: { ...md, email: d.email } },
    });

    // 3) Update lead with session
    if (leadId) {
      await supabase
        .from("ebook_leads")
        .update({ checkout_status: "redirected", stripe_session_id: session.id })
        .eq("id", leadId);
    }

    // 4) Notify admin: new lead reached Stripe checkout
    notifyAdmin(
      `🟢 Nuevo lead eBook redirigido a Stripe: ${d.name}`,
      `<h2>Nuevo lead — Guía Amazon FBA</h2>
       <p><strong>Nombre:</strong> ${d.name}</p>
       <p><strong>Email:</strong> ${d.email}</p>
       <p><strong>Teléfono:</strong> ${d.phone}</p>
       <p><strong>Variante:</strong> ${d.variant}</p>
       <p><strong>Marketing opt-in:</strong> ${d.marketing_opt_in ? "Sí" : "No"}</p>
       <p><strong>Origen:</strong> ${d.utm_source || "directo"} / ${d.utm_campaign || "—"}</p>
       <p><strong>Referrer:</strong> ${d.referrer || "—"}</p>
       <hr>
       <p>El lead fue enviado a Stripe Checkout. Si NO completa el pago en los próximos minutos, contáctalo por WhatsApp para cerrar la venta.</p>`
    );

    return new Response(JSON.stringify({ url: session.url, lead_id: leadId }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
    });
  } catch (e) {
    const errMsg = (e as Error).message || String(e);
    console.error("create-ebook-checkout error", errMsg);

    // Mark lead as errored
    if (leadId) {
      await supabase
        .from("ebook_leads")
        .update({ checkout_status: "error", checkout_error: errMsg.slice(0, 1000) })
        .eq("id", leadId);
    }

    // Notify admin: checkout failed
    notifyAdmin(
      `🔴 Error en checkout eBook: ${parsedName || parsedEmail}`,
      `<h2>⚠️ Falló el checkout de Stripe</h2>
       <p><strong>Nombre:</strong> ${parsedName}</p>
       <p><strong>Email:</strong> ${parsedEmail}</p>
       <p><strong>Error:</strong> <code>${errMsg}</code></p>
       <hr>
       <p>El lead quedó guardado en la BD (tabla <code>ebook_leads</code>). Revísalo en el dashboard de analytics.</p>`
    );

    return new Response(JSON.stringify({ error: errMsg }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
