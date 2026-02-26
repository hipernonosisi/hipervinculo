import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, animate } from 'framer-motion';
import { Eye, Hammer, Rocket, Play, Pause, Check, Award, Users, Zap, Shield, Globe2, Star, ArrowRight, Volume2, VolumeX, FastForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SEO } from '@/components/SEO';
import logoFull from '@/assets/logo-hipervinculo.png';

const BOOKING_URL = 'https://meetings-eu1.hubspot.com/acamacho?uuid=c5d18399-7c20-4ff8-8754-92e138e05f08';

// ── Animated section wrapper ──
function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ── Animated counter ──
function Counter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [isInView, target]);

  return <span ref={ref}>{prefix}{value}{suffix}</span>;
}

// ── Apple-style scroll-reveal project card ──
function ScrollRevealCard({ project, index }: { project: typeof caseStudies[0]; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Alternate: even from left, odd from right
  const fromLeft = index % 2 === 0;
  const startX = fromLeft ? -60 : 60; // start percentage off-screen

  const x = useTransform(scrollYProgress, [0, 0.3, 0.5], [startX, startX * 0.3, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.45], [0.3, 0.7, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.85, 0.95, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ x: useTransform(x, (v) => `${v}%`), opacity, scale }}
      className="mb-6 md:mb-10"
    >
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="group block">
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-muted border border-border shadow-sm hover:shadow-xl transition-shadow duration-500">
          <img src={project.image} alt={project.name} className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700" loading="lazy" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 md:p-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">{project.type}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-white mb-1">{project.name}</h3>
            <p className="text-sm md:text-base text-white/80 font-medium">{project.result}</p>
          </div>
        </div>
      </a>
    </motion.div>
  );
}


// ── Case studies data ──
const caseStudies = [
  { name: 'Step Solution USA', type: 'Dental Clinic (Playa del Carmen)', result: '200+ patient inquiries/week from international clients', image: '/portfolio/step-solution-hero.png', url: 'https://stepsolutionusa.com/' },
  { name: 'ZERMA Latin America', type: 'Heavy Machinery Distributor', result: '$30M+ in sales over 15 years', image: '/portfolio/zerma-la.png', url: 'https://zerma-la.com/' },
  { name: 'Filtro Láser', type: 'Party Rentals', result: '300 online quotes/month for 10+ years straight', image: '/portfolio/filtro-laser.png', url: 'https://filtrolaserparaplastico.com/' },
  { name: 'Pulverizadores Industriales', type: 'Industrial Equipment', result: '$200K+/month in sales through targeted ads', image: '/portfolio/pulverizadores-industriales.png', url: 'https://pulverizadoresindustriales.com/' },
  { name: 'Stillwater Day Spa', type: 'Spa (Dallas, TX)', result: 'From 2-3 calls/day to 20+ calls/day', image: '/portfolio/stillwater-day-spa-hero.png', url: 'https://stillwaterdayspa.com/' },
  { name: 'Rasetta Innovations', type: 'Real Estate Brokerage', result: '800+ leads/month, 20 properties closed/month', image: '/portfolio/rasetta-innovations-hero.png', url: 'https://rasettainnovations.com/' },
  { name: 'Lajex LLC', type: 'Water Purification', result: '1-2 clients/week to 7-8 clients/week in 90 days', image: '/portfolio/lajex-llc.png', url: 'https://lajexllc.com/' },
  { name: 'Délios Home', type: 'Kitchen Cabinet Refacing', result: '0 to 10 qualified leads/month, 60% close rate in 90 days', image: '/portfolio/delios-home-hero.png', url: 'https://delioshome.com/' },
];

const steps = [
  { icon: Eye, label: 'Preview', title: 'We Design Your Website Preview', desc: 'Before you pay a single dollar, we design a custom preview of your new website in just 1 business day. You see exactly what you\'re getting before committing. No commitment, no risk.', image: '/portfolio/delios-home-hero.png' },
  { icon: Hammer, label: 'Build', title: 'We Build & Launch Your Website', desc: 'Not just any website. A high-performance website specifically engineered to convert visitors into customers. Every button, every headline, every page is designed with one goal — make the phone ring. Make the form get filled out. Make the sale happen. This isn\'t about looking pretty. This is about making money.', image: '/portfolio/stillwater-day-spa-hero.png' },
  { icon: Rocket, label: 'Grow', title: 'We Drive Qualified Traffic', desc: 'We put your business in front of people who are actively searching for your services right now. Not random people scrolling Instagram. People who just typed "plumber near me" or "best dentist in Cancun" into Google. These people have intent, urgency, and a credit card. All they need is to find YOU.', image: '/portfolio/google-ads-dashboard-1.png' },
  { icon: Zap, label: 'Scale', title: 'We Optimize & Scale Your Results', desc: 'Every week, we analyze your campaigns. We track every call, every form submission, every dollar spent and every dollar earned. We kill what doesn\'t work. We double down on what does. Month after month, your lead flow grows, your cost per lead goes down, and your revenue goes up. It\'s a machine — and once it\'s running, it just keeps getting better.', image: '/portfolio/google-ads-dashboard-2.png' },
];

