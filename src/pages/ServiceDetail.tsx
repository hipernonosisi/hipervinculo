import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, X, Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/ui/motion';

type ServiceType = 'leadGen' | 'conversionWeb' | 'ecommerce' | 'amazon' | 'googleAds' | 'tracking' | 'customApps' | 'brandIdentity';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { t, language } = useLanguage();

  // Map slug to service content and type
  const getServiceInfo = (): { service: any; type: ServiceType } | null => {
    if (slug === 'lead-generation-systems' || slug === 'sistemas-generacion-leads') {
      return { service: t.homepage.serviceDetail.leadGen, type: 'leadGen' };
    }
    if (slug === 'conversion-website-development' || slug === 'desarrollo-web-conversion') {
      return { service: t.homepage.serviceDetail.conversionWeb, type: 'conversionWeb' };
    }
    if (slug === 'ecommerce-growth-partners' || slug === 'socios-crecimiento-ecommerce') {
      return { service: t.homepage.serviceDetail.ecommerce, type: 'ecommerce' };
    }
    if (slug === 'amazon-seller-services' || slug === 'servicios-vendedores-amazon') {
      return { service: t.homepage.serviceDetail.amazon, type: 'amazon' };
    }
    if (slug === 'google-ads-management' || slug === 'gestion-google-ads') {
      return { service: t.homepage.serviceDetail.googleAds, type: 'googleAds' };
    }
    if (slug === 'tracking-attribution' || slug === 'seguimiento-atribucion') {
      return { service: t.homepage.serviceDetail.tracking, type: 'tracking' };
    }
    if (slug === 'custom-enterprise-applications' || slug === 'aplicaciones-empresariales-personalizadas') {
      return { service: t.homepage.serviceDetail.customApps, type: 'customApps' };
    }
    if (slug === 'brand-identity-manual' || slug === 'manual-imagen-de-marca') {
      return { service: t.homepage.serviceDetail.brandIdentity, type: 'brandIdentity' };
    }
    return null;
  };

  const serviceInfo = getServiceInfo();

  if (!serviceInfo) {
    return <Navigate to="/services" replace />;
  }

  const { service, type } = serviceInfo;

  if (type === 'leadGen') {
    return (
      <Layout>
        <SEO
          title={service.title}
          description={service.heroSubtitle}
          url={`https://hipervinculo.net/services/${slug}`}
          type="service"
        />
        <section 
          className="relative py-28 md:py-36 overflow-hidden"
          style={{ backgroundColor: '#f8f9f5' }}
        >
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
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <Link 
                  to="/services" 
                  className="inline-flex items-center gap-2 text-accent hover:underline mb-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t.nav.services}
                </Link>
                <p className="text-accent font-semibold text-[15px] mb-4">{t.nav.services}</p>
                <h1 
                  className="text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.03em] mb-6"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.heroTitle}
                </h1>
                <p className="text-[18px] md:text-[20px] text-muted-foreground max-w-2xl leading-relaxed">
                  {service.heroSubtitle}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Core Problem Section */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-8 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800 }}
                >
                  {service.coreProblem.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-primary-foreground/80 mb-10">
                  {service.coreProblem.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="space-y-4 mb-12">
                  {service.coreProblem.points.map((point: string, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                      <p className="text-[17px] text-primary-foreground/90">{point}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <Card className="bg-white/10 border-0 rounded-2xl backdrop-blur-sm mb-10">
                  <CardContent className="p-8 md:p-10">
                    <h3 
                      className="text-[24px] md:text-[28px] text-white mb-4"
                      style={{ fontWeight: 800 }}
                    >
                      {service.coreProblem.solution}
                    </h3>
                    <p className="text-[16px] md:text-[17px] text-primary-foreground/80 leading-relaxed">
                      {service.coreProblem.explanation}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="text-center">
                  <h3 
                    className="text-[28px] md:text-[36px] text-white mb-3"
                    style={{ fontWeight: 800 }}
                  >
                    {service.coreProblem.principle}
                  </h3>
                  <p className="text-[16px] text-primary-foreground/70">
                    {service.coreProblem.principleNote}
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* What We Build Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-6 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.whatWeBuild.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-muted-foreground mb-10">
                  {service.whatWeBuild.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.whatWeBuild.items.map((item: string, index: number) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-4 p-5 rounded-xl bg-[#f8f9f5]"
                    >
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: '#8BC34A' }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-[16px] md:text-[17px] text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Entry Offer Section */}
        <section className="py-20 md:py-28 bg-[#f8f9f5]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-10 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.entryOffer.title}
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <Card className="border-2 rounded-3xl shadow-sm mb-6" style={{ borderColor: '#8BC34A' }}>
                  <CardContent className="p-8 md:p-10">
                    <div className="space-y-4">
                      <p className="text-[18px] md:text-[20px] text-foreground">
                        {service.entryOffer.website}
                      </p>
                      <p className="text-[18px] md:text-[20px] text-foreground">
                        {service.entryOffer.monthly}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <p className="text-[16px] text-muted-foreground text-center">
                  {service.entryOffer.note}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Who This Is For Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-6 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.whoFor.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-muted-foreground mb-10">
                  {service.whoFor.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="space-y-4">
                  {service.whoFor.items.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: '#8BC34A' }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-[17px] md:text-[18px] text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28" style={{ backgroundColor: '#8BC34A' }}>
          <div className="container">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <h2 
                className="text-[40px] md:text-[56px] lg:text-[64px] text-white mb-6 leading-[1.08] tracking-[-0.03em]"
                style={{ fontWeight: 800 }}
              >
                {service.cta.title}
              </h2>
              <p className="text-[18px] md:text-[20px] text-white/90 mb-10 leading-relaxed">
                {service.cta.description}
              </p>
              <Button asChild size="lg" className="rounded-full h-14 px-10 text-[16px] font-semibold shadow-lg bg-white text-foreground hover:bg-white/95">
                <Link to="/contact">
                  {service.cta.button}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </section>
      </Layout>
    );
  }

  // Render eCommerce layout
  if (type === 'ecommerce') {
    return (
      <Layout>
        <SEO
          title={service.title}
          description={service.heroSubtitle}
          url={`https://hipervinculo.net/services/${slug}`}
          type="service"
        />
        <section 
          className="relative py-28 md:py-36 overflow-hidden"
          style={{ backgroundColor: '#f8f9f5' }}
        >
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
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <Link 
                  to="/services" 
                  className="inline-flex items-center gap-2 text-accent hover:underline mb-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t.nav.services}
                </Link>
                <p className="text-accent font-semibold text-[15px] mb-4">{t.nav.services}</p>
                <h1 
                  className="text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.03em] mb-6"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.heroTitle}
                </h1>
                <p className="text-[18px] md:text-[20px] text-muted-foreground max-w-2xl leading-relaxed">
                  {service.heroSubtitle}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-8 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800 }}
                >
                  {service.coreProblem.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-primary-foreground/80 mb-10">
                  {service.coreProblem.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="space-y-4 mb-12">
                  {service.coreProblem.points.map((point: string, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                      <p className="text-[17px] text-primary-foreground/90">{point}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <Card className="bg-white/10 border-0 rounded-2xl backdrop-blur-sm">
                  <CardContent className="p-8 md:p-10">
                    <h3 
                      className="text-[24px] md:text-[28px] text-white mb-4"
                      style={{ fontWeight: 800 }}
                    >
                      {service.coreProblem.solution}
                    </h3>
                    <p className="text-[16px] md:text-[17px] text-primary-foreground/80 leading-relaxed">
                      {service.coreProblem.explanation}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* What We Manage Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-6 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.whatWeBuild.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-muted-foreground mb-10">
                  {service.whatWeBuild.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.whatWeBuild.items.map((item: string, index: number) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-4 p-5 rounded-xl bg-[#f8f9f5]"
                    >
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: '#8BC34A' }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-[16px] md:text-[17px] text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="py-20 md:py-28 bg-[#f8f9f5]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-10 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.approach.title}
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="grid md:grid-cols-2 gap-6">
                  {service.approach.items.map((item: { title: string; description: string }, index: number) => (
                    <Card key={index} className="border-0 rounded-2xl shadow-sm bg-white">
                      <CardContent className="p-6 md:p-8">
                        <h3 
                          className="text-[20px] md:text-[22px] mb-3"
                          style={{ fontWeight: 800, color: '#2d4a2d' }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-[15px] md:text-[16px] text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-10 leading-[1.1] tracking-[-0.02em] text-center"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.pricing.title}
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {service.pricing.models.map((model: { title: string; highlight: string; highlightLabel: string; description: string }, index: number) => (
                    <Card key={index} className={`border-2 rounded-3xl shadow-sm ${index === 0 ? 'border-accent' : ''}`} style={index === 0 ? { borderColor: '#8BC34A' } : {}}>
                      <CardContent className="p-8 md:p-10">
                        <h3 
                          className="text-[20px] md:text-[22px] mb-4"
                          style={{ fontWeight: 800, color: '#2d4a2d' }}
                        >
                          {model.title}
                        </h3>
                        <p className={`text-[40px] md:text-[48px] font-bold mb-1 ${index === 0 ? 'text-accent' : 'text-primary'}`}>
                          {model.highlight}
                        </p>
                        <p className="text-muted-foreground mb-4">
                          {model.highlightLabel}
                        </p>
                        <p className="text-[15px] md:text-[16px] text-muted-foreground leading-relaxed">
                          {model.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <p className="text-[16px] text-muted-foreground text-center">
                  {service.pricing.note}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Who This Is For Section */}
        <section className="py-20 md:py-28 bg-[#f8f9f5]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-6 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.whoFor.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-muted-foreground mb-10">
                  {service.whoFor.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="space-y-4">
                  {service.whoFor.items.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: '#8BC34A' }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-[17px] md:text-[18px] text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28" style={{ backgroundColor: '#8BC34A' }}>
          <div className="container">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <h2 
                className="text-[40px] md:text-[56px] lg:text-[64px] text-white mb-6 leading-[1.08] tracking-[-0.03em]"
                style={{ fontWeight: 800 }}
              >
                {service.cta.title}
              </h2>
              <p className="text-[18px] md:text-[20px] text-white/90 mb-10 leading-relaxed">
                {service.cta.description}
              </p>
              <Button asChild size="lg" className="rounded-full h-14 px-10 text-[16px] font-semibold shadow-lg bg-white text-foreground hover:bg-white/95">
                <Link to="/contact">
                  {service.cta.button}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </section>
      </Layout>
    );
  }

  // Render Amazon layout
  if (type === 'amazon') {
    return (
      <Layout>
        <SEO
          title={service.title}
          description={service.heroSubtitle}
          url={`https://hipervinculo.net/services/${slug}`}
          type="service"
        />
        <section 
          className="relative py-28 md:py-36 overflow-hidden"
          style={{ backgroundColor: '#f8f9f5' }}
        >
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
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <Link 
                  to="/services" 
                  className="inline-flex items-center gap-2 text-accent hover:underline mb-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t.nav.services}
                </Link>
                <p className="text-accent font-semibold text-[15px] mb-4">{t.nav.services}</p>
                <h1 
                  className="text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.03em] mb-6"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.heroTitle}
                </h1>
                <p className="text-[18px] md:text-[20px] text-muted-foreground max-w-2xl leading-relaxed">
                  {service.heroSubtitle}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-8 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800 }}
                >
                  {service.coreProblem.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-primary-foreground/80 mb-10">
                  {service.coreProblem.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="space-y-4 mb-12">
                  {service.coreProblem.points.map((point: string, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                      <p className="text-[17px] text-primary-foreground/90">{point}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <Card className="bg-white/10 border-0 rounded-2xl backdrop-blur-sm">
                  <CardContent className="p-8 md:p-10">
                    <h3 
                      className="text-[24px] md:text-[28px] text-white mb-4"
                      style={{ fontWeight: 800 }}
                    >
                      {service.coreProblem.solution}
                    </h3>
                    <p className="text-[16px] md:text-[17px] text-primary-foreground/80 leading-relaxed">
                      {service.coreProblem.explanation}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* What We Manage Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-6 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.whatWeBuild.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-muted-foreground mb-10">
                  {service.whatWeBuild.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.whatWeBuild.items.map((item: string, index: number) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-4 p-5 rounded-xl bg-[#f8f9f5]"
                    >
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: '#8BC34A' }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-[16px] md:text-[17px] text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="py-20 md:py-28 bg-[#f8f9f5]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-10 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.approach.title}
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="grid md:grid-cols-2 gap-6">
                  {service.approach.items.map((item: { title: string; description: string }, index: number) => (
                    <Card key={index} className="border-0 rounded-2xl shadow-sm bg-white">
                      <CardContent className="p-6 md:p-8">
                        <h3 
                          className="text-[20px] md:text-[22px] mb-3"
                          style={{ fontWeight: 800, color: '#2d4a2d' }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-[15px] md:text-[16px] text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Service Options Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-10 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.services.title}
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {service.services.options.map((option: { title: string; description: string }, index: number) => (
                    <Card key={index} className="border-2 rounded-2xl" style={{ borderColor: '#8BC34A' }}>
                      <CardContent className="p-6 md:p-8">
                        <h3 
                          className="text-[20px] md:text-[22px] mb-3"
                          style={{ fontWeight: 800, color: '#2d4a2d' }}
                        >
                          {option.title}
                        </h3>
                        <p className="text-[15px] md:text-[16px] text-muted-foreground leading-relaxed">
                          {option.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <p className="text-[14px] text-muted-foreground text-center">
                  {service.services.note}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Who This Is For Section */}
        <section className="py-20 md:py-28 bg-[#f8f9f5]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-6 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.whoFor.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-muted-foreground mb-10">
                  {service.whoFor.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="space-y-4">
                  {service.whoFor.items.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: '#8BC34A' }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-[17px] md:text-[18px] text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28" style={{ backgroundColor: '#8BC34A' }}>
          <div className="container">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <h2 
                className="text-[40px] md:text-[56px] lg:text-[64px] text-white mb-6 leading-[1.08] tracking-[-0.03em]"
                style={{ fontWeight: 800 }}
              >
                {service.cta.title}
              </h2>
              <p className="text-[18px] md:text-[20px] text-white/90 mb-10 leading-relaxed">
                {service.cta.description}
              </p>
              <Button asChild size="lg" className="rounded-full h-14 px-10 text-[16px] font-semibold shadow-lg bg-white text-foreground hover:bg-white/95">
                <Link to="/contact">
                  {service.cta.button}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </section>
      </Layout>
    );
  }

  // Render Google Ads layout
  if (type === 'googleAds') {
    return (
      <Layout>
        <SEO
          title={service.title}
          description={service.heroSubtitle}
          url={`https://hipervinculo.net/services/${slug}`}
          type="service"
        />
        {/* Hero Section */}
        <section 
          className="relative py-28 md:py-36 overflow-hidden"
          style={{ backgroundColor: '#f8f9f5' }}
        >
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
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <Link 
                  to="/services" 
                  className="inline-flex items-center gap-2 text-accent hover:underline mb-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t.nav.services}
                </Link>
                <p className="text-accent font-semibold text-[15px] mb-4">{t.nav.services}</p>
                <h1 
                  className="text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.03em] mb-6"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.heroTitle}
                </h1>
                <p className="text-[18px] md:text-[20px] text-muted-foreground max-w-2xl leading-relaxed">
                  {service.heroSubtitle}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-8 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800 }}
                >
                  {service.coreProblem.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-primary-foreground/80 mb-10">
                  {service.coreProblem.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="space-y-4 mb-12">
                  {service.coreProblem.points.map((point: string, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                      <p className="text-[17px] text-primary-foreground/90">{point}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <Card className="bg-white/10 border-0 rounded-2xl backdrop-blur-sm">
                  <CardContent className="p-8 md:p-10">
                    <h3 
                      className="text-[24px] md:text-[28px] text-white mb-4"
                      style={{ fontWeight: 800 }}
                    >
                      {service.coreProblem.solution}
                    </h3>
                    <p className="text-[16px] md:text-[17px] text-primary-foreground/80 leading-relaxed">
                      {service.coreProblem.explanation}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* What We Manage Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-6 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.whatWeBuild.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-muted-foreground mb-10">
                  {service.whatWeBuild.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.whatWeBuild.items.map((item: string, index: number) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-4 p-5 rounded-xl bg-[#f8f9f5]"
                    >
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: '#8BC34A' }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-[16px] md:text-[17px] text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Platforms Section */}
        <section className="py-20 md:py-28 bg-[#f8f9f5]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-10 leading-[1.1] tracking-[-0.02em] text-center"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.platforms.title}
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="flex flex-wrap justify-center gap-4">
                  {service.platforms.items.map((item: string, index: number) => (
                    <div 
                      key={index} 
                      className="px-6 py-3 rounded-full border-2 text-[15px] font-semibold"
                      style={{ borderColor: '#8BC34A', color: '#2d4a2d' }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-10 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.approach.title}
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="grid md:grid-cols-2 gap-6">
                  {service.approach.items.map((item: { title: string; description: string }, index: number) => (
                    <Card key={index} className="border-0 rounded-2xl shadow-sm bg-[#f8f9f5]">
                      <CardContent className="p-6 md:p-8">
                        <h3 
                          className="text-[20px] md:text-[22px] mb-3"
                          style={{ fontWeight: 800, color: '#2d4a2d' }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-[15px] md:text-[16px] text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Who This Is For Section */}
        <section className="py-20 md:py-28 bg-[#f8f9f5]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-6 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.whoFor.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-muted-foreground mb-10">
                  {service.whoFor.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="space-y-4">
                  {service.whoFor.items.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: '#8BC34A' }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-[17px] md:text-[18px] text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28" style={{ backgroundColor: '#8BC34A' }}>
          <div className="container">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <h2 
                className="text-[40px] md:text-[56px] lg:text-[64px] text-white mb-6 leading-[1.08] tracking-[-0.03em]"
                style={{ fontWeight: 800 }}
              >
                {service.cta.title}
              </h2>
              <p className="text-[18px] md:text-[20px] text-white/90 mb-10 leading-relaxed">
                {service.cta.description}
              </p>
              <Button asChild size="lg" className="rounded-full h-14 px-10 text-[16px] font-semibold shadow-lg bg-white text-foreground hover:bg-white/95">
                <Link to="/contact">
                  {service.cta.button}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </section>
      </Layout>
    );
  }

  // Render Tracking layout
  if (type === 'tracking') {
    return (
      <Layout>
        <SEO
          title={service.title}
          description={service.heroSubtitle}
          url={`https://hipervinculo.net/services/${slug}`}
          type="service"
        />
        {/* Hero Section */}
        <section 
          className="relative py-28 md:py-36 overflow-hidden"
          style={{ backgroundColor: '#f8f9f5' }}
        >
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
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <Link 
                  to="/services" 
                  className="inline-flex items-center gap-2 text-accent hover:underline mb-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t.nav.services}
                </Link>
                <p className="text-accent font-semibold text-[15px] mb-4">{t.nav.services}</p>
                <h1 
                  className="text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.03em] mb-6"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.heroTitle}
                </h1>
                <p className="text-[18px] md:text-[20px] text-muted-foreground max-w-2xl leading-relaxed">
                  {service.heroSubtitle}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-8 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800 }}
                >
                  {service.coreProblem.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-primary-foreground/80 mb-10">
                  {service.coreProblem.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="space-y-4 mb-12">
                  {service.coreProblem.points.map((point: string, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                      <p className="text-[17px] text-primary-foreground/90">{point}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <Card className="bg-white/10 border-0 rounded-2xl backdrop-blur-sm">
                  <CardContent className="p-8 md:p-10">
                    <h3 
                      className="text-[24px] md:text-[28px] text-white mb-4"
                      style={{ fontWeight: 800 }}
                    >
                      {service.coreProblem.solution}
                    </h3>
                    <p className="text-[16px] md:text-[17px] text-primary-foreground/80 leading-relaxed">
                      {service.coreProblem.explanation}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* What We Build Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-6 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.whatWeBuild.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-muted-foreground mb-10">
                  {service.whatWeBuild.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.whatWeBuild.items.map((item: string, index: number) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-4 p-5 rounded-xl bg-[#f8f9f5]"
                    >
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: '#8BC34A' }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-[16px] md:text-[17px] text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-20 md:py-28 bg-[#f8f9f5]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-10 leading-[1.1] tracking-[-0.02em] text-center"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.tools.title}
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="flex flex-wrap justify-center gap-4">
                  {service.tools.items.map((item: string, index: number) => (
                    <div 
                      key={index} 
                      className="px-6 py-3 rounded-full border-2 text-[15px] font-semibold"
                      style={{ borderColor: '#8BC34A', color: '#2d4a2d' }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-10 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.approach.title}
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="grid md:grid-cols-2 gap-6">
                  {service.approach.items.map((item: { title: string; description: string }, index: number) => (
                    <Card key={index} className="border-0 rounded-2xl shadow-sm bg-[#f8f9f5]">
                      <CardContent className="p-6 md:p-8">
                        <h3 
                          className="text-[20px] md:text-[22px] mb-3"
                          style={{ fontWeight: 800, color: '#2d4a2d' }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-[15px] md:text-[16px] text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Who This Is For Section */}
        <section className="py-20 md:py-28 bg-[#f8f9f5]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-6 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.whoFor.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-muted-foreground mb-10">
                  {service.whoFor.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="space-y-4">
                  {service.whoFor.items.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: '#8BC34A' }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-[17px] md:text-[18px] text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28" style={{ backgroundColor: '#8BC34A' }}>
          <div className="container">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <h2 
                className="text-[40px] md:text-[56px] lg:text-[64px] text-white mb-6 leading-[1.08] tracking-[-0.03em]"
                style={{ fontWeight: 800 }}
              >
                {service.cta.title}
              </h2>
              <p className="text-[18px] md:text-[20px] text-white/90 mb-10 leading-relaxed">
                {service.cta.description}
              </p>
              <Button asChild size="lg" className="rounded-full h-14 px-10 text-[16px] font-semibold shadow-lg bg-white text-foreground hover:bg-white/95">
                <Link to="/contact">
                  {service.cta.button}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </section>
      </Layout>
    );
  }

  // Render Custom Apps layout
  if (type === 'customApps') {
    return (
      <Layout>
        <SEO
          title={service.title}
          description={service.heroSubtitle}
          url={`https://hipervinculo.net/services/${slug}`}
          type="service"
        />
        <section 
          className="relative py-28 md:py-36 overflow-hidden"
          style={{ backgroundColor: '#f8f9f5' }}
        >
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
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <Link 
                  to="/services" 
                  className="inline-flex items-center gap-2 text-accent hover:underline mb-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t.nav.services}
                </Link>
                <p className="text-accent font-semibold text-[15px] mb-4">{t.nav.services}</p>
                <h1 
                  className="text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.03em] mb-6"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.heroTitle}
                </h1>
                <p className="text-[18px] md:text-[20px] text-muted-foreground max-w-2xl leading-relaxed">
                  {service.heroSubtitle}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Challenge Section */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-8 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800 }}
                >
                  {service.coreProblem.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-primary-foreground/80 mb-10">
                  {service.coreProblem.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="space-y-4 mb-12">
                  {service.coreProblem.points.map((point: string, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                      <p className="text-[17px] text-primary-foreground/90">{point}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <Card className="bg-white/10 border-0 rounded-2xl backdrop-blur-sm">
                  <CardContent className="p-8 md:p-10">
                    <h3 
                      className="text-[24px] md:text-[28px] text-white mb-4"
                      style={{ fontWeight: 800 }}
                    >
                      {service.coreProblem.solution}
                    </h3>
                    <p className="text-[16px] md:text-[17px] text-primary-foreground/80 leading-relaxed">
                      {service.coreProblem.explanation}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* What We Build Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-6 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.whatWeBuild.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-muted-foreground mb-10">
                  {service.whatWeBuild.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.whatWeBuild.items.map((item: string, index: number) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-4 p-5 rounded-xl bg-[#f8f9f5]"
                    >
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: '#8BC34A' }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-[16px] md:text-[17px] text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 md:py-28 bg-[#f8f9f5]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-10 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.useCases.title}
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="grid md:grid-cols-3 gap-6">
                  {service.useCases.items.map((item: { title: string; description: string }, index: number) => (
                    <Card key={index} className="border-0 rounded-2xl shadow-sm bg-white">
                      <CardContent className="p-6 md:p-8">
                        <h3 
                          className="text-[20px] md:text-[22px] mb-3"
                          style={{ fontWeight: 800, color: '#2d4a2d' }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-[15px] md:text-[16px] text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Key Capabilities Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-10 leading-[1.1] tracking-[-0.02em] text-center"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.features.title}
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="flex flex-wrap justify-center gap-4">
                  {service.features.items.map((item: string, index: number) => (
                    <div 
                      key={index} 
                      className="px-6 py-3 rounded-full border-2 text-[15px] font-semibold"
                      style={{ borderColor: '#8BC34A', color: '#2d4a2d' }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="py-20 md:py-28 bg-[#f8f9f5]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-10 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.approach.title}
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="grid md:grid-cols-2 gap-6">
                  {service.approach.items.map((item: { title: string; description: string }, index: number) => (
                    <Card key={index} className="border-0 rounded-2xl shadow-sm bg-white">
                      <CardContent className="p-6 md:p-8">
                        <h3 
                          className="text-[20px] md:text-[22px] mb-3"
                          style={{ fontWeight: 800, color: '#2d4a2d' }}
                        >
                          {item.title}
                        </h3>
                        <p className="text-[15px] md:text-[16px] text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Who This Is For Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-6 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.whoFor.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-muted-foreground mb-10">
                  {service.whoFor.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="space-y-4">
                  {service.whoFor.items.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: '#8BC34A' }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-[17px] md:text-[18px] text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28" style={{ backgroundColor: '#8BC34A' }}>
          <div className="container">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <h2 
                className="text-[40px] md:text-[56px] lg:text-[64px] text-white mb-6 leading-[1.08] tracking-[-0.03em]"
                style={{ fontWeight: 800 }}
              >
                {service.cta.title}
              </h2>
              <p className="text-[18px] md:text-[20px] text-white/90 mb-10 leading-relaxed">
                {service.cta.description}
              </p>
              <Button asChild size="lg" className="rounded-full h-14 px-10 text-[16px] font-semibold shadow-lg bg-white text-foreground hover:bg-white/95">
                <Link to="/contact">
                  {service.cta.button}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </section>
      </Layout>
    );
  }

  // Render Brand Identity Manual layout
  if (type === 'brandIdentity') {
    return (
      <Layout>
        <SEO
          title={service.heroTitle}
          description={service.heroSubtitle}
          url={`https://hipervinculo.net/services/${slug}`}
          type="service"
        />
        {/* Hero Section */}
        <section 
          className="relative py-28 md:py-36 overflow-hidden"
          style={{ backgroundColor: '#f8f9f5' }}
        >
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
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <Link 
                  to="/services" 
                  className="inline-flex items-center gap-2 text-accent hover:underline mb-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t.nav.services}
                </Link>
                <p className="text-accent font-semibold text-[15px] mb-4">{t.nav.services}</p>
                <h1 
                  className="text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.03em] mb-6"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.heroTitle}
                </h1>
                <p className="text-[18px] md:text-[20px] text-muted-foreground max-w-2xl leading-relaxed">
                  {service.heroSubtitle}
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Core Problem Section */}
        <section className="py-20 md:py-28 bg-primary text-primary-foreground">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-8 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800 }}
                >
                  {service.coreProblem.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-primary-foreground/80 mb-10">
                  {service.coreProblem.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="space-y-4 mb-12">
                  {service.coreProblem.points.map((point: string, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                      <p className="text-[17px] text-primary-foreground/90">{point}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <Card className="bg-white/10 border-0 rounded-2xl backdrop-blur-sm">
                  <CardContent className="p-8 md:p-10">
                    <h3 
                      className="text-[24px] md:text-[28px] text-white mb-4"
                      style={{ fontWeight: 800 }}
                    >
                      {service.coreProblem.solution}
                    </h3>
                    <p className="text-[16px] md:text-[17px] text-primary-foreground/80 leading-relaxed">
                      {service.coreProblem.explanation}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* What We Deliver Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-6 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.whatWeDeliver.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-muted-foreground mb-10">
                  {service.whatWeDeliver.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.whatWeDeliver.items.map((item: string, index: number) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-4 p-5 rounded-xl bg-[#f8f9f5]"
                    >
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: '#8BC34A' }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-[16px] md:text-[17px] text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Our Process Section */}
        <section className="py-20 md:py-28 bg-[#f8f9f5]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-10 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.process.title}
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="grid md:grid-cols-2 gap-6">
                  {service.process.items.map((item: { title: string; description: string }, index: number) => (
                    <Card key={index} className="border-0 rounded-2xl shadow-sm bg-white">
                      <CardContent className="p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[14px] font-extrabold flex-shrink-0"
                            style={{ backgroundColor: '#8BC34A' }}
                          >
                            {index + 1}
                          </div>
                          <h3 
                            className="text-[20px] md:text-[22px]"
                            style={{ fontWeight: 800, color: '#2d4a2d' }}
                          >
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-[15px] md:text-[16px] text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-10 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.includes.title}
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.includes.items.map((item: string, index: number) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-4 p-5 rounded-xl bg-[#f8f9f5]"
                    >
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: '#8BC34A' }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-[16px] md:text-[17px] text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Who This Is For Section */}
        <section className="py-20 md:py-28 bg-[#f8f9f5]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <h2 
                  className="text-[36px] md:text-[48px] lg:text-[56px] mb-6 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {service.whoFor.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-muted-foreground mb-10">
                  {service.whoFor.intro}
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="space-y-4">
                  {service.whoFor.items.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: '#8BC34A' }}
                      >
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-[17px] md:text-[18px] text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28" style={{ backgroundColor: '#8BC34A' }}>
          <div className="container">
            <AnimatedSection className="text-center max-w-3xl mx-auto">
              <h2 
                className="text-[40px] md:text-[56px] lg:text-[64px] text-white mb-6 leading-[1.08] tracking-[-0.03em]"
                style={{ fontWeight: 800 }}
              >
                {service.cta.title}
              </h2>
              <p className="text-[18px] md:text-[20px] text-white/90 mb-10 leading-relaxed">
                {service.cta.description}
              </p>
              <Button asChild size="lg" className="rounded-full h-14 px-10 text-[16px] font-semibold shadow-lg bg-white text-foreground hover:bg-white/95">
                <Link to="/contact">
                  {service.cta.button}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </section>
      </Layout>
    );
  }

  // Render Conversion Website layout
  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative py-28 md:py-36 overflow-hidden"
        style={{ backgroundColor: '#f8f9f5' }}
      >
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
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <Link 
                to="/services" 
                className="inline-flex items-center gap-2 text-accent hover:underline mb-8"
              >
                <ArrowLeft className="h-4 w-4" />
                {t.nav.services}
              </Link>
              <p className="text-accent font-semibold text-[15px] mb-4">{t.nav.services}</p>
              <h1 
                className="text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.03em] mb-6"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                {service.heroTitle}
              </h1>
              <p className="text-[18px] md:text-[20px] text-muted-foreground max-w-2xl leading-relaxed">
                {service.heroSubtitle}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* The Problem / Solution Section */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 
                className="text-[36px] md:text-[48px] lg:text-[56px] mb-8 leading-[1.1] tracking-[-0.02em]"
                style={{ fontWeight: 800 }}
              >
                {service.coreProblem.title}
              </h2>
              <p className="text-[18px] md:text-[20px] text-primary-foreground/80 mb-10">
                {service.coreProblem.intro}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <Card className="bg-white/10 border-0 rounded-2xl backdrop-blur-sm mb-10">
                <CardContent className="p-8 md:p-10">
                  <h3 
                    className="text-[24px] md:text-[28px] text-white mb-6"
                    style={{ fontWeight: 800 }}
                  >
                    {service.coreProblem.solution}
                  </h3>
                  <div className="space-y-4">
                    {service.coreProblem.points.map((point: string, index: number) => (
                      <div key={index} className="flex items-start gap-4">
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: '#8BC34A' }}
                        >
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <p className="text-[17px] text-primary-foreground/90">{point}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p 
                className="text-[24px] md:text-[28px] text-center text-white"
                style={{ fontWeight: 700 }}
              >
                {service.coreProblem.conclusion}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Includes Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 
                className="text-[36px] md:text-[48px] lg:text-[56px] mb-10 leading-[1.1] tracking-[-0.02em]"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                {service.includes.title}
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="grid md:grid-cols-2 gap-4">
                {service.includes.items.map((item: string, index: number) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 p-5 rounded-xl bg-[#f8f9f5]"
                  >
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: '#8BC34A' }}
                    >
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-[16px] md:text-[17px] text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#8BC34A' }}>
        <div className="container">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h2 
              className="text-[40px] md:text-[56px] lg:text-[64px] text-white mb-6 leading-[1.08] tracking-[-0.03em]"
              style={{ fontWeight: 800 }}
            >
              {service.cta.title}
            </h2>
            <p className="text-[18px] md:text-[20px] text-white/90 mb-10 leading-relaxed">
              {service.cta.description}
            </p>
            <Button asChild size="lg" className="rounded-full h-14 px-10 text-[16px] font-semibold shadow-lg bg-white text-foreground hover:bg-white/95">
              <Link to="/contact">
                {service.cta.button}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
