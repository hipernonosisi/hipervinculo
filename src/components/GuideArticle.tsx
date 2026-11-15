import { type ReactNode } from 'react';
import { Link } from '@/components/LocalizedLink';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { type GuideSection } from '@/data/googleAdsShopifyGuideContent';

export function GuideArticle({ title, byline, intro, sections, children }: { title: string; byline: string; intro: string; sections: GuideSection[]; children: ReactNode }) {
  const { language } = useLanguage();
  return <Layout hideBottomCta><article className="container max-w-4xl py-16 md:py-20">
    <nav aria-label={language === 'en' ? 'Breadcrumb' : 'Ruta de navegación'} className="mb-8 text-sm text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">{language === 'en' ? 'Home' : 'Inicio'}</Link></li><li aria-hidden="true">/</li><li><Link to="/guides">{language === 'en' ? 'Guides' : 'Guías'}</Link></li><li aria-hidden="true">/</li><li aria-current="page">{language === 'en' ? 'Google Ads for Shopify' : 'Google Ads para Shopify'}</li></ol></nav>
    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-normal mb-6">{title}</h1>
    <p className="text-muted-foreground mb-10"><time dateTime="2026-11-14">{byline}</time></p>
    <p className="text-lg leading-relaxed mb-12">{intro}</p>
    <nav aria-label={language === 'en' ? 'Table of contents' : 'Índice'} className="border-y border-border py-8 mb-12"><h2 className="text-2xl mb-5">{language === 'en' ? 'Contents' : 'Índice'}</h2><ol className="space-y-2">{[...sections.map(({ id, title: label }) => [id, label]), ['faq', language === 'en' ? 'Frequently Asked Questions' : 'Preguntas frecuentes']].map(([id, label]) => <li key={id}><a href={`#${id}`} className="text-primary underline underline-offset-4 inline-flex min-h-11 items-center">{label}</a></li>)}</ol></nav>
    {sections.map(section => <section key={section.id} id={section.id} className="scroll-mt-28 mb-14"><h2 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-normal mb-6">{section.title}</h2>{section.paragraphs?.map(text => <p key={text} className="text-lg leading-relaxed mb-6">{text}</p>)}{section.items && (section.ordered ? <ol className="list-decimal pl-6 space-y-4 text-lg leading-relaxed">{section.items.map(text => <li key={text} className="pl-2">{text}</li>)}</ol> : <ul className="list-disc pl-6 space-y-4 text-lg leading-relaxed">{section.items.map(text => <li key={text} className="pl-2">{text}</li>)}</ul>)}{section.closing && <p className="text-lg leading-relaxed mt-6">{section.closing}</p>}{section.link && <p className="text-lg leading-relaxed mt-6">{section.link.prefix}<Link to={section.link.path} className="text-primary underline underline-offset-4">{section.link.label}</Link>.</p>}</section>)}
    {children}
  </article></Layout>;
}