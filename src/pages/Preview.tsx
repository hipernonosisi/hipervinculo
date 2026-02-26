import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, animate } from 'framer-motion';
import { Eye, Hammer, Rocket, Play, Check, ChevronDown, Award, Users, Zap, FileText, Globe2, Shield } from 'lucide-react';
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
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
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

  return <span ref={ref}>{value}{suffix}</span>;
}

// ── Case studies data ──
const caseStudies = [
  { name: 'Stillwater Day Spa', type: 'Spa (Dallas, TX)', result: 'From 2-3 calls/day to 20+ calls/day', image: '/portfolio/stillwater-day-spa-hero.png', url: 'https://stillwaterdayspa.com/' },
  { name: 'Rasetta Innovations', type: 'Real Estate Brokerage', result: '800+ leads/month, 20 properties closed/month', image: '/portfolio/rasetta-innovations-hero.png', url: 'https://rasettainnovations.com/' },
  { name: 'Délios Home', type: 'Kitchen Cabinet Refacing', result: '0 to 10 qualified leads/month, 60% close rate in 90 days', image: '/portfolio/delios-home-hero.png', url: 'https://delioshome.com/' },
  { name: 'Step Solution USA', type: 'Dental Clinic (Playa del Carmen)', result: '200+ patient inquiries/week from international clients', image: '/portfolio/step-solution-hero.png', url: 'https://stepsolutionusa.com/' },
  { name: 'Filtro Láser', type: 'Party Rentals', result: '300 online quotes/month for 10+ years straight', image: '/portfolio/filtro-laser.png', url: 'https://filtrolaserparaplastico.com/' },
  { name: 'Pulverizadores Industriales', type: 'Pickleball Distributor', result: '$200K+/month in sales through targeted ads', image: '/portfolio/pulverizadores-industriales.png', url: 'https://pulverizadoresindustriales.com/' },
  { name: 'Lajex LLC', type: 'Water Purification', result: '1-2 clients/week to 7-8 clients/week in 90 days', image: '/portfolio/lajex-llc.png', url: 'https://lajexllc.com/' },
  { name: 'ZERMA Latin America', type: 'Heavy Machinery Distributor', result: '$30M+ in sales over 15 years', image: '/portfolio/zerma-la.png', url: 'https://zerma-la.com/' },
  { name: 'Lajex Water Systems', type: 'Interior Design Store (Miami)', result: 'Consistent weekly leads for 8+ years', image: '/portfolio/lajex-llc-products.png', url: 'https://lajexllc.com/' },
];

