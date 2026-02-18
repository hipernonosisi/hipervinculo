import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { portfolioProjects } from '@/data/portfolioData';
import NotFound from './NotFound';

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();

  const projectIndex = portfolioProjects.findIndex((p) => p.slug === slug);
  const project = portfolioProjects[projectIndex];

  if (!project) return <NotFound />;

  const nextProject = portfolioProjects[(projectIndex + 1) % portfolioProjects.length];
  const prevProject = portfolioProjects[(projectIndex - 1 + portfolioProjects.length) % portfolioProjects.length];

  const t = {
    en: {
      back: 'Back to Portfolio',
      overview: 'Overview',
      services: 'Services Used',
      results: 'Results',
      visitSite: 'Visit Live Site',
      nextProject: 'Next Project',
      prevProject: 'Previous Project',
      ctaTitle: 'Want Results Like These?',
      ctaText: 'Get a custom preview of what your new website\ncould look like — at no cost.',
      ctaButton: 'Get Your Free Preview',
    },
    es: {
      back: 'Volver al Portafolio',
      overview: 'Descripción',
      services: 'Servicios Utilizados',
      results: 'Resultados',
      visitSite: 'Visitar Sitio',
      nextProject: 'Siguiente Proyecto',
      prevProject: 'Proyecto Anterior',
      ctaTitle: '¿Quieres Resultados Como Estos?',
      ctaText: 'Obtén una vista previa personalizada de cómo podría verse\ntu nuevo sitio web — sin costo.',
      ctaButton: 'Obtén Tu Vista Previa Gratis',
    },
  };

  const c = t[language];

  return (
    <Layout>
      <SEO
        title={`${project.name} — ${language === 'en' ? 'Case Study' : 'Caso de Éxito'}`}
        description={project.overview[language].slice(0, 155)}
        url={`https://hipervinculo.net/portfolio/${project.slug}`}
      />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
        <div className="container relative z-10">
          <AnimatedSection>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-[14px] text-muted-foreground hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {c.back}
            </Link>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
              <div>
                <span
                  className="inline-block text-[12px] font-semibold px-3 py-1 rounded-full mb-4"
                  style={{ backgroundColor: '#8BC34A20', color: '#6d9a2b' }}
                >
                  {project.industry[language]}
                </span>
                <h1
                  className="text-[40px] md:text-[56px] lg:text-[64px] leading-[1.05] tracking-[-0.03em]"
                  style={{ fontWeight: 800, color: '#2d4a2d' }}
                >
                  {project.name}
                </h1>
                <p className="text-[17px] text-muted-foreground mt-3 max-w-xl">
                  {project.tagline[language]}
                </p>
              </div>

              <Button
                asChild
                className="bg-accent hover:bg-accent/90 text-white rounded-full px-6 h-11 font-semibold text-[14px] shrink-0"
              >
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  {c.visitSite}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Screenshot */}
      {project.image && (
        <section className="bg-white">
          <div className="container py-12 md:py-16">
            <AnimatedSection>
              <div className="relative">
                <motion.div
                  className="rounded-2xl overflow-hidden border-2 border-border/30 shadow-2xl"
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.4 }}
                >
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={project.image}
                      alt={`${project.name} website screenshot`}
                      className="w-full object-cover object-top"
                    />
                  </a>
                </motion.div>
                {project.imageMobile && (
                  <motion.div
                    className="absolute -bottom-8 right-4 md:right-8 w-[18%] md:w-[15%] rounded-xl overflow-hidden shadow-2xl border-3 border-white z-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <img
                      src={project.imageMobile}
                      alt={`${project.name} mobile screenshot`}
                      className="w-full object-cover object-top"
                    />
                  </motion.div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Extra Screenshots Gallery */}
      {project.extraImages.filter(img => img !== project.image && img !== project.imageMobile).length > 0 && (
        <section className="bg-white pb-12 md:pb-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.extraImages
                .filter(img => img !== project.image && img !== project.imageMobile)
                .map((img, i) => (
                  <AnimatedSection key={img} delay={i * 0.1}>
                    <motion.div
                      className="rounded-2xl overflow-hidden border-2 border-border/30 shadow-lg aspect-video"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={img}
                        alt={`${project.name} screenshot ${i + 1}`}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                      />
                    </motion.div>
                  </AnimatedSection>
                ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Overview */}
            <div className="md:col-span-2">
              <AnimatedSection>
                <h2 className="text-[13px] font-bold uppercase tracking-widest text-accent mb-4">{c.overview}</h2>
                <p className="text-[16px] text-foreground leading-relaxed">{project.overview[language]}</p>
              </AnimatedSection>
            </div>

            {/* Services Used */}
            <div>
              <AnimatedSection delay={0.1}>
                <h2 className="text-[13px] font-bold uppercase tracking-widest text-accent mb-4">{c.services}</h2>
                <ul className="space-y-2">
                  {project.servicesUsed[language].map((service) => (
                    <li key={service} className="text-[15px] text-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {service}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      {project.outcomes.length > 0 && (
        <section className="py-16 md:py-24" style={{ backgroundColor: '#2d4a2d' }}>
          <div className="container">
            <AnimatedSection>
              <h2 className="text-[13px] font-bold uppercase tracking-widest text-white/60 mb-10 text-center">{c.results}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {project.outcomes.map((outcome, i) => (
                  <motion.div
                    key={i}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <p className="text-[48px] md:text-[56px] font-extrabold text-white leading-none mb-2">
                      {outcome.metric}
                    </p>
                    <p className="text-[15px] text-white/70">{outcome.label[language]}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Navigation between projects */}
      <section className="py-12 bg-white border-t border-border/50">
        <div className="container">
          <div className="flex justify-between items-center max-w-5xl mx-auto">
            <Link
              to={`/portfolio/${prevProject.slug}`}
              className="flex items-center gap-2 text-[14px] text-muted-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{prevProject.name}</span>
              <span className="sm:hidden">{c.prevProject}</span>
            </Link>
            <Link
              to={`/portfolio/${nextProject.slug}`}
              className="flex items-center gap-2 text-[14px] text-muted-foreground hover:text-accent transition-colors"
            >
              <span className="hidden sm:inline">{nextProject.name}</span>
              <span className="sm:hidden">{c.nextProject}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#f8f9f5' }}>
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection>
              <h2
                className="text-[36px] md:text-[48px] leading-[1.1] tracking-[-0.02em] mb-5"
                style={{ fontWeight: 800, color: '#2d4a2d' }}
              >
                {c.ctaTitle}
              </h2>
              <p className="text-[17px] text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8 whitespace-pre-line">
                {c.ctaText}
              </p>
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 py-6 text-[16px] font-semibold h-auto"
              >
                <Link to="/preview">
                  {c.ctaButton}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
}
