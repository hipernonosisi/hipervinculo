import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LOGO_URL = "https://fshfuwinreztcqlumjzp.supabase.co/storage/v1/object/public/email-assets/logo.png?v=1";

// Helper function to add delay between API calls (to avoid rate limits)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface ContactNotification {
  type: "contact";
  language: "en" | "es";
  fullName: string;
  email: string;
  companyName?: string;
  inquiryType?: string;
  message: string;
}

interface AuditNotification {
  type: "audit";
  language: "en" | "es";
  companyName: string;
  email: string;
  websiteUrl?: string;
  monthlyRevenue?: string;
  monthlyAdSpend?: string;
  businessType?: string;
  growthGoals?: string;
}

type NotificationRequest = ContactNotification | AuditNotification;

// Translations for email content (NO EMOJIS)
const emailTranslations = {
  en: {
    contact: {
      adminHeader: "New Contact Message",
      clientHeader: "Thank you for contacting us!",
      clientSubtitle: "We have received your message and will get back to you shortly.",
      name: "Name:",
      email: "Email:",
      company: "Company:",
      inquiryType: "Inquiry type:",
      message: "Message:",
      yourSubmission: "Your submission details:",
      footer: "Our team will review your inquiry and respond within 24-48 hours.",
      signature: "Best regards,<br>The Hipervínculo Team",
    },
    audit: {
      adminHeader: "New Free Audit Request",
      clientHeader: "Your Free Audit Request Received!",
      clientSubtitle: "Thank you for requesting a free audit of your eCommerce performance.",
      company: "Company:",
      email: "Email:",
      website: "Website:",
      businessType: "Business type:",
      metrics: "Metrics:",
      revenue: "Revenue:",
      adSpend: "Ad spend:",
      goals: "Growth goals:",
      yourSubmission: "Your submission details:",
      footer: "Our team of experts will analyze your business and prepare a customized audit report. Expect to hear from us within 2-3 business days.",
      signature: "Best regards,<br>The Hipervínculo Team",
    },
    subject: {
      contact: "[Hipervínculo] New contact:",
      audit: "[Hipervínculo] New audit request:",
      contactClient: "Thanks for reaching out to Hipervínculo!",
      auditClient: "Your Free Audit Request - Hipervínculo",
    }
  },
  es: {
    contact: {
      adminHeader: "Nuevo Mensaje de Contacto",
      clientHeader: "¡Gracias por contactarnos!",
      clientSubtitle: "Hemos recibido tu mensaje y te responderemos pronto.",
      name: "Nombre:",
      email: "Email:",
      company: "Empresa:",
      inquiryType: "Tipo de consulta:",
      message: "Mensaje:",
      yourSubmission: "Detalles de tu solicitud:",
      footer: "Nuestro equipo revisará tu consulta y te responderá en 24-48 horas.",
      signature: "Saludos cordiales,<br>El Equipo de Hipervínculo",
    },
    audit: {
      adminHeader: "Nueva Solicitud de Auditoría Gratuita",
      clientHeader: "¡Hemos recibido tu solicitud de Auditoría!",
      clientSubtitle: "Gracias por solicitar una auditoría gratuita del rendimiento de tu eCommerce.",
      company: "Empresa:",
      email: "Email:",
      website: "Sitio web:",
      businessType: "Tipo de negocio:",
      metrics: "Métricas:",
      revenue: "Ingresos:",
      adSpend: "Inversión publicitaria:",
      goals: "Objetivos de crecimiento:",
      yourSubmission: "Detalles de tu solicitud:",
      footer: "Nuestro equipo de expertos analizará tu negocio y preparará un informe de auditoría personalizado. Espera noticias nuestras en 2-3 días hábiles.",
      signature: "Saludos cordiales,<br>El Equipo de Hipervínculo",
    },
    subject: {
      contact: "[Hipervínculo] Nuevo contacto:",
      audit: "[Hipervínculo] Nueva solicitud de auditoría:",
      contactClient: "¡Gracias por contactar con Hipervínculo!",
      auditClient: "Tu Solicitud de Auditoría Gratuita - Hipervínculo",
    }
  }
};

