import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/motion';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Privacy() {
  const { t } = useLanguage();

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
              <p className="text-accent font-semibold text-[15px] mb-4">Legal</p>
              <h1 
                className="text-[48px] md:text-[64px] lg:text-[80px] leading-[1.05] tracking-[-0.03em] mb-6"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                {t.privacy.title}
              </h1>
              <p className="text-[15px] md:text-[16px] text-muted-foreground max-w-2xl mx-auto">
                {t.privacy.lastUpdated}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Intro */}
            <AnimatedSection>
              <p className="text-[17px] text-muted-foreground leading-relaxed">
                {t.privacy.intro}
              </p>
            </AnimatedSection>

            {/* Information We Collect */}
            <AnimatedSection delay={0.1}>
              <div className="space-y-4">
                <h2 
                  className="text-[28px] md:text-[32px] leading-[1.2] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {t.privacy.sections.collect.title}
                </h2>
                <p className="text-[17px] text-muted-foreground leading-relaxed">
                  {t.privacy.sections.collect.content1}
                </p>
                <p className="text-[17px] text-muted-foreground leading-relaxed">
                  {t.privacy.sections.collect.content2}
                </p>
              </div>
            </AnimatedSection>

            {/* How We Use Your Information */}
            <AnimatedSection delay={0.2}>
              <div className="space-y-4">
                <h2 
                  className="text-[28px] md:text-[32px] leading-[1.2] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {t.privacy.sections.use.title}
                </h2>
                <p className="text-[17px] text-muted-foreground leading-relaxed">
                  {t.privacy.sections.use.content1}
                </p>
                <p className="text-[17px] text-muted-foreground leading-relaxed">
                  {t.privacy.sections.use.content2}
                </p>
              </div>
            </AnimatedSection>

            {/* How We Keep Your Information Secure */}
            <AnimatedSection delay={0.3}>
              <div className="space-y-4">
                <h2 
                  className="text-[28px] md:text-[32px] leading-[1.2] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {t.privacy.sections.security.title}
                </h2>
                <p className="text-[17px] text-muted-foreground leading-relaxed">
                  {t.privacy.sections.security.content}
                </p>
              </div>
            </AnimatedSection>

            {/* Changes to Our Privacy Policy */}
            <AnimatedSection delay={0.4}>
              <div className="space-y-4">
                <h2 
                  className="text-[28px] md:text-[32px] leading-[1.2] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {t.privacy.sections.changes.title}
                </h2>
                <p className="text-[17px] text-muted-foreground leading-relaxed">
                  {t.privacy.sections.changes.content}
                </p>
              </div>
            </AnimatedSection>

            {/* Contact Us */}
            <AnimatedSection delay={0.5}>
              <div className="space-y-4">
                <h2 
                  className="text-[28px] md:text-[32px] leading-[1.2] tracking-[-0.02em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {t.privacy.sections.contact.title}
                </h2>
                <p className="text-[17px] text-muted-foreground leading-relaxed">
                  {t.privacy.sections.contact.content}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
}
