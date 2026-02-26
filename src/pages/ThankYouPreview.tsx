import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export default function ThankYouPreview() {
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-1004326069/preview_lead_conversion',
        });
      }
      if (window.fbq) {
        window.fbq('track', 'Lead', { content_name: 'Free Preview' });
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const content = {
    en: {
      title: "You're All Set! We'll Be in Touch Soon",
      text: "Thanks for booking your strategy call! You'll receive a confirmation email shortly with all the details. We may also give you a quick call or text to confirm the time — please keep an eye out and answer when we reach out. We're excited to learn about your business!",
      backHome: 'Back to Home',
      bookCall: 'View Our Portfolio',
      portfolioTitle: "Recent Projects We've Built",
      portfolioSubtitle: "While you wait, take a look at some of the websites we've recently developed for our clients.",
      viewAll: 'View Full Portfolio',
    },
    es: {
      title: '¡Listo! Nos Pondremos en Contacto Pronto',
      text: '¡Gracias por agendar tu llamada de estrategia! Recibirás un email de confirmación con todos los detalles. También es posible que te llamemos o enviemos un mensaje para confirmar la hora — por favor estate atento y responde cuando te contactemos. ¡Estamos emocionados de conocer tu negocio!',
      backHome: 'Volver al Inicio',
      bookCall: 'Ver Nuestro Portafolio',
      portfolioTitle: 'Proyectos Recientes que Hemos Construido',
      portfolioSubtitle: 'Mientras esperas, echa un vistazo a algunos de los sitios web que hemos desarrollado recientemente para nuestros clientes.',
      viewAll: 'Ver Portafolio Completo',
    },
  };

  const t = content[language];

  return (
    <Layout hideBottomCta>
      <SEO
        title={language === 'en' ? 'Thank You | Website Preview' : 'Gracias | Vista Previa'}
        description={t.text}
        url="https://hipervinculo.net/thank-you/preview"
      />
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-lg space-y-6 text-center">
            <div className="mx-auto w-fit rounded-full bg-accent/10 p-4">
              <CheckCircle className="h-12 w-12 text-accent" />
            </div>
            <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">
              {t.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t.text}
            </p>
            <div className="flex flex-col items-center gap-3 pt-4 sm:flex-row sm:justify-center">
              <Button asChild variant="outline" className="rounded-xl">
                <Link to="/">{t.backHome}</Link>
              </Button>
              <Button asChild className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/book">
                  {t.bookCall}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">{t.portfolioTitle}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t.portfolioSubtitle}</p>
          </div>
          <PortfolioGrid limit={6} />
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="rounded-full px-6 border-2" style={{ borderColor: '#8BC34A', color: '#2d4a2d' }}>
              <Link to="/portfolio">
                {t.viewAll}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
