import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, Check, Download, ShieldCheck, Phone, Target, BarChart3, Settings, ShoppingCart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/ui/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { GrowthMetricsCard } from '@/components/home/GrowthMetricsCard';

const rotatingHeadlines = [
  "Google Ads That Drive Calls and Qualified Leads",
  "Inbound Websites Built to Capture Demand",
  "eCommerce Growth Partner Strategies That Scale Revenue",
  "High-Converting Lead Generation Systems",
];

export default function Index() {
  const { t } = useLanguage();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingHeadlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    { 
      icon: Phone,
      title: "Lead Generation Systems", 
      description: "Conversion-focused websites, landing pages, call and form optimization, WhatsApp intake, Google Ads for high-intent searches, and tracking infrastructure." 
    },
    { 
      icon: Target,
      title: "Conversion Website Development", 
      description: "High-converting sites with optimized UX, built for capturing leads and driving action — not just looking good." 
    },
    { 
      icon: BarChart3,
      title: "Google Ads for Inbound", 
      description: "Search campaigns built for ROI. We focus on bottom-funnel intent and qualified traffic, not vanity metrics." 
    },
    { 
      icon: Settings,
      title: "Tracking & Attribution Setup", 
      description: "Server-side tracking, GA4 implementation, call tracking, CRM integrations. Know exactly where your leads come from." 
    },
    { 
      icon: ShoppingCart,
      title: "eCommerce Growth Partners", 
      description: "Full-funnel paid media for Shopify brands. Meta, Google, Amazon, TikTok — optimized for Net ROAS, not vanity metrics." 
    },
    { 
      icon: Users,
      title: "Backup & Consulting", 
      description: "Strategic guidance, growth audits, and media planning for teams that need expert support without a full retainer." 
    },
  ];

  const leadGenResults = [
    "Built inbound pipelines for service businesses generating consistent calls and form inquiries",
    "Long-term retention: many partners stay 5–8 years",
    "Conversion-focused websites designed to capture demand",
  ];

  const ecomResults = [
    "Over $92M in tracked sales across Meta, Google, Amazon, TikTok",
    "10+ years managing high-growth Shopify campaigns",
    "Performance optimization across multiple categories",
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

  const industries = [
    "LOCAL SERVICES",
    "LAW & MEDICAL",
    "HOME SERVICES",
    "ECOMMERCE",
    "B2B SAAS",
  ];

  const faqs = [
    {
      q: "What is the difference from other agencies?",
      a: "We focus on systems, not just campaigns. Our approach integrates website development, tracking infrastructure, and paid media into a cohesive growth machine."
    },
    {
      q: "Who is this for?",
      a: "Established businesses ready to invest in growth. We work best with companies that have validated products/services and are ready to scale."
    },
    {
      q: "What's the difference between a Lead Gen System and an eCommerce Partner?",
      a: "Lead Gen Systems focus on service businesses that need calls, form submissions, and qualified leads. eCommerce Partners focus on Shopify brands that need to scale sales profitably."
    },
    {
      q: "What do you mean by 'Conversion Infrastructure'?",
      a: "It's the complete system that turns visitors into customers: optimized websites, tracking setup, landing pages, and paid acquisition working together."
    },
    {
      q: "Why is there a 'get a free audit first' process for everyone?",
      a: "We want to ensure we're the right fit before starting. The audit helps us understand your business, identify opportunities, and recommend the best approach."
    },
    {
      q: "Is this for e-commerce or lead generation?",
      a: "Both! We have dedicated teams for each. Lead Gen for service businesses, eCommerce Growth Partners for Shopify brands."
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#f7f8f4] py-16 md:py-20">
        {/* Subtle diagonal line pattern */}
        <div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -55deg,
              transparent,
              transparent 50px,
              #c4c4c4 50px,
              #c4c4c4 51px
            )`
          }}
        />
        
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-foreground/80 text-sm mb-4"
              >
                Hipervinculo builds performance-driven growth systems for businesses ready to scale.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-5 min-h-[120px] md:min-h-[140px]"
              >
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={wordIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.15] text-dark-green"
                    style={{ fontWeight: 800 }}
                  >
                    {rotatingHeadlines[wordIndex]}
                  </motion.h1>
                </AnimatePresence>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm text-muted-foreground leading-relaxed mb-6"
              >
                Websites, inbound architecture, and paid acquisition designed to turn traffic into real opportunities — whether you're generating local leads or scaling an established brand.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3 mb-6"
              >
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl px-5 font-semibold text-sm">
                  <Link to="/audit">Get Free Audit <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-xl px-5 bg-white border-border font-medium text-sm">
                  <Link to="/services">Explore Our Services</Link>
                </Button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-1.5"
              >
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-accent" />
                    20+ years in digital growth
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-accent" />
                    Long-term client retention
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-accent" />
                  Built for serious businesses only
                </div>
              </motion.div>
            </div>
            
            {/* Right Content - Growth Metrics Card */}
            <div className="hidden lg:flex justify-center lg:justify-end">
              <GrowthMetricsCard />
            </div>
          </div>
        </div>
      </section>

      {/* Proven Results Section - Dark Green */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
              Proven Results Across Growth Channels and<br />Inbound Lead Systems
            </h2>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">
            <AnimatedSection delay={0.1}>
              <div>
                <h3 className="text-accent font-semibold text-sm mb-4">Lead Generation Systems</h3>
                <ul className="space-y-3">
                  {leadGenResults.map((result, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-primary-foreground/90">
                      <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div>
                <h3 className="text-accent font-semibold text-sm mb-4">eCommerce Growth Partners</h3>
                <ul className="space-y-3">
                  {ecomResults.map((result, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-primary-foreground/90">
                      <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
          
          <AnimatedSection delay={0.3} className="text-center">
            <p className="text-xs text-primary-foreground/70 mb-4">
              Request a conversion and lead system walkthrough — tailored to your business.
            </p>
            <Button asChild size="default" className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl px-6 font-semibold text-sm">
              <Link to="/audit">Get a Free Audit</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Two Core Pillars of Growth */}
      <section className="py-16 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-3">
            <p className="text-accent font-medium text-xs">Our Services</p>
          </AnimatedSection>
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">Two Core Pillars of Growth</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              We build complete conversion systems — not just campaigns. From foundation to scale.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 0.08}>
                <Card className="h-full border bg-white hover:shadow-md transition-shadow rounded-xl">
                  <CardHeader className="pb-2">
                    <service.icon className="h-6 w-6 text-accent mb-2" />
                    <CardTitle className="text-base font-bold">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs leading-relaxed">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different - Lime Green */}
      <section className="py-16 bg-accent">
        <div className="container">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
              What Makes <span className="underline decoration-2 underline-offset-4">Us</span> Different?
            </h2>
            <p className="text-sm text-white/90 max-w-lg mx-auto">
              We're not just another agency. We are a true growth partner, deeply invested in your success.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
            <AnimatedSection direction="left" delay={0.1}>
              <Card className="bg-white border-0 h-full rounded-xl">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-2">
                    <Target className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground">Performance-Obsessed Experts</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground">
                    Deep experience in full-funnel marketing for Shopify & Amazon. We leverage advanced attribution tools to go beyond surface-level metrics.
                  </CardDescription>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2}>
              <Card className="bg-white border-0 h-full rounded-xl">
                <CardHeader className="pb-2">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-2">
                    <BarChart3 className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground">Radical Transparency</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground">
                    You get real-time dashboards, not filtered reports. We believe in complete visibility, showing you every metric that matters.
                  </CardDescription>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.3} className="text-center">
            <Button asChild size="default" className="bg-white text-foreground hover:bg-white/90 rounded-xl font-semibold text-sm">
              <Link to="/contact">Book a Free Consultation</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Playbook Download */}
      <section className="py-16 bg-[#f7f8f4]">
        <div className="container">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
              <div className="space-y-4">
                <p className="text-accent font-medium text-xs flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Exclusive Playbook
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold">
                  Download the<br />Advantage+ Growth<br />Playbook
                </h2>
                <p className="text-sm text-muted-foreground">
                  Get the exact strategies we use to scale Shopify stores past $1M/month with Advantage+ campaigns.
                </p>
                <Button 
                  asChild 
                  size="default" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl font-semibold text-sm"
                >
                  <a href="/downloads/advantage-plus-growth-playbook.pdf" download>
                    Download Playbook <Download className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
              <div className="flex justify-center">
                <Card className="bg-white shadow-lg border rounded-xl w-56">
                  <CardContent className="p-6 text-center">
                    <p className="text-accent text-xs font-bold mb-1">HIPERVINCULO</p>
                    <p className="text-xs text-muted-foreground mb-3">Advantage+</p>
                    <p className="text-lg font-bold text-foreground mb-1">Growth</p>
                    <p className="text-lg font-bold text-foreground">Playbook</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Clients Stay */}
      <section className="py-16 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Why Clients Stay</h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto italic">
              "Ads are just the fuel. The system is the engine."<br />
              — Hipervínculo's Growth Philosophy
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="flex justify-center gap-12 md:gap-20 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-accent mb-1">20+</div>
                <p className="text-xs text-muted-foreground">Years in Digital</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-accent mb-1">$100M+</div>
                <p className="text-xs text-muted-foreground">Managed Spend</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-accent mb-1">5-8</div>
                <p className="text-xs text-muted-foreground">Year Avg. Retention</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Proven Systems Across Industries */}
      <section className="py-12 bg-white border-t border-border/30">
        <div className="container">
          <AnimatedSection className="text-center mb-6">
            <h3 className="text-lg font-bold mb-2">Proven Systems Across Industries</h3>
            <p className="text-xs text-muted-foreground">
              Our methodology is tailored to fit the specific needs of your industry.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {industries.map((industry, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-secondary text-foreground text-xs font-medium rounded-full"
                >
                  {industry}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Performance Guarantee - Dark Green */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 items-center max-w-4xl mx-auto">
            <AnimatedSection direction="left">
              <div className="space-y-4">
                <p className="text-accent font-medium text-xs flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Our Promise
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                  Our Performance<br />Guarantee
                </h2>
                <p className="text-sm text-primary-foreground/80">
                  We believe in our ability to deliver results. If you qualify for our performance-based model and we don't meet the minimum agreed-upon performance target (typically 2.5 Net ROAS), you don't pay our management fee.
                </p>
                <p className="font-semibold text-white text-sm">We succeed only when you succeed.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2}>
              <Card className="bg-white border-0 shadow-xl rounded-xl">
                <CardContent className="p-8 text-center">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground mb-1">No Results, No Fee.</h3>
                  <p className="text-xs text-muted-foreground">That's our commitment.</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Transparent Pricing */}
      <section className="py-16 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Transparent Pricing</h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Tailored for businesses at ⟹ | with real numbers. No hidden fees — this is a growth relationship, not a vendor contract.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="max-w-md mx-auto">
              <Card className="border-2 border-accent rounded-xl">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-lg font-bold">Three Growth Models. One Goal: Your Business.</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-xs text-muted-foreground mb-4">
                    Whether you're building a lead gen system, scaling an eCommerce brand, or both — we have a pricing model designed for your growth stage.
                  </p>
                  <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl font-semibold text-sm">
                    <Link to="/pricing">Explore Pricing Options <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Tools and Media Platforms */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <AnimatedSection className="text-center mb-3">
            <p className="text-accent font-medium text-xs">Trusted Partnerships</p>
          </AnimatedSection>
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Tools and Media Platforms we work with</h2>
            <p className="text-sm text-muted-foreground">
              We're certified partners with the industry's leading platforms
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {partners.map((partner, index) => (
              <AnimatedSection key={partner.name} delay={index * 0.05}>
                <Card className="text-center bg-white border rounded-xl hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-sm mb-0.5">{partner.name}</h3>
                    <p className="text-xs text-muted-foreground">{partner.subtitle}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container max-w-2xl">
          <AnimatedSection className="text-center mb-3">
            <p className="text-accent font-medium text-xs">Frequently Asked Questions</p>
          </AnimatedSection>
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold">Got Questions? We've Got Answers.</h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50">
                  <AccordionTrigger className="text-left text-sm font-medium py-4">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-4">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA - Lime Green */}
      <section className="py-16 bg-accent">
        <div className="container text-center">
          <AnimatedSection className="max-w-xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Ready to scale your brand?</h2>
            <p className="text-sm text-white/90">
              Request your free growth audit and discover how we can help you achieve your most ambitious goals.
            </p>
            <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/90 rounded-xl font-semibold">
              <Link to="/audit">Get My Free Audit</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
