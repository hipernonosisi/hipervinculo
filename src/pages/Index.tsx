import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, CheckCircle, Users, BarChart3, Target, Zap, LineChart, ShoppingCart, Download, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection, StaggerContainer, StaggerItem, FloatingCard, AnimatedCounter } from '@/components/ui/motion';

export default function Index() {
  const { t } = useLanguage();

  const services = [
    { icon: Target, title: t.services.paidMedia.title, description: t.services.paidMedia.description },
    { icon: Zap, title: t.services.creative.title, description: t.services.creative.description },
    { icon: TrendingUp, title: t.services.cro.title, description: t.services.cro.description },
    { icon: BarChart3, title: t.services.analytics.title, description: t.services.analytics.description },
    { icon: ShoppingCart, title: t.services.amazon.title, description: t.services.amazon.description },
    { icon: LineChart, title: t.services.strategy.title, description: t.services.strategy.description },
  ];

  const provenResults = [
    t.provenResults.stat1,
    t.provenResults.stat2,
    t.provenResults.stat3,
    t.provenResults.stat4,
  ];

  const partners = ['Google', 'Meta', 'Amazon', 'Shopify', 'Helium 10', 'Elevar', 'MNTN', 'Polar'];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary py-20 md:py-32">
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left" duration={0.8}>
              <div className="space-y-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-navy">
                  {t.hero.title}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                  {t.hero.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full">
                    <Link to="/audit">{t.hero.cta1} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full">
                    <Link to="/services">{t.hero.cta2}</Link>
                  </Button>
                </div>
              </div>
            </AnimatedSection>

            {/* Metrics Card */}
            <FloatingCard className="relative">
              <Card className="bg-card shadow-xl border">
                <CardContent className="p-8">
                  <p className="text-sm font-medium text-muted-foreground mb-6">Growth Metrics</p>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">{t.metrics.revenueGrowth}</p>
                        <p className="text-2xl font-bold text-accent">
                          <AnimatedCounter value="+250%" />
                        </p>
                      </div>
                      <div className="h-2 bg-secondary rounded-full">
                        <div className="h-2 bg-primary rounded-full w-4/5"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">{t.metrics.roasImprovement}</p>
                        <p className="text-2xl font-bold text-accent">
                          <AnimatedCounter value="+180%" />
                        </p>
                      </div>
                      <div className="h-2 bg-secondary rounded-full">
                        <div className="h-2 bg-accent rounded-full w-3/5"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FloatingCard>
          </div>
        </div>
      </section>

      {/* Proven Results - Dark Green Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">{t.provenResults.title}</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedSection direction="left" delay={0.1}>
              <div>
                <h3 className="text-xl font-bold text-accent mb-6">Lead Generation Systems</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-primary-foreground/90">Built inbound pipelines for service businesses generating consistent calls and form inquiries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-primary-foreground/90">Long-term retention: many partners stay 5–8 years</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-primary-foreground/90">Conversion-focused websites designed to capture demand</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2}>
              <div>
                <h3 className="text-xl font-bold text-accent mb-6">eCommerce Growth Partners</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-primary-foreground/90">Over $92M in tracked sales across Meta, Google, Amazon, TikTok</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-primary-foreground/90">10+ years managing high-growth Shopify campaigns</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-primary-foreground/90">Performance optimization across multiple categories</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.3} className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full border-0">
              <Link to="/audit">Get a Free Audit</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* What Makes Us Different - Lime Section */}
      <section className="py-20 bg-accent">
        <div className="container">
          <AnimatedSection className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-white">What Makes </span>
              <span className="text-primary">Us</span>
              <span className="text-white"> Different?</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection className="text-center mb-12">
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              We're not just another agency. We are a true growth partner, deeply invested in your success.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection direction="left" delay={0.1}>
              <Card className="bg-white/20 border-0 h-full backdrop-blur-sm">
                <CardHeader>
                  <div className="p-3 rounded-lg bg-white/20 w-fit mb-4">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">{t.different.experts.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg text-white/80">
                    {t.different.experts.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2}>
              <Card className="bg-white/20 border-0 h-full backdrop-blur-sm">
                <CardHeader>
                  <div className="p-3 rounded-lg bg-white/20 w-fit mb-4">
                    <ShieldCheck className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">{t.different.transparency.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg text-white/80">
                    {t.different.transparency.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.3} className="text-center mt-12">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full">
              <Link to="/contact">Book a Free Consultation <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Performance Guarantee - Dark Green Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
                  <Shield className="h-4 w-4" />
                  Our Promise
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Our Performance Guarantee</h2>
                <p className="text-accent italic font-medium">For eCommerce Growth Partners</p>
                <p className="text-lg text-primary-foreground/80">
                  We believe in our ability to deliver results. If you qualify for our performance-based model and we don't meet the minimum agreed-upon performance target (typically 2.5 Net ROAS), you don't pay our management fee. It's that simple.
                </p>
                <p className="font-semibold text-white">We succeed only when you succeed.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2}>
              <Card className="bg-white border-0 shadow-2xl">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <ShieldCheck className="h-16 w-16 mx-auto text-accent" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-2">No Results, No Fee.</h3>
                  <p className="text-muted-foreground">That's our commitment.</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Transparent Pricing */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.pricing.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our pricing is designed to align with your success. No hidden fees, just a partnership focused on growth.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Card className="max-w-3xl mx-auto border-2 border-accent bg-white">
              <CardContent className="p-8 md:p-12 text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Three Growth Models. One Goal: Your Success.</h3>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Whether you need lead generation infrastructure, performance-based eCommerce growth, or strategic partnership — we have a model built for your stage and goals.
                </p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full">
                  <Link to="/pricing">Explore Pricing Options <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Playbook Download */}
      <section className="py-20 bg-white">
        <div className="container">
          <AnimatedSection>
            <Card className="bg-secondary border-0 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold">{t.playbook.title}</h2>
                  <p className="text-lg text-muted-foreground">{t.playbook.description}</p>
                  <Button 
                    asChild 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full"
                  >
                    <a href="/downloads/advantage-plus-growth-playbook.pdf" download>
                      {t.playbook.cta} <Download className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <div className="relative">
                  <div className="aspect-[4/3] bg-primary rounded-lg shadow-2xl flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">A+</span>
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white">
        <div className="container">
          <AnimatedSection>
            <p className="text-center text-muted-foreground mb-8">{t.partners.title}</p>
          </AnimatedSection>
          <StaggerContainer className="flex flex-wrap justify-center items-center gap-8 md:gap-12" staggerDelay={0.05}>
            {partners.map((partner) => (
              <StaggerItem key={partner}>
                <div className="text-xl font-semibold text-muted-foreground/60 hover:text-muted-foreground transition-colors">
                  {partner}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">{t.faq.title}</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              {t.faq.questions.slice(0, 5).map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
          <AnimatedSection delay={0.3} className="text-center mt-8">
            <Link to="/faqs" className="text-accent hover:text-accent/80 font-medium inline-flex items-center gap-1">
              {t.nav.faqs} <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA - Lime Section */}
      <section className="py-20 bg-accent">
        <div className="container text-center">
          <AnimatedSection className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">{t.cta.title}</h2>
            <p className="text-lg text-white/90">{t.cta.subtitle}</p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full">
              <Link to="/audit">{t.cta.button} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
