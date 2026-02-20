import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const LOGO_URL = "https://fshfuwinreztcqlumjzp.supabase.co/storage/v1/object/public/email-assets/logo.png?v=1";
const WEBSITE_URL = "https://hipervinculo.net";

// Company contact info
const CONTACT_INFO = {
  email: "info@hipervinculo.net",
  phone: "+1 (786) 529-0679",
  address: "2645 Executive Park Dr, Suite 146, Weston, FL 33331"
};

// Helper function to add delay between API calls (to avoid rate limits)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface ContactNotification {
  type: "contact";
  language: "en" | "es";
  fullName: string;
  email: string;
  phone?: string;
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

interface WebsiteAuditNotification {
  type: "website-audit";
  language: "en" | "es";
  businessName: string;
  email: string;
  websiteUrl: string;
  businessType: string;
  contactName?: string;
  phone?: string;
  overallScore: number;
  estimatedLeadsLost: number;
  estimatedRevenueLost: number;
}

interface PreviewLeadNotification {
  type: "preview-lead";
  language: "en" | "es";
  businessName: string;
  businessType: string;
  websiteUrl: string;
  serviceArea: string;
  employeeCount: string;
  currentAdvertising: string;
  contactName: string;
  phone: string;
  email: string;
  monthlyBudget: string;
  leadScore: string;
}

type NotificationRequest = ContactNotification | AuditNotification | WebsiteAuditNotification | PreviewLeadNotification;

// Translations for email content (NO EMOJIS)
const emailTranslations = {
  en: {
    contact: {
      adminHeader: "New Contact Message",
      clientHeader: "Thank you for reaching out!",
      clientSubtitle: "We have received your message and our team will get back to you shortly.",
      name: "Name:",
      email: "Email:",
      phone: "Phone:",
      company: "Company:",
      inquiryType: "Inquiry type:",
      message: "Message:",
      yourSubmission: "Your submission details",
      whatHappensNext: "What happens next?",
      nextSteps: [
        "Our team will review your inquiry within 24-48 hours",
        "A specialist will reach out to discuss your needs",
        "We'll provide tailored solutions for your eCommerce growth"
      ],
      contactUs: "Need immediate assistance?",
      visitWebsite: "Visit our website",
      signature: "The Hipervinculo Team",
    },
    audit: {
      adminHeader: "New Free Audit Request",
      clientHeader: "Your Free Audit Request is Confirmed!",
      clientSubtitle: "Thank you for trusting us with your eCommerce performance analysis.",
      company: "Company:",
      email: "Email:",
      website: "Website:",
      businessType: "Business type:",
      metrics: "Metrics:",
      revenue: "Revenue:",
      adSpend: "Ad spend:",
      goals: "Growth goals:",
      yourSubmission: "Your submission details",
      whatHappensNext: "What happens next?",
      nextSteps: [
        "Our experts will analyze your business metrics",
        "We'll prepare a comprehensive audit report",
        "You'll receive personalized growth recommendations within 2-3 business days"
      ],
      contactUs: "Need immediate assistance?",
      visitWebsite: "Visit our website",
      signature: "The Hipervinculo Team",
    },
    subject: {
      contact: "[Hipervinculo] New contact:",
      audit: "[Hipervinculo] New audit request:",
      contactClient: "Thanks for reaching out to Hipervinculo!",
      auditClient: "Your Free Audit Request - Hipervinculo",
    }
  },
  es: {
    contact: {
      adminHeader: "Nuevo Mensaje de Contacto",
      clientHeader: "¡Gracias por contactarnos!",
      clientSubtitle: "Hemos recibido tu mensaje y nuestro equipo te responderá pronto.",
      name: "Nombre:",
      email: "Email:",
      phone: "Teléfono:",
      company: "Empresa:",
      inquiryType: "Tipo de consulta:",
      message: "Mensaje:",
      yourSubmission: "Detalles de tu solicitud",
      whatHappensNext: "¿Qué sigue ahora?",
      nextSteps: [
        "Nuestro equipo revisará tu consulta en 24-48 horas",
        "Un especialista te contactará para discutir tus necesidades",
        "Te proporcionaremos soluciones personalizadas para el crecimiento de tu eCommerce"
      ],
      contactUs: "¿Necesitas asistencia inmediata?",
      visitWebsite: "Visita nuestro sitio web",
      signature: "El Equipo de Hipervinculo",
    },
    audit: {
      adminHeader: "Nueva Solicitud de Auditoría Gratuita",
      clientHeader: "¡Tu Solicitud de Auditoría está Confirmada!",
      clientSubtitle: "Gracias por confiar en nosotros para el análisis del rendimiento de tu eCommerce.",
      company: "Empresa:",
      email: "Email:",
      website: "Sitio web:",
      businessType: "Tipo de negocio:",
      metrics: "Métricas:",
      revenue: "Ingresos:",
      adSpend: "Inversión publicitaria:",
      goals: "Objetivos de crecimiento:",
      yourSubmission: "Detalles de tu solicitud",
      whatHappensNext: "¿Qué sigue ahora?",
      nextSteps: [
        "Nuestros expertos analizarán las métricas de tu negocio",
        "Prepararemos un informe de auditoría completo",
        "Recibirás recomendaciones personalizadas de crecimiento en 2-3 días hábiles"
      ],
      contactUs: "¿Necesitas asistencia inmediata?",
      visitWebsite: "Visita nuestro sitio web",
      signature: "El Equipo de Hipervinculo",
    },
    subject: {
      contact: "[Hipervinculo] Nuevo contacto:",
      audit: "[Hipervinculo] Nueva solicitud de auditoría:",
      contactClient: "¡Gracias por contactar con Hipervinculo!",
      auditClient: "Tu Solicitud de Auditoría Gratuita - Hipervinculo",
    }
  }
};

