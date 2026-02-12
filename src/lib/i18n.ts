// Language translations for Hipervinculo - i18n configuration
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
        'Google Ads That Drive Calls and Leads',
        'Inbound Websites Built to Convert',
        'eCommerce Growth Strategies That Scale',
        'Lead Generation Systems That Convert',
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
        { title: 'Google Ads', description: 'Search, Shopping, Performance Max — managed for profitability, not just traffic. Profit-first bidding strategies.' },
        { title: 'eCommerce Growth Partners', description: 'Full-funnel paid media for Shopify brands. Meta, Google, Amazon, TikTok — optimized for Net ROAS, not vanity metrics.' },
        { title: 'Amazon Seller Services', description: 'Amazon account and advertising management. PPC optimization, listing enhancement, and sales strategy — logistics not included.' },
        { title: 'Tracking & Attribution', description: 'Server-side tracking, GA4 implementation, Conversion APIs, and custom dashboards. Know exactly where your sales come from.' },
        { title: 'Custom Enterprise Apps', description: 'Tailored web applications for your business: inventory control, production management, and operations dashboards.' },
        { title: 'Brand Identity Manual Design', description: 'Professional brand identity systems with logo design, color palettes, typography, and usage guidelines for consistent brand presentation.' },
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
        conversionWeb: {
          slug: 'conversion-website-development',
          heroTitle: 'Conversion-Focused Website Development',
          heroSubtitle: 'A website should not just look good. It should produce outcomes.',
          coreProblem: {
            title: 'The Problem',
            intro: 'Most websites are built for aesthetics.',
            solution: 'We build websites as performance systems:',
            points: [
              'Designed around lead capture',
              'Structured for decision-making',
              'Built for speed, clarity, and intent',
              'Integrated with tracking and inbound flows',
            ],
            conclusion: 'Your website is where traffic becomes opportunity.',
          },
          includes: {
            title: 'Includes',
            items: [
              'Full website build or redesign',
              'Landing pages for campaigns',
              'Forms + call integration',
              'WhatsApp-first conversion options',
              'Analytics + event tracking setup',
              'Built for long-term scalability',
            ],
          },
          cta: {
            title: 'Start a Conversation',
            description: 'We\'ll assess what your site needs to convert better.',
            button: 'Get in Touch',
          },
        },
        ecommerce: {
          slug: 'ecommerce-growth-partners',
          heroTitle: 'eCommerce Growth Partners',
          heroSubtitle: 'Full-funnel paid media for Shopify brands. Optimized for Net ROAS, not vanity metrics.',
          coreProblem: {
            title: 'The Challenge',
            intro: 'Scaling an eCommerce brand is harder than ever.',
            points: [
              'Rising CPMs across all platforms',
              'Attribution is broken and unreliable',
              'Agencies optimizing for ROAS that doesn\'t reflect true profit',
              'Creative fatigue killing performance',
              'Scaling spend without scaling profit',
            ],
            solution: 'We operate differently.',
            explanation: 'We don\'t chase vanity metrics. We build systems that track real profitability, test creative at scale, and optimize every dollar for net revenue — not inflated dashboards.',
          },
          whatWeBuild: {
            title: 'What We Manage',
            intro: 'A complete paid media ecosystem for sustainable growth:',
            items: [
              'Meta Ads (Facebook & Instagram)',
              'Google Ads (Search, Shopping, Performance Max)',
              'TikTok Ads',
              'Amazon Ads (Sponsored Products, Brands, Display)',
              'Creative strategy and UGC coordination',
              'Attribution setup and profit tracking',
            ],
          },
          approach: {
            title: 'Our Approach',
            items: [
              { title: 'Net ROAS Focus', description: 'We optimize for profit after all costs — not inflated platform ROAS.' },
              { title: 'Creative-First Strategy', description: 'Ads live and die by creative. We test, iterate, and scale winners.' },
              { title: 'Full-Funnel Thinking', description: 'From cold traffic to retargeting to retention — every stage matters.' },
              { title: 'Transparent Reporting', description: 'Real numbers. Weekly calls. No smoke and mirrors.' },
            ],
          },
          pricing: {
            title: 'Engagement Model',
            models: [
              {
                title: 'Performance Retainer',
                highlight: '2.5x',
                highlightLabel: 'Min. Net ROAS',
                description: 'Our fee is conditional: if our diagnostic confirms viability, you only pay if we hit the targets. No results — no payment.',
              },
              {
                title: 'Growth Partnership',
                highlight: '5%',
                highlightLabel: 'of Net Shopify Sales',
                description: 'A true partnership model where we grow with you. Available for qualified brands with strong historical data.',
              },
            ],
            note: 'Both models suit brands with established conversion systems already in place.',
          },
          whoFor: {
            title: 'Who This Is For',
            intro: 'This is built for eCommerce brands that:',
            items: [
              'Are doing $50K+/month in revenue',
              'Have product-market fit and want to scale',
              'Are tired of agencies that don\'t understand profit',
              'Want a true partner, not just an ad manager',
            ],
          },
          cta: {
            title: 'Let\'s Talk Growth',
            description: 'Book a call to see if we\'re the right fit for your brand.',
            button: 'Get in Touch',
          },
        },
        amazon: {
          slug: 'amazon-seller-services',
          heroTitle: 'Amazon Seller Services',
          heroSubtitle: 'Full-service Amazon account management. From advertising to sales optimization — without the logistics headache.',
          coreProblem: {
            title: 'The Challenge',
            intro: 'Amazon is a battlefield. Most sellers are fighting blind.',
            points: [
              'Rising advertising costs with declining organic visibility',
              'Complex algorithm changes affecting rankings daily',
              'Poor listing optimization leaving money on the table',
              'Lack of clear strategy beyond "run more ads"',
              'Agencies that don\'t understand Amazon\'s ecosystem',
            ],
            solution: 'We take a different approach.',
            explanation: 'We manage your Amazon presence holistically — advertising, listing optimization, pricing strategy, and sales performance. No logistics, no fulfillment — just revenue growth.',
          },
          whatWeBuild: {
            title: 'What We Manage',
            intro: 'Complete Amazon account management for sustainable growth:',
            items: [
              'Sponsored Products campaigns',
              'Sponsored Brands & Sponsored Display',
              'Listing optimization (titles, bullets, A+ content)',
              'Keyword research & indexing strategy',
              'Pricing & competitive analysis',
              'Performance reporting & TACOS optimization',
            ],
          },
          approach: {
            title: 'Our Approach',
            items: [
              { title: 'TACOS Focus', description: 'We optimize for Total Advertising Cost of Sale — the real measure of Amazon profitability.' },
              { title: 'Organic + Paid Synergy', description: 'Advertising should boost organic rank, not replace it. We build both.' },
              { title: 'Listing-First Strategy', description: 'Great ads can\'t save a bad listing. We optimize your product pages before scaling spend.' },
              { title: 'Transparent Reporting', description: 'Real numbers. Clear insights. No hiding behind Amazon\'s complexity.' },
            ],
          },
          services: {
            title: 'Service Options',
            options: [
              { title: 'Advertising Only', description: 'PPC campaign management with weekly optimization and reporting.' },
              { title: 'Full Account Management', description: 'Complete sales management including advertising, listings, and strategy.' },
            ],
            note: 'Both options exclude logistics, fulfillment, and inventory management.',
          },
          whoFor: {
            title: 'Who This Is For',
            intro: 'This is built for Amazon sellers that:',
            items: [
              'Are already selling on Amazon with established products',
              'Want to scale sales without hiring an in-house team',
              'Have their own logistics and fulfillment handled',
              'Need expert advertising or full account management',
            ],
          },
          cta: {
            title: 'Let\'s Talk Amazon',
            description: 'Book a call to discuss how we can help you dominate the marketplace.',
            button: 'Get in Touch',
          },
        },
        googleAds: {
          slug: 'google-ads-management',
          heroTitle: 'Google Ads Management',
          heroSubtitle: 'Search, Shopping, Performance Max — managed for profitability, not just traffic.',
          coreProblem: {
            title: 'The Challenge',
            intro: 'Most Google Ads accounts are burning money.',
            points: [
              'Campaigns optimizing for clicks instead of revenue',
              'Poor conversion tracking leading to bad decisions',
              'Wasted spend on irrelevant search terms',
              'Performance Max black boxes with no transparency',
              'Agencies focused on spend, not profit margins',
            ],
            solution: 'We take a profit-first approach.',
            explanation: 'Every campaign is built around your unit economics. We track real conversions, optimize for profitable revenue, and give you complete visibility into where every dollar goes.',
          },
          whatWeBuild: {
            title: 'What We Manage',
            intro: 'Complete Google Ads ecosystem for sustainable growth:',
            items: [
              'Search campaigns with intent-based targeting',
              'Shopping campaigns for eCommerce',
              'Performance Max with structured asset groups',
              'Display & YouTube remarketing',
              'Conversion tracking & attribution setup',
              'Negative keyword management & optimization',
            ],
          },
          approach: {
            title: 'Our Approach',
            items: [
              { title: 'Profit-First Bidding', description: 'We optimize for margin, not volume. Every bid is calculated against your target profitability.' },
              { title: 'Intent Segmentation', description: 'Different search intent = different bid strategy. We structure campaigns to capture high-value queries.' },
              { title: 'Conversion Accuracy', description: 'Your decisions are only as good as your data. We ensure every conversion is tracked correctly.' },
              { title: 'Transparent Reporting', description: 'Real numbers. Clear insights. You always know exactly where your budget goes.' },
            ],
          },
          platforms: {
            title: 'Platforms We Manage',
            items: ['Google Search', 'Google Shopping', 'Performance Max', 'YouTube Ads', 'Display Network', 'Discovery Ads'],
          },
          whoFor: {
            title: 'Who This Is For',
            intro: 'This is built for businesses that:',
            items: [
              'Have a proven product or service with clear margins',
              'Want to scale paid search profitably',
              'Are frustrated with agencies that don\'t understand unit economics',
              'Need expert management, not just account monitoring',
            ],
          },
          cta: {
            title: 'Let\'s Talk Google Ads',
            description: 'Book a call to audit your current campaigns and find growth opportunities.',
            button: 'Get in Touch',
          },
        },
        tracking: {
          slug: 'tracking-attribution',
          heroTitle: 'Tracking & Attribution',
          heroSubtitle: 'Know exactly where your sales come from. Make decisions based on data, not guesses.',
          coreProblem: {
            title: 'The Challenge',
            intro: 'Most businesses are making decisions on broken data.',
            points: [
              'iOS updates breaking Facebook attribution',
              'Google Analytics missing 30-50% of conversions',
              'No visibility into true customer journey',
              'Multiple platforms claiming credit for the same sale',
              'No way to know which campaigns actually drive profit',
            ],
            solution: 'We build tracking systems that work.',
            explanation: 'Server-side tracking, first-party data collection, and custom attribution models that give you real visibility into what\'s working and what\'s not.',
          },
          whatWeBuild: {
            title: 'What We Build',
            intro: 'Complete tracking infrastructure for confident decision-making:',
            items: [
              'Server-side tracking (GTM Server)',
              'First-party data collection',
              'Conversion API implementations (CAPI)',
              'Custom attribution dashboards',
              'Multi-touch attribution models',
              'Cross-platform reporting',
            ],
          },
          approach: {
            title: 'Our Approach',
            items: [
              { title: 'Server-Side First', description: 'Browser-based tracking is dying. We build server-side systems that capture data accurately.' },
              { title: 'First-Party Focus', description: 'Own your data. We implement systems that don\'t rely on third-party cookies.' },
              { title: 'Platform Integration', description: 'Your tracking feeds directly into ad platforms for better optimization signals.' },
              { title: 'Actionable Insights', description: 'Data is useless without clarity. We build dashboards that drive decisions.' },
            ],
          },
          tools: {
            title: 'Tools We Use',
            items: ['Google Tag Manager (Server)', 'Meta Conversion API', 'Google Analytics 4', 'Triple Whale', 'Northbeam', 'Custom Solutions'],
          },
          whoFor: {
            title: 'Who This Is For',
            intro: 'This is essential for businesses that:',
            items: [
              'Spend $10K+/month on paid media',
              'Have experienced tracking degradation post-iOS14',
              'Want accurate data for scaling decisions',
              'Need to understand true customer acquisition cost',
            ],
          },
          cta: {
            title: 'Fix Your Tracking',
            description: 'Book a call to audit your current tracking setup and find the gaps.',
          button: 'Get in Touch',
          },
        },
        customApps: {
          slug: 'custom-enterprise-applications',
          heroTitle: 'Custom Enterprise Applications',
          heroSubtitle: 'Tailored web applications built to solve your specific business challenges.',
          coreProblem: {
            title: 'The Challenge',
            intro: 'Generic software rarely fits your exact needs.',
            points: [
              'Off-the-shelf solutions require workarounds',
              'Data lives in disconnected spreadsheets and systems',
              'Manual processes eat up hours of productive time',
              'No visibility into real-time operations',
              'Scaling means more complexity, not more efficiency',
            ],
            solution: 'We build custom solutions that fit your business.',
            explanation: 'Every business has unique workflows. Instead of forcing your team to adapt to rigid software, we create applications tailored to how you actually work — streamlining operations and unlocking growth.',
          },
          whatWeBuild: {
            title: 'What We Build',
            intro: 'Custom web applications designed for enterprise needs:',
            items: [
              'Inventory management systems',
              'Production control dashboards',
              'Custom CRM and sales tools',
              'Workflow automation platforms',
              'Real-time reporting dashboards',
              'Internal operations portals',
            ],
          },
          approach: {
            title: 'Our Approach',
            items: [
              { title: 'Discovery & Requirements', description: 'We map your current processes and identify exactly where technology can create efficiency gains.' },
              { title: 'Custom Architecture', description: 'We design scalable systems that grow with your business — no unnecessary complexity.' },
              { title: 'Iterative Development', description: 'You see progress weekly. We build in sprints so you can provide feedback and adjust direction.' },
              { title: 'Training & Support', description: 'We don\'t just deliver and disappear. Your team gets trained, and we provide ongoing support.' },
            ],
          },
          features: {
            title: 'Key Capabilities',
            items: ['Real-time data sync', 'Role-based access control', 'Mobile-responsive design', 'Third-party integrations', 'Automated reporting', 'Secure cloud hosting'],
          },
          useCases: {
            title: 'Use Cases',
            items: [
              { title: 'Inventory Control', description: 'Track stock levels, automate reorders, and get real-time visibility across locations.' },
              { title: 'Production Management', description: 'Monitor production lines, track KPIs, and optimize workflows in real-time.' },
              { title: 'Operations Dashboards', description: 'Consolidate data from multiple sources into actionable business intelligence.' },
            ],
          },
          whoFor: {
            title: 'Who This Is For',
            intro: 'This is built for businesses that:',
            items: [
              'Have outgrown spreadsheets and basic tools',
              'Need software tailored to their specific workflow',
              'Want to automate manual processes',
              'Require real-time visibility into operations',
            ],
          },
          cta: {
            title: 'Let\'s Build Your Solution',
            description: 'Book a call to discuss your business challenges and explore how a custom application can solve them.',
            button: 'Get in Touch',
          },
        },
        brandIdentity: {
          slug: 'brand-identity-manual',
          heroTitle: 'Brand Identity Manual Design',
          heroSubtitle: 'A professional brand identity system that ensures consistency, recognition, and trust across every touchpoint.',
          coreProblem: {
            title: 'The Problem',
            intro: 'Most businesses operate without a defined brand identity.',
            points: [
              'Inconsistent use of logos, colors, and fonts across materials',
              'No clear guidelines for how the brand should look and feel',
              'Every new piece of content requires guesswork',
              'Your brand looks different on your website, social media, and print',
              'Lack of professionalism erodes trust with potential clients',
            ],
            solution: 'Your brand deserves a system, not improvisation.',
            explanation: 'A brand identity manual is the foundation of how your business is perceived. It defines the visual and verbal rules that make your brand recognizable, consistent, and professional — from your website to your business cards.',
          },
          whatWeDeliver: {
            title: 'What We Deliver',
            intro: 'A comprehensive brand identity manual that covers every visual aspect of your brand:',
            items: [
              'Logo design (primary, secondary, icon variations)',
              'Complete color palette with codes (HEX, RGB, CMYK, Pantone)',
              'Typography system (primary and secondary fonts, hierarchy)',
              'Logo usage rules (clear space, minimum sizes, incorrect uses)',
              'Brand patterns and graphic elements',
              'Business card and stationery design',
              'Social media templates and guidelines',
              'Brand voice and tone guidelines',
            ],
          },
          process: {
            title: 'Our Process',
            items: [
              { title: 'Discovery & Research', description: 'We study your business, competitors, audience, and goals to define the strategic direction of your brand.' },
              { title: 'Concept Development', description: 'We create multiple visual concepts and directions, refining based on your feedback until we nail the identity.' },
              { title: 'System Design', description: 'We build out the complete visual system — logo variations, colors, typography, patterns, and all supporting elements.' },
              { title: 'Manual & Delivery', description: 'We compile everything into a professional brand manual (PDF) with clear guidelines your team can follow.' },
            ],
          },
          includes: {
            title: 'What\'s Included',
            items: [
              'Brand strategy session',
              'Logo design with multiple variations',
              'Color palette definition',
              'Typography selection and hierarchy',
              'Usage guidelines and restrictions',
              'Digital and print-ready files',
              'Brand identity manual (PDF)',
              'Brand application mockups (signage, packaging, merch)',
            ],
          },
          whoFor: {
            title: 'Who This Is For',
            intro: 'This is ideal for businesses that:',
            items: [
              'Are launching a new brand or product',
              'Need to professionalize their existing visual identity',
              'Want consistency across all marketing materials',
              'Are scaling and need brand guidelines for their team',
            ],
          },
          cta: {
            title: 'Let\'s Build Your Brand',
            description: 'Schedule a consultation to discuss your brand vision and how we can bring it to life.',
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
        phone: 'Phone Number',
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
      amazon: {
        title: 'Amazon Seller Services',
        description: 'Full-service Amazon account management. From advertising to sales optimization — we help you dominate the marketplace.',
        features: ['Amazon PPC management', 'Listing optimization', 'Sales strategy & pricing', 'Performance reporting'],
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
      customApps: {
        title: 'Custom Enterprise Applications',
        description: 'Tailored web applications built for your specific business needs. From inventory control to production management systems.',
        features: ['Custom web applications', 'Business process automation', 'Real-time dashboards', 'System integrations'],
      },
      brandIdentity: {
        title: 'Brand Identity Manual Design',
        description: 'Professional brand identity systems that ensure visual consistency and recognition across every touchpoint of your business.',
        features: ['Logo design & variations', 'Color palette & typography', 'Usage guidelines', 'Digital & print files'],
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
      faqs: 'Preguntas',
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
        'Google Ads que Generan Llamadas y Leads',
        'Sitios Web Inbound que Convierten',
        'Estrategias eCommerce que Escalan',
        'Sistemas de Leads que Convierten',
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
        { title: 'Google Ads', description: 'Search, Shopping, Performance Max — gestionado para rentabilidad, no solo tráfico. Estrategias de pujas profit-first.' },
        { title: 'Socios de Crecimiento eCommerce', description: 'Medios pagados de embudo completo para marcas Shopify. Meta, Google, Amazon, TikTok — optimizado para ROAS Neto.' },
        { title: 'Servicios para Vendedores Amazon', description: 'Gestión de cuentas y publicidad de Amazon. Optimización de PPC, mejora de listados y estrategia de ventas — logística no incluida.' },
        { title: 'Seguimiento y Atribución', description: 'Tracking server-side, implementación de GA4, Conversion APIs y dashboards personalizados. Sabe exactamente de dónde vienen tus ventas.' },
        { title: 'Aplicaciones Empresariales', description: 'Aplicaciones web a medida para tu negocio: control de inventario, gestión de producción y dashboards de operaciones.' },
        { title: 'Diseño de Manual de Imagen de Marca', description: 'Sistemas profesionales de identidad de marca con diseño de logo, paletas de colores, tipografía y guías de uso para una presentación de marca consistente.' },
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
        conversionWeb: {
          slug: 'desarrollo-web-conversion',
          heroTitle: 'Desarrollo Web Enfocado en Conversión',
          heroSubtitle: 'Un sitio web no solo debe verse bien. Debe producir resultados.',
          coreProblem: {
            title: 'El Problema',
            intro: 'La mayoría de los sitios web están construidos para la estética.',
            solution: 'Nosotros construimos sitios web como sistemas de rendimiento:',
            points: [
              'Diseñados alrededor de la captura de leads',
              'Estructurados para la toma de decisiones',
              'Construidos para velocidad, claridad e intención',
              'Integrados con tracking y flujos inbound',
            ],
            conclusion: 'Tu sitio web es donde el tráfico se convierte en oportunidad.',
          },
          includes: {
            title: 'Incluye',
            items: [
              'Construcción o rediseño completo del sitio',
              'Landing pages para campañas',
              'Integración de formularios + llamadas',
              'Opciones de conversión con WhatsApp primero',
              'Configuración de analytics + tracking de eventos',
              'Construido para escalabilidad a largo plazo',
            ],
          },
          cta: {
            title: 'Inicia una Conversación',
            description: 'Evaluaremos qué necesita tu sitio para convertir mejor.',
            button: 'Contáctanos',
          },
        },
        ecommerce: {
          slug: 'socios-crecimiento-ecommerce',
          heroTitle: 'Socios de Crecimiento eCommerce',
          heroSubtitle: 'Medios pagados de embudo completo para marcas Shopify. Optimizado para ROAS Neto, no métricas de vanidad.',
          coreProblem: {
            title: 'El Desafío',
            intro: 'Escalar una marca eCommerce es más difícil que nunca.',
            points: [
              'CPMs en aumento en todas las plataformas',
              'La atribución está rota y no es confiable',
              'Agencias optimizando para ROAS que no refleja la ganancia real',
              'Fatiga creativa matando el rendimiento',
              'Escalando gasto sin escalar ganancias',
            ],
            solution: 'Nosotros operamos diferente.',
            explanation: 'No perseguimos métricas de vanidad. Construimos sistemas que rastrean rentabilidad real, prueban creativos a escala, y optimizan cada dólar para ingresos netos — no dashboards inflados.',
          },
          whatWeBuild: {
            title: 'Lo Que Gestionamos',
            intro: 'Un ecosistema completo de medios pagados para crecimiento sostenible:',
            items: [
              'Meta Ads (Facebook e Instagram)',
              'Google Ads (Search, Shopping, Performance Max)',
              'TikTok Ads',
              'Amazon Ads (Sponsored Products, Brands, Display)',
              'Estrategia creativa y coordinación de UGC',
              'Configuración de atribución y tracking de ganancias',
            ],
          },
          approach: {
            title: 'Nuestro Enfoque',
            items: [
              { title: 'Enfoque en ROAS Neto', description: 'Optimizamos para ganancia después de todos los costos — no ROAS inflado de plataformas.' },
              { title: 'Estrategia Creative-First', description: 'Los anuncios viven y mueren por el creativo. Probamos, iteramos y escalamos ganadores.' },
              { title: 'Pensamiento Full-Funnel', description: 'Desde tráfico frío hasta retargeting y retención — cada etapa importa.' },
              { title: 'Reportes Transparentes', description: 'Números reales. Llamadas semanales. Sin humo ni espejos.' },
            ],
          },
          pricing: {
            title: 'Modelo de Compromiso',
            models: [
              {
                title: 'Retainer de Rendimiento',
                highlight: '2.5x',
                highlightLabel: 'ROAS Neto Mín.',
                description: 'Nuestra tarifa es condicional: si nuestro diagnóstico confirma viabilidad, solo pagas si alcanzamos los objetivos. Sin resultados — sin pago.',
              },
              {
                title: 'Growth Partnership',
                highlight: '5%',
                highlightLabel: 'de Ventas Netas Shopify',
                description: 'Un modelo de asociación real donde crecemos contigo. Disponible para marcas calificadas con datos históricos sólidos.',
              },
            ],
            note: 'Ambos modelos son ideales para marcas con sistemas de conversión establecidos.',
          },
          whoFor: {
            title: 'Para Quién Es Esto',
            intro: 'Esto está construido para marcas eCommerce que:',
            items: [
              'Están haciendo $50K+/mes en ingresos',
              'Tienen product-market fit y quieren escalar',
              'Están cansadas de agencias que no entienden la ganancia',
              'Quieren un socio real, no solo un gestor de anuncios',
            ],
          },
          cta: {
            title: 'Hablemos de Crecimiento',
            description: 'Agenda una llamada para ver si somos el fit correcto para tu marca.',
            button: 'Contáctanos',
          },
        },
        amazon: {
          slug: 'servicios-vendedores-amazon',
          heroTitle: 'Servicios para Vendedores de Amazon',
          heroSubtitle: 'Gestión completa de cuentas de Amazon. Desde publicidad hasta optimización de ventas — sin el dolor de cabeza logístico.',
          coreProblem: {
            title: 'El Desafío',
            intro: 'Amazon es un campo de batalla. La mayoría de vendedores pelean a ciegas.',
            points: [
              'Costos de publicidad en aumento con visibilidad orgánica en declive',
              'Cambios complejos de algoritmo afectando rankings diariamente',
              'Mala optimización de listados dejando dinero en la mesa',
              'Falta de estrategia clara más allá de "correr más anuncios"',
              'Agencias que no entienden el ecosistema de Amazon',
            ],
            solution: 'Nosotros tomamos un enfoque diferente.',
            explanation: 'Gestionamos tu presencia en Amazon de forma integral — publicidad, optimización de listados, estrategia de precios y rendimiento de ventas. Sin logística, sin fulfillment — solo crecimiento de ingresos.',
          },
          whatWeBuild: {
            title: 'Lo Que Gestionamos',
            intro: 'Gestión completa de cuenta Amazon para crecimiento sostenible:',
            items: [
              'Campañas de Sponsored Products',
              'Sponsored Brands y Sponsored Display',
              'Optimización de listados (títulos, bullets, contenido A+)',
              'Investigación de keywords y estrategia de indexación',
              'Análisis de precios y competencia',
              'Reportes de rendimiento y optimización de TACOS',
            ],
          },
          approach: {
            title: 'Nuestro Enfoque',
            items: [
              { title: 'Enfoque en TACOS', description: 'Optimizamos para Total Advertising Cost of Sale — la medida real de rentabilidad en Amazon.' },
              { title: 'Sinergia Orgánico + Pagado', description: 'La publicidad debe impulsar el ranking orgánico, no reemplazarlo. Construimos ambos.' },
              { title: 'Estrategia Listing-First', description: 'Buenos anuncios no salvan un mal listado. Optimizamos tus páginas de producto antes de escalar gasto.' },
              { title: 'Reportes Transparentes', description: 'Números reales. Insights claros. Sin esconderse detrás de la complejidad de Amazon.' },
            ],
          },
          services: {
            title: 'Opciones de Servicio',
            options: [
              { title: 'Solo Publicidad', description: 'Gestión de campañas PPC con optimización y reportes semanales.' },
              { title: 'Gestión Completa de Cuenta', description: 'Gestión completa de ventas incluyendo publicidad, listados y estrategia.' },
            ],
            note: 'Ambas opciones excluyen logística, fulfillment y gestión de inventario.',
          },
          whoFor: {
            title: 'Para Quién Es Esto',
            intro: 'Esto está construido para vendedores de Amazon que:',
            items: [
              'Ya están vendiendo en Amazon con productos establecidos',
              'Quieren escalar ventas sin contratar un equipo interno',
              'Tienen su logística y fulfillment resueltos',
              'Necesitan publicidad experta o gestión completa de cuenta',
            ],
          },
          cta: {
            title: 'Hablemos de Amazon',
            description: 'Agenda una llamada para discutir cómo podemos ayudarte a dominar el marketplace.',
            button: 'Contáctanos',
          },
        },
        googleAds: {
          slug: 'gestion-google-ads',
          heroTitle: 'Gestión de Google Ads',
          heroSubtitle: 'Search, Shopping, Performance Max — gestionado para rentabilidad, no solo tráfico.',
          coreProblem: {
            title: 'El Desafío',
            intro: 'La mayoría de cuentas de Google Ads están quemando dinero.',
            points: [
              'Campañas optimizando para clics en vez de ingresos',
              'Mal seguimiento de conversiones llevando a malas decisiones',
              'Gasto desperdiciado en términos de búsqueda irrelevantes',
              'Performance Max como cajas negras sin transparencia',
              'Agencias enfocadas en gasto, no en márgenes de ganancia',
            ],
            solution: 'Tomamos un enfoque profit-first.',
            explanation: 'Cada campaña se construye alrededor de tu unit economics. Rastreamos conversiones reales, optimizamos para ingresos rentables, y te damos visibilidad completa de a dónde va cada dólar.',
          },
          whatWeBuild: {
            title: 'Lo Que Gestionamos',
            intro: 'Ecosistema completo de Google Ads para crecimiento sostenible:',
            items: [
              'Campañas de Search con targeting basado en intención',
              'Campañas de Shopping para eCommerce',
              'Performance Max con asset groups estructurados',
              'Remarketing de Display y YouTube',
              'Setup de conversion tracking y atribución',
              'Gestión y optimización de palabras clave negativas',
            ],
          },
          approach: {
            title: 'Nuestro Enfoque',
            items: [
              { title: 'Pujas Profit-First', description: 'Optimizamos para margen, no volumen. Cada puja se calcula contra tu rentabilidad objetivo.' },
              { title: 'Segmentación por Intención', description: 'Diferente intención = diferente estrategia de pujas. Estructuramos campañas para capturar queries de alto valor.' },
              { title: 'Precisión en Conversiones', description: 'Tus decisiones son tan buenas como tus datos. Aseguramos que cada conversión se rastree correctamente.' },
              { title: 'Reportes Transparentes', description: 'Números reales. Insights claros. Siempre sabes exactamente a dónde va tu presupuesto.' },
            ],
          },
          platforms: {
            title: 'Plataformas Que Gestionamos',
            items: ['Google Search', 'Google Shopping', 'Performance Max', 'YouTube Ads', 'Display Network', 'Discovery Ads'],
          },
          whoFor: {
            title: 'Para Quién Es Esto',
            intro: 'Esto está construido para negocios que:',
            items: [
              'Tienen un producto o servicio probado con márgenes claros',
              'Quieren escalar paid search de manera rentable',
              'Están frustrados con agencias que no entienden unit economics',
              'Necesitan gestión experta, no solo monitoreo de cuentas',
            ],
          },
          cta: {
            title: 'Hablemos de Google Ads',
            description: 'Agenda una llamada para auditar tus campañas actuales y encontrar oportunidades de crecimiento.',
            button: 'Contáctanos',
          },
        },
        tracking: {
          slug: 'seguimiento-atribucion',
          heroTitle: 'Seguimiento y Atribución',
          heroSubtitle: 'Sabe exactamente de dónde vienen tus ventas. Toma decisiones basadas en datos, no en suposiciones.',
          coreProblem: {
            title: 'El Desafío',
            intro: 'La mayoría de negocios toman decisiones con datos rotos.',
            points: [
              'Actualizaciones de iOS rompiendo la atribución de Facebook',
              'Google Analytics perdiendo 30-50% de conversiones',
              'Sin visibilidad del verdadero journey del cliente',
              'Múltiples plataformas reclamando crédito por la misma venta',
              'Sin forma de saber qué campañas realmente generan ganancia',
            ],
            solution: 'Construimos sistemas de tracking que funcionan.',
            explanation: 'Server-side tracking, recolección de datos first-party, y modelos de atribución personalizados que te dan visibilidad real de qué funciona y qué no.',
          },
          whatWeBuild: {
            title: 'Lo Que Construimos',
            intro: 'Infraestructura completa de tracking para toma de decisiones con confianza:',
            items: [
              'Server-side tracking (GTM Server)',
              'Recolección de datos first-party',
              'Implementaciones de Conversion API (CAPI)',
              'Dashboards de atribución personalizados',
              'Modelos de atribución multi-touch',
              'Reportes multiplataforma',
            ],
          },
          approach: {
            title: 'Nuestro Enfoque',
            items: [
              { title: 'Server-Side First', description: 'El tracking basado en navegador está muriendo. Construimos sistemas server-side que capturan datos con precisión.' },
              { title: 'Enfoque First-Party', description: 'Sé dueño de tus datos. Implementamos sistemas que no dependen de cookies de terceros.' },
              { title: 'Integración de Plataformas', description: 'Tu tracking alimenta directamente las plataformas de ads para mejores señales de optimización.' },
              { title: 'Insights Accionables', description: 'Los datos son inútiles sin claridad. Construimos dashboards que impulsan decisiones.' },
            ],
          },
          tools: {
            title: 'Herramientas Que Usamos',
            items: ['Google Tag Manager (Server)', 'Meta Conversion API', 'Google Analytics 4', 'Triple Whale', 'Northbeam', 'Soluciones Personalizadas'],
          },
          whoFor: {
            title: 'Para Quién Es Esto',
            intro: 'Esto es esencial para negocios que:',
            items: [
              'Gastan $10K+/mes en paid media',
              'Han experimentado degradación de tracking post-iOS14',
              'Quieren datos precisos para decisiones de escala',
              'Necesitan entender el verdadero costo de adquisición de clientes',
            ],
          },
          cta: {
            title: 'Arregla Tu Tracking',
            description: 'Agenda una llamada para auditar tu setup de tracking actual y encontrar las brechas.',
            button: 'Contáctanos',
          },
        },
        customApps: {
          slug: 'aplicaciones-empresariales-personalizadas',
          heroTitle: 'Aplicaciones Empresariales',
          heroSubtitle: 'Aplicaciones web a medida construidas para resolver los desafíos específicos de tu negocio.',
          coreProblem: {
            title: 'El Desafío',
            intro: 'El software genérico rara vez se ajusta a tus necesidades exactas.',
            points: [
              'Las soluciones estándar requieren soluciones alternativas',
              'Los datos viven en hojas de cálculo y sistemas desconectados',
              'Los procesos manuales consumen horas de tiempo productivo',
              'Sin visibilidad en tiempo real de las operaciones',
              'Escalar significa más complejidad, no más eficiencia',
            ],
            solution: 'Construimos soluciones a medida para tu negocio.',
            explanation: 'Cada negocio tiene flujos de trabajo únicos. En lugar de forzar a tu equipo a adaptarse a software rígido, creamos aplicaciones adaptadas a cómo realmente trabajas — optimizando operaciones y desbloqueando crecimiento.',
          },
          whatWeBuild: {
            title: 'Lo Que Construimos',
            intro: 'Aplicaciones web personalizadas diseñadas para necesidades empresariales:',
            items: [
              'Sistemas de gestión de inventario',
              'Dashboards de control de producción',
              'CRM y herramientas de ventas personalizadas',
              'Plataformas de automatización de flujos',
              'Dashboards de reportes en tiempo real',
              'Portales de operaciones internas',
            ],
          },
          approach: {
            title: 'Nuestro Enfoque',
            items: [
              { title: 'Descubrimiento y Requisitos', description: 'Mapeamos tus procesos actuales e identificamos exactamente dónde la tecnología puede crear eficiencias.' },
              { title: 'Arquitectura Personalizada', description: 'Diseñamos sistemas escalables que crecen con tu negocio — sin complejidad innecesaria.' },
              { title: 'Desarrollo Iterativo', description: 'Ves progreso semanal. Construimos en sprints para que puedas dar feedback y ajustar dirección.' },
              { title: 'Capacitación y Soporte', description: 'No solo entregamos y desaparecemos. Tu equipo recibe capacitación, y proporcionamos soporte continuo.' },
            ],
          },
          features: {
            title: 'Capacidades Clave',
            items: ['Sincronización de datos en tiempo real', 'Control de acceso por roles', 'Diseño responsive móvil', 'Integraciones con terceros', 'Reportes automatizados', 'Hosting seguro en la nube'],
          },
          useCases: {
            title: 'Casos de Uso',
            items: [
              { title: 'Control de Inventario', description: 'Rastrea niveles de stock, automatiza reordenes y obtén visibilidad en tiempo real entre ubicaciones.' },
              { title: 'Gestión de Producción', description: 'Monitorea líneas de producción, rastrea KPIs y optimiza flujos de trabajo en tiempo real.' },
              { title: 'Dashboards de Operaciones', description: 'Consolida datos de múltiples fuentes en inteligencia de negocio accionable.' },
            ],
          },
          whoFor: {
            title: 'Para Quién Es Esto',
            intro: 'Esto está construido para negocios que:',
            items: [
              'Han superado las hojas de cálculo y herramientas básicas',
              'Necesitan software adaptado a su flujo de trabajo específico',
              'Quieren automatizar procesos manuales',
              'Requieren visibilidad en tiempo real de las operaciones',
            ],
          },
          cta: {
            title: 'Construyamos Tu Solución',
            description: 'Agenda una llamada para discutir los desafíos de tu negocio y explorar cómo una aplicación a medida puede resolverlos.',
            button: 'Contáctanos',
          },
        },
        brandIdentity: {
          slug: 'manual-imagen-de-marca',
          heroTitle: 'Diseño de Manual de Imagen de Marca',
          heroSubtitle: 'Un sistema profesional de identidad de marca que asegura consistencia, reconocimiento y confianza en cada punto de contacto.',
          coreProblem: {
            title: 'El Problema',
            intro: 'La mayoría de los negocios operan sin una identidad de marca definida.',
            points: [
              'Uso inconsistente de logos, colores y tipografías en los materiales',
              'Sin guías claras de cómo debe verse y sentirse la marca',
              'Cada nueva pieza de contenido requiere improvisar',
              'Tu marca se ve diferente en tu sitio web, redes sociales e impresos',
              'La falta de profesionalismo erosiona la confianza con clientes potenciales',
            ],
            solution: 'Tu marca merece un sistema, no improvisación.',
            explanation: 'Un manual de identidad de marca es la base de cómo se percibe tu negocio. Define las reglas visuales y verbales que hacen tu marca reconocible, consistente y profesional — desde tu sitio web hasta tus tarjetas de presentación.',
          },
          whatWeDeliver: {
            title: 'Lo Que Entregamos',
            intro: 'Un manual de identidad de marca completo que cubre cada aspecto visual de tu marca:',
            items: [
              'Diseño de logo (primario, secundario, variaciones de icono)',
              'Paleta de colores completa con códigos (HEX, RGB, CMYK, Pantone)',
              'Sistema tipográfico (fuentes primarias y secundarias, jerarquía)',
              'Reglas de uso del logo (espacio libre, tamaños mínimos, usos incorrectos)',
              'Patrones de marca y elementos gráficos',
              'Diseño de tarjetas de presentación y papelería',
              'Plantillas y guías para redes sociales',
              'Guías de voz y tono de marca',
            ],
          },
          process: {
            title: 'Nuestro Proceso',
            items: [
              { title: 'Descubrimiento e Investigación', description: 'Estudiamos tu negocio, competidores, audiencia y objetivos para definir la dirección estratégica de tu marca.' },
              { title: 'Desarrollo de Conceptos', description: 'Creamos múltiples conceptos y direcciones visuales, refinando con tu feedback hasta dar con la identidad perfecta.' },
              { title: 'Diseño del Sistema', description: 'Construimos el sistema visual completo — variaciones de logo, colores, tipografía, patrones y todos los elementos de soporte.' },
              { title: 'Manual y Entrega', description: 'Compilamos todo en un manual de marca profesional (PDF) con guías claras que tu equipo puede seguir.' },
            ],
          },
          includes: {
            title: 'Qué Incluye',
            items: [
              'Sesión de estrategia de marca',
              'Diseño de logo con múltiples variaciones',
              'Definición de paleta de colores',
              'Selección de tipografía y jerarquía',
              'Guías de uso y restricciones',
              'Archivos listos para digital e impresión',
              'Manual de identidad de marca (PDF)',
              'Mockups de aplicación de marca (señalización, empaque, merch)',
            ],
          },
          whoFor: {
            title: 'Para Quién Es Esto',
            intro: 'Esto es ideal para negocios que:',
            items: [
              'Están lanzando una nueva marca o producto',
              'Necesitan profesionalizar su identidad visual existente',
              'Quieren consistencia en todos sus materiales de marketing',
              'Están escalando y necesitan guías de marca para su equipo',
            ],
          },
          cta: {
            title: 'Construyamos Tu Marca',
            description: 'Agenda una consulta para discutir tu visión de marca y cómo podemos darle vida.',
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
        phone: 'Número de Teléfono',
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
      amazon: {
        title: 'Servicios para Vendedores de Amazon',
        description: 'Gestión completa de cuentas de Amazon. Desde publicidad hasta optimización de ventas — te ayudamos a dominar el marketplace.',
        features: ['Gestión de Amazon PPC', 'Optimización de listados', 'Estrategia de ventas y precios', 'Reportes de rendimiento'],
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
      customApps: {
        title: 'Aplicaciones Empresariales',
        description: 'Aplicaciones web a medida construidas para las necesidades específicas de tu negocio. Desde control de inventario hasta sistemas de gestión de producción.',
        features: ['Aplicaciones web a medida', 'Automatización de procesos', 'Dashboards en tiempo real', 'Integraciones de sistemas'],
      },
      brandIdentity: {
        title: 'Diseño de Manual de Imagen de Marca',
        description: 'Sistemas profesionales de identidad de marca que aseguran consistencia visual y reconocimiento en cada punto de contacto de tu negocio.',
        features: ['Diseño de logo y variaciones', 'Paleta de colores y tipografía', 'Guías de uso', 'Archivos digitales e impresos'],
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
