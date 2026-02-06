import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/ui/motion';

export default function FAQs() {
  const { t, language } = useLanguage();

  return (
    <Layout>
      <SEO
        title="FAQs"
        description={language === 'en' 
          ? "Find answers to frequently asked questions about our digital marketing services, pricing, and processes."
          : "Encuentra respuestas a preguntas frecuentes sobre nuestros servicios de marketing digital, precios y procesos."
        }
        url="https://hipervinculo.net/faqs"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": t.faq.questions.map((faq: { q: string; a: string }) => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.a
            }
          }))
        }}
      />
      <section 
        className="relative py-28 md:py-36 overflow-hidden"
        style={{ backgroundColor: '#f8f9f5' }}
      >
        {/* Diagonal pattern background */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #2d4a2d 0px,
              #2d4a2d 1px,
              transparent 1px,
              transparent 12px
            )`
          }}
        />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <AnimatedSection>
              <p className="text-accent font-semibold text-[15px] mb-4">FAQs</p>
              <h1 
                className="text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.03em] mb-6"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                {t.faqsPage.title}
              </h1>
              <p className="text-[15px] md:text-[16px] text-muted-foreground max-w-2xl mx-auto">
                {t.faqsPage.subtitle}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20">
        <div className="container max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {t.faq.questions.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#8BC34A' }}>
        <div className="container text-center">
          <AnimatedSection className="max-w-3xl mx-auto space-y-8">
            <h2 
              className="text-[40px] md:text-[56px] lg:text-[64px] text-white leading-[1.05] tracking-[-0.03em]"
              style={{ fontWeight: 800 }}
            >
              {t.faqsPage.stillQuestions.title}
            </h2>
            <p className="text-[18px] md:text-[20px] text-white/80 leading-relaxed max-w-2xl mx-auto">
              {t.faqsPage.stillQuestions.subtitle}
            </p>
            <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/95 rounded-full h-14 px-10 text-[16px] font-semibold shadow-lg mt-4">
              <Link to="/contact">{t.faqsPage.stillQuestions.cta} <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
