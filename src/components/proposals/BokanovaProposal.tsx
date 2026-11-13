import { Helmet } from 'react-helmet-async';
import { ArrowUpRight, CheckCircle, Mail, Globe, Search, Calendar, DollarSign, Megaphone, ClipboardList, AlertCircle } from 'lucide-react';
import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { bokanovaContent as c, bokanovaLiveUrl, bokanovaMailto } from './data/bokanovaContent';

const PAGE_WIDTH = 794;
const PAGE_HEIGHT = 1123;
const GREEN = '#2d4a2d';
const LIME = '#8BC34A';
const SOFT = '#f8f9f5';

function Page({ children, bg = '#ffffff', id }: { children: React.ReactNode; bg?: string; id?: string }) {
  return (
    <div id={id} className="relative mx-auto mb-8 shadow-xl overflow-visible scroll-mt-20" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: bg }}>
      <div className="px-16 py-14 flex flex-col" style={{ minHeight: `${PAGE_HEIGHT}px` }}>{children}</div>
    </div>
  );
}

function SectionHead({ eyebrow, title, headline }: { eyebrow: string; title: string; headline?: string }) {
  return (
    <>
      <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: LIME }} />
      <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: LIME }}>{eyebrow}</p>
      <h2 className="text-3xl font-extrabold mb-1" style={{ color: GREEN }}>{title}</h2>
      {headline && <p className="font-medium mb-5" style={{ color: LIME }}>{headline}</p>}
    </>
  );
}

function LiveBox() {
  return (
    <a href={bokanovaLiveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 rounded-2xl px-6 py-5 mt-6" style={{ backgroundColor: GREEN }}>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">Versión provisional del sitio nuevo</p>
        <p className="text-[15px] font-bold break-all" style={{ color: '#c5e86a' }}>{bokanovaLiveUrl}</p>
      </div>
      <ArrowUpRight className="w-6 h-6 text-white/70 shrink-0" />
    </a>
  );
}

const Item = ({ title, text, Icon = CheckCircle }: { title?: string; text: string; Icon?: React.ElementType }) => (
  <div className="flex gap-3 p-4 rounded-xl" style={{ backgroundColor: SOFT }}>
    <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: LIME }} />
    <div>
      {title && <h3 className="font-bold text-[14px]" style={{ color: GREEN }}>{title}</h3>}
      <p className="text-[13px] text-gray-500 mt-0.5 leading-relaxed">{text}</p>
    </div>
  </div>
);

const about = {
  title: 'Hipervínculo',
  headline: 'Agencia de marketing digital con más de 20 años de trayectoria',
  description: 'Diseñamos sitios web y gestionamos campañas digitales orientadas a resultados medibles. Hoy ya gestionamos las campañas de Google Ads de Bokanova, por lo que conocemos a fondo a sus pacientes y lo que buscan.',
  stats: [['20+', 'Años de experiencia'], ['200+', 'Clientes atendidos'], ['$92M+', 'Ventas rastreadas']],
};

