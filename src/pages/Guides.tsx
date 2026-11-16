import { ArrowRight } from 'lucide-react';
import { Link } from '@/components/LocalizedLink';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { guidesContent } from '@/data/guidesContent';
import { localizedPath, SITE_URL } from '@/lib/seoRoutes';
import { preferredSource, PREFERRED_SOURCE_URL } from '@/data/preferredSource';

export default function Guides() {
  const { language } = useLanguage();
  const c = guidesContent[language];
  const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: c.h1,
    url: `${SITE_URL}${localizedPath('/guides', language)}`, inLanguage: language,
    hasPart: [{ '@type': 'Article', headline: c.title, url: `${SITE_URL}${localizedPath('/guides/google-ads-for-shopify', language)}` }],
  };
  return <Layout hideBottomCta>
    <SEO structuredData={schema} />
    <main className="container max-w-4xl py-16 md:py-20">
      <nav aria-label={language === 'en' ? 'Breadcrumb' : 'Ruta de navegación'} className="mb-8 text-sm text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">{language === 'en' ? 'Home' : 'Inicio'}</Link></li><li aria-hidden="true">/</li><li aria-current="page">{c.eyebrow}</li></ol></nav>
      <p className="text-primary font-semibold mb-5">{c.eyebrow}</p>
      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-normal mb-6">{c.h1}</h1>
      <p className="text-lg leading-relaxed mb-12">{c.intro}</p>
      <Card className="rounded-lg mb-12"><CardContent className="p-7 md:p-8">
        <h2 className="text-2xl md:text-3xl font-extrabold leading-tight tracking-normal mb-5">{c.title}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-5">{c.summary}</p>
        <Button asChild variant="link" className="px-0 min-h-11 whitespace-normal h-auto text-base"><Link to="/guides/google-ads-for-shopify">{c.read}<ArrowRight className="ml-2 h-4 w-4 shrink-0" /></Link></Button>
      </CardContent></Card>
      <p className="text-lg leading-relaxed">{c.closing}<Link to="/shopify-agency" className="text-primary underline underline-offset-4">{c.services}</Link></p>
      <p className="text-lg leading-relaxed mt-8">{preferredSource[language].prompt}<a href={PREFERRED_SOURCE_URL} target="_blank" rel="noopener" className="text-primary underline underline-offset-4">{preferredSource[language].link}</a>.</p>
    </main>
  </Layout>;
}