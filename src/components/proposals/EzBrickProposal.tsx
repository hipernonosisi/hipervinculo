import { useRef, useState, useCallback } from 'react';
import { Download, CheckCircle, FileText, RefreshCw, Server, Calendar, DollarSign, Clock, ShieldCheck, Lock, Globe, Mail, Phone, MapPin, TrendingUp, Target, Search, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ezBrickProposalContent } from './data/ezBrickProposalContent';
import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { useToast } from '@/hooks/use-toast';
import { pdf } from '@react-pdf/renderer';
import { EzBrickPDFDocument } from './pdf/EzBrickPDFDocument';

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

export function EzBrickProposal() {
  const documentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const content = ezBrickProposalContent;

  const handleDownloadPDF = useCallback(async () => {
    setIsExporting(true);
    toast({ title: 'Generating PDF...', description: 'Please wait while we prepare your document.' });

    try {
      const logoBase64 = await imageToBase64(logoHipervinculo);
      const blob = await pdf(<EzBrickPDFDocument logoBase64={logoBase64} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Proposal-EZ-Brick-Hipervinculo.pdf';
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
          Proposal — EZ Brick (Google Search + Retargeting)
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
                    <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
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

          {/* PAGE 4: Objective & Strategy */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Strategy</p>
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

          {/* PAGE 6: Media Plan */}
          <Page bg="#f8f9f5">
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#f8f9f5' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Budget</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.mediaPlan.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{content.mediaPlan.headline}</p>
              <div className="rounded-2xl px-8 py-6 mb-6 flex items-center justify-between" style={{ backgroundColor: '#2d4a2d' }}>
                <div>
                  <div className="text-white/50 text-[10px] font-bold uppercase tracking-widest">{content.mediaPlan.totalLabel}</div>
                  <div className="text-5xl font-extrabold mt-1" style={{ color: '#c5e86a' }}>{content.mediaPlan.total}</div>
                </div>
                <DollarSign className="w-10 h-10 text-white/40" />
              </div>
              <p className="text-gray-600 leading-relaxed mb-5 text-[14px]">{content.mediaPlan.description}</p>
              <div className="space-y-2.5 mb-6">
                {content.mediaPlan.allocation.map((row, i) => (
                  <div key={i} className="bg-white rounded-xl p-4" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-[14px]" style={{ color: '#2d4a2d' }}>{row.channel}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(139,195,74,0.15)', color: '#2d4a2d' }}>{row.share}</span>
                        <span className="text-[15px] font-extrabold" style={{ color: '#8BC34A' }}>{row.amount}</span>
                      </div>
                    </div>
                    <p className="text-[12px] text-gray-500 leading-relaxed">{row.note}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 flex-1">
                {content.mediaPlan.phases.map((p, i) => (
                  <div key={i} className="bg-white rounded-xl p-4" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#8BC34A' }}>{p.phase}</p>
                    <h3 className="font-bold text-[13px] mb-1.5" style={{ color: '#2d4a2d' }}>{p.focus}</h3>
                    <p className="text-[11px] text-gray-500 leading-relaxed">{p.detail}</p>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-5 leading-relaxed">{content.mediaPlan.note}</p>
            </div>
          </Page>

          {/* PAGE 7: Performance Targets */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Projections</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.projections.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{content.projections.headline}</p>
              <p className="text-gray-600 leading-relaxed mb-3 text-[14px]">{content.projections.description}</p>
              <p className="text-[12px] font-medium mb-6" style={{ color: '#2d4a2d' }}>{content.projections.spendBasis}</p>
              <div className="grid grid-cols-3 gap-4 flex-1">
                {content.projections.scenarios.map((sc, i) => (
                  <div key={i} className="rounded-2xl p-5 flex flex-col" style={{ backgroundColor: i === 1 ? '#2d4a2d' : '#f8f9f5', border: i === 1 ? 'none' : '1px solid rgba(139,195,74,0.3)' }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: i === 1 ? 'rgba(255,255,255,0.55)' : '#8BC34A' }}>{sc.label}</p>
                    <div className="text-4xl font-extrabold mb-4" style={{ color: i === 1 ? '#c5e86a' : '#2d4a2d' }}>{sc.roas}</div>
                    <div className="space-y-1.5 text-[11px]">
                      {[
                        ['Gross sales', sc.revenue],
                        ['Refunds & returns', sc.returns],
                        ['Ad spend', sc.adSpend],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between">
                          <span style={{ color: i === 1 ? 'rgba(255,255,255,0.65)' : '#6b7280' }}>{label}</span>
                          <span className="font-semibold" style={{ color: i === 1 ? '#ffffff' : '#2d4a2d' }}>{value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="my-3 h-px" style={{ backgroundColor: i === 1 ? 'rgba(255,255,255,0.2)' : 'rgba(45,74,45,0.12)' }} />
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-[11px]" style={{ color: i === 1 ? 'rgba(255,255,255,0.65)' : '#6b7280' }}>Net sales</span>
                      <span className="text-[16px] font-extrabold" style={{ color: i === 1 ? '#c5e86a' : '#8BC34A' }}>{sc.netSales}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span style={{ color: i === 1 ? 'rgba(255,255,255,0.65)' : '#6b7280' }}>Commission</span>
                      <span className="font-semibold" style={{ color: i === 1 ? '#ffffff' : '#2d4a2d' }}>{sc.commission}</span>
                    </div>
                    <div className="mt-auto pt-3">
                      <div className="rounded-xl px-3 py-2" style={{ backgroundColor: i === 1 ? 'rgba(197,232,106,0.15)' : 'rgba(139,195,74,0.12)' }}>
                        <p className="text-[9px] uppercase tracking-widest font-bold" style={{ color: i === 1 ? 'rgba(255,255,255,0.6)' : '#6b7280' }}>Total Hipervínculo fee</p>
                        <p className="text-[15px] font-extrabold" style={{ color: i === 1 ? '#c5e86a' : '#2d4a2d' }}>{sc.totalFee}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: 'rgba(139,195,74,0.08)' }}>
                <ul className="space-y-1">
                  {content.projections.assumptions.map((a, i) => (
                    <li key={i} className="flex gap-2 text-[11px] text-gray-500 leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#8BC34A' }} />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Page>

          {/* PAGE 8: Google Search */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Service</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.searchService.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{content.searchService.headline}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-2xl px-6 py-5" style={{ backgroundColor: '#2d4a2d' }}>
                  <div className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">{content.searchService.mediaSpendLabel}</div>
                  <div className="text-3xl font-extrabold" style={{ color: '#c5e86a' }}>{content.searchService.mediaSpend}</div>
                </div>
                <div className="rounded-2xl px-6 py-5" style={{ backgroundColor: '#f8f9f5', border: '1px solid rgba(139,195,74,0.35)' }}>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1 text-gray-400">{content.searchService.targetLabel}</div>
                  <div className="text-3xl font-extrabold" style={{ color: '#2d4a2d' }}>{content.searchService.target}</div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-5 text-[15px]">{content.searchService.description}</p>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {content.searchService.includes.map((item, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <Search className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                    <div>
                      <h3 className="font-bold text-[14px]" style={{ color: '#2d4a2d' }}>{item.title}</h3>
                      <p className="text-[13px] text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* PAGE 9: Retargeting */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Service</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.retargetingService.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{content.retargetingService.headline}</p>
              <div className="rounded-2xl px-8 py-5 mb-6 flex items-center justify-between" style={{ backgroundColor: '#2d4a2d' }}>
                <div>
                  <div className="text-white/50 text-[10px] font-bold uppercase tracking-widest">{content.retargetingService.mediaSpendLabel}</div>
                  <div className="text-4xl font-extrabold mt-1" style={{ color: '#c5e86a' }}>{content.retargetingService.mediaSpend}</div>
                </div>
                <Repeat className="w-9 h-9 text-white/40" />
              </div>
              <p className="text-gray-600 leading-relaxed mb-5 text-[15px]">{content.retargetingService.description}</p>
              <div className="space-y-3 flex-1">
                {content.retargetingService.includes.map((item, i) => (
                  <div key={i} className="flex gap-3 p-4 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <TrendingUp className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                    <div>
                      <h3 className="font-bold text-[14px]" style={{ color: '#2d4a2d' }}>{item.title}</h3>
                      <p className="text-[13px] text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* PAGE 10: Investment */}
          <Page bg="#f8f9f5">
            <div className="px-16 py-12 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#f8f9f5' }}>
              <div className="w-10 h-1 rounded-full mb-6" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Investment</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.investment.title}</h2>
              <p className="font-medium mb-4" style={{ color: '#8BC34A' }}>{content.investment.headline}</p>

              {/* Fee cards */}
              <div className="grid grid-cols-2 gap-4 mb-5">
                {[
                  { num: '01', tag: 'Fixed Monthly', data: content.investment.retainer },
                  { num: '02', tag: 'Performance', data: content.investment.commission },
                ].map((card) => (
                  <div key={card.num} className="rounded-[20px] p-6 flex flex-col overflow-hidden relative" style={{ backgroundColor: '#2d4a2d' }}>
                    <span className="absolute font-extrabold leading-none select-none pointer-events-none" style={{ top: '14px', right: '18px', fontSize: '40px', color: 'rgba(255,255,255,0.10)', letterSpacing: '-0.04em' }}>
                      {card.num}
                    </span>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-6 h-px" style={{ backgroundColor: '#c5e86a' }} />
                      <p className="text-[9.5px] font-semibold uppercase tracking-[0.22em]" style={{ color: 'rgba(255,255,255,0.55)' }}>{card.tag}</p>
                    </div>
                    <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] mb-4 leading-snug text-white min-h-[30px]">{card.data.label}</h3>
                    <div className="font-extrabold leading-[0.9] mb-2" style={{ color: '#c5e86a', fontSize: '38px', letterSpacing: '-0.02em' }}>{card.data.rate}</div>
                    <p className="text-[10px] mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>{card.data.basis}</p>
                    <p className="text-[10.5px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}>{card.data.description}</p>
                  </div>
                ))}
              </div>

              {/* Profit formula */}
              <div className="bg-white rounded-2xl p-6 mb-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-4 h-4" style={{ color: '#8BC34A' }} />
                  <h3 className="font-bold text-[15px]" style={{ color: '#2d4a2d' }}>{content.investment.profitFormula.title}</h3>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1.5">
                  {content.investment.profitFormula.rows.map((row, i) => (
                    <div key={i} className="contents">
                      <span className="text-[13px] text-gray-600">{row.label}</span>
                      <span className="text-[13px] font-semibold text-right" style={{ color: '#2d4a2d' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-gray-500 mt-3 leading-relaxed">{content.investment.profitFormula.note}</p>
              </div>

              {/* Payment terms */}
              <div className="bg-white rounded-2xl p-6 mb-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4" style={{ color: '#8BC34A' }} />
                  <h3 className="font-bold text-[15px]" style={{ color: '#2d4a2d' }}>{content.investment.paymentTerms.title}</h3>
                </div>
                <p className="text-xs text-gray-400 mb-4">{content.investment.paymentTerms.subtitle}</p>
                <div className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1.5">
                  {content.investment.paymentTerms.rows.map((row, i) => (
                    <div key={i} className="contents">
                      <span className="text-[13px] text-gray-600">{row.label}</span>
                      <span className="text-[13px] font-semibold text-right" style={{ color: '#2d4a2d' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-3 leading-relaxed">{content.investment.paymentTerms.note}</p>
              </div>

              {/* Client pays + timeline */}
              <div className="bg-white rounded-2xl p-6 mb-5" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h3 className="font-bold text-[15px] mb-4" style={{ color: '#2d4a2d' }}>{content.investment.clientPays.title}</h3>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {content.investment.clientPays.items.map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                      <div>
                        <p className="text-[13px] font-medium text-gray-700">{item.name}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

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

          {/* PAGE 11: Terms */}
          <Page>
            <div className="px-16 py-12 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-6" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Legal</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.terms.title}</h2>
              <p className="font-medium mb-6" style={{ color: '#8BC34A' }}>{content.terms.headline}</p>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {content.terms.sections.map((section, i) => {
                  const Icon = iconMap[section.icon] || CheckCircle;
                  return (
                    <div key={i} className="p-4 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(139,195,74,0.15)' }}>
                          <Icon className="w-4 h-4" style={{ color: '#8BC34A' }} />
                        </div>
                        <h3 className="font-bold text-[14px]" style={{ color: '#2d4a2d' }}>{section.title}</h3>
                      </div>
                      <p className="text-[12px] text-gray-500 leading-relaxed">{section.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Page>

          {/* PAGE 12: Legal Details */}
          <Page>
            <div className="px-16 py-12 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-6" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Agreement</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.legalTerms.title}</h2>
              <div className="space-y-3 flex-1 mt-5">
                {content.legalTerms.sections.map((section, i) => (
                  <div key={i} className="p-3.5 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <h3 className="font-bold text-[13px] mb-1.5" style={{ color: '#2d4a2d' }}>{section.heading}</h3>
                    <ul className="space-y-1">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex gap-2 text-[10.5px] text-gray-500 leading-relaxed">
                          <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: '#8BC34A' }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* PAGE 13: Contact */}
          <Page>
            <div className="flex w-full h-full" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="flex-1 flex flex-col justify-center p-16" style={{ backgroundColor: '#2d4a2d' }}>
                <h2 className="text-4xl font-extrabold mb-1 text-white">{content.contact.title}</h2>
                <p className="text-lg font-bold mb-4" style={{ color: '#8BC34A' }}>{content.contact.headline}</p>
                <p className="text-white/80 text-[15px] leading-relaxed mb-8 max-w-md">{content.contact.description}</p>
                <div className="space-y-3 mb-8">
                  {[
                    { Icon: Mail, label: 'Email', value: content.contact.email },
                    { Icon: Phone, label: 'Phone', value: content.contact.phone },
                    { Icon: MapPin, label: 'Address', value: content.contact.address },
                    { Icon: Globe, label: 'Website', value: content.contact.website },
                  ].map(({ Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(139,195,74,0.2)' }}>
                        <Icon className="w-5 h-5" style={{ color: '#8BC34A' }} />
                      </div>
                      <div>
                        <div className="text-white/50 text-xs">{label}</div>
                        <div className="text-white font-medium text-sm whitespace-pre-line">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="px-8 py-3 rounded-full text-sm font-bold transition-transform hover:scale-105 w-fit" style={{ backgroundColor: '#8BC34A', color: '#2d4a2d' }}>
                  {content.contact.cta}
                </button>
              </div>
              <div className="w-2/5 flex flex-col items-center justify-center p-12 bg-white">
                <img src={logoHipervinculo} alt="Hipervinculo" className="h-14 mb-4" />
                <div className="w-12 h-1 mb-4" style={{ backgroundColor: '#8BC34A' }} />
                <p className="text-center text-xs font-medium max-w-xs leading-relaxed" style={{ color: '#2d4a2d' }}>
                  High-intent search traffic, disciplined budgets, and reporting measured in profit.
                </p>
              </div>
            </div>
          </Page>

        </div>
      </div>
    </div>
  );
}