const steps = [
  { icon: Eye, title: 'We Design Your Website Preview', desc: 'Before you pay a single dollar, we design a custom preview of your new website in just 1 business day. You see exactly what you\'re getting before committing.' },
  { icon: Hammer, title: 'We Build & Launch Your Website', desc: 'Once approved, we build a high-performance website engineered to convert visitors into customers. Not a pretty brochure — a lead generation machine.' },
  { icon: Rocket, title: 'We Drive Qualified Traffic', desc: 'We launch targeted Google Ads campaigns that put you in front of people actively searching for your services. Then we optimize weekly to maximize your ROI.' },
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
    <div className="dark bg-[hsl(147,25%,6%)] min-h-screen text-[hsl(0,0%,98%)]">
      <SEO
        title="Grow Your Business — Hipervínculo"
        description="We design high-performance websites and run targeted Google Ads that put your business in front of people already searching for your services."
        url="https://hipervinculo.net/preview"
      />

      {/* ── Sticky Header ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[hsl(147,25%,6%)]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="container flex h-16 items-center justify-between">
          <Link to="/">
            <img src={logoFull} alt="Hipervínculo" className="h-10 brightness-0 invert" />
          </Link>
          <Button asChild className="bg-[hsl(88,56%,53%)] hover:bg-[hsl(88,56%,45%)] text-[hsl(0,0%,100%)] rounded-full px-6 h-10 font-semibold text-sm">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a Call</a>
          </Button>
        </div>
      </header>

      {/* ── S1: Hero ── */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-32">
        <div className="container max-w-4xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-[hsl(0,0%,100%)] mb-6"
          >
            Stop Losing Customers to Competitors Who Simply Show Up First on Google
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-base sm:text-lg text-[hsl(0,0%,65%)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            We design high-performance websites and run targeted Google Ads that put your business in front of people already searching for your services. 200+ businesses. 20+ years. Real results.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button asChild size="lg" className="bg-[hsl(88,56%,53%)] hover:bg-[hsl(88,56%,45%)] text-[hsl(0,0%,100%)] rounded-full px-8 h-14 text-base font-semibold">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a Free Strategy Call</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[hsl(0,0%,30%)] text-[hsl(0,0%,85%)] hover:bg-[hsl(0,0%,10%)] rounded-full px-8 h-14 text-base font-semibold bg-transparent"
              onClick={() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See Our Work
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex justify-center gap-8 sm:gap-16"
          >
            {[
              { target: 200, suffix: '+', label: 'Clients' },
              { target: 20, suffix: '+', label: 'Years' },
              { target: 30, suffix: 'M+', label: 'Generated' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-extrabold text-[hsl(88,56%,53%)]">
                  {s.label === 'Generated' && '$'}
                  <Counter target={s.target} suffix={s.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-[hsl(0,0%,50%)] mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── S2: VSL Video ── */}
      <Section className="py-20 bg-[hsl(147,25%,8%)]">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[hsl(0,0%,100%)] mb-8">
            Watch: How We Help Businesses Like Yours Get Found Online
          </h2>
          <div className="relative aspect-video bg-[hsl(147,20%,12%)] rounded-2xl overflow-hidden border border-[hsl(147,20%,18%)] mb-6 flex items-center justify-center cursor-pointer group">
            <div className="w-20 h-20 rounded-full bg-[hsl(88,56%,53%)] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-[hsl(0,0%,100%)] ml-1" fill="white" />
            </div>
            <div className="absolute bottom-4 left-4 text-xs text-[hsl(0,0%,50%)]">Video coming soon</div>
          </div>
          <p className="text-[hsl(0,0%,60%)] mb-6">
            See the real projects below — click through and visit their live websites.
          </p>
          <Button asChild variant="outline" className="border-[hsl(0,0%,25%)] text-[hsl(0,0%,80%)] hover:bg-[hsl(0,0%,10%)] rounded-full bg-transparent">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Ready to talk? Book Your Call</a>
          </Button>
        </div>
      </Section>

      {/* ── S3: How It Works ── */}
      <Section className="py-20 md:py-28">
        <div className="container max-w-5xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[hsl(0,0%,100%)] text-center mb-14">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="bg-[hsl(147,20%,10%)] border border-[hsl(147,20%,16%)] rounded-2xl p-8 hover:border-[hsl(88,56%,53%)] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[hsl(88,56%,53%)]/10 flex items-center justify-center mb-5">
                  <step.icon className="w-6 h-6 text-[hsl(88,56%,53%)]" />
                </div>
                <div className="text-xs font-semibold text-[hsl(88,56%,53%)] mb-2">STEP {i + 1}</div>
                <h3 className="text-lg font-bold text-[hsl(0,0%,100%)] mb-3">{step.title}</h3>
                <p className="text-sm text-[hsl(0,0%,60%)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── S4: Results / Case Studies ── */}
      <Section className="py-20 md:py-28 bg-[hsl(147,25%,8%)]" id="results">
        <div className="container max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[hsl(0,0%,100%)] mb-4">Real Businesses. Real Results.</h2>
            <p className="text-[hsl(0,0%,55%)] max-w-xl mx-auto">
              These aren't stock photos or fake testimonials. These are live projects you can visit right now.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs) => (
              <a
                key={cs.name}
                href={cs.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[hsl(147,20%,10%)] border border-[hsl(147,20%,16%)] rounded-2xl overflow-hidden hover:border-[hsl(88,56%,53%)] transition-all hover:-translate-y-1"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={cs.image} alt={cs.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="text-xs font-semibold text-[hsl(88,56%,53%)] mb-1">{cs.type}</div>
                  <p className="text-sm text-[hsl(0,0%,75%)] font-medium leading-snug">{cs.result}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-[hsl(88,56%,53%)] hover:bg-[hsl(88,56%,45%)] text-[hsl(0,0%,100%)] rounded-full px-8 h-14 text-base font-semibold">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Want results like these? Book Your Free Strategy Call</a>
            </Button>
          </div>
        </div>
      </Section>

      {/* ── S5: Pricing ── */}
      <Section className="py-20 md:py-28">
        <div className="container max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[hsl(0,0%,100%)] mb-4">Simple, Transparent Pricing</h2>
            <p className="text-[hsl(0,0%,55%)]">No hidden fees. No long-term contracts. Just results.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Website */}
            <div className="bg-[hsl(147,20%,10%)] border border-[hsl(147,20%,16%)] rounded-2xl p-8 hover:border-[hsl(88,56%,53%)] transition-colors">
              <h3 className="text-lg font-bold text-[hsl(0,0%,100%)] mb-1">Website Development</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-extrabold text-[hsl(88,56%,53%)]">$3,000</span>
              </div>
              <p className="text-sm text-[hsl(0,0%,50%)] mb-6">one-time investment</p>
              <ul className="space-y-3">
                {websiteFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-[hsl(0,0%,70%)]">
                    <Check className="w-4 h-4 text-[hsl(88,56%,53%)] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            {/* Google Ads */}
            <div className="bg-[hsl(147,20%,10%)] border-2 border-[hsl(88,56%,53%)] rounded-2xl p-8 relative">
              <div className="absolute -top-3 right-6 bg-[hsl(88,56%,53%)] text-[hsl(0,0%,100%)] text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>
              <h3 className="text-lg font-bold text-[hsl(0,0%,100%)] mb-1">Google Ads Management</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-extrabold text-[hsl(88,56%,53%)]">$1,250</span>
                <span className="text-lg text-[hsl(0,0%,50%)]">/month</span>
              </div>
              <p className="text-sm text-[hsl(0,0%,50%)] mb-6">ongoing lead generation</p>
              <ul className="space-y-3">
                {adsFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-[hsl(0,0%,70%)]">
                    <Check className="w-4 h-4 text-[hsl(88,56%,53%)] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-[hsl(0,0%,50%)] text-sm mt-8">
            Every project starts with a free website preview — zero risk.
          </p>
          <div className="text-center mt-6">
            <Button asChild size="lg" className="bg-[hsl(88,56%,53%)] hover:bg-[hsl(88,56%,45%)] text-[hsl(0,0%,100%)] rounded-full px-8 h-14 text-base font-semibold">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
            </Button>
          </div>
        </div>
      </Section>

      {/* ── S6: Why Hipervínculo ── */}
      <Section className="py-20 md:py-28 bg-[hsl(147,25%,8%)]">
        <div className="container max-w-5xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[hsl(0,0%,100%)] text-center mb-14">Why 200+ Businesses Trust Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyCards.map((c) => (
              <div key={c.title} className="bg-[hsl(147,20%,10%)] border border-[hsl(147,20%,16%)] rounded-2xl p-6 hover:border-[hsl(88,56%,53%)] transition-colors">
                <c.icon className="w-8 h-8 text-[hsl(88,56%,53%)] mb-4" />
                <h3 className="text-base font-bold text-[hsl(0,0%,100%)] mb-2">{c.title}</h3>
                <p className="text-sm text-[hsl(0,0%,60%)] leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── S7: Founder Story ── */}
      <Section className="py-20 md:py-28">
        <div className="container max-w-3xl">
          <div className="bg-[hsl(147,20%,10%)] border border-[hsl(147,20%,16%)] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="w-24 h-24 rounded-full bg-[hsl(88,56%,53%)]/10 flex items-center justify-center shrink-0 text-3xl font-bold text-[hsl(88,56%,53%)]">M</div>
            <div>
              <p className="text-[hsl(0,0%,75%)] leading-relaxed mb-4">
                "I started Hipervínculo when I was 21 years old in Venezuela. In 2011, I brought the company to the United States. Over 20 years and 200+ clients later, we've helped businesses across every industry build their digital presence and grow."
              </p>
              <p className="text-sm font-semibold text-[hsl(0,0%,100%)]">— Miguel, Founder</p>
              <Button asChild variant="link" className="text-[hsl(88,56%,53%)] p-0 mt-3 h-auto font-semibold">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Let's talk about your business → Book a Call</a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ── S8: FAQ ── */}
      <Section className="py-20 md:py-28 bg-[hsl(147,25%,8%)]">
        <div className="container max-w-3xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[hsl(0,0%,100%)] text-center mb-14">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-[hsl(147,20%,10%)] border border-[hsl(147,20%,16%)] rounded-xl px-6 overflow-hidden">
                <AccordionTrigger className="text-left text-[hsl(0,0%,90%)] font-semibold text-sm hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[hsl(0,0%,60%)] text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* ── S9: Final CTA ── */}
      <Section className="py-20 md:py-28">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[hsl(0,0%,100%)] mb-6">
            Your Competitors Are Getting the Customers That Should Be Yours.
          </h2>
          <p className="text-[hsl(0,0%,55%)] mb-10 max-w-xl mx-auto">
            Let's fix that. Book a free 15-minute strategy call and see how we'd build your growth system.
          </p>
          <Button asChild size="lg" className="bg-[hsl(88,56%,53%)] hover:bg-[hsl(88,56%,45%)] text-[hsl(0,0%,100%)] rounded-full px-10 h-16 text-lg font-semibold">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book Your Free Strategy Call</a>
          </Button>
          <p className="text-xs text-[hsl(0,0%,40%)] mt-4">No pressure. No hard sell. Just a conversation about your business.</p>
        </div>
      </Section>

      {/* ── S10: Footer ── */}
      <footer className="py-10 border-t border-[hsl(147,20%,16%)]">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/">
            <img src={logoFull} alt="Hipervínculo" className="h-8 brightness-0 invert" />
          </Link>
          <p className="text-xs text-[hsl(0,0%,40%)]">© {new Date().getFullYear()} Hipervínculo. All rights reserved.</p>
          <Link to="/privacy" className="text-xs text-[hsl(0,0%,40%)] hover:text-[hsl(0,0%,70%)] transition-colors">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
}
