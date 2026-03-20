import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Rocket, Settings, TrendingUp, Target, Clock, Zap, BarChart3, Bot, Shield, Layout, DollarSign, CheckCircle2, X, ArrowDown, ChevronRight } from 'lucide-react';
import { SEO } from '@/components/SEO';
import adsLogo from '@/assets/ads-logo.png';
import adsDashboard from '@/assets/ads-dashboard-mockup.jpg';
import adsFlow from '@/assets/ads-automation-flow.jpg';
import adsRanking from '@/assets/ads-ranking-growth.jpg';
import adsTelegram from '@/assets/ads-telegram-bot.jpg';

// ─── Animated Counter ───
function AnimatedCounter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
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

// ─── Fade In wrapper ───
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Glow Card ───
function GlowCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 h-full">
        {children}
      </div>
    </div>
  );
}

export default function HipervinculoAds() {
  const scrollToHow = () => {
    document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
      <SEO
        title="Hipervinculo Ads — Amazon PPC en Piloto Automático"
        description="Automatiza tu PPC en Amazon. Descubre keywords, lanza campañas, ajusta bids cada hora y escala con resultados reales."
      />

      {/* ═══════════════ NAV BAR ═══════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={adsLogo} alt="Hipervinculo Ads" className="h-9 w-9 object-contain" />
            <span className="font-bold text-lg">Hipervinculo <span className="text-emerald-400">Ads</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#como-funciona" className="hover:text-white transition-colors">Cómo Funciona</a>
            <a href="#estrategias" className="hover:text-white transition-colors">Estrategias</a>
            <a href="#features" className="hover:text-white transition-colors">Características</a>
          </div>
          <a
            href="https://calendly.com/hipervinculo_usa/30-minutes-call"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg text-sm transition-all"
          >
            Agenda una Demo
          </a>
        </div>
      </nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-16 overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0f1a]" />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8"
            >
              <Clock className="w-4 h-4" />
              Ajustes cada 60 minutos
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              Tu PPC en Amazon.
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                En Piloto Automático.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg text-gray-400 max-w-xl mb-10 leading-relaxed"
            >
              Hipervinculo Ads descubre keywords, lanza campañas, ajusta bids cada hora, y escala tu presupuesto con resultados reales. Sin intervención humana.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <a
                href="https://calendly.com/hipervinculo_usa/30-minutes-call"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-lg transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105"
              >
                Agenda una Demo
              </a>
              <button
                onClick={scrollToHow}
                className="flex items-center gap-2 px-6 py-4 text-gray-400 hover:text-white transition-colors group"
              >
                Ver cómo funciona
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur-xl" />
              <img
                src={adsDashboard}
                alt="Hipervinculo Ads Dashboard - Gestión automatizada de campañas PPC"
                className="relative rounded-2xl border border-white/10 shadow-2xl w-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ EL PROBLEMA ═══════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">El PPC manual no escala</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full" />
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: 'Escala imposible', desc: 'Gestionar 100+ keywords manualmente es un trabajo de tiempo completo. Cada decisión de bid es una apuesta.' },
              { icon: Clock, title: 'Reacción lenta', desc: 'Para cuando detectas que un keyword no imprime o que el ACoS se disparó, ya perdiste días de oportunidad.' },
              { icon: Zap, title: 'PPC desconectado del orgánico', desc: 'Las herramientas optimizan ACoS en aislamiento. Ignoran que PPC es la palanca para dominar el ranking orgánico.' },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <GlowCard>
                  <card.icon className="w-10 h-10 text-emerald-400 mb-4" />
                  <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{card.desc}</p>
                </GlowCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CÓMO FUNCIONA ═══════════════ */}
      <section id="como-funciona" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent" />
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Un motor que nunca para</h2>
            <p className="text-gray-400 text-lg">5 sistemas conectados que trabajan las 24 horas</p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Flow image */}
            <FadeIn>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-2xl blur-xl" />
                <img
                  src={adsFlow}
                  alt="Motor de automatización de Hipervinculo Ads - 5 sistemas conectados"
                  className="relative rounded-2xl border border-white/10 w-full"
                />
              </div>
            </FadeIn>

            {/* Steps */}
            <div className="space-y-5">
              {[
                { icon: Search, title: 'Descubrimiento', desc: 'Cruza Amazon Autocomplete, keywords sugeridos, y DataForSEO. +3,800 keywords calificados por producto.', color: 'emerald' },
                { icon: Rocket, title: 'Lanzamiento', desc: 'Crea campañas STC automáticamente. 1 keyword = 1 campaña = control total.', color: 'blue' },
                { icon: Settings, title: 'Optimización', desc: 'Cada 60 min analiza impresiones, clicks, y ACoS. Sube o baja bids inteligentemente.', color: 'emerald' },
                { icon: TrendingUp, title: 'Escalamiento', desc: '$10 → $20 → $40 → $80 → $150 → $300 → sin techo. Si no funciona, se contiene.', color: 'blue' },
                { icon: Target, title: 'Medición', desc: 'Tracking diario de ranking orgánico. El objetivo: posición #1 orgánica.', color: 'emerald' },
              ].map((step, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex items-start gap-4 group">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${step.color === 'emerald' ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-blue-500/10 border border-blue-500/30'}`}>
                      <step.icon className={`w-5 h-5 ${step.color === 'emerald' ? 'text-emerald-400' : 'text-blue-400'}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${step.color === 'emerald' ? 'text-emerald-400' : 'text-blue-400'}`}>Paso {i + 1}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ DOS ESTRATEGIAS ═══════════════ */}
      <section id="estrategias" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Dos estrategias. Un objetivo.</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn delay={0.1}>
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-8 h-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold mb-6">
                  <DollarSign className="w-4 h-4" /> VENTAS
                </div>
                <ul className="space-y-4">
                  {['Maximiza rentabilidad', 'Target ACoS < 40%', 'Escala cuando es rentable', 'Se contiene cuando no lo es', 'Para keywords donde ya tienes posición'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.04] p-8 h-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold mb-6">
                  <Target className="w-4 h-4" /> RANKEO
                </div>
                <ul className="space-y-4">
                  {['Conquista posición orgánica #1', 'El ACoS no importa — el ranking sí', 'Siempre sube bids si no hay impresiones', 'Escala cuando el ranking mejora', 'Para keywords estratégicos que quieres dominar'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════ QUÉ INCLUYE ═══════════════ */}
      <section id="features" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent" />
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Todo lo que necesitas. Nada que no.</h2>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Left column: Feature cards */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
              {[
                { icon: Clock, title: 'Bid Adjustment Horario', desc: 'Ajustes cada 60 min basados en impresiones, clicks, y ACoS' },
                { icon: TrendingUp, title: 'Budget Scaling Diario', desc: 'Presupuesto que crece con resultados, sin techo artificial' },
                { icon: Search, title: 'Keyword Discovery Semanal', desc: '3,800+ keywords descubiertos y filtrados automáticamente' },
                { icon: BarChart3, title: 'Ranking Tracker Diario', desc: 'Posición orgánica de cada keyword, cada día' },
                { icon: Layout, title: 'Dashboard en Vivo', desc: 'Métricas por producto y campaña, actualizado cada 3 horas' },
                { icon: Zap, title: 'Reporte Multi-Período', desc: 'Hoy, ayer, 7 días, lifetime — por email y Telegram' },
              ].map((feature, i) => (
                <FadeIn key={i} delay={(i % 2) * 0.1}>
                  <GlowCard>
                    <feature.icon className="w-8 h-8 text-emerald-400 mb-3" />
                    <h3 className="font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                  </GlowCard>
                </FadeIn>
              ))}
            </div>

            {/* Right column: Telegram bot image */}
            <FadeIn delay={0.2} className="hidden lg:block">
              <div className="relative h-full">
                <div className="absolute -inset-2 bg-gradient-to-b from-emerald-500/10 to-blue-500/10 rounded-2xl blur-lg" />
                <img
                  src={adsTelegram}
                  alt="Bot de Telegram de Hipervinculo Ads - Reportes y consultas 24/7"
                  className="relative rounded-2xl border border-white/10 w-full h-full object-cover"
                />
              </div>
            </FadeIn>
          </div>

          {/* Bottom row: remaining 3 features */}
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: Bot, title: 'Bot de Telegram 24/7', desc: 'Pregunta por status, ACoS, campañas desde tu teléfono' },
              { icon: Shield, title: 'Auditoría Automática', desc: 'Verificación de integridad después de cada tarea' },
              { icon: Target, title: 'Campañas STC', desc: '1 keyword, 1 campaña, match exacto. Control total.' },
            ].map((feature, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <GlowCard>
                  <feature.icon className="w-8 h-8 text-emerald-400 mb-3" />
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                </GlowCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ COMPARATIVA ═══════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">No es otro dashboard</h2>
          </FadeIn>

          <FadeIn>
            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-gray-400 font-medium text-sm" />
                    <th className="p-4 text-gray-400 font-medium text-sm text-center">Herramientas tradicionales</th>
                    <th className="p-4 text-center">
                      <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent font-bold text-sm">Hipervinculo Ads</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Frecuencia de ajustes', 'Diario / semanal', 'Cada 60 minutos'],
                    ['Estructura de campañas', 'Multi-keyword', 'STC (1 keyword = 1 campaña)'],
                    ['Presupuesto', 'Fijo', 'Escala con resultados'],
                    ['Conexión PPC-Orgánico', 'No existe', 'Ranking tracker integrado'],
                    ['Reportes', 'Dashboard pasivo', 'Bot activo + email + Telegram'],
                    ['Estrategia', 'Una sola (ACoS)', 'Dos (VENTAS + RANKEO)'],
                    ['Lanzamiento de campañas', 'Manual', 'Automático'],
                    ['Descubrimiento de keywords', 'Manual o básico', 'Automatizado multi-fuente'],
                  ].map(([label, trad, hv], i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 text-sm font-medium">{label}</td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center gap-2 text-gray-500 text-sm">
                          <X className="w-4 h-4 text-red-400/70" /> {trad}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center gap-2 text-sm text-emerald-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {hv}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════ MÉTRICAS ═══════════════ */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent" />
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Números reales</h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { num: 138, suffix: '+', label: 'Campañas activas gestionadas' },
              { num: 3800, suffix: '+', label: 'Keywords descubiertos y calificados' },
              { num: 24, suffix: '', label: 'Ajustes de bid al día por campaña' },
              { num: 9, suffix: '', label: 'Tareas automatizadas 24/7' },
              { num: 0, prefix: '$', label: 'Intervención manual' },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={stat.num} suffix={stat.suffix} prefix={stat.prefix || ''} />
                </div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ OBJETIVO FINAL ═══════════════ */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-blue-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px]" />
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-8">
              El objetivo no es tener buen ACoS.
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Es llegar a posición orgánica #1.
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Cuando tu producto domina orgánicamente, las ventas naturales toman el control, el PPC se reduce, y cada dólar invertido en publicidad fue una inversión que compró posición permanente.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/15 to-blue-500/15 rounded-2xl blur-xl" />
              <img
                src={adsRanking}
                alt="Crecimiento de ranking orgánico con Hipervinculo Ads"
                className="relative rounded-2xl border border-white/10 w-full"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════ CTA FINAL ═══════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <img src={adsLogo} alt="Hipervinculo Ads" className="h-16 w-16 mx-auto mb-8 object-contain" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8">
              ¿Listo para poner tu PPC en piloto automático?
            </h2>
            <a
              href="https://calendly.com/hipervinculo_usa/30-minutes-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-lg transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:scale-105"
            >
              Agenda una Demo
              <ChevronRight className="w-5 h-5" />
            </a>
            <p className="text-gray-500 mt-6 text-sm">Sin contratos. Sin setup fees. Resultados en la primera semana.</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={adsLogo} alt="Hipervinculo Ads" className="h-8 w-8 object-contain" />
            <span className="font-bold text-lg">Hipervinculo <span className="text-emerald-400">Ads</span></span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">Inicio</a>
            <a href="#como-funciona" className="hover:text-white transition-colors">Cómo Funciona</a>
            <a href="https://hipervinculo.net" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">hipervinculo.net</a>
          </nav>
          <p className="text-xs text-gray-600">© 2026 Hipervínculo. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