// Dark mode override meta + styles for email clients
const getDarkModeOverride = () => `
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <style>
    :root { color-scheme: light only; }
    [data-ogsc] .logo-header, .logo-header { background-color: #ffffff !important; }
    @media (prefers-color-scheme: dark) {
      .logo-header { background-color: #ffffff !important; }
      .logo-header img { filter: none !important; }
    }
  </style>
`;

// Admin email styles (simple)
const getAdminEmailStyles = () => `
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
    background-color: #ffffff !important;
    padding: 24px;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
  .logo {
    max-width: 180px;
    height: auto;
  }
  .header {
    background: #2d4a2d;
    color: white;
    padding: 24px;
    text-align: center;
  }
  .header h1 {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
  }
  .content {
    padding: 24px;
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
  a {
    color: #8BC34A;
    text-decoration: none;
  }
`;

// Client email styles (beautiful, brand-aligned)
const getClientEmailStyles = () => `
  body { 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
    line-height: 1.6; 
    color: #333; 
    margin: 0;
    padding: 0;
    background-color: #f8f9f5;
  }
  .wrapper {
    max-width: 600px; 
    margin: 0 auto; 
    padding: 20px;
  }
  .container {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(45, 74, 45, 0.12);
  }
  .logo-header {
    background-color: #ffffff !important;
    padding: 32px 24px;
    text-align: center;
  }
  .logo {
    max-width: 200px;
    height: auto;
  }
  .header {
    background: #2d4a2d;
    color: white;
    padding: 32px 24px;
    text-align: center;
  }
  .header h1 {
    margin: 0 0 8px 0;
    font-size: 26px;
    font-weight: 700;
  }
  .header p {
    margin: 0;
    opacity: 0.9;
    font-size: 15px;
  }
  .content {
    padding: 32px 24px;
  }
  .section {
    margin-bottom: 32px;
  }
  .section:last-child {
    margin-bottom: 0;
  }
  .section-title {
    font-size: 13px;
    font-weight: 700;
    color: #8BC34A;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid #f0f0f0;
  }
  .field {
    margin-bottom: 14px;
    display: flex;
    flex-wrap: wrap;
  }
  .label {
    font-weight: 600;
    color: #2d4a2d;
    font-size: 13px;
    min-width: 120px;
  }
  .value {
    color: #444;
    font-size: 14px;
    flex: 1;
  }
  .message-box {
    background: #f8f9f5;
    padding: 16px;
    border-radius: 8px;
    border-left: 4px solid #8BC34A;
    margin-top: 8px;
    font-size: 14px;
    color: #444;
  }
  .metric {
    display: inline-block;
    background: #f8f9f5;
    padding: 6px 14px;
    border-radius: 20px;
    margin: 4px 4px 4px 0;
    font-size: 13px;
    color: #2d4a2d;
  }
  .next-steps {
    background: #f8f9f5;
    border-radius: 12px;
    padding: 20px;
  }
  .step {
    display: flex;
    align-items: flex-start;
    margin-bottom: 12px;
  }
  .step:last-child {
    margin-bottom: 0;
  }
  .step-number {
    background: #8BC34A;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    margin-right: 12px;
    flex-shrink: 0;
  }
  .step-text {
    font-size: 14px;
    color: #444;
    padding-top: 2px;
  }
  .contact-section {
    background: #2d4a2d;
    color: white;
    padding: 28px 24px;
    text-align: center;
  }
  .contact-title {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 16px;
    color: white;
  }
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .contact-item {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
  }
  .contact-item a {
    color: #8BC34A;
    text-decoration: none;
  }
  .cta-button {
    display: inline-block;
    background: #8BC34A;
    color: white;
    padding: 12px 28px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    margin-top: 16px;
  }
  .footer {
    background: #f8f9f5;
    padding: 24px;
    text-align: center;
    border-top: 1px solid #eee;
  }
  .signature {
    color: #2d4a2d;
    font-weight: 600;
    font-size: 15px;
  }
  .footer-links {
    margin-top: 16px;
    font-size: 12px;
    color: #888;
  }
  .footer-links a {
    color: #8BC34A;
    text-decoration: none;
  }
  a {
    color: #8BC34A;
    text-decoration: none;
  }
`;