// Base email styles - Logo on WHITE background, no emojis
const getEmailStyles = () => `
  body { 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
    line-height: 1.6; 
    color: #333; 
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
  }
  .wrapper {
    max-width: 600px; 
    margin: 0 auto; 
    padding: 20px;
  }
  .container {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .logo-header {
    background: #ffffff;
    padding: 24px;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
  .logo {
    max-width: 180px;
    height: auto;
  }
  .header {
    background: linear-gradient(135deg, #2d4a2d 0%, #3d5a3d 100%);
    color: white;
    padding: 24px;
    text-align: center;
  }
  .header h1 {
    margin: 0 0 8px 0;
    font-size: 24px;
    font-weight: 600;
  }
  .header p {
    margin: 0;
    opacity: 0.9;
    font-size: 14px;
  }
  .content {
    padding: 24px;
  }
  .section-title {
    font-size: 14px;
    font-weight: 600;
    color: #8BC34A;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 16px;
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 8px;
  }
  .field {
    margin-bottom: 16px;
  }
  .label {
    font-weight: 600;
    color: #2d4a2d;
    font-size: 13px;
    margin-bottom: 4px;
  }
  .value {
    color: #444;
    font-size: 15px;
  }
  .message-box {
    background: #f8f9f5;
    padding: 16px;
    border-radius: 8px;
    border-left: 4px solid #8BC34A;
    margin-top: 8px;
  }
  .metric {
    display: inline-block;
    background: #f8f9f5;
    padding: 8px 16px;
    border-radius: 20px;
    margin: 4px 4px 4px 0;
    font-size: 14px;
  }
  .footer {
    background: #f8f9f5;
    padding: 20px 24px;
    text-align: center;
    font-size: 14px;
    color: #666;
    border-top: 1px solid #eee;
  }
  .signature {
    margin-top: 16px;
    color: #2d4a2d;
    font-weight: 500;
  }
  a {
    color: #8BC34A;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;

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

    let adminSubject: string;
    let adminHtml: string;
    let clientSubject: string;
    let clientHtml: string;
    let clientEmail: string;

    if (payload.type === "contact") {
      const { fullName, email, companyName, inquiryType, message } = payload;
      clientEmail = email;
      
      // Admin email
      adminSubject = `${t.subject.contact} ${fullName}`;
      adminHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${getEmailStyles()}</style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="logo-header">
                <img src="${LOGO_URL}" alt="Hipervínculo" class="logo">
              </div>
              <div class="header">
                <h1>${t.contact.adminHeader}</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">${t.contact.name}</div>
                  <div class="value">${fullName}</div>
                </div>
                <div class="field">
                  <div class="label">${t.contact.email}</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                ${companyName ? `
                <div class="field">
                  <div class="label">${t.contact.company}</div>
                  <div class="value">${companyName}</div>
                </div>
                ` : ''}
                ${inquiryType ? `
                <div class="field">
                  <div class="label">${t.contact.inquiryType}</div>
                  <div class="value">${inquiryType}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">${t.contact.message}</div>
                  <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      // Client confirmation email
      clientSubject = t.subject.contactClient;
      clientHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${getEmailStyles()}</style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="logo-header">
                <img src="${LOGO_URL}" alt="Hipervínculo" class="logo">
              </div>
              <div class="header">
                <h1>${t.contact.clientHeader}</h1>
                <p>${t.contact.clientSubtitle}</p>
              </div>
              <div class="content">
                <div class="section-title">${t.contact.yourSubmission}</div>
                <div class="field">
                  <div class="label">${t.contact.name}</div>
                  <div class="value">${fullName}</div>
                </div>
                <div class="field">
                  <div class="label">${t.contact.email}</div>
                  <div class="value">${email}</div>
                </div>
                ${companyName ? `
                <div class="field">
                  <div class="label">${t.contact.company}</div>
                  <div class="value">${companyName}</div>
                </div>
                ` : ''}
                ${inquiryType ? `
                <div class="field">
                  <div class="label">${t.contact.inquiryType}</div>
                  <div class="value">${inquiryType}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">${t.contact.message}</div>
                  <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
              <div class="footer">
                <p>${t.contact.footer}</p>
                <p class="signature">${t.contact.signature}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

    } else if (payload.type === "audit") {
      const { companyName, email, websiteUrl, monthlyRevenue, monthlyAdSpend, businessType, growthGoals } = payload;
      clientEmail = email;
      
      // Admin email
      adminSubject = `${t.subject.audit} ${companyName}`;
      adminHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${getEmailStyles()}</style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="logo-header">
                <img src="${LOGO_URL}" alt="Hipervínculo" class="logo">
              </div>
              <div class="header" style="background: linear-gradient(135deg, #8BC34A 0%, #689F38 100%);">
                <h1>${t.audit.adminHeader}</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">${t.audit.company}</div>
                  <div class="value">${companyName}</div>
                </div>
                <div class="field">
                  <div class="label">${t.audit.email}</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                ${websiteUrl ? `
                <div class="field">
                  <div class="label">${t.audit.website}</div>
                  <div class="value"><a href="${websiteUrl}" target="_blank">${websiteUrl}</a></div>
                </div>
                ` : ''}
                ${businessType ? `
                <div class="field">
                  <div class="label">${t.audit.businessType}</div>
                  <div class="value">${businessType}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">${t.audit.metrics}</div>
                  <div class="value">
                    ${monthlyRevenue ? `<span class="metric">${t.audit.revenue} ${monthlyRevenue}</span>` : ''}
                    ${monthlyAdSpend ? `<span class="metric">${t.audit.adSpend} ${monthlyAdSpend}</span>` : ''}
                  </div>
                </div>
                ${growthGoals ? `
                <div class="field">
                  <div class="label">${t.audit.goals}</div>
                  <div class="message-box">${growthGoals.replace(/\n/g, '<br>')}</div>
                </div>
                ` : ''}
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      // Client confirmation email
      clientSubject = t.subject.auditClient;
      clientHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${getEmailStyles()}</style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="logo-header">
                <img src="${LOGO_URL}" alt="Hipervínculo" class="logo">
              </div>
              <div class="header" style="background: linear-gradient(135deg, #8BC34A 0%, #689F38 100%);">
                <h1>${t.audit.clientHeader}</h1>
                <p>${t.audit.clientSubtitle}</p>
              </div>
              <div class="content">
                <div class="section-title">${t.audit.yourSubmission}</div>
                <div class="field">
                  <div class="label">${t.audit.company}</div>
                  <div class="value">${companyName}</div>
                </div>
                <div class="field">
                  <div class="label">${t.audit.email}</div>
                  <div class="value">${email}</div>
                </div>
                ${websiteUrl ? `
                <div class="field">
                  <div class="label">${t.audit.website}</div>
                  <div class="value">${websiteUrl}</div>
                </div>
                ` : ''}
                ${businessType ? `
                <div class="field">
                  <div class="label">${t.audit.businessType}</div>
                  <div class="value">${businessType}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="label">${t.audit.metrics}</div>
                  <div class="value">
                    ${monthlyRevenue ? `<span class="metric">${t.audit.revenue} ${monthlyRevenue}</span>` : ''}
                    ${monthlyAdSpend ? `<span class="metric">${t.audit.adSpend} ${monthlyAdSpend}</span>` : ''}
                  </div>
                </div>
                ${growthGoals ? `
                <div class="field">
                  <div class="label">${t.audit.goals}</div>
                  <div class="message-box">${growthGoals.replace(/\n/g, '<br>')}</div>
                </div>
                ` : ''}
              </div>
              <div class="footer">
                <p>${t.audit.footer}</p>
                <p class="signature">${t.audit.signature}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    } else {
      throw new Error("Invalid notification type");
    }

    // Send email to admin first
    console.log("Sending admin email to info@hipervinculo.net");
    const adminEmailResponse = await resend.emails.send({
      from: "Hipervínculo <notificaciones@hipervinculo.net>",
      to: ["info@hipervinculo.net"],
      subject: adminSubject,
      html: adminHtml,
    });
    console.log("Admin email sent:", adminEmailResponse);

    // Wait 1 second to avoid rate limiting (Resend allows 2 requests/second)
    await delay(1000);

    // Send confirmation email to client
    console.log("Sending confirmation email to client:", clientEmail);
    const clientEmailResponse = await resend.emails.send({
      from: "Hipervínculo <notificaciones@hipervinculo.net>",
      to: [clientEmail],
      subject: clientSubject,
      html: clientHtml,
    });
    console.log("Client confirmation email sent:", clientEmailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      adminEmailId: adminEmailResponse.id,
      clientEmailId: clientEmailResponse.id 
    }), {
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
