import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, Check, Download, ShieldCheck, Phone, Target, BarChart3, Settings, ShoppingCart, Users, Zap } from 'lucide-react';
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
      {/* Hero Section - Exact match to hipervinculo.net */}
      <section className="relative overflow-hidden bg-[#f8f9f5] py-16 lg:py-20">
        {/* Subtle diagonal line pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -55deg,
              transparent,
              transparent 60px,
              #9ca3af 60px,
              #9ca3af 61px
            )`
          }}
        />
        
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="max-w-[620px]">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[17px] text-muted-foreground mb-6 leading-[1.6]"
              >
                Hipervinculo builds performance-driven growth systems for businesses ready to scale.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-10 min-h-[220px] md:min-h-[260px]"
              >
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={wordIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-[52px] md:text-[64px] lg:text-[72px] leading-[1.02] tracking-[-0.03em]"
                    style={{ fontWeight: 800, color: '#2d4a2d' }}
                  >
                    {rotatingHeadlines[wordIndex]}
                  </motion.h1>
                </AnimatePresence>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[18px] text-muted-foreground leading-[1.7] mb-10 max-w-[540px]"
              >
                Websites, inbound architecture, and paid acquisition designed to turn traffic into real opportunities — whether you're generating local leads or scaling an established brand.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Button asChild size="lg" className="rounded-full px-8 h-14 text-[16px] font-semibold shadow-lg hover:shadow-xl transition-shadow" style={{ backgroundColor: '#8BC34A', color: 'white' }}>
                  <Link to="/audit">Get Free Audit <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 bg-white border-gray-300 text-[16px] font-semibold text-foreground hover:bg-gray-50">
                  <Link to="/services">Explore Our Services</Link>
                </Button>
              </motion.div>

              {/* Trust badges with circular checkmarks */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-4"
              >
                <div className="flex flex-wrap gap-x-10 gap-y-3">
                  <span className="flex items-center gap-3 text-[15px] text-muted-foreground">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full border-2" style={{ borderColor: '#8BC34A' }}>
                      <Check className="h-3 w-3" style={{ color: '#8BC34A' }} />
                    </span>
                    20+ years in digital growth
                  </span>
                  <span className="flex items-center gap-3 text-[15px] text-muted-foreground">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full border-2" style={{ borderColor: '#8BC34A' }}>
                      <Check className="h-3 w-3" style={{ color: '#8BC34A' }} />
                    </span>
                    Long-term client retention
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[15px] text-muted-foreground">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full border-2" style={{ borderColor: '#8BC34A' }}>
                    <Check className="h-3 w-3" style={{ color: '#8BC34A' }} />
                  </span>
                  Built for serious businesses only
                </div>
              </motion.div>
            </div>
            
            {/* Right Content - Growth Metrics Card */}
            <div className="hidden lg:flex items-center justify-center">
              <GrowthMetricsCard />
            </div>
          </div>
        </div>
      </section>

      {/* Proven Results Section - Dark Green */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: '#3d5a3d' }}>
        <div className="container">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-[44px] md:text-[56px] lg:text-[64px] font-extrabold leading-[1.05] tracking-[-0.02em]" style={{ color: '#d9ebb3' }}>
              Proven Results Across Growth Channels<br className="hidden md:block" /> and Inbound Lead Systems
            </h2>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-20 max-w-5xl mx-auto mb-20">
            <AnimatedSection delay={0.1}>
              <div>
                <h3 className="font-extrabold text-[22px] md:text-[26px] mb-10 tracking-[-0.01em]" style={{ color: '#e0f0b5' }}>Lead Generation Systems</h3>
                <ul className="space-y-6">
                  {leadGenResults.map((result, index) => (
                    <li key={index} className="flex items-start gap-4 text-[17px] leading-[1.6] font-normal" style={{ color: '#ffffff' }}>
                      <Zap className="h-5 w-5 flex-shrink-0 mt-1" style={{ color: '#e0f0b5' }} />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div>
                <h3 className="font-extrabold text-[22px] md:text-[26px] mb-10 tracking-[-0.01em]" style={{ color: '#e0f0b5' }}>eCommerce Growth Partners</h3>
                <ul className="space-y-6">
                  {ecomResults.map((result, index) => (
                    <li key={index} className="flex items-start gap-4 text-[17px] leading-[1.6] font-normal" style={{ color: '#ffffff' }}>
                      <Zap className="h-5 w-5 flex-shrink-0 mt-1" style={{ color: '#e0f0b5' }} />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Horizontal line separator */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="w-full h-px" style={{ backgroundColor: 'rgba(224, 240, 181, 0.25)' }}></div>
          </div>
          
          <AnimatedSection delay={0.3} className="text-center">
            <p className="text-[16px] mb-10 font-medium" style={{ color: '#ffffff' }}>
              Request a conversion and lead system walkthrough — tailored to your business.
            </p>
            <Button asChild className="rounded-full px-12 h-14 text-[16px] font-semibold border-0 hover:opacity-90 transition-opacity" style={{ backgroundColor: '#f5f5dc', color: '#3d5a3d' }}>
              <Link to="/audit">Get a Free Audit</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Two Core Pillars of Growth */}
      <section className="py-20 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-4">
            <p className="text-accent font-medium text-[13px]">Our Services</p>
          </AnimatedSection>
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-[32px] md:text-[40px] font-extrabold mb-4 tracking-[-0.02em]">Two Core Pillars of Growth</h2>
            <p className="text-[16px] text-muted-foreground max-w-xl mx-auto leading-relaxed">
              We build complete conversion systems — not just campaigns. From foundation to scale.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 0.08}>
                <Card className="h-full border bg-white hover:shadow-lg transition-shadow rounded-xl">
                  <CardHeader className="pb-3">
                    <service.icon className="h-7 w-7 text-accent mb-3" />
                    <CardTitle className="text-[18px] font-bold">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[14px] leading-[1.6]">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different - Lime Green */}
      <section className="py-20 bg-accent">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-white mb-3 tracking-[-0.02em]">
              What Makes <span className="underline decoration-2 underline-offset-4">Us</span> Different?
            </h2>
            <p className="text-[16px] text-white/90 max-w-lg mx-auto leading-relaxed">
              We're not just another agency. We are a true growth partner, deeply invested in your success.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
            <AnimatedSection direction="left" delay={0.1}>
              <Card className="bg-white border-0 h-full rounded-xl shadow-lg">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-[20px] font-bold text-foreground">Performance-Obsessed Experts</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[15px] text-muted-foreground leading-relaxed">
                    Deep experience in full-funnel marketing for Shopify & Amazon. We leverage advanced attribution tools to go beyond surface-level metrics.
                  </CardDescription>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2}>
              <Card className="bg-white border-0 h-full rounded-xl shadow-lg">
                <CardHeader className="pb-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-[20px] font-bold text-foreground">Radical Transparency</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[15px] text-muted-foreground leading-relaxed">
                    You get real-time dashboards, not filtered reports. We believe in complete visibility, showing you every metric that matters.
                  </CardDescription>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.3} className="text-center">
            <Button asChild className="bg-white text-foreground hover:bg-white/90 rounded-xl h-11 px-8 text-[14px] font-semibold">
              <Link to="/contact">Book a Free Consultation</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Playbook Download */}
      <section className="py-20 bg-[#f8f9f5]">
        <div className="container">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
              <div className="space-y-6">
                <p className="text-accent font-medium text-[13px] flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Exclusive Playbook
                </p>
                <h2 className="text-[32px] md:text-[40px] font-extrabold leading-[1.1] tracking-[-0.02em]">
                  Download the<br />Advantage+ Growth<br />Playbook
                </h2>
                <p className="text-[16px] text-muted-foreground leading-relaxed">
                  Get the exact strategies we use to scale Shopify stores past $1M/month with Advantage+ campaigns.
                </p>
                <Button 
                  asChild 
                  className="bg-accent hover:bg-accent/90 text-white rounded-xl h-11 px-8 text-[14px] font-semibold"
                >
                  <a href="/downloads/advantage-plus-growth-playbook.pdf" download>
                    Download Playbook <Download className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
              <div className="flex justify-center">
                <Card className="bg-white shadow-xl border rounded-xl w-64">
                  <CardContent className="p-8 text-center">
                    <p className="text-accent text-[12px] font-bold mb-2 tracking-wide">HIPERVINCULO</p>
                    <p className="text-[13px] text-muted-foreground mb-4">Advantage+</p>
                    <p className="text-[22px] font-extrabold text-foreground leading-tight">Growth<br />Playbook</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Clients Stay */}
      <section className="py-20 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-[32px] md:text-[40px] font-extrabold mb-6 tracking-[-0.02em]">Why Clients Stay</h2>
            <p className="text-[16px] text-muted-foreground max-w-2xl mx-auto italic leading-relaxed">
              "Ads are just the fuel. The system is the engine."<br />
              — Hipervínculo's Growth Philosophy
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="flex justify-center gap-16 md:gap-24 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-[40px] md:text-[48px] font-extrabold text-accent mb-2">20+</div>
                <p className="text-[13px] text-muted-foreground">Years in Digital</p>
              </div>
              <div className="text-center">
                <div className="text-[40px] md:text-[48px] font-extrabold text-accent mb-2">$100M+</div>
                <p className="text-[13px] text-muted-foreground">Managed Spend</p>
              </div>
              <div className="text-center">
                <div className="text-[40px] md:text-[48px] font-extrabold text-accent mb-2">5-8</div>
                <p className="text-[13px] text-muted-foreground">Year Avg. Retention</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Proven Systems Across Industries */}
      <section className="py-14 bg-white border-t border-border/40">
        <div className="container">
          <AnimatedSection className="text-center mb-8">
            <h3 className="text-[22px] font-bold mb-3">Proven Systems Across Industries</h3>
            <p className="text-[14px] text-muted-foreground">
              Our methodology is tailored to fit the specific needs of your industry.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {industries.map((industry, index) => (
                <span 
                  key={index}
                  className="px-5 py-2.5 bg-secondary text-foreground text-[12px] font-medium rounded-full tracking-wide"
                >
                  {industry}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Performance Guarantee - Dark Green */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            <AnimatedSection direction="left">
              <div className="space-y-6">
                <p className="text-accent font-medium text-[13px] flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Our Promise
                </p>
                <h2 className="text-[32px] md:text-[40px] font-extrabold text-white leading-[1.1] tracking-[-0.02em]">
                  Our Performance<br />Guarantee
                </h2>
                <p className="text-[16px] text-primary-foreground/80 leading-relaxed">
                  We believe in our ability to deliver results. If you qualify for our performance-based model and we don't meet the minimum agreed-upon performance target (typically 2.5 Net ROAS), you don't pay our management fee.
                </p>
                <p className="font-semibold text-white text-[16px]">We succeed only when you succeed.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2}>
              <Card className="bg-white border-0 shadow-2xl rounded-xl">
                <CardContent className="p-10 text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="h-9 w-9 text-accent" />
                  </div>
                  <h3 className="text-[24px] font-extrabold text-foreground mb-2">No Results, No Fee.</h3>
                  <p className="text-[14px] text-muted-foreground">That's our commitment.</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Transparent Pricing */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <h2 
              className="text-[48px] md:text-[60px] lg:text-[72px] mb-6 leading-[1.05] tracking-[-0.03em]"
              style={{ fontWeight: 800, fontStyle: 'italic', color: '#1a1a2e' }}
            >
              Transparent Pricing
            </h2>
            <p className="text-[18px] md:text-[20px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our pricing is designed to align with your success. No hidden fees, just a partnership focused on growth.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="max-w-3xl mx-auto">
              <Card className="border-2 rounded-3xl shadow-sm" style={{ borderColor: '#8BC34A' }}>
                <CardContent className="text-center py-14 px-8 md:px-16">
                  <h3 
                    className="text-[28px] md:text-[36px] lg:text-[42px] mb-6 leading-[1.15] tracking-[-0.02em]"
                    style={{ fontWeight: 800, fontStyle: 'italic', color: '#1a1a2e' }}
                  >
                    Three Growth Models. One Goal: Your Success.
                  </h3>
                  <p className="text-[16px] md:text-[18px] text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
                    Whether you need lead generation infrastructure, performance-based eCommerce growth, or strategic partnership — we have a model built for your stage and goals.
                  </p>
                  <Button asChild size="lg" className="rounded-full h-14 px-10 text-[16px] font-semibold shadow-md" style={{ backgroundColor: '#8BC34A', color: 'white' }}>
                    <Link to="/pricing">Explore Pricing Options <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Tools and Media Platforms */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container">
          <AnimatedSection className="text-center mb-6">
            <p className="text-accent font-semibold text-[15px]">Trusted Partnerships</p>
          </AnimatedSection>
          <AnimatedSection className="text-center mb-16">
            <h2 
              className="text-[40px] md:text-[52px] lg:text-[60px] mb-5 leading-[1.1] tracking-[-0.03em]"
              style={{ fontWeight: 800, color: '#2d4a2d' }}
            >
              Tools and Media Platforms we work with
            </h2>
            <p className="text-[18px] md:text-[20px] text-muted-foreground">
              We're certified partners with the industry's leading platforms
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {partners.map((partner, index) => (
              <AnimatedSection key={partner.name} delay={index * 0.05}>
                <Card className="text-center bg-white border-0 rounded-2xl hover:shadow-lg transition-shadow shadow-sm">
                  <CardContent className="p-8">
                    <h3 className="font-bold text-[18px] md:text-[20px] mb-2 text-foreground">{partner.name}</h3>
                    <p className="text-[14px] md:text-[15px] text-muted-foreground">{partner.subtitle}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container max-w-3xl">
          <AnimatedSection className="text-center mb-6">
            <p className="text-accent font-medium text-[15px]">Frequently Asked Questions</p>
          </AnimatedSection>
          <AnimatedSection className="text-center mb-16">
            <h2 
              className="text-[40px] md:text-[52px] lg:text-[60px] leading-[1.1] tracking-[-0.03em]"
              style={{ fontWeight: 800, color: '#2d4a2d' }}
            >
              Got Questions? We've Got Answers.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50">
                  <AccordionTrigger className="text-left text-[18px] md:text-[20px] font-medium py-6 text-foreground">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-[16px] md:text-[17px] text-muted-foreground pb-6 leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA - Lime Green */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#8BC34A' }}>
        <div className="container text-center">
          <AnimatedSection className="max-w-3xl mx-auto space-y-8">
            <h2 
              className="text-[40px] md:text-[56px] lg:text-[64px] text-white leading-[1.05] tracking-[-0.03em]"
              style={{ fontWeight: 800, fontStyle: 'italic' }}
            >
              Ready to scale your brand?
            </h2>
            <p className="text-[18px] md:text-[20px] text-white/80 leading-relaxed max-w-2xl mx-auto">
              Request your free growth audit and discover how we can help you achieve your most ambitious goals.
            </p>
            <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/95 rounded-full h-14 px-10 text-[16px] font-semibold shadow-lg mt-4">
              <Link to="/audit">Get My Free Audit <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
