import { describe, expect, it } from 'vitest';
import { supremeHerbalsShopifyTerms as terms } from '../components/proposals/data/supremeHerbalsShopifyContent';

describe('Supreme Herbals standalone Shopify approved terms', () => {
  it('charges a fixed USD 3,000 development fee', () => {
    expect(terms.developmentPrice).toBe(3000);
  });
  it('collects 100% at completion with no advance', () => {
    expect(terms.paymentPercentAtCompletion).toBe(100);
    expect(terms.upfrontPaymentPercent).toBe(0);
  });
  it('includes up to 10 products and their variants', () => {
    expect(terms.maximumProducts).toBe(10);
    expect(terms.includeVariants).toBe(true);
  });
  it('allows necessary review rounds within the approved scope', () => {
    expect(terms.reviewRounds).toBe('as-needed-within-scope');
  });
  it('offers optional maintenance without an approved price', () => {
    expect(terms.maintenance).toBe('optional-unpriced');
  });
  it('does not apply old recurring fees or multiannual commitments', () => {
    expect(terms.monthlyRetainer).toBe(0);
    expect(terms.salesCommissionPercent).toBe(0);
    expect(terms.minimumMonths).toBe(0);
  });
  it('includes configuration of only one fulfillment alternative', () => {
    expect(terms.fulfillmentAlternativesIncluded).toBe(1);
  });
});