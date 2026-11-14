import { describe, it, expect } from 'vitest';
import { shopifyTerms } from '../data/shopifyAgencyContent';
import { shopifyAuditPayload } from '../lib/shopifyAudit';
import { storeDesignDefaultHelp } from '../data/shopifyStoreDesignContent';
import { seoDefaultHelp } from '../data/shopifySeoContent';
import { googleAdsDefaultHelp, shopifyGoogleAdsTerms } from '../data/shopifyGoogleAdsContent';

describe('Shopify commercial rules', () => {
  it('sets the Google Ads minimum Net ROAS target at 2.5x', () => expect(shopifyGoogleAdsTerms.minimumNetRoas).toBe(2.5));
  it('sets the Google Ads growth partnership threshold at $50K/month', () => expect(shopifyGoogleAdsTerms.partnershipMonthlyRevenue).toBe(50000));
  it('sets the Google Ads growth share at 5% of net Shopify sales', () => expect(shopifyGoogleAdsTerms.netSalesShare).toBe(0.05));
  it('targets a minimum Net ROAS of 2.5x', () => expect(shopifyTerms.minimumNetRoas).toBe(2.5));
  it('sets the partnership revenue threshold to $50K monthly', () => expect(shopifyTerms.partnershipMonthlyRevenue).toBe(50000));
  it('charges 5% of net Shopify sales in the partnership model', () => expect(shopifyTerms.netSalesShare).toBe(0.05));
  it('requires no long-term contract', () => expect(shopifyTerms.longTermContract).toBe(false));
});
describe('Shopify audit field mapping', () => {
  it('preselects Google Ads and sends it to the existing audit destination', () => {
    expect(googleAdsDefaultHelp).toEqual(['Google Ads']);
    expect(shopifyAuditPayload({ name: 'Owner', email: 'owner@example.com', website: 'https://example.com', revenue: 'Under $10K', help: [...googleAdsDefaultHelp], message: '' }).growth_goals).toBe('Google Ads');
  });
  it('preselects SEO and sends it to the existing audit destination', () => {
    expect(seoDefaultHelp).toEqual(['SEO']);
    expect(shopifyAuditPayload({ name: 'Owner', email: 'owner@example.com', website: 'https://example.com', revenue: 'Under $10K', help: [...seoDefaultHelp], message: '' }).growth_goals).toBe('SEO');
  });
  it('preselects store design or redesign for the store-design audit', () => {
    expect(storeDesignDefaultHelp).toEqual(['Store design or redesign']);
    const payload = shopifyAuditPayload({ name: 'Owner', email: 'owner@example.com', website: 'https://example.com', revenue: 'Under $10K', help: [...storeDesignDefaultHelp], message: '' });
    expect(payload.growth_goals).toBe('Store design or redesign');
  });
  it('sends the supplied fields to the existing audit record without inventing ad spend', () => {
    expect(shopifyAuditPayload({ name: 'Test Owner', email: 'owner@example.com', website: 'https://example.com', revenue: '$10K–$50K', help: ['Google Ads', 'Tracking'], message: '' })).toEqual({
      company_name: 'Test Owner', email: 'owner@example.com', website_url: 'https://example.com', business_type: 'Shopify', monthly_revenue: '$10K–$50K', monthly_ad_spend: null, growth_goals: 'Google Ads, Tracking',
    });
  });
});