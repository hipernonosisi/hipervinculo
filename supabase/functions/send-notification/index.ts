import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactNotification {
  type: "contact";
  full_name: string;
  email: string;
  company_name?: string;
  inquiry_type?: string;
  message: string;
}

interface AuditNotification {
  type: "audit";
  company_name: string;
  email: string;
  website_url?: string;
  monthly_revenue?: string;
  monthly_ad_spend?: string;
  business_type?: string;
  growth_goals?: string;
}

type NotificationRequest = ContactNotification | AuditNotification;

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("Email service not configured");
    }

    const resend = new Resend(RESEND_API_KEY);
    const payload: NotificationRequest = await req.json();

    console.log("Received notification request:", payload.type);

    let subject: string;
    let htmlContent: string;

    if (payload.type === "contact") {
      const { full_name, email, company_name, inquiry_type, message } = payload;
      
      subject = `[Hipervínculo] Nuevo contacto: ${full_name}`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2d4a2d; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9f5; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 16px; }
            .label { font-weight: 600; color: #2d4a2d; }
            .value { margin-top: 4px; }
            .message-box { background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #8BC34A; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">📬 Nuevo Mensaje de Contacto</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Nombre:</div>
                <div class="value">${full_name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              ${company_name ? `
              <div class="field">
                <div class="label">Empresa:</div>
                <div class="value">${company_name}</div>
              </div>
              ` : ''}
              ${inquiry_type ? `
              <div class="field">
                <div class="label">Tipo de consulta:</div>
                <div class="value">${inquiry_type}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Mensaje:</div>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    } else if (payload.type === "audit") {
      const { company_name, email, website_url, monthly_revenue, monthly_ad_spend, business_type, growth_goals } = payload;
      
      subject = `[Hipervínculo] Nueva solicitud de auditoría: ${company_name}`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #8BC34A; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9f5; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 16px; }
            .label { font-weight: 600; color: #2d4a2d; }
            .value { margin-top: 4px; }
            .goals-box { background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #2d4a2d; }
            .metric { display: inline-block; background: white; padding: 8px 16px; border-radius: 20px; margin: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">🎯 Nueva Solicitud de Auditoría Gratuita</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Empresa:</div>
                <div class="value">${company_name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              ${website_url ? `
              <div class="field">
                <div class="label">Sitio web:</div>
                <div class="value"><a href="${website_url}" target="_blank">${website_url}</a></div>
              </div>
              ` : ''}
              ${business_type ? `
              <div class="field">
                <div class="label">Tipo de negocio:</div>
                <div class="value">${business_type}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Métricas:</div>
                <div class="value">
                  ${monthly_revenue ? `<span class="metric">💰 Ingresos: ${monthly_revenue}</span>` : ''}
                  ${monthly_ad_spend ? `<span class="metric">📊 Inversión publicitaria: ${monthly_ad_spend}</span>` : ''}
                </div>
              </div>
              ${growth_goals ? `
              <div class="field">
                <div class="label">Objetivos de crecimiento:</div>
                <div class="goals-box">${growth_goals.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}
            </div>
          </div>
        </body>
        </html>
      `;
    } else {
      throw new Error("Invalid notification type");
    }

    // Send email to admin
    const emailResponse = await resend.emails.send({
      from: "Hipervínculo <notificaciones@hipervinculo.net>",
      to: ["hola@hipervinculo.net"],
      subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, id: emailResponse.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error sending notification:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);
