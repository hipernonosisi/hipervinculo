import { Link } from 'react-router-dom';
import { ArrowRight, Target, Users, TrendingUp, Award, Shield, BarChart3, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { AnimatedSection } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const { t, language } = useLanguage();

  const values = [
    { icon: Target, title: t.about.values.consistency, description: t.about.values.consistencyDesc },
    { icon: Shield, title: t.about.values.clarity, description: t.about.values.clarityDesc },
    { icon: TrendingUp, title: t.about.values.longevity, description: t.about.values.longevityDesc },
  ];

  return (
    <Layout>
      <SEO
        title={t.about.title}
        description={language === 'en' 
          ? "Learn about Hipervínculo, your growth partner for ambitious eCommerce. Over 20 years of experience and $100M+ in managed ad spend."
          : "Conoce a Hipervínculo, tu socio de crecimiento para eCommerce ambicioso. Más de 20 años de experiencia y $100M+ en inversión publicitaria gestionada."
        }
        url="https://hipervinculo.net/about"
      />
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
              <p className="text-accent font-semibold text-[15px] mb-4">{t.about.title}</p>
              <h1 
                className="text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.03em] mb-6"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                {t.about.heroTitle}
              </h1>
              <p className="text-[15px] md:text-[16px] text-muted-foreground max-w-none mx-auto whitespace-nowrap">
                {t.about.heroSubtitle}
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
                  {t.about.section1.title}
                </h2>
                <p className="text-[18px] md:text-[20px] text-muted-foreground leading-relaxed">
                  {t.about.section1.subtitle}
                </p>
                <div className="space-y-4">
                  <p className="text-[17px] text-muted-foreground leading-relaxed">
                    {t.about.section1.content}
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
                    <p className="text-[18px] font-semibold text-foreground">{t.about.section1.problem1}</p>
                    <p className="text-[18px] font-semibold text-foreground">{t.about.section1.problem2}</p>
                    <p className="text-[18px] font-semibold text-foreground">{t.about.section1.problem3}</p>
                    <div className="pt-4 border-t">
                      <p className="text-[20px] font-bold" style={{ color: '#8BC34A' }}>
                        {t.about.section1.conclusion}
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
                {t.about.section2.title}
              </h2>
              <p className="text-[18px] md:text-[20px] text-white/80 max-w-3xl mx-auto leading-relaxed">
                {t.about.section2.subtitle}
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
                      <h3 className="text-[22px] font-bold text-white mb-4">{t.about.section2.card1Title}</h3>
                      <p className="text-[16px] text-white/70 leading-relaxed">
                        {t.about.section2.card1Description}
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
                      <h3 className="text-[22px] font-bold text-white mb-4">{t.about.section2.card2Title}</h3>
                      <p className="text-[16px] text-white/70 leading-relaxed">
                        {t.about.section2.card2Description}
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
                <Card className="bg-white border-0 rounded-2xl shadow-2xl max-w-4xl mx-auto overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2">
                      {/* Text side */}
                      <div className="p-8 md:p-10 flex flex-col justify-center">
                        <p className="text-[20px] md:text-[24px] font-extrabold leading-tight mb-2" style={{ color: '#2d4a2d' }}>
                          {t.about.section2.fuelTitle}
                        </p>
                        <p className="text-[20px] md:text-[24px] font-extrabold leading-tight" style={{ color: '#8BC34A' }}>
                          {t.about.section2.engineTitle}
                        </p>
                      </div>
                      {/* Visual side */}
                      <div className="p-6 md:p-8 flex items-center justify-center" style={{ backgroundColor: '#f8f9f5' }}>
                        <div className="flex items-end gap-3 h-24">
                          {[40, 55, 45, 70, 60, 85, 75, 95].map((height, i) => (
                            <motion.div
                              key={i}
                              className="w-4 md:w-5 rounded-t-sm"
                              style={{ 
                                height: `${height}%`,
                                backgroundColor: i >= 6 ? '#8BC34A' : '#2d4a2d',
                                opacity: i < 4 ? 0.4 : i < 6 ? 0.7 : 1
                              }}
                              initial={{ scaleY: 0 }}
                              whileInView={{ scaleY: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
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
              {t.about.section3.title}
            </h2>
            <p className="text-[18px] md:text-[20px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t.about.section3.subtitle}
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
              {t.about.stats.title}
            </h2>
            <p className="text-[16px] text-white/80 mb-16">
              {t.about.stats.subtitle}
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* $100M+ - Bar Chart */}
              <motion.div 
                className="text-center bg-white/10 backdrop-blur rounded-2xl p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              >
                {/* Mini bar chart */}
                <div className="flex items-end justify-center gap-2 h-20 mb-6">
                  {[35, 50, 45, 65, 55, 80, 70, 95].map((height, i) => (
                    <motion.div
                      key={i}
                      className="w-3 rounded-t-sm bg-white"
                      style={{ opacity: i < 4 ? 0.4 : i < 6 ? 0.7 : 1 }}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                    />
                  ))}
                </div>
                <motion.p 
                  className="text-[40px] md:text-[52px] lg:text-[60px] font-extrabold text-white mb-2 leading-none"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
                >
                  {t.about.stats.adSpend}
                </motion.p>
                <p className="text-[14px] md:text-[16px] text-white/80">{t.about.stats.adSpendLabel}</p>
              </motion.div>

              {/* 20+ - Circular progress */}
              <motion.div 
                className="text-center bg-white/10 backdrop-blur rounded-2xl p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, type: "spring", stiffness: 100 }}
              >
                {/* Circular indicator */}
                <div className="flex justify-center mb-6">
                  <svg className="w-20 h-20" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="white"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="251.2"
                      initial={{ strokeDashoffset: 251.2 }}
                      whileInView={{ strokeDashoffset: 50 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
                      style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                    />
                  </svg>
                </div>
                <motion.p 
                  className="text-[40px] md:text-[52px] lg:text-[60px] font-extrabold text-white mb-2 leading-none"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55, type: "spring", stiffness: 150 }}
                >
                  {t.about.stats.years}
                </motion.p>
                <p className="text-[14px] md:text-[16px] text-white/80">{t.about.stats.yearsLabel}</p>
              </motion.div>

              {/* 5-8 - Line chart */}
              <motion.div 
                className="text-center bg-white/10 backdrop-blur rounded-2xl p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
              >
                {/* Mini line chart */}
                <div className="flex justify-center mb-6">
                  <svg className="w-full h-20" viewBox="0 0 120 60" preserveAspectRatio="none">
                    <motion.path
                      d="M 0 50 Q 20 45, 30 40 T 50 35 T 70 25 T 90 20 T 110 10 L 120 8"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, duration: 1.2, ease: "easeOut" }}
                    />
                    <motion.circle
                      cx="120"
                      cy="8"
                      r="5"
                      fill="white"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.9 }}
                    />
                  </svg>
                </div>
                <motion.p 
                  className="text-[40px] md:text-[52px] lg:text-[60px] font-extrabold text-white mb-2 leading-none"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 150 }}
                >
                  {t.about.stats.retention}
                </motion.p>
                <p className="text-[14px] md:text-[16px] text-white/80">{t.about.stats.retentionLabel}</p>
              </motion.div>
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
                {t.about.marketing.title}
              </h2>
            </AnimatedSection>
            
            <AnimatedSection delay={0.1}>
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                {t.about.marketing.items.map((item, index) => (
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
                {t.about.marketing.conclusion}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Who We Work With Section */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#2d4a2d' }}>
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection className="text-center mb-16">
              <h2 
                className="text-[40px] md:text-[52px] lg:text-[60px] text-white leading-[1.1] tracking-[-0.02em] mb-6"
                style={{ fontWeight: 800 }}
              >
                {t.about.whoWeWorkWith.title}
              </h2>
              <p className="text-[18px] text-white/70 max-w-2xl mx-auto leading-relaxed">
                {t.about.whoWeWorkWith.subtitle}
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <AnimatedSection delay={0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-8 h-full"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '#8BC34A' }}>
                    <Target className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-[20px] font-bold mb-3" style={{ color: '#2d4a2d' }}>
                    {t.about.whoWeWorkWith.card1Title}
                  </h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">
                    {t.about.whoWeWorkWith.card1Description}
                  </p>
                </motion.div>
              </AnimatedSection>

              {/* Card 2 */}
              <AnimatedSection delay={0.2}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-8 h-full"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '#8BC34A' }}>
                    <TrendingUp className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-[20px] font-bold mb-3" style={{ color: '#2d4a2d' }}>
                    {t.about.whoWeWorkWith.card2Title}
                  </h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">
                    {t.about.whoWeWorkWith.card2Description}
                  </p>
                </motion.div>
              </AnimatedSection>

              {/* Card 3 */}
              <AnimatedSection delay={0.3}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-8 h-full"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '#8BC34A' }}>
                    <ShoppingCart className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-[20px] font-bold mb-3" style={{ color: '#2d4a2d' }}>
                    {t.about.whoWeWorkWith.card3Title}
                  </h3>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">
                    {t.about.whoWeWorkWith.card3Description}
                  </p>
                </motion.div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.4} className="mt-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="inline-block px-8 py-4 rounded-full"
                style={{ backgroundColor: '#8BC34A' }}
              >
                <p className="text-[18px] font-bold text-white">
                  {t.about.whoWeWorkWith.badge}
                </p>
              </motion.div>
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
                <span className="text-accent text-[14px] font-semibold">{t.about.standard.badge}</span>
              </div>
              <h2 
                className="text-[40px] md:text-[52px] lg:text-[60px] leading-[1.1] tracking-[-0.02em] mb-8"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                {t.about.standard.title}
              </h2>
              <p className="text-[18px] md:text-[20px] text-muted-foreground leading-relaxed mb-12 max-w-2xl mx-auto">
                {t.about.standard.subtitle}
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="flex justify-center gap-8 md:gap-12 flex-wrap">
                {t.about.standard.items.map((item, index) => (
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

    </Layout>
  );
}
