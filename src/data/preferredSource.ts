// Shared "preferred source" wording used by the footer, the guides index and the
// Google Ads for Shopify guide. Plain <a> only: no Google publisher.js is loaded.
export const PREFERRED_SOURCE_URL = 'https://www.google.com/preferences/source?q=hipervinculo.net';

export const preferredSource = {
  en: {
    footer: 'Add us as a preferred source on Google',
    prompt: 'Found this useful? ',
    link: 'Add Hipervínculo as a preferred source on Google',
  },
  es: {
    footer: 'Añádenos como fuente preferida en Google',
    prompt: '¿Te sirvió? ',
    link: 'Añade Hipervínculo como fuente preferida en Google',
  },
} as const;
