import { GuideArticle } from '@/components/GuideArticle';
import { SEO } from '@/components/SEO';
import { Link } from '@/components/LocalizedLink';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { googleAdsShopifyGuideContent, guideDates } from '@/data/googleAdsShopifyGuideContent';
import { SITE_URL, localizedPath, routeMeta } from '@/lib/seoRoutes';

export default function GoogleAdsShopifyGuide() {
  const { language } = useLanguage();
  const c = googleAdsShopifyGuideContent[language];
  const url = `${SITE_URL}${localizedPath('/guides/google-ads-for-shopify', language)}`;
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: c.h1, description: routeMeta('/guides/google-ads-for-shopify', language)?.[1], author: { '@id': `${SITE_URL}/#organization` }, publisher: { '@id': `${SITE_URL}/#organization` }, datePublished: guideDates.published, dateModified: guideDates.modified, inLanguage: language, mainEntityOfPage: url },
    { '@type': 'FAQPage', mainEntity: c.faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
  ] };
  return <><SEO type="article" structuredData={schema} /><GuideArticle title={c.h1} byline={c.byline} intro={c.intro} sections={c.sections}>
    <Card className="rounded-lg mb-14"><CardContent className="p-7 md:p-8"><h3 className="text-2xl mb-4">{c.ctaTitle}</h3><p className="text-lg leading-relaxed mb-6">{c.ctaText}</p><div className="flex flex-wrap items-center gap-5"><Button asChild size="lg" className="h-auto min-h-12 whitespace-normal"><Link to="/shopify-agency/google-ads">{c.ctaButton}</Link></Button><Link to="/shopify-agency#audit" className="text-primary underline underline-offset-4 min-h-11 inline-flex items-center">{c.auditLink}</Link></div></CardContent></Card>
    <section id="faq" className="scroll-mt-28"><h2 className="text-3xl md:text-4xl font-extrabold mb-6">{language === 'en' ? 'Frequently Asked Questions' : 'Preguntas frecuentes'}</h2><Accordion type="single" collapsible className="[&_[role=region][data-state=closed]]:hidden">{c.faqs.map(([question, answer], i) => <AccordionItem key={question} value={`faq-${i}`}><AccordionTrigger className="text-left text-lg">{question}</AccordionTrigger><AccordionContent forceMount className="text-base leading-relaxed">{answer}</AccordionContent></AccordionItem>)}</Accordion></section>
  </GuideArticle></>;
}