const whyCards = [
  { icon: Award, title: '20+ Years of Experience', desc: 'We\'ve been building websites and running digital campaigns since before most agencies existed.' },
  { icon: Users, title: '200+ Clients Served', desc: 'From local service businesses to international distributors across the US and Latin America.' },
  { icon: Eye, title: 'See Before You Pay', desc: 'We design your custom website preview in 1 business day — completely free. No commitment.' },
  { icon: Shield, title: 'No Long-Term Contracts', desc: 'We keep clients because we deliver results, not because we lock them into agreements.' },
  { icon: Zap, title: 'Real Results, Not Reports', desc: 'We track every call, every form, every dollar. You see exactly what your investment generates.' },
  { icon: Globe2, title: 'Bilingual Team', desc: 'We serve businesses in English and Spanish across the US, Latin America, and beyond.' },
];

const faqs = [
  { q: 'How does the free website preview work?', a: 'We design a custom preview of your new website in just 1 business day. You see exactly what your site will look like before paying anything. If you love it, we move forward. If not, you walk away — no charge.' },
  { q: 'What\'s included in the $3,000 website?', a: 'A fully custom, mobile-optimized website designed to convert visitors into customers. This includes design, development, content setup, SEO-ready structure, and launch.' },
  { q: 'What does the $1,250/month Google Ads management include?', a: 'Campaign strategy, ad creation, keyword targeting, landing page optimization, conversion tracking, and weekly optimization. Your ad spend with Google is separate and you control the budget.' },
  { q: 'Do I need to sign a long-term contract?', a: 'No. We work month to month. You stay because the results speak for themselves.' },
  { q: 'How soon will I see results?', a: 'Most clients see their first qualified leads within 30-60 days of launching Google Ads. Some see results in as little as 2 weeks.' },
  { q: 'What industries do you work with?', a: 'We work with any service-based business that has a Google Business Profile — plumbers, spas, realtors, dentists, contractors, retailers, distributors, and more.' },
];

const websiteFeatures = [
  'Custom design tailored to your business',
  'Mobile-optimized and fast-loading',
  'Built to convert visitors into customers',
  'SEO-ready structure',
  'Free website preview before you commit',
];

const adsFeatures = [
  'Targeted campaigns for your service area',
  'Only reach people actively searching for your services',
  'Weekly optimization and reporting',
  'Conversion tracking on every call and form',
  'Scale up as results grow',
];

const VSL_URL = 'https://www.dropbox.com/scl/fi/490x2sa40x6fpyflaimkn/VSL_WEBDEV_HIPER_reduced.mp4?rlkey=gnufghnfggtarklawt13dtzu1&dl=1';

function VSLPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<'preview' | 'playing'>('preview');
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  // Autoplay muted + 2x speed on mount
  useEffect(() => {
    if (!isInView || !videoRef.current) return;
    const v = videoRef.current;
    v.muted = true;
    v.playbackRate = 2;
    v.play().catch(() => {});
  }, [isInView]);

  // Track progress
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      if (v.duration) setProgress((v.currentTime / v.duration) * 100);
    };
    v.addEventListener('timeupdate', onTime);
    return () => v.removeEventListener('timeupdate', onTime);
  }, []);

  const handleClick = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (state === 'preview') {
      // Switch to full playback with audio
      v.muted = false;
      v.playbackRate = 1;
      v.currentTime = 0;
      v.play().catch(() => {});
      setMuted(false);
      setState('playing');
    } else {
      // Toggle play/pause
      if (v.paused) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    }
  }, [state]);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, delay: 0.25 }}
      className="relative w-full max-w-[360px] md:max-w-[420px] mx-auto mb-12 md:mb-16"
    >
      <div
        className="relative aspect-[9/16] bg-foreground/5 rounded-2xl md:rounded-3xl overflow-hidden border border-border shadow-2xl cursor-pointer"
        onClick={handleClick}
      >
        <video
          ref={videoRef}
          src={VSL_URL}
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          loop={state === 'preview'}
          preload="auto"
        />

        {/* Overlay for preview state */}
        {state === 'preview' && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-foreground/20" />

            {/* Pulsating play button */}
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-accent/30 absolute"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent/20 absolute"
              />
              <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/30">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-accent-foreground ml-1" fill="currentColor" />
              </div>
            </div>

            {/* CTA label */}
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative z-10 mt-6"
            >
              <span className="text-sm md:text-base font-semibold text-background bg-accent px-5 py-2 rounded-full shadow-lg flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Tap to Watch with Sound
              </span>
            </motion.div>
          </div>
        )}

        {/* Controls for playing state */}
        {state === 'playing' && (
          <>
            {/* Mute toggle */}
            <button
              onClick={toggleMute}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-foreground/60 backdrop-blur-sm flex items-center justify-center text-background hover:bg-foreground/80 transition-colors"
            >
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-foreground/20">
              <div className="h-full bg-accent transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </>
        )}
      </div>

      {/* Duration badge */}
      <div className="text-center mt-3">
        <span className="text-xs text-muted-foreground">9 min · Watch how we grow businesses</span>
      </div>
    </motion.div>
  );
}

