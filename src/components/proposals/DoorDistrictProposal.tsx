import { useRef, useState, useCallback } from 'react';
import { Download, CheckCircle, FileText, Calendar, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { doorDistrictProposalContent } from './data/doorDistrictProposalContent';
import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { useToast } from '@/hooks/use-toast';
import { pdf } from '@react-pdf/renderer';
import { DoorDistrictPDFDocument } from './pdf/DoorDistrictPDFDocument';

const PAGE_WIDTH = 794;
const PAGE_HEIGHT = 1123;

const iconMap: Record<string, React.ElementType> = {
  files: FileText, calendar: Calendar, dollar: DollarSign, clock: Clock,
};

function Page({ children, bg = '#ffffff' }: { children: React.ReactNode; bg?: string }) {
  return (
    <div className="relative mx-auto mb-8 shadow-xl overflow-visible" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: bg, pageBreakAfter: 'always' }}>
      {children}
    </div>
  );
}

function imageToBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = url;
  });
}

export function DoorDistrictProposal() {
  const documentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const c = doorDistrictProposalContent;
  const u = c.ui;

  const handleDownloadPDF = useCallback(async () => {
    setIsExporting(true);
    toast({ title: 'Generando PDF...', description: 'Por favor espera mientras preparamos el documento.' });
    try {
      const logoBase64 = await imageToBase64(logoHipervinculo);
      const blob = await pdf(<DoorDistrictPDFDocument logoBase64={logoBase64} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Propuesta-The-Door-District-Rediseno-Web.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast({ title: '¡PDF Descargado!', description: 'Tu propuesta ha sido guardada.' });
    } catch (error) {
      console.error('PDF export error:', error);
      toast({ title: 'Error', description: 'Error generando PDF.', variant: 'destructive' });
    } finally {
      setIsExporting(false);
    }
  }, [toast]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-10 gap-3 flex-wrap">
        <h2 className="text-sm sm:text-lg font-bold" style={{ color: '#2d4a2d' }}>{u.proposalTitle}</h2>
        <Button onClick={handleDownloadPDF} size="sm" className="gap-2" style={{ backgroundColor: '#8BC34A' }} disabled={isExporting}>
          <Download className="w-4 h-4" />{u.downloadPdf}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-300 py-8 px-4">
        <div ref={documentRef}>

          {/* PAGE 1: Cover */}
          <Page>
            <div className="flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="px-16 pt-14 pb-8"><img src={logoHipervinculo} alt="Hipervinculo" className="h-10" /></div>
              <div className="flex-1 flex flex-col justify-center px-16" style={{ backgroundColor: '#2d4a2d' }}>
                <p className="text-sm font-bold tracking-[0.2em] uppercase mb-6" style={{ color: '#8BC34A' }}>{c.cover.title}</p>
                <h1 className="text-5xl font-extrabold text-white mb-5 leading-[1.1] whitespace-pre-line">{c.cover.subtitle}</h1>
                <p className="text-xl text-white/60 mb-10">{c.cover.tagline}</p>
                <div className="w-20 h-1 rounded-full" style={{ backgroundColor: '#8BC34A' }} />
              </div>
              <div className="px-16 py-6 flex items-center justify-between bg-white">
                <p className="text-xs text-gray-400 tracking-wider uppercase">{u.confidential}</p>
                <p className="text-xs text-gray-400">hipervinculo.net</p>
              </div>
            </div>
          </Page>

          {/* PAGE 2: About */}
          <Page>
            <div className="px-16 py-14" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>{u.aboutUs}</p>
              <h2 className="text-3xl font-extrabold mb-2" style={{ color: '#2d4a2d' }}>{c.about.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{c.about.headline}</p>
              <p className="text-gray-600 leading-relaxed mb-10 text-[15px]">{c.about.description}</p>
              <div className="grid grid-cols-3 gap-6 mb-10">
                {c.about.stats.map((stat, i) => (
                  <div key={i} className="text-center py-6 rounded-2xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <div className="text-4xl font-extrabold mb-1" style={{ color: '#8BC34A' }}>{stat.value}</div>
                    <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {c.about.credentials.map((cred, i) => (
                  <span key={i} className="text-sm font-medium px-5 py-2.5 rounded-full" style={{ backgroundColor: 'rgba(139,195,74,0.1)', color: '#2d4a2d' }}>{cred}</span>
                ))}
              </div>
            </div>
          </Page>

          {/* PAGE 3: Objective */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>{u.scopeOfWork}</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{c.objective.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{c.objective.headline}</p>
              <p className="text-gray-600 leading-relaxed mb-6 text-[14px]">{c.objective.description}</p>
              <div className="space-y-2 flex-1">
                {c.objective.scope.map((item, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                    <div>
                      <h3 className="font-bold text-[13px]" style={{ color: '#2d4a2d' }}>{item.title}</h3>
                      <p className="text-[12px] text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* PAGE 4: Tech */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>{u.technical}</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{c.techStack.title}</h2>
              <p className="font-medium mb-4" style={{ color: '#8BC34A' }}>{c.techStack.headline}</p>
              <p className="text-gray-600 leading-relaxed mb-5 text-[13px]">{c.techStack.description}</p>
              <div className="space-y-2 flex-1">
                {c.techStack.items.map((item, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                    <div>
                      <h3 className="font-bold text-[13px]" style={{ color: '#2d4a2d' }}>{item.title}</h3>
                      <p className="text-[12px] text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* PAGE 5: Investment */}
          <Page bg="#f8f9f5">
            <div className="px-12 py-10 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#f8f9f5' }}>
              <div className="w-10 h-1 rounded-full mb-5" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>{u.investment}</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{c.investment.title}</h2>
              <p className="font-medium mb-5 text-sm" style={{ color: '#8BC34A' }}>{c.investment.headline}</p>

              <div className="rounded-2xl px-8 py-6 mb-5 flex items-center justify-between" style={{ backgroundColor: '#2d4a2d' }}>
                <div>
                  <div className="text-white/50 text-xs font-bold uppercase tracking-widest">{c.investment.priceLabel}</div>
                  <div className="text-white/40 text-xs mt-1">Pago al finalizar · Square</div>
                </div>
                <span className="text-5xl font-extrabold text-white">{c.investment.price}</span>
              </div>

              <p className="text-gray-600 leading-relaxed mb-5 text-[13px]">{c.investment.description}</p>

              <div className="bg-white rounded-2xl p-6 mb-4" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h3 className="font-bold text-[14px] mb-4" style={{ color: '#2d4a2d' }}>{u.totalInvestment} — Desglose</h3>
                <div className="space-y-2">
                  {c.investment.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-start gap-3 pb-2 border-b border-gray-100">
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] text-gray-700 font-medium">{item.name}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{item.detail}</div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <CheckCircle className="w-4 h-4" style={{ color: '#8BC34A' }} />
                        <span className="text-[11px] font-bold" style={{ color: '#8BC34A' }}>Incluido</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 mb-4" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 pr-6">
                    <h3 className="font-bold text-[14px]" style={{ color: '#2d4a2d' }}>{c.investment.timeline.title}</h3>
                    <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{c.investment.timeline.description}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className="text-4xl font-extrabold leading-none" style={{ color: '#8BC34A' }}>{c.investment.timeline.duration}</span>
                    <span className="block text-sm font-bold" style={{ color: '#8BC34A' }}>{c.investment.timeline.durationUnit}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h3 className="font-bold text-[13px] mb-3" style={{ color: '#2d4a2d' }}>{u.outOfScope}</h3>
                <ul className="space-y-1.5">
                  {c.exclusions.items.map((it, i) => (
                    <li key={i} className="text-[11px] text-gray-500 leading-relaxed flex gap-2">
                      <span className="text-gray-400">•</span><span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Page>

          {/* PAGE 6: Terms */}
          <Page>
            <div className="px-16 py-14" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-6" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>{u.terms}</p>
              <h2 className="text-3xl font-extrabold mb-2" style={{ color: '#2d4a2d' }}>{c.terms.title}</h2>
              <p className="font-medium mb-6" style={{ color: '#8BC34A' }}>{c.terms.headline}</p>
              <div className="space-y-2.5">
                {c.terms.sections.map((section, i) => {
                  const Icon = iconMap[section.icon] || FileText;
                  return (
                    <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(139,195,74,0.15)' }}>
                        <Icon className="w-4 h-4" style={{ color: '#8BC34A' }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-[13px]" style={{ color: '#2d4a2d' }}>{section.title}</h3>
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{section.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Page>

          {/* PAGE 7: Signature */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>{u.signatures}</p>
              <h2 className="text-3xl font-extrabold mb-2" style={{ color: '#2d4a2d' }}>{c.signature.title}</h2>
              <p className="font-medium mb-8" style={{ color: '#8BC34A' }}>{c.signature.headline}</p>
              <p className="text-gray-600 leading-relaxed mb-12 text-[14px]">{c.signature.intro}</p>
              <div className="grid grid-cols-2 gap-10 mt-8">
                {[c.signature.client, c.signature.agency].map((sig, i) => (
                  <div key={i}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#8BC34A' }}>{sig.role}</p>
                    <div className="border-b-2 border-gray-300 pb-1 mb-2" style={{ height: '60px' }} />
                    <p className="font-bold text-[14px]" style={{ color: '#2d4a2d' }}>{sig.name}</p>
                    <p className="text-[12px] text-gray-500">{sig.company}</p>
                    <div className="mt-6">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">{u.date}</p>
                      <div className="border-b border-gray-300" style={{ height: '24px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* PAGE 8: Contact */}
          <Page>
            <div className="flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="px-16 py-14 flex-1" style={{ backgroundColor: '#2d4a2d' }}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: '#8BC34A' }}>{u.contactUs}</p>
                <h2 className="text-3xl font-extrabold text-white mb-3">{c.contact.title}</h2>
                <p className="text-white/60 mb-10 text-[15px]">{c.contact.description}</p>
                <div className="grid grid-cols-2 gap-8 text-white/80">
                  <div className="space-y-6">
                    <div><p className="text-xs uppercase tracking-[0.15em] mb-1.5" style={{ color: 'rgba(139,195,74,0.5)' }}>{u.email}</p><p className="text-lg font-medium">{c.contact.email}</p></div>
                    <div><p className="text-xs uppercase tracking-[0.15em] mb-1.5" style={{ color: 'rgba(139,195,74,0.5)' }}>{u.phone}</p><p className="text-lg font-medium">{c.contact.phone}</p></div>
                  </div>
                  <div className="space-y-6">
                    <div><p className="text-xs uppercase tracking-[0.15em] mb-1.5" style={{ color: 'rgba(139,195,74,0.5)' }}>{u.location}</p><p className="text-lg font-medium whitespace-pre-line">{c.contact.address}</p></div>
                    <div><p className="text-xs uppercase tracking-[0.15em] mb-1.5" style={{ color: 'rgba(139,195,74,0.5)' }}>{u.web}</p><p className="text-lg font-medium">{c.contact.website}</p></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center py-16 bg-white">
                <img src={logoHipervinculo} alt="Hipervinculo" className="h-12 mb-5" />
                <div className="w-12 h-1 rounded-full mb-5" style={{ backgroundColor: '#8BC34A' }} />
                <p className="text-center text-gray-400 text-sm max-w-sm">{u.tagline}</p>
              </div>
            </div>
          </Page>

        </div>
      </div>
    </div>
  );
}