// Generate client email HTML
const generateClientContactEmail = (t: typeof emailTranslations.en.contact, data: { fullName: string; email: string; phone?: string; companyName?: string; inquiryType?: string; message: string }) => `
  <!DOCTYPE html>
  <html>
   <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${getDarkModeOverride()}
    <style>${getClientEmailStyles()}</style>
  </head>
  <body>
    <div class="wrapper">
      <div class="container">
        <div class="logo-header" style="background-color:#ffffff !important;">
          <img src="${LOGO_URL}" alt="Hipervinculo" class="logo">
        </div>
        <div class="header">
          <h1>${t.clientHeader}</h1>
          <p>${t.clientSubtitle}</p>
        </div>
        <div class="content">
          <div class="section">
            <div class="section-title">${t.yourSubmission}</div>
            <div class="field">
              <div class="label">${t.name}</div>
              <div class="value">${data.fullName}</div>
            </div>
            <div class="field">
              <div class="label">${t.email}</div>
              <div class="value">${data.email}</div>
            </div>
            ${data.phone ? `
            <div class="field">
              <div class="label">${t.phone}</div>
              <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
            </div>
            ` : ''}
            ${data.companyName ? `
            <div class="field">
              <div class="label">${t.company}</div>
              <div class="value">${data.companyName}</div>
            </div>
            ` : ''}
            ${data.inquiryType ? `
            <div class="field">
              <div class="label">${t.inquiryType}</div>
              <div class="value">${data.inquiryType}</div>
            </div>
            ` : ''}
            <div class="field" style="flex-direction: column;">
              <div class="label">${t.message}</div>
              <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">${t.whatHappensNext}</div>
            <div class="next-steps">
              ${t.nextSteps.map((step, i) => `
              <div class="step">
                <div class="step-number">${i + 1}</div>
                <div class="step-text">${step}</div>
              </div>
              `).join('')}
            </div>
          </div>
        </div>
        
        <div class="contact-section">
          <div class="contact-title">${t.contactUs}</div>
          <div class="contact-info">
            <div class="contact-item"><a href="mailto:${CONTACT_INFO.email}">${CONTACT_INFO.email}</a></div>
            <div class="contact-item"><a href="tel:${CONTACT_INFO.phone.replace(/\s/g, '')}">${CONTACT_INFO.phone}</a></div>
            <div class="contact-item">${CONTACT_INFO.address}</div>
          </div>
          <a href="${WEBSITE_URL}" class="cta-button">${t.visitWebsite}</a>
        </div>
        
        <div class="footer">
          <div class="signature">${t.signature}</div>
          <div class="footer-links">
            <a href="${WEBSITE_URL}">hipervinculo.net</a>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>
`;

