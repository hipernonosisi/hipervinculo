import { useEffect, useRef, useState } from 'react';
import { Globe } from 'lucide-react';
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
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
  RefreshCw,
} from 'lucide-react';
import { SEO } from '@/components/SEO';
import { useLanguage } from '@/contexts/LanguageContext';
import logoFull from '@/assets/logo-hipervinculo.png';
import dashboardImage from '@/assets/ads-dashboard-hipervinculo.jpg';
import flowImage from '@/assets/ads-flow-hipervinculo.jpg';
import botImage from '@/assets/ads-bot-hipervinculo.jpg';
import rankingImage from '@/assets/ads-ranking-hipervinculo.jpg';

const content = {
  es: {
    seo: {
      title: 'Hipervinculo Ads | Amazon PPC en Piloto Automático',
      description: 'Automatiza tu PPC en Amazon con el estilo y metodología de Hipervínculo: discovery, campañas STC, ajustes horarios y escalamiento inteligente.',
    },
    nav: {
      howItWorks: 'Cómo Funciona',
      strategies: 'Estrategias',
      features: 'Características',
      cta: 'Agenda una Demo',
    },
    hero: {
      badge: 'Ajustes cada 60 minutos',
      subbadge: 'Hipervínculo presenta su sistema de Amazon PPC Automation',
      h1a: 'Tu PPC en Amazon.',
      h1b: 'En Piloto Automático.',
      sub: 'Hipervinculo Ads descubre keywords, lanza campañas, ajusta bids cada hora, y escala tu presupuesto con resultados reales. Sin intervención humana.',
      cta: 'Agenda una Demo',
      cta2: 'Ver cómo funciona',
    },
    problem: {
      label: 'El problema',
      title: 'El PPC manual no escala',
      cards: [
        { title: 'Escala imposible', desc: 'Gestionar 100+ keywords manualmente es un trabajo de tiempo completo. Cada decisión de bid es una apuesta.' },
        { title: 'Reacción lenta', desc: 'Para cuando detectas que un keyword no imprime o que el ACoS se disparó, ya perdiste días de oportunidad.' },
        { title: 'PPC desconectado del orgánico', desc: 'Las herramientas optimizan ACoS en aislamiento. Ignoran que PPC es la palanca para dominar el ranking orgánico.' },
      ],
    },
    solution: {
      label: 'La solución',
      title: 'Un motor que nunca para',
      sub: '5 sistemas conectados que trabajan las 24 horas',
      stepLabel: 'Paso',
      cycle: 'Ciclo continuo 24/7',
      steps: [
        { title: 'Descubrimiento', desc: 'Cruza Amazon Autocomplete, keywords sugeridos y múltiples fuentes de datos para encontrar oportunidades con volumen real. +3,800 keywords calificados por producto.' },
        { title: 'Lanzamiento', desc: 'Crea campañas STC automáticamente. 1 keyword = 1 campaña = control total sobre bid, presupuesto, y datos.' },
        { title: 'Optimización', desc: 'Cada 60 minutos analiza impresiones, clicks, y ACoS. Sube bids si no imprime. Baja si el ACoS es alto. Testea Top of Search antes de cortar.' },
        { title: 'Escalamiento', desc: 'Si un keyword vende bien, el presupuesto sube: $10 → $20 → $40 → $80 → $150 → $300 → sin techo. Si no funciona, se contiene.' },
        { title: 'Medición', desc: 'Tracking diario de ranking orgánico. El objetivo real no es ACoS — es llegar a posición #1 orgánica.' },
      ],
    },
    strategies: {
      label: 'Dos estrategias',
      title: 'Dos estrategias. Un objetivo.',
      sales: {
        label: 'VENTAS',
        items: ['Maximiza rentabilidad', 'Target ACoS < 40%', 'Escala cuando es rentable', 'Se contiene cuando no lo es', 'Para keywords donde ya tienes posición'],
      },
      ranking: {
        label: 'RANKEO',
        items: ['Conquista posición orgánica #1', 'El ACoS no importa — el ranking sí', 'Siempre sube bids si no hay impresiones', 'Escala cuando el ranking mejora', 'Para keywords estratégicos que quieres dominar'],
      },
    },
    features: {
      label: 'Qué incluye',
      title: 'Todo lo que necesitas. Nada que no.',
      cards: [
        { title: 'Bid Adjustment Horario', desc: 'Ajustes cada 60 min basados en impresiones, clicks, y ACoS' },
        { title: 'Budget Scaling Diario', desc: 'Presupuesto que crece con resultados, sin techo artificial' },
        { title: 'Keyword Discovery Semanal', desc: '3,800+ keywords descubiertos y filtrados automáticamente' },
        { title: 'Ranking Tracker Diario', desc: 'Posición orgánica de cada keyword, cada día' },
        { title: 'Dashboard en Vivo', desc: 'Métricas por producto y campaña, actualizado cada 3 horas' },
        { title: 'Reporte Diario Multi-Período', desc: 'Hoy, ayer, 7 días, lifetime — por email y Telegram' },
        { title: 'Bot de Telegram 24/7', desc: 'Pregunta por status, ACoS, campañas desde tu teléfono' },
        { title: 'Auditoría Automática', desc: 'Verificación de integridad después de cada tarea' },
        { title: 'Campañas STC', desc: '1 keyword, 1 campaña, match exacto. Control total.' },
      ],
    },
    comparison: {
      label: 'Comparativa',
      title: 'No es otro dashboard',
      traditional: 'Herramientas tradicionales',
      rows: [
        ['Frecuencia de ajustes', 'Diario / semanal', 'Cada 60 minutos'],
        ['Estructura de campañas', 'Multi-keyword', 'STC (1 keyword = 1 campaña)'],
        ['Presupuesto', 'Fijo', 'Escala con resultados'],
        ['Conexión PPC-Orgánico', 'No existe', 'Ranking tracker integrado'],
        ['Reportes', 'Dashboard pasivo', 'Bot activo + email + Telegram'],
        ['Estrategia', 'Una sola (ACoS)', 'Dos (VENTAS + RANKEO)'],
        ['Lanzamiento de campañas', 'Manual', 'Automático'],
        ['Descubrimiento de keywords', 'Manual o básico', 'Automatizado multi-fuente'],
      ],
    },
    metrics: {
      label: 'Métricas',
      title: 'Números reales',
      items: [
        'Campañas activas gestionadas simultáneamente',
        'Keywords descubiertos y calificados',
        'Ajustes de bid al día por campaña',
        'Tareas automatizadas corriendo 24/7',
        'Intervención manual',
      ],
    },
    objective: {
      badge: 'El objetivo final',
      h2a: 'El objetivo no es tener buen ACoS.',
      h2b: 'Es llegar a posición orgánica #1.',
      desc: 'Cuando tu producto domina orgánicamente, las ventas naturales toman el control, el PPC se reduce, y cada dólar invertido en publicidad fue una inversión que compró posición permanente.',
    },
    cta: {
      title: '¿Listo para poner tu PPC en piloto automático?',
      sub: 'Sin contratos. Sin setup fees. Resultados en la primera semana.',
      button: 'Agenda una Demo',
    },
    footer: {
      home: 'Inicio',
      howItWorks: 'Cómo Funciona',
      features: 'Características',
      rights: '© 2026 Hipervínculo. Todos los derechos reservados.',
    },
  },
  en: {
    seo: {
      title: 'Hipervinculo Ads | Amazon PPC on Autopilot',
      description: 'Automate your Amazon PPC with Hipervínculo\'s methodology: keyword discovery, STC campaigns, hourly bid adjustments, and intelligent scaling.',
    },
    nav: {
      howItWorks: 'How It Works',
      strategies: 'Strategies',
      features: 'Features',
      cta: 'Book a Demo',
    },
    hero: {
      badge: 'Adjustments every 60 minutes',
      subbadge: 'Hipervínculo presents its Amazon PPC Automation system',
      h1a: 'Your Amazon PPC.',
      h1b: 'On Autopilot.',
      sub: 'Hipervinculo Ads discovers keywords, launches campaigns, adjusts bids every hour, and scales your budget with real results. No human intervention.',
      cta: 'Book a Demo',
      cta2: 'See how it works',
    },
    problem: {
      label: 'The problem',
      title: 'Manual PPC doesn\'t scale',
      cards: [
        { title: 'Impossible to scale', desc: 'Managing 100+ keywords manually is a full-time job. Every bid decision is a gamble.' },
        { title: 'Slow reaction', desc: 'By the time you detect a keyword isn\'t printing or ACoS spiked, you\'ve already lost days of opportunity.' },
        { title: 'PPC disconnected from organic', desc: 'Tools optimize ACoS in isolation. They ignore that PPC is the lever to dominate organic ranking.' },
      ],
    },
    solution: {
      label: 'The solution',
      title: 'An engine that never stops',
      sub: '5 connected systems working 24/7',
      stepLabel: 'Step',
      cycle: 'Continuous cycle 24/7',
      steps: [
        { title: 'Discovery', desc: 'Crosses Amazon Autocomplete, suggested keywords, and multiple data sources to find opportunities with real volume. 3,800+ qualified keywords per product.' },
        { title: 'Launch', desc: 'Creates STC campaigns automatically. 1 keyword = 1 campaign = total control over bid, budget, and data.' },
        { title: 'Optimization', desc: 'Every 60 minutes it analyzes impressions, clicks, and ACoS. Raises bids if not printing. Lowers if ACoS is high. Tests Top of Search before cutting.' },
        { title: 'Scaling', desc: 'If a keyword sells well, the budget scales: $10 → $20 → $40 → $80 → $150 → $300 → no ceiling. If it doesn\'t work, it holds.' },
        { title: 'Measurement', desc: 'Daily organic ranking tracking. The real goal isn\'t ACoS — it\'s reaching organic position #1.' },
      ],
    },
    strategies: {
      label: 'Two strategies',
      title: 'Two strategies. One goal.',
      sales: {
        label: 'SALES',
        items: ['Maximize profitability', 'Target ACoS < 40%', 'Scale when profitable', 'Hold when it\'s not', 'For keywords where you already have position'],
      },
      ranking: {
        label: 'RANKING',
        items: ['Conquer organic position #1', 'ACoS doesn\'t matter — ranking does', 'Always raise bids if no impressions', 'Scale when ranking improves', 'For strategic keywords you want to dominate'],
      },
    },
    features: {
      label: 'What\'s included',
      title: 'Everything you need. Nothing you don\'t.',
      cards: [
        { title: 'Hourly Bid Adjustment', desc: 'Adjustments every 60 min based on impressions, clicks, and ACoS' },
        { title: 'Daily Budget Scaling', desc: 'Budget that grows with results, no artificial ceiling' },
        { title: 'Weekly Keyword Discovery', desc: '3,800+ keywords discovered and filtered automatically' },
        { title: 'Daily Ranking Tracker', desc: 'Organic position for every keyword, every day' },
        { title: 'Live Dashboard', desc: 'Metrics by product and campaign, updated every 3 hours' },
        { title: 'Multi-Period Daily Report', desc: 'Today, yesterday, 7 days, lifetime — via email and Telegram' },
        { title: '24/7 Telegram Bot', desc: 'Ask about status, ACoS, campaigns from your phone' },
        { title: 'Automatic Audit', desc: 'Integrity check after every task' },
        { title: 'STC Campaigns', desc: '1 keyword, 1 campaign, exact match. Total control.' },
      ],
    },
    comparison: {
      label: 'Comparison',
      title: 'Not just another dashboard',
      traditional: 'Traditional tools',
      rows: [
        ['Adjustment frequency', 'Daily / weekly', 'Every 60 minutes'],
        ['Campaign structure', 'Multi-keyword', 'STC (1 keyword = 1 campaign)'],
        ['Budget', 'Fixed', 'Scales with results'],
        ['PPC-Organic connection', 'Doesn\'t exist', 'Integrated ranking tracker'],
        ['Reports', 'Passive dashboard', 'Active bot + email + Telegram'],
        ['Strategy', 'One only (ACoS)', 'Two (SALES + RANKING)'],
        ['Campaign launch', 'Manual', 'Automatic'],
        ['Keyword discovery', 'Manual or basic', 'Automated multi-source'],
      ],
    },
    metrics: {
      label: 'Metrics',
      title: 'Real numbers',
      items: [
        'Active campaigns managed simultaneously',
        'Keywords discovered and qualified',
        'Bid adjustments per day per campaign',
        'Automated tasks running 24/7',
        'Manual intervention',
      ],
    },
    objective: {
      badge: 'The ultimate goal',
      h2a: 'The goal isn\'t good ACoS.',
      h2b: 'It\'s reaching organic position #1.',
      desc: 'When your product dominates organically, natural sales take over, PPC spend decreases, and every dollar invested in advertising was an investment that bought permanent position.',
    },
    cta: {
      title: 'Ready to put your PPC on autopilot?',
      sub: 'No contracts. No setup fees. Results in the first week.',
      button: 'Book a Demo',
    },
    footer: {
      home: 'Home',
      howItWorks: 'How It Works',
      features: 'Features',
      rights: '© 2026 Hipervínculo. All rights reserved.',
    },
  },
};

