import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Download, Copy, CheckCircle, Mail, Phone } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { sofibellaContent as content, type SofibellaSection } from './data/sofibellaContent';
import { SofibellaPDFDocument } from './pdf/SofibellaPDFDocument';
import './supremeHerbalsProposal.css';
import './sofibellaProposal.css';

function Options() { return <div className="sf-options">{content.options.map(o => <div key={o.name} className={`sf-option${o.recommended ? ' sf-recommended' : ''}`}><p className="sh-eyebrow">{o.label}</p><h3>{o.name}</h3><strong>{o.price}</strong><span className="sf-cadence">{o.cadence}</span><ul>{o.includes.map(i => <li key={i}>{i}</li>)}</ul><p className="sf-excludes">{o.excludes}</p></div>)}</div>; }
function Items({ section }: { section: SofibellaSection }) {
  if (section.layout === 'table') return <div className="sh-table"><div className="sh-table-head"><span>{section.columns?.[0] ?? "AREA"}</span><span>{section.columns?.[1] ?? "DETAILS"}</span></div>{section.items.map(item => <div key={item.title} className="sh-table-row"><h3>{item.title}</h3><p>{item.description}</p></div>)}</div>;
  return <div className={`sh-items sh-items-${section.layout}`}>{section.items.map((item, index) => <div key={item.title} className="sh-item">{section.layout === 'steps' ? <span className="sh-step">{String(index + 1).padStart(2, '0')}</span> : section.layout === 'panels' ? <CheckCircle className="sh-icon" aria-hidden="true" /> : null}<div><h3>{item.title}</h3><p>{item.description}</p></div></div>)}</div>;
}
export function SofibellaProposal() {
  const [exporting, setExporting] = useState(false);
  const { toast } = useToast();
  async function download() {
    setExporting(true);
    try {
      const response = await fetch(logoHipervinculo);
      if (!response.ok) throw new Error('Logo unavailable');
      const logoBlob = await response.blob();
      const logoBase64 = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('Logo unreadable')); reader.onerror = reject; reader.readAsDataURL(logoBlob); });
      const blob = await pdf(<SofibellaPDFDocument logoBase64={logoBase64} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a'); link.href = url; link.download = 'Proposal-Sofibella-Hipervinculo.pdf'; link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast({ title: 'PDF downloaded' });
    } catch (error) { console.error('Proposal PDF export failed', error); toast({ title: 'Unable to generate PDF', description: 'Please try again.', variant: 'destructive' }); }
    finally { setExporting(false); }
  }
  async function share() { try { await navigator.clipboard.writeText('https://www.hipervinculo.net/proposal/sofibella'); toast({ title: 'Link copied', description: 'The link becomes available on the live site after publishing.' }); } catch { toast({ title: 'Unable to copy link', variant: 'destructive' }); } }
  return <div className="sh-proposal sf-proposal flex flex-col h-full">
    <div className="sh-toolbar sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b bg-background"><h2 className="text-sm sm:text-lg font-bold">Proposal — Sofibella Wear</h2><div className="flex items-center gap-2"><Button onClick={share} size="sm" variant="outline" aria-label="Copy proposal link"><Copy className="w-4 h-4" /></Button><Button onClick={download} size="sm" disabled={exporting} className="gap-2"><Download className="w-4 h-4" />{exporting ? 'Preparing…' : 'Download PDF'}</Button></div></div>
    <div className="sh-scroll flex-1 overflow-y-auto py-8 px-3 sm:px-4">
      <article className="sh-page sh-cover"><header><img src={logoHipervinculo} alt="Hipervínculo" /></header><div className="sh-cover-panel"><p className="sh-eyebrow">{content.cover.eyebrow}</p><h1>{content.cover.title}</h1><h2>{content.cover.client}</h2><p className="sh-recipient">{content.cover.recipient}</p><div className="sh-accent" /><p className="sh-tagline">{content.cover.tagline}</p></div><footer><span>CONFIDENTIAL</span><span>hipervinculo.net</span></footer></article>
      <article className="sh-page sh-inner"><div className="sh-accent" /><p className="sh-eyebrow">ABOUT US</p><h2>{content.about.title}</h2><p className="sh-lead">{content.about.headline}</p><p className="sh-intro">{content.about.description}</p><div className="sh-stats">{content.about.stats.map(stat => <div key={stat.value}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div><p className="sh-eyebrow">CAPABILITIES</p><ul className="sh-capabilities">{content.about.capabilities.map(item => <li key={item}>{item}</li>)}</ul><footer><span>HIPERVÍNCULO</span><span>02 · hipervinculo.net</span></footer></article>
      {content.sections.map((section, index) => <article className="sh-page sh-inner" key={section.title}><div className="sh-accent" /><p className="sh-eyebrow">{section.eyebrow}</p><h2>{section.title}</h2><p className="sh-lead">{section.headline}</p>{section.intro && <p className="sh-intro">{section.intro}</p>}<Items section={section} />{section.layout === 'options' && <Options />}{section.note && <p className="sh-note">{section.note}</p>}<footer><span>HIPERVÍNCULO</span><span>{String(index + 3).padStart(2, '0')} · hipervinculo.net</span></footer></article>)}
      <article className="sh-page sh-cover"><header><img src={logoHipervinculo} alt="Hipervínculo" /></header><div className="sh-cover-panel"><p className="sh-eyebrow">LET’S TALK</p><h2 className="sh-contact-title">{content.contact.title}</h2><p className="sh-recipient">{content.contact.subtitle}</p><div className="sh-accent" /><p>{content.contact.name}</p><a href={`mailto:${content.contact.email}`}><Mail className="w-4 h-4" />{content.contact.email}</a><a href="tel:+17865290679"><Phone className="w-4 h-4" />{content.contact.phone}</a><p>{content.contact.website}</p><p className="sh-address">{content.contact.address}</p></div><footer><span>CONFIDENTIAL</span><span>hipervinculo.net</span></footer></article>
    </div>
  </div>;
}
export default function SofibellaPublicProposal() {
  return <><Helmet><title>Sofibella Wear Proposal | Hipervínculo</title><meta name="description" content="Shopify development, SEO and e-commerce operations proposal for Sofibella Wear." /><meta name="robots" content="noindex,nofollow" /><meta property="og:title" content="Sofibella Wear Proposal | Hipervínculo" /><meta property="og:description" content="Shopify development, search optimization and e-commerce growth management for Sofibella Wear." /><meta property="og:type" content="website" /><meta name="twitter:card" content="summary" /></Helmet><div className="h-screen"><SofibellaProposal /></div></>;
}