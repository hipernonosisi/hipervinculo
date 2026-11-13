import { describe, it, expect } from 'vitest';
import { sofibellaTerms, sofibellaContent } from '@/components/proposals/data/sofibellaContent';
describe('Sofibella terms', () => {
  it('website project is $13,500 fixed', () => expect(sofibellaTerms.websiteProject).toBe(13500));
  it('optional operations fee is $1,500/month', () => expect(sofibellaTerms.operationsMonthly).toBe(1500));
  it('includes 12 months of support', () => expect(sofibellaTerms.supportMonths).toBe(12));
  it('Klaviyo incentive is up to 250 flows', () => expect(sofibellaTerms.maxKlaviyoFlows).toBe(250));
  it('answers all 27 client questions', () => expect(sofibellaContent.sections.find(s => s.eyebrow === 'YOUR QUESTIONS, ANSWERED')!.items).toHaveLength(27));
});
