export interface ShopifyAuditInput {
  name: string;
  email: string;
  website: string;
  revenue: string;
  help: string[];
  message: string;
}

// Map the new fields to the existing audit destination; do not create a second lead pipeline.
export function shopifyAuditPayload(input: ShopifyAuditInput) {
  return {
    company_name: input.name.trim(),
    email: input.email.trim(),
    website_url: input.website.trim(),
    business_type: 'Shopify',
    monthly_revenue: input.revenue,
    monthly_ad_spend: null,
    growth_goals: [input.help.join(', '), input.message.trim()].filter(Boolean).join('\n'),
  };
}