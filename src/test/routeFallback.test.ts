import { describe, expect, it } from 'vitest';
import { redirectedPath } from '../lib/seoRoutes';

describe('Requested legacy redirects', () => {
  it.each([
    ['/About', '/about'],
    ['/index.html', '/'],
    ['/ads', '/amazon-ads'],
    ['/services/meta-ads', '/services'],
    ['/services/google-ads', '/services'],
    ['/services/seo', '/services'],
    ['/services/ecommerce', '/services'],
    ['/services/email-marketing', '/services'],
    ['/services/lead-generation', '/services'],
  ])('redirects %s to %s', (source, target) => {
    expect(redirectedPath(source)).toBe(target);
  });
  it('does not send made-up paths to home or services', () => {
    for (const path of ['/any-made-up-path', '/es/any-made-up-path', '/services/made-up']) {
      expect(redirectedPath(path)).toBe(path);
    }
  });
  it('preserves Spanish destinations', () => {
    expect(redirectedPath('/es/services/seo')).toBe('/es/services');
    expect(redirectedPath('/es/ads')).toBe('/es/amazon-ads');
  });
});