export function BokanovaProposal() {
  const { cover, current, built, seo, ads, timeline, needs, investment, close } = c;
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between gap-3 px-4 py-3 bg-white border-b sticky top-0 z-10">
        <h2 className="text-sm sm:text-lg font-bold truncate" style={{ color: GREEN }}>{c.header}</h2>
        <a href={bokanovaLiveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-white shrink-0" style={{ backgroundColor: LIME }}>
          Ver el sitio nuevo <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      <div className="flex-1 overflow-auto bg-gray-300 py-8 px-4">
        {/* Portada */}
        <div className="relative mx-auto mb-8 shadow-xl flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
          <div className="px-16 pt-14 pb-8"><img src={logoHipervinculo} width={500} height={144} alt="Hipervínculo" className="h-10 w-auto" /></div>
          <div className="flex-1 flex flex-col justify-center px-16" style={{ backgroundColor: GREEN }}>
            <p className="text-sm font-bold tracking-[0.2em] uppercase mb-6" style={{ color: LIME }}>{cover.eyebrow}</p>
            <h1 className="text-5xl font-extrabold text-white mb-5 leading-[1.1]">{cover.title}</h1>
            <p className="text-xl text-white/60 mb-6">{cover.subtitle}</p>
            <p className="text-sm text-white/80 mb-8">{cover.preparedFor}</p>
            <div className="w-20 h-1 rounded-full mb-8" style={{ backgroundColor: LIME }} />
            <div className="flex flex-wrap gap-3">
              <a href={bokanovaLiveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold" style={{ backgroundColor: LIME, color: GREEN }}>Ver el sitio nuevo en vivo <ArrowUpRight className="w-4 h-4" /></a>
              <a href="#inversion" className="inline-flex items-center rounded-full px-5 py-3 text-sm font-bold text-white border border-white/40">Ver la inversión</a>
            </div>
          </div>
          <div className="px-16 py-6 flex items-center justify-between bg-white">
            <p className="text-xs text-gray-400 tracking-wider uppercase">Confidencial</p>
            <p className="text-xs text-gray-400">hipervinculo.net</p>
          </div>
        </div>

        <Page>
          <SectionHead eyebrow="Quiénes somos" title={about.title} headline={about.headline} />
          <p className="text-gray-600 leading-relaxed mb-10 text-[15px]">{about.description}</p>
          <div className="grid grid-cols-3 gap-6">
            {about.stats.map(([v, l]) => (
              <div key={l} className="text-center py-6 rounded-2xl" style={{ backgroundColor: SOFT }}>
                <div className="text-4xl font-extrabold mb-1" style={{ color: LIME }}>{v}</div>
                <div className="text-xs text-gray-500 font-medium">{l}</div>
              </div>
            ))}
          </div>
        </Page>

        <Page>
          <SectionHead eyebrow="Punto de partida" title={current.title} />
          <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">{current.intro}</p>
          <div className="space-y-2.5">{current.points.map(p => <Item key={p} text={p} Icon={AlertCircle} />)}</div>
        </Page>

        <Page>
          <SectionHead eyebrow="Lo que ya está construido" title={built.title} headline={built.intro} />
          <div className="grid grid-cols-2 gap-2.5">{built.cards.map(([t, d]) => <Item key={t} title={t} text={d} Icon={Globe} />)}</div>
          <LiveBox />
        </Page>

        <Page>
          <SectionHead eyebrow="Posicionamiento en buscadores" title={seo.title} />
          <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">{seo.intro}</p>
          <div className="space-y-2.5 mb-6">{seo.points.map(p => <Item key={p} text={p} Icon={Search} />)}</div>
          <div className="rounded-2xl px-8 py-6" style={{ backgroundColor: GREEN }}>
            <p className="text-lg font-bold text-white leading-snug">{seo.closing}</p>
          </div>
          <div className="mt-10">
            <SectionHead eyebrow="Campañas" title={ads.title} />
            <Item text={ads.text} Icon={Megaphone} />
          </div>
        </Page>

        <Page>
          <SectionHead eyebrow="Calendario" title={timeline.title} />
          <div className="grid grid-cols-4 gap-3 mb-12">
            {timeline.steps.map(([t, d, when], i) => (
              <div key={t} className="rounded-xl p-4" style={{ backgroundColor: SOFT, borderTop: `3px solid ${LIME}` }}>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: LIME }}>Paso {i + 1}</p>
                <h3 className="font-bold text-[14px] mb-1.5" style={{ color: GREEN }}>{t}</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed mb-2">{d}</p>
                {when && <p className="text-[12px] font-bold" style={{ color: GREEN }}>{when}</p>}
              </div>
            ))}
          </div>
          <SectionHead eyebrow="Requisitos" title={needs.title} />
          <div className="space-y-2.5">{needs.items.map(i => <Item key={i} text={i} Icon={ClipboardList} />)}</div>
        </Page>

        <Page bg={SOFT} id="inversion">
          <SectionHead eyebrow="Inversión" title={investment.title} />
          <div className="rounded-[20px] p-8 mb-5" style={{ backgroundColor: GREEN }}>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60 mb-3">{investment.web.name}</p>
            <div className="font-extrabold mb-3" style={{ color: '#c5e86a', fontSize: '44px', lineHeight: 1 }}>{investment.web.price}</div>
            <p className="text-[13px] text-white/85 leading-relaxed"><strong>Forma de pago:</strong> {investment.web.payment}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 mb-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div className="flex items-center gap-2 mb-4"><DollarSign className="w-4 h-4" style={{ color: LIME }} /><h3 className="font-bold text-[15px]" style={{ color: GREEN }}>Incluye</h3></div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {investment.web.includes.map(i => <p key={i} className="flex gap-2 text-[13px] text-gray-700"><CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: LIME }} />{i}</p>)}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4" style={{ color: LIME }} /><h3 className="font-bold text-[15px]" style={{ color: GREEN }}>{investment.seo.name}</h3></div>
              <span className="text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap" style={{ backgroundColor: 'rgba(139,195,74,0.15)', color: GREEN }}>{investment.seo.badge}</span>
            </div>
            <ul className="space-y-2">
              {investment.seo.points.map(p => <li key={p} className="flex gap-2 text-[13px] text-gray-600 leading-relaxed"><span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: LIME }} />{p}</li>)}
            </ul>
          </div>
        </Page>

        <Page>
          <SectionHead eyebrow="Siguiente paso" title={close.title} />
          <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">{close.text}</p>
          <a href={bokanovaMailto} className="inline-flex items-center gap-2 self-start rounded-full px-6 py-3 text-sm font-bold text-white" style={{ backgroundColor: GREEN }}><Mail className="w-4 h-4" />{close.cta}</a>
          <LiveBox />
          <div className="mt-auto pt-10 border-t border-gray-200 flex items-center justify-between">
            <img src={logoHipervinculo} width={500} height={144} alt="Hipervínculo" className="h-8 w-auto" />
            <p className="text-[12px] text-gray-500">{close.signature}</p>
          </div>
        </Page>
      </div>
    </div>
  );
}

export default function BokanovaPublicProposal() {
  const title = 'Propuesta · Nuevo sitio web de Bokanova | Hipervínculo';
  const desc = 'Propuesta privada para Bokanova Dental Center: rediseño de bokanova.mx y plan de posicionamiento en buscadores.';
  return <div className="h-screen">
    <Helmet><title>{title}</title><meta name="description" content={desc} /><meta name="robots" content="noindex, nofollow" /><meta property="og:title" content={title} /><meta property="og:description" content={desc} /><meta property="og:type" content="website" /><meta name="twitter:card" content="summary" /></Helmet>
    <BokanovaProposal />
  </div>;
}
