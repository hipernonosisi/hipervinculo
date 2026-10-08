import { useState } from 'react';
import { ArrowUpRight, Check, CheckCircle, Copy, Download, Loader2, Mail, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/logo-hipervinculo.png';
import { iaCover, iaPricing, iaQuestions, iaSections } from './data/industrialAdvisorsContent';
import './industrial-advisors.css';

export function IndustrialAdvisorsProposal() {
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [answers, setAnswers] = useState<string[]>(iaQuestions.map(() => ''));
  const { toast } = useToast();
  const responses = iaQuestions.map((q, i) => `${q}\n${answers[i].trim() || '(Pending)'}`).join('\n\n');
  async function copy(text: string, isLink = false) {
    try {
      await navigator.clipboard.writeText(text);
      if (isLink) { setCopied(true); window.setTimeout(() => setCopied(false), 2500); }
      toast({ title: isLink ? 'Link copied' : 'Answers copied' });
    } catch { toast({ title: 'Unable to copy', description: 'Please select and copy the text manually.', variant: 'destructive' }); }
  }
  async function download() {
    setExporting(true);
    try {
      const [{ pdf }, { IndustrialAdvisorsPDFDocument }] = await Promise.all([import('@react-pdf/renderer'), import('./pdf/IndustrialAdvisorsPDFDocument')]);
      const blob = await pdf(<IndustrialAdvisorsPDFDocument logo={new URL(logo, window.location.origin).href} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'Proposal-Industrial-Advisors-Hipervinculo.pdf'; a.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.error('Proposal PDF error', error);
      toast({ title: 'Unable to generate PDF', description: 'Please try again.', variant: 'destructive' });
    } finally { setExporting(false); }
  }
  const footer = (page: number) => <footer className="ia-page-footer"><span>Hipervínculo · Industrial Advisors</span><span>{page} / {iaSections.length + 1}</span></footer>;

  return <div className="ia-proposal">
    <Helmet><html lang="en" /><title>Google Ads Proposal for Industrial Advisors | Hipervínculo</title><meta name="description" content="Hipervínculo’s Google Ads strategy, setup and management proposal for Industrial Advisors, using its existing website." /><meta name="robots" content="noindex, nofollow" /><meta property="og:title" content="Industrial Advisors Proposal · Hipervínculo" /><meta property="og:description" content="Google Ads strategy, transparent investment and industrial real estate lead generation." /><meta property="og:type" content="website" /><meta name="twitter:card" content="summary" /></Helmet>
    <header className="ia-toolbar sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
      <h2 className="text-sm font-bold sm:text-lg">Proposal — Industrial Advisors</h2>
      <div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => copy('https://hipervinculo.net/proposal/industrial-advisors', true)} title="Copy proposal link" className="gap-2">{copied ? <Check size={16} /> : <Copy size={16} />}<span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span></Button><Button size="sm" onClick={download} disabled={exporting} className="gap-2">{exporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}{exporting ? 'Preparing…' : 'Download PDF'}</Button></div>
    </header>
    <main className="ia-document">
      <section className="ia-page" aria-label="Proposal cover">
        <div className="ia-page-header"><img src={logo} alt="Hipervínculo" /></div>
        <div className="ia-cover-panel">
          <p className="ia-eyebrow">{iaCover.title} · {iaCover.date}</p>
          <h1>{iaCover.client}</h1>
          <p className="ia-cover-subtitle">{iaCover.subtitle}</p>
          <p className="ia-cover-tagline">{iaCover.tagline}</p>
          <div className="ia-cover-pricing">{iaPricing.map(p => <div key={p.label} className="ia-cover-price"><div><p>{p.label}</p><small>{p.detail}</small></div><strong>{p.amount}</strong></div>)}</div>
          <p className="ia-cover-note">{iaCover.note}</p>
        </div>
        <footer className="ia-page-footer"><span>Confidential · Prepared by Miguel Camacho</span><span>hipervinculo.net</span></footer>
      </section>
      {iaSections.map((section, index) => section.id === 'cierre' ? <section key={section.id} id={section.id} className="ia-page">
        <div className="ia-contact-panel"><p className="ia-eyebrow">Next step</p><h2>{section.title}</h2><p className="ia-intro">{section.intro}</p>{section.blocks?.map(block => <div key={block.title} className="mb-8"><h3>{block.title}</h3><p className="ia-contact-details">{block.text}</p></div>)}<div className="flex flex-wrap gap-3"><Button asChild className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"><a href="https://calendly.com/hipervinculo_usa/30-minutes-call" target="_blank" rel="noopener noreferrer">Coordinate launch <ArrowUpRight size={16} /></a></Button><Button asChild variant="secondary" className="gap-2"><a href="mailto:info@hipervinculo.net"><Mail size={16} />Contact Hipervínculo</a></Button></div></div>
        <div className="ia-contact-logo"><img src={logo} alt="Hipervínculo" /></div>{footer(index + 2)}
      </section> : <section key={section.id} id={section.id} className="ia-page">
        <div className="ia-page-body"><div className="ia-accent-rule" /><p className="ia-eyebrow">{String(index + 1).padStart(2, '0')} · {section.nav}</p><h2>{section.title}</h2><p className="ia-intro">{section.intro}</p>
          {section.id === 'lanzamiento' ? <div className="space-y-6">{iaQuestions.map((question, i) => <div key={question}><label htmlFor={`ia-answer-${i}`} className="mb-3 block text-sm font-bold leading-relaxed">{i + 1}. {question}</label><Textarea id={`ia-answer-${i}`} value={answers[i]} onChange={e => setAnswers(previous => previous.map((value, j) => j === i ? e.target.value : value))} rows={3} placeholder="Your answer" /></div>)}<p className="text-xs text-muted-foreground">Answers are not saved automatically. Email opens in your email application.</p><div className="flex flex-wrap gap-3"><Button variant="outline" className="gap-2" onClick={() => copy(responses)}><Copy size={16} />Copy answers</Button><Button asChild className="gap-2"><a href={`mailto:info@hipervinculo.net?subject=${encodeURIComponent('Industrial Advisors · Launch preparation')}&body=${encodeURIComponent(responses)}`}><Mail size={16} />Send by email</a></Button></div></div> : <div className="ia-blocks">{section.blocks?.map(block => <div key={block.title} className="ia-block"><CheckCircle size={20} className="ia-block-icon" /><div className="ia-block-content"><h3>{block.title}</h3>{block.text && <p>{block.text}</p>}{block.bullets && <ul>{block.bullets.map(item => <li key={item}>{item}</li>)}</ul>}</div></div>)}</div>}
          {section.table && <><div className="ia-table hidden sm:block"><table><thead><tr>{section.table.headers.map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{section.table.rows.map(row => <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}</tbody></table></div><div className="mt-6 space-y-4 sm:hidden">{section.table.rows.map(row => <div key={row[0]} className="ia-block"><div className="ia-block-content"><h3>{row[0]}</h3>{row.slice(1).map((cell, i) => <div key={i} className="mb-3 last:mb-0"><p className="font-bold">{section.table?.headers[i + 1]}</p><p>{cell}</p></div>)}</div></div>)}</div></>}
          {section.note && section.id !== 'lanzamiento' && <p className="ia-note">{section.note}</p>}
          {section.id === 'contexto' && <a href="https://iamiami.com/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs font-bold">Industrial Advisors website <ExternalLink size={13} /></a>}
        </div>{footer(index + 2)}
      </section>)}
    </main>
  </div>;
}
export default IndustrialAdvisorsProposal;
