import { describe, expect, it } from 'vitest';
import { isPublicPath, localizedPath, retiredPaths, prerenderPaths, routeMeta, business } from '../lib/seoRoutes';
import { auditIdentityLabel } from '../../supabase/functions/send-notification/auditIdentity';

describe('Retired client URLs', () => {
  const slugs = ['step-solution-usa', 'zerma-latin-america', 'lbc-cold', 'filtro-laser', 'pulverizadores-industriales', 'stillwater-day-spa', 'rasetta-innovations', 'lajex-llc', 'delios-home'];
  for (const path of ['/portfolio', ...slugs.map(slug => `/portfolio/${slug}`)]) {
    it(`serves only a static error document for ${path} in both languages`, () => {
      expect(retiredPaths).toContain(path);
      for (const language of ['en', 'es'] as const) {
        const localized = localizedPath(path, language);
        expect(isPublicPath(localized)).toBe(false);
        expect(routeMeta(localized, language)).toBeUndefined();
        expect(prerenderPaths).toContain(localized);
      }
    });
  }
});
describe('Source-specific audit identity', () => {
  it('labels a Shopify personal identity as Name', () => expect(auditIdentityLabel('shopify-audit', 'en', 'Company:')).toBe('Name:'));
  it('labels a Spanish Shopify identity as Nombre', () => expect(auditIdentityLabel('shopify-audit', 'es', 'Empresa:')).toBe('Nombre:'));
  it('preserves company labels on other audit forms', () => expect(auditIdentityLabel(undefined, 'en', 'Company:')).toBe('Company:'));
  it('preserves Spanish company labels on other audit forms', () => expect(auditIdentityLabel(undefined, 'es', 'Empresa:')).toBe('Empresa:'));
});
describe('Public rate disclosure', () => {
  it('omits fixed dollar rates from public business data', () => {
    expect(business).not.toHaveProperty('websiteFrom');
    expect(business).not.toHaveProperty('adsFrom');
    expect(business.trackedSales).toBe('$92M+');
  });
});