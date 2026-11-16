import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
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

export default function ThankYouPreview() {
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-1004326069/6gFiCNye54EcELWZ894D',
        });
      }
      if (window.fbq) {
        window.fbq('track', 'Lead', { content_name: 'Free Preview' });
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const content = {
    en: {
      title: "You're All Set! We'll Be in Touch Soon",
      text: "Thanks for booking your strategy call! You'll receive a confirmation email shortly with all the details. We may also give you a quick call or text to confirm the time — please keep an eye out and answer when we reach out. We're excited to learn about your business!",
      backHome: 'Back to Home',
    },
    es: {
      title: '¡Listo! Nos Pondremos en Contacto Pronto',
      text: '¡Gracias por agendar tu llamada de estrategia! Recibirás un email de confirmación con todos los detalles. También es posible que te llamemos o enviemos un mensaje para confirmar la hora — por favor estate atento y responde cuando te contactemos. ¡Estamos emocionados de conocer tu negocio!',
      backHome: 'Volver al Inicio',
    },
  };

  const t = content[language];

  return (
    <Layout hideBottomCta>
      <SEO
        title={language === 'en' ? 'Call Confirmed | Hipervínculo' : 'Llamada Confirmada | Hipervínculo'}
        description={language === 'en' ? 'Your strategy call has been scheduled. We will confirm via email and phone shortly.' : 'Tu llamada de estrategia ha sido agendada. Te confirmaremos por email y teléfono en breve.'}
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
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
