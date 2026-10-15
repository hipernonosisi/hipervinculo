import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Download, Copy, CheckCircle, Mail, Phone } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { supremeHerbalsContent as content, type SupremeHerbalsSection } from './data/supremeHerbalsContent';
import { SupremeHerbalsPDFDocument } from './pdf/SupremeHerbalsPDFDocument';
import './supremeHerbalsProposal.css';

function Items({ section }: { section: SupremeHerbalsSection }) {
  if (section.layout === 'table') return <div className="sh-table"><div className="sh-table-head"><span>ÁREA / RESPONSABLE</span><span>ALCANCE Y CONDICIONES</span></div>{section.items.map(item => <div key={item.title} className="sh-table-row"><h3>{item.title}</h3><p>{item.description}</p></div>)}</div>;
  return <div className={`sh-items sh-items-${section.layout}`}>{section.items.map((item, index) => <div key={item.title} className="sh-item">{section.layout === 'steps' ? <span className="sh-step">{String(index + 1).padStart(2, '0')}</span> : section.layout === 'panels' ? <CheckCircle className="sh-icon" aria-hidden="true" /> : null}<div><h3>{item.title}</h3><p>{item.description}</p></div></div>)}</div>;
}
export function SupremeHerbalsProposal() {
  const [exporting, setExporting] = useState(false);
  const { toast } = useToast();
  async function download() {
    setExporting(true);
    try {
      const response = await fetch(logoHipervinculo);
      if (!response.ok) throw new Error('Logo unavailable');
      const logoBlob = await response.blob();
      const logoBase64 = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('Logo unreadable')); reader.onerror = reject; reader.readAsDataURL(logoBlob); });
      const blob = await pdf(<SupremeHerbalsPDFDocument logoBase64={logoBase64} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a'); link.href = url; link.download = 'Propuesta-Supreme-Herbals-Hipervinculo.pdf'; link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast({ title: 'PDF descargado' });
    } catch (error) { console.error('Proposal PDF export failed', error); toast({ title: 'No se pudo generar el PDF', description: 'Intenta descargarlo nuevamente.', variant: 'destructive' }); }
    finally { setExporting(false); }
  }
  async function share() { try { await navigator.clipboard.writeText('https://www.hipervinculo.net/proposal/supreme-herbals'); toast({ title: 'Enlace copiado', description: 'El enlace estará disponible en el sitio cuando publiques los cambios.' }); } catch { toast({ title: 'No se pudo copiar el enlace', variant: 'destructive' }); } }
  return <div className="sh-proposal flex flex-col h-full">
    <div className="sh-toolbar sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b bg-background"><h2 className="text-sm sm:text-lg font-bold">Propuesta — Supreme Herbals</h2><div className="flex items-center gap-2"><Button onClick={share} size="sm" variant="outline" aria-label="Copiar enlace de la propuesta"><Copy className="w-4 h-4" /></Button><Button onClick={download} size="sm" disabled={exporting} className="gap-2"><Download className="w-4 h-4" />{exporting ? 'Preparando…' : 'Descargar PDF'}</Button></div></div>
    <div className="sh-scroll flex-1 overflow-y-auto py-8 px-3 sm:px-4">
      <article className="sh-page sh-cover"><header><img src={logoHipervinculo} alt="Hipervínculo" /></header><div className="sh-cover-panel"><p className="sh-eyebrow">{content.cover.eyebrow}</p><h1>{content.cover.title}</h1><h2>{content.cover.client}</h2><p className="sh-recipient">{content.cover.recipient}</p><div className="sh-accent" /><p className="sh-tagline">{content.cover.tagline}</p></div><footer><span>CONFIDENCIAL</span><span>hipervinculo.net</span></footer></article>
      <article className="sh-page sh-inner"><div className="sh-accent" /><p className="sh-eyebrow">NOSOTROS</p><h2>{content.about.title}</h2><p className="sh-lead">{content.about.headline}</p><p className="sh-intro">{content.about.description}</p><div className="sh-stats">{content.about.stats.map(stat => <div key={stat.value}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div><p className="sh-eyebrow">CAPACIDADES</p><ul className="sh-capabilities">{content.about.capabilities.map(item => <li key={item}>{item}</li>)}</ul><footer><span>HIPERVÍNCULO</span><span>02 · hipervinculo.net</span></footer></article>
      {content.sections.map((section, index) => <article className="sh-page sh-inner" key={section.title}><div className="sh-accent" /><p className="sh-eyebrow">{section.eyebrow}</p><h2>{section.title}</h2><p className="sh-lead">{section.headline}</p>{section.intro && <p className="sh-intro">{section.intro}</p>}{section.layout === 'investment' && <div className="sh-investment"><p className="sh-eyebrow">RETAINER INTEGRAL</p><strong>USD 1,250 / mes</strong><p>24 meses · USD 30,000 en honorarios</p><span>Medios y costos de terceros no incluidos</span></div>}<Items section={section} />{section.note && <p className="sh-note">{section.note}</p>}<footer><span>HIPERVÍNCULO</span><span>{String(index + 3).padStart(2, '0')} · hipervinculo.net</span></footer></article>)}
      <article className="sh-page sh-cover"><header><img src={logoHipervinculo} alt="Hipervínculo" /></header><div className="sh-cover-panel"><p className="sh-eyebrow">HABLEMOS</p><h2 className="sh-contact-title">{content.contact.title}</h2><p className="sh-recipient">{content.contact.subtitle}</p><div className="sh-accent" /><p>{content.contact.name}</p><a href={`mailto:${content.contact.email}`}><Mail className="w-4 h-4" />{content.contact.email}</a><a href="tel:+17865290679"><Phone className="w-4 h-4" />{content.contact.phone}</a><p>{content.contact.website}</p><p className="sh-address">{content.contact.address}</p></div><footer><span>CONFIDENCIAL</span><span>hipervinculo.net</span></footer></article>
    </div>
  </div>;
}
export default function SupremeHerbalsPublicProposal() {
  return <><Helmet><title>Propuesta Supreme Herbals | Hipervínculo</title><meta name="description" content="Propuesta de desarrollo Shopify y gestión de Meta y Google Ads para Supreme Herbals, dirigida al Sr. Klaus." /><meta name="robots" content="noindex,nofollow" /><meta property="og:title" content="Propuesta Supreme Herbals | Hipervínculo" /><meta property="og:description" content="Desarrollo Shopify y publicidad digital. Propuesta de servicios para el Sr. Klaus." /><meta property="og:type" content="website" /><meta name="twitter:card" content="summary" /></Helmet><div className="h-screen"><SupremeHerbalsProposal /></div></>;
}