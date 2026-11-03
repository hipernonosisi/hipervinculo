export const besamimTerms = { retainer: 1250, commissionRate: 0.03, minimumRoas: 2.5, minimumMonths: 12, upfrontDevelopmentFee: 0 } as const;

export function calculateBesamimFees(netSales: number, googleSpend: number, metaSpend: number) {
  if (![netSales, googleSpend, metaSpend].every(value => Number.isFinite(value) && value >= 0)) throw new Error('Amounts must be finite and nonnegative');
  const spend = googleSpend + metaSpend;
  const roas = spend > 0 ? netSales / spend : null;
  const qualifies = spend > 0 && netSales >= spend * besamimTerms.minimumRoas;
  const performanceFee = qualifies ? Math.round(netSales * besamimTerms.commissionRate * 100) / 100 : 0;
  return { roas, performanceFee, totalFee: besamimTerms.retainer + performanceFee };
}
export const besamimExamples = [
  { netSales: 20000, spend: 10000 }, { netSales: 30000, spend: 12000 },
  { netSales: 50000, spend: 20000 }, { netSales: 100000, spend: 25000 },
].map(row => ({ ...row, ...calculateBesamimFees(row.netSales, row.spend, 0) }));
export const money = (value: number) => '$' + value.toLocaleString('en-US', { maximumFractionDigits: 2 });
export interface BesamimSection {
  eyebrow: string; title: string; headline: string; intro?: string;
  layout: 'panels' | 'steps' | 'table' | 'investment' | 'terms' | 'financial';
  items: { title: string; description: string }[]; note?: string;
}
export const besamimContent = {
  pricing: { label: 'MONTHLY BASE + CONDITIONAL PERFORMANCE FEE', monthly: '$1,250 / month', commitment: '3% of eligible Shopify net sales only at blended ROAS ≥ 2.50x · 12-month minimum', exclusions: 'Shopify redesign included. Advertising, platform and app charges are separate.' },
  cover: { eyebrow: 'STRATEGIC DTC GROWTH PARTNERSHIP', title: 'From Wholesale Strength\nto Direct-to-Consumer Growth', client: 'BESAMIM Perfumes', recipient: 'Prepared for Johanna', tagline: 'A Strategic E-Commerce & Performance Marketing Partnership. Shopify storefront development, Google and Meta acquisition, and continuous optimization.' },
  about: { title: 'About Hipervínculo', headline: 'Experience, strategy and execution.', description: 'We help businesses connect their digital storefront, customer acquisition and measurement into a coherent growth program. For BESAMIM, our proposed role is a dedicated e-commerce growth partner: developing the retail experience, managing paid media and continuously improving the system together with your team.', stats: [{ value: '20+', label: 'Years of experience' }, { value: '200+', label: 'Clients served' }, { value: '$92M+', label: 'Advertising investment managed' }], capabilities: ['Shopify strategy and development', 'Google Ads and Meta Ads management', 'Analytics and performance reporting', 'Merchandising and conversion optimization'] },
  sections: [
    { eyebrow: 'THE OPPORTUNITY', title: 'BESAMIM’s next retail chapter', headline: 'Fragrance expertise meets an integrated retail growth program.', layout: 'panels', intro: 'Johanna, thank you for the positive conversation with Miguel. This proposal responds to your request for a formal plan to help BESAMIM expand from established wholesale distribution into direct-to-consumer retail.', items: [
      { title: 'A foundation to build upon', description: 'Your fragrance industry experience and wholesale operations can support a stronger retail channel. Retail growth still requires a compelling shopping experience, acquisition, reliable fulfillment and financial discipline.' },
      { title: 'Public-site research — preliminary observations', description: 'Indexed public pages describe fragrance discovery by note family, season and occasion, alongside structured product details. These are potential merchandising strengths, not verified conversion results.' },
      { title: 'What remains unverified', description: 'The live homepage was unavailable during our review. Current mobile behavior, filters, cart, policies, tracking and storefront platform could not be verified. A separately indexed checkout surface does not establish the current platform.' },
      { title: 'Discovery before diagnosis', description: 'We will validate the live purchase journey and existing systems with access from your team. Migration complexity, catalog volume and technical dependencies belong in discovery, not assumed defects.' },
    ], note: 'Research reference: besamimperfumes.com and indexed public product, wholesale and checkout pages. No sales, traffic or conversion figures have been assumed.' },
    { eyebrow: 'STRATEGY', title: 'One connected growth system', headline: 'Not a website project separated from advertising.', layout: 'steps', intro: 'BESAMIM brings products, pricing, inventory and customer operations. Hipervínculo brings the agreed storefront, paid acquisition, measurement and optimization work.', items: [
      { title: 'Trust and product discovery', description: 'Present designer and luxury fragrances clearly, with accurate variants, compelling merchandising and approved authenticity messaging. Make shipping and returns information accessible before purchase.' },
      { title: 'Acquire customers intentionally', description: 'Connect Google purchase intent with Meta product discovery. Campaign selection and investment allocation will reflect catalog economics, budget and measured performance.' },
      { title: 'Measure the whole retail channel', description: 'Reconcile eligible Shopify DTC net sales with combined eligible Google and Meta spend. Platform attribution helps campaign decisions; it does not replace the contractual blended ROAS metric.' },
      { title: 'Improve with financial discipline', description: 'Review product margins, availability, promotions and conversion opportunities monthly. A 2.50x blended ROAS is a commission threshold, not a promise of net profitability.' },
    ] },
    { eyebrow: 'SHOPIFY', title: 'Website transformation', headline: 'Included in the partnership, with an agreed development scope.', layout: 'panels', items: [
      { title: 'Strategy, architecture and storefront', description: 'Shopify configuration; homepage redesign; collection and product page templates; navigation, product discovery and a shopping experience optimized for mobile and desktop.' },
      { title: 'Merchandising and purchase journey', description: 'Approved product information and imagery, variant presentation, promotional capabilities, and cart and checkout configuration within Shopify’s supported capabilities.' },
      { title: 'Foundations and launch', description: 'Essential technical SEO foundations, analytics and advertising integrations, quality assurance and launch support. Validate shipping, returns and customer trust messaging using client-approved information.' },
      { title: 'Bounded scope, no upfront development fee', description: 'A mutually approved statement of work will define deliverables, catalog/migration quantities, milestones, revision limits and integrations. No unlimited product migration, custom development or integrations are included.' },
    ], note: 'The current platform is not yet verified. Any migration dependencies must be assessed before agreeing the scope or launch milestones. No fixed completion date is promised before discovery.' },
    { eyebrow: 'GOOGLE ADS', title: 'Capture purchase intent', headline: 'Build campaigns around the catalog and retail economics.', layout: 'panels', items: [
      { title: 'Shopping and Performance Max', description: 'Potential product-led campaigns supported by Google Merchant Center and feed optimization. Deployment depends on account eligibility, catalog quality, budget and available data.' },
      { title: 'Search and segmentation', description: 'Potential brand and non-brand Search campaigns, with search-term review and relevant product or collection destinations. The final structure follows discovery.' },
      { title: 'Remarketing and measurement', description: 'Remarketing where appropriate and permitted, Google Ads conversion tracking, and validation against the agreed sales reporting framework.' },
      { title: 'Ongoing management', description: 'Budget allocation, bidding optimization, feed maintenance and campaign performance analysis. BESAMIM funds advertising directly; no spend amount or allocation is assumed here.' },
    ] },
    { eyebrow: 'META ADS', title: 'Turn discovery into demand', headline: 'Paid acquisition across Facebook and Instagram.', layout: 'panels', items: [
      { title: 'Catalog-led acquisition', description: 'Customer acquisition strategy, product/catalog advertising, dynamic product campaigns and prospecting where account capabilities and data support them.' },
      { title: 'Audiences and retargeting', description: 'Audience strategy and campaign structure; retargeting where appropriate, supported by permitted data and reliable event measurement.' },
      { title: 'Creative development and testing', description: 'Paid advertising creative development or adaptation is included within a jointly approved monthly production scope. Formats, quantities and revision limits are agreed before production; photography and video production are not unlimited.' },
      { title: 'Performance optimization', description: 'Creative testing, budget optimization and performance reporting inform regular campaign adjustments. Ongoing organic social posting and community management are not included.' },
    ] },
    { eyebrow: 'ACCOUNTABILITY', title: 'Measure, reconcile, improve', headline: 'A transparent monthly view of the retail business.', layout: 'steps', items: [
      { title: 'Implementation or validation', description: 'Shopify sales reporting, GA4, Google Ads conversion tracking, and Meta Pixel plus Conversions API where applicable. Validate event quality, consent requirements and available integrations.' },
      { title: 'Monthly reconciliation', description: 'Reconcile eligible DTC net sales and eligible Google/Meta advertising spend for the same agreed monthly period. Document discrepancies, refunds and adjustments before calculating commission.' },
      { title: 'Reporting and strategy review', description: 'Monthly performance reporting and strategy review, including blended ROAS, conversion and revenue analysis, acquisition efficiency and priorities for the next cycle.' },
      { title: 'Continuous e-commerce optimization', description: 'Website conversion improvements, landing page recommendations, merchandising improvements, promotional testing, creative iteration and campaign optimization within the agreed scope.' },
    ], note: 'Google- or Meta-reported ROAS is not the compensation metric. Access to the underlying Shopify and advertising reports is required.' },
    { eyebrow: 'IMPLEMENTATION', title: 'A milestone-based roadmap', headline: 'Build the foundation, then optimize and scale responsibly.', layout: 'steps', items: [
      { title: 'Phase 1 · Discovery and strategy', description: 'Review systems, catalog, margins, fulfillment, existing accounts and data. Confirm the statement of work, approvals, creative production scope and eligible sales/spend definitions.' },
      { title: 'Phase 2 · Shopify design and development', description: 'Approve architecture and design; implement agreed templates, merchandising and integrations. Assess migration, validate content and complete revisions within the approved limits.' },
      { title: 'Phase 3 · Tracking, advertising setup and launch', description: 'Validate the purchase journey and measurement; configure feeds and campaigns; obtain approvals and launch against agreed readiness milestones.' },
      { title: 'Phase 4 · Ongoing optimization and scale', description: 'Review results monthly, prioritize improvements, test promotions and creative, and recommend budget changes based on performance and business capacity.' },
    ], note: 'The $1,250 monthly retainer is payable throughout the 12-month minimum term, including development. Timing is confirmed after technical discovery; no sales or profitability outcome is guaranteed.' },
    { eyebrow: 'SCOPE & RESPONSIBILITIES', title: 'Clear roles, practical boundaries', headline: 'An integrated program without transferring business ownership.', layout: 'table', items: [
      { title: 'Hipervínculo', description: 'Agreed Shopify development, Google and Meta paid media management, bounded paid creative production, analytics, monthly reporting, strategy reviews and ongoing optimization.' },
      { title: 'BESAMIM', description: 'Product sourcing, inventory, retail pricing and margins, fulfillment, service, returns/refunds, accurate product information and approved imagery. Advertising funds, platform/apps, system access and timely approvals.' },
      { title: 'Excluded operations', description: 'Daily organic social posting, community management, ongoing influencer management, customer service, order fulfillment, inventory purchasing, warehousing, returns processing, wholesale account and Amazon/marketplace management.' },
      { title: 'Separate expenses', description: 'Third-party platforms, apps and subscriptions; services beyond approved development or creative scope; additional photography/video production and custom integrations. Separately scoped and quoted where required.' },
    ], note: 'BESAMIM retains its products, inventory, accounts and customer data. Website ownership and handover terms will be documented in the services agreement.' },
    { eyebrow: 'INVESTMENT', title: 'The commercial partnership', headline: 'A fixed foundation plus performance-aligned compensation.', layout: 'investment', items: [
      { title: 'Base retainer · $1,250 every month', description: 'Supports ongoing operating, management, technical and optimization costs. Payable regardless of blended ROAS, including during development, under the agreed billing schedule.' },
      { title: 'Performance commission · 3%', description: 'Earned only if monthly blended ROAS reaches or exceeds 2.50x. Applies to ALL eligible monthly Shopify DTC net sales, not only transactions attributed by the advertising platforms.' },
      { title: '12-month minimum · Redesign included', description: 'No separate initial Shopify development charge. The minimum commitment supports the investment in the storefront and ongoing optimization. Minimum base fees total $15,000, excluding qualifying commission and separate expenses.' },
    ], note: 'BESAMIM pays Google and Meta advertising directly, separately from agency fees. The initial advertising budget will be agreed based on margins, catalog, operational capacity and risk tolerance.' },
    { eyebrow: 'PERFORMANCE COMPENSATION', title: 'How the monthly fee works', headline: 'One formula. One threshold. Clear reconciliation.', layout: 'financial', intro: 'Blended ROAS = Eligible Shopify Net Sales / (Google Ads Spend + Meta Ads Spend). Both spend components represent agreed eligible spend for the same month.', items: [
      { title: 'Eligible sales', description: 'Agreed DTC revenue recorded in Shopify, net of discounts and refunds, excluding tax, shipping, wholesale, marketplace and other non-eligible sales. The agreement defines returns, cancellations, chargebacks, adjustments and delayed refunds.' },
      { title: 'The qualifying rule', description: 'At 2.49x, commission is $0. At 2.50x or above, 3% applies to the full eligible monthly net sales amount. The $1,250 retainer remains payable in either case. A month with no eligible ad spend requires an agreed treatment; no ROAS is assumed.' },
    ], note: 'These illustrations are hypothetical, not actual BESAMIM results or forecasts. Advertising spend is separate from the total Hipervínculo fee. Meeting the ROAS threshold does not guarantee net profitability.' },
    { eyebrow: 'AGREEMENT DETAILS', title: 'Commitment and next steps', headline: 'A commercial proposal, not the final services agreement.', layout: 'terms', items: [
      { title: 'Document the financial rules', description: 'The final agreement will define the 12-month minimum, monthly retainer/payment schedule, conditional 3% formula, eligible sales/spend, monthly reporting period, ROAS calculation and refund reconciliation.' },
      { title: 'Approve scope and operational requirements', description: 'Confirm development deliverables, revision limits, milestones, creative production scope, required access, approval responsibilities, advertising budget, third-party expenses and out-of-scope services.' },
      { title: 'Ownership, termination and handover', description: 'Document website ownership/handover, early termination and treatment of unrecovered development costs. No arbitrary termination penalty is introduced in this proposal; BESAMIM retains its accounts and customer data.' },
      { title: 'Move forward together', description: 'Confirm commercial alignment, provide discovery access and approved assets, agree the statement of work and execute the services agreement before work begins. No revenue, sales, CPA or profitability guarantee is offered.' },
    ] },
  ] satisfies BesamimSection[],
  contact: { title: 'Let’s build BESAMIM’s\nnext chapter.', subtitle: 'Johanna, I really enjoyed our conversation and learning more about BESAMIM’s vision for expanding into retail. I believe there is an exciting opportunity to combine your fragrance industry experience with our e-commerce and performance marketing expertise. Our goal is a long-term growth partnership, not isolated services. A modest monthly retainer, a conditional performance component and a twelve-month commitment let us invest in the foundation together. I look forward to exploring what we can build.', name: 'Miguel Camacho', email: 'info@hipervinculo.net', phone: '+1 (786) 529-0679', website: 'hipervinculo.net', address: 'Hipervinculo LLC' },
};
