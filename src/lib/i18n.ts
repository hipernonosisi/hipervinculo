export type Language = 'en' | 'es';

export const translations = {
  en: {
    // Navigation
    nav: {
      aboutUs: 'About Us',
      services: 'Services',
      pricing: 'Pricing',
      faqs: 'FAQs',
      getInTouch: 'Get in Touch',
      getFreeAudit: 'Get Free Audit',
    },
    // Hero Section
    hero: {
      title: 'Your growth partner for ambitious eCommerce',
      subtitle: 'We help DTC brands scale profitably with performance-driven paid media and a data-obsessed approach. No fluff. No wasted spend. Just results.',
      cta1: 'Request Free Audit',
      cta2: 'View Our Services',
    },
    // Homepage content
    homepage: {
      heroIntro: 'Hipervinculo builds performance-driven growth systems for businesses ready to scale.',
      heroDescription: 'Websites, inbound architecture, and paid acquisition designed to turn traffic into real opportunities — whether you\'re generating local leads or scaling an established brand.',
      ctaGetAudit: 'Get Free Audit',
      ctaExploreServices: 'Explore Our Services',
      trustBadge1: '20+ years in digital growth',
      trustBadge2: 'Long-term client retention',
      trustBadge3: 'Built for serious businesses only',
      rotatingHeadlines: [
        'Google Ads That Drive Calls and Qualified Leads',
        'Inbound Websites Built to Capture Demand',
        'eCommerce Growth Partner Strategies That Scale Revenue',
        'High-Converting Lead Generation Systems',
      ],
      provenResultsTitle: 'Proven Results Across Growth Channels\nand Inbound Lead Systems',
      provenResultsCta: 'Request a conversion and lead system walkthrough — tailored to your business.',
      leadGenTitle: 'Lead Generation Systems',
      leadGenResults: [
        'Built inbound pipelines for service businesses generating consistent calls and form inquiries',
        'Long-term retention: many partners stay 5–8 years',
        'Conversion-focused websites designed to capture demand',
      ],
      ecomTitle: 'eCommerce Growth Partners',
      ecomResults: [
        'Over $92M in tracked sales across Meta, Google, Amazon, TikTok',
        '10+ years managing high-growth Shopify campaigns',
        'Performance optimization across multiple categories',
      ],
      pillarsSubtitle: 'Our Services',
      pillarsTitle: 'Two Core Pillars of Growth',
      pillarsDescription: 'We build complete conversion systems — not just campaigns. From foundation to scale.',
      services: [
        { title: 'Lead Generation Systems', description: 'Conversion-focused websites, landing pages, call and form optimization, WhatsApp intake, Google Ads for high-intent searches, and tracking infrastructure.' },
        { title: 'Conversion Website Development', description: 'High-converting sites with optimized UX, built for capturing leads and driving action — not just looking good.' },
        { title: 'Google Ads for Inbound', description: 'Search campaigns built for ROI. We focus on bottom-funnel intent and qualified traffic, not vanity metrics.' },
        { title: 'Tracking & Attribution Setup', description: 'Server-side tracking, GA4 implementation, call tracking, CRM integrations. Know exactly where your leads come from.' },
        { title: 'eCommerce Growth Partners', description: 'Full-funnel paid media for Shopify brands. Meta, Google, Amazon, TikTok — optimized for Net ROAS, not vanity metrics.' },
        { title: 'Backup & Consulting', description: 'Strategic guidance, growth audits, and media planning for teams that need expert support without a full retainer.' },
      ],
      // Service Detail Pages
      serviceDetail: {
        viewDetails: 'View Details',
        leadGen: {
          slug: 'lead-generation-systems',
          heroTitle: 'Lead Generation Systems',
          heroSubtitle: 'Convert traffic into qualified leads with a complete inbound system.',
          coreProblem: {
            title: 'Core Problem',
            intro: 'The problem is what happens after someone arrives.',
            points: [
              'A website that doesn\'t convert.',
              'A funnel that isn\'t structured.',
              'A lead flow that breaks.',
              'A business spending money to \'get more traffic\' without building the infrastructure to capture demand.',
            ],
            solution: 'That is where Hipervinculo comes in.',
            explanation: 'Many businesses invest in marketing without having the infrastructure to convert traffic into leads. More clicks do not solve the problem if the system is not built to capture intent. Traffic without conversion is wasted budget.',
            principle: 'Ads are fuel. The system is the engine.',
            principleNote: 'Without scale, ads waste. Without structure, growth becomes repeatable.',
          },
          whatWeBuild: {
            title: 'What We Build',
            intro: 'Hipervinculo helps service-based businesses create a complete inbound lead generation system:',
            items: [
              'A conversion-focused website',
              'Landing pages aligned with search intent',
              'Lead intake flows built for speed and clarity',
              'WhatsApp, call, and form optimization',
              'Google Ads targeting high-value demand',
              'Tracking that measures real opportunities',
            ],
          },
          entryOffer: {
            title: 'Entry Offer',
            website: 'Website builds typically start around $2,500',
            monthly: 'Monthly lead generation management starts at $1,000',
            note: 'No long-term contracts. Clients stay because results compound over time.',
          },
          whoFor: {
            title: 'Who This Is For',
            intro: 'This is built for businesses that:',
            items: [
              'Provide high-value services',
              'Want consistent inbound inquiries',
              'Already have demand, but lack structure',
              'Prefer long-term stability over marketing experiments',
            ],
          },
          cta: {
            title: 'Get in Touch',
            description: 'We\'ll review whether your website is ready to convert traffic into real leads.',
            button: 'Get in Touch',
          },
        },
      },
      differentTitle: 'What Makes Us Different?',
      differentSubtitle: 'We\'re not just another agency. We are a true growth partner, deeply invested in your success.',
      differentExperts: 'Performance-Obsessed Experts',
      differentExpertsDesc: 'Deep experience in full-funnel marketing for Shopify & Amazon. We leverage advanced attribution tools to go beyond surface-level metrics.',
      differentTransparency: 'Radical Transparency',
      differentTransparencyDesc: 'We report honestly on what\'s working and what isn\'t. No smoke and mirrors. Every dollar is accounted for.',
      differentData: 'Data-Driven Decisions',
      differentDataDesc: 'Everything we do is based on data, tested with statistical significance, and optimized for your real business outcomes.',
      differentPartnership: 'True Partnership',
      differentPartnershipDesc: 'We become an extension of your team. Weekly calls, Slack access, and proactive recommendations — not just monthly reports.',
      partnersTitle: 'Certified Partners',
      industriesTitle: 'Industries We Serve',
      industriesSubtitle: 'We have deep experience across these verticals',
      industries: [
        { name: 'LOCAL SERVICES', description: 'Plumbers, electricians, contractors' },
        { name: 'LAW & MEDICAL', description: 'Law firms, clinics, specialists' },
        { name: 'HOME SERVICES', description: 'HVAC, roofing, landscaping' },
        { name: 'ECOMMERCE', description: 'Shopify, DTC brands, retail' },
        { name: 'B2B SAAS', description: 'Software, tech, enterprise' },
      ],
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        { q: 'What is the difference from other agencies?', a: 'We focus on systems, not just campaigns. Our approach integrates website development, tracking infrastructure, and paid media into a cohesive growth machine.' },
        { q: 'Who is this for?', a: 'Established businesses ready to invest in growth. We work best with companies that have validated products/services and are ready to scale.' },
        { q: 'What\'s the difference between a Lead Gen System and an eCommerce Partner?', a: 'Lead Gen Systems focus on service businesses that need calls, form submissions, and qualified leads. eCommerce Partners focus on Shopify brands that need to scale sales profitably.' },
        { q: 'What do you mean by \'Conversion Infrastructure\'?', a: 'It\'s the complete system that turns visitors into customers: optimized websites, tracking setup, landing pages, and paid acquisition working together.' },
        { q: 'Why is there a \'get a free audit first\' process for everyone?', a: 'We want to ensure we\'re the right fit before starting. The audit helps us understand your business, identify opportunities, and recommend the best approach.' },
        { q: 'Is this for e-commerce or lead generation?', a: 'Both! We have dedicated teams for each. Lead Gen for service businesses, eCommerce Growth Partners for Shopify brands.' },
      ],
      ctaTitle: 'Ready to Scale Your Business?',
      ctaSubtitle: 'Get a free audit and discover how we can help you grow.',
    },
    // Metrics
    metrics: {
      revenueGrowth: 'Revenue Growth',
      roasImprovement: 'ROAS Improvement',
    },
    // Proven Results
    provenResults: {
      title: 'Proven Results',
      stat1: '$92M+ Tracked Sales',
      stat2: '10+ Years Experience',
      stat3: '2.5x Minimum ROAS Guarantee',
      stat4: 'Performance-Based Pricing',
    },
    // Services
    services: {
      title: 'Our Services',
      subtitle: 'End-to-end growth solutions for ambitious eCommerce brands',
      paidMedia: {
        title: 'Paid Media',
        description: 'Meta, Google, TikTok & Amazon advertising that drives profitable growth',
      },
      creative: {
        title: 'Creative Services',
        description: 'Scroll-stopping creatives designed to convert',
      },
      cro: {
        title: 'CRO',
        description: 'Conversion rate optimization to maximize every visitor',
      },
      analytics: {
        title: 'Analytics',
        description: 'Full-funnel tracking and attribution that actually works',
      },
      amazon: {
        title: 'Amazon',
        description: 'Amazon advertising and marketplace optimization',
      },
      strategy: {
        title: 'Strategy',
        description: 'Growth roadmaps tailored to your business goals',
      },
    },
    // What Makes Us Different
    different: {
      title: 'What Makes Us Different',
      experts: {
        title: 'Performance-Obsessed Experts',
        description: 'We only hire senior marketers with proven track records. No juniors learning on your dime.',
      },
      transparency: {
        title: 'Radical Transparency',
        description: 'Real-time dashboards, weekly reports, and a partner who actually picks up the phone.',
      },
    },
    // Playbook
    playbook: {
      title: 'Free Advantage+ Growth Playbook',
      description: 'Learn the exact strategies we use to scale DTC brands with Meta Advantage+ campaigns.',
      cta: 'Download Now',
    },
    // Guarantee
    guarantee: {
      title: 'No Results, No Fee',
      subtitle: 'Our Performance Guarantee',
      description: 'We guarantee a minimum 2.5x net ROAS on your paid media spend. If we don\'t hit it, you don\'t pay our fee.',
      disclaimer: '*This guarantee applies exclusively to our Growth Partner service.',
      stat: '2.5x',
      statLabel: 'Minimum ROAS',
    },
    // Pricing
    pricing: {
      title: 'Transparent Pricing',
      subtitle: 'Choose the model that works for your business',
      viewAll: 'View Full Pricing Details',
      retainer: {
        title: 'Performance Retainer',
        subtitle: 'For brands spending $10K+/month on ads',
        price: '2.5x Min Net ROAS',
        features: [
          'Full-funnel paid media management',
          'Creative strategy & feedback',
          'Weekly performance reviews',
          'Real-time reporting dashboard',
        ],
        cta: 'Get Started',
      },
      partnership: {
        title: 'Growth Partnership',
        subtitle: 'For Shopify brands ready to scale',
        price: '5% of Net Shopify Sales',
        features: [
          'Everything in Performance Retainer',
          'Dedicated growth strategist',
          'Creative production',
          'CRO recommendations',
        ],
        cta: 'Apply Now',
      },
      leadGen: {
        title: 'Lead Generation System',
        subtitle: 'For service businesses',
        setupPrice: '$2,500',
        monthlyPrice: '$1,000/month',
        features: [
          'Landing page development',
          'Google Ads setup & management',
          'Lead tracking & attribution',
          'Monthly optimization',
        ],
        cta: 'Learn More',
      },
    },
    // Partners
    partners: {
      title: 'Certified Partners',
    },
    // FAQ
    faq: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          q: 'What is the starting investment?',
          a: 'Our Performance Retainer starts at $2,500/month plus a minimum ad spend of $10,000/month. The Growth Partnership model is based on a percentage of sales.',
        },
        {
          q: 'What is net ROAS?',
          a: 'Net ROAS (Return on Ad Spend) is calculated as (Revenue - COGS - Shipping - Fees) / Ad Spend. It measures the actual profit generated from your advertising investment.',
        },
        {
          q: 'What\'s the difference between TACOS and ACoS?',
          a: 'ACoS (Advertising Cost of Sale) = Ad Spend / Ad Revenue. TACOS (Total Advertising Cost of Sale) = Ad Spend / Total Revenue. TACOS gives a better picture of overall efficiency.',
        },
        {
          q: 'What is Performance Max?',
          a: 'Performance Max is a Google Ads campaign type that uses AI to optimize across all Google properties including Search, Display, YouTube, Gmail, and Discover.',
        },
        {
          q: 'What makes a good Meta Ads creative?',
          a: 'Strong hook in the first 3 seconds, clear value proposition, social proof, and a compelling CTA. We test multiple variations to find what resonates with your audience.',
        },
        {
          q: 'What if we don\'t reach the ROAS target?',
          a: 'If we don\'t hit the 2.5x net ROAS target, you don\'t pay our management fee. We only succeed when you do.',
        },
        {
          q: 'Do you build stores or run email marketing?',
          a: 'We focus exclusively on paid media and conversion optimization. We partner with best-in-class agencies for Shopify development and email marketing.',
        },
        {
          q: 'How long does it take to see results?',
          a: 'Most clients see initial improvements within 2-4 weeks. Significant scaling typically happens within 60-90 days as we optimize campaigns and test creative.',
        },
        {
          q: 'Do you require long-term contracts?',
          a: 'No. We have a 3-month initial commitment, but after that it\'s month-to-month. Our clients stay because we deliver results, not because they\'re locked in.',
        },
        {
          q: 'What platforms do you advertise on?',
          a: 'We specialize in Meta (Facebook/Instagram), Google Ads (Search, Shopping, Performance Max, YouTube), TikTok, and Amazon PPC.',
        },
        {
          q: 'How do you report on performance?',
          a: 'You get access to a real-time dashboard plus weekly written reports. We also have bi-weekly strategy calls to discuss results and next steps.',
        },
        {
          q: 'What industries do you work with?',
          a: 'We work primarily with DTC eCommerce brands, Amazon sellers, and service-based businesses looking for predictable lead generation.',
        },
        {
          q: 'What\'s your creative process?',
          a: 'We analyze your best-performing content, research competitors, and develop creative briefs. We can work with your in-house team or produce assets through our network.',
        },
        {
          q: 'Do you offer a free audit?',
          a: 'Yes! We offer a free performance audit where we analyze your current marketing and identify specific opportunities for improvement.',
        },
        {
          q: 'How is your pricing structured?',
          a: 'We offer three models: Performance Retainer (flat fee + performance bonus), Growth Partnership (% of revenue), and Lead Generation (setup + monthly management).',
        },
        {
          q: 'What\'s your minimum ad spend requirement?',
          a: 'For paid media management, we typically work with brands spending at least $10,000/month on advertising. For lead generation, there\'s no minimum.',
        },
        {
          q: 'Can you help with Amazon advertising?',
          a: 'Absolutely. We manage Sponsored Products, Sponsored Brands, and Sponsored Display campaigns with a focus on TACOS and profitability.',
        },
        {
          q: 'What tracking tools do you use?',
          a: 'We implement server-side tracking via the Conversions API, use Google Analytics 4, and set up proper attribution models to ensure accurate data.',
        },
        {
          q: 'How do I get started?',
          a: 'Simply fill out our free audit form or contact us directly. We\'ll schedule a discovery call to learn about your business and goals.',
        },
      ],
    },
    // CTA
    cta: {
      title: 'Ready to scale your brand?',
      subtitle: 'Get a free audit of your current marketing and see exactly how we can help you grow.',
      button: 'Request Free Audit',
    },
    // Footer
    footer: {
      company: 'Hipervínculo',
      tagline: 'Your growth partner for ambitious eCommerce',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      rights: 'All rights reserved.',
    },
    // Contact Page
    contact: {
      title: 'Get in Touch',
      subtitle: 'Have a question or want to work with us? We\'d love to hear from you.',
      form: {
        fullName: 'Full Name',
        companyName: 'Company Name',
        email: 'Email',
        howCanWeHelp: 'How can we help?',
        message: 'Message',
        submit: 'Send Message',
        options: [
          'I want to grow my eCommerce brand',
          'I need help with paid media',
          'I\'m interested in the Growth Partnership',
          'Other inquiry',
        ],
      },
      info: {
        email: 'hello@hipervinculo.net',
        phone: '+1 (555) 123-4567',
        address: 'Remote-first agency serving clients worldwide',
        hours: 'Monday - Friday, 9am - 6pm EST',
      },
    },
    // Audit Form
    audit: {
      title: 'Get Your Free Audit',
      subtitle: 'Answer a few questions and we\'ll show you exactly how to improve your marketing performance.',
      questions: [
        {
          label: 'What\'s your company name?',
          placeholder: 'Enter your company name',
        },
        {
          label: 'What\'s your website URL?',
          placeholder: 'https://yourwebsite.com',
        },
        {
          label: 'What type of business are you?',
          options: ['DTC/eCommerce', 'Amazon Seller', 'Service Business', 'Other'],
        },
        {
          label: 'What\'s your monthly revenue?',
          options: ['Under $50K', '$50K - $100K', '$100K - $500K', '$500K - $1M', '$1M+'],
        },
        {
          label: 'What\'s your current monthly ad spend?',
          options: ['Under $5K', '$5K - $10K', '$10K - $25K', '$25K - $50K', '$50K+'],
        },
        {
          label: 'What are your main growth goals?',
          placeholder: 'Tell us what you want to achieve...',
        },
        {
          label: 'What\'s your email address?',
          placeholder: 'your@email.com',
        },
      ],
      next: 'Next',
      back: 'Back',
      submit: 'Submit',
      pressEnter: 'Press Enter ↵',
      success: 'Thank you! We\'ll review your information and get back to you within 24 hours.',
    },
    // About Page
    about: {
      title: 'About Us',
      subtitle: 'We\'re not another agency. We\'re your growth partners.',
      quote: 'Most businesses don\'t fail because they lack marketing. They fail because they\'re executing the wrong strategy.',
      heroTitle: 'About Hipervinculo',
      heroSubtitle: 'We build performance-driven growth systems for businesses ready to scale.',
      section1: {
        title: 'Built around a simple realization',
        subtitle: 'Most businesses don\'t fail because they lack marketing. They fail because they lack a system.',
        content: 'Over the last two decades, we\'ve seen the same pattern repeat across industries — service companies, local brands, and eCommerce businesses alike.',
        problem1: 'Traffic is not the problem.',
        problem2: 'Clicks are not the problem.',
        problem3: 'Even advertising is rarely the real problem.',
        conclusion: 'The problem is what happens after someone arrives.',
      },
      section2: {
        title: 'We Don\'t Run Campaigns in Isolation',
        subtitle: 'Hipervinculo is not an ads-only agency. We build performance-driven growth systems — the kind of infrastructure that turns attention into opportunity.',
        card1Title: 'Conversion-Focused Design',
        card1Description: 'Sometimes that means designing a conversion-focused website from the ground up.',
        card2Title: 'Lead Intake Systems',
        card2Description: 'Engineering lead intake systems that make it easy for prospects to call, inquire, or start a conversation.',
        fuelTitle: 'Ads are fuel.',
        engineTitle: 'The system is the engine.',
      },
      section3: {
        title: 'Built for Businesses That Want Stability',
        subtitle: 'Many of our clients are not looking for experiments. They are looking for something rare in digital marketing.',
      },
      values: {
        consistency: 'Consistency',
        consistencyDesc: 'Systems that deliver predictable results month after month.',
        clarity: 'Clarity',
        clarityDesc: 'Transparent reporting and real metrics that matter.',
        longevity: 'Longevity',
        longevityDesc: 'Infrastructure that compounds over time, not quick wins.',
      },
      stats: {
        title: 'Experience That Goes Beyond Theory',
        subtitle: 'Hipervinculo has managed over $100M in advertising spend across platforms.',
        adSpend: '$100M+',
        adSpendLabel: 'Managed Ad Spend',
        years: '20+',
        yearsLabel: 'Years of Experience',
        retention: '5-8',
        retentionLabel: 'Years Avg. Retention',
      },
      marketing: {
        title: 'The best marketing is not louder',
        items: ['Cleaner', 'Structured', 'Measurable', 'Built on architecture'],
        conclusion: 'We approach growth with the mindset of engineers, not hype.',
      },
      whoWeWorkWith: {
        title: 'Who We Work With',
        subtitle: 'Built for serious businesses that understand growth is not a campaign — it is a system.',
        card1Title: 'Service-Based Companies',
        card1Description: 'Looking for predictable inbound leads and a system that delivers consistent results.',
        card2Title: 'Established Brands',
        card2Description: 'Seeking scalable performance and infrastructure that compounds over time.',
        card3Title: 'eCommerce Stores',
        card3Description: 'Ready to scale past $1M/month with full-funnel growth systems.',
        badge: 'Building a growth engine that lasts.',
      },
      standard: {
        badge: 'Our Standard',
        title: 'The Hipervinculo Standard',
        subtitle: 'We believe in long-term partnerships, clear execution, and systems that speak for themselves.',
        items: ['No noise', 'No gimmicks', 'No vanity metrics'],
      },
      cta: {
        title: 'Ready to see if your website is built to convert?',
        subtitle: 'Start a conversation with us. We\'ll tell you the truth about what\'s working, what isn\'t, and what it would take to build a system that generates real opportunities.',
        button: 'Message Hipervinculo',
      },
      problems: {
        title: 'Sound Familiar?',
        items: [
          'Your website gets traffic but doesn\'t convert',
          'Your funnel has leaks you can\'t identify',
          'You\'re spending on ads but can\'t track what\'s working',
          'You\'ve hired agencies that overpromised and underdelivered',
        ],
      },
    },
    // Services Page
    servicesPage: {
      title: 'Our Services',
      subtitle: 'End-to-end growth solutions designed for scale',
      leadGen: {
        title: 'Lead Generation Systems',
        description: 'Complete lead generation infrastructure for service businesses. Landing pages, Google Ads, tracking, and optimization — all done for you.',
        features: ['High-converting landing pages', 'Google Ads management', 'Lead tracking & attribution', 'Monthly reporting & optimization'],
      },
      website: {
        title: 'Conversion Website Development',
        description: 'Websites built to convert. We combine beautiful design with conversion-focused UX to maximize your traffic value.',
        features: ['Conversion-optimized design', 'Mobile-first development', 'Speed optimization', 'Analytics integration'],
      },
      googleAds: {
        title: 'Google Ads',
        description: 'Search, Shopping, Performance Max — we manage it all. Focused on ROAS and profitability, not just clicks.',
        features: ['Search & Shopping campaigns', 'Performance Max optimization', 'Conversion tracking setup', 'Weekly optimization'],
      },
      tracking: {
        title: 'Tracking & Attribution',
        description: 'Know exactly where your sales come from. We set up proper tracking so you can make data-driven decisions.',
        features: ['Server-side tracking', 'Multi-touch attribution', 'Custom dashboards', 'Cross-platform reporting'],
      },
      ecommerce: {
        title: 'eCommerce Growth Partners',
        description: 'For Shopify brands serious about scale. Full-funnel management with a focus on profitability.',
        features: ['Meta & TikTok advertising', 'Creative strategy', 'Landing page optimization', 'Growth roadmapping'],
      },
    },
    // Pricing Page
    pricingPage: {
      title: 'Transparent Pricing',
      subtitle: 'No hidden fees. No long-term contracts. Just results-driven partnerships.',
      notes: [
        'All pricing is based on performance. We only win when you win.',
        'Minimum 3-month commitment for all services.',
        'Custom enterprise solutions available for brands spending $100K+/month.',
      ],
    },
    // FAQs Page
    faqsPage: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about working with us',
      stillQuestions: {
        title: 'Still Have Questions?',
        subtitle: 'We\'re here to help. Reach out and we\'ll get back to you within 24 hours.',
        cta: 'Contact Us',
      },
    },
    // Privacy Policy Page
    privacy: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: February 5, 2026',
      intro: 'At HIPERVINCULO, we take your privacy and the protection of your personal information seriously. This privacy policy outlines the types of information we collect, how we use that information, and how we keep it secure.',
      sections: {
        collect: {
          title: 'Information We Collect',
          content1: 'When you visit our website, we may collect certain information from you, including your name, email address, phone number, and other personal information. We use this information to provide you with the services you request, such as scheduling a consultation or providing a quote.',
          content2: 'In addition, we may collect certain non-personal information from you, such as your IP address, the type of browser you use, and other information related to your use of our website. We use this information to improve our website and to provide a better user experience for our visitors.',
        },
        use: {
          title: 'How We Use Your Information',
          content1: 'We use your personal information to provide you with the services you request, such as scheduling a consultation or providing a quote. We may also use your information to contact you about special offers or promotions, but only if you have given us permission to do so.',
          content2: 'We do not share your personal information with third parties, except as necessary to provide you with the services you request, such as sharing your information with our internal personnel.',
        },
        security: {
          title: 'How We Keep Your Information Secure',
          content: 'We take the security of your personal information seriously and take steps to keep your information secure. We use industry-standard encryption and security measures to protect your information from unauthorized access, disclosure, or use.',
        },
        changes: {
          title: 'Changes to Our Privacy Policy',
          content: 'We may update our privacy policy from time to time, and any changes will be posted on this page. By continuing to use our website after any changes have been made, you agree to the updated privacy policy.',
        },
        contact: {
          title: 'Contact Us',
          content: 'If you have any questions or concerns about our privacy policy or how we use your personal information, please don\'t hesitate to contact us.',
        },
      },
    },
  },
  es: {
    // Navigation
    nav: {
      aboutUs: 'Nosotros',
      services: 'Servicios',
      pricing: 'Precios',
      faqs: 'Preguntas Frecuentes',
      getInTouch: 'Contacto',
      getFreeAudit: 'Auditoría Gratis',
    },
    // Hero Section
    hero: {
      title: 'Tu socio de crecimiento para eCommerce ambicioso',
      subtitle: 'Ayudamos a marcas DTC a escalar de forma rentable con medios pagados orientados al rendimiento y un enfoque obsesionado con los datos. Sin relleno. Sin gasto desperdiciado. Solo resultados.',
      cta1: 'Solicitar Auditoría Gratis',
      cta2: 'Ver Nuestros Servicios',
    },
    // Homepage content
    homepage: {
      heroIntro: 'Hipervínculo construye sistemas de crecimiento orientados al rendimiento para negocios listos para escalar.',
      heroDescription: 'Sitios web, arquitectura inbound y adquisición pagada diseñados para convertir tráfico en oportunidades reales — ya sea que estés generando leads locales o escalando una marca establecida.',
      ctaGetAudit: 'Auditoría Gratis',
      ctaExploreServices: 'Explorar Servicios',
      trustBadge1: '20+ años en crecimiento digital',
      trustBadge2: 'Retención de clientes a largo plazo',
      trustBadge3: 'Solo para negocios serios',
      rotatingHeadlines: [
        'Google Ads que Generan Llamadas y Leads Calificados',
        'Sitios Web Inbound Diseñados para Captar Demanda',
        'Estrategias de Growth Partner para eCommerce que Escalan Ingresos',
        'Sistemas de Generación de Leads de Alta Conversión',
      ],
      provenResultsTitle: 'Resultados Comprobados en Canales de Crecimiento\ny Sistemas de Generación de Leads Inbound',
      provenResultsCta: 'Solicita un recorrido de tu sistema de conversión y leads — adaptado a tu negocio.',
      leadGenTitle: 'Sistemas de Generación de Leads',
      leadGenResults: [
        'Pipelines inbound construidos para negocios de servicios generando llamadas y consultas consistentes',
        'Retención a largo plazo: muchos socios permanecen 5–8 años',
        'Sitios web enfocados en conversión diseñados para capturar demanda',
      ],
      ecomTitle: 'Socios de Crecimiento eCommerce',
      ecomResults: [
        'Más de $92M en ventas rastreadas en Meta, Google, Amazon, TikTok',
        '10+ años gestionando campañas Shopify de alto crecimiento',
        'Optimización de rendimiento en múltiples categorías',
      ],
      pillarsSubtitle: 'Nuestros Servicios',
      pillarsTitle: 'Dos Pilares Fundamentales de Crecimiento',
      pillarsDescription: 'Construimos sistemas de conversión completos — no solo campañas. Desde los cimientos hasta la escala.',
      services: [
        { title: 'Sistemas de Generación de Leads', description: 'Sitios web enfocados en conversión, landing pages, optimización de llamadas y formularios, WhatsApp, Google Ads para búsquedas de alta intención e infraestructura de tracking.' },
        { title: 'Desarrollo Web de Conversión', description: 'Sitios de alta conversión con UX optimizado, construidos para capturar leads e impulsar acción — no solo verse bien.' },
        { title: 'Google Ads para Inbound', description: 'Campañas de búsqueda construidas para ROI. Nos enfocamos en intención de fondo de embudo y tráfico calificado, no métricas de vanidad.' },
        { title: 'Configuración de Tracking y Atribución', description: 'Tracking server-side, implementación de GA4, seguimiento de llamadas, integraciones CRM. Sabe exactamente de dónde vienen tus leads.' },
        { title: 'Socios de Crecimiento eCommerce', description: 'Medios pagados de embudo completo para marcas Shopify. Meta, Google, Amazon, TikTok — optimizado para ROAS Neto, no métricas de vanidad.' },
        { title: 'Respaldo y Consultoría', description: 'Guía estratégica, auditorías de crecimiento y planificación de medios para equipos que necesitan soporte experto sin un retainer completo.' },
      ],
      // Service Detail Pages
      serviceDetail: {
        viewDetails: 'Ver Detalles',
        leadGen: {
          slug: 'sistemas-generacion-leads',
          heroTitle: 'Sistemas de Generación de Leads',
          heroSubtitle: 'Convierte el tráfico en leads calificados con un sistema inbound completo.',
          coreProblem: {
            title: 'Problema Central',
            intro: 'El problema es lo que sucede después de que alguien llega.',
            points: [
              'Un sitio web que no convierte.',
              'Un embudo que no está estructurado.',
              'Un flujo de leads que se rompe.',
              'Un negocio gastando dinero para \'obtener más tráfico\' sin construir la infraestructura para capturar la demanda.',
            ],
            solution: 'Ahí es donde entra Hipervinculo.',
            explanation: 'Muchos negocios invierten en marketing sin tener la infraestructura para convertir el tráfico en leads. Más clics no resuelven el problema si el sistema no está construido para capturar la intención. Tráfico sin conversión es presupuesto desperdiciado.',
            principle: 'Los anuncios son el combustible. El sistema es el motor.',
            principleNote: 'Sin escala, los anuncios se desperdician. Sin estructura, el crecimiento se vuelve repetible.',
          },
          whatWeBuild: {
            title: 'Lo Que Construimos',
            intro: 'Hipervinculo ayuda a negocios basados en servicios a crear un sistema completo de generación de leads inbound:',
            items: [
              'Un sitio web enfocado en conversión',
              'Landing pages alineadas con la intención de búsqueda',
              'Flujos de captación de leads construidos para velocidad y claridad',
              'Optimización de WhatsApp, llamadas y formularios',
              'Google Ads enfocado en demanda de alto valor',
              'Tracking que mide oportunidades reales',
            ],
          },
          entryOffer: {
            title: 'Oferta de Entrada',
            website: 'Los sitios web típicamente comienzan alrededor de $2,500',
            monthly: 'La gestión mensual de generación de leads comienza en $1,000',
            note: 'Sin contratos a largo plazo. Los clientes se quedan porque los resultados se componen con el tiempo.',
          },
          whoFor: {
            title: 'Para Quién Es Esto',
            intro: 'Esto está construido para negocios que:',
            items: [
              'Proveen servicios de alto valor',
              'Quieren consultas inbound consistentes',
              'Ya tienen demanda, pero les falta estructura',
              'Prefieren estabilidad a largo plazo sobre experimentos de marketing',
            ],
          },
          cta: {
            title: 'Contáctanos',
            description: 'Revisaremos si tu sitio web está listo para convertir tráfico en leads reales.',
            button: 'Contáctanos',
          },
        },
      },
      differentTitle: '¿Qué Nos Hace Diferentes?',
      differentSubtitle: 'No somos solo otra agencia. Somos un verdadero socio de crecimiento, profundamente invertido en tu éxito.',
      differentExperts: 'Expertos Obsesionados con el Rendimiento',
      differentExpertsDesc: 'Experiencia profunda en marketing de embudo completo para Shopify y Amazon. Aprovechamos herramientas avanzadas de atribución para ir más allá de las métricas superficiales.',
      differentTransparency: 'Transparencia Radical',
      differentTransparencyDesc: 'Reportamos honestamente qué funciona y qué no. Sin humo ni espejos. Cada dólar está contabilizado.',
      differentData: 'Decisiones Basadas en Datos',
      differentDataDesc: 'Todo lo que hacemos está basado en datos, probado con significancia estadística y optimizado para tus resultados reales de negocio.',
      differentPartnership: 'Asociación Verdadera',
      differentPartnershipDesc: 'Nos convertimos en una extensión de tu equipo. Llamadas semanales, acceso a Slack y recomendaciones proactivas — no solo reportes mensuales.',
      partnersTitle: 'Socios Certificados',
      industriesTitle: 'Industrias que Atendemos',
      industriesSubtitle: 'Tenemos experiencia profunda en estos verticales',
      industries: [
        { name: 'SERVICIOS LOCALES', description: 'Plomeros, electricistas, contratistas' },
        { name: 'LEGAL Y MÉDICO', description: 'Despachos legales, clínicas, especialistas' },
        { name: 'SERVICIOS DEL HOGAR', description: 'HVAC, techos, jardinería' },
        { name: 'ECOMMERCE', description: 'Shopify, marcas DTC, retail' },
        { name: 'B2B SAAS', description: 'Software, tecnología, enterprise' },
      ],
      faqTitle: 'Preguntas Frecuentes',
      faqs: [
        { q: '¿Cuál es la diferencia con otras agencias?', a: 'Nos enfocamos en sistemas, no solo campañas. Nuestro enfoque integra desarrollo web, infraestructura de tracking y medios pagados en una máquina de crecimiento cohesiva.' },
        { q: '¿Para quién es esto?', a: 'Negocios establecidos listos para invertir en crecimiento. Trabajamos mejor con empresas que tienen productos/servicios validados y están listas para escalar.' },
        { q: '¿Cuál es la diferencia entre un Sistema de Lead Gen y un Partner de eCommerce?', a: 'Los Sistemas de Lead Gen se enfocan en negocios de servicios que necesitan llamadas, formularios y leads calificados. Los Partners de eCommerce se enfocan en marcas Shopify que necesitan escalar ventas de forma rentable.' },
        { q: '¿Qué significa \'Infraestructura de Conversión\'?', a: 'Es el sistema completo que convierte visitantes en clientes: sitios web optimizados, configuración de tracking, landing pages y adquisición pagada trabajando juntos.' },
        { q: '¿Por qué hay un proceso de \'auditoría gratis primero\' para todos?', a: 'Queremos asegurarnos de que somos el fit correcto antes de comenzar. La auditoría nos ayuda a entender tu negocio, identificar oportunidades y recomendar el mejor enfoque.' },
        { q: '¿Es para e-commerce o generación de leads?', a: '¡Ambos! Tenemos equipos dedicados para cada uno. Lead Gen para negocios de servicios, Partners de eCommerce para marcas Shopify.' },
      ],
      ctaTitle: '¿Listo para Escalar tu Negocio?',
      ctaSubtitle: 'Obtén una auditoría gratis y descubre cómo podemos ayudarte a crecer.',
    },
    // Metrics
    metrics: {
      revenueGrowth: 'Crecimiento de Ingresos',
      roasImprovement: 'Mejora de ROAS',
    },
    // Proven Results
    provenResults: {
      title: 'Resultados Comprobados',
      stat1: '$92M+ en Ventas Rastreadas',
      stat2: '10+ Años de Experiencia',
      stat3: 'Garantía Mínima de 2.5x ROAS',
      stat4: 'Precios Basados en Rendimiento',
    },
    // Services
    services: {
      title: 'Nuestros Servicios',
      subtitle: 'Soluciones de crecimiento integrales para marcas eCommerce ambiciosas',
      paidMedia: {
        title: 'Medios Pagados',
        description: 'Publicidad en Meta, Google, TikTok y Amazon que impulsa el crecimiento rentable',
      },
      creative: {
        title: 'Servicios Creativos',
        description: 'Creativos que detienen el scroll diseñados para convertir',
      },
      cro: {
        title: 'CRO',
        description: 'Optimización de tasa de conversión para maximizar cada visitante',
      },
      analytics: {
        title: 'Analítica',
        description: 'Seguimiento y atribución de embudo completo que realmente funciona',
      },
      amazon: {
        title: 'Amazon',
        description: 'Publicidad en Amazon y optimización de marketplace',
      },
      strategy: {
        title: 'Estrategia',
        description: 'Hojas de ruta de crecimiento adaptadas a tus objetivos de negocio',
      },
    },
    // What Makes Us Different
    different: {
      title: '¿Qué Nos Hace Diferentes?',
      experts: {
        title: 'Expertos Obsesionados con el Rendimiento',
        description: 'Solo contratamos marketers senior con historial comprobado. Sin juniors aprendiendo con tu dinero.',
      },
      transparency: {
        title: 'Transparencia Radical',
        description: 'Dashboards en tiempo real, reportes semanales y un socio que realmente contesta el teléfono.',
      },
    },
    // Playbook
    playbook: {
      title: 'Playbook Gratuito de Advantage+',
      description: 'Aprende las estrategias exactas que usamos para escalar marcas DTC con campañas Meta Advantage+.',
      cta: 'Descargar Ahora',
    },
    // Guarantee
    guarantee: {
      title: 'Sin Resultados, Sin Pago',
      subtitle: 'Nuestra Garantía de Rendimiento',
      description: 'Garantizamos un mínimo de 2.5x ROAS neto en tu gasto en medios pagados. Si no lo logramos, no pagas nuestra tarifa.',
      disclaimer: '*Esta garantía aplica exclusivamente a nuestro servicio de Growth Partner.',
      stat: '2.5x',
      statLabel: 'ROAS Mínimo',
    },
    // Pricing
    pricing: {
      title: 'Precios Transparentes',
      subtitle: 'Elige el modelo que funcione para tu negocio',
      viewAll: 'Ver Todos los Detalles de Precios',
      retainer: {
        title: 'Retainer de Rendimiento',
        subtitle: 'Para marcas gastando $10K+/mes en anuncios',
        price: '2.5x ROAS Neto Mínimo',
        features: [
          'Gestión de medios pagados de embudo completo',
          'Estrategia y feedback creativo',
          'Revisiones de rendimiento semanales',
          'Dashboard de reportes en tiempo real',
        ],
        cta: 'Comenzar',
      },
      partnership: {
        title: 'Partnership de Crecimiento',
        subtitle: 'Para marcas Shopify listas para escalar',
        price: '5% de Ventas Netas Shopify',
        features: [
          'Todo lo del Performance Retainer',
          'Estratega de crecimiento dedicado',
          'Producción creativa',
          'Recomendaciones de CRO',
        ],
        cta: 'Aplicar Ahora',
      },
      leadGen: {
        title: 'Sistema de Generación de Leads',
        subtitle: 'Para negocios de servicios',
        setupPrice: '$2,500',
        monthlyPrice: '$1,000/mes',
        features: [
          'Desarrollo de landing page',
          'Configuración y gestión de Google Ads',
          'Seguimiento y atribución de leads',
          'Optimización mensual',
        ],
        cta: 'Más Información',
      },
    },
    // Partners
    partners: {
      title: 'Socios Certificados',
    },
    // FAQ
    faq: {
      title: 'Preguntas Frecuentes',
      questions: [
        {
          q: '¿Cuál es la inversión inicial?',
          a: 'Nuestro Performance Retainer comienza en $2,500/mes más un gasto mínimo en anuncios de $10,000/mes. El modelo Growth Partnership se basa en un porcentaje de las ventas.',
        },
        {
          q: '¿Qué es el ROAS neto?',
          a: 'El ROAS (Retorno sobre Gasto Publicitario) neto se calcula como (Ingresos - COGS - Envío - Comisiones) / Gasto Publicitario. Mide el beneficio real generado por tu inversión publicitaria.',
        },
        {
          q: '¿Cuál es la diferencia entre TACOS y ACoS?',
          a: 'ACoS (Costo Publicitario de Venta) = Gasto Publicitario / Ingresos Publicitarios. TACOS (Costo Publicitario Total de Venta) = Gasto Publicitario / Ingresos Totales. TACOS da una mejor imagen de la eficiencia general.',
        },
        {
          q: '¿Qué es Performance Max?',
          a: 'Performance Max es un tipo de campaña de Google Ads que usa IA para optimizar en todas las propiedades de Google incluyendo Búsqueda, Display, YouTube, Gmail y Discover.',
        },
        {
          q: '¿Qué hace un buen creativo para Meta Ads?',
          a: 'Gancho fuerte en los primeros 3 segundos, propuesta de valor clara, prueba social y un CTA convincente. Probamos múltiples variaciones para encontrar lo que resuena con tu audiencia.',
        },
        {
          q: '¿Qué pasa si no alcanzamos el objetivo de ROAS?',
          a: 'Si no alcanzamos el objetivo de 2.5x ROAS neto, no pagas nuestra tarifa de gestión. Solo tenemos éxito cuando tú lo tienes.',
        },
        {
          q: '¿Construyen tiendas o hacen email marketing?',
          a: 'Nos enfocamos exclusivamente en medios pagados y optimización de conversión. Nos asociamos con agencias de primer nivel para desarrollo Shopify y email marketing.',
        },
        {
          q: '¿Cuánto tiempo toma ver resultados?',
          a: 'La mayoría de los clientes ven mejoras iniciales dentro de 2-4 semanas. El escalamiento significativo típicamente ocurre dentro de 60-90 días mientras optimizamos campañas y probamos creativos.',
        },
        {
          q: '¿Requieren contratos a largo plazo?',
          a: 'No. Tenemos un compromiso inicial de 3 meses, pero después es mes a mes. Nuestros clientes se quedan porque entregamos resultados, no porque estén atrapados.',
        },
        {
          q: '¿En qué plataformas anuncian?',
          a: 'Nos especializamos en Meta (Facebook/Instagram), Google Ads (Búsqueda, Shopping, Performance Max, YouTube), TikTok y Amazon PPC.',
        },
        {
          q: '¿Cómo reportan el rendimiento?',
          a: 'Tienes acceso a un dashboard en tiempo real más reportes escritos semanales. También tenemos llamadas de estrategia quincenales para discutir resultados y próximos pasos.',
        },
        {
          q: '¿Con qué industrias trabajan?',
          a: 'Trabajamos principalmente con marcas eCommerce DTC, vendedores de Amazon y negocios de servicios que buscan generación de leads predecible.',
        },
        {
          q: '¿Cuál es su proceso creativo?',
          a: 'Analizamos tu contenido con mejor rendimiento, investigamos competidores y desarrollamos briefs creativos. Podemos trabajar con tu equipo interno o producir activos a través de nuestra red.',
        },
        {
          q: '¿Ofrecen una auditoría gratuita?',
          a: '¡Sí! Ofrecemos una auditoría de rendimiento gratuita donde analizamos tu marketing actual e identificamos oportunidades específicas de mejora.',
        },
        {
          q: '¿Cómo está estructurado su pricing?',
          a: 'Ofrecemos tres modelos: Performance Retainer (tarifa fija + bono por rendimiento), Growth Partnership (% de ingresos), y Lead Generation (setup + gestión mensual).',
        },
        {
          q: '¿Cuál es su requisito mínimo de gasto en anuncios?',
          a: 'Para gestión de medios pagados, típicamente trabajamos con marcas que gastan al menos $10,000/mes en publicidad. Para generación de leads, no hay mínimo.',
        },
        {
          q: '¿Pueden ayudar con publicidad en Amazon?',
          a: 'Absolutamente. Gestionamos campañas de Sponsored Products, Sponsored Brands y Sponsored Display con enfoque en TACOS y rentabilidad.',
        },
        {
          q: '¿Qué herramientas de tracking usan?',
          a: 'Implementamos tracking del lado del servidor via Conversions API, usamos Google Analytics 4 y configuramos modelos de atribución adecuados para asegurar datos precisos.',
        },
        {
          q: '¿Cómo empiezo?',
          a: 'Simplemente llena nuestro formulario de auditoría gratuita o contáctanos directamente. Programaremos una llamada de descubrimiento para conocer tu negocio y objetivos.',
        },
      ],
    },
    // CTA
    cta: {
      title: '¿Listo para escalar tu marca?',
      subtitle: 'Obtén una auditoría gratuita de tu marketing actual y ve exactamente cómo podemos ayudarte a crecer.',
      button: 'Solicitar Auditoría Gratis',
    },
    // Footer
    footer: {
      company: 'Hipervínculo',
      tagline: 'Tu socio de crecimiento para eCommerce ambicioso',
      quickLinks: 'Enlaces Rápidos',
      contact: 'Contacto',
      rights: 'Todos los derechos reservados.',
    },
    // Contact Page
    contact: {
      title: 'Contáctanos',
      subtitle: '¿Tienes una pregunta o quieres trabajar con nosotros? Nos encantaría saber de ti.',
      form: {
        fullName: 'Nombre Completo',
        companyName: 'Nombre de la Empresa',
        email: 'Correo Electrónico',
        howCanWeHelp: '¿Cómo podemos ayudarte?',
        message: 'Mensaje',
        submit: 'Enviar Mensaje',
        options: [
          'Quiero hacer crecer mi marca eCommerce',
          'Necesito ayuda con medios pagados',
          'Me interesa el Growth Partnership',
          'Otra consulta',
        ],
      },
      info: {
        email: 'hello@hipervinculo.net',
        phone: '+1 (555) 123-4567',
        address: 'Agencia remota sirviendo clientes en todo el mundo',
        hours: 'Lunes - Viernes, 9am - 6pm EST',
      },
    },
    // Audit Form
    audit: {
      title: 'Obtén Tu Auditoría Gratis',
      subtitle: 'Responde algunas preguntas y te mostraremos exactamente cómo mejorar el rendimiento de tu marketing.',
      questions: [
        {
          label: '¿Cuál es el nombre de tu empresa?',
          placeholder: 'Ingresa el nombre de tu empresa',
        },
        {
          label: '¿Cuál es la URL de tu sitio web?',
          placeholder: 'https://tusitio.com',
        },
        {
          label: '¿Qué tipo de negocio eres?',
          options: ['DTC/eCommerce', 'Vendedor de Amazon', 'Negocio de Servicios', 'Otro'],
        },
        {
          label: '¿Cuáles son tus ingresos mensuales?',
          options: ['Menos de $50K', '$50K - $100K', '$100K - $500K', '$500K - $1M', '$1M+'],
        },
        {
          label: '¿Cuál es tu gasto mensual actual en anuncios?',
          options: ['Menos de $5K', '$5K - $10K', '$10K - $25K', '$25K - $50K', '$50K+'],
        },
        {
          label: '¿Cuáles son tus principales objetivos de crecimiento?',
          placeholder: 'Cuéntanos qué quieres lograr...',
        },
        {
          label: '¿Cuál es tu correo electrónico?',
          placeholder: 'tu@email.com',
        },
      ],
      next: 'Siguiente',
      back: 'Atrás',
      submit: 'Enviar',
      pressEnter: 'Presiona Enter ↵',
      success: '¡Gracias! Revisaremos tu información y te contactaremos en 24 horas.',
    },
    // About Page
    about: {
      title: 'Nosotros',
      subtitle: 'No somos otra agencia. Somos tus socios de crecimiento.',
      quote: 'La mayoría de los negocios no fracasan por falta de marketing. Fracasan porque están ejecutando la estrategia equivocada.',
      heroTitle: 'Sobre Hipervínculo',
      heroSubtitle: 'Construimos sistemas de crecimiento orientados al rendimiento para negocios listos para escalar.',
      section1: {
        title: 'Construido alrededor de una simple realización',
        subtitle: 'La mayoría de los negocios no fracasan por falta de marketing. Fracasan porque carecen de un sistema.',
        content: 'Durante las últimas dos décadas, hemos visto el mismo patrón repetirse en todas las industrias — empresas de servicios, marcas locales y negocios de eCommerce por igual.',
        problem1: 'El tráfico no es el problema.',
        problem2: 'Los clics no son el problema.',
        problem3: 'Incluso la publicidad rara vez es el verdadero problema.',
        conclusion: 'El problema es lo que sucede después de que alguien llega.',
      },
      section2: {
        title: 'No Ejecutamos Campañas de Forma Aislada',
        subtitle: 'Hipervínculo no es una agencia solo de anuncios. Construimos sistemas de crecimiento orientados al rendimiento — el tipo de infraestructura que convierte atención en oportunidad.',
        card1Title: 'Diseño Enfocado en Conversión',
        card1Description: 'A veces eso significa diseñar un sitio web enfocado en conversión desde cero.',
        card2Title: 'Sistemas de Captación de Leads',
        card2Description: 'Ingeniería de sistemas de captación de leads que facilitan que los prospectos llamen, consulten o inicien una conversación.',
        fuelTitle: 'Los anuncios son combustible.',
        engineTitle: 'El sistema es el motor.',
      },
      section3: {
        title: 'Construido para Negocios que Quieren Estabilidad',
        subtitle: 'Muchos de nuestros clientes no buscan experimentos. Buscan algo raro en el marketing digital.',
      },
      values: {
        consistency: 'Consistencia',
        consistencyDesc: 'Sistemas que entregan resultados predecibles mes tras mes.',
        clarity: 'Claridad',
        clarityDesc: 'Reportes transparentes y métricas reales que importan.',
        longevity: 'Longevidad',
        longevityDesc: 'Infraestructura que se acumula con el tiempo, no victorias rápidas.',
      },
      stats: {
        title: 'Experiencia que Va Más Allá de la Teoría',
        subtitle: 'Hipervínculo ha gestionado más de $100M en gasto publicitario en todas las plataformas.',
        adSpend: '$100M+',
        adSpendLabel: 'Gasto Publicitario Gestionado',
        years: '20+',
        yearsLabel: 'Años de Experiencia',
        retention: '5-8',
        retentionLabel: 'Años de Retención Promedio',
      },
      marketing: {
        title: 'El mejor marketing no es más ruidoso',
        items: ['Más limpio', 'Estructurado', 'Medible', 'Construido sobre arquitectura'],
        conclusion: 'Abordamos el crecimiento con la mentalidad de ingenieros, no de hype.',
      },
      whoWeWorkWith: {
        title: 'Con Quién Trabajamos',
        subtitle: 'Construido para negocios serios que entienden que el crecimiento no es una campaña — es un sistema.',
        card1Title: 'Empresas de Servicios',
        card1Description: 'Buscando leads inbound predecibles y un sistema que entrega resultados consistentes.',
        card2Title: 'Marcas Establecidas',
        card2Description: 'Buscando rendimiento escalable e infraestructura que se acumula con el tiempo.',
        card3Title: 'Tiendas de eCommerce',
        card3Description: 'Listas para escalar más allá de $1M/mes con sistemas de crecimiento de embudo completo.',
        badge: 'Construyendo un motor de crecimiento que perdura.',
      },
      standard: {
        badge: 'Nuestro Estándar',
        title: 'El Estándar Hipervínculo',
        subtitle: 'Creemos en asociaciones a largo plazo, ejecución clara y sistemas que hablan por sí mismos.',
        items: ['Sin ruido', 'Sin trucos', 'Sin métricas de vanidad'],
      },
      cta: {
        title: '¿Listo para ver si tu sitio web está construido para convertir?',
        subtitle: 'Inicia una conversación con nosotros. Te diremos la verdad sobre qué funciona, qué no, y qué se necesitaría para construir un sistema que genere oportunidades reales.',
        button: 'Contactar a Hipervínculo',
      },
      problems: {
        title: '¿Te Suena Familiar?',
        items: [
          'Tu sitio web recibe tráfico pero no convierte',
          'Tu embudo tiene fugas que no puedes identificar',
          'Estás gastando en anuncios pero no puedes rastrear qué funciona',
          'Has contratado agencias que prometieron de más y entregaron de menos',
        ],
      },
    },
    // Services Page
    servicesPage: {
      title: 'Nuestros Servicios',
      subtitle: 'Soluciones de crecimiento integrales diseñadas para escalar',
      leadGen: {
        title: 'Sistemas de Generación de Leads',
        description: 'Infraestructura completa de generación de leads para negocios de servicios. Landing pages, Google Ads, seguimiento y optimización — todo hecho para ti.',
        features: ['Landing pages de alta conversión', 'Gestión de Google Ads', 'Seguimiento y atribución de leads', 'Reportes y optimización mensual'],
      },
      website: {
        title: 'Desarrollo de Sitios Web de Conversión',
        description: 'Sitios web construidos para convertir. Combinamos diseño hermoso con UX enfocado en conversión para maximizar el valor de tu tráfico.',
        features: ['Diseño optimizado para conversión', 'Desarrollo mobile-first', 'Optimización de velocidad', 'Integración de analítica'],
      },
      googleAds: {
        title: 'Google Ads',
        description: 'Search, Shopping, Performance Max — lo gestionamos todo. Enfocados en ROAS y rentabilidad, no solo clics.',
        features: ['Campañas de Search y Shopping', 'Optimización de Performance Max', 'Configuración de seguimiento de conversiones', 'Optimización semanal'],
      },
      tracking: {
        title: 'Seguimiento y Atribución',
        description: 'Sabe exactamente de dónde vienen tus ventas. Configuramos el seguimiento adecuado para que puedas tomar decisiones basadas en datos.',
        features: ['Seguimiento server-side', 'Atribución multi-touch', 'Dashboards personalizados', 'Reportes multiplataforma'],
      },
      ecommerce: {
        title: 'Socios de Crecimiento eCommerce',
        description: 'Para marcas Shopify serias sobre escalar. Gestión de embudo completo con enfoque en rentabilidad.',
        features: ['Publicidad en Meta y TikTok', 'Estrategia creativa', 'Optimización de landing pages', 'Hoja de ruta de crecimiento'],
      },
    },
    // Pricing Page
    pricingPage: {
      title: 'Precios Transparentes',
      subtitle: 'Sin cargos ocultos. Sin contratos a largo plazo. Solo asociaciones orientadas a resultados.',
      notes: [
        'Todos los precios están basados en rendimiento. Solo ganamos cuando tú ganas.',
        'Compromiso mínimo de 3 meses para todos los servicios.',
        'Soluciones enterprise personalizadas disponibles para marcas gastando $100K+/mes.',
      ],
    },
    // FAQs Page
    faqsPage: {
      title: 'Preguntas Frecuentes',
      subtitle: 'Todo lo que necesitas saber sobre trabajar con nosotros',
      stillQuestions: {
        title: '¿Aún Tienes Preguntas?',
        subtitle: 'Estamos aquí para ayudar. Contáctanos y te responderemos en 24 horas.',
        cta: 'Contáctanos',
      },
    },
    // Privacy Policy Page
    privacy: {
      title: 'Política de Privacidad',
      lastUpdated: 'Última actualización: 5 de febrero de 2026',
      intro: 'En HIPERVINCULO, nos tomamos muy en serio tu privacidad y la protección de tu información personal. Esta política de privacidad describe los tipos de información que recopilamos, cómo usamos esa información y cómo la mantenemos segura.',
      sections: {
        collect: {
          title: 'Información que Recopilamos',
          content1: 'Cuando visitas nuestro sitio web, podemos recopilar cierta información tuya, incluyendo tu nombre, dirección de correo electrónico, número de teléfono y otra información personal. Usamos esta información para proporcionarte los servicios que solicitas, como programar una consulta o proporcionar un presupuesto.',
          content2: 'Además, podemos recopilar cierta información no personal tuya, como tu dirección IP, el tipo de navegador que usas y otra información relacionada con tu uso de nuestro sitio web. Usamos esta información para mejorar nuestro sitio web y proporcionar una mejor experiencia de usuario a nuestros visitantes.',
        },
        use: {
          title: 'Cómo Usamos Tu Información',
          content1: 'Usamos tu información personal para proporcionarte los servicios que solicitas, como programar una consulta o proporcionar un presupuesto. También podemos usar tu información para contactarte sobre ofertas especiales o promociones, pero solo si nos has dado permiso para hacerlo.',
          content2: 'No compartimos tu información personal con terceros, excepto cuando sea necesario para proporcionarte los servicios que solicitas, como compartir tu información con nuestro personal interno.',
        },
        security: {
          title: 'Cómo Mantenemos Tu Información Segura',
          content: 'Nos tomamos muy en serio la seguridad de tu información personal y tomamos medidas para mantenerla segura. Usamos encriptación estándar de la industria y medidas de seguridad para proteger tu información contra acceso no autorizado, divulgación o uso.',
        },
        changes: {
          title: 'Cambios en Nuestra Política de Privacidad',
          content: 'Podemos actualizar nuestra política de privacidad de vez en cuando, y cualquier cambio será publicado en esta página. Al continuar usando nuestro sitio web después de que se hayan realizado cambios, aceptas la política de privacidad actualizada.',
        },
        contact: {
          title: 'Contáctanos',
          content: 'Si tienes alguna pregunta o inquietud sobre nuestra política de privacidad o cómo usamos tu información personal, no dudes en contactarnos.',
        },
      },
    },
  },
} as const;

export type Translations = typeof translations.en;
