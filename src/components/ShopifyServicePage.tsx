import { ArrowRight, Check, Search, ShoppingCart, Megaphone, BarChart3 } from 'lucide-react';
import { Link } from '@/components/LocalizedLink';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { ShopifySection } from '@/components/ShopifySection';
import { ShopifyAuditForm } from '@/components/ShopifyAuditForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { remainingContent, remainingDefaults, remainingServices, remainingServicesEs, type ContentSection } from '@/data/shopifyRemainingContent';
import { SITE_URL, localizedPath } from '@/lib/seoRoutes';

const icons = [Search, ShoppingCart, Megaphone, BarChart3];
export function ShopifyContentSection({ section, muted }: { section: ContentSection; muted: boolean }) {
  return <ShopifySection title={section.title} intro={section.intro} id={section.id} muted={muted}>
    {section.paragraphs?.map(text => <p key={text} className="text-lg leading-relaxed text-muted-foreground max-w-4xl mb-6">{text}</p>)}
    {section.items && (section.format ? <div className={`grid gap-6 md:grid-cols-2 ${section.items.length === 3 ? 'lg:grid-cols-3' : ''}`}>
      {section.items.map(([title, text], i) => {
        const Icon = icons[i % icons.length];
        const content = <><h3 className="text-2xl tracking-normal mb-4">{title}</h3><p className="text-muted-foreground leading-relaxed">{text}</p></>;
        return section.format === 'cards' ? <Card key={title} className="rounded-lg"><CardContent className="p-7 md:p-8"><Icon className="h-8 w-8 text-primary mb-5" />{content}</CardContent></Card> : <div key={title} className="border-t-4 border-accent pt-6">{content}</div>;
      })}
    </div> : <ul className="grid gap-x-12 gap-y-6 md:grid-cols-2">{section.items.map(([title, text]) => <li key={title} className="flex gap-3 min-w-0"><Check className="h-5 w-5 text-primary mt-1 shrink-0" /><p className="leading-relaxed break-words min-w-0"><strong>{title}:</strong> {text}</p></li>)}</ul>)}
    {section.closing && <p className="mt-10 text-lg font-medium max-w-4xl">{section.closing}</p>}
    {section.links && <div className="flex flex-wrap gap-x-6 gap-y-3">{section.links.map(([label, path]) => <Link key={path} to={path} className="text-primary underline underline-offset-4 min-h-11 inline-flex items-center">{label}</Link>)}</div>}
  </ShopifySection>;
}

export function ShopifyServicePage({ service }: { service: keyof typeof remainingServices }) {
  const { language } = useLanguage();
  const c = remainingContent[service][language];
  const url = `${SITE_URL}${localizedPath(`/shopify-agency/${service}`, language)}`;
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Service', ...(language === 'es' ? remainingServicesEs[service] : remainingServices[service]), inLanguage: language, provider: { '@id': `${SITE_URL}/#organization` }, areaServed: 'US', url },
    { '@type': 'FAQPage', mainEntity: c.faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
  ] };
  return <Layout hideBottomCta>
    <SEO structuredData={schema} />
    <section className="bg-secondary py-16 md:py-20"><div className="container max-w-6xl">
      <nav aria-label={language === 'en' ? 'Breadcrumb' : 'Ruta de navegación'} className="mb-8 text-sm text-muted-foreground"><ol className="flex flex-wrap items-center gap-2">
        <li><Link to="/" className="hover:underline">{language === 'en' ? 'Home' : 'Inicio'}</Link></li><li aria-hidden="true">/</li><li><Link to="/shopify-agency" className="hover:underline">{language === 'en' ? 'Shopify Agency' : 'Agencia de Shopify'}</Link></li><li aria-hidden="true">/</li><li aria-current="page">{c.breadcrumb}</li>
      </ol></nav>
      <p className="text-primary font-semibold mb-5">{c.eyebrow}</p>
      <h1 className="max-w-5xl text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-normal leading-tight mb-7">{c.h1}</h1>
      <p className="max-w-4xl text-lg text-muted-foreground leading-relaxed mb-8">{c.intro}</p>
      <div className="flex flex-wrap gap-4"><Button asChild size="lg" className="h-auto min-h-12 px-6 py-3 whitespace-normal"><a href="#audit">{c.auditButton}<ArrowRight className="ml-2 h-5 w-5 shrink-0" /></a></Button><Button asChild variant="outline" size="lg" className="h-auto min-h-12 px-6 py-3 whitespace-normal"><a href={`#${c.secondaryAnchor}`}>{c.secondaryButton}</a></Button></div>
    </div></section>
    {c.sections.map((section, i) => <ShopifyContentSection key={section.title} section={section} muted={i % 2 === 1} />)}
    <ShopifySection title={language === 'en' ? 'Pricing' : 'Precios'} intro={c.pricingIntro} muted>
      {c.pricing && <div className="grid gap-6 md:grid-cols-2">{c.pricing.map(([title, text]) => <Card key={title} className="rounded-lg"><CardContent className="p-7 md:p-8"><h3 className="text-2xl tracking-normal mb-4">{title}</h3><p className="text-muted-foreground leading-relaxed">{text}</p></CardContent></Card>)}</div>}
      {c.pricingClosing && <p className="mt-7 text-muted-foreground">{c.pricingClosing}</p>}
    </ShopifySection>
    <ShopifySection title={language === 'en' ? 'Frequently Asked Questions' : 'Preguntas frecuentes'}><Accordion type="single" collapsible className="max-w-4xl [&_[role=region][data-state=closed]]:hidden">{c.faqs.map(([question, answer], i) => <AccordionItem key={question} value={`faq-${i}`}><AccordionTrigger className="text-left text-lg">{question}</AccordionTrigger><AccordionContent forceMount className="text-base leading-relaxed">{answer}</AccordionContent></AccordionItem>)}</Accordion></ShopifySection>
    <ShopifySection title={c.auditTitle} intro={c.auditIntro} id="audit" muted><div className="max-w-3xl"><ShopifyAuditForm defaultHelp={remainingDefaults[service]} /></div></ShopifySection>
  </Layout>;
}