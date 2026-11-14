import { describe, it, expect } from 'vitest';
import { shopifyTerms } from '../data/shopifyAgencyContent';
import { shopifyAuditPayload } from '../lib/shopifyAudit';

describe('Shopify commercial rules', () => {
  it('targets a minimum Net ROAS of 2.5x', () => expect(shopifyTerms.minimumNetRoas).toBe(2.5));
  it('sets the partnership revenue threshold to $50K monthly', () => expect(shopifyTerms.partnershipMonthlyRevenue).toBe(50000));
  it('charges 5% of net Shopify sales in the partnership model', () => expect(shopifyTerms.netSalesShare).toBe(0.05));
  it('requires no long-term contract', () => expect(shopifyTerms.longTermContract).toBe(false));
});
describe('Shopify audit field mapping', () => {
  it('sends the supplied fields to the existing audit record without inventing ad spend', () => {
    expect(shopifyAuditPayload({ name: 'Test Owner', email: 'owner@example.com', website: 'https://example.com', revenue: '$10K–$50K', help: ['Google Ads', 'Tracking'], message: '' })).toEqual({
      company_name: 'Test Owner', email: 'owner@example.com', website_url: 'https://example.com', business_type: 'Shopify', monthly_revenue: '$10K–$50K', monthly_ad_spend: null, growth_goals: 'Google Ads, Tracking',
    });
  });
});