import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContactNotification {
  type: "contact";
  language: "en" | "es";
  full_name: string;
  email: string;
  company_name?: string;
  inquiry_type?: string;
  message: string;
}

interface AuditNotification {
  type: "audit";
  language: "en" | "es";
  company_name: string;
  email: string;
  website_url?: string;
  monthly_revenue?: string;
  monthly_ad_spend?: string;
  business_type?: string;
  growth_goals?: string;
}

type NotificationRequest = ContactNotification | AuditNotification;

// Translations for email content
const emailTranslations = {
  en: {
    contact: {
      header: "📬 New Contact Message",
      name: "Name:",
      email: "Email:",
      company: "Company:",
      inquiryType: "Inquiry type:",
      message: "Message:",
    },
    audit: {
      header: "🎯 New Free Audit Request",
      company: "Company:",
      email: "Email:",
      website: "Website:",
      businessType: "Business type:",
      metrics: "Metrics:",
      revenue: "Revenue:",
      adSpend: "Ad spend:",
      goals: "Growth goals:",
    },
    subject: {
      contact: "[Hipervínculo] New contact:",
      audit: "[Hipervínculo] New audit request:",
    }
  },
  es: {
    contact: {
      header: "📬 Nuevo Mensaje de Contacto",
      name: "Nombre:",
      email: "Email:",
      company: "Empresa:",
      inquiryType: "Tipo de consulta:",
      message: "Mensaje:",
    },
    audit: {
      header: "🎯 Nueva Solicitud de Auditoría Gratuita",
      company: "Empresa:",
      email: "Email:",
      website: "Sitio web:",
      businessType: "Tipo de negocio:",
      metrics: "Métricas:",
      revenue: "Ingresos:",
      adSpend: "Inversión publicitaria:",
      goals: "Objetivos de crecimiento:",
    },
    subject: {
      contact: "[Hipervínculo] Nuevo contacto:",
      audit: "[Hipervínculo] Nueva solicitud de auditoría:",
    }
  }
};

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
    const lang = payload.language || "es";
    const t = emailTranslations[lang];

    console.log("Received notification request:", payload.type, "language:", lang);

    let subject: string;
    let htmlContent: string;

    if (payload.type === "contact") {
      const { full_name, email, company_name, inquiry_type, message } = payload;
      
      subject = `${t.subject.contact} ${full_name}`;
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
              <h1 style="margin: 0; font-size: 24px;">${t.contact.header}</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">${t.contact.name}</div>
                <div class="value">${full_name}</div>
              </div>
              <div class="field">
                <div class="label">${t.contact.email}</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              ${company_name ? `
              <div class="field">
                <div class="label">${t.contact.company}</div>
                <div class="value">${company_name}</div>
              </div>
              ` : ''}
              ${inquiry_type ? `
              <div class="field">
                <div class="label">${t.contact.inquiryType}</div>
                <div class="value">${inquiry_type}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">${t.contact.message}</div>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    } else if (payload.type === "audit") {
      const { company_name, email, website_url, monthly_revenue, monthly_ad_spend, business_type, growth_goals } = payload;
      
      subject = `${t.subject.audit} ${company_name}`;
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
              <h1 style="margin: 0; font-size: 24px;">${t.audit.header}</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">${t.audit.company}</div>
                <div class="value">${company_name}</div>
              </div>
              <div class="field">
                <div class="label">${t.audit.email}</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              ${website_url ? `
              <div class="field">
                <div class="label">${t.audit.website}</div>
                <div class="value"><a href="${website_url}" target="_blank">${website_url}</a></div>
              </div>
              ` : ''}
              ${business_type ? `
              <div class="field">
                <div class="label">${t.audit.businessType}</div>
                <div class="value">${business_type}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">${t.audit.metrics}</div>
                <div class="value">
                  ${monthly_revenue ? `<span class="metric">💰 ${t.audit.revenue} ${monthly_revenue}</span>` : ''}
                  ${monthly_ad_spend ? `<span class="metric">📊 ${t.audit.adSpend} ${monthly_ad_spend}</span>` : ''}
                </div>
              </div>
              ${growth_goals ? `
              <div class="field">
                <div class="label">${t.audit.goals}</div>
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
