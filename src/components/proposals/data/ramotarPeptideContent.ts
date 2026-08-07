export const ramotarPeptideContent = {
  cover: {
    title: 'Platform Proposal — Phase 1',
    subtitle: 'Ramotar Peptide Marketplace\nPhase 1: Launch-Ready Platform',
    tagline: 'For: Lloyd Ramotar — Founder',
  },
  about: {
    title: 'About Hipervínculo',
    headline: 'E-Commerce Platforms Built for Regulated, High-Trust Categories',
    description:
      'Hipervínculo is a digital growth agency with 20+ years of experience designing and building conversion-focused digital platforms. We specialize in complex, regulated e-commerce: subscription billing, private customer portals, document-heavy compliance content, product photography, and the analytics infrastructure needed to scale paid acquisition once the store is live.',
    stats: [
      { value: '20+', label: 'Years of Experience' },
      { value: '200+', label: 'Projects Delivered' },
      { value: '$92M+', label: 'Revenue Influenced' },
    ],
    credentials: [
      'E-Commerce & Subscriptions',
      'Private Customer Portals',
      'Product Photography & Graphics',
      'Analytics & Conversion Tracking',
    ],
  },
  clientOverview: {
    title: 'The Client',
    headline: 'Ramotar Peptide Marketplace',
    description:
      'Ramotar Peptide Marketplace is a new direct-to-consumer online store for research peptides and related products, positioned in the same category as established operators such as Alpha Labs. The category is high-trust and highly scrutinized: buyers expect batch-level transparency, lab documentation, clear research-only language, and a checkout experience that is professional and compliant. Phase 1 of this engagement delivers a fully operational, launch-ready storefront with the legal disclaimers, age verification, and documentation architecture required to operate as a research-use marketplace — without any telemedicine or prescription component.',
    services: [
      { title: 'Direct-to-Consumer Storefront', description: 'Catalog of peptides and related products sold online with dosage/strength variants and per-product documentation.' },
      { title: 'Subscription & Repeat Purchase', description: 'Recurring-order model designed to maximize customer lifetime value from the first month of operation.' },
      { title: 'Documentation-Led Trust', description: 'Certificates of analysis, purity data, storage and handling guidance, and clear compliance messaging on every product.' },
    ],
    marketNote:
      'Primary market: United States research and wellness buyers who compare vendors on purity documentation, transparency, and delivery reliability before purchasing.',
  },
  objective: {
    title: 'Objective — Phase 1',
    headline: 'Get the Business Fully Operational and Selling',
    description:
      'Phase 1 has one purpose: take Ramotar Peptide Marketplace from zero to a live, operational, revenue-generating platform. That means a complete storefront, working payments and subscriptions, a private customer portal, all required legal and compliance documentation published, product photography and graphics produced, and full analytics in place — nothing pending, nothing half-built. An optional Telehealth & Prescriber Module (medical intake, clinician review and approval-gated fulfillment) is available as a priced add-on and can be built alongside Phase 1. Other advanced features (affiliate/wholesale portals, mobile apps, marketplace for third-party sellers) are deliberately reserved for later phases so launch is not delayed.',
    scope: [
      {
        title: 'Custom Storefront Design & Build',
        description: 'A premium, clinical-grade design system and a fully responsive storefront: homepage, category pages, product detail pages, cart, and checkout.',
      },
      {
        title: 'Product Catalog & Variants',
        description: 'Up to 40 products loaded with strengths/sizes, pricing, stock status, batch information, and downloadable lab documentation.',
      },
      {
        title: 'Payments & Subscriptions',
        description: 'High-risk-ready payment processing with one-time purchases, recurring subscriptions, saved payment methods, coupons, and automated receipts.',
      },
      {
        title: 'Private Customer Portal',
        description: 'Account creation and login, order history, tracking, invoices, subscription self-management (pause, skip, cancel), addresses, and reorder in one click.',
      },
      {
        title: 'Compliance & Documentation Layer',
        description: 'Full legal and regulatory documentation set published across the site, plus per-product certificates of analysis and intended-use disclaimers.',
      },
      {
        title: 'Product Photography & Graphics',
        description: 'Studio-style product imagery, packaging renders, comparison graphics, and educational visuals for product pages and marketing.',
      },
      {
        title: 'Admin & Operations Dashboard',
        description: 'Order management, fulfillment status, shipping labels/tracking entry, customer records, inventory levels, and subscription oversight.',
      },
      {
        title: 'Analytics & Conversion Tracking',
        description: 'GA4, server-side conversion tracking, e-commerce events, and dashboards so paid acquisition can be turned on with confidence from day one.',
      },
    ],
    exclusions: {
      title: 'Reserved for Later Phases (Out of Phase 1 Scope)',
      description:
        'Phase 1 does not include: third-party seller marketplace functionality, affiliate or wholesale/B2B portals, native mobile applications, custom ERP/3PL integrations beyond standard shipping tools, ongoing paid media management, ongoing SEO content retainers, and legal counsel itself. The Telehealth & Prescriber Module is available as an optional add-on (priced separately in the Investment Summary) and can be built alongside Phase 1 or added after launch. Regulatory filings, licenses, and entity/legal review are prepared with the client and their attorney — Hipervínculo builds and publishes the documentation and compliance architecture, it does not act as legal counsel.',
    },
  },

  telehealthModule: {
    title: 'Telehealth & Prescriber Module',
    headline: 'Optional Add-On: Intake, Prescriber Review & Compliant Fulfillment',
    price: '$14,500',
    priceLabel: 'One-time add-on — built alongside Phase 1',
    monthly: '+$450/mo',
    monthlyLabel: 'Compliance & Module Maintenance (while active)',
    description:
      'This module converts the storefront into a prescription-ready experience: the customer completes a medical intake questionnaire at checkout, the submission is routed to a licensed prescriber or partner telehealth group for review, and the order is only released for fulfillment once it is approved. It removes the legal ambiguity of selling regulated compounds direct-to-consumer and unlocks higher-ticket products and recurring refills. Adds 4-5 weeks to the timeline and can also be added after launch at the same price.',
    includes: [
      {
        title: 'Medical Intake Questionnaire',
        description: 'Dynamic, conditional-logic health questionnaire captured at checkout with consent capture, ID/age verification, and timestamped audit trail.',
      },
      {
        title: 'Prescriber Review Queue',
        description: 'Private clinician dashboard to review, approve, deny, or request more information on each intake, with notes and full case history.',
      },
      {
        title: 'Approval-Gated Fulfillment',
        description: 'Orders are held in an unfulfilled state and only released to shipping once a prescriber approves — payment capture rules configured accordingly.',
      },
      {
        title: 'Prescription Refills & Subscriptions',
        description: 'Refill limits, expiration windows, and re-intake triggers wired into the subscription engine so recurring orders stay compliant.',
      },
      {
        title: 'Secure Records & Messaging',
        description: 'Encrypted storage of intake records, HIPAA-aligned access controls and logging, and secure patient-to-prescriber messaging inside the portal.',
      },
      {
        title: 'Telehealth Partner Integration',
        description: 'Integration with the client\'s chosen prescriber network or telehealth platform via API or a managed hand-off workflow, plus prescriber onboarding and training.',
      },
    ],
    note:
      'Requires the client to contract a licensed prescriber or telehealth group and any state licensing required. Hipervínculo builds the technology and compliance workflow; clinical services and medical liability remain with the client and its providers.',
  },


  platformAccess: {
    title: 'Required Access & Inputs',
    headline: 'What We Need From You to Build Phase 1',
    description:
      'To deliver a launch-ready platform we need the following accounts, assets, and information. All accounts and data remain owned by the client at all times. Hipervínculo provides the platform hosting infrastructure and only requires DNS access to point the domain to our servers.',
    platforms: [
      {
        title: 'Domain & DNS Registrar',
        description: 'Admin access to the domain registrar or DNS zone so we can point the A record to our hosting infrastructure and configure the store subdomains.',
        role: 'Admin Access',
      },
      {
        title: 'Business Entity & Banking Details',
        description: 'Entity documents, EIN, and banking information required to open and verify the payment processing and subscription billing accounts.',
        role: 'Owner Provided',
      },
      {
        title: 'Product Data & Lab Documentation',
        description: 'Product list, strengths, pricing, supplier data, batch numbers, and certificates of analysis for every SKU to be published.',
        role: 'Shared Files',
      },
      {
        title: 'Physical Product Samples',
        description: 'Product and packaging samples shipped to our team for the photography and graphics production included in Phase 1.',
        role: 'Physical Shipment',
      },
      {
        title: 'Brand Assets',
        description: 'Logo files, brand colors, and typography if they exist. If not, a Phase 1 brand foundation is created as part of the design system.',
        role: 'Shared Files',
      },
      {
        title: 'Legal & Compliance Review',
        description: 'Contact for the client\'s attorney or compliance advisor to review and approve disclaimers, terms, and intended-use language before publication.',
        role: 'Client Counsel',
      },
    ],
  },
  websiteService: {
    title: 'Phase 1 Build',
    headline: 'Everything Included to Go Live and Operate',
    description:
      'Phase 1 delivers a complete, operational commerce platform. Every item below is built, tested, and handed over working — the business can take its first order the day we launch.',
    includes: [
      {
        title: 'Design System & Storefront',
        description: 'Premium clinical-grade visual identity plus homepage, category, and content pages, fully responsive across all devices.',
      },
      {
        title: 'Product Pages (up to 40 SKUs)',
        description: 'Variants, strengths, pricing, stock status, batch data, COA downloads, FAQs, and intended-use disclaimers per product.',
      },
      {
        title: 'Checkout & Payments',
        description: 'Secure checkout with card payments, address validation, tax and shipping rules, coupon codes, and automated order confirmations.',
      },
      {
        title: 'Subscription Engine',
        description: 'Recurring plans with intervals, discounts, dunning on failed payments, and full customer self-service management.',
      },
      {
        title: 'Private Customer Portal',
        description: 'Login, order history, tracking, invoices, saved addresses and cards, one-click reorder, and subscription controls.',
      },
      {
        title: 'Compliance Documentation Set',
        description: 'Terms of Service, Privacy Policy, Shipping & Returns, Refund Policy, intended-use and research-only disclaimers, age gate, cookie consent, and accessibility statement.',
      },
      {
        title: 'Photography & Graphics',
        description: 'Studio product photography, packaging renders, purity/comparison graphics, and educational visuals produced for the launch catalog.',
      },
      {
        title: 'Admin Dashboard & Training',
        description: 'Order, customer, inventory, and subscription management plus two live training sessions and written documentation for your team.',
      },
      {
        title: 'Analytics & Tracking',
        description: 'GA4, e-commerce event tracking, server-side conversion tracking, and a KPI dashboard for revenue, AOV, and subscription retention.',
      },
      {
        title: 'SEO & Performance Foundation',
        description: 'Technical SEO, structured product data, sitemap, fast Core Web Vitals, and indexation setup for organic visibility.',
      },
      {
        title: 'QA, Security & Launch',
        description: 'Full cross-device QA, test transactions, SSL, security hardening, backups, and a supervised go-live.',
      },
      {
        title: '60-Day Post-Launch Support',
        description: 'Bug fixes, adjustments, and operational support for 60 days after launch so the business stabilizes without surprises.',
      },
    ],
  },
  googleAdsService: {
    title: 'Platform Care & Operations',
    headline: 'Keeping the Platform Live, Secure, and Selling After Launch',
    retainer: '$2,500/mo',
    retainerLabel: 'Monthly Platform Care (Optional, Month-to-Month)',
    mediaSpend: 'Included',
    mediaSpendLabel: 'Hosting & Infrastructure While Active',
    description:
      'After launch, the platform needs to stay online, secure, compliant, and improving. Platform Care is an optional month-to-month service that starts after the 60-day post-launch support period ends. It covers hosting, monitoring, maintenance, content and product updates, and continuous conversion improvements. It does not include paid media management, which is quoted separately when you are ready to scale acquisition.',
    includes: [
      {
        title: 'Hosting & Infrastructure',
        description: 'Managed hosting, SSL, CDN, daily backups, and uptime monitoring included at no extra cost while the service is active.',
      },
      {
        title: 'Security & Updates',
        description: 'Dependency updates, patching, vulnerability monitoring, and payment/compliance-related maintenance.',
      },
      {
        title: 'Product & Content Updates',
        description: 'New SKUs, price changes, batch and COA updates, banners, and landing pages added on request.',
      },
      {
        title: 'Subscription & Order Support',
        description: 'Technical support for billing edge cases, failed payments, refunds, and fulfillment workflow issues.',
      },
      {
        title: 'Conversion Optimization',
        description: 'Ongoing A/B tests on product pages, cart, and checkout to increase conversion rate and average order value.',
      },
      {
        title: 'Monthly Performance Report',
        description: 'Revenue, conversion rate, AOV, subscription retention, and prioritized recommendations for the next month.',
      },
    ],
  },
  investment: {
    title: 'Investment Summary',
    headline: 'Phase 1 Build + Telehealth Add-On + Optional Platform Care',
    websiteBuild: {
      label: 'Phase 1 Platform Build',
      rate: '$49,500',
      basis: 'One-time project fee — milestone based',
      description:
        'Complete launch-ready platform: design system, storefront, up to 40 product pages, payments, subscriptions, private customer portal, admin dashboard, full compliance documentation set, product photography and graphics, analytics, QA, launch, team training, and 60 days of post-launch support.',
    },
    telehealthAddOn: {
      label: 'Telehealth & Prescriber Module',
      rate: '$14,500',
      basis: 'Optional add-on — one-time, adds 4-5 weeks',
      description:
        'Medical intake at checkout, prescriber review dashboard, approval-gated fulfillment, compliant refills, encrypted records and secure messaging, and integration with your prescriber network. Maintenance +$450/mo while active.',
    },
    monthlyManagement: {
      label: 'Platform Care & Operations',
      rate: '$2,500/mo',
      basis: 'Optional — starts after the 60-day support period, month-to-month',
      description:
        'Managed hosting and infrastructure, security and updates, product and content changes, subscription/order technical support, conversion optimization, and a monthly performance report. Cancel any time with 30 days written notice.',
    },
    clientPays: {
      title: 'Paid Directly by Client',
      items: [
        { name: 'Payment Processing Fees', detail: 'Charged by the processor per transaction (high-risk rates apply)' },
        { name: 'Prescriber / Telehealth Network', detail: 'Clinician fees and telehealth platform licensing if the Telehealth Module is activated' },
        { name: 'Domain Registration / Renewal', detail: 'Client owns and renews the domain' },
        { name: 'Third-Party Subscriptions', detail: 'Shipping, tax, email, or review tools if selected (typically $150-$400/mo)' },
        { name: 'Legal & Regulatory Counsel', detail: 'Attorney review, licenses, and filings' },
        { name: 'Hosting After Cancellation', detail: 'Free while Platform Care is active; $3,600/year if not under an active plan' },
        { name: 'Paid Media Spend', detail: 'Optional — quoted separately when acquisition begins' },
      ],
    },
    paymentTerms: {
      title: 'Payment Terms — Milestones',
      subtitle: 'Phase 1 total: $49,500 USD — with Telehealth Module: $64,000 USD',
      rows: [
        { label: 'Milestone 1 — Kickoff, discovery & design system', value: '$17,500' },
        { label: 'Milestone 2 — Storefront, catalog & payments built', value: '$16,000' },
        { label: 'Milestone 3 — Portal, compliance, photography & launch', value: '$16,000' },
        { label: 'Telehealth & Prescriber Module (optional add-on)', value: '$14,500' },
        { label: 'Platform Care (optional, after launch)', value: '$2,500/mo' },
      ],
      note: 'Milestone 1 is due at kickoff before work begins. Milestones 2 and 3 are invoiced upon completion of each stage and payable within 10 days of receipt. The Telehealth Module is billed 50% at approval and 50% at module go-live, and adds $450/mo maintenance while active. Platform Care is billed monthly in advance starting after the 60-day post-launch support period.',
    },

    timeline: {
      title: 'Phase 1 Timeline to Launch',
      duration: '12-14',
      durationUnit: 'Weeks',
      description:
        'Weeks 1-3: discovery, compliance mapping, brand and design system. Weeks 4-7: storefront, catalog, payments and subscriptions. Weeks 8-10: customer portal, admin dashboard, photography and graphics. Weeks 11-12: compliance documentation, analytics, QA and launch. Weeks 13-14 buffer for approvals, processor verification, and stabilization.',
    },
  },

  terms: {
    title: 'Terms & Conditions',
    headline: 'What You Need to Know',
    sections: [
      {
        title: 'Phase 1 Scope',
        description:
          'This proposal covers Phase 1 only, as described in the Phase 1 Build section, plus the optional Telehealth & Prescriber Module ($14,500 one-time + $450/mo). Third-party seller marketplace, affiliate/wholesale portals, mobile apps, and custom ERP/3PL integrations are reserved for later phases and quoted separately.',
        icon: 'files',
      },
      {
        title: 'Payment Terms',
        description:
          'Phase 1 is $49,500 USD, invoiced across three milestones ($17,500 / $16,000 / $16,000). Milestone 1 is due at kickoff. All invoices are payable within 10 days of receipt.',
        icon: 'dollar',
      },
      {
        title: 'Telehealth Module (Optional)',
        description:
          'The Telehealth & Prescriber Module is $14,500 one-time (50% at approval, 50% at module go-live) plus $450/mo maintenance while active, and adds 4-5 weeks to the timeline. It requires the client to contract a licensed prescriber or telehealth group; clinical services and medical liability remain with the client and its providers.',
        icon: 'shield',
      },
      {
        title: 'Compliance & Legal Responsibility',
        description:
          'Hipervínculo builds and publishes the compliance architecture and documentation set. The client and its legal counsel are responsible for approving all claims, disclaimers, licensing, and regulatory obligations before launch.',
        icon: 'shield',
      },
      {
        title: 'Payment Processing Approval',
        description:
          'This category is classified as high-risk. Hipervínculo will prepare and support the processor application, but final approval is granted by the payment provider and is outside our control.',
        icon: 'dollar',
      },
      {
        title: 'Hosting Included While Active',
        description:
          'Managed hosting and infrastructure are included at no cost during the build, the 60-day support period, and any month with an active Platform Care plan. Without an active plan, hosting continues at $3,600/year or the client may migrate.',
        icon: 'server',
      },
      {
        title: 'Domain, DNS & Email',
        description:
          'The client retains full ownership of the domain. We require registrar or DNS access to point the A record to our servers. Hipervínculo does not manage email hosting, email accounts, or email deliverability.',
        icon: 'globe',
      },
      {
        title: 'Timeline Depends on Inputs',
        description:
          'The 12-14 week timeline assumes timely delivery of product data, lab documentation, product samples, legal approvals, and feedback. Delays in these inputs shift the launch date accordingly.',
        icon: 'clock',
      },
      {
        title: 'Revisions',
        description:
          'Two rounds of revisions are included per major design deliverable. Additional rounds or scope changes after approval are estimated separately.',
        icon: 'refresh',
      },
      {
        title: 'Platform Care is Optional',
        description:
          'Platform Care starts only if the client chooses it after the 60-day post-launch support period. It is month-to-month and cancellable with 30 days written notice.',
        icon: 'calendar',
      },
      {
        title: 'Ownership',
        description:
          'Upon full payment of Phase 1, the platform, its source code, the produced photography and graphics, and all customer data become the property of the client.',
        icon: 'shield',
      },
    ],

  },
  legalTerms: {
    title: 'Agreement Details',
    sections: [
      {
        heading: 'Payment Method & Fees',
        items: [
          'Phase 1 Platform Build: $49,500 USD total, invoiced in three milestones — $17,500 at kickoff, $16,000 upon completion of the storefront/catalog/payments stage, and $16,000 upon completion of the portal/compliance/photography stage prior to launch.',
          'Telehealth & Prescriber Module (optional): $14,500 USD one-time, invoiced 50% upon approval of the add-on and 50% upon module go-live, plus $450 USD per month for compliance and module maintenance while the module is active. Clinician fees, telehealth platform licensing, and state licensing are paid directly by the client.',
          'Platform Care & Operations (optional): $2,500 USD per month, billed in advance, beginning after the 60-day post-launch support period, month-to-month with no long-term contract.',
          'All invoices are payable within 10 days of receipt. Work may be paused on overdue accounts.',
          'Payment processing fees, third-party tool subscriptions, domain fees, legal counsel, and any paid media spend are paid directly by the client.',
          'Hosting and infrastructure are included while Platform Care is active. Without an active plan, hosting continues at $3,600/year unless the client migrates to another provider.',
        ],
      },
      {
        heading: 'Scope of Work — Phase 1',
        items: [
          'Phase 1 includes all deliverables listed in the Phase 1 Build section: design system, storefront, up to 40 product pages, payments, subscriptions, private customer portal, admin dashboard, compliance documentation set, product photography and graphics, analytics, SEO foundation, QA, launch, training, and 60 days of post-launch support.',
          'Additional SKUs beyond 40, additional languages, third-party seller marketplace features, affiliate or wholesale portals, native mobile apps, and custom ERP/3PL integrations are outside Phase 1 and quoted separately.',
          'The client is responsible for providing product data, pricing, certificates of analysis, product samples, brand assets, and account access in a timely manner.',
        ],
      },
      {
        heading: 'Regulatory & Compliance',
        items: [
          'Hipervínculo LLC is a technology and marketing provider, not a law firm, and does not provide legal, medical, or regulatory advice.',
          'The client is solely responsible for obtaining and maintaining all licenses, registrations, and permits required to sell its products, and for the accuracy of all product, purity, and intended-use claims.',
          'All disclaimers, policies, and product claims must be reviewed and approved in writing by the client or its counsel before publication.',
          'Hipervínculo may decline to publish content it believes creates material legal or platform-policy risk.',
        ],
      },
      {
        heading: 'Payments, Subscriptions & Data',
        items: [
          'Payment processing accounts are opened in the name of the client, who is the merchant of record for all transactions.',
          'Processor approval for this product category is at the sole discretion of the payment provider; Hipervínculo does not guarantee approval or specific processing rates.',
          'Customer and order data belong to the client. Hipervínculo will implement industry-standard security practices but is not liable for third-party processor or infrastructure outages or breaches.',
        ],
      },
      {
        heading: 'Timeline, Revisions & Approvals',
        items: [
          'Phase 1 is estimated at 12-14 weeks from kickoff, assuming timely inputs and approvals.',
          'Two rounds of revisions are included per major design deliverable; additional rounds are estimated separately.',
          'Written approval is required at the end of each milestone before the next stage begins.',
        ],
      },
      {
        heading: 'Ownership & Portfolio',
        items: [
          'Upon full payment of Phase 1, the platform, source code, produced photography and graphics, and all customer data become the property of the client.',
          'Hipervínculo LLC retains the right to showcase the project in its portfolio unless otherwise agreed in writing.',
        ],
      },
      {
        heading: 'Termination',
        items: [
          'Either party may terminate the Phase 1 engagement with 15 days written notice. Work completed up to the termination date is invoiced and payable, and completed deliverables are handed over.',
          'Platform Care may be cancelled by either party with 30 days written notice.',
          'Upon termination, Hipervínculo will provide a full export of files, data, and DNS guidance for migration.',
        ],
      },
      {
        heading: 'Limitations & Confidentiality',
        items: [
          'No specific revenue, traffic, conversion, or approval outcome is guaranteed.',
          'Both parties agree to maintain confidentiality of proprietary information, supplier relationships, business strategies, and account credentials shared during the engagement. This obligation survives termination.',
          'Hipervínculo LLC acts as an independent contractor; nothing in this agreement creates an employer-employee or principal-agent relationship.',
        ],
      },
    ],
  },
  contact: {
    title: 'Ready to Build Phase 1?',
    headline: 'From Zero to a Fully Operational Marketplace',
    description:
      'Approve Phase 1 and we start with discovery, compliance mapping, and the design system immediately. In 12-14 weeks Ramotar Peptide Marketplace can be live, taking orders, and selling subscriptions — with everything documented, tracked, and ready to scale.',
    email: 'info@hipervinculo.net',
    phone: '+1 (786) 529-0679',
    address: '2645 Executive Park Dr, Suite 146\nWeston, FL 33331',
    website: 'hipervinculo.net',
    cta: 'Approve Phase 1',
  },
};
