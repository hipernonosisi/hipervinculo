import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isPublicPath, localizedPath, redirectedPath } from '@/lib/seoRoutes';

export function RouteNormalizer() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    let path = redirectedPath(location.pathname);
    const query = new URLSearchParams(location.search);
    const language = query.get('lang');
    if ((language === 'es' || language === 'en') && isPublicPath(path)) {
      path = localizedPath(path, language);
      query.delete('lang');
    }
    const search = query.toString();
    const destination = `${path}${search ? `?${search}` : ''}${location.hash}`;
    if (destination !== `${location.pathname}${location.search}${location.hash}`) navigate(destination, { replace: true });
  }, [location, navigate]);
  return null;
}
