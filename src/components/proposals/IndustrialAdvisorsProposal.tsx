import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, Copy, Download, Loader2, Mail, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/logo-hipervinculo.png';
import { iaPricing, iaQuestions, iaSections } from './data/industrialAdvisorsContent';
import './industrial-advisors.css';

export function IndustrialAdvisorsProposal() {
  const [active, setActive] = useState('contexto');
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [answers, setAnswers] = useState<string[]>(iaQuestions.map(() => ''));
  const root = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    root.current?.querySelectorAll('.ia-section').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const responses = iaQuestions.map((q, i) => `${q}\n${answers[i].trim() || '(Pendiente)'}`).join('\n\n');
  async function copy(text: string, isLink = false) {
    try {
      await navigator.clipboard.writeText(text);
      if (isLink) { setCopied(true); window.setTimeout(() => setCopied(false), 2500); }
      toast({ title: isLink ? 'Enlace copiado' : 'Respuestas copiadas' });
    } catch { toast({ title: 'No se pudo copiar', description: 'Puedes seleccionar y copiar el contenido manualmente.', variant: 'destructive' }); }
  }
  async function download() {
    setExporting(true);
    try {
      const [{ pdf }, { IndustrialAdvisorsPDFDocument }] = await Promise.all([import('@react-pdf/renderer'), import('./pdf/IndustrialAdvisorsPDFDocument')]);
      const blob = await pdf(<IndustrialAdvisorsPDFDocument logo={new URL(logo, window.location.origin).href} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'Propuesta-Industrial-Advisors-Hipervinculo.pdf'; a.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.error('Proposal PDF error', error);
      toast({ title: 'No se pudo generar el PDF', description: 'Intenta nuevamente.', variant: 'destructive' });
    } finally { setExporting(false); }
  }

  return <div ref={root} className="ia-proposal bg-background text-foreground">
    <Helmet><html lang="es" /><title>Propuesta de Google Ads para Industrial Advisors | Hipervínculo</title><meta name="description" content="Propuesta comercial de Hipervínculo para IA Miami: estrategia, configuración y gestión de Google Ads sobre su web actual." /><meta name="robots" content="noindex, nofollow" /><meta property="og:title" content="Propuesta para Industrial Advisors · Hipervínculo" /><meta property="og:description" content="Estrategia de Google Ads, inversión transparente y seguimiento de oportunidades industriales." /><meta property="og:type" content="website" /><meta name="twitter:card" content="summary" /></Helmet>
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-10">
        <div className="ia-logo p-2"><img src={logo} alt="Hipervínculo" className="h-7 w-auto sm:h-8" /></div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => copy('https://hipervinculo.net/proposal/industrial-advisors', true)} className="gap-2" title="Copiar enlace de la propuesta">{copied ? <Check size={16} /> : <Copy size={16} />}<span className="hidden sm:inline">{copied ? 'Copiado' : 'Compartir'}</span></Button>
          <Button onClick={download} disabled={exporting} className="gap-2">{exporting ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} {exporting ? 'Preparando…' : 'Descargar PDF'}</Button>
        </div>
      </div>
    </header>

    <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[245px_minmax(0,1fr)]">
      <aside className="hidden border-r border-border lg:block">
        <nav aria-label="Secciones de la propuesta" className="sticky top-24 max-h-[calc(100vh-110px)] overflow-y-auto px-6 py-10">
          <p className="mb-5 text-xs font-bold uppercase text-muted-foreground">Industrial Advisors</p>
          {iaSections.map((s, i) => <a key={s.id} href={`#${s.id}`} onClick={() => setActive(s.id)} className={`mb-1 flex items-baseline gap-3 rounded-md px-3 py-2 text-xs leading-relaxed transition-colors ${active === s.id ? 'bg-secondary font-bold text-primary' : 'text-muted-foreground hover:bg-muted'}`}><span className="w-5 shrink-0 text-[10px]">{String(i + 1).padStart(2, '0')}</span>{s.nav}</a>)}
        </nav>
      </aside>

      <main className="min-w-0">
        <section className="border-b border-border px-6 pb-12 pt-12 sm:px-12 sm:pt-16 xl:px-16">
          <div className="mb-8 flex flex-wrap items-center gap-3 text-xs font-bold uppercase text-muted-foreground"><span className="h-2 w-2 bg-accent" /> Propuesta comercial <span> / </span> Octubre 2026</div>
          <p className="mb-4 text-sm font-bold text-primary">HIPERVÍNCULO → IA MIAMI</p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.12] sm:text-5xl xl:text-6xl">Propuesta de Google Ads para Industrial Advisors</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">Una estrategia para captar demanda industrial y convertir búsquedas en oportunidades comerciales.</p>
          <div className="mt-10 grid gap-6 border-y border-border py-7 sm:grid-cols-3">
            {iaPricing.map(p => <div key={p.label}><p className="mb-2 text-xs font-bold text-muted-foreground">{p.label}</p><div className="text-xl font-bold xl:text-2xl">{p.amount}</div><p className="mt-2 text-xs text-muted-foreground">{p.detail}</p></div>)}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Publicidad aparte. Rango orientativo del piloto, pendiente de validar; no garantiza resultados.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Button asChild className="gap-2"><a href="#estrategia">Ver estrategia <ArrowDown size={16} /></a></Button><Button asChild variant="outline"><a href="#inversion">Ver inversión</a></Button></div>
        </section>
        <nav aria-label="Accesos rápidos" className="flex gap-5 overflow-x-auto border-b border-border px-6 py-4 text-xs font-bold lg:hidden"><a href="#campanas">Campañas</a><a href="#plan">90 días</a><a href="#inversion">Inversión</a><a href="#lanzamiento">Lanzamiento</a></nav>
        {iaSections.map((section, index) => <section key={section.id} id={section.id} className={`ia-section border-b border-border px-6 py-12 sm:px-12 sm:py-16 xl:px-16 ${section.id === 'cierre' ? 'bg-secondary' : ''}`}>
          <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase text-muted-foreground"><span className="flex h-7 w-7 items-center justify-center border border-border">{String(index + 1).padStart(2, '0')}</span>{section.nav}</div>
          <h2 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl">{section.title}</h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">{section.intro}</p>
          {section.id === 'lanzamiento' ? <div className="mt-8 space-y-6">
            {iaQuestions.map((question, i) => <div key={question}><label htmlFor={`ia-answer-${i}`} className="mb-3 block text-sm font-bold leading-relaxed">{i + 1}. {question}</label><Textarea id={`ia-answer-${i}`} value={answers[i]} onChange={e => setAnswers(previous => previous.map((value, j) => j === i ? e.target.value : value))} rows={3} placeholder="Su respuesta" /></div>)}
            <p className="text-xs text-muted-foreground">Las respuestas no se guardan automáticamente. El correo se abrirá en su aplicación de email.</p>
            <div className="flex flex-wrap gap-3"><Button variant="outline" className="gap-2" onClick={() => copy(responses)}><Copy size={16} />Copiar respuestas</Button><Button asChild className="gap-2"><a href={`mailto:info@hipervinculo.net?subject=${encodeURIComponent('Industrial Advisors · Preparar el lanzamiento')}&body=${encodeURIComponent(responses)}`}><Mail size={16} />Enviar por correo</a></Button></div>
          </div> : section.blocks && <div className={`mt-8 grid gap-8 ${section.blocks.length === 2 ? 'sm:grid-cols-2' : ''}`}>
            {section.blocks.map(block => <div key={block.title} className="min-w-0 border-t border-border pt-5">
              <h3 className="mb-3 text-base font-bold leading-relaxed">{block.title}</h3>
              {block.text && <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground">{block.text}</p>}
              {block.bullets && <ul className="space-y-3">{block.bullets.map(item => <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" /><span>{item}</span></li>)}</ul>}
            </div>)}
          </div>}
          {section.table && <>
            <div className="mt-8 hidden overflow-hidden rounded-md border border-border sm:block"><table className="w-full table-fixed text-left text-sm"><thead className="bg-primary text-primary-foreground"><tr>{section.table.headers.map(h => <th key={h} className="p-4 font-bold">{h}</th>)}</tr></thead><tbody>{section.table.rows.map(row => <tr key={row[0]} className="border-b border-border last:border-0">{row.map((cell, i) => <td key={i} className={`whitespace-pre-line break-words p-4 align-top text-sm leading-7 ${i === 0 ? 'font-bold' : 'text-muted-foreground'}`}>{cell}</td>)}</tr>)}</tbody></table></div>
            <div className="mt-8 space-y-5 sm:hidden">{section.table.rows.map(row => <div key={row[0]} className="rounded-md border border-border p-5"><h3 className="mb-3 text-base font-bold">{row[0]}</h3>{row.slice(1).map((cell, i) => <div key={i} className="mb-3 last:mb-0">{section.table && section.table.headers.length > 2 && <p className="mb-1 text-xs font-bold">{section.table.headers[i + 1]}</p>}<p className="whitespace-pre-line text-sm leading-7 text-muted-foreground">{cell}</p></div>)}</div>)}</div>
          </>}
          {section.note && section.id !== 'lanzamiento' && <p className="mt-7 border-l-2 border-accent bg-secondary px-5 py-4 text-xs leading-6 text-muted-foreground">{section.note}</p>}
          {section.id === 'contexto' && <a href="https://iamiami.com/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-bold">Web de Industrial Advisors <ExternalLink size={13} /></a>}
          {section.id === 'cierre' && <div className="mt-8 flex flex-wrap gap-3"><Button asChild className="gap-2"><a href="https://calendly.com/hipervinculo_usa/30-minutes-call" target="_blank" rel="noopener noreferrer">Coordinar el lanzamiento <ArrowUpRight size={16} /></a></Button><Button asChild variant="outline" className="gap-2"><a href="mailto:info@hipervinculo.net"><Mail size={16} />Escribir a Hipervínculo</a></Button></div>}
        </section>)}
        <footer className="flex flex-wrap justify-between gap-3 px-6 py-8 text-xs text-muted-foreground sm:px-12"><span>Hipervínculo · Propuesta para Industrial Advisors</span><span>hipervinculo.net</span></footer>
      </main>
    </div>
  </div>;
}

export default IndustrialAdvisorsProposal;