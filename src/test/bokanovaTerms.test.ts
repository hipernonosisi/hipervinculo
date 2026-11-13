import { describe, it, expect } from 'vitest';
import { bokanovaContent, bokanovaLiveUrl } from '@/components/proposals/data/bokanovaContent';

describe('Bokanova commercial terms', () => {
  it('website is $3,000 USD', () => expect(bokanovaContent.investment.web.price).toBe('$3,000 USD'));
  it('website is paid in 6 installments of $500', () => expect(bokanovaContent.investment.web.payment).toContain('6 mensualidades de $500'));
  it('SEO is included for the first 6 months', () => expect(bokanovaContent.investment.seo.badge).toBe('Incluido los primeros 6 meses'));
  it('SEO costs $250 USD per month from month 7', () => expect(bokanovaContent.investment.seo.points.join(' ')).toContain('$250 USD al mes'));
  it('SEO has no commitment period', () => expect(bokanovaContent.investment.seo.points.join(' ')).toContain('Sin permanencia'));
  it('links the provisional website', () => expect(bokanovaLiveUrl).toBe('https://ads.hipervinculo.net/bokanova/web/'));
});
