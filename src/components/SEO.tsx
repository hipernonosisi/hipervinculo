import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "service";
  noIndex?: boolean;
  structuredData?: object;
}

const defaultMeta = {
  en: {
    title: "Hipervínculo | Digital Growth Agency for eCommerce",
    description:
      "Your growth partner for ambitious eCommerce. We help brands scale profitably through Meta Ads, Google Ads, SEO, Email Marketing, and data-driven strategies.",
    keywords:
      "eCommerce agency, digital marketing, Meta Ads, Google Ads, SEO, email marketing, lead generation, growth marketing, performance marketing, ROAS optimization",
  },
  es: {
    title: "Hipervínculo | Agencia de Crecimiento Digital para eCommerce",
    description:
      "Tu socio de crecimiento para eCommerce ambicioso. Ayudamos a marcas a escalar de manera rentable a través de Meta Ads, Google Ads, SEO, Email Marketing y estrategias basadas en datos.",
    keywords:
      "agencia eCommerce, marketing digital, Meta Ads, Google Ads, SEO, email marketing, generación de leads, growth marketing, marketing de rendimiento, optimización ROAS",
  },
};

export function SEO({
  title,
  description,
  keywords,
  image = "https://hipervinculo.net/og-image.png",
  url = "https://hipervinculo.net",
  type = "website",
  noIndex = false,
  structuredData,
}: SEOProps) {
  const { language } = useLanguage();
  const defaults = defaultMeta[language];

  const finalTitle = title
    ? `${title} | Hipervínculo`
    : defaults.title;
  const finalDescription = description || defaults.description;
  const finalKeywords = keywords || defaults.keywords;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Language */}
      <html lang={language} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={language === "es" ? "es_ES" : "en_US"} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
