import { ShopifySection as Section } from '@/components/ShopifySection';
import { ArrowRight, ShoppingCart, Search, Megaphone, BarChart3, Check, X } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ShopifyAuditForm } from '@/components/ShopifyAuditForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { shopifyAgencyContent } from '@/data/shopifyAgencyContent';
import { localizedPath, SITE_URL } from '@/lib/seoRoutes';

const ids = ['store-design', 'google-ads', 'meta-ads', 'shopify-seo'];
const icons = [ShoppingCart, Search, Megaphone, BarChart3];
function Bullets({ items, negative = false }: { items: readonly string[]; negative?: boolean }) {
  const Icon = negative ? X : Check;
  return <ul className="space-y-4">{items.map(item => <li key={item} className="flex gap-3"><Icon className={`h-5 w-5 mt-1 shrink-0 ${negative ? 'text-muted-foreground' : 'text-primary'}`} /><span className="leading-relaxed">{item}</span></li>)}</ul>;
}
export default function ShopifyAgency() {
  const { language } = useLanguage();
  const c = shopifyAgencyContent[language];
  const url = `${SITE_URL}${localizedPath('/shopify-agency', language)}`;
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Service', name: 'Shopify Agency Services', serviceType: 'Shopify store design, Google Ads, Meta Ads and SEO', provider: { '@id': `${SITE_URL}/#organization` }, areaServed: 'US', url },
    { '@type': 'FAQPage', mainEntity: c.faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
  ] };
  return <Layout hideBottomCta>
    <SEO structuredData={schema} />
    <section className="bg-secondary py-16 md:py-20"><div className="container max-w-6xl">
      <p className="text-primary font-semibold mb-5">{c.eyebrow}</p>
      <h1 className="max-w-5xl text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-normal leading-tight mb-7">{c.h1}</h1>
      <p className="max-w-4xl text-lg text-muted-foreground leading-relaxed mb-8">{c.intro}</p>
      <div className="flex flex-wrap gap-4"><Button asChild size="lg" className="h-auto min-h-12 px-6 py-3 whitespace-normal"><a href="#audit">{c.auditButton}<ArrowRight className="ml-2 h-5 w-5 shrink-0" /></a></Button><Button asChild variant="outline" size="lg"><a href="#pricing">{c.pricingButton}</a></Button></div>
    </div></section>
    <section className="border-b border-border py-10"><div className="container max-w-6xl grid gap-6 md:grid-cols-3">{c.stats.map(([number, text]) => <div key={number} className="border-l-4 border-accent pl-6"><p className="text-4xl font-extrabold text-primary mb-2">{number}</p><p className="text-muted-foreground">{text}</p></div>)}</div></section>
    <Section title={c.servicesTitle} intro={c.servicesIntro}><div className="grid gap-6 md:grid-cols-2">{c.services.map(([title, text], i) => {
      const Icon = icons[i];
      return <Card id={ids[i]} key={title} className="rounded-lg scroll-mt-28"><CardContent className="p-7 md:p-8 flex flex-col h-full"><Icon className="h-8 w-8 text-primary mb-5" /><h3 className="text-2xl tracking-normal mb-4">{title}</h3><p className="text-muted-foreground leading-relaxed mb-5">{text}</p><Button asChild variant="link" className="self-start p-0 mt-auto"><a href={i === 0 ? localizedPath('/shopify-agency/store-design', language) : i === 1 ? localizedPath('/shopify-agency/google-ads', language) : i === 3 ? localizedPath('/shopify-agency/seo', language) : `#${ids[i]}`}>{c.learnMore}<ArrowRight className="ml-2 h-4 w-4" /></a></Button></CardContent></Card>;
    })}</div></Section>
    <Section title={c.trackingTitle} intro={c.trackingIntro} muted><Bullets items={c.tracking} /></Section>
    <Section title={c.profitTitle} intro={c.profitIntro}><div className="border border-border rounded-lg p-6 md:p-8 max-w-3xl"><p className="text-sm font-semibold text-muted-foreground mb-4">{c.exampleLabel}</p><dl>{c.example.map(([label, value]) => <div key={label} className="flex items-center justify-between gap-6 py-4 border-b border-border last:border-0"><dt>{label}</dt><dd className="text-3xl font-extrabold text-primary shrink-0">{value}</dd></div>)}</dl></div></Section>
    <Section title={c.workTitle} muted><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">{c.steps.map(([title, text]) => <div key={title} className="border-t-4 border-accent pt-6"><h3 className="text-xl tracking-normal mb-4">{title}</h3><p className="text-muted-foreground leading-relaxed">{text}</p></div>)}</div></Section>
    <Section title={c.fitTitle}><div className="grid gap-12 md:grid-cols-2"><div><h3 className="text-2xl tracking-normal mb-6">{c.goodTitle}</h3><Bullets items={c.good} /></div><div><h3 className="text-2xl tracking-normal mb-6">{c.badTitle}</h3><Bullets items={c.bad} negative /></div></div></Section>
    <Section title={c.pricingTitle} intro={c.pricingIntro} id="pricing" muted><div className="grid gap-6 md:grid-cols-3">{c.pricing.map(([title, text]) => <Card key={title} className="rounded-lg"><CardContent className="p-7"><h3 className="text-2xl tracking-normal mb-4">{title}</h3><p className="text-muted-foreground leading-relaxed">{text}</p></CardContent></Card>)}</div><p className="text-muted-foreground mt-7">{c.pricingNote}</p></Section>
    <Section title={c.whyTitle}><Bullets items={c.why} /></Section>
    <Section title={c.faqTitle} muted><Accordion type="single" collapsible className="max-w-4xl [&_[role=region][data-state=closed]]:hidden">{c.faqs.map(([question, answer], i) => <AccordionItem key={question} value={`faq-${i}`}><AccordionTrigger className="text-left text-lg">{question}</AccordionTrigger><AccordionContent forceMount className="text-base leading-relaxed">{answer}</AccordionContent></AccordionItem>)}</Accordion></Section>
    <Section title={c.auditTitle} intro={c.auditIntro} id="audit"><div className="max-w-3xl"><ShopifyAuditForm /></div></Section>
  </Layout>;
}