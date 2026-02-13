// Complete bilingual content for Meta Paid Media Management presentation
export type MetaAdsLanguage = 'en' | 'es';

export interface MetaAdsContent {
  cover: {
    title: string;
    subtitle: string;
    tagline: string;
  };
  about: {
    title: string;
    description: string;
    stats: Array<{ value: string; label: string }>;
    credentials: string[];
  };
  problem: {
    title: string;
    headline: string;
    points: string[];
    insight: string;
    principle: string;
    principleNote: string;
  };
  solution: {
    title: string;
    headline: string;
    intro: string;
    items: Array<{ title: string; description: string }>;
  };
  methodology1: {
    title: string;
    phase: string;
    items: Array<{ title: string; description: string }>;
  };
  methodology2: {
    phase: string;
    items: Array<{ title: string; description: string }>;
  };
  methodology3: {
    phase: string;
    items: Array<{ title: string; description: string }>;
  };
  methodology4: {
    phase: string;
    items: Array<{ title: string; description: string }>;
  };
  techStack: {
    title: string;
    headline: string;
    categories: Array<{
      name: string;
      tools: string[];
    }>;
  };
  reporting: {
    title: string;
    headline: string;
    metrics: Array<{ name: string; description: string }>;
    deliverables: string[];
  };
  pricing: {
    title: string;
    headline: string;
    setup: {
      title: string;
      price: string;
      includes: string[];
    };
    monthly: {
      title: string;
      price: string;
      includes: string[];
    };
    note: string;
  };
  creativeScope: {
    title: string;
    headline: string;
    included: string[];
    notIncluded: string[];
    clarification: string;
  };
  otherServices: {
    title: string;
    headline: string;
    services: Array<{ title: string; description: string }>;
  };
  contact: {
    title: string;
    headline: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    website: string;
    cta: string;
  };
}

