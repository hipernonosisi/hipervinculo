import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { websiteScoreTranslations } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ThankYouWebsiteScore() {
  const { language } = useLanguage();
  const t = websiteScoreTranslations[language].thankYou;

  useEffect(() => {
    // Fire conversion event after delay to ensure gtag is loaded
    const timer = setTimeout(() => {
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-1004326069/website_score_conversion',
        });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <SEO
        title={language === 'en' ? 'Thank You | Website Score' : 'Gracias | Score Web'}
        description={t.text}
        url="https://hipervinculo.net/thank-you/website-score"
      />
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-lg space-y-6 text-center">
            <div className="mx-auto w-fit rounded-full bg-accent/10 p-4">
              <CheckCircle className="h-12 w-12 text-accent" />
            </div>
            <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">{t.title}</h1>
            <p className="text-lg text-muted-foreground">{t.text}</p>
            <div className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-center">
              <Button asChild variant="outline" className="rounded-xl">
                <Link to="/">{t.backHome}</Link>
              </Button>
              <Button asChild className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/services">
                  {t.exploreServices}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
