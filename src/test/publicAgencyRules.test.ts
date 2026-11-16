import { describe, expect, it } from 'vitest';
import { isPublicPath, localizedPath, retiredPaths, prerenderPaths, routeMeta, business } from '../lib/seoRoutes';
import { auditIdentityLabel } from '../../supabase/functions/send-notification/auditIdentity';
import founderSource from '../components/home/FounderAndReviews.tsx?raw';
import homeSource from '../pages/Index.tsx?raw';
import previewSource from '../pages/Preview.tsx?raw';
import translationsSource from '../lib/i18n.ts?raw';
import chatSource from '../../supabase/functions/chat/index.ts?raw';

describe('Public client-company confidentiality', () => {
  // Personal names in public Google reviews are allowed; only client companies are prohibited.
  const publicSources = [founderSource, homeSource, previewSource, translationsSource, chatSource].join('\n');
  for (const company of ['Step Solution USA', 'ZERMA', 'LBC Cold', 'Filtro Láser', 'Filtro Laser', 'Pulverizadores Industriales', 'Stillwater Day Spa', 'Rasetta Innovations', 'Lajex LLC', 'Délios Home', 'Delios Home']) {
    it(`keeps ${company} out of public homepage, preview and chat content`, () => {
      expect(publicSources.toLocaleLowerCase()).not.toContain(company.toLocaleLowerCase());
    });
  }
});

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