import { useRef, useState, useCallback } from 'react';
import { Download, CheckCircle, FileText, RefreshCw, Server, Calendar, DollarSign, Clock, BarChart3, Lock, Monitor, ShieldCheck, Stethoscope, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scottsdaleInstituteContent } from './data/scottsdaleInstituteContent';
import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { useToast } from '@/hooks/use-toast';
import { pdf } from '@react-pdf/renderer';
import { ScottsdaleInstitutePDFDocument } from './pdf/ScottsdaleInstitutePDFDocument';

const PAGE_WIDTH = 794;
const PAGE_HEIGHT = 1123;

const iconMap: Record<string, React.ElementType> = {
  files: FileText,
  refresh: RefreshCw,
  server: Server,
  calendar: Calendar,
  dollar: DollarSign,
  clock: Clock,
  shield: ShieldCheck,
};

function Page({ children, bg = '#ffffff' }: { children: React.ReactNode; bg?: string }) {
  return (
    <div
      className="relative mx-auto mb-8 shadow-xl overflow-visible"
      style={{
        width: `${PAGE_WIDTH}px`,
        minHeight: `${PAGE_HEIGHT}px`,
        backgroundColor: bg,
        pageBreakAfter: 'always',
      }}
    >
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

export function ScottsdaleInstituteProposal() {
  const documentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const content = scottsdaleInstituteContent;

  const handleDownloadPDF = useCallback(async () => {
    setIsExporting(true);
    toast({ title: 'Generating PDF...', description: 'Please wait while we prepare your document.' });

    try {
      const logoBase64 = await imageToBase64(logoHipervinculo);
      const blob = await pdf(
        <ScottsdaleInstitutePDFDocument logoBase64={logoBase64} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Proposal-Scottsdale-Institute.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast({ title: 'PDF Downloaded!', description: 'Your proposal has been saved.' });
    } catch (error) {
      console.error('PDF export error:', error);
      toast({ title: 'Error', description: 'Error generating PDF.', variant: 'destructive' });
    } finally {
      setIsExporting(false);
    }
  }, [toast]);

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-10">
        <h2 className="text-sm sm:text-lg font-bold" style={{ color: '#2d4a2d' }}>
          Proposal — Scottsdale Institute (Growth Partnership)
        </h2>
        <Button onClick={handleDownloadPDF} size="sm" className="gap-2" style={{ backgroundColor: '#8BC34A' }} disabled={isExporting}>
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </div>

      {/* Scrollable Pages */}
      <div className="flex-1 overflow-y-auto bg-gray-300 py-8 px-4">
        <div ref={documentRef}>

          {/* PAGE 1: Cover */}
          <Page>
            <div className="flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="px-16 pt-14 pb-8">
                <img src={logoHipervinculo} alt="Hipervinculo" className="h-10" />
              </div>
              <div className="flex-1 flex flex-col justify-center px-16" style={{ backgroundColor: '#2d4a2d' }}>
                <p className="text-sm font-bold tracking-[0.2em] uppercase mb-6" style={{ color: '#8BC34A' }}>
                  {content.cover.title}
                </p>
                <h1 className="text-5xl font-extrabold text-white mb-5 leading-[1.1] whitespace-pre-line">
                  {content.cover.subtitle}
                </h1>
                <p className="text-xl text-white/60 mb-10">{content.cover.tagline}</p>
                <div className="w-20 h-1 rounded-full" style={{ backgroundColor: '#8BC34A' }} />
              </div>
              <div className="px-16 py-6 flex items-center justify-between bg-white">
                <p className="text-xs text-gray-400 tracking-wider uppercase">Confidential</p>
                <p className="text-xs text-gray-400">hipervinculo.net</p>
              </div>
            </div>
          </Page>

          {/* PAGE 2: About */}
          <Page>
            <div className="px-16 py-14" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>About Us</p>
              <h2 className="text-3xl font-extrabold mb-2" style={{ color: '#2d4a2d' }}>{content.about.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{content.about.headline}</p>
              <p className="text-gray-600 leading-relaxed mb-10 text-[15px]">{content.about.description}</p>
              <div className="grid grid-cols-3 gap-6 mb-10">
                {content.about.stats.map((stat, i) => (
                  <div key={i} className="text-center py-6 rounded-2xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <div className="text-4xl font-extrabold mb-1" style={{ color: '#8BC34A' }}>{stat.value}</div>
                    <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {content.about.credentials.map((cred, i) => (
                  <span key={i} className="text-sm font-medium px-5 py-2.5 rounded-full" style={{ backgroundColor: 'rgba(139,195,74,0.1)', color: '#2d4a2d' }}>
                    {cred}
                  </span>
                ))}
              </div>
            </div>
          </Page>

          {/* PAGE 3: Client Overview */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>The Client</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.clientOverview.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{content.clientOverview.headline}</p>
              <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">{content.clientOverview.description}</p>
              <div className="space-y-2.5 flex-1">
                {content.clientOverview.services.map((item, i) => (
                  <div key={i} className="flex gap-3 p-4 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <Stethoscope className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                    <div>
                      <h3 className="font-bold text-[14px]" style={{ color: '#2d4a2d' }}>{item.title}</h3>
                      <p className="text-[13px] text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: 'rgba(139,195,74,0.08)' }}>
                <p className="text-[12px] text-gray-600 leading-relaxed">{content.clientOverview.marketNote}</p>
              </div>
            </div>
          </Page>

          {/* PAGE 4: Objective & Scope */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Scope of Work</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.objective.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{content.objective.headline}</p>
              <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">{content.objective.description}</p>
              <div className="space-y-2.5 flex-1">
                {content.objective.scope.map((item, i) => (
                  <div key={i} className="flex gap-3 p-4 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                    <div>
                      <h3 className="font-bold text-[14px]" style={{ color: '#2d4a2d' }}>{item.title}</h3>
                      <p className="text-[13px] text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl border border-amber-200" style={{ backgroundColor: 'rgba(255,193,7,0.06)' }}>
                <h3 className="font-bold text-[14px] mb-1" style={{ color: '#2d4a2d' }}>{content.objective.exclusions.title}</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed">{content.objective.exclusions.description}</p>
              </div>
            </div>
          </Page>

          {/* PAGE 5: Platform Access */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Requirements</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.platformAccess.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{content.platformAccess.headline}</p>
              <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">{content.platformAccess.description}</p>
              <div className="space-y-3 flex-1">
                {content.platformAccess.platforms.map((platform, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(139,195,74,0.15)' }}>
                      <Lock className="w-5 h-5" style={{ color: '#8BC34A' }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-[14px]" style={{ color: '#2d4a2d' }}>{platform.title}</h3>
                        <span className="text-[10px] font-bold px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(139,195,74,0.15)', color: '#2d4a2d' }}>
                          {platform.role}
                        </span>
                      </div>
                      <p className="text-[13px] text-gray-500 leading-relaxed">{platform.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* PAGE 6: New Website */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Service 1</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.websiteService.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{content.websiteService.headline}</p>
              <div className="rounded-2xl px-8 py-5 mb-6 flex items-center justify-between" style={{ backgroundColor: '#2d4a2d' }}>
                <div>
                  <div className="text-white/50 text-xs font-bold uppercase tracking-widest">One-Time Build Fee</div>
                  <div className="text-white/40 text-xs mt-1">$10,000 — invoiced 50% at kickoff, 50% at launch</div>
                </div>
                <Monitor className="w-8 h-8 text-white/70" />
              </div>
              <p className="text-gray-600 leading-relaxed mb-5 text-[15px]">{content.websiteService.description}</p>
              <div className="space-y-2.5 flex-1">
                {content.websiteService.includes.map((item, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                    <div>
                      <h3 className="font-bold text-[14px]" style={{ color: '#2d4a2d' }}>{item.title}</h3>
                      <p className="text-[13px] text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* PAGE 7: Google Ads */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Service 2</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.googleAdsService.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{content.googleAdsService.headline}</p>
              <div className="rounded-2xl px-8 py-5 mb-6 flex items-center justify-between" style={{ backgroundColor: '#2d4a2d' }}>
                <div>
                  <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Managed at No Fixed Fee</div>
                  <div className="text-white/40 text-xs mt-1">Google Ads budget paid directly by clinic</div>
                </div>
                <Search className="w-8 h-8 text-white/70" />
              </div>
              <p className="text-gray-600 leading-relaxed mb-5 text-[15px]">{content.googleAdsService.description}</p>
              <div className="space-y-2.5 flex-1">
                {content.googleAdsService.includes.map((item, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                    <div>
                      <h3 className="font-bold text-[14px]" style={{ color: '#2d4a2d' }}>{item.title}</h3>
                      <p className="text-[13px] text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* PAGE 8: Meta Ads */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Service 3</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.metaAdsService.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{content.metaAdsService.headline}</p>
              <div className="rounded-2xl px-8 py-5 mb-6 flex items-center justify-between" style={{ backgroundColor: '#2d4a2d' }}>
                <div>
                  <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Managed at No Fixed Fee</div>
                  <div className="text-white/40 text-xs mt-1">Meta Ads budget paid directly by clinic</div>
                </div>
                <BarChart3 className="w-8 h-8 text-white/70" />
              </div>
              <p className="text-gray-600 leading-relaxed mb-5 text-[15px]">{content.metaAdsService.description}</p>
              <div className="space-y-2.5 flex-1">
                {content.metaAdsService.includes.map((item, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                    <div>
                      <h3 className="font-bold text-[14px]" style={{ color: '#2d4a2d' }}>{item.title}</h3>
                      <p className="text-[13px] text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* PAGE 9: Investment Summary */}
          <Page bg="#f8f9f5">
            <div className="px-16 py-12 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#f8f9f5' }}>
              <div className="w-10 h-1 rounded-full mb-6" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Investment</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.investment.title}</h2>
              <p className="font-medium mb-3" style={{ color: '#8BC34A' }}>{content.investment.headline}</p>
              <p className="text-[13px] text-gray-600 mb-6 leading-relaxed max-w-2xl">{content.investment.ongoing.subtitle}</p>

              {/* Three fee cards — editorial */}
              <div className="grid grid-cols-2 gap-5 mb-6">
                {[
                  { ...content.investment.ongoing.websiteBuild, cadence: 'One-time', featured: false },
                  { ...content.investment.ongoing.performance, cadence: 'Success-based', featured: true },
                ].map((card, idx) => {
                  const dark = card.featured;
                  const bg = dark ? '#2d4a2d' : '#ffffff';
                  const border = dark ? '#2d4a2d' : '#e6e8df';
                  const eyebrow = dark ? 'rgba(255,255,255,0.55)' : '#9aa39a';
                  const label = dark ? '#ffffff' : '#2d4a2d';
                  const price = dark ? '#c5e86a' : '#2d4a2d';
                  const basis = dark ? 'rgba(255,255,255,0.75)' : '#6b7268';
                  const rule = dark ? 'rgba(255,255,255,0.18)' : '#eceee6';
                  const body = dark ? 'rgba(255,255,255,0.82)' : '#5a635a';
                  const chipBg = dark ? 'rgba(197,232,106,0.14)' : '#f4f6ef';
                  const chipTx = dark ? '#c5e86a' : '#2d4a2d';
                  const num = dark ? 'rgba(255,255,255,0.10)' : 'rgba(45,74,45,0.06)';
                  return (
                    <div
                      key={idx}
                      className="relative rounded-[20px] p-7 flex flex-col overflow-hidden"
                      style={{
                        backgroundColor: bg,
                        border: `1px solid ${border}`,
                        boxShadow: dark ? '0 12px 32px -12px rgba(45,74,45,0.45)' : '0 1px 2px rgba(0,0,0,0.03)',
                        minHeight: '340px',
                      }}
                    >
                      {/* Index watermark */}
                      <span
                        className="absolute font-extrabold leading-none select-none pointer-events-none"
                        style={{ top: '14px', right: '18px', fontSize: '48px', color: num, letterSpacing: '-0.04em' }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>

                      {/* Eyebrow */}
                      <div className="flex items-center gap-2 mb-5">
                        <span className="w-6 h-px" style={{ backgroundColor: dark ? '#c5e86a' : '#8BC34A' }} />
                        <p className="text-[9.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: eyebrow }}>
                          {card.cadence}
                        </p>
                      </div>

                      {/* Label */}
                      <h3
                        className="text-[13px] font-bold uppercase tracking-[0.14em] mb-6 leading-snug"
                        style={{ color: label, minHeight: '2.6em' }}
                      >
                        {card.label}
                      </h3>

                      {/* Price */}
                      <div className="mb-5">
                        <div
                          className="font-extrabold leading-[0.9]"
                          style={{ color: price, fontSize: '40px', letterSpacing: '-0.02em' }}
                        >
                          {card.rate}
                        </div>
                        <p className="text-[10.5px] mt-3 leading-snug" style={{ color: basis }}>
                          {card.basis}
                        </p>
                      </div>

                      {/* Rule */}
                      <div className="w-full h-px mb-4" style={{ backgroundColor: rule }} />

                      {/* Description */}
                      <p className="text-[10.5px] leading-relaxed flex-1" style={{ color: body }}>
                        {card.description}
                      </p>

                      {/* Cadence chip */}
                      <div className="mt-5 inline-flex self-start items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ backgroundColor: chipBg }}>
                        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: chipTx }} />
                        <span className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: chipTx }}>
                          {card.cadence}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>




              {/* Client pays */}
              <div className="bg-white rounded-2xl p-6 mb-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h3 className="font-bold text-[15px] mb-4" style={{ color: '#2d4a2d' }}>{content.investment.ongoing.clientPays.title}</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {content.investment.ongoing.clientPays.items.map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <Monitor className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                      <div>
                        <p className="text-[13px] font-medium text-gray-700">{item.name}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Share Example */}
              <div className="bg-white rounded-2xl p-6 mb-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3 className="w-4 h-4" style={{ color: '#8BC34A' }} />
                  <h3 className="font-bold text-[15px]" style={{ color: '#2d4a2d' }}>{content.investment.example.title}</h3>
                </div>
                <p className="text-xs text-gray-400 mb-4">{content.investment.example.subtitle}</p>
                <div className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1.5">
                  {content.investment.example.rows.map((row, i) => (
                    <div key={i} className="contents">
                      <span className="text-[13px] text-gray-600">{row.label}</span>
                      <span className="text-[13px] font-semibold text-right" style={{ color: '#2d4a2d' }}>{row.value}</span>
                    </div>
                  ))}
                  <div className="col-span-2 border-t border-gray-200 my-1" />
                  <span className="text-[14px] font-bold" style={{ color: '#2d4a2d' }}>{content.investment.example.netSales.label}</span>
                  <span className="text-xl font-extrabold text-right" style={{ color: '#8BC34A' }}>{content.investment.example.netSales.value}</span>
                  <span className="text-[14px] font-bold" style={{ color: '#2d4a2d' }}>{content.investment.example.commission.label}</span>
                  <span className="text-xl font-extrabold text-right" style={{ color: '#2d4a2d' }}>{content.investment.example.commission.value}</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-3 leading-relaxed">{content.investment.example.note}</p>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-2xl p-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 pr-6">
                    <h3 className="font-bold text-[15px]" style={{ color: '#2d4a2d' }}>{content.investment.timeline.title}</h3>
                    <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">{content.investment.timeline.description}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className="text-4xl font-extrabold leading-none" style={{ color: '#8BC34A' }}>{content.investment.timeline.duration}</span>
                    <span className="block text-lg font-bold" style={{ color: '#8BC34A' }}>{content.investment.timeline.durationUnit}</span>
                  </div>
                </div>
              </div>
            </div>
          </Page>

          {/* PAGE 10: Terms */}
          <Page>
            <div className="px-16 py-14" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Terms</p>
              <h2 className="text-3xl font-extrabold mb-2" style={{ color: '#2d4a2d' }}>{content.terms.title}</h2>
              <p className="font-medium mb-8" style={{ color: '#8BC34A' }}>{content.terms.headline}</p>
              <div className="space-y-3">
                {content.terms.sections.map((section, i) => {
                  const Icon = iconMap[section.icon] || FileText;
                  return (
                    <div key={i} className="flex gap-4 p-4 rounded-2xl" style={{ backgroundColor: '#f8f9f5' }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(139,195,74,0.15)' }}>
                        <Icon className="w-5 h-5" style={{ color: '#8BC34A' }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-[14px]" style={{ color: '#2d4a2d' }}>{section.title}</h3>
                        <p className="text-[12px] text-gray-500 mt-0.5 leading-relaxed">{section.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Page>

          {/* PAGE 11: Agreement Details */}
          <Page bg="#f8f9f5">
            <div className="px-16 py-14" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#f8f9f5' }}>
              <div className="w-10 h-1 rounded-full mb-6" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Agreement</p>
              <h2 className="text-3xl font-extrabold mb-8" style={{ color: '#2d4a2d' }}>{content.legalTerms.title}</h2>
              <div className="space-y-5">
                {content.legalTerms.sections.map((section, i) => (
                  <div key={i}>
                    <h3 className="font-extrabold text-[15px] mb-2.5" style={{ color: '#2d4a2d' }}>{section.heading}</h3>
                    <ol className="space-y-2 pl-6 list-decimal">
                      {section.items.map((item, j) => (
                        <li key={j} className="text-[12px] text-gray-600 leading-relaxed pl-1">{item}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* PAGE 12: Contact */}
          <Page>
            <div className="flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="px-16 py-14 flex-1" style={{ backgroundColor: '#2d4a2d' }}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: '#8BC34A' }}>Contact Us</p>
                <h2 className="text-3xl font-extrabold text-white mb-3">{content.contact.title}</h2>
                <p className="text-white/60 mb-10 text-[15px]">{content.contact.description}</p>
                <div className="grid grid-cols-2 gap-8 text-white/80">
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] mb-1.5" style={{ color: 'rgba(139,195,74,0.5)' }}>Email</p>
                      <p className="text-lg font-medium">{content.contact.email}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] mb-1.5" style={{ color: 'rgba(139,195,74,0.5)' }}>Phone</p>
                      <p className="text-lg font-medium">{content.contact.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] mb-1.5" style={{ color: 'rgba(139,195,74,0.5)' }}>Location</p>
                      <p className="text-lg font-medium whitespace-pre-line">{content.contact.address}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] mb-1.5" style={{ color: 'rgba(139,195,74,0.5)' }}>Web</p>
                      <p className="text-lg font-medium">{content.contact.website}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center py-16 bg-white">
                <img src={logoHipervinculo} alt="Hipervinculo" className="h-12 mb-5" />
                <div className="w-12 h-1 rounded-full mb-5" style={{ backgroundColor: '#8BC34A' }} />
                <p className="text-center text-gray-400 text-sm whitespace-nowrap">
                  Results-driven growth systems for businesses ready to scale.
                </p>
              </div>
            </div>
          </Page>

        </div>
      </div>
    </div>
  );
}