export const metaAdsPresentationContent: Record<MetaAdsLanguage, MetaAdsContent> = {
  en: {
    cover: {
      title: 'Meta Ads Management',
      subtitle: 'Performance-Driven Paid Media for Shopify Brands',
      tagline: 'Strategy. Execution. Optimization. Scale.',
    },
    about: {
      title: 'About Hipervinculo',
      description: 'Hipervinculo builds performance-driven growth systems for eCommerce brands ready to scale. We combine paid media management, conversion tracking, and data-driven optimization to turn ad spend into profitable revenue.',
      stats: [
        { value: '+250%', label: 'Revenue Growth' },
        { value: '+180%', label: 'ROAS Improvement' },
        { value: '5-8yr', label: 'Avg. Client Retention' },
      ],
      credentials: [
        '20+ years in digital marketing & eCommerce',
        'Meta Business Partner',
        'Google Partner',
        'Long-term client retention (5-8 years average)',
      ],
    },
    problem: {
      title: 'The Core Problem',
      headline: 'Running ads without a system is just burning money.',
      points: [
        'No clear attribution — you don\'t know which ads actually drive sales.',
        'Scaling spend without understanding unit economics or margins.',
        'Creative fatigue — the same ads running until they stop performing.',
        'No connection between ad performance and Shopify revenue data.',
      ],
      insight: 'Ad spend without measurement and strategy is wasted budget.',
      principle: 'Ads are fuel. The system is the engine.',
      principleNote: 'Without proper tracking, optimization, and creative strategy, growth stays unpredictable.',
    },
    solution: {
      title: 'What We Deliver',
      headline: 'Full-Funnel Meta Ads Management',
      intro: 'We manage your entire Meta advertising ecosystem from strategy to execution:',
      items: [
        {
          title: 'Campaign Strategy & Architecture',
          description: 'Full-funnel campaign structure: prospecting, retargeting, and retention — built for profitability.',
        },
        {
          title: 'Audience Development',
          description: 'Custom audiences, lookalikes, and interest-based targeting refined with first-party Shopify data.',
        },
        {
          title: 'Ad Creative Strategy',
          description: 'We design static ads for direct response. We provide creative direction and edit video content — we don\'t film.',
        },
        {
          title: 'Tracking & Attribution',
          description: 'Pixel, CAPI, server-side tracking, and UTM architecture for complete visibility into every dollar spent.',
        },
        {
          title: 'Continuous Optimization',
          description: 'Daily monitoring, bid adjustments, creative rotation, and budget allocation based on real performance data.',
        },
      ],
    },
    methodology1: {
      title: 'Our Methodology',
      phase: 'Phase 1: Audit & Strategy',
      items: [
        {
          title: 'Account Audit',
          description: 'Deep analysis of your current Meta Ads account, pixel health, audience performance, and creative history.',
        },
        {
          title: 'Shopify Data Review',
          description: 'Review of Shopify revenue, AOV, margins, customer LTV, and product performance to define profitability targets.',
        },
        {
          title: 'Competitive Landscape',
          description: 'Meta Ad Library research, competitor positioning analysis, and creative gap identification.',
        },
        {
          title: 'Campaign Blueprint',
          description: 'Full campaign architecture document: funnel stages, audiences, budgets, KPIs, and creative needs.',
        },
      ],
    },
    methodology2: {
      phase: 'Phase 2: Setup & Launch',
      items: [
        {
          title: 'Tracking Infrastructure',
          description: 'Meta Pixel, Conversions API (CAPI), server-side tracking, and UTM framework implementation.',
        },
        {
          title: 'Campaign Build',
          description: 'Full campaign setup: prospecting (TOF), consideration (MOF), retargeting (BOF), and retention campaigns.',
        },
        {
          title: 'Audience Architecture',
          description: 'Custom audiences from Shopify data, website visitors, email lists, and high-value lookalikes.',
        },
        {
          title: 'Creative Production',
          description: 'Static ad design, video editing, copy variations, and ad format testing (Stories, Reels, Feed, Carousel).',
        },
      ],
    },
    methodology3: {
      phase: 'Phase 3: Optimization',
      items: [
        {
          title: 'Performance Monitoring',
          description: 'Daily review of ROAS, CPA, CTR, CPM, and frequency metrics across all campaigns.',
        },
        {
          title: 'Budget Reallocation',
          description: 'Dynamic budget shifting toward highest-performing campaigns, audiences, and creatives.',
        },
        {
          title: 'Creative Refresh',
          description: 'Regular new static ads, video edits, copy testing, and format experimentation to beat creative fatigue.',
        },
        {
          title: 'Audience Refinement',
          description: 'Continuous audience testing, exclusion management, and lookalike updates based on conversion data.',
        },
      ],
    },
    methodology4: {
      phase: 'Phase 4: Scale & Report',
      items: [
        {
          title: 'Scaling Strategy',
          description: 'Gradual budget increases on proven campaigns while maintaining ROAS targets and margin goals.',
        },
        {
          title: 'Monthly Reporting',
          description: 'Comprehensive performance review: spend, revenue, ROAS, CPA, creative performance, and next steps.',
        },
        {
          title: 'Monthly Strategy Call',
          description: 'Video call to present results, discuss insights, review creative needs, and align on next month\'s plan.',
        },
        {
          title: 'Quarterly Business Review',
          description: 'Deep-dive into trends, seasonality planning, budget recommendations, and long-term growth strategy.',
        },
      ],
    },
    techStack: {
      title: 'Technology & Tools',
      headline: 'Enterprise-Grade Infrastructure',
      categories: [
        {
          name: 'Advertising',
          tools: ['Meta Ads Manager', 'Meta Business Suite', 'Meta Ad Library'],
        },
        {
          name: 'Tracking & Attribution',
          tools: ['Meta Pixel', 'Conversions API (CAPI)', 'Google Analytics 4', 'Google Tag Manager', 'Server-Side Tracking'],
        },
        {
          name: 'eCommerce',
          tools: ['Shopify', 'Shopify Analytics', 'WeTracked.io'],
        },
      ],
    },
    reporting: {
      title: 'Reporting & KPIs',
      headline: 'Full Visibility Into Your Ad Performance',
      metrics: [
        { name: 'ROAS', description: 'Return on ad spend — revenue generated per dollar invested' },
        { name: 'CPA', description: 'Cost per acquisition — total cost to acquire one customer' },
        { name: 'Net Revenue', description: 'Shopify net revenue attributed to Meta campaigns' },
        { name: 'AOV', description: 'Average order value across Meta-driven purchases' },
        { name: 'CPM', description: 'Cost per 1,000 impressions — efficiency of media buying' },
        { name: 'Creative Performance', description: 'CTR, hook rate, and hold rate by ad creative' },
      ],
      deliverables: [
        'Monthly video call to present results and campaign adjustments',
        'Weekly performance summaries',
        'Monthly detailed reports with creative analysis',
        'Quarterly business reviews',
      ],
    },
    pricing: {
      title: 'Investment',
      headline: 'Simple, Transparent Pricing',
      setup: {
        title: 'Starter Plan',
        price: '$1,000/month',
        includes: [
          'Fixed monthly retainer',
          'For Shopify stores under $20K/month revenue',
          'Full Meta Ads management',
          'Campaign strategy & optimization',
          'Tracking setup (Pixel, CAPI)',
          'Static ad design for sales objectives',
          'Video ad editing (you provide raw footage)',
          'Monthly reporting & strategy call',
        ],
      },
      monthly: {
        title: 'Growth Partner',
        price: '5% of Net Revenue',
        includes: [
          'Flat fee: 5% of Shopify net revenue',
          'For stores exceeding $20K/month',
          'Everything in Starter, plus:',
          'Advanced audience development & testing',
          'Unlimited creative iterations',
          'Weekly optimization cycles',
          'Priority support & communication',
          'Quarterly business reviews',
        ],
      },
      note: 'We create static ads designed for sales. We edit video ads from your raw footage. We do not produce video filming or content shoots.',
    },
    creativeScope: {
      title: 'Creative Scope',
      headline: 'What We Create vs. What You Provide',
      included: [
        'Static ad design (product images, lifestyle graphics, promotional banners)',
        'Ad copywriting and headline variations',
        'Video editing and post-production (cuts, text overlays, transitions)',
        'Carousel ad design and sequencing',
        'Stories and Reels format adaptation',
        'Creative direction and briefs for content shoots',
      ],
      notIncluded: [
        'Video filming or content production shoots',
        'UGC creator sourcing or management',
        'Photography sessions',
        'Influencer content creation',
      ],
      clarification: 'You provide raw video footage and product photos. We handle all design, editing, and ad creation from there.',
    },
    otherServices: {
      title: 'Other Services We Offer',
      headline: 'Complete Growth Solutions',
      services: [
        {
          title: 'Google Ads Management',
          description: 'Search, Shopping, Performance Max — managed for profitability.',
        },
        {
          title: 'Shopify Web Development',
          description: 'Custom Shopify stores designed and built for conversion.',
        },
        {
          title: 'Landing Page Development',
          description: 'High-converting landing pages with full tracking infrastructure.',
        },
        {
          title: 'Amazon Seller Services',
          description: 'PPC management, listing optimization, and marketplace growth.',
        },
        {
          title: 'Tracking & Attribution',
          description: 'Server-side tracking, Conversion APIs, and custom dashboards.',
        },
      ],
    },
    contact: {
      title: 'Let\'s Talk',
      headline: 'Ready to Scale Your Shopify Revenue with Meta Ads?',
      description: 'We\'ll review your current ad performance and identify opportunities to drive profitable growth.',
      email: 'info@hipervinculo.net',
      phone: '+1 (786) 529-0679',
      address: '2645 Executive Park Dr, Suite 146\nWeston, FL 33331',
      website: 'hipervinculo.net',
      cta: 'Get in Touch',
    },
  },
  es: {
    cover: {
      title: 'Gestión de Meta Ads',
      subtitle: 'Paid Media Orientado a Resultados para Marcas Shopify',
      tagline: 'Estrategia. Ejecución. Optimización. Escala.',
    },
    about: {
      title: 'Sobre Hipervinculo',
      description: 'Hipervinculo construye sistemas de crecimiento orientados al rendimiento para marcas de eCommerce listas para escalar. Combinamos gestión de medios pagados, seguimiento de conversiones y optimización basada en datos para convertir la inversión publicitaria en ingresos rentables.',
      stats: [
        { value: '+250%', label: 'Crecimiento de Ingresos' },
        { value: '+180%', label: 'Mejora de ROAS' },
        { value: '5-8yr', label: 'Retención Promedio' },
      ],
      credentials: [
        '20+ años en marketing digital y eCommerce',
        'Meta Business Partner',
        'Google Partner',
        'Retención de clientes a largo plazo (5-8 años promedio)',
      ],
    },
    problem: {
      title: 'El Problema Central',
      headline: 'Pautar sin un sistema es simplemente quemar dinero.',
      points: [
        'Sin atribución clara — no sabes qué anuncios realmente generan ventas.',
        'Escalar inversión sin entender la economía unitaria ni los márgenes.',
        'Fatiga creativa — los mismos anuncios corriendo hasta que dejan de funcionar.',
        'Sin conexión entre el rendimiento de los anuncios y los datos de ingresos de Shopify.',
      ],
      insight: 'Inversión publicitaria sin medición ni estrategia es presupuesto desperdiciado.',
      principle: 'Los anuncios son el combustible. El sistema es el motor.',
      principleNote: 'Sin tracking adecuado, optimización y estrategia creativa, el crecimiento se mantiene impredecible.',
    },
    solution: {
      title: 'Lo Que Entregamos',
      headline: 'Gestión Completa de Meta Ads',
      intro: 'Gestionamos todo tu ecosistema publicitario de Meta desde la estrategia hasta la ejecución:',
      items: [
        {
          title: 'Estrategia y Arquitectura de Campañas',
          description: 'Estructura full-funnel: prospección, retargeting y retención — construida para la rentabilidad.',
        },
        {
          title: 'Desarrollo de Audiencias',
          description: 'Audiencias personalizadas, lookalikes y segmentación por intereses refinada con datos de Shopify.',
        },
        {
          title: 'Estrategia Creativa',
          description: 'Diseñamos ads estáticos para respuesta directa. Damos dirección creativa y editamos videos — no filmamos.',
        },
        {
          title: 'Tracking y Atribución',
          description: 'Pixel, CAPI, tracking server-side y arquitectura UTM para visibilidad completa de cada dólar invertido.',
        },
        {
          title: 'Optimización Continua',
          description: 'Monitoreo diario, ajustes de pujas, rotación de creativos y asignación de presupuesto basada en datos reales.',
        },
      ],
    },
    methodology1: {
      title: 'Nuestra Metodología',
      phase: 'Fase 1: Auditoría y Estrategia',
      items: [
        {
          title: 'Auditoría de Cuenta',
          description: 'Análisis profundo de tu cuenta de Meta Ads, salud del pixel, rendimiento de audiencias e historial creativo.',
        },
        {
          title: 'Revisión de Datos Shopify',
          description: 'Revisión de ingresos, AOV, márgenes, LTV de clientes y rendimiento de productos para definir objetivos de rentabilidad.',
        },
        {
          title: 'Panorama Competitivo',
          description: 'Investigación en Meta Ad Library, análisis de posicionamiento de competidores e identificación de brechas creativas.',
        },
        {
          title: 'Blueprint de Campañas',
          description: 'Documento de arquitectura completa: etapas del funnel, audiencias, presupuestos, KPIs y necesidades creativas.',
        },
      ],
    },
    methodology2: {
      phase: 'Fase 2: Configuración y Lanzamiento',
      items: [
        {
          title: 'Infraestructura de Tracking',
          description: 'Meta Pixel, Conversions API (CAPI), tracking server-side e implementación de framework UTM.',
        },
        {
          title: 'Construcción de Campañas',
          description: 'Setup completo: prospección (TOF), consideración (MOF), retargeting (BOF) y campañas de retención.',
        },
        {
          title: 'Arquitectura de Audiencias',
          description: 'Audiencias personalizadas desde datos de Shopify, visitantes web, listas de email y lookalikes de alto valor.',
        },
        {
          title: 'Producción Creativa',
          description: 'Diseño de ads estáticos, edición de video, variaciones de copy y pruebas de formatos (Stories, Reels, Feed, Carousel).',
        },
      ],
    },
    methodology3: {
      phase: 'Fase 3: Optimización',
      items: [
        {
          title: 'Monitoreo de Rendimiento',
          description: 'Revisión diaria de ROAS, CPA, CTR, CPM y métricas de frecuencia en todas las campañas.',
        },
        {
          title: 'Reasignación de Presupuesto',
          description: 'Redistribución dinámica hacia las campañas, audiencias y creativos de mejor rendimiento.',
        },
        {
          title: 'Renovación Creativa',
          description: 'Nuevos ads estáticos, ediciones de video, pruebas de copy y experimentación de formatos contra la fatiga creativa.',
        },
        {
          title: 'Refinamiento de Audiencias',
          description: 'Pruebas continuas, gestión de exclusiones y actualización de lookalikes basada en datos de conversión.',
        },
      ],
    },
    methodology4: {
      phase: 'Fase 4: Escala y Reportes',
      items: [
        {
          title: 'Estrategia de Escalado',
          description: 'Incrementos graduales de presupuesto en campañas probadas manteniendo ROAS y márgenes objetivo.',
        },
        {
          title: 'Reportes Mensuales',
          description: 'Revisión completa: inversión, ingresos, ROAS, CPA, rendimiento creativo y próximos pasos.',
        },
        {
          title: 'Llamada Mensual de Estrategia',
          description: 'Videollamada para presentar resultados, discutir insights, revisar necesidades creativas y alinear el plan del próximo mes.',
        },
        {
          title: 'Revisión Trimestral de Negocio',
          description: 'Análisis profundo de tendencias, planificación estacional, recomendaciones de presupuesto y estrategia a largo plazo.',
        },
      ],
    },
    techStack: {
      title: 'Tecnología y Herramientas',
      headline: 'Infraestructura de Nivel Empresarial',
      categories: [
        {
          name: 'Publicidad',
          tools: ['Meta Ads Manager', 'Meta Business Suite', 'Meta Ad Library'],
        },
        {
          name: 'Tracking y Atribución',
          tools: ['Meta Pixel', 'Conversions API (CAPI)', 'Google Analytics 4', 'Google Tag Manager', 'Server-Side Tracking'],
        },
        {
          name: 'eCommerce',
          tools: ['Shopify', 'Shopify Analytics', 'WeTracked.io'],
        },
      ],
    },
    reporting: {
      title: 'Reportes y KPIs',
      headline: 'Visibilidad Total del Rendimiento Publicitario',
      metrics: [
        { name: 'ROAS', description: 'Retorno sobre la inversión publicitaria — ingresos generados por dólar invertido' },
        { name: 'CPA', description: 'Costo por adquisición — costo total para adquirir un cliente' },
        { name: 'Ingresos Netos', description: 'Ingresos netos de Shopify atribuidos a campañas de Meta' },
        { name: 'AOV', description: 'Valor promedio de orden en compras generadas por Meta' },
        { name: 'CPM', description: 'Costo por 1,000 impresiones — eficiencia de la compra de medios' },
        { name: 'Rendimiento Creativo', description: 'CTR, hook rate y hold rate por creativo' },
      ],
      deliverables: [
        'Videollamada mensual para presentar resultados y ajustes de campaña',
        'Resúmenes semanales de rendimiento',
        'Reportes mensuales detallados con análisis creativo',
        'Revisiones trimestrales de negocio',
      ],
    },
    pricing: {
      title: 'Inversión',
      headline: 'Precios Simples y Transparentes',
      setup: {
        title: 'Plan Starter',
        price: '$1,000/mes',
        includes: [
          'Retainer mensual fijo',
          'Para tiendas Shopify con menos de $20K/mes de ingresos',
          'Gestión completa de Meta Ads',
          'Estrategia y optimización de campañas',
          'Setup de tracking (Pixel, CAPI)',
          'Diseño de ads estáticos para objetivos de venta',
          'Edición de video ads (tú provees el material de video)',
          'Reporte mensual y llamada de estrategia',
        ],
      },
      monthly: {
        title: 'Growth Partner',
        price: '5% de Ingresos Netos',
        includes: [
          'Tarifa fija: 5% de ingresos netos de Shopify',
          'Para tiendas que superan $20K/mes',
          'Todo lo del plan Starter, más:',
          'Desarrollo y prueba avanzada de audiencias',
          'Iteraciones creativas ilimitadas',
          'Ciclos de optimización semanales',
          'Soporte y comunicación prioritarios',
          'Revisiones trimestrales de negocio',
        ],
      },
      note: 'Creamos ads estáticos diseñados para venta. Editamos video ads con tu material de video. No realizamos filmaciones ni sesiones de contenido.',
    },
    creativeScope: {
      title: 'Alcance Creativo',
      headline: 'Lo Que Creamos vs. Lo Que Tú Provees',
      included: [
        'Diseño de ads estáticos (imágenes de producto, gráficos lifestyle, banners promocionales)',
        'Copywriting publicitario y variaciones de titulares',
        'Edición y postproducción de video (cortes, textos, transiciones)',
        'Diseño y secuenciación de ads en carrusel',
        'Adaptación de formatos Stories y Reels',
        'Dirección creativa y briefs para sesiones de contenido',
      ],
      notIncluded: [
        'Filmación de video o sesiones de producción de contenido',
        'Búsqueda o gestión de creadores UGC',
        'Sesiones de fotografía',
        'Creación de contenido con influencers',
      ],
      clarification: 'Tú provees el material de video y las fotos de producto. Nosotros nos encargamos de todo el diseño, edición y creación de anuncios a partir de ahí.',
    },
    otherServices: {
      title: 'Otros Servicios que Ofrecemos',
      headline: 'Soluciones de Crecimiento Completas',
      services: [
        {
          title: 'Gestión de Google Ads',
          description: 'Search, Shopping, Performance Max — gestionados para rentabilidad.',
        },
        {
          title: 'Desarrollo Web Shopify',
          description: 'Tiendas Shopify personalizadas diseñadas y construidas para conversión.',
        },
        {
          title: 'Desarrollo de Landing Pages',
          description: 'Landing pages de alta conversión con infraestructura completa de tracking.',
        },
        {
          title: 'Servicios Amazon Seller',
          description: 'Gestión de PPC, optimización de listings y crecimiento en marketplace.',
        },
        {
          title: 'Tracking y Atribución',
          description: 'Tracking server-side, Conversion APIs y dashboards personalizados.',
        },
      ],
    },
    contact: {
      title: 'Hablemos',
      headline: '¿Listo para Escalar tus Ingresos Shopify con Meta Ads?',
      description: 'Revisaremos tu rendimiento publicitario actual e identificaremos oportunidades para crecer de forma rentable.',
      email: 'info@hipervinculo.net',
      phone: '+1 (786) 529-0679',
      address: '2645 Executive Park Dr, Suite 146\nWeston, FL 33331',
      website: 'hipervinculo.net',
      cta: 'Contáctanos',
    },
  },
};
