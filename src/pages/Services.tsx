import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Target, Globe, Search, LineChart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/motion';
import { motion } from 'framer-motion';

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
              <p className="text-accent font-semibold text-[15px] mb-4">What We Do</p>
              <h1 
                className="text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.03em] mb-6"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                Services
              </h1>
              <p className="text-[18px] md:text-[20px] text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
                Hipervinculo builds inbound growth systems that combine conversion infrastructure, lead generation strategy, and paid acquisition.
              </p>
              <p className="text-[16px] text-muted-foreground">
                We are not an "ads-only" agency.
              </p>
              <p className="text-[17px] font-semibold mt-2" style={{ color: '#8BC34A' }}>
                We build the foundation first — then scale what works.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container">
          <div className="space-y-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden border-2 border-border/50 rounded-2xl hover:shadow-xl transition-shadow">
                    <CardContent className="p-8 md:p-10">
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <motion.div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: '#8BC34A' }}
                          whileHover={{ rotate: 5 }}
                        >
                          <service.icon className="h-8 w-8 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 
                            className="text-[24px] md:text-[28px] font-extrabold mb-3"
                            style={{ color: '#2d4a2d' }}
                          >
                            {service.title}
                          </h3>
                          <p className="text-[16px] text-muted-foreground mb-6 leading-relaxed">
                            {service.description}
                          </p>
                          <ul className="grid md:grid-cols-2 gap-3">
                            {service.features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                                <span className="text-[15px] text-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          {service.note && (
                            <p className="text-[14px] text-muted-foreground mt-5 pt-5 border-t border-border/50">
                              {service.note}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#2d4a2d' }}>
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <h2 
                className="text-[40px] md:text-[52px] lg:text-[60px] text-white leading-[1.1] tracking-[-0.02em] mb-6"
                style={{ fontWeight: 800 }}
              >
                Ready to Scale<br />Your Business?
              </h2>
              <p className="text-[18px] md:text-[20px] text-white/80 max-w-2xl mx-auto leading-relaxed mb-10">
                Get a free performance audit and discover exactly how we can help you achieve your growth goals.
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-foreground hover:bg-white/90 rounded-full px-8 py-6 text-[16px] font-semibold h-auto"
                >
                  <Link to="/audit">
                    Schedule Your Free Audit 
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
}
