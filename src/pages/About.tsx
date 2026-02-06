import { Link } from 'react-router-dom';
import { ArrowRight, Target, Users, TrendingUp, Award, Shield, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/motion';
import { motion } from 'framer-motion';

export default function About() {
  const stats = [
    { value: '$100M+', label: 'Managed Ad Spend' },
    { value: '20+', label: 'Years of Experience' },
    { value: '5-8', label: 'Years Avg. Retention' },
  ];

  const values = [
    { icon: Target, title: 'Consistency', description: 'Systems that deliver predictable results month after month.' },
    { icon: Shield, title: 'Clarity', description: 'Transparent reporting and real metrics that matter.' },
    { icon: TrendingUp, title: 'Longevity', description: 'Infrastructure that compounds over time, not quick wins.' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative py-28 md:py-36 overflow-hidden"
        style={{ backgroundColor: '#f8f9f5' }}
      >
        {/* Diagonal pattern background */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #2d4a2d 0px,
              #2d4a2d 1px,
              transparent 1px,
              transparent 12px
            )`
          }}
        />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <AnimatedSection>
              <p className="text-accent font-semibold text-[15px] mb-4">About Us</p>
              <h1 
                className="text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.03em] mb-6"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                About Hipervinculo
              </h1>
              <p className="text-[15px] md:text-[16px] text-muted-foreground max-w-none mx-auto whitespace-nowrap">
                We build performance-driven growth systems for businesses ready to scale.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Main Insight Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <AnimatedSection direction="left">
              <div className="space-y-8">
                <h2 
                  className="text-[36px] md:text-[44px] lg:text-[52px] leading-[1.1] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  Built around a simple realization
                </h2>
                <p className="text-[18px] md:text-[20px] text-muted-foreground leading-relaxed">
                  Most businesses don't fail because they lack marketing. They fail because they lack a system.
                </p>
                <div className="space-y-4">
                  <p className="text-[17px] text-muted-foreground leading-relaxed">
                    Over the last two decades, we've seen the same pattern repeat across industries — service companies, local brands, and eCommerce businesses alike.
                  </p>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="right" delay={0.2}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="bg-white shadow-2xl border-0 rounded-3xl overflow-hidden">
                  <CardContent className="p-10 md:p-14 space-y-6">
                    <p className="text-[18px] font-semibold text-foreground">Traffic is not the problem.</p>
                    <p className="text-[18px] font-semibold text-foreground">Clicks are not the problem.</p>
                    <p className="text-[18px] font-semibold text-foreground">Even advertising is rarely the real problem.</p>
                    <div className="pt-4 border-t">
                      <p className="text-[20px] font-bold" style={{ color: '#8BC34A' }}>
                        The problem is what happens after someone arrives.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* We Don't Run Campaigns Section */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#2d4a2d' }}>
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <h2 
                className="text-[40px] md:text-[52px] lg:text-[60px] text-white leading-[1.1] tracking-[-0.02em] mb-6"
                style={{ fontWeight: 800 }}
              >
                We Don't Run Campaigns<br />in Isolation
              </h2>
              <p className="text-[18px] md:text-[20px] text-white/80 max-w-3xl mx-auto leading-relaxed">
                Hipervinculo is not an ads-only agency. We build performance-driven growth systems — the kind of infrastructure that turns attention into opportunity.
              </p>
            </AnimatedSection>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <AnimatedSection delay={0.1}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white/10 backdrop-blur border-0 h-full rounded-2xl">
                    <CardContent className="p-8 md:p-10">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: '#8BC34A' }}>
                        <BarChart3 className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-[22px] font-bold text-white mb-4">Conversion-Focused Design</h3>
                      <p className="text-[16px] text-white/70 leading-relaxed">
                        Sometimes that means designing a conversion-focused website from the ground up.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
              
              <AnimatedSection delay={0.2}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white/10 backdrop-blur border-0 h-full rounded-2xl">
                    <CardContent className="p-8 md:p-10">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: '#8BC34A' }}>
                        <Users className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-[22px] font-bold text-white mb-4">Lead Intake Systems</h3>
                      <p className="text-[16px] text-white/70 leading-relaxed">
                        Engineering lead intake systems that make it easy for prospects to call, inquire, or start a conversation.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            </div>
            
            <AnimatedSection delay={0.3}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="bg-white border-0 rounded-3xl shadow-2xl max-w-3xl mx-auto">
                  <CardContent className="py-16 md:py-20 px-10 md:px-16 text-center space-y-4">
                    <p className="text-[28px] md:text-[36px] lg:text-[42px] font-extrabold leading-tight" style={{ color: '#2d4a2d' }}>
                      Ads are fuel.
                    </p>
                    <p className="text-[28px] md:text-[36px] lg:text-[42px] font-extrabold leading-tight" style={{ color: '#8BC34A' }}>
                      The system is the engine.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Built for Stability Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <AnimatedSection className="text-center mb-16">
            <h2 
              className="text-[40px] md:text-[52px] lg:text-[60px] leading-[1.1] tracking-[-0.02em] mb-6"
              style={{ fontWeight: 800, color: '#2d4a2d' }}
            >
              Built for Businesses<br />That Want Stability
            </h2>
            <p className="text-[18px] md:text-[20px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Many of our clients are not looking for experiments. They are looking for something rare in digital marketing.
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white border-2 border-border/50 h-full rounded-2xl hover:shadow-xl transition-shadow">
                    <CardContent className="p-8 md:p-10 text-center">
                      <motion.div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                        style={{ backgroundColor: '#8BC34A' }}
                        whileHover={{ rotate: 5 }}
                      >
                        <value.icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <h3 className="text-[24px] font-bold text-foreground mb-4">{value.title}</h3>
                      <p className="text-[16px] text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Stats Section */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#8BC34A' }}>
        <div className="container">
          <AnimatedSection className="text-center mb-6">
            <h2 
              className="text-[40px] md:text-[52px] lg:text-[60px] text-white leading-[1.1] tracking-[-0.02em] mb-4"
              style={{ fontWeight: 800 }}
            >
              Experience That Goes<br />Beyond Theory
            </h2>
            <p className="text-[16px] text-white/80 mb-16">
              Hipervinculo has managed over $100M in advertising spend across platforms.
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <div className="flex justify-center gap-16 md:gap-24 lg:gap-32 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.15, type: "spring", stiffness: 100 }}
                >
                  <motion.p 
                    className="text-[48px] md:text-[64px] lg:text-[72px] font-extrabold text-white mb-2 leading-none"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.15, type: "spring", stiffness: 150 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-[14px] md:text-[16px] text-white/80">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* The Best Marketing Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 
                className="text-[36px] md:text-[44px] lg:text-[52px] leading-[1.1] tracking-[-0.02em] mb-12"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                The best marketing is not louder
              </h2>
            </AnimatedSection>
            
            <AnimatedSection delay={0.1}>
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                {['Cleaner', 'Structured', 'Measurable', 'Built on architecture'].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="py-6 px-4 rounded-2xl"
                    style={{ backgroundColor: '#f8f9f5' }}
                  >
                    <p className="text-[18px] font-bold" style={{ color: '#2d4a2d' }}>{item}</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-[18px] text-muted-foreground leading-relaxed">
                We approach growth with the mindset of engineers, not hype.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Who We Work With Section */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#f8f9f5' }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <AnimatedSection direction="left">
              <h2 
                className="text-[40px] md:text-[52px] lg:text-[56px] leading-[1.1] tracking-[-0.02em] mb-8"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                Who We<br />Work With
              </h2>
              <p className="text-[18px] text-muted-foreground leading-relaxed mb-6">
                Hipervinculo is built for serious businesses. Companies that already have demand, but want to capture it more effectively.
              </p>
              <p className="text-[18px] text-muted-foreground leading-relaxed mb-8">
                Businesses that understand that growth is not a campaign — it is a system.
              </p>
              <div 
                className="p-6 rounded-2xl"
                style={{ backgroundColor: '#8BC34A' }}
              >
                <p className="text-[20px] font-bold text-white">
                  Building a growth engine that lasts.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection direction="right" delay={0.2}>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="p-6 bg-white rounded-2xl shadow-lg"
                >
                  <p className="text-[17px] text-foreground">
                    Service-based companies looking for predictable inbound leads
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="p-6 bg-white rounded-2xl shadow-lg"
                >
                  <p className="text-[17px] text-foreground">
                    Established brands looking for scalable performance
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="p-6 bg-white rounded-2xl shadow-lg"
                >
                  <p className="text-[17px] text-foreground">
                    eCommerce stores ready to scale past $1M/month
                  </p>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* The Hipervinculo Standard */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 mb-8">
                <Award className="w-5 h-5 text-accent" />
                <span className="text-accent text-[14px] font-semibold">Our Standard</span>
              </div>
              <h2 
                className="text-[40px] md:text-[52px] lg:text-[60px] leading-[1.1] tracking-[-0.02em] mb-8"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                The Hipervinculo Standard
              </h2>
              <p className="text-[18px] md:text-[20px] text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto">
                We believe in long-term partnerships, clear execution, and systems that speak for themselves.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="flex justify-center gap-8 md:gap-12 flex-wrap">
                {['No noise', 'No gimmicks', 'No vanity metrics'].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-[18px] md:text-[20px] font-bold"
                    style={{ color: '#8BC34A' }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
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
              Ready to see if your website is built to convert?
            </h2>
            <p className="text-[18px] md:text-[20px] text-white/80 leading-relaxed max-w-2xl mx-auto">
              Start a conversation with us. We'll tell you the truth about what's working, what isn't, and what it would take to build a system that generates real opportunities.
            </p>
            <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/95 rounded-full h-14 px-10 text-[16px] font-semibold shadow-lg mt-4">
              <Link to="/contact">Message Hipervinculo <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
