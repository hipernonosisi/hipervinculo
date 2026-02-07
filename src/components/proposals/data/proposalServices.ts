// Predefined services for proposals - bilingual
export interface AgreementTerms {
  duration: {
    en: string;
    es: string;
  };
  paymentTerms: {
    en: string;
    es: string;
  };
  termsAndConditions: {
    en: string[];
    es: string[];
  };
}

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
  agreementTerms?: AgreementTerms; // Contract terms for profit-share agreements
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
  {
    id: 'lead-gen-local-seo',
    name: {
      en: 'Local SEO & Google Business',
      es: 'SEO Local y Google Business',
    },
    description: {
      en: 'Google Business Profile optimization, local citations, and review management.',
      es: 'Optimización de perfil de Google Business, citaciones locales y gestión de reseñas.',
    },
    basePrice: 500,
    currency: 'USD',
    type: 'monthly',
    category: 'Lead Generation',
  },
  {
    id: 'lead-gen-seo',
    name: {
      en: 'SEO Strategy & Implementation',
      es: 'Estrategia e Implementación SEO',
    },
    description: {
      en: 'Technical SEO audit, on-page optimization, and content strategy for organic growth.',
      es: 'Auditoría técnica SEO, optimización on-page y estrategia de contenido para crecimiento orgánico.',
    },
    basePrice: 1500,
    currency: 'USD',
    type: 'monthly',
    category: 'Lead Generation',
  },
  {
    id: 'lead-gen-remarketing',
    name: {
      en: 'Remarketing Campaigns',
      es: 'Campañas de Remarketing',
    },
    description: {
      en: 'Cross-platform remarketing strategy to re-engage visitors and increase conversions.',
      es: 'Estrategia de remarketing multi-plataforma para re-enganchar visitantes y aumentar conversiones.',
    },
    basePrice: 400,
    currency: 'USD',
    type: 'monthly',
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
  {
    id: 'ecom-email-marketing',
    name: {
      en: 'Email Marketing Automation',
      es: 'Automatización de Email Marketing',
    },
    description: {
      en: 'Klaviyo/Mailchimp setup with flows for abandoned cart, welcome series, and post-purchase.',
      es: 'Configuración de Klaviyo/Mailchimp con flujos de carrito abandonado, bienvenida y post-compra.',
    },
    basePrice: 1000,
    currency: 'USD',
    type: 'one-time',
    category: 'eCommerce',
  },
  {
    id: 'ecom-email-management',
    name: {
      en: 'Email Campaign Management',
      es: 'Gestión de Campañas de Email',
    },
    description: {
      en: 'Ongoing email marketing with weekly campaigns, A/B testing, and performance reporting.',
      es: 'Email marketing continuo con campañas semanales, pruebas A/B y reportes de rendimiento.',
    },
    basePrice: 600,
    currency: 'USD',
    type: 'monthly',
    category: 'eCommerce',
  },
  {
    id: 'ecom-shopify-setup',
    name: {
      en: 'Shopify Store Setup',
      es: 'Configuración de Tienda Shopify',
    },
    description: {
      en: 'Complete Shopify store setup including theme customization, apps, and payment integration.',
      es: 'Configuración completa de tienda Shopify incluyendo personalización de tema, apps e integración de pagos.',
    },
    basePrice: 2000,
    currency: 'USD',
    type: 'one-time',
    category: 'eCommerce',
  },
  {
    id: 'ecom-tiktok-ads',
    name: {
      en: 'TikTok Ads Management',
      es: 'Gestión de TikTok Ads',
    },
    description: {
      en: 'TikTok advertising with creative strategy, audience targeting, and conversion optimization.',
      es: 'Publicidad en TikTok con estrategia creativa, segmentación de audiencia y optimización de conversiones.',
    },
    basePrice: 1200,
    currency: 'USD',
    type: 'monthly',
    category: 'eCommerce',
  },
  {
    id: 'ecom-influencer',
    name: {
      en: 'Influencer Marketing',
      es: 'Marketing de Influencers',
    },
    description: {
      en: 'Influencer outreach, negotiation, campaign management, and performance tracking.',
      es: 'Búsqueda de influencers, negociación, gestión de campañas y seguimiento de rendimiento.',
    },
    basePrice: 1500,
    currency: 'USD',
    type: 'monthly',
    category: 'eCommerce',
  },
  {
    id: 'ecom-creative-production',
    name: {
      en: 'Creative Production (Ads)',
      es: 'Producción Creativa (Ads)',
    },
    description: {
      en: 'Monthly ad creative production including static images, carousels, and video ads.',
      es: 'Producción mensual de creativos incluyendo imágenes estáticas, carruseles y anuncios de video.',
    },
    basePrice: 800,
    currency: 'USD',
    type: 'monthly',
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
    id: 'amazon-brand-store',
    name: {
      en: 'Amazon Brand Store Design',
      es: 'Diseño de Brand Store Amazon',
    },
    description: {
      en: 'Custom Amazon storefront design with branded experience and product showcases.',
      es: 'Diseño de tienda Amazon personalizada con experiencia de marca y exhibición de productos.',
    },
    basePrice: 600,
    currency: 'USD',
    type: 'one-time',
    category: 'Amazon',
  },
  {
    id: 'amazon-aplus-premium',
    name: {
      en: 'A+ Premium Content',
      es: 'Contenido A+ Premium',
    },
    description: {
      en: 'Premium A+ content with video, interactive modules, and enhanced brand storytelling.',
      es: 'Contenido A+ Premium con video, módulos interactivos y storytelling de marca mejorado.',
    },
    basePrice: 500,
    currency: 'USD',
    type: 'one-time',
    category: 'Amazon',
  },
  {
    id: 'amazon-dsp',
    name: {
      en: 'Amazon DSP Management',
      es: 'Gestión de Amazon DSP',
    },
    description: {
      en: 'Programmatic display advertising on and off Amazon with advanced audience targeting.',
      es: 'Publicidad programática dentro y fuera de Amazon con segmentación avanzada de audiencias.',
    },
    basePrice: 1500,
    currency: 'USD',
    type: 'monthly',
    category: 'Amazon',
  },
  {
    id: 'amazon-launch',
    name: {
      en: 'Product Launch Strategy',
      es: 'Estrategia de Lanzamiento de Producto',
    },
    description: {
      en: 'Complete product launch including keyword research, PPC strategy, and review generation.',
      es: 'Lanzamiento completo de producto incluyendo investigación de keywords, estrategia PPC y generación de reseñas.',
    },
    basePrice: 1000,
    currency: 'USD',
    type: 'one-time',
    category: 'Amazon',
  },
  {
    id: 'amazon-growth-partner-10',
    name: {
      en: 'Amazon Growth Partner (10%)',
      es: 'Amazon Growth Partner (10%)',
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
    agreementTerms: {
      duration: {
        en: '1 year, renewable for an additional year',
        es: '1 año, renovable por un año adicional',
      },
      paymentTerms: {
        en: 'NET 15 - Payment due within 15 days after the end of each calendar month based on verified profit calculations from Sellerise.',
        es: 'NET 15 - Pago debido dentro de 15 días después del final de cada mes calendario basado en cálculos de ganancia verificados de Sellerise.',
      },
      termsAndConditions: {
        en: [
          'The profit share percentage applies to net profit after advertising costs, Amazon fees, and cost of goods sold.',
          'Either party may terminate with 30 days written notice after the initial 6-month period.',
          'Client must maintain active Sellerise and Profasee subscriptions throughout the agreement term.',
          'Performance reports will be delivered monthly with detailed profit and advertising metrics.',
          'Minimum commitment period of 6 months before termination rights apply.',
        ],
        es: [
          'El porcentaje de participación en ganancias aplica sobre la ganancia neta después de costos de publicidad, tarifas de Amazon y costo de productos vendidos.',
          'Cualquiera de las partes puede terminar con 30 días de aviso por escrito después del período inicial de 6 meses.',
          'El cliente debe mantener suscripciones activas de Sellerise y Profasee durante todo el plazo del acuerdo.',
          'Se entregarán reportes de rendimiento mensuales con métricas detalladas de ganancia y publicidad.',
          'Período mínimo de compromiso de 6 meses antes de que apliquen los derechos de terminación.',
        ],
      },
    },
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
  {
    id: 'amazon-growth-partner-15',
    name: {
      en: 'Amazon Growth Partner (15%)',
      es: 'Amazon Growth Partner (15%)',
    },
    description: {
      en: 'Full-service Amazon growth management with profit-sharing model. Includes PPC optimization, listing management, inventory planning, and strategic guidance.',
      es: 'Gestión integral de crecimiento en Amazon con modelo de participación en ganancias. Incluye optimización de PPC, gestión de listings, planificación de inventario y guía estratégica.',
    },
    basePrice: 0,
    currency: 'USD',
    type: 'percentage',
    category: 'Amazon',
    percentageValue: 15,
    agreementTerms: {
      duration: {
        en: '1 year, renewable for an additional year',
        es: '1 año, renovable por un año adicional',
      },
      paymentTerms: {
        en: 'NET 15 - Payment due within 15 days after the end of each calendar month based on verified profit calculations from Sellerise.',
        es: 'NET 15 - Pago debido dentro de 15 días después del final de cada mes calendario basado en cálculos de ganancia verificados de Sellerise.',
      },
      termsAndConditions: {
        en: [
          'The profit share percentage applies to net profit after advertising costs, Amazon fees, and cost of goods sold.',
          'Either party may terminate with 30 days written notice after the initial 6-month period.',
          'Client must maintain active Sellerise and Profasee subscriptions throughout the agreement term.',
          'Performance reports will be delivered monthly with detailed profit and advertising metrics.',
          'Minimum commitment period of 6 months before termination rights apply.',
        ],
        es: [
          'El porcentaje de participación en ganancias aplica sobre la ganancia neta después de costos de publicidad, tarifas de Amazon y costo de productos vendidos.',
          'Cualquiera de las partes puede terminar con 30 días de aviso por escrito después del período inicial de 6 meses.',
          'El cliente debe mantener suscripciones activas de Sellerise y Profasee durante todo el plazo del acuerdo.',
          'Se entregarán reportes de rendimiento mensuales con métricas detalladas de ganancia y publicidad.',
          'Período mínimo de compromiso de 6 meses antes de que apliquen los derechos de terminación.',
        ],
      },
    },
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
  {
    id: 'amazon-growth-partner-20',
    name: {
      en: 'Amazon Growth Partner (20%)',
      es: 'Amazon Growth Partner (20%)',
    },
    description: {
      en: 'Full-service Amazon growth management with profit-sharing model. Includes PPC optimization, listing management, inventory planning, and strategic guidance.',
      es: 'Gestión integral de crecimiento en Amazon con modelo de participación en ganancias. Incluye optimización de PPC, gestión de listings, planificación de inventario y guía estratégica.',
    },
    basePrice: 0,
    currency: 'USD',
    type: 'percentage',
    category: 'Amazon',
    percentageValue: 20,
    agreementTerms: {
      duration: {
        en: '1 year, renewable for an additional year',
        es: '1 año, renovable por un año adicional',
      },
      paymentTerms: {
        en: 'NET 15 - Payment due within 15 days after the end of each calendar month based on verified profit calculations from Sellerise.',
        es: 'NET 15 - Pago debido dentro de 15 días después del final de cada mes calendario basado en cálculos de ganancia verificados de Sellerise.',
      },
      termsAndConditions: {
        en: [
          'The profit share percentage applies to net profit after advertising costs, Amazon fees, and cost of goods sold.',
          'Either party may terminate with 30 days written notice after the initial 6-month period.',
          'Client must maintain active Sellerise and Profasee subscriptions throughout the agreement term.',
          'Performance reports will be delivered monthly with detailed profit and advertising metrics.',
          'Minimum commitment period of 6 months before termination rights apply.',
        ],
        es: [
          'El porcentaje de participación en ganancias aplica sobre la ganancia neta después de costos de publicidad, tarifas de Amazon y costo de productos vendidos.',
          'Cualquiera de las partes puede terminar con 30 días de aviso por escrito después del período inicial de 6 meses.',
          'El cliente debe mantener suscripciones activas de Sellerise y Profasee durante todo el plazo del acuerdo.',
          'Se entregarán reportes de rendimiento mensuales con métricas detalladas de ganancia y publicidad.',
          'Período mínimo de compromiso de 6 meses antes de que apliquen los derechos de terminación.',
        ],
      },
    },
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
  {
    id: 'amazon-growth-partner-25',
    name: {
      en: 'Amazon Growth Partner (25%)',
      es: 'Amazon Growth Partner (25%)',
    },
    description: {
      en: 'Full-service Amazon growth management with profit-sharing model. Includes PPC optimization, listing management, inventory planning, and strategic guidance.',
      es: 'Gestión integral de crecimiento en Amazon con modelo de participación en ganancias. Incluye optimización de PPC, gestión de listings, planificación de inventario y guía estratégica.',
    },
    basePrice: 0,
    currency: 'USD',
    type: 'percentage',
    category: 'Amazon',
    percentageValue: 25,
    agreementTerms: {
      duration: {
        en: '1 year, renewable for an additional year',
        es: '1 año, renovable por un año adicional',
      },
      paymentTerms: {
        en: 'NET 15 - Payment due within 15 days after the end of each calendar month based on verified profit calculations from Sellerise.',
        es: 'NET 15 - Pago debido dentro de 15 días después del final de cada mes calendario basado en cálculos de ganancia verificados de Sellerise.',
      },
      termsAndConditions: {
        en: [
          'The profit share percentage applies to net profit after advertising costs, Amazon fees, and cost of goods sold.',
          'Either party may terminate with 30 days written notice after the initial 6-month period.',
          'Client must maintain active Sellerise and Profasee subscriptions throughout the agreement term.',
          'Performance reports will be delivered monthly with detailed profit and advertising metrics.',
          'Minimum commitment period of 6 months before termination rights apply.',
        ],
        es: [
          'El porcentaje de participación en ganancias aplica sobre la ganancia neta después de costos de publicidad, tarifas de Amazon y costo de productos vendidos.',
          'Cualquiera de las partes puede terminar con 30 días de aviso por escrito después del período inicial de 6 meses.',
          'El cliente debe mantener suscripciones activas de Sellerise y Profasee durante todo el plazo del acuerdo.',
          'Se entregarán reportes de rendimiento mensuales con métricas detalladas de ganancia y publicidad.',
          'Período mínimo de compromiso de 6 meses antes de que apliquen los derechos de terminación.',
        ],
      },
    },
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
  // Web Development
  {
    id: 'webdev-custom-app',
    name: {
      en: 'Custom Web Application',
      es: 'Aplicación Web Personalizada',
    },
    description: {
      en: 'Bespoke web application development for inventory, CRM, or internal tools.',
      es: 'Desarrollo de aplicación web a medida para inventario, CRM o herramientas internas.',
    },
    basePrice: 5000,
    currency: 'USD',
    type: 'one-time',
    category: 'Web Development',
  },
  {
    id: 'webdev-ecom-website',
    name: {
      en: 'eCommerce Website',
      es: 'Sitio Web eCommerce',
    },
    description: {
      en: 'Full eCommerce website with product catalog, checkout, and payment integration.',
      es: 'Sitio web eCommerce completo con catálogo de productos, checkout e integración de pagos.',
    },
    basePrice: 3500,
    currency: 'USD',
    type: 'one-time',
    category: 'Web Development',
  },
  {
    id: 'webdev-maintenance',
    name: {
      en: 'Website Maintenance',
      es: 'Mantenimiento de Sitio Web',
    },
    description: {
      en: 'Ongoing website maintenance including updates, security patches, and minor changes.',
      es: 'Mantenimiento continuo de sitio web incluyendo actualizaciones, parches de seguridad y cambios menores.',
    },
    basePrice: 300,
    currency: 'USD',
    type: 'monthly',
    category: 'Web Development',
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
  {
    id: 'addon-chatbot',
    name: {
      en: 'AI Chatbot Integration',
      es: 'Integración de Chatbot IA',
    },
    description: {
      en: 'Custom AI chatbot for lead qualification and customer support on your website.',
      es: 'Chatbot de IA personalizado para calificación de leads y soporte al cliente en tu sitio web.',
    },
    basePrice: 500,
    currency: 'USD',
    type: 'one-time',
    category: 'Add-ons',
  },
  {
    id: 'addon-reporting-dashboard',
    name: {
      en: 'Custom Reporting Dashboard',
      es: 'Dashboard de Reportes Personalizado',
    },
    description: {
      en: 'Real-time marketing dashboard with custom KPIs and automated reporting.',
      es: 'Dashboard de marketing en tiempo real con KPIs personalizados y reportes automatizados.',
    },
    basePrice: 600,
    currency: 'USD',
    type: 'one-time',
    category: 'Add-ons',
  },
  {
    id: 'addon-linkedin-ads',
    name: {
      en: 'LinkedIn Ads Management',
      es: 'Gestión de LinkedIn Ads',
    },
    description: {
      en: 'B2B advertising on LinkedIn with lead generation campaigns and audience targeting.',
      es: 'Publicidad B2B en LinkedIn con campañas de generación de leads y segmentación de audiencia.',
    },
    basePrice: 800,
    currency: 'USD',
    type: 'monthly',
    category: 'Add-ons',
  },
  {
    id: 'addon-social-management',
    name: {
      en: 'Social Media Management',
      es: 'Gestión de Redes Sociales',
    },
    description: {
      en: 'Content planning, posting, and community management across social platforms.',
      es: 'Planificación de contenido, publicación y gestión de comunidad en redes sociales.',
    },
    basePrice: 500,
    currency: 'USD',
    type: 'monthly',
    category: 'Add-ons',
  },
  {
    id: 'addon-video-production',
    name: {
      en: 'Video Production',
      es: 'Producción de Video',
    },
    description: {
      en: 'Professional video production for ads, social media, or product showcases.',
      es: 'Producción de video profesional para anuncios, redes sociales o exhibición de productos.',
    },
    basePrice: 1500,
    currency: 'USD',
    type: 'one-time',
    category: 'Add-ons',
  },
  // Consulting
  {
    id: 'consulting-audit',
    name: {
      en: 'Marketing Audit',
      es: 'Auditoría de Marketing',
    },
    description: {
      en: 'Comprehensive audit of current marketing efforts with actionable recommendations.',
      es: 'Auditoría completa de esfuerzos de marketing actuales con recomendaciones accionables.',
    },
    basePrice: 500,
    currency: 'USD',
    type: 'one-time',
    category: 'Consulting',
  },
  {
    id: 'consulting-strategy',
    name: {
      en: 'Growth Strategy Session',
      es: 'Sesión de Estrategia de Crecimiento',
    },
    description: {
      en: '2-hour strategic planning session with actionable growth roadmap.',
      es: 'Sesión de planificación estratégica de 2 horas con hoja de ruta de crecimiento accionable.',
    },
    basePrice: 300,
    currency: 'USD',
    type: 'one-time',
    category: 'Consulting',
  },
  {
    id: 'consulting-monthly-advisory',
    name: {
      en: 'Monthly Advisory',
      es: 'Asesoría Mensual',
    },
    description: {
      en: 'Ongoing strategic advisory with monthly calls and priority support.',
      es: 'Asesoría estratégica continua con llamadas mensuales y soporte prioritario.',
    },
    basePrice: 500,
    currency: 'USD',
    type: 'monthly',
    category: 'Consulting',
  },
  {
    id: 'consulting-training',
    name: {
      en: 'Team Training Workshop',
      es: 'Taller de Entrenamiento de Equipo',
    },
    description: {
      en: 'Custom training session for your team on digital marketing, ads, or analytics.',
      es: 'Sesión de entrenamiento personalizada para tu equipo en marketing digital, ads o analítica.',
    },
    basePrice: 800,
    currency: 'USD',
    type: 'one-time',
    category: 'Consulting',
  },
];

export const serviceCategories = [
  'Lead Generation',
  'eCommerce',
  'Amazon',
  'Web Development',
  'Add-ons',
  'Consulting',
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
