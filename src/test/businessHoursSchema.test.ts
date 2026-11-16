import { describe, expect, it } from 'vitest';
import { business, businessSchema } from '../lib/seoRoutes';

const MAPS_URL = 'https://www.google.com/maps?cid=4036466165487798554';

function organization() {
  const graph = businessSchema('https://hipervinculo.net/logo.png')['@graph'] as Record<string, any>[];
  return graph.find(node => node['@id'] === 'https://hipervinculo.net/#organization')!;
}

describe('Business hours and Google profile in the organization schema', () => {
  it('declares Monday to Friday, 10:00 to 17:00 only', () => {
    const hours = organization().openingHoursSpecification as Record<string, any>[];
    expect(hours).toHaveLength(1);
    expect(hours[0].dayOfWeek).toEqual(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
    expect(hours[0].opens).toBe('10:00');
    expect(hours[0].closes).toBe('17:00');
    expect(JSON.stringify(hours).includes('Saturday')).toBe(false);
    expect(JSON.stringify(hours).includes('Sunday')).toBe(false);
  });

  it('points hasMap at the Google Business profile', () => {
    expect(organization().hasMap).toBe(MAPS_URL);
    expect(business.googleMaps).toBe(MAPS_URL);
  });

  it('keeps the three social networks and adds the Google profile to sameAs', () => {
    expect(organization().sameAs).toEqual([
      'https://x.com/hipervinculo_ca',
      'https://instagram.com/hipervinculo_',
      'https://facebook.com/hipervinculo.net',
      MAPS_URL,
    ]);
  });

  it('does not add AggregateRating or Review', () => {
    const json = JSON.stringify(businessSchema('https://hipervinculo.net/logo.png'));
    expect(json.includes('AggregateRating')).toBe(false);
    expect(json.includes('"Review"')).toBe(false);
  });
});
