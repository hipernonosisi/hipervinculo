import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, Check, Mail } from 'lucide-react';
import { bokanovaContent as c, bokanovaLiveUrl, bokanovaMailto } from './data/bokanovaContent';
import './bokanova/bokanova.css';

const Placeholder = ({ label, ratio }: { label: string; ratio: string }) => (
  <div className="bk-ph w-full" style={{ aspectRatio: ratio.replace(':', ' / ') }}>Captura: {label} · {ratio}</div>
);

const Section = ({ n, dark, id, children }: { n: string; dark?: boolean; id?: string; children: React.ReactNode }) => (
  <section id={id} className={`${dark ? 'bk-dark' : ''} px-6 sm:px-10 py-20 sm:py-28 scroll-mt-20`}>
    <div className="max-w-6xl mx-auto"><div className="bk-num mb-6">{n}</div>{children}</div>
  </section>
);

const LiveLink = ({ children, className }: { children: React.ReactNode; className: string }) => (
  <a href={bokanovaLiveUrl} target="_blank" rel="noopener noreferrer" className={className}>{children}<ArrowUpRight className="w-4 h-4" /></a>
);

export function BokanovaProposal() {
  const { cover, current, built, seo, ads, timeline, needs, investment, close } = c;
  return (
    <div className="bk min-h-full">
      <header className="bk-header sticky top-0 z-30 px-4 sm:px-8 py-3 flex items-center justify-between gap-3">
        <span className="text-sm sm:text-base font-medium truncate">{c.header}</span>
        <LiveLink className="bk-btn bk-btn-line text-sm shrink-0 !py-2 !px-4 !min-h-0">Ver el sitio nuevo</LiveLink>
      </header>

      <section className="bk-dark px-6 sm:px-10 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="bk-gold uppercase tracking-[0.2em] text-xs sm:text-sm mb-6">{cover.eyebrow}</p>
            <h1 className="text-4xl sm:text-6xl leading-[1.05] mb-6">{cover.title}</h1>
            <div className="bk-rule mb-6" />
            <p className="text-lg sm:text-xl bk-muted mb-6 max-w-xl">{cover.subtitle}</p>
            <p className="text-sm bk-gold mb-10">{cover.preparedFor}</p>
            <div className="flex flex-wrap gap-3">
              <LiveLink className="bk-btn bk-btn-gold">Ver el sitio nuevo en vivo</LiveLink>
              <a href="#inversion" className="bk-btn bk-btn-line">Ver la inversión</a>
            </div>
          </div>
          <Placeholder label="Portada del sitio nuevo (escritorio)" ratio="16:10" />
        </div>
      </section>

      <Section n="01">
        <h2 className="text-3xl sm:text-5xl mb-6 max-w-3xl">{current.title}</h2>
        <p className="text-lg bk-muted mb-10 max-w-3xl">{current.intro}</p>
        <ul className="grid md:grid-cols-2 gap-x-12 gap-y-6">
          {current.points.map(p => <li key={p} className="flex gap-4 border-t pt-5" style={{ borderColor: 'hsl(var(--bk-line))' }}><span className="bk-gold mt-1">—</span><span>{p}</span></li>)}
        </ul>
      </Section>

      <Section n="02" dark>
        <h2 className="text-3xl sm:text-5xl mb-4">{built.title}</h2>
        <p className="text-lg bk-muted mb-10 max-w-2xl">{built.intro}</p>
        <div className="grid md:grid-cols-[2fr_1fr] gap-4 mb-12">
          <Placeholder label="Página de inicio completa" ratio="16:9" />
          <Placeholder label="Vista en teléfono" ratio="9:16" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {built.cards.map(([t, d]) => <div key={t} className="bk-card p-6"><h3 className="text-xl bk-gold mb-3">{t}</h3><p className="text-sm bk-muted leading-relaxed">{d}</p></div>)}
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mt-12">
          <Placeholder label="Visor de antes y después" ratio="4:3" />
          <Placeholder label="Turismo dental" ratio="4:3" />
          <Placeholder label="Vitrina de tecnología" ratio="4:3" />
        </div>
      </Section>

      <Section n="03">
        <h2 className="text-3xl sm:text-5xl mb-6 max-w-3xl">{seo.title}</h2>
        <p className="text-lg bk-muted mb-10 max-w-3xl">{seo.intro}</p>
        <ol className="grid md:grid-cols-2 gap-6 mb-14">
          {seo.points.map((p, i) => <li key={p} className="bk-card p-6 flex gap-4"><span className="font-serif bk-gold text-2xl" style={{ fontFamily: 'Fraunces, serif' }}>{i + 1}</span><span>{p}</span></li>)}
        </ol>
        <blockquote className="text-2xl sm:text-3xl max-w-4xl leading-snug" style={{ fontFamily: 'Fraunces, serif' }}><span className="bk-gold">“</span>{seo.closing}<span className="bk-gold">”</span></blockquote>
      </Section>

      <Section n="04" dark>
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <h2 className="text-3xl sm:text-5xl">{ads.title}</h2>
          <p className="text-lg bk-muted leading-relaxed">{ads.text}</p>
        </div>
      </Section>

      <Section n="05">
        <h2 className="text-3xl sm:text-5xl mb-12">{timeline.title}</h2>
        <div className="grid md:grid-cols-4 gap-8 relative">
          {timeline.steps.map(([t, d, when], i) => (
            <div key={t} className="border-t-2 pt-6" style={{ borderColor: 'hsl(var(--bk-gold))' }}>
              <p className="bk-gold text-sm mb-2">Paso {i + 1}</p>
              <h3 className="text-2xl mb-3">{t}</h3>
              <p className="bk-muted text-sm mb-3">{d}</p>
              {when && <p className="text-sm font-medium bk-gold">{when}</p>}
            </div>
          ))}
        </div>
      </Section>

      <Section n="06" dark>
        <h2 className="text-3xl sm:text-5xl mb-10">{needs.title}</h2>
        <ul className="grid sm:grid-cols-2 gap-4 max-w-4xl">
          {needs.items.map(i => <li key={i} className="flex gap-3"><Check className="w-5 h-5 bk-gold shrink-0 mt-0.5" /><span>{i}</span></li>)}
        </ul>
      </Section>

      <Section n="07" id="inversion">
        <h2 className="text-3xl sm:text-5xl mb-10">{investment.title}</h2>
        <div className="bk-dark rounded p-8 sm:p-12 mb-6">
          <p className="bk-gold uppercase tracking-[0.2em] text-xs mb-3">{investment.web.name}</p>
          <p className="text-5xl sm:text-7xl mb-6" style={{ fontFamily: 'Fraunces, serif' }}>{investment.web.price}</p>
          <p className="text-lg bk-muted mb-8 max-w-2xl"><strong className="bk-gold font-medium">Forma de pago:</strong> {investment.web.payment}</p>
          <div className="bk-rule mb-6" />
          <p className="text-sm uppercase tracking-widest bk-gold mb-4">Incluye</p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {investment.web.includes.map(i => <li key={i} className="flex gap-2 text-sm"><Check className="w-4 h-4 bk-gold shrink-0 mt-0.5" />{i}</li>)}
          </ul>
        </div>
        <div className="bk-card p-8 sm:p-10">
          <div className="flex flex-wrap items-center gap-4 mb-6"><h3 className="text-2xl sm:text-3xl">{investment.seo.name}</h3><span className="bk-badge">{investment.seo.badge}</span></div>
          <ul className="space-y-4 max-w-3xl">
            {investment.seo.points.map(p => <li key={p} className="flex gap-3"><span className="bk-gold">—</span><span>{p}</span></li>)}
          </ul>
        </div>
      </Section>

      <section className="bk-dark px-6 sm:px-10 py-24 sm:py-32 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="bk-num mb-6">08</div>
          <h2 className="text-4xl sm:text-6xl mb-6">{close.title}</h2>
          <p className="text-lg bk-muted mb-10">{close.text}</p>
          <a href={bokanovaMailto} className="bk-btn bk-btn-gold"><Mail className="w-4 h-4" />{close.cta}</a>
          <p className="mt-16 text-sm bk-muted">{close.signature}</p>
          <p className="mt-2 text-xs bk-gold">{close.footer}</p>
        </div>
      </section>
    </div>
  );
}

export default function BokanovaPublicProposal() {
  const title = 'Propuesta · Nuevo sitio web de Bokanova | Hipervínculo';
  const desc = 'Propuesta privada para Bokanova Dental Center: rediseño de bokanova.mx y plan de posicionamiento en buscadores.';
  return <>
    <Helmet><title>{title}</title><meta name="description" content={desc} /><meta name="robots" content="noindex, nofollow" /><meta property="og:title" content={title} /><meta property="og:description" content={desc} /><meta property="og:type" content="website" /><meta name="twitter:card" content="summary" /></Helmet>
    <BokanovaProposal />
  </>;
}
