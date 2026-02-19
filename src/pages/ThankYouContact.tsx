import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export default function ThankYouContact() {
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-1004326069/YPrACNLgnvobELWZ894D',
        });
      }
      if (window.fbq) {
        window.fbq('track', 'Lead', { content_name: 'Contact Form' });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <SEO
        title={language === 'en' ? 'Thank You | Hipervínculo' : 'Gracias | Hipervínculo'}
        description={language === 'en' ? 'Thank you for contacting us.' : 'Gracias por contactarnos.'}
        url="https://hipervinculo.net/thank-you/contact"
      />
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-lg space-y-6 text-center">
            <div className="mx-auto w-fit rounded-full bg-accent/10 p-4">
              <CheckCircle className="h-12 w-12 text-accent" />
            </div>
            <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {language === 'en' ? 'Thank you!' : '¡Gracias!'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {language === 'en'
                ? "We've received your message and will get back to you within 24 hours."
                : 'Hemos recibido tu mensaje y te responderemos en 24 horas.'}
            </p>
            <div className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-center">
              <Button asChild variant="outline" className="rounded-xl">
                <Link to="/">
                  {language === 'en' ? 'Back to Home' : 'Volver al Inicio'}
                </Link>
              </Button>
              <Button asChild className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/services">
                  {language === 'en' ? 'Explore Our Services' : 'Explora Nuestros Servicios'}
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
