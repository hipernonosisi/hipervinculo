import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Target, Globe, Search, LineChart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/motion';

export default function Services() {
  const services = [
    {
      icon: Target,
      title: 'Lead Generation Systems',
      description: 'Complete inbound systems for service-based businesses:',
      features: [
        'Conversion-focused websites',
        'Lead capture architecture',
        'Google Ads for inbound calls and inquiries',
        'Tracking + reporting infrastructure',
      ],
      note: 'Best for: businesses that want predictable lead flow.',
    },
    {
      icon: Globe,
      title: 'Conversion Website Development',
      description: 'Your website is not a brochure. It is a performance asset designed to convert traffic into opportunities. Website builds start at $2,500, depending on scope and conversion requirements.',
      features: [
        'Strategic page structure',
        'Lead-focused UX',
        'Forms, calls, WhatsApp integration',
        'Analytics-ready build',
      ],
    },
    {
      icon: Search,
      title: 'Google Ads for High-Intent Demand',
      description: 'Campaigns designed around:',
      features: [
        'Search intent',
        'Qualified inbound leads',
        'Call-driven industries',
        'Measurable conversion outcomes',
      ],
    },
    {
      icon: LineChart,
      title: 'Tracking & Attribution',
      description: 'We implement measurement systems that allow you to understand:',
      features: [
        'Where leads come from',
        'Which pages convert',
        'What traffic is worth scaling',
      ],
    },
    {
      icon: ShoppingCart,
      title: 'eCommerce Growth Partners',
      description: 'For established brands looking to scale revenue:',
      features: [
        'Meta + Google performance strategy',
        'Performance Max',
        'Amazon PPC',
        'Full-funnel growth systems',
      ],
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <AnimatedSection>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Services</h1>
              <p className="text-xl text-muted-foreground mt-6">
                Hipervinculo builds inbound growth systems that combine conversion infrastructure, lead generation strategy, and paid acquisition.
              </p>
              <p className="text-lg text-muted-foreground mt-4">
                We are not an "ads-only" agency.
              </p>
              <p className="text-lg font-medium text-accent mt-2">
                We build the foundation first — then scale what works.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container">
          <div className="space-y-12 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <Card className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-accent/10">
                        <service.icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                        <p className="text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 ml-16">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {service.note && (
                      <p className="text-sm text-muted-foreground mt-4 ml-16 italic">
                        {service.note}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ready to Scale Your Business?
              </h2>
              <p className="text-lg text-white/90">
                Get a free performance audit and discover exactly how we can help you achieve your growth goals.
              </p>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 rounded-xl">
                <Link to="/audit">Schedule Your Free Audit <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
}