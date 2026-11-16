import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { preferredSource, PREFERRED_SOURCE_URL } from '../data/preferredSource';

const footer = readFileSync('src/components/layout/Footer.tsx', 'utf8');
const guides = readFileSync('src/pages/Guides.tsx', 'utf8');
const guide = readFileSync('src/pages/GoogleAdsShopifyGuide.tsx', 'utf8');

describe('Prompt 13 preferred source link', () => {
  it('points at the Google preferred source preferences URL', () => {
    expect(PREFERRED_SOURCE_URL).toBe('https://www.google.com/preferences/source?q=hipervinculo.net');
  });

  it('uses the approved English and Spanish wording', () => {
    expect(preferredSource.en.footer).toBe('Add us as a preferred source on Google');
    expect(preferredSource.es.footer).toBe('Añádenos como fuente preferida en Google');
    expect(preferredSource.en.prompt).toBe('Found this useful? ');
    expect(preferredSource.es.prompt).toBe('¿Te sirvió? ');
    expect(preferredSource.en.link).toBe('Add Hipervínculo as a preferred source on Google');
    expect(preferredSource.es.link).toBe('Añade Hipervínculo como fuente preferida en Google');
  });

  it('renders a plain new-tab link in the footer, the guides index and the guide', () => {
    for (const source of [footer, guides, guide]) {
      expect(source).toContain("from '@/data/preferredSource'");
      expect(source).toContain('href={PREFERRED_SOURCE_URL}');
      expect(source).toContain('target="_blank"');
      expect(source).toContain('rel="noopener"');
    }
  });

  it('places the guide line immediately before the final call-to-action card', () => {
    expect(guide.indexOf('href={PREFERRED_SOURCE_URL}')).toBeLessThan(guide.indexOf('<Card className="rounded-lg mb-14">'));
  });

  it('loads no external Google script', () => {
    expect(footer + guides + guide).not.toContain('publisher.js');
    expect(footer + guides + guide).not.toContain('news.google.com');
  });
});
