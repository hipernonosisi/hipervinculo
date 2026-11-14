import { ArrowRight, Check, ShoppingCart, RefreshCw, MoveRight } from 'lucide-react';
import { Link } from '@/components/LocalizedLink';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { ShopifySection as Section } from '@/components/ShopifySection';
import { ShopifyAuditForm } from '@/components/ShopifyAuditForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { shopifyStoreDesignContent, storeDesignDefaultHelp } from '@/data/shopifyStoreDesignContent';
import { SITE_URL, localizedPath } from '@/lib/seoRoutes';

const icons = [ShoppingCart, RefreshCw, MoveRight];
const links = ['/shopify-agency', '/services/google-ads-management', '/services/tracking-attribution'];

export default function ShopifyStoreDesign() {
  const { language } = useLanguage();
  const c = shopifyStoreDesignContent[language];
  const url = `${SITE_URL}${localizedPath('/shopify-agency/store-design', language)}`;
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Service', name: 'Shopify Website Design and Redesign', serviceType: 'Shopify store design, redesign and migration', provider: { '@id': `${SITE_URL}/#organization` }, areaServed: 'US', url },
    { '@type': 'FAQPage', mainEntity: c.faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
  ] };
  return <Layout hideBottomCta>
    <SEO structuredData={schema} />
    <section className="bg-secondary py-16 md:py-20"><div className="container max-w-6xl">
      <nav aria-label={language === 'en' ? 'Breadcrumb' : 'Ruta de navegación'} className="mb-8 text-sm text-muted-foreground"><ol className="flex flex-wrap items-center gap-2">
        <li><Link to="/" className="hover:underline">{c.breadcrumbs[0]}</Link></li><li aria-hidden="true">/</li>
        <li><Link to="/shopify-agency" className="hover:underline">{c.breadcrumbs[1]}</Link></li><li aria-hidden="true">/</li>
        <li aria-current="page">{c.breadcrumbs[2]}</li>
      </ol></nav>
      <p className="text-primary font-semibold mb-5">{c.eyebrow}</p>
      <h1 className="max-w-5xl text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-normal leading-tight mb-7">{c.h1}</h1>
      <p className="max-w-4xl text-lg text-muted-foreground leading-relaxed mb-8">{c.intro}</p>
      <div className="flex flex-wrap gap-4">
        <Button asChild size="lg" className="h-auto min-h-12 px-6 py-3 whitespace-normal"><a href="#audit">{c.auditButton}<ArrowRight className="ml-2 h-5 w-5 shrink-0" /></a></Button>
        <Button asChild variant="outline" size="lg" className="h-auto min-h-12 px-6 py-3 whitespace-normal"><a href="#included">{c.includedButton}</a></Button>
      </div>
    </div></section>
    <Section title={c.waysTitle}><div className="grid gap-6 md:grid-cols-3">{c.ways.map(([title, text], i) => {
      const Icon = icons[i];
      return <Card key={title} className="rounded-lg"><CardContent className="p-7 md:p-8"><Icon className="h-8 w-8 text-primary mb-5" /><h3 className="text-2xl tracking-normal mb-4">{title}</h3><p className="text-muted-foreground leading-relaxed">{text}</p></CardContent></Card>;
    })}</div></Section>
    <Section title={c.includedTitle} intro={c.includedIntro} id="included" muted><ul className="grid gap-x-12 gap-y-6 md:grid-cols-2">{c.included.map(([title, text]) => <li key={title} className="flex gap-3"><Check className="h-5 w-5 text-primary mt-1 shrink-0" /><p className="leading-relaxed"><strong>{title}:</strong> {text}</p></li>)}</ul></Section>
    <Section title={c.whyTitle} intro={c.whyIntro}><div className="grid gap-8 md:grid-cols-3">{c.why.map(([title, text]) => <div key={title} className="border-t-4 border-accent pt-6"><h3 className="text-2xl tracking-normal mb-4">{title}</h3><p className="text-muted-foreground leading-relaxed">{text}</p></div>)}</div><p className="mt-10 text-lg font-medium max-w-4xl">{c.whyClosing}</p></Section>
    <Section title={c.processTitle} muted><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{c.steps.map(([title, text]) => <div key={title} className="border-t-4 border-accent pt-6"><h3 className="text-xl tracking-normal mb-4">{title}</h3><p className="text-muted-foreground leading-relaxed">{text}</p></div>)}</div></Section>
    <Section title={c.roofTitle} intro={c.roofIntro}><div className="flex flex-wrap gap-x-6 gap-y-3">{c.links.map((label, i) => <Link key={label} to={links[i]} className="text-primary underline underline-offset-4 min-h-11 inline-flex items-center">{label}</Link>)}</div></Section>
    <Section title={c.pricingTitle} intro={c.pricingIntro} muted><p className="font-semibold">{c.ownership}</p></Section>
    <Section title={c.faqTitle}><Accordion type="single" collapsible className="max-w-4xl [&_[role=region][data-state=closed]]:hidden">{c.faqs.map(([question, answer], i) => <AccordionItem key={question} value={`faq-${i}`}><AccordionTrigger className="text-left text-lg">{question}</AccordionTrigger><AccordionContent forceMount className="text-base leading-relaxed">{answer}</AccordionContent></AccordionItem>)}</Accordion></Section>
    <Section title={c.auditTitle} intro={c.auditIntro} id="audit" muted><div className="max-w-3xl"><ShopifyAuditForm defaultHelp={storeDesignDefaultHelp} /></div></Section>
  </Layout>;
}