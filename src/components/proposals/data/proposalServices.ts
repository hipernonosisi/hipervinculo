// Predefined services for proposals - bilingual
export interface ServiceItem {
  id: string;
  name: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  basePrice: number;
  currency: 'USD' | 'EUR';
  type: 'one-time' | 'monthly' | 'percentage';
  category: string;
  percentageValue?: number; // For percentage-based services
  requiredApps?: RequiredApp[]; // Mandatory apps/tools
}

export interface RequiredApp {
  name: string;
  url: string;
  description: {
    en: string;
    es: string;
  };
}

export const predefinedServices: ServiceItem[] = [
  // Lead Generation Services
  {
    id: 'lead-gen-website',
    name: {
      en: 'Conversion-Focused Website',
      es: 'Sitio Web de Conversión',
    },
    description: {
      en: 'Complete website build optimized for lead capture with forms, CTAs, and tracking.',
      es: 'Construcción completa de sitio web optimizado para captura de leads con formularios, CTAs y seguimiento.',
    },
    basePrice: 2500,
    currency: 'USD',
    type: 'one-time',
    category: 'Lead Generation',
  },
  {
    id: 'lead-gen-landing',
    name: {
      en: 'Landing Page Development',
      es: 'Desarrollo de Landing Page',
    },
    description: {
      en: 'Campaign-specific landing page aligned with search intent.',
      es: 'Landing page específica de campaña alineada con intención de búsqueda.',
    },
    basePrice: 500,
    currency: 'USD',
    type: 'one-time',
    category: 'Lead Generation',
  },
  {
    id: 'lead-gen-google-ads',
    name: {
      en: 'Google Ads Management',
      es: 'Gestión de Google Ads',
    },
    description: {
      en: 'Full Google Ads campaign management including Search, Local Services, and Display.',
      es: 'Gestión completa de campañas de Google Ads incluyendo Search, Local Services y Display.',
    },
    basePrice: 1000,
    currency: 'USD',
    type: 'monthly',
    category: 'Lead Generation',
  },
  {
    id: 'lead-gen-tracking',
    name: {
      en: 'Tracking & Attribution Setup',
      es: 'Configuración de Tracking y Atribución',
    },
    description: {
      en: 'GA4, GTM, call tracking, and form tracking implementation.',
      es: 'Implementación de GA4, GTM, seguimiento de llamadas y formularios.',
    },
    basePrice: 750,
    currency: 'USD',
    type: 'one-time',
    category: 'Lead Generation',
  },
  // eCommerce Services
  {
    id: 'ecom-meta-ads',
    name: {
      en: 'Meta Ads Management',
      es: 'Gestión de Meta Ads',
    },
    description: {
      en: 'Facebook & Instagram advertising with full-funnel strategy.',
      es: 'Publicidad en Facebook e Instagram con estrategia de embudo completo.',
    },
    basePrice: 1500,
    currency: 'USD',
    type: 'monthly',
    category: 'eCommerce',
  },
  {
    id: 'ecom-google-shopping',
    name: {
      en: 'Google Shopping & PMAX',
      es: 'Google Shopping y PMAX',
    },
    description: {
      en: 'Shopping campaigns and Performance Max optimization.',
      es: 'Campañas de Shopping y optimización de Performance Max.',
    },
    basePrice: 1200,
    currency: 'USD',
    type: 'monthly',
    category: 'eCommerce',
  },
  {
    id: 'ecom-server-tracking',
    name: {
      en: 'Server-Side Tracking',
      es: 'Tracking Server-Side',
    },
    description: {
      en: 'Enhanced conversions and Conversion API implementation.',
      es: 'Conversiones mejoradas e implementación de Conversion API.',
    },
    basePrice: 1500,
    currency: 'USD',
    type: 'one-time',
    category: 'eCommerce',
  },
  // Amazon Services
  {
    id: 'amazon-ppc',
    name: {
      en: 'Amazon PPC Management',
      es: 'Gestión de Amazon PPC',
    },
    description: {
      en: 'Sponsored Products, Brands, and Display campaign management.',
      es: 'Gestión de campañas Sponsored Products, Brands y Display.',
    },
    basePrice: 800,
    currency: 'USD',
    type: 'monthly',
    category: 'Amazon',
  },
  {
    id: 'amazon-listing',
    name: {
      en: 'Listing Optimization',
      es: 'Optimización de Listings',
    },
    description: {
      en: 'SEO-optimized titles, bullets, descriptions, and A+ content.',
      es: 'Títulos, viñetas, descripciones y contenido A+ optimizados para SEO.',
    },
    basePrice: 300,
    currency: 'USD',
    type: 'one-time',
    category: 'Amazon',
  },
  {
    id: 'amazon-growth-partner',
    name: {
      en: 'Amazon Growth Partner',
      es: 'Amazon Growth Partner',
    },
    description: {
      en: 'Full-service Amazon growth management with profit-sharing model. Includes PPC optimization, listing management, inventory planning, and strategic guidance.',
      es: 'Gestión integral de crecimiento en Amazon con modelo de participación en ganancias. Incluye optimización de PPC, gestión de listings, planificación de inventario y guía estratégica.',
    },
    basePrice: 0,
    currency: 'USD',
    type: 'percentage',
    category: 'Amazon',
    percentageValue: 10,
    requiredApps: [
      {
        name: 'Sellerise',
        url: 'https://sellerise.com/',
        description: {
          en: 'Advanced Amazon analytics and profit tracking platform - Required for accurate profit calculation and performance monitoring.',
          es: 'Plataforma avanzada de analítica y seguimiento de ganancias en Amazon - Requerida para cálculo preciso de ganancias y monitoreo de rendimiento.',
        },
      },
      {
        name: 'Profasee',
        url: 'https://profasee.com/',
        description: {
          en: 'AI-powered dynamic repricing tool - Required for optimal pricing strategy and margin protection.',
          es: 'Herramienta de repricing dinámico con IA - Requerida para estrategia de precios óptima y protección de márgenes.',
        },
      },
    ],
  },
  // Add-ons
  {
    id: 'addon-whatsapp',
    name: {
      en: 'WhatsApp Business Setup',
      es: 'Configuración de WhatsApp Business',
    },
    description: {
      en: 'WhatsApp Business API integration with auto-responses.',
      es: 'Integración de API de WhatsApp Business con auto-respuestas.',
    },
    basePrice: 300,
    currency: 'USD',
    type: 'one-time',
    category: 'Add-ons',
  },
  {
    id: 'addon-call-tracking',
    name: {
      en: 'Call Tracking Premium',
      es: 'Call Tracking Premium',
    },
    description: {
      en: 'Call recording, transcription, and keyword attribution.',
      es: 'Grabación de llamadas, transcripción y atribución de keywords.',
    },
    basePrice: 150,
    currency: 'USD',
    type: 'monthly',
    category: 'Add-ons',
  },
  {
    id: 'addon-crm-setup',
    name: {
      en: 'CRM Setup & Training',
      es: 'Configuración y Entrenamiento CRM',
    },
    description: {
      en: 'Full CRM implementation with team training sessions.',
      es: 'Implementación completa de CRM con sesiones de entrenamiento.',
    },
    basePrice: 750,
    currency: 'USD',
    type: 'one-time',
    category: 'Add-ons',
  },
  {
    id: 'addon-microsoft-ads',
    name: {
      en: 'Microsoft Ads Management',
      es: 'Gestión de Microsoft Ads',
    },
    description: {
      en: 'Bing and Microsoft network advertising management.',
      es: 'Gestión de publicidad en Bing y red de Microsoft.',
    },
    basePrice: 300,
    currency: 'USD',
    type: 'monthly',
    category: 'Add-ons',
  },
];

export const serviceCategories = [
  'Lead Generation',
  'eCommerce',
  'Amazon',
  'Add-ons',
];

export const defaultPaymentTerms = {
  en: `Payment Terms:
• 50% deposit required to begin work
• Remaining 50% due upon completion
• Monthly services billed on the 1st of each month
• Net 15 payment terms`,
  es: `Términos de Pago:
• 50% de depósito requerido para iniciar
• 50% restante al completar
• Servicios mensuales facturados el 1ro de cada mes
• Términos de pago: 15 días netos`,
};
