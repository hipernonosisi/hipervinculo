import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, animate } from 'framer-motion';
import { Eye, Hammer, Rocket, Play, Check, Award, Users, Zap, Shield, Globe2, Star } from 'lucide-react';
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

// ── Google Reviews data (placeholder — replace with real reviews) ──
const googleReviews = [
  { name: 'Carlos M.', text: 'Incredible results. Within 60 days of launching our Google Ads campaign, we were getting 15+ qualified leads per week. The team is responsive, professional, and truly understands digital growth.', date: '2 months ago' },
  { name: 'Sarah T.', text: 'They redesigned our website and it looks absolutely stunning. More importantly, our conversion rate tripled. Best investment we\'ve made for our business this year.', date: '3 months ago' },
  { name: 'Roberto L.', text: 'Working with Hipervínculo has been a game-changer. Our online presence went from non-existent to dominating local search results. Highly recommend their team.', date: '1 month ago' },
  { name: 'Jennifer K.', text: 'What I love most is the transparency. They show us exactly where every dollar goes and the results speak for themselves. 5 stars all the way.', date: '4 months ago' },
  { name: 'David P.', text: 'The free website preview sold us immediately. We could see exactly what we were getting before committing. The final product exceeded our expectations.', date: '2 months ago' },
  { name: 'María G.', text: 'Excelente equipo bilingüe. Nos ayudaron con todo — diseño web, Google Ads, y estrategia digital. Los resultados hablan por sí solos. 100% recomendados.', date: '3 weeks ago' },
];

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
      <section className="pt-32 pb-16 md:pt-44 md:pb-24">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left: Copy */}
            <div className="flex-1 text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl sm:text-5xl md:text-[56px] font-extrabold leading-[1.08] tracking-tight text-foreground mb-6"
              >
                Stop Losing Customers to Competitors Who Simply Show Up First on Google
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                We design high-performance websites and run targeted Google Ads that put your business in front of people already searching for your services. 200+ businesses. 20+ years. Real results.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
              >
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
              </motion.div>
              {/* Stats inline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex gap-8 justify-center lg:justify-start"
              >
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
              </motion.div>
            </div>

            {/* Right: Vertical VSL Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-shrink-0 w-full max-w-[300px] lg:max-w-[340px]"
            >
              <div className="relative aspect-[9/16] bg-muted rounded-3xl overflow-hidden border border-border shadow-lg flex items-center justify-center cursor-pointer group">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-accent-foreground ml-1" fill="currentColor" />
                </div>
                <div className="absolute bottom-6 left-0 right-0 text-center">
                  <span className="text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">Video coming soon</span>
                </div>
              </div>
            </motion.div>
          </div>
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
            <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 h-14 text-base font-semibold">
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {googleReviews.map((review) => (
              <div key={review.name} className="bg-secondary border border-border rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-bold text-accent">
                      {review.name.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold text-foreground">{review.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
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
      <section className="py-20 md:py-28 bg-foreground text-background">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-6">
            Your Competitors Are Getting the Customers That Should Be Yours.
          </h2>
          <p className="opacity-70 mb-10 max-w-xl mx-auto">
            Let's fix that. Book a free 15-minute strategy call and see how we'd build your growth system.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-10 h-16 text-lg font-semibold">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
          <p className="text-xs opacity-40 mt-4">No pressure. No hard sell. Just a conversation about your business.</p>
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
