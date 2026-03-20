import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Search,
  Rocket,
  Settings,
  TrendingUp,
  Target,
  Clock,
  Zap,
  BarChart3,
  Bot,
  Shield,
  LayoutDashboard,
  DollarSign,
  CheckCircle2,
  X,
  ArrowDown,
  ChevronRight,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import logoFull from '@/assets/logo-hipervinculo.png';
import dashboardImage from '@/assets/ads-dashboard-hipervinculo.jpg';
import flowImage from '@/assets/ads-flow-hipervinculo.jpg';
import botImage from '@/assets/ads-bot-hipervinculo.jpg';
import rankingImage from '@/assets/ads-ranking-hipervinculo.jpg';

const problemCards = [
  {
    icon: TrendingUp,
    title: 'Escala imposible',
    desc: 'Gestionar 100+ keywords manualmente es un trabajo de tiempo completo. Cada decisión de bid es una apuesta.',
  },
  {
    icon: Clock,
    title: 'Reacción lenta',
    desc: 'Para cuando detectas que un keyword no imprime o que el ACoS se disparó, ya perdiste días de oportunidad.',
  },
  {
    icon: Zap,
    title: 'PPC desconectado del orgánico',
    desc: 'Las herramientas optimizan ACoS en aislamiento. Ignoran que PPC es la palanca para dominar el ranking orgánico.',
  },
];

const workflowSteps = [
  {
    icon: Search,
    title: 'Descubrimiento',
    desc: 'Cruza Amazon Autocomplete, keywords sugeridos, y DataForSEO para encontrar oportunidades con volumen real. +3,800 keywords calificados por producto.',
  },
  {
    icon: Rocket,
    title: 'Lanzamiento',
    desc: 'Crea campañas STC automáticamente. 1 keyword = 1 campaña = control total sobre bid, presupuesto, y datos.',
  },
  {
    icon: Settings,
    title: 'Optimización',
    desc: 'Cada 60 minutos analiza impresiones, clicks, y ACoS. Sube bids si no imprime. Baja si el ACoS es alto. Testea Top of Search antes de cortar.',
  },
  {
    icon: TrendingUp,
    title: 'Escalamiento',
    desc: 'Si un keyword vende bien, el presupuesto sube: $10 → $20 → $40 → $80 → $150 → $300 → sin techo. Si no funciona, se contiene.',
  },
  {
    icon: Target,
    title: 'Medición',
    desc: 'Tracking diario de ranking orgánico. El objetivo real no es ACoS — es llegar a posición #1 orgánica.',
  },
];

const featureCards = [
  {
    icon: Clock,
    title: 'Bid Adjustment Horario',
    desc: 'Ajustes cada 60 min basados en impresiones, clicks, y ACoS',
  },
  {
    icon: TrendingUp,
    title: 'Budget Scaling Diario',
    desc: 'Presupuesto que crece con resultados, sin techo artificial',
  },
  {
    icon: Search,
    title: 'Keyword Discovery Semanal',
    desc: '3,800+ keywords descubiertos y filtrados automáticamente',
  },
  {
    icon: BarChart3,
    title: 'Ranking Tracker Diario',
    desc: 'Posición orgánica de cada keyword, cada día',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard en Vivo',
    desc: 'Métricas por producto y campaña, actualizado cada 3 horas',
  },
  {
    icon: Zap,
    title: 'Reporte Diario Multi-Período',
    desc: 'Hoy, ayer, 7 días, lifetime — por email y Telegram',
  },
  {
    icon: Bot,
    title: 'Bot de Telegram 24/7',
    desc: 'Pregunta por status, ACoS, campañas desde tu teléfono',
  },
  {
    icon: Shield,
    title: 'Auditoría Automática',
    desc: 'Verificación de integridad después de cada tarea',
  },
  {
    icon: Target,
    title: 'Campañas STC',
    desc: '1 keyword, 1 campaña, match exacto. Control total.',
  },
];

