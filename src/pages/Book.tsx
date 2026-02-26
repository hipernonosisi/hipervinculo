import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import logoFull from '@/assets/logo-hipervinculo.png';

const BOOKING_URL = 'https://meetings-eu1.hubspot.com/acamacho?uuid=c5d18399-7c20-4ff8-8754-92e138e05f08';

export default function Book() {
  return (
    <div className="dark bg-[hsl(147,25%,6%)] min-h-screen text-[hsl(0,0%,98%)]">
      <SEO
        title="Book a Strategy Call — Hipervínculo"
        description="Pick a time for your free 15-minute strategy call. No pressure, no hard sell."
        url="https://hipervinculo.net/book"
      />

      {/* Header */}
      <header className="border-b border-[hsl(147,20%,16%)]">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/">
            <img src={logoFull} alt="Hipervínculo" className="h-10 brightness-0 invert" />
          </Link>
          <Link to="/preview" className="text-sm text-[hsl(0,0%,60%)] hover:text-[hsl(0,0%,90%)] transition-colors">
            ← Back
          </Link>
        </div>
      </header>

      <main className="py-16 md:py-24">
        <div className="container max-w-3xl text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[hsl(0,0%,100%)] mb-4">
            You're One Step Away From Growing Your Business
          </h1>
          <p className="text-[hsl(0,0%,60%)] mb-10 max-w-xl mx-auto">
            Pick a time that works for you. This is a free 15-minute strategy call — no pressure, no hard sell.
          </p>

          {/* Calendar embed */}
          <div className="bg-[hsl(147,20%,10%)] border border-[hsl(147,20%,16%)] rounded-2xl overflow-hidden mb-10">
            <iframe
              src={`${BOOKING_URL}&embed=true`}
              width="100%"
              height="700"
              frameBorder="0"
              title="Book a Strategy Call"
              className="w-full"
            />
          </div>

          <p className="text-xs text-[hsl(0,0%,40%)] mb-2">
            If the calendar doesn't load,{' '}
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-[hsl(88,56%,53%)] underline">
              click here to book directly
            </a>.
          </p>

          {/* Trust */}
          <div className="flex justify-center gap-8 sm:gap-12 mt-12 pt-8 border-t border-[hsl(147,20%,16%)]">
            {['200+ Businesses', '20+ Years', '$30M+ Generated'].map((s) => (
              <span key={s} className="text-xs sm:text-sm font-semibold text-[hsl(0,0%,50%)]">{s}</span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
