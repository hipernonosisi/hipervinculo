import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { AnimatedSection } from '@/components/ui/motion';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Portfolio() {
  const { language } = useLanguage();

  const t = {
    en: {
      seoTitle: 'Our Work — Web Development Portfolio',
      seoDesc: 'Explore websites and digital platforms we have built for businesses across multiple industries.',
      label: 'Our Work',
      title: 'Recent\nProjects',
      subtitle: 'A selection of websites and digital platforms we have built for clients across different industries.',
      ctaTitle: 'Want a Website Like These?',
      ctaText: 'Get a custom preview of what your new website\ncould look like — at no cost.',
      ctaButton: 'Get Your Free Preview',
    },
    es: {
      seoTitle: 'Nuestro Trabajo — Portafolio de Desarrollo Web',
      seoDesc: 'Explora los sitios web y plataformas digitales que hemos construido para negocios de múltiples industrias.',
      label: 'Nuestro Trabajo',
      title: 'Proyectos\nRecientes',
      subtitle: 'Una selección de sitios web y plataformas digitales que hemos construido para clientes de distintas industrias.',
      ctaTitle: '¿Quieres un Sitio Web Como Estos?',
      ctaText: 'Obtén una vista previa personalizada de cómo podría verse\ntu nuevo sitio web — sin costo.',
      ctaButton: 'Obtén Tu Vista Previa Gratis',
    },
  };

  const c = t[language];

  return (
    <Layout>
      <SEO title={c.seoTitle} description={c.seoDesc} url="https://hipervinculo.net/portfolio" />

      {/* Hero */}
      <section className="relative py-28 md:py-36 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #2d4a2d 0px, #2d4a2d 1px, transparent 1px, transparent 12px)`,
          }}
        />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <AnimatedSection>
              <p className="text-accent font-semibold text-[15px] mb-4">{c.label}</p>
              <h1
                className="text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.03em] mb-6 whitespace-pre-line"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                {c.title}
              </h1>
              <p className="text-[15px] md:text-[16px] text-muted-foreground max-w-4xl mx-auto leading-relaxed whitespace-nowrap">
                {c.subtitle}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <PortfolioGrid />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#2d4a2d' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2
                className="text-[40px] md:text-[52px] lg:text-[60px] text-white leading-[1.1] tracking-[-0.02em] mb-6"
                style={{ fontWeight: 800 }}
              >
                {c.ctaTitle}
              </h2>
              <p className="text-[18px] md:text-[20px] text-white/80 max-w-2xl mx-auto leading-relaxed mb-10 whitespace-pre-line">
                {c.ctaText}
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-foreground hover:bg-white/90 rounded-full px-8 py-6 text-[16px] font-semibold h-auto"
              >
                <Link to="/preview">
                  {c.ctaButton}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
}
