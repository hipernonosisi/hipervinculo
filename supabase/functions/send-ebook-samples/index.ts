import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const SAMPLE_DOWNLOAD = "https://fshfuwinreztcqlumjzp.supabase.co/functions/v1/download-ebook?token=ej3mp10t0k3nseguro1234567890abcdef1234567890abcdef1234567890ab";
const SAMPLE_NAME = "María González";
const SAMPLE_EMAIL = "nonosisi@gmail.com";
const SAMPLE_PHONE = "+52 55 1234 5678";
const SAMPLE_AMOUNT = 4700;

function customerHtml(name: string, downloadUrl: string) {
  return `<!doctype html><html><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
        <tr><td style="background:#ffffff;padding:24px;text-align:center;border-bottom:1px solid #f0f0f0;">
          <img src="https://fshfuwinreztcqlumjzp.supabase.co/storage/v1/object/public/email-assets/logo.png?v=1" alt="Hipervínculo" width="160" style="display:block;margin:0 auto;background:#ffffff;" />
        </td></tr>
        <tr><td style="padding:32px 28px;">
          <div style="display:inline-block;background:#8BC34A;color:#1a2e22;font-size:11px;font-weight:800;padding:4px 10px;border-radius:999px;margin-bottom:12px;">[MUESTRA]</div>
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
}

function adminHtml(p: { name: string; email: string; phone: string; amount_cents: number; session_id: string }) {
  const amt = `$${(p.amount_cents / 100).toFixed(2)} USD`;
  return `<!doctype html><html><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;padding:32px 0;"><tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <tr><td style="background:#ffffff;padding:20px;text-align:center;border-bottom:1px solid #f0f0f0;">
        <img src="https://fshfuwinreztcqlumjzp.supabase.co/storage/v1/object/public/email-assets/logo.png?v=1" alt="Hipervínculo" width="140" style="display:block;margin:0 auto;background:#ffffff;" />
      </td></tr>
      <tr><td style="padding:28px;">
        <div style="display:inline-block;background:#8BC34A;color:#1a2e22;font-size:11px;font-weight:800;padding:4px 10px;border-radius:999px;margin-bottom:12px;">[MUESTRA] NUEVA VENTA</div>
        <h1 style="margin:0 0 8px;color:#2F4F3E;font-size:22px;font-weight:800;">Pago recibido: ${amt}</h1>
        <p style="margin:0 0 20px;color:#666;font-size:14px;">Producto: Amazon FBA Sin Inventario (eBook PDF)</p>
        <table width="100%" cellpadding="8" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;font-size:14px;">
          <tr><td style="color:#666;width:35%;">Nombre</td><td style="color:#1a1a1a;font-weight:600;">${p.name}</td></tr>
          <tr style="background:#f9fafb;"><td style="color:#666;">Email</td><td style="color:#1a1a1a;font-weight:600;">${p.email}</td></tr>
          <tr><td style="color:#666;">Teléfono</td><td style="color:#1a1a1a;font-weight:600;">${p.phone}</td></tr>
          <tr style="background:#f9fafb;"><td style="color:#666;">Monto</td><td style="color:#2F4F3E;font-weight:800;">${amt}</td></tr>
          <tr><td style="color:#666;">Variante de precio</td><td style="color:#1a1a1a;">default</td></tr>
          <tr style="background:#f9fafb;"><td style="color:#666;">Stripe Session</td><td style="color:#1a1a1a;font-family:monospace;font-size:11px;word-break:break-all;">${p.session_id}</td></tr>
        </table>
        <p style="margin:20px 0 0;font-size:13px;color:#666;">Email de descarga enviado automáticamente al cliente.</p>
      </td></tr>
      <tr><td style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#666;border-top:1px solid #f0f0f0;">
        Notificación interna · Hipervínculo
      </td></tr>
    </table>
  </td></tr></table></body></html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const customer = await resend.emails.send({
    from: "Hipervínculo <info@hipervinculo.net>",
    to: [SAMPLE_EMAIL],
    subject: "[MUESTRA] Tu guía Amazon FBA Sin Inventario está lista 📘",
    html: customerHtml(SAMPLE_NAME, SAMPLE_DOWNLOAD),
  });

  const admin = await resend.emails.send({
    from: "Hipervínculo Ventas <info@hipervinculo.net>",
    to: ["info@hipervinculo.net"],
    subject: `[MUESTRA] 💰 Nueva venta eBook: $47.00 USD · ${SAMPLE_NAME}`,
    html: adminHtml({
      name: SAMPLE_NAME, email: SAMPLE_EMAIL, phone: SAMPLE_PHONE,
      amount_cents: SAMPLE_AMOUNT, session_id: "cs_test_SAMPLE_a1b2c3d4e5f6g7h8i9j0",
    }),
  });

  return new Response(JSON.stringify({ customer, admin }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
