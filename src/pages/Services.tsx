import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Target, Globe, Search, LineChart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Target,
      title: t.servicesPage.leadGen.title,
      description: t.servicesPage.leadGen.description,
      features: t.servicesPage.leadGen.features,
    },
    {
      icon: Globe,
      title: t.servicesPage.website.title,
      description: t.servicesPage.website.description,
      features: t.servicesPage.website.features,
    },
    {
      icon: Search,
      title: t.servicesPage.googleAds.title,
      description: t.servicesPage.googleAds.description,
      features: t.servicesPage.googleAds.features,
    },
    {
      icon: LineChart,
      title: t.servicesPage.tracking.title,
      description: t.servicesPage.tracking.description,
      features: t.servicesPage.tracking.features,
    },
    {
      icon: ShoppingCart,
      title: t.servicesPage.ecommerce.title,
      description: t.servicesPage.ecommerce.description,
      features: t.servicesPage.ecommerce.features,
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-background via-light-green to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{t.servicesPage.title}</h1>
            <p className="text-xl text-muted-foreground">{t.servicesPage.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container">
          <div className="space-y-12">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="p-3 rounded-lg bg-accent/10 w-fit mb-6">
                      <service.icon className="h-8 w-8 text-accent" />
                    </div>
                    <CardTitle className="text-2xl md:text-3xl mb-4">{service.title}</CardTitle>
                    <CardDescription className="text-lg">{service.description}</CardDescription>
                  </div>
                  <div className="bg-secondary/30 p-8 md:p-12">
                    <ul className="space-y-4">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
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
