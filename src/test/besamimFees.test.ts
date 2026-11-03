import { describe, it, expect } from 'vitest';
import { besamimTerms, besamimExamples, calculateBesamimFees } from '../components/proposals/data/besamimContent';

describe('BESAMIM approved commercial terms', () => {
  it('charges $1,250 even below the ROAS threshold', () => {
    expect(calculateBesamimFees(20000, 6000, 4000)).toEqual({ roas: 2, performanceFee: 0, totalFee: 1250 });
  });
  it('earns no commission at 2.49x', () => {
    expect(calculateBesamimFees(24900, 5000, 5000).performanceFee).toBe(0);
  });
  it('earns 3% on all eligible sales at exactly 2.50x using combined spend', () => {
    expect(calculateBesamimFees(30000, 7000, 5000)).toEqual({ roas: 2.5, performanceFee: 900, totalFee: 2150 });
  });
  it('requires 12 months with no separate upfront development fee', () => {
    expect(besamimTerms.minimumMonths).toBe(12);
    expect(besamimTerms.upfrontDevelopmentFee).toBe(0);
    expect(besamimTerms.retainer * besamimTerms.minimumMonths).toBe(15000);
  });
  it('matches each approved hypothetical illustration', () => {
    expect(besamimExamples.map(({ roas, performanceFee, totalFee }) => [roas, performanceFee, totalFee])).toEqual([[2,0,1250],[2.5,900,2150],[2.5,1500,2750],[4,3000,4250]]);
  });
});