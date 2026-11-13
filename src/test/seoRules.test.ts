import { describe, expect, it } from 'vitest';
import { business, normalizedPath, localizedPath, prerenderPaths } from '../lib/seoRoutes';
describe('Approved agency commercial rules', () => {
 it('uses $92M+ tracked sales', () => { expect(business.trackedSales).toBe('$92M+'); });
 it('starts websites at $3,000', () => { expect(business.websiteFrom).toBe(3000); });
 it('starts ads management at $1,250/month', () => { expect(business.adsFrom).toBe(1250); });
 it('requires no contract for the general offer', () => { expect(business.minimumContractMonths).toBe(0); });
});
describe('Public language paths', () => {
 it('gives Spanish pages separate self-referencing paths', () => { expect(localizedPath('/about', 'es')).toBe('/es/about'); expect(localizedPath('/es/about', 'en')).toBe('/about'); });
 it('normalizes the three requested path variants', () => { expect(normalizedPath('/services/')).toBe('/services'); expect(normalizedPath('/About')).toBe('/about'); expect(normalizedPath('/index.html')).toBe('/'); });
 it('includes all nine case studies in both languages', () => { expect(prerenderPaths.filter(p => p.startsWith('/portfolio/'))).toHaveLength(9); expect(prerenderPaths.filter(p => p.startsWith('/es/portfolio/'))).toHaveLength(9); });
});