const featureIcons = [Clock, TrendingUp, Search, BarChart3, LayoutDashboard, Zap, Bot, Shield, Target];
const problemIcons = [TrendingUp, Clock, Zap];
const stepIcons = [Search, Rocket, Settings, TrendingUp, Target];

const stats = [
  { num: 138, suffix: '+', prefix: '' },
  { num: 3800, suffix: '+', prefix: '' },
  { num: 24, suffix: '', prefix: '' },
  { num: 9, suffix: '', prefix: '' },
  { num: 0, suffix: '', prefix: '$' },
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

function SlideIn({ children, className = '', delay = 0, direction = 'left' }: { children: React.ReactNode; className?: string; delay?: number; direction?: 'left' | 'right' }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -80 : 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function TextReveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function RotateIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, type: 'spring', stiffness: 120, damping: 14 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ParallaxBg({ className = '', speed = 0.15 }: { className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 200, speed * -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, speed * 30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);
  return (
    <motion.div ref={ref} style={{ y, rotate, scale }} className={`pointer-events-none absolute ${className}`} />
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

function ParallaxSection({ children, className = '', speed = 0.06 }: { children: React.ReactNode; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

function FloatingElement({ children, className = '', amplitude = 12, duration = 4 }: { children: React.ReactNode; className?: string; amplitude?: number; duration?: number }) {
  return (
    <motion.div
      animate={{ y: [-amplitude, amplitude, -amplitude] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScaleOnHover({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
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
  const { language, setLanguage } = useLanguage();

  // Default to English on this page
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (!langParam) {
      setLanguage('en');
    }
  }, []);

  const t = content[language];

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
        title={t.seo.title}
        description={t.seo.description}
        url="https://hipervinculo.net/ads"
      />

      <motion.nav
        className="fixed inset-x-0 top-0 z-50 border-b border-primary/10 backdrop-blur-xl"
        style={{ backgroundColor: navBg, boxShadow: navShadow }}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <img src={logoFull} alt="Hipervínculo" className="h-8 w-auto sm:h-9" />

          <div className="hidden items-center gap-8 text-sm text-primary/70 md:flex">
            <a href="#como-funciona" className="text-primary transition-colors hover:text-accent">{t.nav.howItWorks}</a>
            <a href="#estrategias" className="text-primary transition-colors hover:text-accent">{t.nav.strategies}</a>
            <a href="#features" className="text-primary transition-colors hover:text-accent">{t.nav.features}</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-muted"
            >
              <Globe className="h-3.5 w-3.5" />
              {language === 'en' ? 'ES' : 'EN'}
            </button>
            <a
              href="https://calendly.com/hipervinculo_usa/30-minutes-call"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="relative flex min-h-[90vh] items-center bg-[#f8f9f5] px-6 pt-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(-55deg, transparent, transparent 54px, hsl(var(--primary) / 0.08) 54px, hsl(var(--primary) / 0.08) 55px)`,
          }}
        />
        <ParallaxBg className="left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" speed={0.1} />
        <ParallaxBg className="right-[5%] top-[15%] h-40 w-40 rounded-full bg-accent/8 blur-2xl" speed={0.2} />
        <ParallaxBg className="left-[3%] bottom-[20%] h-32 w-32 rounded-full bg-accent/6 blur-2xl" speed={-0.12} />
        <FloatingElement className="absolute right-[10%] top-32 hidden lg:block" amplitude={18} duration={5}>
          <div className="h-16 w-16 rounded-2xl bg-accent/8 backdrop-blur-sm" />
        </FloatingElement>
        <FloatingElement className="absolute left-[8%] bottom-24 hidden lg:block" amplitude={14} duration={6}>
          <div className="h-10 w-10 rotate-45 rounded-lg bg-accent/10" />
        </FloatingElement>
        <FloatingElement className="absolute right-[25%] bottom-16 hidden lg:block" amplitude={10} duration={8}>
          <div className="h-6 w-6 rounded-full bg-accent/12" />
        </FloatingElement>

        <motion.div style={{ y: heroParallaxY }} className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-sm font-medium text-primary"
            >
              <Clock className="h-4 w-4" />
              {t.hero.badge}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mb-5 inline-flex items-center gap-3 rounded-full border border-border bg-muted px-4 py-2 text-sm text-muted-foreground"
            >
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2.5 w-2.5 rounded-full bg-accent"
              />
              {t.hero.subbadge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-foreground sm:text-5xl md:text-6xl"
            >
              {t.hero.h1a}
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-accent"
              >
                {t.hero.h1b}
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            >
              {t.hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href="https://calendly.com/hipervinculo_usa/30-minutes-call"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                {t.hero.cta}
                <ChevronRight className="h-5 w-5" />
              </a>
              <button
                onClick={scrollToHow}
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-4 text-muted-foreground transition-colors hover:text-accent"
              >
                {t.hero.cta2}
                <ArrowDown className="h-4 w-4" />
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 3, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, rotate: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <BrandCard className="p-3">
              <ParallaxImage
                src={dashboardImage}
                alt="Dashboard de Hipervínculo para automatización de Amazon PPC"
                speed={0.15}
              />
            </BrandCard>
          </motion.div>
        </motion.div>
      </section>

      {/* PROBLEM */}
      <section className="relative bg-[#f5f5f5] px-6 py-28 overflow-hidden">
        <ParallaxBg className="right-[-5%] top-[10%] h-64 w-64 rounded-full bg-accent/5 blur-3xl" speed={0.18} />
        <ParallaxBg className="left-[-3%] bottom-[15%] h-48 w-48 rounded-full bg-primary/3 blur-3xl" speed={-0.1} />
        <ParallaxSection className="mx-auto max-w-6xl" speed={0.05}>
          <TextReveal className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">{t.problem.label}</p>
            <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">{t.problem.title}</h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="mx-auto h-1 w-20 origin-left rounded-full bg-accent"
            />
          </TextReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {t.problem.cards.map((card, index) => {
              const Icon = problemIcons[index];
              return (
                <RotateIn key={card.title} delay={index * 0.15}>
                  <ScaleOnHover>
                    <BrandCard className="h-full">
                      <motion.div
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="mb-4 h-10 w-10 text-accent" />
                      </motion.div>
                      <h3 className="mb-3 text-xl font-bold text-foreground">{card.title}</h3>
                      <p className="leading-relaxed text-muted-foreground">{card.desc}</p>
                    </BrandCard>
                  </ScaleOnHover>
                </RotateIn>
              );
            })}
          </div>
        </ParallaxSection>
      </section>

      {/* HOW IT WORKS — CIRCULAR */}
      <section id="como-funciona" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">{t.solution.label}</p>
            <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">{t.solution.title}</h2>
            <p className="text-lg text-muted-foreground">{t.solution.sub}</p>
          </FadeIn>

          <div className="relative mx-auto max-w-6xl">
            {/* Desktop circular layout */}
            <div className="hidden lg:block">
              <div className="relative mx-auto" style={{ width: '1100px', height: '1100px' }}>
                <div className="absolute z-10" style={{ left: '550px', top: '550px', transform: 'translate(-50%, -50%)' }}>
                  <FadeIn>
                    <div className="h-[180px] w-[180px] overflow-hidden rounded-full border-2 border-accent/30 shadow-lg">
                      <img src={flowImage} alt="Motor de automatización" className="h-full w-full object-cover" />
                    </div>
                  </FadeIn>
                </div>

                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1100 1100" fill="none">
                  <ellipse cx="550" cy="550" rx="400" ry="400" stroke="hsl(var(--accent))" strokeWidth="2" strokeDasharray="8 6" opacity="0.35" />
                  <circle r="5" fill="hsl(var(--accent))" opacity="0.6">
                    <animateMotion dur="12s" repeatCount="indefinite" path="M 950 550 A 400 400 0 1 1 949.99 550" />
                  </circle>
                </svg>

                {t.solution.steps.map((step, index) => {
                  const Icon = stepIcons[index];
                  const angle = (index * (360 / 5) - 90) * (Math.PI / 180);
                  const r = 400;
                  const cx = 550 + r * Math.cos(angle);
                  const cy = 550 + r * Math.sin(angle);
                  return (
                    <div
                      key={step.title}
                      className="absolute"
                      style={{ left: `${cx}px`, top: `${cy}px`, transform: 'translate(-50%, -50%)' }}
                    >
                      <FadeIn delay={index * 0.12}>
                        <div className="group w-[210px] rounded-[20px] border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
                          <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/12 text-accent">
                              <Icon className="h-4 w-4" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">{t.solution.stepLabel} {index + 1}</span>
                          </div>
                          <h3 className="mb-1 text-sm font-bold text-foreground">{step.title}</h3>
                          <p className="text-[12px] leading-snug text-muted-foreground">{step.desc}</p>
                        </div>
                      </FadeIn>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: vertical loop */}
            <div className="lg:hidden">
              <FadeIn className="mb-8 flex justify-center">
                <div className="h-[160px] w-[160px] overflow-hidden rounded-full border-2 border-accent/30 shadow-lg">
                  <img src={flowImage} alt="Motor de automatización" className="h-full w-full object-cover" />
                </div>
              </FadeIn>

              <div className="relative pl-8">
                <div className="absolute bottom-0 left-[22px] top-0 w-[2px] bg-accent/20" />
                <div className="absolute -bottom-6 left-[14px]">
                  <svg width="18" height="24" viewBox="0 0 18 24" fill="none">
                    <path d="M9 24 L9 4 M9 4 C9 4 2 8 2 14 C2 18 5 20 9 20" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" opacity="0.4" />
                    <path d="M5 8 L9 2 L13 8" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                  </svg>
                </div>

                <div className="space-y-5 pb-8">
                  {t.solution.steps.map((step, index) => {
                    const Icon = stepIcons[index];
                    return (
                      <FadeIn key={step.title} delay={index * 0.08}>
                        <div className="relative">
                          <div className="absolute -left-8 top-5 flex h-[11px] w-[11px] items-center justify-center">
                            <div className="h-[11px] w-[11px] rounded-full border-2 border-accent bg-white" />
                          </div>
                          <div className="rounded-[18px] border border-border bg-white p-5">
                            <div className="mb-2 flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/12 text-accent">
                                <Icon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">{t.solution.stepLabel} {index + 1}</p>
                                <h3 className="text-base font-bold text-foreground">{step.title}</h3>
                              </div>
                            </div>
                            <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                          </div>
                        </div>
                      </FadeIn>
                    );
                  })}
                </div>

                <FadeIn delay={0.5}>
                  <div className="ml-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                    <RefreshCw className="h-3 w-3" />
                    {t.solution.cycle}
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIES */}
      <section id="estrategias" className="bg-[#f8f9f5] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">{t.strategies.label}</p>
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">{t.strategies.title}</h2>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2">
            <FadeIn>
              <ScaleOnHover>
                <div className="h-full rounded-[28px] border border-border bg-muted p-8">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-sm font-bold text-accent">
                    <DollarSign className="h-4 w-4" />
                    {t.strategies.sales.label}
                  </div>
                  <ul className="space-y-4 text-foreground">
                    {t.strategies.sales.items.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </ScaleOnHover>
            </FadeIn>

            <FadeIn delay={0.08}>
              <ScaleOnHover>
                <div className="h-full rounded-[28px] border border-accent/25 bg-accent/10 p-8">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
                    <Target className="h-4 w-4" />
                    {t.strategies.ranking.label}
                  </div>
                  <ul className="space-y-4 text-foreground">
                    {t.strategies.ranking.items.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </ScaleOnHover>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">{t.features.label}</p>
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">{t.features.title}</h2>
          </FadeIn>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {t.features.cards.map((feature, index) => {
                const Icon = featureIcons[index];
                return (
                  <FadeIn key={feature.title} delay={(index % 3) * 0.1}>
                    <ScaleOnHover>
                      <BrandCard className="h-full">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <Icon className="mb-4 h-8 w-8 text-accent" />
                        </motion.div>
                        <h3 className="mb-2 text-base font-bold text-foreground">{feature.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
                      </BrandCard>
                    </ScaleOnHover>
                  </FadeIn>
                );
              })}
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

      {/* COMPARISON */}
      <section className="bg-[#f5f5f5] px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <FadeIn className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">{t.comparison.label}</p>
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">{t.comparison.title}</h2>
          </FadeIn>

          <div className="grid gap-5 md:grid-cols-2">
            <FadeIn>
              <div className="rounded-[24px] border border-border bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                    <X className="h-5 w-5 text-destructive" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{t.comparison.traditional}</h3>
                </div>
                <div className="space-y-4">
                  {t.comparison.rows.map(([label, traditional]) => (
                    <div key={label} className="flex items-start gap-3 rounded-2xl bg-muted p-4">
                      <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive/60" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                        <p className="mt-1 text-sm text-foreground">{traditional}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="rounded-[24px] border-2 border-accent/30 bg-white p-6 shadow-md ring-1 ring-accent/10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">Hipervinculo Ads</h3>
                </div>
                <div className="space-y-4">
                  {t.comparison.rows.map(([label, , ours]) => (
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

      {/* METRICS */}
      <section className="bg-[#f8f9f5] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-16 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-accent">{t.metrics.label}</p>
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl">{t.metrics.title}</h2>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat, index) => (
              <FadeIn key={t.metrics.items[index]} delay={index * 0.12}>
                <ScaleOnHover>
                  <BrandCard className="h-full text-center">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                      className="mb-3 text-4xl font-extrabold tracking-[-0.03em] text-accent"
                    >
                      <AnimatedCounter end={stat.num} suffix={stat.suffix} prefix={stat.prefix} />
                    </motion.div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{t.metrics.items[index]}</p>
                  </BrandCard>
                </ScaleOnHover>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* OBJECTIVE */}
      <section className="bg-primary px-6 py-28 text-primary-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <FadeIn>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm font-medium text-accent">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              {t.objective.badge}
            </div>
            <h2 className="mb-8 text-3xl font-extrabold leading-[1.08] text-primary-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              {t.objective.h2a}
              <br />
              <span className="text-accent">{t.objective.h2b}</span>
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-primary-foreground/70">
              {t.objective.desc}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="overflow-hidden rounded-[24px] border border-primary-foreground/10 p-3">
              <ParallaxImage
                src={rankingImage}
                alt="Visualización del crecimiento de ranking orgánico con Hipervínculo"
                speed={0.12}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 pb-24 pt-8 overflow-hidden">
        <FloatingElement className="absolute left-[5%] top-12 hidden lg:block" amplitude={20} duration={7}>
          <div className="h-20 w-20 rounded-full bg-accent/5 blur-xl" />
        </FloatingElement>
        <FloatingElement className="absolute right-[8%] bottom-16 hidden lg:block" amplitude={15} duration={5}>
          <div className="h-14 w-14 rotate-12 rounded-2xl bg-accent/8 blur-lg" />
        </FloatingElement>
        <FadeIn>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="mx-auto max-w-4xl rounded-[32px] border border-primary/10 bg-white px-8 py-10 text-center shadow-2xl sm:px-12"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              className="mb-8 inline-flex rounded-2xl px-5 py-4"
            >
              <img src={logoFull} alt="Hipervínculo" className="h-10 w-auto" />
            </motion.div>
            <h2 className="mb-5 text-3xl font-extrabold text-primary sm:text-4xl md:text-5xl">
              {t.cta.title}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-primary/70">
              {t.cta.sub}
            </p>
            <motion.a
              href="https://calendly.com/hipervinculo_usa/30-minutes-call"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-10 py-5 text-lg font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              {t.cta.button}
              <ChevronRight className="h-5 w-5" />
            </motion.a>
          </motion.div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-primary/10 bg-white px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          <img src={logoFull} alt="Hipervínculo" className="h-8 w-auto" />

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-primary/65">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-primary transition-colors hover:text-accent">{t.footer.home}</a>
            <a href="#como-funciona" className="text-primary transition-colors hover:text-accent">{t.footer.howItWorks}</a>
            <a href="#features" className="text-primary transition-colors hover:text-accent">{t.footer.features}</a>
            <a href="https://hipervinculo.net" target="_blank" rel="noopener noreferrer" className="text-primary transition-colors hover:text-accent">hipervinculo.net</a>
          </nav>

          <p className="text-xs text-primary/45">{t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}
