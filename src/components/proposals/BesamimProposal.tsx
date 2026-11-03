import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Download, Copy, CheckCircle, Mail, Phone } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { besamimContent as content, type BesamimSection, besamimExamples, money } from './data/besamimContent';
import { BesamimPDFDocument } from './pdf/BesamimPDFDocument';
import './supremeHerbalsProposal.css';
import './besamimProposal.css';

function FinancialTable() { return <div className="bs-financial-scroll"><table className="bs-financial"><thead><tr>{['Shopify net sales','Paid media spend','Blended ROAS','Base retainer','Performance fee','Total agency fee'].map(label => <th key={label}>{label}</th>)}</tr></thead><tbody>{besamimExamples.map(row => <tr key={row.netSales}><td>{money(row.netSales)}</td><td>{money(row.spend)}</td><td>{row.roas?.toFixed(2)}x</td><td>$1,250</td><td>{money(row.performanceFee)}</td><td>{money(row.totalFee)}</td></tr>)}</tbody></table></div>; }
function Items({ section }: { section: BesamimSection }) {
  if (section.layout === 'table') return <div className="sh-table"><div className="sh-table-head"><span>AREA / OWNER</span><span>SCOPE & RESPONSIBILITIES</span></div>{section.items.map(item => <div key={item.title} className="sh-table-row"><h3>{item.title}</h3><p>{item.description}</p></div>)}</div>;
  return <div className={`sh-items sh-items-${section.layout}`}>{section.items.map((item, index) => <div key={item.title} className="sh-item">{section.layout === 'steps' ? <span className="sh-step">{String(index + 1).padStart(2, '0')}</span> : section.layout === 'panels' ? <CheckCircle className="sh-icon" aria-hidden="true" /> : null}<div><h3>{item.title}</h3><p>{item.description}</p></div></div>)}</div>;
}
export function BesamimProposal() {
  const [exporting, setExporting] = useState(false);
  const { toast } = useToast();
  async function download() {
    setExporting(true);
    try {
      const response = await fetch(logoHipervinculo);
      if (!response.ok) throw new Error('Logo unavailable');
      const logoBlob = await response.blob();
      const logoBase64 = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('Logo unreadable')); reader.onerror = reject; reader.readAsDataURL(logoBlob); });
      const blob = await pdf(<BesamimPDFDocument logoBase64={logoBase64} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a'); link.href = url; link.download = 'Proposal-BESAMIM-Hipervinculo.pdf'; link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast({ title: 'PDF downloaded' });
    } catch (error) { console.error('Proposal PDF export failed', error); toast({ title: 'Unable to generate PDF', description: 'Please try again.', variant: 'destructive' }); }
    finally { setExporting(false); }
  }
  async function share() { try { await navigator.clipboard.writeText('https://www.hipervinculo.net/proposal/besamim-perfumes'); toast({ title: 'Link copied', description: 'The link becomes available on the live site after publishing.' }); } catch { toast({ title: 'Unable to copy link', variant: 'destructive' }); } }
  return <div className="sh-proposal bs-proposal flex flex-col h-full">
    <div className="sh-toolbar sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b bg-background"><h2 className="text-sm sm:text-lg font-bold">Proposal — BESAMIM Perfumes</h2><div className="flex items-center gap-2"><Button onClick={share} size="sm" variant="outline" aria-label="Copy proposal link"><Copy className="w-4 h-4" /></Button><Button onClick={download} size="sm" disabled={exporting} className="gap-2"><Download className="w-4 h-4" />{exporting ? 'Preparing…' : 'Download PDF'}</Button></div></div>
    <div className="sh-scroll flex-1 overflow-y-auto py-8 px-3 sm:px-4">
      <article className="sh-page sh-cover"><header><img src={logoHipervinculo} alt="Hipervínculo" /></header><div className="sh-cover-panel"><p className="sh-eyebrow">{content.cover.eyebrow}</p><h1>{content.cover.title}</h1><h2>{content.cover.client}</h2><p className="sh-recipient">{content.cover.recipient}</p><div className="sh-accent" /><p className="sh-tagline">{content.cover.tagline}</p></div><footer><span>CONFIDENTIAL</span><span>hipervinculo.net</span></footer></article>
      <article className="sh-page sh-inner"><div className="sh-accent" /><p className="sh-eyebrow">ABOUT US</p><h2>{content.about.title}</h2><p className="sh-lead">{content.about.headline}</p><p className="sh-intro">{content.about.description}</p><div className="sh-stats">{content.about.stats.map(stat => <div key={stat.value}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div><p className="sh-eyebrow">CAPABILITIES</p><ul className="sh-capabilities">{content.about.capabilities.map(item => <li key={item}>{item}</li>)}</ul><footer><span>HIPERVÍNCULO</span><span>02 · hipervinculo.net</span></footer></article>
      {content.sections.map((section, index) => <article className="sh-page sh-inner" key={section.title}><div className="sh-accent" /><p className="sh-eyebrow">{section.eyebrow}</p><h2>{section.title}</h2><p className="sh-lead">{section.headline}</p>{section.intro && <p className="sh-intro">{section.intro}</p>}{section.layout === 'investment' && <div className="sh-investment"><p className="sh-eyebrow">{content.pricing.label}</p><strong>{content.pricing.monthly}</strong><p>{content.pricing.commitment}</p><span>{content.pricing.exclusions}</span></div>}<Items section={section} />{section.layout === 'financial' && <FinancialTable />}{section.note && <p className="sh-note">{section.note}</p>}<footer><span>HIPERVÍNCULO</span><span>{String(index + 3).padStart(2, '0')} · hipervinculo.net</span></footer></article>)}
      <article className="sh-page sh-cover"><header><img src={logoHipervinculo} alt="Hipervínculo" /></header><div className="sh-cover-panel"><p className="sh-eyebrow">LET’S TALK</p><h2 className="sh-contact-title">{content.contact.title}</h2><p className="sh-recipient">{content.contact.subtitle}</p><div className="sh-accent" /><p>{content.contact.name}</p><a href={`mailto:${content.contact.email}`}><Mail className="w-4 h-4" />{content.contact.email}</a><a href="tel:+17865290679"><Phone className="w-4 h-4" />{content.contact.phone}</a><p>{content.contact.website}</p><p className="sh-address">{content.contact.address}</p></div><footer><span>CONFIDENTIAL</span><span>hipervinculo.net</span></footer></article>
    </div>
  </div>;
}
export default function BesamimPublicProposal() {
  return <><Helmet><title>BESAMIM Proposal Perfumes | Hipervínculo</title><meta name="description" content="Shopify and paid media growth partnership proposal for BESAMIM Perfumes, prepared for Johanna." /><meta name="robots" content="noindex,nofollow" /><meta property="og:title" content="BESAMIM Proposal Perfumes | Hipervínculo" /><meta property="og:description" content="A strategic direct-to-consumer growth partnership for BESAMIM Perfumes." /><meta property="og:type" content="website" /><meta name="twitter:card" content="summary" /></Helmet><div className="h-screen"><BesamimProposal /></div></>;
}