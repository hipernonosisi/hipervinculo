// Industrial Advisors / IA Miami — Google Ads proposal.
// Same content shape and page order as the EZ Brick proposal (agency standard format).

export const iaQuestions = [
  'What monthly budget would you like to invest in Google Ads, separate from management fees?',
  'Which CRM do you use to record and follow up with contacts? If you do not use one, how do you currently manage them?',
  'For your previous Google Ads campaigns, what did you spend and what results did you obtain? Can we review the account and its history?',
  'Who will handle the leads, and how will follow-up be managed?',
];

export const industrialAdvisorsContent = {
  cover: {
    title: 'Google Ads Proposal',
    subtitle: 'Google Search Campaigns\nfor Industrial Real Estate',
    tagline: 'For: Industrial Advisors / IA Miami',
  },
  about: {
    title: 'About Hipervínculo',
    headline: 'Paid Media Measured by Qualified Opportunities, Not Clicks',
    description:
      'Hipervínculo is a performance marketing agency with 20+ years of experience managing paid media for businesses in the U.S. market. We have managed campaigns across Google Ads and Meta Ads, generating more than $92 million in tracked sales for our clients. Our approach is simple: start with the searches that show clear intent, measure the quality of every inquiry, and expand only what proves to work.',
    stats: [
      { value: '20+', label: 'Years of Experience' },
      { value: '200+', label: 'Clients Served' },
      { value: '$92M+', label: 'In Sales Generated' },
    ],
    credentials: [
      'Google Search Campaigns',
      'Lead Tracking & CRM Feedback',
      'English & Spanish Campaigns',
      'Transparent Reporting',
    ],
  },
  clientOverview: {
    title: 'The Client',
    headline: 'Industrial Advisors — Industrial Real Estate Advisory in South Florida',
    description:
      'Industrial Advisors / IA Miami advises on and markets industrial real estate in South Florida. Its office is in Miami Lakes, but that location does not define the limits of its market. An industrial facility must support a company’s operations — not simply fit a location on a map — and that technical knowledge is what connects real estate to the business, not just to a property listing.',
    services: [
      { title: 'Industrial Leasing & Sales', description: 'Leasing and sale of industrial properties, and representation of companies seeking facilities.' },
      { title: 'Facility Optimization & Expansion', description: 'Planning for companies that need to optimize, expand or relocate their operations.' },
      { title: 'Specialized Facilities', description: 'Advisory for aviation/MRO (aircraft maintenance, repair and overhaul), manufacturing and cold storage.' },
      { title: 'Technical Requirements', description: 'Assessment of electrical capacity, clear height, loading docks, layout, zoning and growth requirements.' },
    ],
    marketNote:
      'Source: information published on iamiami.com — presented as client context, not as Hipervínculo results. Industrial Advisors has run Google Ads before; we will review those results before drawing conclusions. The recently renewed website will be the destination for all campaigns.',
  },
  objective: {
    title: 'Objective & Strategy',
    headline: 'Qualified Leasing and Purchase Inquiries Through Google Search',
    description:
      'The objective is to generate qualified inquiries from people and companies interested in leasing or buying industrial real estate and related industrial solutions. Visitors are not forced to choose between leasing or buying: campaigns are organized by search intent, with one shared commercial objective. We start focused, measure contact quality, and expand only based on evidence.',
    scope: [
      { title: 'Account & History Audit', description: 'Review of the previous account: historical spend, search terms, ads and conversions, to identify what to keep, improve or test.' },
      { title: 'Demand & Competition Research', description: 'Keyword hypotheses validated with Google’s keyword planning tool and account history before investing.' },
      { title: 'Search Campaigns by Intent', description: 'Leasing, purchase, advisory, specialized facilities and brand — each with its own ads and destinations.' },
      { title: 'English & Spanish Ads', description: 'Consistent messaging in both languages, with suitable destinations within the existing website.' },
      { title: 'Lead Tracking', description: 'Conversions for successfully submitted forms and real calls, identifying the originating campaign.' },
      { title: 'Lead Quality Review', description: 'Ongoing review of inquiry quality with the team that handles the contacts.' },
      { title: 'Clear Reporting', description: 'Monthly reporting on spend, inquiries, qualified inquiries and commercial opportunities.' },
    ],
    exclusions: {
      title: 'Out of Scope',
      description:
        'The entire strategy uses the existing website. This proposal does not include a website redesign, new website, new landing pages, site migration, SEO, social media management, third-party licenses, or complex CRM integrations and custom development (quoted separately if needed). Media spend is paid directly to Google by the client.',
    },
  },
  platformAccess: {
    title: 'Required Platform Access',
    headline: 'Accounts & Information We Need',
    description:
      'All accounts, data and history remain owned and controlled by Industrial Advisors at all times. We require access to review, build, track and optimize correctly from day one.',
    platforms: [
      { title: 'Google Ads Account', description: 'Admin access to the existing account, including the history of previous campaigns.', role: 'Admin Access' },
      { title: 'Google Analytics 4 & Tag Manager', description: 'Access to review or configure tags, analytics and conversion actions.', role: 'Editor Access' },
      { title: 'Website Administrator', description: 'Coordination to verify forms, contact buttons, destinations and tracking tags on the existing website.', role: 'Coordination' },
      { title: 'CRM or Lead Register', description: 'Access to the system where contacts are recorded, or a simple shared register if no CRM is in use.', role: 'Shared Data' },
      { title: 'Inventory & Availability', description: 'Current list of properties and confirmed availability. No property is advertised without confirmation.', role: 'Shared Files' },
      { title: 'Approvals', description: 'Approval of ads, property information and Spanish-language copy before launch.', role: 'Client Approval' },
    ],
  },
  mediaPlan: {
    title: 'Media Plan',
    headline: 'Focused Spend on Searches With Explicit Intent',
    total: 'USD 3,000–5,000',
    totalLabel: 'Recommended Monthly Media Spend (paid to Google)',
    description:
      'We will prioritize Google Search: ads shown when someone searches for an industrial facility or advisory services. We will not launch every campaign automatically — initial spend is focused and expanded based on evidence. The range is preliminary and subject to account history and demand validation.',
    allocation: [
      { channel: 'A · Industrial Leasing', amount: 'Core', share: 'FROM LAUNCH', note: 'warehouse for lease Miami Lakes · industrial space for rent Medley · warehouse for rent Hialeah' },
      { channel: 'B · Industrial Purchases', amount: 'Core', share: 'FROM LAUNCH', note: 'warehouse for sale Miami · industrial property for sale Hialeah · buy warehouse Medley' },
      { channel: 'C · Advisory & Facility Search', amount: 'Core', share: 'FROM LAUNCH', note: 'industrial real estate advisor Miami · industrial tenant representation Miami · warehouse relocation South Florida' },
      { channel: 'D · Specialized Facilities', amount: 'Test', share: 'ON EVIDENCE', note: 'Manufacturing, aviation/MRO and cold storage — only where there is relevant demand and actual capacity to serve it.' },
      { channel: 'E · Brand', amount: 'Limited', share: 'TO ASSESS', note: 'Industrial Advisors / IA Miami — value assessed based on competition and organic performance.' },
    ],
    phases: [
      { phase: 'Month 01', focus: 'Prepare & Launch', detail: 'Audit, research, tracking, configuration and launch, subject to access and approvals.' },
      { phase: 'Month 02', focus: 'Refine & Optimize', detail: 'Refine search queries and optimize based on inquiries and the quality of contacts received.' },
      { phase: 'Month 03', focus: 'Evaluate Next Step', detail: 'Evaluate quality, opportunities and options for increasing spend based on actual evidence.' },
    ],
    note: 'Keywords shown are hypotheses to validate — not search-volume or CPC (cost per click) data. Media spend is billed directly by Google to the client. Hipervínculo never invoices media spend.',
  },
  measurement: {
    title: 'Objectives & Measurement',
    headline: 'Commercial Quality Comes First',
    description:
      'Every inquiry follows the same path: search → ad → existing website → inquiry → qualification → visit or meeting → opportunity → closing. We measure the steps that matter commercially, not only the ones that are easy to count.',
    basis: 'Search campaigns using the existing website as destination. No target CPA (cost per acquisition) is set before reviewing history and tracking.',
    columns: [
      { label: 'Qualified Inquiry', title: 'What makes it qualified', items: ['A need compatible with your services and areas', 'Identifiable space or operational requirements', 'A budget and timeline your team can evaluate', 'A genuine contact able to decide or influence'] },
      { label: 'Primary KPIs', title: 'What we will measure', items: ['Inquiries and qualified inquiries', 'Cost per inquiry and per qualified inquiry', 'Visits or meetings scheduled', 'Opportunities and closings, when data is available'] },
      { label: 'Diagnostics', title: 'Supporting signals', items: ['Impressions and clicks', 'CTR (clicks as a % of impressions)', 'Search terms that triggered ads', 'Phone clicks, as secondary signals'] },
    ],
    assumptions: [
      'Impressions, clicks and CTR help diagnose campaign performance. They do not replace contact quality or guarantee transactions.',
      'Phone clicks are secondary signals and do not automatically count as leads.',
      'Real estate closings may take longer than the initial evaluation period and should continue to be tracked afterward.',
      'We do not guarantee lead volume, cost per lead, Google rankings, sales, profitability or closed transactions. Results also depend on inventory, demand and commercial follow-up.',
    ],
  },
  searchService: {
    title: 'Google Search Management',
    headline: 'Ongoing Management With a Consistent Review Routine',
    mediaSpend: 'USD 1,500/mo',
    mediaSpendLabel: 'Monthly Management Fee',
    target: 'Up to USD 10K',
    targetLabel: 'Monthly Media Spend Covered',
    description:
      'We manage budgets and campaigns through a clear routine, coordinated with the team handling inquiries. During launch, spend, searches, ads, conversions and initial inquiries are reviewed frequently; after that, on a weekly and monthly cadence.',
    includes: [
      { title: 'Search Query Review', description: 'Weekly review of the searches that triggered ads, adding negative keywords to exclude jobs, housing and personal storage.' },
      { title: 'Match Type Control', description: 'Exact and phrase match as a starting point — they control which searches can trigger ads.' },
      { title: 'Location & Language', description: 'Miami Lakes, Hialeah, Medley, Doral, Opa-Locka and other relevant areas, in English and Spanish, subject to validation.' },
      { title: 'Ads Built on Real Needs', description: 'Location, leasing or purchase, verified features and operational requirements. No property advertised without confirmation.' },
      { title: 'Budget & Bidding', description: 'Bidding strategy chosen after reviewing history and tracking. Budget adjustments based on lead quality.' },
      { title: 'Destination Checks', description: 'Each ad points to the most suitable existing page, listing or section, checked for availability.' },
      { title: 'Lead Quality Feedback', description: 'Weekly review of inquiry quality with your team to guide optimization.' },
      { title: 'Monthly Report & Meeting', description: 'Spend and results report, follow-up meeting, budget allocation recommendations and next tests.' },
    ],
  },
  trackingService: {
    title: 'Setup, Tracking & CRM',
    headline: 'Follow the Contact, Not Just the Click',
    mediaSpend: 'USD 1,000',
    mediaSpendLabel: 'Initial Setup · One-Time Payment',
    description:
      'Tracking connects spend with inquiries. Commercial follow-up identifies which contacts were qualified and which opportunities progressed. We assess your system before promising any automatic connection.',
    includes: [
      { title: 'Tag Manager & GA4', description: 'Review or configuration of Google Tag Manager and GA4 where appropriate: website tags and analytics.' },
      { title: 'Form Conversions', description: 'Conversions for successfully submitted forms, with duplicate prevention and the originating campaign identified.' },
      { title: 'Call Tracking', description: 'Actual calls where technically feasible. Phone clicks are tracked as secondary signals only.' },
      { title: 'Enhanced Conversions for Leads', description: 'Where appropriate and when the applicable requirements are met.' },
      { title: 'Quality Signals Back to Google Ads', description: 'CRM stages can be sent back to Google Ads to guide optimization. Without a CRM, we propose a simple shared register — purchasing one is not required.' },
      { title: 'Pre-Launch Website Checks', description: 'Working forms and contact buttons, mobile experience, correct delivery of inquiries and promoted availability. Coordination, not a redesign.' },
    ],
  },
  investment: {
    title: 'Investment',
    headline: 'Hipervínculo Fees and Media Spend Are Separate — All Amounts in USD',
    setup: {
      label: 'Initial Setup',
      rate: 'USD 1,000',
      basis: 'One-time payment, at the start',
      description:
        'Audit of the previous account, research and initial structure; creation or restructuring of campaigns and ads; configuration or review of standard tracking and pre-launch checks.',
    },
    management: {
      label: 'Monthly Management',
      rate: 'USD 1,500/mo',
      basis: 'One Google Ads account · up to USD 10,000/mo in media spend',
      description:
        'The agreed Search campaigns, English and Spanish ads where appropriate, ongoing optimization, search-query and negative-keyword reviews, tracking checks, monthly report and meeting, and coordination on lead quality.',
    },
    totals: {
      title: 'Estimated Monthly Total',
      rows: [
        { label: 'Media spend · paid directly to Google', value: 'USD 3,000–5,000' },
        { label: 'Monthly management · Hipervínculo', value: 'USD 1,500' },
        { label: 'Initial setup · Hipervínculo (first month only)', value: 'USD 1,000' },
        { label: 'First month total', value: 'USD 5,500–7,500' },
        { label: 'Following months total', value: 'USD 4,500–6,500' },
      ],
      note: 'Management covers up to USD 10,000/month in media spend. Any increase in spend or scope will be quoted and agreed before it takes effect. The initial media range is preliminary, subject to account history and demand validation, and does not guarantee results.',
    },
    clientPays: {
      title: 'Paid Directly by Client',
      items: [
        { name: 'Google Ads Media Spend', detail: 'USD 3,000–5,000/mo recommended, billed directly by Google' },
        { name: 'Third-Party Licenses & Tools', detail: 'CRM, call tracking or other software, if required' },
        { name: 'Custom Integrations', detail: 'Complex CRM integrations or development, quoted separately' },
        { name: 'Website Administration', detail: 'Changes performed by your website administrator' },
      ],
    },
    paymentTerms: {
      title: 'Payment Terms',
      subtitle: 'Simple and transparent',
      rows: [
        { label: 'Initial setup', value: 'USD 1,000, paid upfront' },
        { label: 'Monthly management', value: 'USD 1,500/mo, paid upfront' },
        { label: 'Media spend', value: 'Paid directly to Google' },
        { label: 'Media spend covered', value: 'Up to USD 10,000/mo' },
        { label: 'Evaluation period', value: '90 days, recommended' },
      ],
      note: 'Setup and management are invoiced in advance. Google bills advertising directly to the client. The client retains ownership and control of the account, data and history.',
    },
    timeline: {
      title: 'Initial Evaluation Period',
      duration: '90',
      durationUnit: 'Days',
      description:
        'We recommend 90 days as an initial evaluation period to prepare, launch, refine and decide the next step with real evidence. It is not a guarantee of closings or a mandatory contractual commitment.',
    },
  },
  terms: {
    title: 'Terms & Conditions',
    headline: 'What You Need to Know',
    sections: [
      { title: '90-Day Evaluation Period', description: 'A recommended period to gather data and evaluate quality and opportunities. It is not a guarantee of results or a mandatory commitment.', icon: 'calendar' },
      { title: 'Payments in Advance', description: 'The initial setup and monthly management are paid upfront.', icon: 'dollar' },
      { title: 'Media Spend', description: 'Google bills all advertising directly to Industrial Advisors. It is separate from Hipervínculo fees.', icon: 'dollar' },
      { title: 'Management Coverage', description: 'The monthly fee covers one Google Ads account and up to USD 10,000/month in media spend.', icon: 'files' },
      { title: 'Changes in Scope', description: 'Any increase in spend or scope will be quoted and agreed before it takes effect.', icon: 'clock' },
      { title: 'Existing Website', description: 'Campaigns use the existing website. No redesign, new website or landing pages are included.', icon: 'globe' },
      { title: 'Property Availability', description: 'No property is advertised as available without confirmation from Industrial Advisors.', icon: 'shield' },
      { title: 'Account Ownership', description: 'The Google Ads account, analytics properties, data and history remain the property of Industrial Advisors.', icon: 'shield' },
      { title: 'No Guaranteed Results', description: 'We do not guarantee lead volume, cost per lead, rankings, sales or closed transactions.', icon: 'files' },
      { title: 'Budget Changes', description: 'Media budget increases or reductions are made only with written approval from Industrial Advisors.', icon: 'clock' },
    ],
  },
  legalTerms: {
    title: 'Agreement Details',
    sections: [
      {
        heading: 'Fees & Payment',
        items: [
          'Initial setup: USD 1,000, one-time payment, paid upfront at the start.',
          'Monthly management: USD 1,500 per month, paid upfront, covering one Google Ads account and up to USD 10,000/month in media spend.',
          'All media spend is paid directly by Industrial Advisors to Google. Hipervínculo does not invoice or mark up media spend.',
          'Any increase in media spend above USD 10,000/month or in scope will be quoted and agreed in writing before it takes effect.',
        ],
      },
      {
        heading: 'Scope of Services',
        items: [
          'Audit of the previous account, demand research, creation or restructuring of Google Search campaigns and ads in English and Spanish.',
          'Standard tracking setup or review, pre-launch website checks, ongoing optimization, monthly report and meeting, and lead quality coordination.',
          'Not included: website creation or redesign, new landing pages, SEO, social media management, third-party licenses, complex CRM integrations and additional development.',
          'Performance Max, Display and YouTube may be evaluated later; they are not included in the base launch.',
        ],
      },
      {
        heading: 'Client Responsibilities',
        items: [
          'Provide timely access to Google Ads and analytics, and coordination with the website administrator.',
          'Provide current inventory and availability, and approve ads and property information before launch.',
          'Respond to contacts in a timely manner and share feedback on quality and commercial progress.',
        ],
      },
      {
        heading: 'Ownership & Data',
        items: [
          'Industrial Advisors retains ownership and control of the Google Ads account, data and history at all times.',
          'Hipervínculo retains its proprietary frameworks, templates and methodologies.',
        ],
      },
      {
        heading: 'Performance Disclaimer',
        items: [
          'Keyword examples are hypotheses to validate; they are not search-volume or CPC data.',
          'We do not guarantee lead volume, cost per lead, Google rankings, sales, profitability or closed transactions. Results also depend on inventory, demand and commercial follow-up.',
        ],
      },
      {
        heading: 'Confidentiality & Independence',
        items: [
          'Both parties agree to maintain the confidentiality of proprietary information, pricing, campaign data and account credentials shared during this engagement.',
          'Hipervínculo LLC acts at all times as an independent contractor.',
        ],
      },
    ],
  },
  launchQuestions: {
    title: 'Launch Preparation',
    headline: 'Four Answers to Refine the Initial Plan',
    description: 'These answers will help us refine the initial plan and coordinate with your team. Please share them with Hipervínculo to prepare the launch.',
    questions: iaQuestions,
  },
  contact: {
    title: 'Ready to Launch?',
    headline: 'Let’s Connect Industrial Searches With Real Opportunities',
    description:
      'Let’s review the campaign history, confirm media spend, and coordinate access and approvals to prepare the launch — using your existing website, with transparent investment and follow-up on every commercial opportunity.',
    email: 'info@hipervinculo.net',
    phone: '+1 (786) 529-0679',
    address: '2645 Executive Park Dr, Suite 146\nWeston, FL 33331',
    website: 'hipervinculo.net',
    cta: 'Coordinate Launch',
  },
};
