export interface IASection {
  id: string;
  nav: string;
  title: string;
  intro: string;
  blocks?: { title: string; text?: string; bullets?: string[] }[];
  table?: { headers: string[]; rows: string[][] };
  note?: string;
}

export const iaCover = {
  title: 'Google Ads Proposal',
  client: 'Industrial Advisors',
  subtitle: 'Strategy, setup & ongoing management',
  tagline: 'Connect industrial searches with real business opportunities—using your existing website.',
  date: 'October 2026',
  note: 'Media spend is separate and paid directly to Google. The initial range is preliminary, subject to validation, and does not guarantee results.',
};
export const iaPricing = [
  { label: 'Monthly management', amount: 'USD 1,500', detail: 'Per month · one Google Ads account' },
  { label: 'Initial setup', amount: 'USD 1,000', detail: 'One-time payment · at the start' },
  { label: 'Recommended media spend', amount: 'USD 3,000–5,000', detail: 'Per month · paid separately to Google' },
];
export const iaQuestions = [
  'What monthly budget would you like to invest in Google Ads, separate from management fees?',
  'Which CRM do you use to record and follow up with contacts? If you do not use one, how do you currently manage them?',
  'For your previous Google Ads campaigns, what did you spend and what results did you obtain? Can we review the account and its history?',
  'Who will handle the leads, and how will follow-up be managed?',
];
export const iaSections: IASection[] = [
  {
    id: 'contexto', nav: 'Starting point', title: 'Understanding Industrial Advisors',
    intro: 'An industrial facility must support a company’s operations—not simply fit a location on a map.',
    blocks: [
      { title: 'Information published by the company', text: 'Industrial Advisors / IA Miami advises on and markets industrial real estate in South Florida. Its office is in Miami Lakes; this location does not define the limits of its market.', bullets: ['Industrial property leasing and sales; representation of companies seeking facilities.', 'Facility optimization and expansion planning.', 'Advisory services for aviation/MRO (aircraft maintenance, repair and overhaul), manufacturing and cold storage.', 'Assessment of electrical capacity, clear height, loading docks, layout, zoning and growth requirements.'] },
      { title: 'Our strategic interpretation', text: 'We propose connecting property searches with real operational, expansion and relocation needs. Your technical knowledge helps match real estate to the business—not just to a property listing.' },
      { title: 'A starting point we respect', text: 'You have confirmed that you previously ran Google Ads. We will review those results before drawing conclusions. Your recently renewed website will be the destination for the campaigns.' },
    ],
    note: 'Corporate context source: information published on iamiami.com. This is not presented as Hipervínculo’s experience or results.',
  },
  {
    id: 'estrategia', nav: 'Our service', title: 'What we can do for you',
    intro: 'Connect Industrial Advisors with companies already looking for their next industrial facility.',
    blocks: [
      { title: 'Understand before investing', bullets: ['Audit the account and previous campaigns.', 'Review historical spend, search terms, ads and conversions.', 'Identify what to keep, improve or test.', 'Research demand and competition.'] },
      { title: 'Set up, manage and improve', bullets: ['Create or restructure Search campaigns and ads.', 'Set up or review contact tracking.', 'Optimize continuously and review inquiry quality with your team.', 'Report clearly on spend and commercial opportunities.'] },
    ],
    note: 'The entire strategy uses your existing website. We are not proposing a redesign, new website, new landing pages or site migration.',
  },
  {
    id: 'objetivos', nav: 'Objectives & measurement', title: 'Commercial quality comes first',
    intro: 'Our objective is to generate qualified inquiries from people and companies interested in leasing or buying industrial real estate and related industrial solutions.',
    blocks: [
      { title: 'From interest to opportunity', text: 'Search → ad → existing website → inquiry → qualification → visit or meeting → opportunity → closing.' },
      { title: 'What makes an inquiry qualified', bullets: ['A need compatible with your services and service areas.', 'Identifiable space or operational requirements.', 'A budget and timeline your team can evaluate.', 'A genuine contact able to decide or influence the decision.'] },
      { title: 'What we will measure', bullets: ['Inquiries received and qualified inquiries.', 'Cost per inquiry and cost per qualified inquiry.', 'Visits or meetings scheduled and commercial opportunities.', 'Closed transactions and attributable commissions, when data is available.'] },
    ],
    note: 'Impressions, clicks and CTR (clicks as a percentage of impressions) help diagnose campaign performance. They do not replace contact quality or guarantee transactions.',
  },
  {
    id: 'campanas', nav: 'Campaign structure', title: 'Searches with explicit intent',
    intro: 'We will prioritize Google Search: ads shown when someone searches for an industrial facility or advisory services. Campaigns will be organized by intent, with a shared commercial objective.',
    table: { headers: ['Campaign', 'Examples / criteria'], rows: [
      ['A · Industrial leasing', 'warehouse for lease Miami Lakes\nindustrial space for rent Medley\nwarehouse for rent Hialeah'],
      ['B · Industrial purchases', 'warehouse for sale Miami\nindustrial property for sale Hialeah\nbuy warehouse Medley'],
      ['C · Advisory & facility search', 'industrial real estate advisor Miami\nindustrial tenant representation Miami\nwarehouse relocation South Florida'],
      ['D · Specialized facilities', 'Manufacturing, aviation/MRO and cold storage. Only where there is relevant demand and actual capacity to serve it; we do not assume inventory is available.'],
      ['E · Brand', 'Industrial Advisors / IA Miami. We will assess its value, with a limited budget based on competition and organic performance.'],
    ] },
    note: 'These are keyword hypotheses to validate with Google’s keyword planning tool and account history—not search-volume or CPC (cost per click) data. We will not launch every campaign automatically: initial spend will be focused and expanded based on evidence.',
  },
  {
    id: 'anuncios', nav: 'Messaging & ads', title: 'Ads built around real needs',
    intro: 'Messaging will address location, leasing or purchase, confirmed availability, space and verified property features, operational requirements, and guidance throughout the search and negotiation.',
    blocks: [
      { title: 'Leasing · illustrative example', bullets: ['Warehouse Space in Miami', 'Explore Industrial Options', 'Speak With Industrial Advisors'] },
      { title: 'Purchase · illustrative example', bullets: ['Industrial Property for Sale', 'Find Your Next Facility', 'Discuss Your Requirements'] },
      { title: 'Spanish-language campaign · illustrative copy', text: 'A Spanish-language version may address warehouse leasing, suitable facilities for the company and a conversation with an advisor. Final copy will be developed and approved in Spanish before launch.' },
    ],
    note: 'These examples are not approved ads. No property will be advertised as available without confirmation from Industrial Advisors.',
  },
  {
    id: 'segmentacion', nav: 'Targeting', title: 'Relevance and budget control',
    intro: 'We will begin where inventory, demand and commercial capacity align. Targeting will be validated with your team before launch.',
    blocks: [
      { title: 'Locations & languages', bullets: ['Miami Lakes, Hialeah, Medley, Doral, Opa-Locka and other relevant areas, subject to validation.', 'English and Spanish ads with consistent messaging and suitable destinations within the existing website.', 'Physical-presence targeting for the local evaluation period.', 'A separate campaign, if appropriate, for companies outside the area seeking facilities in South Florida.'] },
      { title: 'Search controls', bullets: ['Exact and phrase match as a starting point: these control which searches can trigger ads.', 'Review search queries and add negative keywords to exclude jobs, housing, personal storage and other irrelevant searches.', 'Avoid broad exclusions that block valid industrial demand.'] },
    ],
    note: 'Performance Max, Display and YouTube may be evaluated later. They are not included in the base launch.',
  },
  {
    id: 'web', nav: 'Your existing website', title: 'The website you just launched',
    intro: 'Campaigns will direct traffic to the website Industrial Advisors has just launched.',
    blocks: [
      { title: 'A relevant destination for each ad', text: 'We will use the most suitable existing pages, listings and sections. Destinations will be checked before launch; we do not assume each property has its own page.' },
      { title: 'Pre-launch checks', bullets: ['Working forms and contact buttons.', 'Mobile experience and correct delivery of inquiries.', 'Availability of promoted properties.', 'Tracking tags and actions that can be recorded.'] },
      { title: 'Technical coordination—not a redesign', text: 'If a listing cannot be linked or an action cannot be tracked, we will explain the impact and coordinate a solution with your website administrator. Recommendations will be limited to what is needed to measure and receive contacts.' },
    ],
  },
  {
    id: 'crm', nav: 'Tracking & CRM', title: 'Follow the contact, not just the click',
    intro: 'Tracking connects spend with inquiries. Commercial follow-up identifies which contacts were qualified and which opportunities progressed.',
    blocks: [
      { title: 'Standard tracking included', bullets: ['Review or configuration of Google Tag Manager and GA4 where appropriate: website tags and analytics.', 'Conversions for successfully submitted forms, with duplicate prevention.', 'Actual calls where technically feasible. Phone clicks are secondary signals and do not automatically count as leads.', 'Identification of the originating campaign.', 'Enhanced conversions for leads where appropriate and applicable requirements are met.'] },
      { title: 'Return quality signals to Google Ads', text: 'A CRM records contacts and their commercial progress. Its stages can be sent back to Google Ads to guide optimization. If you do not use one, we propose a simple shared register; purchasing a CRM is not required to begin.' },
      { title: 'Technical scope', text: 'We will assess your system before promising an automatic connection. Custom integrations, development and licenses are quoted separately.' },
    ],
  },
  {
    id: 'gestion', nav: 'Ongoing management', title: 'Management with consistent review',
    intro: 'We will manage budgets and campaigns through a clear routine, coordinated with the team handling inquiries.',
    blocks: [
      { title: 'During launch', text: 'Frequent review of spend, searches, ads, conversions and initial inquiries.' },
      { title: 'Weekly', bullets: ['Review search queries and add negative keywords.', 'Adjust ads and budgets.', 'Check destinations and availability.', 'Review lead quality with the client.'] },
      { title: 'Monthly', bullets: ['Spend and results report.', 'Follow-up meeting.', 'Budget allocation recommendations.', 'Next tests.'] },
    ],
    note: 'The bidding strategy will be chosen after reviewing account history and tracking. We will not set an arbitrary target CPA (cost per acquisition).',
  },
  {
    id: 'plan', nav: '90-day plan', title: 'Evaluate, learn and decide',
    intro: 'We recommend 90 days as an initial evaluation period. It is not a guarantee of closings or a mandatory contractual commitment.',
    blocks: [
      { title: 'Month 01 · Prepare & launch', text: 'Audit, research, tracking, configuration and launch, subject to access and approvals.' },
      { title: 'Month 02 · Refine & optimize', text: 'Refine search queries and optimize based on inquiries and the quality of contacts received.' },
      { title: 'Month 03 · Evaluate the next step', text: 'Evaluate quality, opportunities and options for increasing spend based on actual evidence.' },
    ],
    note: 'Real estate closings may take longer than the initial evaluation period. They should continue to be tracked afterward to assess the campaigns’ commercial contribution.',
  },
  {
    id: 'inversion', nav: 'Investment', title: 'Transparent investment from the start',
    intro: 'Hipervínculo fees and advertising spend are separate. All amounts are in USD.',
    blocks: [
      { title: 'USD 1,000 · Initial setup · one time', bullets: ['Audit of the previous account, research and initial structure.', 'Creation or restructuring of campaigns and ads.', 'Configuration or review of standard tracking and pre-launch checks.'] },
      { title: 'USD 1,500 · Monthly management', bullets: ['One Google Ads account and the agreed Search campaigns.', 'English and Spanish ads where appropriate.', 'Ongoing optimization, search-query and negative-keyword reviews, and tracking checks.', 'Report, monthly meeting and coordination on lead quality.'] },
    ],
    table: { headers: ['Item', 'First month', 'Following months'], rows: [
      ['Media · paid directly to Google', 'USD 3,000–5,000', 'USD 3,000–5,000'],
      ['Management · Hipervínculo', 'USD 1,500', 'USD 1,500'],
      ['Initial setup · Hipervínculo', 'USD 1,000', 'Not repeated'],
      ['Monthly total', 'USD 5,500–7,500', 'USD 4,500–6,500'],
    ] },
    note: 'Management covers up to USD 10,000/month in media spend. Any increase in spend or scope will be quoted and agreed before it takes effect. The initial media range is preliminary, subject to account history and demand validation, and does not guarantee results.',
  },
  {
    id: 'condiciones', nav: 'Agreement details', title: 'Agreement Details',
    intro: 'A defined scope and a transparent relationship between Industrial Advisors and Hipervínculo.',
    blocks: [
      { title: 'Payments & ownership', bullets: ['Initial setup and monthly management are paid upfront.', 'Google bills advertising directly to the client.', 'The client retains ownership and control of the account, data and history.'] },
      { title: 'Services not included', bullets: ['Third-party licenses and tools.', 'Complex CRM integrations or additional development, quoted separately.', 'Website creation or redesign, new landing pages, SEO and social media management.'] },
      { title: 'Responsible expectations', text: 'We do not guarantee lead volume, cost per lead, Google rankings, sales, profitability or closed transactions. Results also depend on inventory, demand and commercial follow-up.' },
    ],
  },
  {
    id: 'responsabilidades', nav: 'Responsibilities', title: 'What we need from your team',
    intro: 'Advertising starts conversations. Your team provides current availability, property knowledge and commercial follow-up.',
    blocks: [
      { title: 'To prepare & launch', bullets: ['Access to Google Ads and analytics.', 'Coordination with your website administrator.', 'Current inventory and availability.', 'Approval of ads and property information.'] },
      { title: 'To learn & improve', bullets: ['Timely response to contacts.', 'Feedback on quality and commercial progress.'] },
    ],
  },
  {
    id: 'lanzamiento', nav: 'Launch preparation', title: 'Information to prepare the launch',
    intro: 'These four answers will help us refine the initial plan and coordinate with your team.',
    blocks: iaQuestions.map((title, i) => ({ title: `${i + 1}. ${title}` })),
    note: 'Please share your answers with Hipervínculo to coordinate the launch.',
  },
  {
    id: 'cierre', nav: 'Next step', title: 'Let’s coordinate the launch',
    intro: 'A Google Ads strategy using your existing website, with transparent investment and follow-up on commercial opportunities.',
    blocks: [
      { title: 'Hipervínculo · Miguel Camacho', text: 'info@hipervinculo.net · +1 (786) 529-0679\n2645 Executive Park Dr, Suite 146, Weston, FL 33331' },
      { title: 'Next step', text: 'Let’s review the campaign history, confirm media spend, and coordinate access and approvals to prepare the launch.' },
    ],
  },
];
