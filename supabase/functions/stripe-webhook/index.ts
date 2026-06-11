// Stripe webhook: guarantees PDF delivery even if the customer never lands
// on the /gracias page (closed tab, lost connection, mobile wallet quirks).
// Listens for `checkout.session.completed` and invokes verify-ebook-payment,
// which already handles idempotency, DB insert, customer email, admin email
// and Meta CAPI.

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "stripe-signature, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const signature = req.headers.get("stripe-signature");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  const stripeSecret = Deno.env.get("STRIPE_SECRET_KEY");

  if (!signature) return new Response("Missing stripe-signature", { status: 400, headers: corsHeaders });
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    return new Response("Webhook secret not configured", { status: 500, headers: corsHeaders });
  }
  if (!stripeSecret) {
    console.error("STRIPE_SECRET_KEY not configured");
    return new Response("Stripe key not configured", { status: 500, headers: corsHeaders });
  }

  const stripe = new Stripe(stripeSecret, { apiVersion: "2025-08-27.basil" });
  const body = await req.text();

  let event: Stripe.Event;
  try {
    // Deno requires the async variant for HMAC verification
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err) {
    console.error("Signature verification failed", (err as Error).message);
    return new Response(`Webhook Error: ${(err as Error).message}`, { status: 400, headers: corsHeaders });
  }

  console.log("Stripe webhook event:", event.type, event.id);

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Only process if it's actually paid (some completion events are pre-payment for async methods)
    if (session.payment_status !== "paid") {
      console.log("Session not paid yet, ignoring", session.id, session.payment_status);
      return new Response(JSON.stringify({ received: true, skipped: "not_paid" }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Only process our ebook product (defensive — same Stripe account may have other checkouts)
    const product = session.metadata?.product;
    if (product && product !== "amazon-fba-sin-inventario") {
      console.log("Not an ebook session, ignoring", session.id, product);
      return new Response(JSON.stringify({ received: true, skipped: "wrong_product" }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    try {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      );

      const { data, error } = await supabase.functions.invoke("verify-ebook-payment", {
        body: {
          session_id: session.id,
          fbp: session.metadata?.fbp,
          fbc: session.metadata?.fbc,
        },
      });
      if (error) throw error;
      console.log("verify-ebook-payment ok via webhook", session.id, data?.already_processed ? "already_processed" : "newly_processed");
    } catch (e) {
      console.error("Failed to process session via webhook", session.id, e);
      // Return 500 so Stripe retries
      return new Response(JSON.stringify({ error: (e as Error).message }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
