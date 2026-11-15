import { describe, it, expect } from 'vitest';
import { metaTerms, remainingDefaults } from '../data/shopifyRemainingContent';
import { guideDates } from '../data/googleAdsShopifyGuideContent';
import { shopifyAuditPayload } from '../lib/shopifyAudit';

describe('Prompt 7 approved rules', () => {
  it('sets Meta paid media target to a minimum Net ROAS of 2.5x', () => expect(metaTerms.minimumNetRoas).toBe(2.5));
  it('sets Meta growth eligibility at $50K monthly sales', () => expect(metaTerms.partnershipMonthlyRevenue).toBe(50000));
  it('sets the Meta growth share to 5% of net Shopify sales', () => expect(metaTerms.netSalesShare).toBe(0.05));
  it('preselects Meta Ads and saves it as the requested audit service', () => {
    expect(remainingDefaults['meta-ads']).toEqual(['Meta Ads']);
    expect(shopifyAuditPayload({ name: 'Owner', email: 'owner@example.com', website: 'https://example.com', revenue: 'Under $10K', help: [...remainingDefaults['meta-ads']], message: '' }).growth_goals).toBe('Meta Ads');
  });
  it('preselects store design or redesign for the CRO audit', () => {
    expect(remainingDefaults.cro).toEqual(['Store design or redesign']);
    expect(shopifyAuditPayload({ name: 'Owner', email: 'owner@example.com', website: 'https://example.com', revenue: 'Under $10K', help: [...remainingDefaults.cro], message: '' }).growth_goals).toBe('Store design or redesign');
  });
  it('preselects Tracking for the tracking audit', () => {
    expect(remainingDefaults.tracking).toEqual(['Tracking']);
    expect(shopifyAuditPayload({ name: 'Owner', email: 'owner@example.com', website: 'https://example.com', revenue: 'Under $10K', help: [...remainingDefaults.tracking], message: '' }).growth_goals).toBe('Tracking');
  });
  it('dates the guide publication November 14, 2026', () => expect(guideDates.published).toBe('2026-11-14'));
  it('dates the guide revision November 15, 2026', () => expect(guideDates.modified).toBe('2026-11-15'));
});