export default function Preview() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-background min-h-screen text-foreground">
      <SEO
        title="Grow Your Business — Hipervínculo"
        description="We design high-performance websites and run targeted Google Ads that put your business in front of people already searching for your services."
        url="https://hipervinculo.net/preview"
      />

      {/* ── Sticky Header ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border' : 'bg-transparent'}`}>
        <div className="container flex h-16 items-center justify-between">
          <Link to="/">
            <img src={logoFull} alt="Hipervínculo" className="h-10" />
          </Link>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6 h-10 font-semibold text-sm">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a Call</a>
          </Button>
        </div>
      </header>

      {/* ── S1: Hero + VSL Video ── */}
      <section className="pt-28 pb-12 md:pt-40 md:pb-20">
        <div className="container">
          {/* Headline centered */}
          <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-5xl md:text-[56px] font-extrabold leading-[1.08] tracking-tight text-foreground mb-5"
            >
              Stop Losing Customers to Competitors Who Simply Show Up First on Google
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              We design high-performance websites and run targeted Google Ads that put your business in front of people already searching for your services.
            </motion.p>
          </div>

          {/* VSL Video — HERO PROTAGONIST */}
          <VSLPlayer />

          {/* CTA + Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 h-14 text-base font-semibold">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a Free Strategy Call</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border text-foreground hover:bg-muted rounded-full px-8 h-14 text-base font-semibold bg-transparent"
                onClick={() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See Our Work
              </Button>
            </div>
            <div className="flex gap-8 justify-center">
              {[
                { target: 200, suffix: '+', label: 'Clients', prefix: '' },
                { target: 20, suffix: '+', label: 'Years', prefix: '' },
                { target: 98, suffix: 'M+', label: 'Generated', prefix: '$' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground">
                    <Counter target={s.target} suffix={s.suffix} prefix={s.prefix} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S3: How It Works ── */}
      <Section className="py-20 md:py-28">
        <div className="container max-w-6xl">
          <div className="text-center mb-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">How we work?</p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground max-w-3xl mx-auto">
              We simplify growth into 3 focused steps that deliver real results.
            </h2>
          </div>

          <div className="mt-16 md:mt-24 space-y-20 md:space-y-32">
            {steps.map((step, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12`}>
                <div className="flex-1 w-full">
                  <span className="inline-block text-xs font-semibold uppercase tracking-wider text-accent mb-3 bg-accent/10 px-3 py-1 rounded-full">
                    {step.label}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4 leading-tight">{step.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
                <div className="flex-1 w-full">
                  <div className="rounded-2xl md:rounded-3xl overflow-hidden border border-border shadow-sm">
                    <img src={step.image} alt={step.title} className="w-full h-auto object-cover" loading="lazy" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── S4: Results / Case Studies (Apple-style scroll reveal) ── */}
      <section className="py-20 md:py-28 bg-secondary overflow-hidden" id="results">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Explore work</p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground mb-4">Projects That Speak for Themselves</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Live websites you can visit right now. Real businesses generating real revenue.
            </p>
          </div>

          {caseStudies.map((cs, i) => (
            <ScrollRevealCard key={cs.name} project={cs} index={i} />
          ))}

          <div className="text-center mt-8">
            <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 md:px-8 h-14 text-sm md:text-base font-semibold w-full sm:w-auto">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Want results like these? Book Your Free Strategy Call</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ── S5: Why Hipervínculo ── */}
      <Section className="py-20 md:py-28">
        <div className="container max-w-5xl">
          <div className="text-center mb-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Why us?</p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground mb-12">Why 200+ Businesses Trust Us</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyCards.map((c) => (
              <div key={c.title} className="bg-secondary border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <c.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Google Reviews ── */}
      <Section className="py-16 md:py-20">
        <div className="container">
          <a href="https://www.google.com/search?q=Hipervinculo+Weston+Reviews" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 mb-8 hover:opacity-80 transition-opacity">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            <span className="text-sm font-semibold text-foreground">Google Reviews</span>
            <div className="flex gap-0.5 ml-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-1">5.0 (23 reviews)</span>
          </a>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Javier Garcia Jimenez', text: 'Highly recommend this team. They combine commitment with speed launching fast, testing rapidly, and iterating based on real data. What I appreciate most is their openness and constant drive to improve. They are proactive, responsive, and focused on results. A reliable digital partner.', date: '7 hours ago', color: '#4285F4' },
              { name: 'Rebecca Riera', text: "We've seen a clear increase in qualified appointments. It's not just more traffic — it's the right traffic converting into real opportunities.", date: '2 days ago', color: '#EA4335' },
              { name: 'Patrizia Garcia', text: 'Gracias a Hipervinculo hemos logrado captar nuevos clientes y las ventas de nuestros productos se han incrementado. Tenemos más de 15 años trabajando con Hipervinculo y esperamos que siga así por muchos años más, agradecidos con Miguel y con todo el equipo de Hipervinculo por su valiosa ayuda siempre', date: '2 days ago', color: '#34A853' },
              { name: 'Vicente Marino', text: 'After trying other agencies with limited success, we started with Hipervínculo who finally delivered measurable and great results. Our appointment bookings increased and our sales team is seeing clearly the quality of leads targeted and generated by them.', date: '2 days ago', color: '#4285F4' },
              { name: 'Juan Lattuf', text: 'From Meta Ads to full funnel strategy, Hipervinculo brought structure and clarity to our digital marketing efforts. They built a solid strategy, improved our creative direction, and consistently optimized campaigns based on real data. Communication is excellent and the results speak for themselves.', date: '2 days ago', color: '#FBBC05' },
              { name: 'Melina Carfi', text: 'Working with Hipervinculo completely transformed our lead generation. We went from inconsistent inquiries and wasted ad spend to a steady flow of qualified leads every single week. Their team rebuilt our Google Ads campaigns with a clear, data-driven strategy focused on high-intent searches and proper conversion tracking.', date: '2 days ago', color: '#EA4335' },
              { name: 'Hernan Rivas', text: "What I value most about Hipervínculo is their accessibility and patience. They aren't just experts at what they do; they guide you through the entire process, answering every question and providing valuable insights we hadn't even considered. It's rare to find technology partners this committed nowadays. We will definitely continue working with them!", date: '2 days ago', color: '#795548' },
              { name: 'Raúl Riera', text: 'What sets Hipervinculo apart is their performance based mindset. They genuinely care about profitability, not vanity metrics. Their strategic guidance on pricing, advertising structure, and marketplace growth has been invaluable to our business. Professional, knowledgeable, and results oriented from day one.', date: '2 days ago', color: '#4285F4' },
            ].map((review) => (
              <div key={review.name} className="bg-secondary border border-border rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-4">"{review.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ backgroundColor: review.color }}>
                    {review.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-foreground block truncate">{review.name}</span>
                    <span className="text-[10px] text-muted-foreground">{review.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <a href="https://www.google.com/search?q=Hipervinculo+Weston+Reviews" target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline font-medium">
              Read all 23 reviews on Google →
            </a>
          </div>
        </div>
      </Section>

      <Section className="py-20 md:py-28 bg-secondary">
        <div className="container max-w-4xl">
          <div className="text-center mb-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Our Pricing</p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground">No hidden fees. No long-term contracts. Just results.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-14">
            {/* Website */}
            <div className="bg-background border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-foreground mb-1">Website Development</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-extrabold text-foreground">$3,000</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">one-time investment</p>
              <p className="text-xs text-muted-foreground mb-4">Pause or cancel anytime</p>
              <Button asChild className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-full h-12 font-semibold mb-6">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book A Call</a>
              </Button>
              <p className="text-xs font-semibold text-muted-foreground mb-3">What's included:</p>
              <ul className="space-y-3">
                {websiteFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            {/* Google Ads */}
            <div className="bg-foreground text-background rounded-2xl p-8 relative">
              <h3 className="text-lg font-bold mb-1">Google Ads Management</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-extrabold">$1,250</span>
                <span className="text-lg opacity-60">/month</span>
              </div>
              <p className="text-sm opacity-60 mb-6">ongoing lead generation</p>
              <p className="text-xs opacity-60 mb-4">Pause or cancel anytime</p>
              <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-full h-12 font-semibold mb-6">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Get Started Today</a>
              </Button>
              <p className="text-xs font-semibold opacity-60 mb-3">What's included:</p>
              <ul className="space-y-3">
                {adsFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm opacity-80">
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-muted-foreground text-sm mt-8">
            Every project starts with a free website preview — zero risk.
          </p>
        </div>
      </Section>

      {/* ── S7: Founder Story ── */}
      <Section className="py-20 md:py-28">
        <div className="container max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
            {/* Photo */}
            <div className="shrink-0 w-full max-w-[280px] md:max-w-[320px]">
              <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
                <img src="/images/miguel-founder.png" alt="Miguel — Founder of Hipervínculo" className="w-full h-auto object-cover" />
              </div>
            </div>
            {/* Story */}
            <div className="flex-1">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">Meet the Founder</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-6 leading-tight">
                If your business doesn't show up on Google... you're invisible.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm Miguel, founder of Hipervínculo. I started this company when I was 21 years old in Venezuela. I was obsessed with the internet, obsessed with what it could do for businesses, and I built my first websites before most people in my country even had a broadband connection. In 2011, I brought the company to the United States, right here to South Florida.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Over the last 20 years, I've helped more than 200 businesses — from local service companies to international distributors — go from invisible online to generating real customers, real calls, and real revenue. Every single week. Not sometimes. <span className="font-semibold text-foreground">Every week.</span>
              </p>
              <Button asChild className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 h-12 font-semibold">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Let's Talk About Your Business</a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ── S8: FAQ ── */}
      <Section className="py-20 md:py-28 bg-secondary">
        <div className="container max-w-3xl">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Built for {new Date().getFullYear()}</p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-background border border-border rounded-xl px-6 overflow-hidden">
                <AccordionTrigger className="text-left text-foreground font-semibold text-sm hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* ── S9: Final CTA ── */}
      <section className="relative py-24 md:py-36 bg-foreground text-background overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="container relative z-10 max-w-4xl text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-background/10 backdrop-blur-sm border border-background/10 rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium opacity-80">Limited availability — only 5 spots this month</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-[56px] font-extrabold leading-[1.08] mb-6"
          >
            Your Competitors Are Getting the Customers That Should Be{' '}
            <span className="text-accent">Yours.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl opacity-70 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Let's fix that. Book a free 15-minute strategy call and see how we'd build your growth system.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button asChild size="lg" className="bg-accent text-foreground hover:bg-accent/90 rounded-full px-12 h-16 text-lg font-extrabold shadow-[0_0_40px_rgba(139,195,74,0.4)] hover:shadow-[0_0_60px_rgba(139,195,74,0.5)] transition-shadow">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Book Your Free Strategy Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm opacity-50 mt-6"
          >
            No pressure. No hard sell. Just a conversation about your business.
          </motion.p>

          {/* Trust stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex gap-8 md:gap-16 justify-center mt-14 pt-10 border-t border-background/10"
          >
            {[
              { value: '200+', label: 'Businesses Served' },
              { value: '20+', label: 'Years of Experience' },
              { value: '$98M+', label: 'Revenue Generated' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-accent">{stat.value}</div>
                <div className="text-xs opacity-50 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── S10: Footer ── */}
      <footer className="py-10 border-t border-border bg-background">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/">
            <img src={logoFull} alt="Hipervínculo" className="h-8" />
          </Link>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Hipervínculo. All rights reserved.</p>
          <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}
