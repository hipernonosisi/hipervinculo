import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentImage } from '@/components/ui/content-image';
import { useLanguage } from '@/contexts/LanguageContext';
const BOOKING_URL = 'https://meetings-eu1.hubspot.com/acamacho?uuid=c5d18399-7c20-4ff8-8754-92e138e05f08';
export function FounderAndReviews() { const {t} = useLanguage(); const p = t.preview; return <>
      {/* ── S7: Founder Story ── */}
      <section className="py-20 md:py-28">
        <div className="container max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
            {/* Photo */}
            <div className="shrink-0 w-full max-w-[280px] md:max-w-[320px]">
              <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
                <ContentImage src="/images/miguel-founder.webp" alt="Miguel — Founder of Hipervínculo" className="w-full h-auto object-cover" />
              </div>
            </div>
            {/* Story */}
            <div className="flex-1">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-4">{p.founder.subtitle}</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-6 leading-tight">
                {p.founder.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {p.founder.p1}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {p.founder.p2} <span className="font-semibold text-foreground">{p.founder.p2Bold}</span>
              </p>
              <Button asChild className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 h-12 font-semibold">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">{p.founder.cta}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>      {/* ── Google Reviews ── */}
      <section className="py-16 md:py-20">
        <div className="container">
          <a href="https://www.google.com/search?q=Hipervinculo+agency+Weston" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 mb-8 hover:opacity-80 transition-opacity">
            
            <span className="text-sm font-semibold text-foreground">{p.reviews.title}</span>
            <div className="flex gap-0.5 ml-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-accent fill-accent" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-1">{p.reviews.rating}</span>
          </a>
          <div className="text-center mt-8">
            <a
              href="https://www.google.com/search?q=Hipervinculo+agency+Weston"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-foreground/60"
            >
              {p.reviews.readAll}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
</>; }
