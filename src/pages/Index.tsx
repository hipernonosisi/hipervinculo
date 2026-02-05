import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, Check, Download, ShieldCheck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection, AnimatedCounter } from '@/components/ui/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { GrowthMetricsCard } from '@/components/home/GrowthMetricsCard';

const rotatingWords = [
  "eCommerce",
  "DTC Brands",
  "Shopify Stores",
  "Amazon Sellers",
];

export default function Index() {
  const { t, language } = useLanguage();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    { 
      title: "Paid Media Management", 
      description: "Expert management of Google Ads, Meta Ads, Amazon PPC, and TikTok campaigns to maximize your ROAS and drive qualified traffic." 
    },
    { 
      title: "Creative Services", 
      description: "High-converting ad creatives, banners, and video content designed to capture attention and communicate your value proposition effectively." 
    },
    { 
      title: "Conversion Rate Optimization", 
      description: "Systematic optimization of landing pages, checkout flows, and user experience to convert more visitors into customers." 
    },
    { 
      title: "Analytics & Attribution", 
      description: "Advanced tracking implementation and attribution modeling to measure true campaign performance and optimize spend allocation." 
    },
    { 
      title: "Amazon Services", 
      description: "Complete Amazon optimization including listing optimization, PPC management, brand protection, and marketplace strategy." 
    },
    { 
      title: "Strategy & Consulting", 
      description: "Comprehensive growth audits, media planning, and performance forecasting to create data-driven growth roadmaps." 
    },
  ];

  const provenResults = [
    "Over $92 million in tracked sales generated for clients across Meta, Google, Amazon, and TikTok.",
    "10+ years managing campaigns for high-growth Shopify brands.",
    "Campaigns optimized with ROAS ranging from 3.5 to 8.2 depending on category.",
    "Amazon TACOS reductions of up to 40% within 90 days for qualified partners.",
    "Performance-based pricing for accounts with historical sales and consistent logistics.",
  ];

  const partners = [
    { name: 'Google Ads', subtitle: 'Certified Partner' },
    { name: 'Meta Ads', subtitle: 'Certified Buyer Professional' },
    { name: 'Amazon', subtitle: 'Amazon PPC Specialist' },
    { name: 'Helium 10', subtitle: 'Partner' },
    { name: 'Elevar', subtitle: 'Integration' },
    { name: 'MNTN', subtitle: 'MNTN Media Buyer' },
    { name: 'Polar Analytics', subtitle: 'Partner' },
    { name: 'Shopify', subtitle: 'Partner' },
  ];

  const faqs = [
    {
      q: "What is net ROAS?",
      a: "Net ROAS (Return on Ad Spend) is your revenue after all costs (product cost, shipping, returns) divided by your ad spend. It gives you a clearer picture of actual profitability compared to gross ROAS."
    },
    {
      q: "What if we don't reach the ROAS target?",
      a: "If we don't meet the minimum agreed-upon performance target (typically 2.5 Net ROAS) for qualified accounts, you don't pay our management fee. We only succeed when you succeed."
    },
    {
      q: "What's included in your service?",
      a: "Our service includes campaign strategy, ad creation, audience targeting, bid management, A/B testing, analytics, and regular reporting. We handle everything from creative to optimization."
    },
    {
      q: "Do you build stores or run email marketing?",
      a: "We focus exclusively on paid acquisition and conversion optimization. We partner with specialized agencies for store development and email marketing when needed."
    },
    {
      q: "Do you work with new businesses?",
      a: "We primarily work with established brands that have validated products and consistent logistics. New businesses may qualify for our consulting services to build a foundation first."
    },
    {
      q: "What makes you different from other agencies?",
      a: "Our performance-based pricing model means we only get paid when you get results. Combined with radical transparency through real-time dashboards, we're true partners in your growth."
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary py-20 md:py-28">
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm mb-8"
              >
                <Star className="h-4 w-4 text-accent fill-accent" />
                <span className="text-sm font-medium text-foreground">Digital Growth Agency</span>
              </motion.div>
              
              {/* Headline with rotating word */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                  Your growth<br />
                  partner for<br />
                  ambitious{' '}
                  <span className="relative inline-block">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={wordIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="text-dark-green"
                      >
                        {rotatingWords[wordIndex]}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-dark-green">.</span>
                  </span>
                </h1>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-muted-foreground max-w-lg mb-8"
              >
                We help brands with validated products scale profitably through comprehensive, data-driven marketing strategies.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl px-6 font-semibold shadow-sm">
                  <Link to="/audit">Request Free Audit <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-xl px-6 bg-white border-border font-semibold shadow-sm">
                  <Link to="/services">View Our Services</Link>
                </Button>
              </motion.div>
            </div>
            
            {/* Right Content - Growth Metrics Card */}
            <div className="hidden lg:flex justify-center lg:justify-end">
              <GrowthMetricsCard />
            </div>
          </div>
        </div>
      </section>

      {/* Proven Results */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Proven Results Across eCom Channels</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <ul className="max-w-3xl mx-auto space-y-4">
              {provenResults.map((result, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-primary-foreground/90">{result}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={0.2} className="text-center mt-8">
            <p className="text-accent font-semibold mb-6">REQUEST A CASE-FREE WALKTHROUGH IN YOUR AUDIT SESSION.</p>
            <Button asChild variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full border-0">
              <Link to="/audit">Book a Consultation</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-4">
            <p className="text-accent font-medium">Our Services</p>
          </AnimatedSection>
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">A 360° approach to your growth</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We focus exclusively on performance marketing and optimization services that directly impact your bottom line.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <Card className="h-full border bg-white hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-accent">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Makes Us Different?</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              We're not just another agency. We are a true growth partner, deeply invested in your success.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatedSection direction="left" delay={0.1}>
              <Card className="bg-white/20 border-0 h-full backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Performance-Obsessed Experts</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg text-white/80">
                    Deep experience in full-funnel marketing for Shopify & Amazon. We leverage advanced attribution tools to go beyond surface-level metrics and drive real growth.
                  </CardDescription>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2}>
              <Card className="bg-white/20 border-0 h-full backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Radical Transparency</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg text-white/80">
                    You get real-time dashboards, not filtered reports. We believe in complete visibility, showing you every metric that matters.
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

      {/* Playbook Download */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div className="space-y-6">
                <p className="text-accent font-medium">Exclusive Playbook</p>
                <h2 className="text-3xl md:text-4xl font-bold">Download the Advantage+ Growth Playbook</h2>
                <p className="text-lg text-muted-foreground">
                  Get the exact strategies we use to scale Shopify stores past $1M/month with Advantage+ campaigns. A must-have resource for serious marketing teams.
                </p>
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full"
                >
                  <a href="/downloads/advantage-plus-growth-playbook.pdf" download>
                    Download Playbook <Download className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
              <div className="relative">
                <Card className="bg-primary shadow-2xl border-0">
                  <CardContent className="p-8">
                    <div className="text-center text-white">
                      <p className="text-accent text-sm font-medium mb-2">HIPERVINCULO</p>
                      <p className="text-4xl font-bold mb-2">Advantage+</p>
                      <p className="text-xl font-semibold mb-4">Growth Playbook</p>
                      <p className="text-sm text-white/70">Proven Strategies</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Performance Guarantee */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <AnimatedSection direction="left">
              <div className="space-y-6">
                <p className="text-accent font-medium">Our Promise</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Our Performance Guarantee</h2>
                <p className="text-lg text-primary-foreground/80">
                  We believe in our ability to deliver results. If you qualify for our performance-based model and we don't meet the minimum agreed-upon performance target (typically 2.5 Net ROAS), you don't pay our management fee. It's that simple.
                </p>
                <p className="font-semibold text-white">We succeed only when you succeed.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2}>
              <Card className="bg-white border-0 shadow-2xl">
                <CardContent className="p-8 text-center">
                  <div className="mb-4">
                    <ShieldCheck className="h-16 w-16 mx-auto text-accent" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-2">No Results, No Fee.</h3>
                  <p className="text-muted-foreground mb-4">That's our commitment.</p>
                  <div className="text-4xl font-bold text-accent">2.5x</div>
                  <p className="text-sm text-muted-foreground">MIN. ROAS</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Transparent Pricing */}
      <section className="py-20 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our pricing is designed to align with your success. No hidden fees, just a partnership focused on growth.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatedSection delay={0.1}>
              <Card className="h-full border-2 border-accent">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Performance Retainer</CardTitle>
                  <CardDescription>Ideal for brands needing foundational growth.</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-accent mb-2">2.5x</div>
                  <p className="text-muted-foreground mb-6">Min. Net ROAS</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    You only pay if we hit our targets. No results, no fee.*
                  </p>
                  <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full">
                    <Link to="/audit">See If You Qualify</Link>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <Card className="h-full border-2 border-accent">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Growth Partnership</CardTitle>
                  <CardDescription>For established brands ready to scale aggressively.</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-accent mb-2">5%</div>
                  <p className="text-muted-foreground mb-6">of Net Shopify Sales</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    A true partnership model where our compensation is directly tied to your growth.
                  </p>
                  <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full">
                    <Link to="/audit">Request an Audit</Link>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.3} className="text-center mt-8">
            <Link to="/pricing" className="text-accent hover:text-accent/80 font-medium inline-flex items-center gap-1">
              View Detailed Pricing <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Tools We Manage */}
      <section className="py-20 bg-secondary">
        <div className="container">
          <AnimatedSection className="text-center mb-4">
            <p className="text-accent font-medium">Trusted Partnerships</p>
          </AnimatedSection>
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tools We Manage</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're certified partners with the industry's leading platforms
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {partners.map((partner, index) => (
              <AnimatedSection key={partner.name} delay={index * 0.05}>
                <Card className="text-center bg-white border hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-1">{partner.name}</h3>
                    <p className="text-sm text-muted-foreground">{partner.subtitle}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.4} className="text-center mt-8">
            <p className="text-muted-foreground">
              These partnerships ensure we have access to the latest tools and insights to drive your growth.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container max-w-3xl">
          <AnimatedSection className="text-center mb-4">
            <p className="text-accent font-medium">Frequently Asked Questions</p>
          </AnimatedSection>
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Got Questions? We've Got Answers.</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent">
        <div className="container text-center">
          <AnimatedSection className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to scale your brand?</h2>
            <p className="text-lg text-white/90">
              Request your free growth audit and discover how we can help you achieve your most ambitious goals.
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full">
              <Link to="/audit">Get My Free Audit <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
