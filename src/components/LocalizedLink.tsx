import { forwardRef } from 'react';
import { Link as RouterLink, type LinkProps } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { isPublicPath, localizedPath } from '@/lib/seoRoutes';
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function LocalizedLink({ to, ...props }, ref) {
  const { language } = useLanguage();
  const local = typeof to === 'string' && to.startsWith('/') && isPublicPath(to.split(/[?#]/)[0]);
  const destination = local && typeof to === 'string' ? localizedPath(to.split(/[?#]/)[0], language) + to.slice(to.split(/[?#]/)[0].length) : to;
  return <RouterLink ref={ref} to={destination} {...props} />;
});
