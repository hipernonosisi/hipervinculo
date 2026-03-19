// Bilingual content for LV Therapy Collective Growth Strategy presentation
export type LVTherapyLanguage = 'en' | 'es';

export interface LVTherapyContent {
  cover: {
    supertitle: string;
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
  audit: {
    title: string;
    headline: string;
    strengths: Array<{ title: string; description: string }>;
    weaknesses: Array<{ title: string; description: string }>;
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
  googleAds: {
    title: string;
    headline: string;
    description: string;
    targeting: string[];
    adTypes: Array<{ title: string; description: string }>;
  };
  metaAdsVideo: {
    title: string;
    headline: string;
    description: string;
    concepts: Array<{ title: string; description: string }>;
    painPoints: string[];
  };
  landingPage: {
    title: string;
    headline: string;
    description: string;
    features: string[];
    comparison: Array<{ label: string; current: string; proposed: string }>;
  };
  localSeo: {
    title: string;
    headline: string;
    description: string;
    actions: Array<{ title: string; description: string }>;
  };
  qualificationBot: {
    title: string;
    headline: string;
    description: string;
    flow: Array<{ step: string; description: string }>;
    benefits: string[];
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

export const lvTherapyPresentationContent: Record<LVTherapyLanguage, LVTherapyContent> = {
  en: {
    cover: {
      supertitle: 'Digital Growth Strategy',
      title: 'LV Therapy Collective',
      subtitle: 'A Multi-Channel Patient Acquisition System for Your NYC Practice',
      tagline: 'Google Ads · Meta Ads · Landing Page · Local SEO · Lead Qualification',
    },
    about: {
      title: 'About Hipervínculo',
      description: 'Hipervínculo builds performance-driven growth systems for service businesses ready to scale. We combine paid media, conversion-optimized web experiences, and automation to turn ad spend into booked appointments.',
      stats: [
        { value: '+250%', label: 'Revenue Growth' },
        { value: '+180%', label: 'ROAS Improvement' },
        { value: '5-8yr', label: 'Avg. Client Retention' },
      ],
      credentials: [
        '20+ years in digital marketing & lead generation',
        'Meta Business Partner',
        'Google Partner',
        'Specialized in healthcare & service businesses',
      ],
    },
    audit: {
      title: 'Digital Presence Audit',
      headline: 'What We Found — LV Therapy Collective',
      strengths: [
        {
          title: 'Strong Clinical Credibility',
          description: 'Multiple licensed therapists (LCSW, LMHC) with clearly listed specializations across anxiety, trauma, OCD, and relationship therapy.',
        },
        {
          title: 'Bilingual Services',
          description: 'Spanish-speaking therapists serve a massive underserved market in NYC — a competitive advantage most practices ignore.',
        },
        {
          title: 'Insurance Transparency',
          description: 'Clear display of accepted insurance plans (Aetna, Cigna, UnitedHealthcare, etc.) reduces friction in the decision process.',
        },
        {
          title: 'Diverse Specializations',
          description: 'Coverage across CBT, DBT, EMDR, couples therapy, teen therapy, and postpartum — broad patient appeal.',
        },
      ],
      weaknesses: [
        {
          title: 'No Paid Advertising',
          description: 'Zero presence on Google Ads or Meta Ads. Relying entirely on organic traffic and referrals — leaving growth unpredictable.',
        },
        {
          title: 'Squarespace Limitations',
          description: 'Current site is slow, not conversion-optimized, and lacks proper tracking infrastructure for ad campaigns.',
        },
        {
          title: 'No Local SEO Strategy',
          description: 'No optimized Google Business Profile, no review generation system, and missing from local therapy directories.',
        },
        {
          title: 'No Video Content',
          description: 'Zero video presence on social media. In therapy, trust is everything — video builds that trust faster than any other medium.',
        },
      ],
    },
    problem: {
      title: 'The Core Problem',
      headline: 'A great practice that nobody can find online.',
      points: [
        'No paid advertising — potential patients searching "anxiety therapist NYC" never see you.',
        'Website built on Squarespace — slow, no conversion tracking, not designed for ad traffic.',
        'No video content — patients can\'t connect with therapists before booking.',
        'No automated lead qualification — inquiries get lost or go unanswered.',
        'No local SEO — invisible on Google Maps and local search results.',
      ],
      insight: 'You have the clinical talent. You\'re missing the patient acquisition system.',
      principle: 'The best therapists don\'t always get the most patients.',
      principleNote: 'The ones with the best digital systems do.',
    },
    solution: {
      title: 'What We Deliver',
      headline: '5-Pillar Patient Acquisition System',
      intro: 'We build a complete digital growth engine designed to fill your practice consistently:',
      items: [
        {
          title: 'Google Ads — Capture High-Intent Searches',
          description: 'Target patients actively searching for therapy in NYC. "Anxiety therapist Manhattan," "terapeuta en español NYC," and 200+ keywords.',
        },
        {
          title: 'Meta Ads + Video Content',
          description: 'Instagram & Facebook ads featuring your therapists speaking directly about pain points. Builds trust and drives bookings.',
        },
        {
          title: 'Conversion Landing Page',
          description: 'A fast, mobile-optimized page designed specifically for ad traffic — not your Squarespace site.',
        },
        {
          title: 'Local SEO & Google Business Profile',
          description: 'Dominate "therapist near me" searches. Optimized profile, review generation, and local directory presence.',
        },
        {
          title: 'Lead Qualification Bot',
          description: 'Automated intake that qualifies patients, matches them to the right therapist, and books consultations 24/7.',
        },
      ],
    },
    googleAds: {
      title: 'Google Ads Strategy',
      headline: 'Capture Patients When They\'re Actively Searching',
      description: 'Google Ads targets people with high intent — they\'re already looking for a therapist. This is the fastest channel to fill open appointment slots.',
      targeting: [
        '"anxiety therapist NYC"',
        '"couples therapy Manhattan"',
        '"terapeuta de ansiedad en español NYC"',
        '"EMDR therapist near me"',
        '"teen therapist Brooklyn"',
        '"OCD treatment New York"',
        '"postpartum depression therapist"',
        '"therapist accepting Aetna NYC"',
      ],
      adTypes: [
        {
          title: 'Search Campaigns',
          description: 'Text ads appearing when patients search for therapy services. Highest intent, highest conversion rate.',
        },
        {
          title: 'Call Extensions',
          description: 'One-tap calling directly from search results. Critical for mobile users who want immediate connection.',
        },
        {
          title: 'Location Targeting',
          description: 'Geo-targeted to NYC boroughs with bid adjustments for Manhattan, Brooklyn, and Queens.',
        },
      ],
    },
    metaAdsVideo: {
      title: 'Meta Ads + Video Strategy',
      headline: 'Your Therapists Are Your Best Ad Creative',
      description: 'Patients choose therapists they feel they can trust. Short-form video of your team speaking about real struggles creates that connection before they ever book.',
      concepts: [
        {
          title: '"Signs You Might Need Therapy"',
          description: 'A therapist speaks directly to camera about common signs — normalizing the process and reducing stigma.',
        },
        {
          title: '"What Your First Session Looks Like"',
          description: 'Walk through the experience to eliminate anxiety about starting therapy. The #1 barrier to booking.',
        },
        {
          title: '"You Deserve to Feel Better"',
          description: 'Empathetic messaging in Spanish, targeting the underserved Hispanic community in NYC.',
        },
        {
          title: '"Dating in NYC Is Hard — We Can Help"',
          description: 'Relatable hook targeting young professionals dealing with relationship anxiety.',
        },
      ],
      painPoints: [
        'Anxiety that won\'t go away no matter what you try',
        'Feeling disconnected from your partner',
        'Struggling as a new parent and feeling alone',
        'Your teenager is shutting you out',
        'Work stress is taking over your life',
        'You want therapy but don\'t know where to start',
      ],
    },
    landingPage: {
      title: 'Conversion Landing Page',
      headline: 'A Page Built to Convert Ad Traffic Into Booked Sessions',
      description: 'Your Squarespace site isn\'t designed for paid traffic. We build a dedicated landing page optimized for one goal: getting patients to book a consultation.',
      features: [
        'Sub-2-second load time (vs. 4-6s on Squarespace)',
        'Mobile-first design — 80%+ of therapy searches are mobile',
        'Prominent "Book Now" CTA above the fold',
        'Therapist profiles with photos and specializations',
        'Insurance accepted section with recognizable logos',
        'Social proof — testimonials and review count',
        'Integrated booking calendar',
        'Full conversion tracking (Google, Meta, server-side)',
      ],
      comparison: [
        { label: 'Load Speed', current: '4-6 seconds', proposed: '<2 seconds' },
        { label: 'Conversion Rate', current: '~1-2%', proposed: '3-5%' },
        { label: 'Mobile UX', current: 'Generic', proposed: 'Therapy-optimized' },
        { label: 'Tracking', current: 'None', proposed: 'Full attribution' },
      ],
    },
    localSeo: {
      title: 'Local SEO Strategy',
      headline: 'Own the "Therapist Near Me" Results',
      description: 'When someone searches "therapist near me" in NYC, your practice should appear in the top 3 Google Maps results. Right now, it doesn\'t.',
      actions: [
        {
          title: 'Google Business Profile Optimization',
          description: 'Complete profile with services, hours, photos, insurance info, and Q&A section. Verified and optimized for all therapy-related searches.',
        },
        {
          title: 'Review Generation System',
          description: 'Automated post-session email/SMS flow requesting Google reviews. Reviews are the #1 ranking factor for local SEO.',
        },
        {
          title: 'Local Directory Listings (Recommended)',
          description: 'We recommend maintaining consistent NAP (name, address, phone) across Psychology Today, TherapyDen, Zocdoc, and 20+ directories — this is something your team can handle directly.',
        },
        {
          title: 'Location-Based Content',
          description: 'Blog posts and pages targeting "therapist in [neighborhood]" for each NYC borough you serve.',
        },
      ],
    },
    qualificationBot: {
      title: 'Lead Qualification Bot',
      headline: 'Never Lose a Patient Inquiry Again',
      description: 'A 24/7 automated intake system that qualifies patients, matches them to the right therapist based on their needs, and books consultations — all without human intervention.',
      flow: [
        {
          step: 'Initial Contact',
          description: 'Patient clicks "Get Started" → bot asks about their primary concern (anxiety, relationships, trauma, etc.).',
        },
        {
          step: 'Insurance Check',
          description: 'Bot confirms insurance provider and verifies it\'s accepted — eliminates unqualified leads immediately.',
        },
        {
          step: 'Therapist Matching',
          description: 'Based on specialization, language preference, and availability — bot recommends 1-2 therapists.',
        },
        {
          step: 'Booking',
          description: 'Direct calendar integration for immediate consultation booking. Confirmation email with therapist intro.',
        },
      ],
      benefits: [
        'Responds to inquiries in under 30 seconds — 24/7',
        'Reduces admin workload by 60-70%',
        'Qualifies patients before they reach your team',
        'Captures leads from ads even outside business hours',
        'Supports English and Spanish',
      ],
    },
    pricing: {
      title: 'Investment',
      headline: 'Transparent, Performance-Aligned Pricing',
      setup: {
        title: 'One-Time Setup',
        price: '$4,750 - $6,250',
        includes: [
          'Conversion landing page design & development',
          'Google Ads account setup & campaign architecture',
          'Meta Ads account setup & pixel configuration',
          'Google Business Profile optimization',
          'Lead qualification bot setup & configuration',
          'Full tracking infrastructure (Google, Meta, server-side)',
          'Local SEO strategy & Google Business Profile setup',
        ],
      },
      monthly: {
        title: 'Monthly Management',
        price: '$3,500 - $5,000/mo',
        includes: [
          'Google Ads management & optimization',
          'Meta Ads management & video ad editing',
          'Monthly video content editing (you film, we edit)',
          'Landing page A/B testing & optimization',
          'Review generation system management',
          'Bot maintenance & conversation optimization',
          'Monthly reporting & strategy call',
          'Recommended ad spend: $2,000 - $5,000/mo',
        ],
      },
      note: 'Video filming is your responsibility — we provide creative direction, scripts, and handle all editing and post-production. Alternatively, we can create AI-powered avatar videos if you prefer not to film. Ad spend is billed directly by Google/Meta.',
    },
    otherServices: {
      title: 'Other Services We Offer',
      headline: 'Complete Growth Solutions',
      services: [
        {
          title: 'Full Website Redesign',
          description: 'Replace Squarespace with a custom, high-performance website built for conversion.',
        },
        {
          title: 'Shopify eCommerce',
          description: 'For practices selling wellness products, courses, or digital resources.',
        },
        {
          title: 'Brand Identity Design',
          description: 'Logo, color palette, typography, and brand guidelines for a cohesive practice image.',
        },
        {
          title: 'Amazon Seller Services',
          description: 'PPC management, listing optimization, and marketplace growth for product-based businesses.',
        },
        {
          title: 'Advanced Tracking & Attribution',
          description: 'Server-side tracking, Conversion APIs, and custom dashboards for full visibility.',
        },
      ],
    },
    contact: {
      title: 'Let\'s Talk',
      headline: 'Ready to Fill Your Practice with the Right Patients?',
      description: 'We\'ll review your current digital presence and build a plan to consistently fill your appointment book.',
      email: 'info@hipervinculo.net',
      phone: '+1 (786) 529-0679',
      address: '2645 Executive Park Dr, Suite 146\nWeston, FL 33331',
      website: 'hipervinculo.net',
      cta: 'Schedule a Call',
    },
  },
  es: {
    cover: {
      supertitle: 'Estrategia de Crecimiento Digital',
      title: 'LV Therapy Collective',
      subtitle: 'Un Sistema Multi-Canal de Adquisición de Pacientes para Tu Práctica en NYC',
      tagline: 'Google Ads · Meta Ads · Landing Page · SEO Local · Bot de Calificación',
    },
    about: {
      title: 'Sobre Hipervínculo',
      description: 'Hipervínculo construye sistemas de crecimiento orientados al rendimiento para negocios de servicios listos para escalar. Combinamos medios pagados, experiencias web optimizadas para conversión y automatización para convertir la inversión publicitaria en citas agendadas.',
      stats: [
        { value: '+250%', label: 'Crecimiento de Ingresos' },
        { value: '+180%', label: 'Mejora de ROAS' },
        { value: '5-8yr', label: 'Retención Promedio' },
      ],
      credentials: [
        '20+ años en marketing digital y generación de leads',
        'Meta Business Partner',
        'Google Partner',
        'Especializados en salud y negocios de servicios',
      ],
    },
    audit: {
      title: 'Auditoría de Presencia Digital',
      headline: 'Lo Que Encontramos — LV Therapy Collective',
      strengths: [
        {
          title: 'Fuerte Credibilidad Clínica',
          description: 'Múltiples terapeutas licenciados (LCSW, LMHC) con especializaciones claramente listadas en ansiedad, trauma, TOC y terapia de relaciones.',
        },
        {
          title: 'Servicios Bilingües',
          description: 'Terapeutas de habla hispana sirven un mercado masivo desatendido en NYC — una ventaja competitiva que la mayoría ignora.',
        },
        {
          title: 'Transparencia de Seguros',
          description: 'Exhibición clara de planes de seguro aceptados (Aetna, Cigna, UnitedHealthcare, etc.) reduce la fricción en el proceso de decisión.',
        },
        {
          title: 'Especializaciones Diversas',
          description: 'Cobertura en CBT, DBT, EMDR, terapia de pareja, terapia para adolescentes y postparto — amplio atractivo para pacientes.',
        },
      ],
      weaknesses: [
        {
          title: 'Sin Publicidad Pagada',
          description: 'Cero presencia en Google Ads o Meta Ads. Dependencia total de tráfico orgánico y referidos — crecimiento impredecible.',
        },
        {
          title: 'Limitaciones de Squarespace',
          description: 'Sitio actual es lento, no está optimizado para conversión y carece de infraestructura de tracking para campañas.',
        },
        {
          title: 'Sin Estrategia de SEO Local',
          description: 'Sin perfil de Google Business optimizado, sin sistema de generación de reseñas y ausente de directorios locales.',
        },
        {
          title: 'Sin Contenido de Video',
          description: 'Cero presencia de video en redes sociales. En terapia, la confianza es todo — el video construye esa confianza más rápido.',
        },
      ],
    },
    problem: {
      title: 'El Problema Central',
      headline: 'Una gran práctica que nadie puede encontrar en línea.',
      points: [
        'Sin publicidad pagada — pacientes potenciales buscando "terapeuta de ansiedad NYC" nunca te ven.',
        'Sitio en Squarespace — lento, sin tracking de conversiones, no diseñado para tráfico de anuncios.',
        'Sin contenido de video — los pacientes no pueden conectar con los terapeutas antes de agendar.',
        'Sin calificación automatizada — las consultas se pierden o quedan sin respuesta.',
        'Sin SEO local — invisibles en Google Maps y resultados de búsqueda local.',
      ],
      insight: 'Tienes el talento clínico. Te falta el sistema de adquisición de pacientes.',
      principle: 'Los mejores terapeutas no siempre consiguen más pacientes.',
      principleNote: 'Los que tienen los mejores sistemas digitales sí.',
    },
    solution: {
      title: 'Lo Que Entregamos',
      headline: 'Sistema de Adquisición de Pacientes de 5 Pilares',
      intro: 'Construimos un motor de crecimiento digital completo diseñado para llenar tu práctica consistentemente:',
      items: [
        {
          title: 'Google Ads — Captura Búsquedas de Alta Intención',
          description: 'Apunta a pacientes buscando activamente terapia en NYC. "Terapeuta de ansiedad Manhattan," "anxiety therapist NYC," y 200+ keywords.',
        },
        {
          title: 'Meta Ads + Contenido de Video',
          description: 'Anuncios en Instagram y Facebook con tus terapeutas hablando directamente sobre pain points. Construye confianza y genera citas.',
        },
        {
          title: 'Landing Page de Conversión',
          description: 'Una página rápida, optimizada para móvil, diseñada específicamente para tráfico de anuncios — no tu sitio de Squarespace.',
        },
        {
          title: 'SEO Local y Google Business Profile',
          description: 'Domina las búsquedas "terapeuta cerca de mí". Perfil optimizado, generación de reseñas y presencia en directorios.',
        },
        {
          title: 'Bot de Calificación de Leads',
          description: 'Intake automatizado que califica pacientes, los conecta con el terapeuta correcto y agenda consultas 24/7.',
        },
      ],
    },
    googleAds: {
      title: 'Estrategia de Google Ads',
      headline: 'Captura Pacientes Cuando Están Buscando Activamente',
      description: 'Google Ads apunta a personas con alta intención — ya están buscando un terapeuta. Es el canal más rápido para llenar citas disponibles.',
      targeting: [
        '"anxiety therapist NYC"',
        '"terapia de pareja Manhattan"',
        '"terapeuta de ansiedad en español NYC"',
        '"EMDR therapist near me"',
        '"terapeuta para adolescentes Brooklyn"',
        '"tratamiento TOC New York"',
        '"terapeuta depresión postparto"',
        '"therapist accepting Aetna NYC"',
      ],
      adTypes: [
        {
          title: 'Campañas de Búsqueda',
          description: 'Anuncios de texto cuando pacientes buscan servicios de terapia. Mayor intención, mayor tasa de conversión.',
        },
        {
          title: 'Extensiones de Llamada',
          description: 'Llamada con un toque desde los resultados de búsqueda. Crítico para usuarios móviles que quieren conexión inmediata.',
        },
        {
          title: 'Segmentación Geográfica',
          description: 'Geo-targetizado a los boroughs de NYC con ajustes de puja para Manhattan, Brooklyn y Queens.',
        },
      ],
    },
    metaAdsVideo: {
      title: 'Meta Ads + Estrategia de Video',
      headline: 'Tus Terapeutas Son Tu Mejor Creatividad Publicitaria',
      description: 'Los pacientes eligen terapeutas en quienes sienten que pueden confiar. Video corto de tu equipo hablando sobre luchas reales crea esa conexión antes de que agenden.',
      concepts: [
        {
          title: '"Señales de Que Podrías Necesitar Terapia"',
          description: 'Un terapeuta habla directamente a cámara sobre señales comunes — normalizando el proceso y reduciendo el estigma.',
        },
        {
          title: '"Cómo Es Tu Primera Sesión"',
          description: 'Recorrido de la experiencia para eliminar la ansiedad de empezar terapia. La barrera #1 para agendar.',
        },
        {
          title: '"Mereces Sentirte Mejor"',
          description: 'Mensaje empático en español, dirigido a la comunidad hispana desatendida en NYC.',
        },
        {
          title: '"Las Citas en NYC Son Difíciles — Podemos Ayudar"',
          description: 'Hook relatable dirigido a jóvenes profesionales lidiando con ansiedad en relaciones.',
        },
      ],
      painPoints: [
        'Ansiedad que no se va sin importar lo que intentes',
        'Sentirte desconectado/a de tu pareja',
        'Luchar como nuevo padre/madre y sentirte solo/a',
        'Tu adolescente se está cerrando contigo',
        'El estrés del trabajo está tomando control de tu vida',
        'Quieres terapia pero no sabes por dónde empezar',
      ],
    },
    landingPage: {
      title: 'Landing Page de Conversión',
      headline: 'Una Página Diseñada para Convertir Tráfico en Sesiones Agendadas',
      description: 'Tu sitio de Squarespace no está diseñado para tráfico pagado. Construimos una landing page dedicada optimizada para un objetivo: que los pacientes agenden una consulta.',
      features: [
        'Carga en menos de 2 segundos (vs. 4-6s en Squarespace)',
        'Diseño mobile-first — 80%+ de búsquedas de terapia son móviles',
        'CTA "Agendar Ahora" prominente above the fold',
        'Perfiles de terapeutas con fotos y especializaciones',
        'Sección de seguros aceptados con logos reconocibles',
        'Prueba social — testimonios y conteo de reseñas',
        'Calendario de agendamiento integrado',
        'Tracking completo de conversiones (Google, Meta, server-side)',
      ],
      comparison: [
        { label: 'Velocidad', current: '4-6 segundos', proposed: '<2 segundos' },
        { label: 'Tasa de Conversión', current: '~1-2%', proposed: '3-5%' },
        { label: 'UX Móvil', current: 'Genérica', proposed: 'Optimizada para terapia' },
        { label: 'Tracking', current: 'Ninguno', proposed: 'Atribución completa' },
      ],
    },
    localSeo: {
      title: 'Estrategia de SEO Local',
      headline: 'Domina los Resultados de "Terapeuta Cerca de Mí"',
      description: 'Cuando alguien busca "terapeuta cerca de mí" en NYC, tu práctica debería aparecer en el top 3 de Google Maps. Ahora mismo, no aparece.',
      actions: [
        {
          title: 'Optimización de Google Business Profile',
          description: 'Perfil completo con servicios, horarios, fotos, info de seguros y sección de preguntas. Verificado y optimizado.',
        },
        {
          title: 'Sistema de Generación de Reseñas',
          description: 'Flujo automatizado post-sesión por email/SMS solicitando reseñas en Google. Las reseñas son el factor #1 de ranking.',
        },
        {
          title: 'Listados en Directorios Locales (Recomendación)',
          description: 'Recomendamos mantener NAP consistente en Psychology Today, TherapyDen, Zocdoc y 20+ directorios — esto es algo que tu equipo puede gestionar directamente.',
        },
        {
          title: 'Contenido Basado en Ubicación',
          description: 'Posts de blog y páginas enfocadas en "terapeuta en [barrio]" para cada borough de NYC.',
        },
      ],
    },
    qualificationBot: {
      title: 'Bot de Calificación de Leads',
      headline: 'Nunca Pierdas Otra Consulta de Paciente',
      description: 'Un sistema de intake automatizado 24/7 que califica pacientes, los conecta con el terapeuta correcto según sus necesidades y agenda consultas — todo sin intervención humana.',
      flow: [
        {
          step: 'Contacto Inicial',
          description: 'Paciente hace clic en "Comenzar" → bot pregunta sobre su preocupación principal (ansiedad, relaciones, trauma, etc.).',
        },
        {
          step: 'Verificación de Seguro',
          description: 'Bot confirma proveedor de seguro y verifica que sea aceptado — elimina leads no calificados inmediatamente.',
        },
        {
          step: 'Match con Terapeuta',
          description: 'Basado en especialización, preferencia de idioma y disponibilidad — bot recomienda 1-2 terapeutas.',
        },
        {
          step: 'Agendamiento',
          description: 'Integración directa con calendario para agendar consulta inmediata. Email de confirmación con intro del terapeuta.',
        },
      ],
      benefits: [
        'Responde consultas en menos de 30 segundos — 24/7',
        'Reduce carga administrativa en 60-70%',
        'Califica pacientes antes de que lleguen a tu equipo',
        'Captura leads de anuncios fuera de horario laboral',
        'Soporte en inglés y español',
      ],
    },
    pricing: {
      title: 'Inversión',
      headline: 'Precios Transparentes, Alineados al Rendimiento',
      setup: {
        title: 'Setup Único',
        price: '$4,750 - $6,250',
        includes: [
          'Diseño y desarrollo de landing page de conversión',
          'Setup de cuenta de Google Ads y arquitectura de campañas',
          'Setup de cuenta de Meta Ads y configuración de pixel',
          'Optimización de Google Business Profile',
          'Setup y configuración de bot de calificación',
          'Infraestructura completa de tracking (Google, Meta, server-side)',
          'Estrategia de SEO local y setup de Google Business Profile',
        ],
      },
      monthly: {
        title: 'Gestión Mensual',
        price: '$3,500 - $5,000/mes',
        includes: [
          'Gestión y optimización de Google Ads',
          'Gestión de Meta Ads y edición de anuncios de video',
          'Edición mensual de contenido de video (tú filmas, nosotros editamos)',
          'Testing A/B y optimización de landing page',
          'Gestión del sistema de generación de reseñas',
          'Mantenimiento de bot y optimización de conversaciones',
          'Reporte mensual y llamada de estrategia',
          'Inversión recomendada en ads: $2,000 - $5,000/mes',
        ],
      },
      note: 'La filmación de video es tu responsabilidad — nosotros proveemos dirección creativa, guiones y manejamos toda la edición y post-producción. Alternativamente, podemos crear videos con avatares de IA si prefieres no filmar. La inversión en ads se factura directamente por Google/Meta.',
    },
    otherServices: {
      title: 'Otros Servicios Que Ofrecemos',
      headline: 'Soluciones Completas de Crecimiento',
      services: [
        {
          title: 'Rediseño Web Completo',
          description: 'Reemplaza Squarespace con un sitio web personalizado y de alto rendimiento diseñado para conversión.',
        },
        {
          title: 'Shopify eCommerce',
          description: 'Para prácticas que venden productos de bienestar, cursos o recursos digitales.',
        },
        {
          title: 'Diseño de Identidad de Marca',
          description: 'Logo, paleta de colores, tipografía y guías de marca para una imagen de práctica cohesiva.',
        },
        {
          title: 'Servicios para Vendedores en Amazon',
          description: 'Gestión de PPC, optimización de listings y crecimiento en marketplace.',
        },
        {
          title: 'Tracking y Atribución Avanzada',
          description: 'Tracking server-side, APIs de conversión y dashboards personalizados para visibilidad completa.',
        },
      ],
    },
    contact: {
      title: 'Hablemos',
      headline: '¿Lista para Llenar Tu Práctica con los Pacientes Correctos?',
      description: 'Revisaremos tu presencia digital actual y construiremos un plan para llenar tu agenda de citas consistentemente.',
      email: 'info@hipervinculo.net',
      phone: '+1 (786) 529-0679',
      address: '2645 Executive Park Dr, Suite 146\nWeston, FL 33331',
      website: 'hipervinculo.net',
      cta: 'Agendar una Llamada',
    },
  },
};
