import { describe, expect, it } from 'vitest';
import { business, normalizedPath, localizedPath, publicPaths } from '../lib/seoRoutes';
describe('Approved agency commercial rules', () => {
 it('uses $92M+ tracked sales', () => { expect(business.trackedSales).toBe('$92M+'); });
 it('requires no contract for the general offer', () => { expect(business.minimumContractMonths).toBe(0); });
});
describe('Public language paths', () => {
 it('gives Spanish pages separate self-referencing paths', () => { expect(localizedPath('/about', 'es')).toBe('/es/about'); expect(localizedPath('/es/about', 'en')).toBe('/about'); });
 it('normalizes the three requested path variants', () => { expect(normalizedPath('/services/')).toBe('/services'); expect(normalizedPath('/About')).toBe('/about'); expect(normalizedPath('/index.html')).toBe('/'); });
 it('does not register retired client pages as public content', () => { expect(publicPaths.some(p => p.includes('/portfolio'))).toBe(false); });
});
