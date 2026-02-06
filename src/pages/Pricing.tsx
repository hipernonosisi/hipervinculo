import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/motion';
import { motion } from 'framer-motion';

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
              <p className="text-[15px] md:text-[16px] text-muted-foreground mt-6 max-w-2xl mx-auto">
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
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-3xl p-10 md:p-16 relative overflow-hidden"
                style={{ backgroundColor: '#2d4a2d' }}
              >
                <div className="grid md:grid-cols-2 gap-10 items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-6">
                      <MessageCircle className="w-4 h-4 text-white" />
                      <span className="text-white/90 text-[13px] font-medium">Free Consultation</span>
                    </div>
                    <h2 
                      className="text-[32px] md:text-[40px] lg:text-[48px] text-white leading-[1.1] tracking-[-0.02em] mb-4"
                      style={{ fontWeight: 800 }}
                    >
                      Not Sure Which Model Fits You?
                    </h2>
                    <p className="text-[16px] md:text-[18px] text-white/70 leading-relaxed">
                      Message us for a free strategic review of your website and lead systems.
                    </p>
                  </div>
                  <div className="flex md:justify-end">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        asChild 
                        size="lg" 
                        className="bg-white text-foreground hover:bg-white/90 rounded-full px-8 py-6 text-[16px] font-semibold h-auto"
                      >
                        <Link to="/contact">
                          Book a Consultation 
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5" style={{ backgroundColor: '#8BC34A', transform: 'translate(30%, -30%)' }} />
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-5" style={{ backgroundColor: '#8BC34A', transform: 'translate(-30%, 30%)' }} />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
}