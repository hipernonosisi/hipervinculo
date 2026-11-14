import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { SITE_URL, basePath, businessSchema, isPublicPath, localizedPath, routeMeta } from '@/lib/seoRoutes';
import logo from '@/assets/logo-hipervinculo.png';
interface SEOProps { title?: string; description?: string; keywords?: string; image?: string; url?: string; type?: 'website' | 'article' | 'service'; noIndex?: boolean; structuredData?: object; notFound?: boolean; }
export function SEO({ title, description, keywords, image, type = 'website', noIndex = false, structuredData, notFound = false }: SEOProps) {
  const { language } = useLanguage();
  const { pathname } = useLocation();
  const meta = routeMeta(pathname, language);
  const finalTitle = meta?.[0] ?? (title ? `${title.replace(/\s*\| Hipervínculo$/, '')} | Hipervínculo` : 'Hipervínculo');
  const finalDescription = meta?.[1] ?? description ?? 'Hipervínculo: Google Ads, Amazon Ads, Meta Ads and conversion websites in Weston, Florida.';
  const canonical = `${SITE_URL}${isPublicPath(pathname) ? localizedPath(pathname, language) : pathname}`;
  const noindex = noIndex || notFound || ['/book', '/audit', '/preview', '/404'].includes(basePath(pathname)) || pathname.includes('/proposal/') || (typeof window !== 'undefined' && window.location.hostname.endsWith('lovable.app'));
  const logoUrl = logo.startsWith('https://') ? logo : `${SITE_URL}${logo}`;
  const segments = basePath(pathname).split('/').filter(Boolean);
  const crumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: language === 'es' ? 'Inicio' : 'Home', item: `${SITE_URL}${localizedPath('/', language)}` },
    ...segments.map((part, i) => ({ '@type': 'ListItem', position: i + 2, name: part === 'shopify-agency' ? (language === 'en' ? 'Shopify Agency' : 'Agencia de Shopify') : part === 'store-design' && segments[0] === 'shopify-agency' ? (language === 'en' ? 'Store Design' : 'Diseño de tiendas') : i === segments.length - 1 ? finalTitle.split('|')[0].trim() : part, item: `${SITE_URL}${localizedPath('/' + segments.slice(0, i + 1).join('/'), language)}` })),
  ] };
  return <Helmet>
    <html lang={language} />
    <title>{finalTitle}</title>
    <meta name="description" content={finalDescription} />
    {keywords && <meta name="keywords" content={keywords} />}
    <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />
    {!notFound && <link rel="canonical" href={canonical} />}
    {!notFound && isPublicPath(pathname) && ['en', 'es', 'x-default'].map(lang => <link key={lang} rel="alternate" hrefLang={lang} href={`${SITE_URL}${localizedPath(pathname, lang === 'es' ? 'es' : 'en')}`} />)}
    <meta property="og:type" content={type === 'service' ? 'website' : type} />
    <meta property="og:url" content={canonical} />
    <meta property="og:title" content={finalTitle} />
    <meta property="og:description" content={finalDescription} />
    <meta property="og:locale" content={language === 'es' ? 'es_US' : 'en_US'} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={finalTitle} />
    <meta name="twitter:description" content={finalDescription} />
    {image && <meta property="og:image" content={image} />}
    {image && <meta name="twitter:image" content={image} />}
    {!notFound && <script type="application/ld+json">{JSON.stringify(businessSchema(logoUrl))}</script>}
    {!notFound && segments.length > 0 && <script type="application/ld+json">{JSON.stringify(crumbs)}</script>}
    {!notFound && structuredData && <script type="application/ld+json">{JSON.stringify(structuredData)}</script>}
  </Helmet>;
}
