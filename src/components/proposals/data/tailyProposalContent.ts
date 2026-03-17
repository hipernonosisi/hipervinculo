export const tailyProposalContent = {
  cover: {
    title: 'Service Proposal',
    subtitle: 'Amazon Advertising\nManagement for Taily',
    tagline: 'Attn: Ariel Isaac',
  },
  about: {
    title: 'About Hipervínculo',
    headline: 'Results-Driven Growth Systems',
    description:
      'Hipervínculo is a performance-driven digital marketing agency specializing in eCommerce growth, paid media management, and Amazon Seller services. With 20+ years of experience, we help ambitious brands scale profitably through data-driven strategies, conversion-focused infrastructure, and full-funnel optimization.',
    stats: [
      { value: '20+', label: 'Years of Experience' },
      { value: '200+', label: 'Projects Delivered' },
      { value: '95%', label: 'Client Retention Rate' },
    ],
    credentials: [
      'Amazon Ads Certified',
      'Google Ads Certified Partner',
      'Helium 10 Partner',
      'Sellerise Partner',
    ],
  },
  objective: {
    title: 'Objective',
    headline: 'Maximize Advertising ROI on Amazon.com',
    description:
      'Our goal is to take full ownership of Taily\'s Amazon advertising strategy, optimizing Sponsored Products, Sponsored Brands, and Sponsored Video campaigns to drive profitable growth. As an established brand with mature listings, the focus is entirely on advertising performance — maximizing return on ad spend while maintaining healthy profitability.',
    scope: [
      {
        title: 'Sponsored Products Campaigns',
        description: 'Strategic creation and ongoing optimization of keyword-targeted and product-targeted campaigns designed to capture high-intent shoppers and drive profitable sales.',
      },
      {
        title: 'Sponsored Brands Campaigns',
        description: 'Brand-level campaigns with custom headlines and creatives to increase brand awareness and drive traffic to your Store and product pages.',
      },
      {
        title: 'Sponsored Brands Video',
        description: 'Video ad campaigns deployed across search results and product pages to maximize engagement, click-through rates, and brand recall.',
      },
      {
        title: 'Bid Optimization & Budget Management',
        description: 'Daily monitoring and adjustment of bids, budgets, and placements to maximize ROAS while keeping TACOS within the 10–20% target range.',
      },
      {
        title: 'Keyword Research & Harvesting',
        description: 'Ongoing keyword discovery, search term analysis, and negative keyword management to refine targeting and reduce wasted spend.',
      },
      {
        title: 'Weekly Performance Reports',
        description: 'Detailed weekly reports covering sales metrics, advertising spend, TACOS, ACOS, and strategic recommendations.',
      },
    ],
    exclusions: {
      title: 'Out of Scope',
      description: 'This engagement covers Amazon Advertising management only. Hipervínculo will NOT be responsible for listing creation or optimization, product photography, A+ Content, Store design, case management, logistics, fulfillment (FBA/FBM preparation), product sourcing, inventory purchasing, or any administrative or accounting functions. These responsibilities remain entirely with the client.',
    },
  },
  advertisingService: {
    title: 'Amazon Advertising Management',
    headline: 'Sponsored Campaigns Optimized for Profit',
    description:
      'We will create, manage, and continuously optimize your Amazon advertising campaigns with a profit-first approach. Our strategy focuses on maintaining healthy TACOS levels (10–20%) while aggressively growing market share and organic rankings, targeting a net profit margin of 15–25%.',
    includes: [
      {
        title: 'Sponsored Products Campaigns',
        description: 'Keyword-targeted and product-targeted campaigns designed to capture high-intent shoppers and drive profitable sales.',
      },
      {
        title: 'Sponsored Brands Campaigns',
        description: 'Brand-level campaigns with custom headlines and creatives to increase brand awareness and drive traffic to your Store.',
      },
      {
        title: 'Sponsored Brands Video',
        description: 'Video campaigns deployed to maximize engagement and click-through rates in search results and product detail pages.',
      },
      {
        title: 'Sponsored Display Campaigns',
        description: 'Retargeting and audience-based display campaigns to re-engage shoppers and expand reach beyond search results.',
      },
      {
        title: 'Bid Optimization & Budget Management',
        description: 'Daily monitoring and adjustment of bids, budgets, and placements to maximize ROAS while keeping TACOS within the 10–20% target range.',
      },
      {
        title: 'Keyword Research & Harvesting',
        description: 'Ongoing keyword discovery, search term analysis, and negative keyword management to refine targeting and reduce wasted spend.',
      },
      {
        title: 'Weekly Performance Reports',
        description: 'Detailed weekly reports covering sales metrics, advertising spend, TACOS, ACOS, and strategic recommendations.',
      },
    ],
  },
  financialTracking: {
    title: 'Financial Tracking',
    headline: 'Complete Transparency & Commission Basis',
    description:
      'We recommend Sellerise for real-time financial tracking, profit analysis, and commission calculation. However, we are flexible — if Taily has an existing financial tracking tool, we can adapt to it as long as we are granted full access. The agreed-upon financial tracking platform will serve as the single source of truth for calculating our performance commission.',
    features: [
      {
        title: 'Preferred: Sellerise',
        description: 'Real-time P&L tracking including Amazon fees, ad spend, COGS, returns, and net profit per product and overall. If adopted, the subscription ($100/mo) is paid directly by the client.',
      },
      {
        title: 'Alternative: Your Existing Tool',
        description: 'If Taily already uses a financial tracking platform, we can work with it as long as we have full access to the data needed for commission calculations.',
      },
      {
        title: 'Commission Tracking',
        description: 'Transparent tracking of net profitability from which our 5% performance commission will be calculated. The agreed-upon platform figure is the definitive source used for invoicing.',
      },
      {
        title: 'Cost Structure Verification',
        description: 'We will verify that all product costs, shipping costs, and operational expenses are correctly configured to ensure accurate profit calculations.',
      },
    ],
  },
  investment: {
    title: 'Investment Summary',
    headline: 'Performance-Based Advertising Management',
    ongoing: {
      title: 'Ongoing Services',
      commission: {
        label: 'Performance Commission',
        rate: '5%',
        basis: 'of Net Profit',
        description: 'Calculated on net profitability as reported by the agreed-upon financial tracking platform (Sellerise or client\'s existing tool), after deducting all costs: Amazon fees, returns, advertising spend, and product costs (COGS). The platform figure is the definitive and binding source for all commission calculations. If there is no net profit in a given month, no commission is charged.',
      },
      financialTool: {
        label: 'Financial Tracking Tool',
        price: 'TBD',
        detail: 'Sellerise ($100/mo) or client\'s existing tool',
      },
    },
    example: {
      title: 'Commission Example',
      subtitle: 'How it works — based on financial tracking data',
      rows: [
        { label: 'Gross Revenue (Amazon Sales)', value: '$1,000,000', type: 'revenue' as const },
        { label: 'Amazon Fees (Referral + FBA)', value: '−$250,000', type: 'deduction' as const },
        { label: 'Advertising Spend', value: '−$100,000', type: 'deduction' as const },
        { label: 'Returns & Refunds', value: '−$50,000', type: 'deduction' as const },
        { label: 'Product Cost (COGS)', value: '−$400,000', type: 'deduction' as const },
      ],
      netProfit: { label: 'Net Profit', value: '$200,000' },
      commission: { label: 'Hipervínculo Commission (5%)', value: '$10,000' },
      note: 'All figures are sourced directly from the agreed-upon financial tracking platform. The net profit number is the definitive figure used to calculate our 5% commission each month.',
      tacos: { label: 'TACOS in this example', value: '10%', target: 'Target: 10–20%' },
      profitMargin: { label: 'Net Profit Margin', value: '20%', target: 'Target: 15–25%' },
    },
  },
  terms: {
    title: 'Terms & Conditions',
    headline: 'What You Need to Know',
    sections: [
      {
        title: 'Agreement Duration',
        description: 'This agreement has a minimum duration of 3 months from the start date. After the initial 3-month period, the agreement automatically renews on a monthly basis unless either party provides 30 days written notice.',
        icon: 'calendar',
      },
      {
        title: 'Payment Terms — Commission',
        description: 'The 5% net profit commission is invoiced monthly based on the agreed-upon financial tracking platform data and is payable within 10 days of invoice receipt. Commissions are due only after Amazon disbursement.',
        icon: 'dollar',
      },
      {
        title: 'Advertising Budget',
        description: 'The advertising budget is paid directly by the client through Amazon Advertising. We will recommend budget levels based on competitive analysis and will optimize spend allocation continuously.',
        icon: 'dollar',
      },
      {
        title: 'Exclusions',
        description: 'This proposal covers Amazon Advertising management only. It does not include listing optimization, photography, A+ Content, Store design, case management, logistics, fulfillment, product sourcing, inventory purchasing, or any administrative functions.',
        icon: 'files',
      },
      {
        title: 'Campaign Ownership',
        description: 'If either party terminates the agreement, all advertising campaigns created by the agency will be deleted from the account as they are the intellectual property of Hipervínculo LLC.',
        icon: 'clock',
      },
      {
        title: 'Monthly Meetings',
        description: 'Up to 2 online meetings per month for performance review, strategy discussion, and reporting. Meetings are conducted via Zoom or Google Meet.',
        icon: 'calendar',
      },
    ],
  },
  legalTerms: {
    title: 'Agreement Details',
    sections: [
      {
        heading: 'Payment Method & Services',
        items: [
          'The 5% net profit commission is invoiced monthly. "Net profit" is defined as total Amazon revenue minus returns, Amazon fees, advertising spend, and product costs (COGS), as tracked and reported by the agreed-upon financial tracking platform.',
          'The agreed-upon financial tracking platform figure is the definitive and binding source for all commission calculations.',
          'If net profit is zero or negative in any given month, no commission is charged for that period.',
          'All advertising budgets are paid directly by the client through Amazon Advertising.',
          'Tax payments and other accounting matters are the responsibility of the client.',
          'Commission payments are due within 10 days of invoice receipt and are only due after Amazon has disbursed payment.',
        ],
      },
      {
        heading: 'Scope Exclusions',
        items: [
          'This engagement covers Amazon Advertising management only (Sponsored Products, Sponsored Brands, Sponsored Video, and Sponsored Display).',
          'Hipervínculo LLC is not responsible for listing creation or optimization, product photography, A+ Content, Amazon Store design, case management, logistics, fulfillment, product sourcing, inventory purchasing, or any administrative, accounting, or tax-related functions.',
        ],
      },
      {
        heading: 'Agency Independence',
        items: [
          'The agency will act at all times during the term of this agreement as an independent contractor.',
          'Nothing contained in this agreement shall be construed to create the relationship of principal and agent, or employer and employee, between client and agency.',
        ],
      },
      {
        heading: 'Agency Duties',
        items: [
          'The duties of the agency are those set out in this proposal. Once accepted by the client, the described services will dictate the scope of the service agreement. Additional services will only be established with mutual agreement and may require fee adjustments.',
        ],
      },
      {
        heading: 'Confidentiality',
        items: [
          'Both parties agree to maintain confidentiality of any proprietary information, business strategies, campaign data, financial data, and trade secrets shared during the course of this engagement.',
          'This obligation survives the termination of this agreement.',
        ],
      },
      {
        heading: 'Contract Termination',
        items: [
          'The minimum agreement duration is 3 months from the start date.',
          'After 3 months, the agreement automatically renews on a monthly basis. Either party may terminate with 30 days written notice.',
          'In case of early termination by the client, Hipervínculo LLC is not obligated to refund any previously received amounts.',
          'Upon termination, all advertising campaigns created by the agency shall be deleted as they remain the intellectual property of Hipervínculo LLC.',
          'All due payments up to the termination date must be settled within 10 days.',
        ],
      },
    ],
  },
  contact: {
    title: "Let's Grow Together",
    headline: 'Ready to Scale Your Amazon Advertising?',
    description:
      'Contact us to begin optimizing Taily\'s advertising strategy. We are here to help you maximize profitability on the world\'s largest marketplace.',
    email: 'info@hipervinculo.net',
    phone: '+1 (786) 529-0679',
    address: '2645 Executive Park Dr, Suite 146\nWeston, FL 33331',
    website: 'hipervinculo.net',
    cta: 'Get Started',
  },
};
