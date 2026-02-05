import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Pricing() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-background via-light-green to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{t.pricingPage.title}</h1>
            <p className="text-xl text-muted-foreground">{t.pricingPage.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Lead Gen */}
            <Card className="relative overflow-hidden flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1 bg-muted-foreground"></div>
              <CardHeader className="flex-grow-0">
                <CardTitle className="text-2xl">{t.pricing.leadGen.title}</CardTitle>
                <CardDescription>{t.pricing.leadGen.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 flex-grow flex flex-col">
                <div>
                  <p className="text-3xl font-bold text-primary">{t.pricing.leadGen.setupPrice}</p>
                  <p className="text-lg text-muted-foreground">+ {t.pricing.leadGen.monthlyPrice}</p>
                </div>
                <ul className="space-y-3 flex-grow">
                  {t.pricing.leadGen.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full mt-auto">
                  <Link to="/audit">{t.pricing.leadGen.cta}</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Performance Retainer */}
            <Card className="relative overflow-hidden flex flex-col border-2 border-accent">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
              <CardHeader className="flex-grow-0">
                <CardTitle className="text-2xl">{t.pricing.retainer.title}</CardTitle>
                <CardDescription>{t.pricing.retainer.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 flex-grow flex flex-col">
                <p className="text-3xl font-bold text-accent">{t.pricing.retainer.price}</p>
                <ul className="space-y-3 flex-grow">
                  {t.pricing.retainer.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-auto">
                  <Link to="/audit">{t.pricing.retainer.cta}</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Growth Partnership */}
            <Card className="relative overflow-hidden flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
              <CardHeader className="flex-grow-0">
                <CardTitle className="text-2xl">{t.pricing.partnership.title}</CardTitle>
                <CardDescription>{t.pricing.partnership.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 flex-grow flex flex-col">
                <p className="text-3xl font-bold text-primary">{t.pricing.partnership.price}</p>
                <ul className="space-y-3 flex-grow">
                  {t.pricing.partnership.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full mt-auto">
                  <Link to="/audit">{t.pricing.partnership.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="py-16 bg-secondary/50">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-4">
            {t.pricingPage.notes.map((note, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p className="text-muted-foreground">{note}</p>
              </div>
            ))}
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
