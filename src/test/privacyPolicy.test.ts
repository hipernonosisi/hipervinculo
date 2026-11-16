import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { translations } from '../lib/i18n';

const privacyPage = readFileSync('src/pages/Privacy.tsx', 'utf8');

const en = translations.en.privacy;
const es = translations.es.privacy;

describe('Privacy policy data deletion and social sections', () => {
  it('places both new sections before "Changes to Our Privacy Policy"', () => {
    for (const policy of [en, es]) {
      const keys = Object.keys(policy.sections);
      expect(keys.indexOf('social')).toBeLessThan(keys.indexOf('changes'));
      expect(keys.indexOf('deletion')).toBeLessThan(keys.indexOf('changes'));
      expect(keys.indexOf('deletion')).toBeGreaterThan(keys.indexOf('social'));
    }
  });

  it('uses the approved English wording for both sections', () => {
    expect(en.sections.social.title).toBe('Data from Instagram and Facebook');
    expect(en.sections.social.content).toBe(
      'When you comment on or send a message to our Instagram or Facebook accounts, we receive your username, the content of your comment or message, and the conversation history with our account. We use this information only to reply to you and to follow up on your inquiry. We do not sell this information or share it with third parties.'
    );
    expect(en.sections.deletion.title).toBe('How to Request Deletion of Your Data');
    expect(
      en.sections.deletion.contentBefore + 'info@hipervinculo.net' + en.sections.deletion.contentAfter
    ).toBe(
      'You can ask us to delete the data we hold about you at any time. Send an email to info@hipervinculo.net with the subject "Data deletion request" and include your Instagram or Facebook username. We will delete your data within 30 days and confirm by email.'
    );
  });

  it('keeps the Spanish section titles and the 30-day promise', () => {
    expect(es.sections.social.title).toBe('Datos de Instagram y Facebook');
    expect(es.sections.deletion.title).toBe('Cómo solicitar la eliminación de tus datos');
    expect(es.sections.deletion.contentAfter).toContain('30 días');
    expect(es.sections.deletion.contentAfter).toContain('Solicitud de eliminación de datos');
  });

  it('links the deletion section so /privacy#data-deletion resolves to it', () => {
    expect(privacyPage).toContain('id="data-deletion"');
  });

  it('makes the contact email a mailto link in both sections', () => {
    expect(en.email).toBe('info@hipervinculo.net');
    expect(es.email).toBe('info@hipervinculo.net');
    expect(privacyPage.match(/mailto:\$\{t\.privacy\.email\}/g)).toHaveLength(2);
  });

  it('shows today\'s revision date in both languages', () => {
    expect(en.lastUpdated).toBe('Last updated: November 16, 2026');
    expect(es.lastUpdated).toBe('Última actualización: 16 de noviembre de 2026');
  });
});
