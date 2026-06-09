import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PRICE_ID = "price_1TgCM6LvqyfYabJSTXg9FD9V";

const BodySchema = z.object({
  email: z.string().trim().email().max(255),
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(5).max(30),
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

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten().fieldErrors }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const d = parsed.data;

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const origin = req.headers.get("origin") || "https://hipervinculo.net";
    const optStr = d.marketing_opt_in ? "1" : "0";

    // Build metadata (Stripe values must be strings, max 500 chars, max 50 keys)
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

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: d.email,
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      payment_method_types: ["card"],
      success_url: `${origin}/amazon-fba-ebook/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/amazon-fba-ebook?canceled=1`,
      metadata: md,
      payment_intent_data: { metadata: { ...md, email: d.email } },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
    });
  } catch (e) {
    console.error("create-ebook-checkout error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