// Generate client audit email HTML
const generateClientAuditEmail = (t: typeof emailTranslations.en.audit, data: { companyName: string; email: string; websiteUrl?: string; businessType?: string; monthlyRevenue?: string; monthlyAdSpend?: string; growthGoals?: string }) => `
  <!DOCTYPE html>
  <html>
   <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${getDarkModeOverride()}
    <style>${getClientEmailStyles()}</style>
  </head>
  <body>
    <div class="wrapper">
      <div class="container">
        <div class="logo-header" style="background-color:#ffffff !important;">
          <img src="${LOGO_URL}" alt="Hipervinculo" class="logo">
        </div>
        <div class="header" style="background: #8BC34A;">
          <h1>${t.clientHeader}</h1>
          <p>${t.clientSubtitle}</p>
        </div>
        <div class="content">
          <div class="section">
            <div class="section-title">${t.yourSubmission}</div>
            <div class="field">
              <div class="label">${t.company}</div>
              <div class="value">${data.companyName}</div>
            </div>
            <div class="field">
              <div class="label">${t.email}</div>
              <div class="value">${data.email}</div>
            </div>
            ${data.websiteUrl ? `
            <div class="field">
              <div class="label">${t.website}</div>
              <div class="value">${data.websiteUrl}</div>
            </div>
            ` : ''}
            ${data.businessType ? `
            <div class="field">
              <div class="label">${t.businessType}</div>
              <div class="value">${data.businessType}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">${t.metrics}</div>
              <div class="value">
                ${data.monthlyRevenue ? `<span class="metric">${t.revenue} ${data.monthlyRevenue}</span>` : ''}
                ${data.monthlyAdSpend ? `<span class="metric">${t.adSpend} ${data.monthlyAdSpend}</span>` : ''}
              </div>
            </div>
            ${data.growthGoals ? `
            <div class="field" style="flex-direction: column;">
              <div class="label">${t.goals}</div>
              <div class="message-box">${data.growthGoals.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
          </div>
          
          <div class="section">
            <div class="section-title">${t.whatHappensNext}</div>
            <div class="next-steps">
              ${t.nextSteps.map((step, i) => `
              <div class="step">
                <div class="step-number">${i + 1}</div>
                <div class="step-text">${step}</div>
              </div>
              `).join('')}
            </div>
          </div>
        </div>
        
        <div class="contact-section">
          <div class="contact-title">${t.contactUs}</div>
          <div class="contact-info">
            <div class="contact-item"><a href="mailto:${CONTACT_INFO.email}">${CONTACT_INFO.email}</a></div>
            <div class="contact-item"><a href="tel:${CONTACT_INFO.phone.replace(/\s/g, '')}">${CONTACT_INFO.phone}</a></div>
            <div class="contact-item">${CONTACT_INFO.address}</div>
          </div>
          <a href="${WEBSITE_URL}" class="cta-button">${t.visitWebsite}</a>
        </div>
        
        <div class="footer">
          <div class="signature">${t.signature}</div>
          <div class="footer-links">
            <a href="${WEBSITE_URL}">hipervinculo.net</a>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>
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
      const { fullName, email, companyName, phone, inquiryType, message } = payload;
      clientEmail = email;
      
      // Admin email (simple)
      adminSubject = `${t.subject.contact} ${fullName}`;
      adminHtml = `
        <!DOCTYPE html>
        <html>
         <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${getDarkModeOverride()}
          <style>${getAdminEmailStyles()}</style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
               <div class="logo-header" style="background-color:#ffffff !important;">
                <img src="${LOGO_URL}" alt="Hipervinculo" class="logo">
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
                ${phone ? `
                <div class="field">
                  <div class="label">${t.contact.phone}</div>
                  <div class="value"><a href="tel:${phone}">${phone}</a></div>
                </div>
                ` : ''}
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

      // Client confirmation email (beautiful)
      clientSubject = t.subject.contactClient;
      clientHtml = generateClientContactEmail(t.contact, { fullName, email, phone, companyName, inquiryType, message });

    } else if (payload.type === "audit") {
      const { companyName, email, websiteUrl, monthlyRevenue, monthlyAdSpend, businessType, growthGoals } = payload;
      clientEmail = email;
      
      // Admin email (simple)
      adminSubject = `${t.subject.audit} ${companyName}`;
      adminHtml = `
        <!DOCTYPE html>
        <html>
         <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          ${getDarkModeOverride()}
          <style>${getAdminEmailStyles()}</style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
               <div class="logo-header" style="background-color:#ffffff !important;">
                <img src="${LOGO_URL}" alt="Hipervinculo" class="logo">
              </div>
              <div class="header" style="background: #8BC34A;">
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

      // Client confirmation email (beautiful)
      clientSubject = t.subject.auditClient;
      clientHtml = generateClientAuditEmail(t.audit, { companyName, email, websiteUrl, businessType, monthlyRevenue, monthlyAdSpend, growthGoals });
    } else if (payload.type === "website-audit") {
      const { businessName, email, websiteUrl, businessType, contactName, phone, overallScore, estimatedLeadsLost, estimatedRevenueLost } = payload;
      clientEmail = email;

      adminSubject = `[Hipervinculo] New Website Score Lead: ${businessName} (Score: ${overallScore}/100)`;
      adminHtml = `
         <!DOCTYPE html><html><head><meta charset="utf-8">${getDarkModeOverride()}<style>${getAdminEmailStyles()}</style></head><body>
        <div class="wrapper"><div class="container">
          <div class="logo-header" style="background-color:#ffffff !important;"><img src="${LOGO_URL}" alt="Hipervinculo" class="logo"></div>
          <div class="header"><h1>New Website Score Lead</h1></div>
          <div class="content">
            <div class="field"><div class="label">Business:</div><div class="value">${businessName}</div></div>
            ${contactName ? `<div class="field"><div class="label">Contact:</div><div class="value">${contactName}</div></div>` : ''}
            ${phone ? `<div class="field"><div class="label">Phone:</div><div class="value"><a href="tel:${phone}">${phone}</a></div></div>` : ''}
            <div class="field"><div class="label">Email:</div><div class="value"><a href="mailto:${email}">${email}</a></div></div>
            <div class="field"><div class="label">Website:</div><div class="value"><a href="${websiteUrl}" target="_blank">${websiteUrl}</a></div></div>
            <div class="field"><div class="label">Business Type:</div><div class="value">${businessType}</div></div>
            <div class="field"><div class="label">Score:</div><div class="value" style="font-size:24px;font-weight:bold;color:${overallScore < 50 ? '#ef4444' : overallScore < 70 ? '#f97316' : '#eab308'}">${overallScore}/100</div></div>
            <div class="field"><div class="label">Est. Leads Lost:</div><div class="value">${estimatedLeadsLost}/month</div></div>
            <div class="field"><div class="label">Est. Revenue Lost:</div><div class="value">$${estimatedRevenueLost.toLocaleString()}/month</div></div>
          </div>
        </div></div></body></html>`;

      clientSubject = lang === 'es' ? 'Tu Score de Rendimiento Web - Hipervinculo' : 'Your Website Performance Score - Hipervinculo';
      clientHtml = `
         <!DOCTYPE html><html><head><meta charset="utf-8">${getDarkModeOverride()}<style>${getClientEmailStyles()}</style></head><body>
        <div class="wrapper"><div class="container">
          <div class="logo-header" style="background-color:#ffffff !important;"><img src="${LOGO_URL}" alt="Hipervinculo" class="logo"></div>
          <div class="header"><h1>${lang === 'es' ? 'Tu Score de Rendimiento Web' : 'Your Website Performance Score'}</h1>
            <p>${lang === 'es' ? 'Aquí están los resultados de tu análisis' : 'Here are your analysis results'}</p></div>
          <div class="content">
            <div class="section">
              <div class="section-title">${lang === 'es' ? 'Resultados' : 'Results'}</div>
              <div class="field"><div class="label">${lang === 'es' ? 'Sitio web:' : 'Website:'}</div><div class="value">${websiteUrl}</div></div>
              <div class="field"><div class="label">Score:</div><div class="value" style="font-size:24px;font-weight:bold;color:${overallScore < 50 ? '#ef4444' : overallScore < 70 ? '#f97316' : '#eab308'}">${overallScore}/100</div></div>
            </div>
            <div class="section">
              <div class="section-title">${lang === 'es' ? '¿Qué sigue?' : 'What happens next?'}</div>
              <div class="next-steps">
                <div class="step"><div class="step-number">1</div><div class="step-text">${lang === 'es' ? 'Nuestro equipo revisará tu score en detalle' : 'Our team will review your score in detail'}</div></div>
                <div class="step"><div class="step-number">2</div><div class="step-text">${lang === 'es' ? 'Te contactaremos con recomendaciones personalizadas' : 'We\'ll reach out with personalized recommendations'}</div></div>
                <div class="step"><div class="step-number">3</div><div class="step-text">${lang === 'es' ? 'Si calificas, construiremos un prototipo gratis de tu nuevo sitio' : 'If you qualify, we\'ll build a free prototype of your new site'}</div></div>
              </div>
            </div>
          </div>
          <div class="contact-section">
            <div class="contact-title">${lang === 'es' ? '¿Necesitas ayuda inmediata?' : 'Need immediate assistance?'}</div>
            <div class="contact-info">
              <div class="contact-item"><a href="mailto:${CONTACT_INFO.email}">${CONTACT_INFO.email}</a></div>
              <div class="contact-item"><a href="tel:${CONTACT_INFO.phone.replace(/\\s/g, '')}">${CONTACT_INFO.phone}</a></div>
            </div>
            <a href="${WEBSITE_URL}" class="cta-button">${lang === 'es' ? 'Visita nuestro sitio web' : 'Visit our website'}</a>
          </div>
          <div class="footer"><div class="signature">${lang === 'es' ? 'El Equipo de Hipervinculo' : 'The Hipervinculo Team'}</div></div>
        </div></div></body></html>`;

    } else if (payload.type === "preview-lead") {
      const { businessName, businessType, websiteUrl, serviceArea, employeeCount, currentAdvertising, contactName, phone, email, monthlyBudget, leadScore } = payload;
      clientEmail = email;

      const scoreEmoji = leadScore === 'hot' ? '🔥 HOT' : leadScore === 'warm' ? '⚡ Warm' : '📋 New';
      adminSubject = `${scoreEmoji} Lead — ${businessName} wants a website preview`;
      adminHtml = `
         <!DOCTYPE html><html><head><meta charset="utf-8">${getDarkModeOverride()}<style>${getAdminEmailStyles()}</style></head><body>
        <div class="wrapper"><div class="container">
          <div class="logo-header" style="background-color:#ffffff !important;"><img src="${LOGO_URL}" alt="Hipervinculo" class="logo"></div>
          <div class="header" style="background:${leadScore === 'hot' ? '#ef4444' : leadScore === 'warm' ? '#f97316' : '#2d4a2d'};"><h1>${scoreEmoji} Lead — Website Preview Request</h1></div>
          <div class="content">
            <div style="text-align:center;padding:16px;margin-bottom:16px;background:${leadScore === 'hot' ? '#fef2f2' : leadScore === 'warm' ? '#fff7ed' : '#f8f9f5'};border-radius:8px;">
              <div style="font-size:32px;font-weight:bold;color:${leadScore === 'hot' ? '#ef4444' : leadScore === 'warm' ? '#f97316' : '#666'};">${leadScore.toUpperCase()}</div>
              <div style="font-size:13px;color:#888;">Lead Score</div>
            </div>
            <div class="field"><div class="label">Contact:</div><div class="value">${contactName}</div></div>
            <div class="field"><div class="label">Phone:</div><div class="value"><a href="tel:${phone}">${phone}</a></div></div>
            <div class="field"><div class="label">Email:</div><div class="value"><a href="mailto:${email}">${email}</a></div></div>
            <div class="field"><div class="label">Business:</div><div class="value">${businessName}</div></div>
            <div class="field"><div class="label">Website:</div><div class="value">${websiteUrl === 'no-website' ? 'No website yet' : `<a href="${websiteUrl}" target="_blank">${websiteUrl}</a>`}</div></div>
            <div class="field"><div class="label">Service Type:</div><div class="value">${businessType}</div></div>
            <div class="field"><div class="label">Service Area:</div><div class="value">${serviceArea}</div></div>
            <div class="field"><div class="label">Employees:</div><div class="value">${employeeCount}</div></div>
            <div class="field"><div class="label">Current Advertising:</div><div class="value">${currentAdvertising}</div></div>
            <div class="field"><div class="label">Monthly Budget:</div><div class="value" style="font-weight:bold;">${monthlyBudget}</div></div>
          </div>
        </div></div></body></html>`;

      // Client confirmation
      clientSubject = lang === 'es' ? '¡Tu Vista Previa está en Camino! - Hipervinculo' : "Your Website Preview is On Its Way! - Hipervinculo";
      clientHtml = `
         <!DOCTYPE html><html><head><meta charset="utf-8">${getDarkModeOverride()}<style>${getClientEmailStyles()}</style></head><body>
        <div class="wrapper"><div class="container">
          <div class="logo-header" style="background-color:#ffffff !important;"><img src="${LOGO_URL}" alt="Hipervinculo" class="logo"></div>
          <div class="header"><h1>${lang === 'es' ? '¡Tu Vista Previa está en Camino!' : "Your Website Preview is On Its Way!"}</h1>
            <p>${lang === 'es' ? 'Estamos diseñando algo especial para tu negocio' : "We're designing something special for your business"}</p></div>
          <div class="content">
            <div class="section">
              <div class="section-title">${lang === 'es' ? '¿Qué sigue?' : 'What happens next?'}</div>
              <div class="next-steps">
                <div class="step"><div class="step-number">1</div><div class="step-text">${lang === 'es' ? 'Nuestro equipo revisará tu información' : "Our team will review your information"}</div></div>
                <div class="step"><div class="step-number">2</div><div class="step-text">${lang === 'es' ? 'Diseñaremos una vista previa personalizada de tu nuevo sitio web' : "We'll design a custom preview of your new website"}</div></div>
                <div class="step"><div class="step-number">3</div><div class="step-text">${lang === 'es' ? 'La recibirás por email en 3-5 días hábiles' : "You'll receive it via email within 3-5 business days"}</div></div>
              </div>
            </div>
          </div>
          <div class="contact-section">
            <div class="contact-title">${lang === 'es' ? '¿Necesitas ayuda inmediata?' : 'Need immediate assistance?'}</div>
            <div class="contact-info">
              <div class="contact-item"><a href="mailto:${CONTACT_INFO.email}">${CONTACT_INFO.email}</a></div>
              <div class="contact-item"><a href="tel:${CONTACT_INFO.phone.replace(/\\s/g, '')}">${CONTACT_INFO.phone}</a></div>
            </div>
            <a href="${WEBSITE_URL}" class="cta-button">${lang === 'es' ? 'Visita nuestro sitio web' : 'Visit our website'}</a>
          </div>
          <div class="footer"><div class="signature">${lang === 'es' ? 'El Equipo de Hipervinculo' : 'The Hipervinculo Team'}</div></div>
        </div></div></body></html>`;
    } else {
      throw new Error("Invalid notification type");
    }

    // Send email to admin first
    console.log("Sending admin email to info@hipervinculo.net");
    const adminEmailResponse = await resend.emails.send({
      from: "Hipervinculo <notificaciones@hipervinculo.net>",
      to: ["info@hipervinculo.net", "alejandro@hipervinculo.net"],
      subject: adminSubject,
      html: adminHtml,
    });
    console.log("Admin email sent:", adminEmailResponse);

    let clientEmailId = null;
    // Only send client email if there's content
    if (clientSubject && clientHtml) {
      // Wait 1 second to avoid rate limiting (Resend allows 2 requests/second)
      await delay(1000);

      // Send confirmation email to client
      console.log("Sending confirmation email to client:", clientEmail);
      const clientEmailResponse = await resend.emails.send({
        from: "Hipervinculo <notificaciones@hipervinculo.net>",
        to: [clientEmail],
        subject: clientSubject,
        html: clientHtml,
      });
      console.log("Client confirmation email sent:", clientEmailResponse);
      clientEmailId = clientEmailResponse.id;
    }

    return new Response(JSON.stringify({ 
      success: true, 
      adminEmailId: adminEmailResponse.id,
      clientEmailId,
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
