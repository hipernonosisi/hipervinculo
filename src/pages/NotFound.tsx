import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Search, Megaphone, Globe, ShoppingBag, Palette } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const content = {
    en: {
      tag: "PAGE NOT FOUND",
      title: "404",
      subtitle: "Oops! This page doesn't exist.",
      description: "The page you're looking for may have been moved or no longer exists. But don't worry — we've got plenty of ways to help your business grow.",
      servicesTitle: "Explore Our Services",
      servicesSubtitle: "We help ambitious brands scale with performance-driven strategies.",
      cta: "Get in Touch",
      ctaSub: "Let's talk about how we can grow your business.",
      backHome: "Back to Home",
      services: [
        { icon: Megaphone, title: "Meta & Google Ads", desc: "Performance campaigns that drive real ROI." },
        { icon: Globe, title: "Landing Pages", desc: "High-converting pages built for growth." },
        { icon: ShoppingBag, title: "Shopify Development", desc: "Custom stores optimized for sales." },
        { icon: Palette, title: "Brand Identity", desc: "Stand out with a memorable brand." },
      ],
    },
    es: {
      tag: "PÁGINA NO ENCONTRADA",
      title: "404",
      subtitle: "¡Ups! Esta página no existe.",
      description: "La página que buscas pudo haber sido movida o ya no existe. Pero no te preocupes — tenemos muchas formas de ayudar a tu negocio a crecer.",
      servicesTitle: "Explora Nuestros Servicios",
      servicesSubtitle: "Ayudamos a marcas ambiciosas a escalar con estrategias basadas en rendimiento.",
      cta: "Contáctanos",
      ctaSub: "Hablemos sobre cómo hacer crecer tu negocio.",
      backHome: "Volver al Inicio",
      services: [
        { icon: Megaphone, title: "Meta & Google Ads", desc: "Campañas de rendimiento con ROI real." },
        { icon: Globe, title: "Landing Pages", desc: "Páginas de alta conversión para crecer." },
        { icon: ShoppingBag, title: "Desarrollo Shopify", desc: "Tiendas personalizadas para vender más." },
        { icon: Palette, title: "Identidad de Marca", desc: "Destaca con una marca memorable." },
      ],
    },
  };

  const t = content[language];

  return (
    <Layout>
      {/* Hero 404 */}
      <section className="bg-primary py-24 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <span className="mb-4 inline-block rounded-full bg-accent/20 px-4 py-1.5 text-xs font-bold tracking-widest text-accent">
            {t.tag}
          </span>
          <h1 className="mb-4 text-[120px] font-extrabold leading-none text-primary-foreground md:text-[180px]">
            {t.title}
          </h1>
          <p className="mx-auto mb-3 max-w-lg text-xl font-semibold text-primary-foreground">
            {t.subtitle}
          </p>
          <p className="mx-auto mb-8 max-w-md text-base text-primary-foreground/70">
            {t.description}
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              {t.backHome}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Promo */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-extrabold text-foreground md:text-4xl">
              {t.servicesTitle}
            </h2>
            <p className="mx-auto max-w-lg text-muted-foreground">
              {t.servicesSubtitle}
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            {t.services.map((service) => (
              <Link
                key={service.title}
                to="/services"
                className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <service.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-foreground">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </div>
                <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-6 text-center">
          <Search className="mx-auto mb-4 h-8 w-8 text-accent" />
          <h3 className="mb-2 text-2xl font-extrabold text-foreground">{t.cta}</h3>
          <p className="mx-auto mb-6 max-w-md text-muted-foreground">{t.ctaSub}</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