const comparisonRows = [
  ['Frecuencia de ajustes', 'Diario / semanal', 'Cada 60 minutos'],
  ['Estructura de campañas', 'Multi-keyword', 'STC (1 keyword = 1 campaña)'],
  ['Presupuesto', 'Fijo', 'Escala con resultados'],
  ['Conexión PPC-Orgánico', 'No existe', 'Ranking tracker integrado'],
  ['Reportes', 'Dashboard pasivo', 'Bot activo + email + Telegram'],
  ['Estrategia', 'Una sola (ACoS)', 'Dos (VENTAS + RANKEO)'],
  ['Lanzamiento de campañas', 'Manual', 'Automático'],
  ['Descubrimiento de keywords', 'Manual o básico', 'Automatizado multi-fuente'],
];

const stats = [
  { num: 138, suffix: '+', label: 'Campañas activas gestionadas simultáneamente' },
  { num: 3800, suffix: '+', label: 'Keywords descubiertos y calificados' },
  { num: 24, suffix: '', label: 'Ajustes de bid al día por campaña' },
  { num: 9, suffix: '', label: 'Tareas automatizadas corriendo 24/7' },
  { num: 0, prefix: '$', label: 'Intervención manual' },
];

function AnimatedCounter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, end]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ParallaxSection({ children, className = '', speed = 0.15 }: { children: React.ReactNode; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

function ParallaxImage({ src, alt, className = '', speed = 0.12 }: { src: string; alt: string; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 120, speed * -120]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  return (
    <div ref={ref} className="overflow-hidden rounded-[20px]">
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className={`w-full object-cover ${className}`}
      />
    </div>
  );
}

function BrandCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[24px] border border-border bg-card p-6 shadow-md ${className}`}>
      {children}
    </div>
  );
}

export default function HipervinculoAds() {
  const scrollToHow = () => {
    document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' });
  };

  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 100], ['rgba(255,255,255,0.6)', 'rgba(255,255,255,0.98)']);
  const navShadow = useTransform(scrollY, [0, 100], ['0 0 0 transparent', '0 4px 20px rgba(0,0,0,0.06)']);
  const heroParallaxY = useTransform(scrollY, [0, 600], [0, -80]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SEO
        title="Hipervinculo Ads | Amazon PPC en Piloto Automático"
        description="Automatiza tu PPC en Amazon con el estilo y metodología de Hipervínculo: discovery, campañas STC, ajustes horarios y escalamiento inteligente."
        url="https://hipervinculo.net/ads"
      />

      <motion.nav
        className="fixed inset-x-0 top-0 z-50 border-b border-primary/10 backdrop-blur-xl"
        style={{ backgroundColor: navBg, boxShadow: navShadow }}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <img src={logoFull} alt="Hipervínculo" className="h-8 w-auto sm:h-9" />

          <div className="hidden items-center gap-8 text-sm text-primary/70 md:flex">
            <a href="#como-funciona" className="text-primary transition-colors hover:text-accent">Cómo Funciona</a>
            <a href="#estrategias" className="text-primary transition-colors hover:text-accent">Estrategias</a>
            <a href="#features" className="text-primary transition-colors hover:text-accent">Características</a>
          </div>

          <a
            href="https://calendly.com/hipervinculo_usa/30-minutes-call"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            Agenda una Demo
          </a>
        </div>
      </motion.nav>

      <section className="relative flex min-h-[90vh] items-center bg-[#f8f9f5] px-6 pt-28">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(-55deg, transparent, transparent 54px, hsl(var(--primary) / 0.08) 54px, hsl(var(--primary) / 0.08) 55px)`,
          }}
        />
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-sm font-medium text-primary">
              <Clock className="h-4 w-4" />
              Ajustes cada 60 minutos
            </div>

            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-border bg-muted px-4 py-2 text-sm text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              Hipervínculo presenta su sistema de Amazon PPC Automation
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mb-6 text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-5xl md:text-6xl"
            >
              Tu PPC en Amazon.
              <br />
              <span className="text-accent">En Piloto Automático.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            >
              Hipervinculo Ads descubre keywords, lanza campañas, ajusta bids cada hora, y escala tu presupuesto con resultados reales. Sin intervención humana.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href="https://calendly.com/hipervinculo_usa/30-minutes-call"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                Agenda una Demo
                <ChevronRight className="h-5 w-5" />
              </a>
              <button
                onClick={scrollToHow}
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-4 text-muted-foreground transition-colors hover:text-accent"
              >
                Ver cómo funciona
                <ArrowDown className="h-4 w-4" />
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.35 }}
            className="hidden lg:block"
          >
            <BrandCard className="p-3">
              <ParallaxImage
                src={dashboardImage}
                alt="Dashboard de Hipervínculo para automatización de Amazon PPC"
                speed={0.1}
              />
            </BrandCard>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#f5f5f5] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">El problema</p>
            <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">El PPC manual no escala</h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-accent" />
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {problemCards.map((card, index) => (
              <FadeIn key={card.title} delay={index * 0.1}>
                <BrandCard className="h-full">
                  <card.icon className="mb-4 h-10 w-10 text-accent" />
                  <h3 className="mb-3 text-xl font-bold text-foreground">{card.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{card.desc}</p>
                </BrandCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">La solución</p>
            <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">Un motor que nunca para</h2>
            <p className="text-lg text-muted-foreground">5 sistemas conectados que trabajan las 24 horas</p>
          </FadeIn>

          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <FadeIn>
              <BrandCard className="p-3">
                <ParallaxImage
                  src={flowImage}
                  alt="Diagrama del sistema de automatización de Amazon PPC de Hipervínculo"
                  speed={0.15}
                />
              </BrandCard>
            </FadeIn>

            <div className="space-y-5">
              {workflowSteps.map((step, index) => (
                <FadeIn key={step.title} delay={index * 0.08}>
                  <div className="flex gap-4 rounded-[22px] border border-border bg-muted p-5">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-accent/12 text-accent">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.22em] text-accent">Paso {index + 1}</p>
                      <h3 className="mb-2 text-lg font-bold text-foreground">{step.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="estrategias" className="bg-[#f8f9f5] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">Dos estrategias</p>
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">Dos estrategias. Un objetivo.</h2>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2">
            <FadeIn>
              <div className="h-full rounded-[28px] border border-border bg-muted p-8">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-sm font-bold text-accent">
                  <DollarSign className="h-4 w-4" />
                  VENTAS
                </div>
                <ul className="space-y-4 text-foreground">
                  {[
                    'Maximiza rentabilidad',
                    'Target ACoS < 40%',
                    'Escala cuando es rentable',
                    'Se contiene cuando no lo es',
                    'Para keywords donde ya tienes posición',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="h-full rounded-[28px] border border-accent/25 bg-accent/10 p-8">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
                  <Target className="h-4 w-4" />
                  RANKEO
                </div>
                <ul className="space-y-4 text-foreground">
                  {[
                    'Conquista posición orgánica #1',
                    'El ACoS no importa — el ranking sí',
                    'Siempre sube bids si no hay impresiones',
                    'Escala cuando el ranking mejora',
                    'Para keywords estratégicos que quieres dominar',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">Qué incluye</p>
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">Todo lo que necesitas. Nada que no.</h2>
          </FadeIn>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {featureCards.map((feature, index) => (
                <FadeIn key={feature.title} delay={(index % 3) * 0.08}>
                  <BrandCard className="h-full">
                    <feature.icon className="mb-4 h-8 w-8 text-accent" />
                    <h3 className="mb-2 text-base font-bold text-foreground">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
                  </BrandCard>
                </FadeIn>
              ))}
            </div>

            <FadeIn className="hidden lg:block">
              <BrandCard className="h-full p-3">
                <ParallaxImage
                  src={botImage}
                  alt="Bot de reportes de Hipervínculo para Amazon PPC"
                  speed={0.18}
                />
              </BrandCard>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f5] px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <FadeIn className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">Comparativa</p>
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">No es otro dashboard</h2>
          </FadeIn>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Traditional Column */}
            <FadeIn>
              <div className="rounded-[24px] border border-border bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
                    <X className="h-5 w-5 text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Herramientas tradicionales</h3>
                </div>
                <div className="space-y-4">
                  {comparisonRows.map(([label, traditional]) => (
                    <div key={label} className="flex items-start gap-3 rounded-2xl bg-[#fafafa] p-4">
                      <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-300" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                        <p className="mt-1 text-sm text-foreground">{traditional}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Hipervinculo Column */}
            <FadeIn delay={0.1}>
              <div className="rounded-[24px] border-2 border-accent/30 bg-white p-6 shadow-md ring-1 ring-accent/10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">Hipervinculo Ads</h3>
                </div>
                <div className="space-y-4">
                  {comparisonRows.map(([label, , ours]) => (
                    <div key={label} className="flex items-start gap-3 rounded-2xl bg-accent/[0.06] p-4">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                        <p className="mt-1 text-sm font-medium text-foreground">{ours}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9f5] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">Métricas</p>
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">Números reales</h2>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat, index) => (
              <FadeIn key={stat.label} delay={index * 0.08}>
                <BrandCard className="h-full text-center">
                  <div className="mb-3 text-4xl font-extrabold tracking-[-0.03em] text-accent">
                    <AnimatedCounter end={stat.num} suffix={stat.suffix} prefix={stat.prefix || ''} />
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{stat.label}</p>
                </BrandCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary px-6 py-28 text-primary-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <FadeIn>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm font-medium text-accent">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              El objetivo final
            </div>
            <h2 className="mb-8 text-3xl font-extrabold leading-[1.08] text-primary-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              El objetivo no es tener buen ACoS.
              <br />
              <span className="text-accent">Es llegar a posición orgánica #1.</span>
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-primary-foreground/72">
              Cuando tu producto domina orgánicamente, las ventas naturales toman el control, el PPC se reduce, y cada dólar invertido en publicidad fue una inversión que compró posición permanente.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-[24px] border border-primary-foreground/10 p-3 overflow-hidden">
              <ParallaxImage
                src={rankingImage}
                alt="Visualización del crecimiento de ranking orgánico con Hipervínculo"
                speed={0.12}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="px-6 pb-24 pt-8">
        <FadeIn>
          <div className="mx-auto max-w-4xl rounded-[32px] border border-primary/10 bg-white px-8 py-10 text-center shadow-2xl sm:px-12">
            <div className="mb-8 inline-flex rounded-2xl px-5 py-4">
              <img src={logoFull} alt="Hipervínculo" className="h-10 w-auto" />
            </div>
            <h2 className="mb-5 text-3xl font-extrabold text-primary sm:text-4xl md:text-5xl">
              ¿Listo para poner tu PPC en piloto automático?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-primary/70">
              Sin contratos. Sin setup fees. Resultados en la primera semana.
            </p>
            <a
              href="https://calendly.com/hipervinculo_usa/30-minutes-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-10 py-5 text-lg font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Agenda una Demo
              <ChevronRight className="h-5 w-5" />
            </a>
          </div>
        </FadeIn>
      </section>

      <footer className="border-t border-primary/10 bg-white px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          <img src={logoFull} alt="Hipervínculo" className="h-8 w-auto" />

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary/65">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-primary transition-colors hover:text-accent">Inicio</a>
            <a href="#como-funciona" className="text-primary transition-colors hover:text-accent">Cómo Funciona</a>
            <a href="#features" className="text-primary transition-colors hover:text-accent">Características</a>
            <a href="https://hipervinculo.net" target="_blank" rel="noopener noreferrer" className="text-primary transition-colors hover:text-accent">hipervinculo.net</a>
          </nav>

          <p className="text-xs text-primary/45">© 2026 Hipervínculo. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
