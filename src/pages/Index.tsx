import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Shield, CheckCircle, Users, BarChart3, Target, Zap, LineChart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

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
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-light-green to-background py-20 md:py-32">
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t.hero.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to="/audit">{t.hero.cta1} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/services">{t.hero.cta2}</Link>
                </Button>
              </div>
            </div>

            {/* Metrics Card */}
            <div className="relative">
              <Card className="bg-card shadow-xl border-0">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-accent/10">
                        <TrendingUp className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.metrics.revenueGrowth}</p>
                        <p className="text-3xl font-bold text-accent">+250%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-primary/10">
                        <BarChart3 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.metrics.roasImprovement}</p>
                        <p className="text-3xl font-bold text-primary">+180%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Proven Results */}
      <section className="py-16 bg-secondary/50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{t.provenResults.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {provenResults.map((result, index) => (
              <div key={index} className="flex items-center gap-3 bg-background rounded-lg p-4 shadow-sm">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="font-medium">{result}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.services.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.services.subtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="p-3 rounded-lg bg-accent/10 w-fit mb-4 group-hover:bg-accent/20 transition-colors">
                    <service.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary-foreground">{t.different.title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-primary-foreground/10 border-0">
              <CardHeader>
                <div className="p-3 rounded-lg bg-accent w-fit mb-4">
                  <Users className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-2xl text-primary-foreground">{t.different.experts.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-primary-foreground/80">
                  {t.different.experts.description}
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-primary-foreground/10 border-0">
              <CardHeader>
                <div className="p-3 rounded-lg bg-accent w-fit mb-4">
                  <Shield className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-2xl text-primary-foreground">{t.different.transparency.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg text-primary-foreground/80">
                  {t.different.transparency.description}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Playbook Download */}
      <section className="py-20">
        <div className="container">
          <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-0 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">{t.playbook.title}</h2>
                <p className="text-lg text-muted-foreground">{t.playbook.description}</p>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  {t.playbook.cta} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-accent to-primary rounded-lg shadow-2xl flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">A+</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Performance Guarantee */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium">
              <Shield className="h-4 w-4" />
              {t.guarantee.subtitle}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">{t.guarantee.title}</h2>
            <p className="text-lg text-muted-foreground">{t.guarantee.description}</p>
            <div className="inline-flex flex-col items-center p-8 bg-background rounded-2xl shadow-lg">
              <span className="text-5xl font-bold text-accent">{t.guarantee.stat}</span>
              <span className="text-muted-foreground mt-2">{t.guarantee.statLabel}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.pricing.title}</h2>
            <p className="text-lg text-muted-foreground">{t.pricing.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
              <CardHeader>
                <CardTitle className="text-2xl">{t.pricing.retainer.title}</CardTitle>
                <CardDescription>{t.pricing.retainer.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-3xl font-bold text-accent">{t.pricing.retainer.price}</p>
                <ul className="space-y-3">
                  {t.pricing.retainer.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to="/audit">{t.pricing.retainer.cta}</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <CardHeader>
                <CardTitle className="text-2xl">{t.pricing.partnership.title}</CardTitle>
                <CardDescription>{t.pricing.partnership.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-3xl font-bold text-primary">{t.pricing.partnership.price}</p>
                <ul className="space-y-3">
                  {t.pricing.partnership.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/pricing">{t.pricing.partnership.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Link to="/pricing" className="text-accent hover:text-accent/80 font-medium inline-flex items-center gap-1">
              {t.pricing.viewAll} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <p className="text-center text-muted-foreground mb-8">{t.partners.title}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((partner) => (
              <div key={partner} className="text-xl font-semibold text-muted-foreground/60 hover:text-muted-foreground transition-colors">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.faq.title}</h2>
          <Accordion type="single" collapsible className="w-full">
            {t.faq.questions.slice(0, 5).map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="text-center mt-8">
            <Link to="/faqs" className="text-accent hover:text-accent/80 font-medium inline-flex items-center gap-1">
              {t.nav.faqs} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">{t.cta.title}</h2>
            <p className="text-lg text-primary-foreground/80">{t.cta.subtitle}</p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/audit">{t.cta.button} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
