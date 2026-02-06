import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/motion';

export default function Pricing() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <AnimatedSection>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Transparent Pricing for Growth & Lead Systems
              </h1>
              <p className="text-xl text-muted-foreground mt-6">
                Choose the model that best fits your business stage and goals. No hidden fees — just clear structures and performance-driven partnerships.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Lead Generation System */}
            <AnimatedSection delay={0.1}>
              <Card className="relative overflow-hidden flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="text-xl">Lead Generation System</CardTitle>
                  <CardDescription>
                    Perfect for service-based businesses that want predictable inbound leads and a conversion-ready digital system.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 flex-grow flex flex-col">
                  <div>
                    <p className="text-3xl font-bold text-primary">$2,500</p>
                    <p className="text-muted-foreground">Conversion Website + Lead System Setup</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">$1,000 / month</p>
                    <p className="text-muted-foreground">Lead Generation Management</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    (No contracts — clients stay because the system works)
                  </p>
                  <div className="flex-grow">
                    <p className="font-medium mb-3">Includes:</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Conversion-focused website build</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Landing pages aligned with intent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Lead capture forms + WhatsApp setup</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Google Ads built for inbound calls + inquiries</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Tracking & attribution setup</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Monthly optimization & reporting</span>
                      </li>
                    </ul>
                  </div>
                  <Button asChild variant="outline" className="w-full mt-auto rounded-xl">
                    <Link to="/contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Performance Retainer */}
            <AnimatedSection delay={0.2}>
              <Card className="relative overflow-hidden flex flex-col h-full border-2 border-accent">
                <CardHeader>
                  <CardTitle className="text-xl">Performance Retainer</CardTitle>
                  <CardDescription>
                    Ideal for brands looking for foundational optimization and scalable results.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 flex-grow flex flex-col">
                  <div>
                    <p className="text-4xl font-bold text-accent">2.5x</p>
                    <p className="text-muted-foreground">Min. Net ROAS</p>
                  </div>
                  <p className="text-muted-foreground">
                    Our fee is conditional: if our diagnostic confirms viability, you only pay if we hit the targets. No results — no payment.*
                  </p>
                  <div className="flex-grow">
                    <p className="font-medium mb-3">Includes:</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Full campaign management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Weekly reporting calls</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Conversion & creative optimization</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    (This model suits brands with established conversion systems already in place.)
                  </p>
                  <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-auto rounded-xl">
                    <Link to="/audit">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Growth Partnership */}
            <AnimatedSection delay={0.3}>
              <Card className="relative overflow-hidden flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="text-xl">Growth Partnership</CardTitle>
                  <CardDescription>
                    Perfect for established brands ready to scale aggressively.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 flex-grow flex flex-col">
                  <div>
                    <p className="text-4xl font-bold text-primary">5%</p>
                    <p className="text-muted-foreground">of Net Shopify Sales</p>
                  </div>
                  <p className="text-muted-foreground">
                    A true partnership model where we grow with you. This is available for qualified brands with strong historical data.
                  </p>
                  <div className="flex-grow">
                    <p className="font-medium mb-3">Includes:</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Everything in Performance Retainer</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Dedicated Growth Strategist</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Advanced analytics & forecasting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Cross-channel scaling</span>
                      </li>
                    </ul>
                  </div>
                  <Button asChild variant="outline" className="w-full mt-auto rounded-xl">
                    <Link to="/audit">See If You Qualify</Link>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Not Sure Which Model Fits You?
              </h2>
              <p className="text-lg text-primary-foreground/80">
                Message us for a free strategic review of your website and lead systems.
              </p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl">
                <Link to="/contact">Book a Consultation <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
}