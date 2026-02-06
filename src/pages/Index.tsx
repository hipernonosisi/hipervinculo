import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowRight, Check, Download, ShieldCheck, Phone, Target, BarChart3, Settings, ShoppingCart, Users, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { AnimatedSection } from '@/components/ui/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { GrowthMetricsCard } from '@/components/home/GrowthMetricsCard';

const serviceIcons = [Phone, Target, BarChart3, Settings, ShoppingCart, Users];
const industryIcons = [Phone, ShieldCheck, Settings, ShoppingCart, Zap];

export default function Index() {
  const { t } = useLanguage();
  const [wordIndex, setWordIndex] = useState(0);

  const rotatingHeadlines = t.homepage.rotatingHeadlines;

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingHeadlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [rotatingHeadlines.length]);

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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#f8f9f5] py-16 lg:py-20">
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
            <div className="max-w-[620px]">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[17px] text-muted-foreground mb-6 leading-[1.6]"
              >
                {t.homepage.heroIntro}
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
                {t.homepage.heroDescription}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Button asChild size="lg" className="rounded-full px-8 h-14 text-[16px] font-semibold shadow-lg hover:shadow-xl transition-shadow" style={{ backgroundColor: '#8BC34A', color: 'white' }}>
                  <Link to="/audit">{t.homepage.ctaGetAudit} <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 bg-white border-gray-300 text-[16px] font-semibold text-foreground hover:bg-gray-50">
                  <Link to="/services">{t.homepage.ctaExploreServices}</Link>
                </Button>
              </motion.div>

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
                    {t.homepage.trustBadge1}
                  </span>
                  <span className="flex items-center gap-3 text-[15px] text-muted-foreground">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full border-2" style={{ borderColor: '#8BC34A' }}>
                      <Check className="h-3 w-3" style={{ color: '#8BC34A' }} />
                    </span>
                    {t.homepage.trustBadge2}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[15px] text-muted-foreground">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full border-2" style={{ borderColor: '#8BC34A' }}>
                    <Check className="h-3 w-3" style={{ color: '#8BC34A' }} />
                  </span>
                  {t.homepage.trustBadge3}
                </div>
              </motion.div>
            </div>
            
            <div className="hidden lg:flex items-center justify-center">
              <GrowthMetricsCard />
            </div>
          </div>
        </div>
      </section>

      {/* Proven Results Section */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: '#3d5a3d' }}>
        <div className="container">
          <AnimatedSection className="text-center mb-20">
            <h2 className="text-[28px] md:text-[36px] lg:text-[44px] font-extrabold leading-[1.1] tracking-[-0.02em] whitespace-pre-line" style={{ color: '#d9ebb3' }}>
              {t.homepage.provenResultsTitle}
            </h2>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 gap-20 max-w-5xl mx-auto mb-20">
            <AnimatedSection delay={0.1}>
              <div>
                <h3 className="font-extrabold text-[22px] md:text-[26px] mb-10 tracking-[-0.01em]" style={{ color: '#e0f0b5' }}>{t.homepage.leadGenTitle}</h3>
                <ul className="space-y-6">
                  {t.homepage.leadGenResults.map((result, index) => (
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
                <h3 className="font-extrabold text-[22px] md:text-[26px] mb-10 tracking-[-0.01em]" style={{ color: '#e0f0b5' }}>{t.homepage.ecomTitle}</h3>
                <ul className="space-y-6">
                  {t.homepage.ecomResults.map((result, index) => (
                    <li key={index} className="flex items-start gap-4 text-[17px] leading-[1.6] font-normal" style={{ color: '#ffffff' }}>
                      <Zap className="h-5 w-5 flex-shrink-0 mt-1" style={{ color: '#e0f0b5' }} />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
          
          <div className="max-w-5xl mx-auto mb-20">
            <div className="w-full h-px" style={{ backgroundColor: 'rgba(224, 240, 181, 0.25)' }}></div>
          </div>
          
          <AnimatedSection delay={0.3} className="text-center">
            <p className="text-[18px] md:text-[20px] mb-10 font-medium" style={{ color: '#ffffff' }}>
              {t.homepage.provenResultsCta}
            </p>
            <Button asChild className="rounded-full px-12 h-14 text-[16px] font-semibold border-0 hover:opacity-90 transition-opacity" style={{ backgroundColor: '#f5f5dc', color: '#3d5a3d' }}>
              <Link to="/audit">{t.homepage.ctaGetAudit}</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Two Core Pillars of Growth */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-6">
            <p className="text-accent font-semibold text-[15px]">{t.homepage.pillarsSubtitle}</p>
          </AnimatedSection>
          <AnimatedSection className="text-center mb-16">
            <h2 
              className="text-[40px] md:text-[52px] lg:text-[60px] mb-6 leading-[1.1] tracking-[-0.03em]"
              style={{ fontWeight: 800, color: '#2d4a2d' }}
            >
              {t.homepage.pillarsTitle}
            </h2>
            <p className="text-[18px] md:text-[20px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.homepage.pillarsDescription}
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {t.homepage.services.map((service, index) => {
              const Icon = serviceIcons[index];
              return (
                <AnimatedSection key={index} delay={index * 0.08}>
                  <Card className="h-full border bg-white hover:shadow-lg transition-shadow rounded-2xl">
                    <CardHeader className="pb-4">
                      <Icon className="h-8 w-8 text-accent mb-4" />
                      <CardTitle className="text-[20px] md:text-[22px] font-bold">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-[16px] md:text-[17px] leading-[1.7]">{service.description}</CardDescription>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-24 md:py-32 bg-accent">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <h2 
              className="text-[40px] md:text-[52px] lg:text-[60px] text-white mb-6 leading-[1.1] tracking-[-0.03em]"
              style={{ fontWeight: 800 }}
            >
              {t.homepage.differentTitle}
            </h2>
            <p className="text-[18px] md:text-[20px] text-white/90 max-w-2xl mx-auto leading-relaxed">
              {t.homepage.differentSubtitle}
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-14">
            <AnimatedSection direction="left" delay={0.1}>
              <Card className="bg-white border-0 h-full rounded-2xl shadow-xl">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-5">
                    <Target className="h-7 w-7 text-accent" />
                  </div>
                  <CardTitle className="text-[22px] md:text-[24px] font-bold text-foreground">{t.homepage.differentExperts}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[16px] md:text-[18px] text-muted-foreground leading-[1.7]">
                    {t.homepage.differentExpertsDesc}
                  </CardDescription>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2}>
              <Card className="bg-white border-0 h-full rounded-2xl shadow-xl">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-5">
                    <BarChart3 className="h-7 w-7 text-accent" />
                  </div>
                  <CardTitle className="text-[22px] md:text-[24px] font-bold text-foreground">{t.homepage.differentTransparency}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[16px] md:text-[18px] text-muted-foreground leading-[1.7]">
                    {t.homepage.differentTransparencyDesc}
                  </CardDescription>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-14">
            <AnimatedSection direction="left" delay={0.3}>
              <Card className="bg-white border-0 h-full rounded-2xl shadow-xl">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-5">
                    <Zap className="h-7 w-7 text-accent" />
                  </div>
                  <CardTitle className="text-[22px] md:text-[24px] font-bold text-foreground">{t.homepage.differentData}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[16px] md:text-[18px] text-muted-foreground leading-[1.7]">
                    {t.homepage.differentDataDesc}
                  </CardDescription>
                </CardContent>
              </Card>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.4}>
              <Card className="bg-white border-0 h-full rounded-2xl shadow-xl">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-5">
                    <Users className="h-7 w-7 text-accent" />
                  </div>
                  <CardTitle className="text-[22px] md:text-[24px] font-bold text-foreground">{t.homepage.differentPartnership}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[16px] md:text-[18px] text-muted-foreground leading-[1.7]">
                    {t.homepage.differentPartnershipDesc}
                  </CardDescription>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.5} className="text-center">
            <Button asChild className="bg-white text-foreground hover:bg-white/95 rounded-full h-14 px-10 text-[16px] font-semibold shadow-lg">
              <Link to="/contact">{t.contact.form.submit}</Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Playbook Download */}
      <section className="py-24 md:py-32 bg-[#f8f9f5]">
        <div className="container">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  <span className="text-accent text-[14px] font-semibold">{t.playbook.title}</span>
                </div>
                <h2 
                  className="text-[40px] md:text-[52px] lg:text-[56px] leading-[1.08] tracking-[-0.03em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {t.playbook.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-muted-foreground leading-[1.7]">
                  {t.playbook.description}
                </p>
                <Button 
                  asChild 
                  className="rounded-full h-14 px-10 text-[16px] font-semibold shadow-md"
                  style={{ backgroundColor: '#8BC34A', color: 'white' }}
                >
                  <a href="/downloads/advantage-plus-growth-playbook.pdf" download>
                    {t.playbook.cta} <Download className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
              <div className="flex justify-center items-center">
                <motion.div
                  initial={{ opacity: 0, y: 40, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    boxShadow: "0 30px 60px -15px rgba(0,0,0,0.25)"
                  }}
                  className="relative"
                  style={{ perspective: 1000 }}
                >
                  <motion.div 
                    className="absolute inset-0 rounded-3xl opacity-40 blur-2xl"
                    style={{ backgroundColor: '#8BC34A' }}
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <Card className="relative bg-white shadow-2xl border-0 rounded-3xl w-80 md:w-96">
                    <CardContent className="p-12 md:p-16 text-center">
                      <motion.p 
                        className="text-accent text-[14px] md:text-[16px] font-bold mb-4 tracking-widest"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        HIPERVINCULO
                      </motion.p>
                      <motion.p 
                        className="text-[18px] md:text-[20px] text-muted-foreground mb-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        Advantage+
                      </motion.p>
                      <motion.p 
                        className="text-[32px] md:text-[40px] font-extrabold text-foreground leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                      >
                        Growth<br />Playbook
                      </motion.p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Clients Stay */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-6">
            <h2 
              className="text-[48px] md:text-[60px] lg:text-[72px] mb-4 leading-[1.05] tracking-[-0.02em]"
              style={{ fontWeight: 800, color: '#1a1a2e' }}
            >
              {t.homepage.partnersTitle}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16 lg:gap-24 max-w-4xl mx-auto">
              <div className="text-center">
                <div 
                  className="text-[48px] md:text-[64px] lg:text-[72px] mb-2 leading-none"
                  style={{ fontWeight: 800, color: '#8BC34A' }}
                >
                  20+
                </div>
                <p className="text-[14px] md:text-[16px] text-muted-foreground">{t.homepage.trustBadge1}</p>
              </div>
              <div className="text-center">
                <div 
                  className="text-[48px] md:text-[64px] lg:text-[72px] mb-2 leading-none"
                  style={{ fontWeight: 800, color: '#8BC34A' }}
                >
                  $100M+
                </div>
                <p className="text-[14px] md:text-[16px] text-muted-foreground">{t.provenResults.stat1}</p>
              </div>
              <div className="text-center">
                <div 
                  className="text-[48px] md:text-[64px] lg:text-[72px] mb-2 leading-none"
                  style={{ fontWeight: 800, color: '#8BC34A' }}
                >
                  5-8
                </div>
                <p className="text-[14px] md:text-[16px] text-muted-foreground">{t.homepage.trustBadge2}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 md:py-24 bg-[#f5f5f5]">
        <div className="container">
          <AnimatedSection className="text-center mb-12">
            <h3 className="text-[28px] md:text-[32px] font-bold mb-4" style={{ color: '#2d4a2d' }}>{t.homepage.industriesTitle}</h3>
            <p className="text-[17px] md:text-[18px] text-muted-foreground">
              {t.homepage.industriesSubtitle}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {t.homepage.industries.map((industry, index) => {
                const Icon = industryIcons[index];
                return (
                  <div 
                    key={index}
                    className="group bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-accent/30"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <h4 className="text-[14px] md:text-[15px] font-bold text-foreground mb-1 tracking-wide">
                      {industry.name}
                    </h4>
                    <p className="text-[12px] md:text-[13px] text-muted-foreground">
                      {industry.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Performance Guarantee */}
      <section className="py-24 md:py-32 bg-primary text-primary-foreground overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            <AnimatedSection direction="left">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                  <Award className="h-4 w-4 text-accent" />
                  <span className="text-white text-[14px] font-medium">{t.guarantee.subtitle}</span>
                </div>
                
                <h2 
                  className="text-[44px] md:text-[56px] lg:text-[64px] text-white leading-[1.05] tracking-[-0.03em]"
                  style={{ fontWeight: 800 }}
                >
                  {t.guarantee.subtitle}
                </h2>
                
                <p className="text-[17px] md:text-[18px] text-primary-foreground/80 leading-[1.7] max-w-lg">
                  {t.guarantee.description}
                </p>
                <p className="text-[13px] md:text-[14px] text-primary-foreground/60 leading-[1.6] max-w-lg">
                  {t.guarantee.disclaimer}
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="right" delay={0.2}>
              <div className="relative">
                <div className="absolute top-8 -right-4 w-full h-full bg-white/10 rounded-3xl transform rotate-3"></div>
                
                <Card className="relative bg-white border-0 shadow-2xl rounded-3xl">
                  <CardContent className="p-12 md:p-16 text-center">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 border-2" style={{ borderColor: '#8BC34A' }}>
                      <ShieldCheck className="h-10 w-10" style={{ color: '#8BC34A' }} />
                    </div>
                    <h3 
                      className="text-[28px] md:text-[36px] text-foreground mb-3 leading-[1.15] tracking-[-0.02em]"
                      style={{ fontWeight: 800 }}
                    >
                      {t.guarantee.title}
                    </h3>
                    <p className="text-[16px] md:text-[18px] text-muted-foreground">{t.guarantee.stat} {t.guarantee.statLabel}</p>
                  </CardContent>
                </Card>
              </div>
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
              style={{ fontWeight: 800, color: '#1a1a2e' }}
            >
              {t.pricing.title}
            </h2>
            <p className="text-[18px] md:text-[20px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.pricing.subtitle}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="max-w-3xl mx-auto">
              <Card className="border-2 rounded-3xl shadow-sm" style={{ borderColor: '#8BC34A' }}>
                <CardContent className="text-center py-14 px-8 md:px-16">
                  <h3 
                    className="text-[28px] md:text-[36px] lg:text-[42px] mb-6 leading-[1.15] tracking-[-0.02em]"
                    style={{ fontWeight: 800, color: '#1a1a2e' }}
                  >
                    {t.pricingPage.title}
                  </h3>
                  <p className="text-[16px] md:text-[18px] text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
                    {t.pricingPage.subtitle}
                  </p>
                  <Button asChild size="lg" className="rounded-full h-14 px-10 text-[16px] font-semibold shadow-md" style={{ backgroundColor: '#8BC34A', color: 'white' }}>
                    <Link to="/pricing">{t.pricing.viewAll} <ArrowRight className="ml-2 h-5 w-5" /></Link>
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
            <p className="text-accent font-semibold text-[15px]">{t.partners.title}</p>
          </AnimatedSection>
          <AnimatedSection className="text-center mb-16">
            <h2 
              className="text-[40px] md:text-[52px] lg:text-[60px] mb-5 leading-[1.1] tracking-[-0.03em]"
              style={{ fontWeight: 800, color: '#2d4a2d' }}
            >
              {t.partners.title}
            </h2>
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
            <p className="text-accent font-medium text-[15px]">{t.homepage.faqTitle}</p>
          </AnimatedSection>
          <AnimatedSection className="text-center mb-16">
            <h2 
              className="text-[40px] md:text-[52px] lg:text-[60px] leading-[1.1] tracking-[-0.03em]"
              style={{ fontWeight: 800, color: '#2d4a2d' }}
            >
              {t.homepage.faqTitle}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              {t.homepage.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50">
                  <AccordionTrigger className="text-left text-[18px] md:text-[20px] font-medium py-6 text-foreground">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-[16px] md:text-[17px] text-muted-foreground pb-6 leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#8BC34A' }}>
        <div className="container text-center">
          <AnimatedSection className="max-w-3xl mx-auto space-y-8">
            <h2 
              className="text-[40px] md:text-[56px] lg:text-[64px] text-white leading-[1.05] tracking-[-0.03em]"
              style={{ fontWeight: 800 }}
            >
              {t.homepage.ctaTitle}
            </h2>
            <p className="text-[18px] md:text-[20px] text-white/80 leading-relaxed max-w-2xl mx-auto">
              {t.homepage.ctaSubtitle}
            </p>
            <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/95 rounded-full h-14 px-10 text-[16px] font-semibold shadow-lg mt-4">
              <Link to="/audit">{t.homepage.ctaGetAudit} <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
