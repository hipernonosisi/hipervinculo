import { useRef, useState, useCallback } from 'react';
import { Download, CheckCircle, FileText, RefreshCw, Server, Calendar, DollarSign, Clock, BarChart3, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { avNutraceuticalsProposalContent } from './data/avNutraceuticalsProposalContent';
import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { useToast } from '@/hooks/use-toast';
import { pdf } from '@react-pdf/renderer';
import { AvNutraceuticalsPDFDocument } from './pdf/AvNutraceuticalsPDFDocument';

const PAGE_WIDTH = 794;
const PAGE_HEIGHT = 1123;

const iconMap: Record<string, React.ElementType> = {
  files: FileText,
  refresh: RefreshCw,
  server: Server,
  calendar: Calendar,
  dollar: DollarSign,
  clock: Clock,
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

export function AvNutraceuticalsProposal() {
  const documentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const content = avNutraceuticalsProposalContent;

  const handleDownloadPDF = useCallback(async () => {
    setIsExporting(true);
    toast({ title: 'Generating PDF...', description: 'Please wait while we prepare your document.' });

    try {
      const logoBase64 = await imageToBase64(logoHipervinculo);
      const blob = await pdf(<AvNutraceuticalsPDFDocument logoBase64={logoBase64} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Proposal-AV-Nutraceuticals-Amazon.pdf';
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
          Proposal — AV Nutraceuticals (Amazon Launch)
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

          {/* PAGE 3: Objective & Scope */}
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
            </div>
          </Page>

          {/* PAGE 4: Setup Service */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Service 1</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.setupService.title}</h2>
              <p className="font-medium mb-6" style={{ color: '#8BC34A' }}>{content.setupService.headline}</p>
              <div className="rounded-2xl px-8 py-5 mb-8 flex items-center justify-between" style={{ backgroundColor: '#2d4a2d' }}>
                <div><div className="text-white/50 text-xs font-bold uppercase tracking-widest">{content.setupService.priceLabel}</div></div>
                <span className="text-4xl font-extrabold text-white">{content.setupService.price}</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">{content.setupService.description}</p>
              <div className="space-y-2.5 flex-1">
                {content.setupService.includes.map((item, i) => (
                  <div key={i} className="flex gap-3 p-4 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
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

          {/* PAGE 5: Listing Service */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Service 2</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.listingService.title}</h2>
              <p className="font-medium mb-6" style={{ color: '#8BC34A' }}>{content.listingService.headline}</p>
              <div className="rounded-2xl px-8 py-5 mb-6" style={{ backgroundColor: '#2d4a2d' }}>
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
                  <div>
                    <div className="text-white/50 text-xs font-bold uppercase tracking-widest">{content.listingService.parentLabel}</div>
                    <div className="text-white/40 text-xs mt-1">{content.listingService.parentCount} parents · includes A+ Content</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-white">{content.listingService.parentPrice}</div>
                    <div className="text-white/50 text-xs">= {content.listingService.parentSubtotal}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
                  <div>
                    <div className="text-white/50 text-xs font-bold uppercase tracking-widest">{content.listingService.variationLabel}</div>
                    <div className="text-white/40 text-xs mt-1">{content.listingService.variationCount} variations</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-extrabold text-white">{content.listingService.variationPrice}</div>
                    <div className="text-white/50 text-xs">= {content.listingService.variationSubtotal}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="text-white text-sm font-bold uppercase tracking-widest">{content.listingService.totalLabel}</div>
                  <span className="text-3xl font-extrabold" style={{ color: '#8BC34A' }}>{content.listingService.totalPrice}</span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-5 text-[14px]">{content.listingService.description}</p>
              <div className="space-y-2 flex-1">
                {content.listingService.includes.map((item, i) => (
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

          {/* PAGE 6: Advertising */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Service 3</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.advertisingService.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{content.advertisingService.headline}</p>
              <div className="rounded-2xl px-8 py-5 mb-6 flex items-center justify-between" style={{ backgroundColor: '#2d4a2d' }}>
                <div>
                  <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Included in Ongoing Management</div>
                  <div className="text-white/40 text-xs mt-1">Part of the $5,500/mo fee ($500 × 11 ASINs) + 10% Net Profit commission</div>
                </div>
                <span className="text-2xl font-extrabold text-white">10%</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-5 text-[15px]">{content.advertisingService.description}</p>
              <div className="space-y-2 flex-1">
                {content.advertisingService.includes.map((item, i) => (
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

          {/* PAGE 7: Ongoing + Sellerise + Case Management */}
          <Page>
            <div className="px-16 py-12 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-6" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Service 4</p>
              <h2 className="text-2xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.ongoingService.title}</h2>
              <p className="font-medium text-sm mb-3" style={{ color: '#8BC34A' }}>{content.ongoingService.headline}</p>
              <p className="text-gray-600 leading-relaxed mb-3 text-[13px]">{content.ongoingService.description}</p>
              <div className="space-y-1.5 mb-5">
                {content.ongoingService.includes.map((item, i) => (
                  <div key={i} className="flex gap-3 p-2.5 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                    <div>
                      <h3 className="font-bold text-[12px]" style={{ color: '#2d4a2d' }}>{item.title}</h3>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sellerise */}
              <div className="w-10 h-1 rounded-full mb-3" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Tooling</p>
              <h2 className="text-xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.selleriseService.title}</h2>
              <p className="font-medium text-sm mb-3" style={{ color: '#8BC34A' }}>{content.selleriseService.headline}</p>
              <div className="rounded-2xl px-6 py-3 mb-3 flex items-center justify-between" style={{ backgroundColor: '#2d4a2d' }}>
                <div>
                  <div className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Sellerise Subscription</div>
                  <div className="text-white/40 text-[10px] mt-0.5">{content.selleriseService.monthlyCostLabel}</div>
                </div>
                <span className="text-xl font-extrabold text-white">{content.selleriseService.monthlyCost}</span>
              </div>

              {/* Case Management */}
              <div className="space-y-2 mt-2">
                {content.caseManagement.tiers.map((tier, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ backgroundColor: tier.included ? '#f8f9f5' : 'rgba(255,193,7,0.08)' }}>
                    {tier.included ? (
                      <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                    ) : (
                      <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#FFC107' }} />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-[13px]" style={{ color: '#2d4a2d' }}>{tier.title}</h3>
                        {tier.included ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: '#8BC34A' }}>Included</span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(255,193,7,0.2)', color: '#F57F17' }}>{tier.price}</span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{tier.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* PAGE 8: Investment Summary */}
          <Page bg="#f8f9f5">
            <div className="px-12 py-10 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#f8f9f5' }}>
              <div className="w-10 h-1 rounded-full mb-5" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Investment</p>
              <h2 className="text-2xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.investment.title}</h2>
              <p className="font-medium mb-5 text-sm" style={{ color: '#8BC34A' }}>{content.investment.headline}</p>

              <div className="grid grid-cols-2 gap-5 mb-5">
                {/* Setup */}
                <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <h3 className="font-bold text-[14px] mb-4" style={{ color: '#2d4a2d' }}>{content.investment.setup.title}</h3>
                  <div className="space-y-2.5">
                    {content.investment.setup.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-start gap-3 pb-2 border-b border-gray-100">
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] text-gray-700 font-medium">{item.name}</div>
                          <div className="text-[10px] text-gray-400 mt-0.5">{item.detail}</div>
                        </div>
                        <span className="font-extrabold text-[15px] flex-shrink-0" style={{ color: '#2d4a2d' }}>{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 pt-4 mt-3 flex items-center justify-between">
                    <span className="font-bold text-xs" style={{ color: '#2d4a2d' }}>Total Setup</span>
                    <span className="text-2xl font-extrabold" style={{ color: '#8BC34A' }}>{content.investment.setup.total}</span>
                  </div>
                </div>

                {/* Ongoing */}
                <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <h3 className="font-bold text-[14px] mb-4" style={{ color: '#2d4a2d' }}>{content.investment.ongoing.title}</h3>
                  <div className="flex justify-between items-start gap-3 pb-3 border-b border-gray-100">
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-gray-700 font-medium">{content.investment.ongoing.retainer.label}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Charged every month</p>
                    </div>
                    <span className="text-xl font-extrabold flex-shrink-0" style={{ color: '#2d4a2d' }}>{content.investment.ongoing.retainer.price}</span>
                  </div>
                  <div className="text-center text-[9px] font-bold uppercase tracking-widest py-2" style={{ color: '#8BC34A' }}>+ Plus</div>
                  <div className="flex justify-between items-start gap-3 pb-3 border-b border-gray-100">
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-gray-700 font-medium">{content.investment.ongoing.commission.label}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{content.investment.ongoing.commission.basis}</p>
                    </div>
                    <span className="text-2xl font-extrabold flex-shrink-0" style={{ color: '#8BC34A' }}>{content.investment.ongoing.commission.rate}</span>
                  </div>
                  <div className="flex justify-between items-start gap-3 mt-3 pb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-gray-700 font-medium">{content.investment.ongoing.sellerise.label}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{content.investment.ongoing.sellerise.detail}</p>
                    </div>
                    <span className="font-bold text-sm flex-shrink-0" style={{ color: '#2d4a2d' }}>{content.investment.ongoing.sellerise.price}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-2">
                    <p className="text-[10px] text-gray-500 leading-relaxed">{content.investment.ongoing.note}</p>
                  </div>
                </div>
              </div>

              {/* Hybrid Compensation Example */}
              <div className="bg-white rounded-2xl p-5 mb-4" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3 className="w-4 h-4" style={{ color: '#8BC34A' }} />
                  <h3 className="font-bold text-[14px]" style={{ color: '#2d4a2d' }}>{content.investment.example.title}</h3>
                </div>
                <p className="text-[10px] text-gray-400 mb-3">{content.investment.example.subtitle}</p>
                <div className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1">
                  {content.investment.example.rows.map((row, i) => (
                    <div key={i} className="contents">
                      <span className="text-[12px] text-gray-600">{row.label}</span>
                      <span className={`text-[12px] font-semibold text-right ${row.type === 'deduction' ? 'text-red-400' : ''}`} style={row.type === 'revenue' ? { color: '#2d4a2d' } : undefined}>{row.value}</span>
                    </div>
                  ))}
                  <div className="col-span-2 border-t border-gray-200 my-1" />
                  <span className="text-[13px] font-bold" style={{ color: '#2d4a2d' }}>{content.investment.example.netProfit.label}</span>
                  <span className="text-lg font-extrabold text-right" style={{ color: '#8BC34A' }}>{content.investment.example.netProfit.value}</span>
                </div>
                <div className="mt-3 rounded-xl p-3" style={{ backgroundColor: '#2d4a2d' }}>
                  <div className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1">
                    <span className="text-[12px] text-white/80">{content.investment.example.monthlyFee.label}</span>
                    <span className="text-[13px] font-bold text-right text-white">{content.investment.example.monthlyFee.value}</span>
                    <span className="text-[12px] text-white/80">{content.investment.example.commission.label}</span>
                    <span className="text-[13px] font-bold text-right text-white">{content.investment.example.commission.value}</span>
                    <div className="col-span-2 border-t border-white/20 my-1" />
                    <span className="text-[13px] font-extrabold text-white">{content.investment.example.total.label}</span>
                    <span className="text-xl font-extrabold text-right" style={{ color: '#8BC34A' }}>{content.investment.example.total.value}</span>
                  </div>
                </div>
                <p className="text-[9px] text-gray-400 mt-2 leading-relaxed">{content.investment.example.note}</p>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 pr-6">
                    <h3 className="font-bold text-[14px]" style={{ color: '#2d4a2d' }}>{content.investment.timeline.title}</h3>
                    <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{content.investment.timeline.description}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className="text-3xl font-extrabold leading-none" style={{ color: '#8BC34A' }}>{content.investment.timeline.duration}</span>
                    <span className="block text-sm font-bold" style={{ color: '#8BC34A' }}>{content.investment.timeline.durationUnit}</span>
                  </div>
                </div>
              </div>
            </div>
          </Page>

          {/* PAGE 9: Terms */}
          <Page>
            <div className="px-16 py-14" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-6" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Terms</p>
              <h2 className="text-3xl font-extrabold mb-2" style={{ color: '#2d4a2d' }}>{content.terms.title}</h2>
              <p className="font-medium mb-6" style={{ color: '#8BC34A' }}>{content.terms.headline}</p>
              <div className="space-y-2.5">
                {content.terms.sections.map((section, i) => {
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

          {/* PAGE 10: Agreement Details */}
          <Page bg="#f8f9f5">
            <div className="px-16 py-14" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#f8f9f5' }}>
              <div className="w-10 h-1 rounded-full mb-6" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Agreement</p>
              <h2 className="text-3xl font-extrabold mb-6" style={{ color: '#2d4a2d' }}>{content.legalTerms.title}</h2>
              <div className="space-y-4">
                {content.legalTerms.sections.map((section, i) => (
                  <div key={i}>
                    <h3 className="font-extrabold text-[14px] mb-2" style={{ color: '#2d4a2d' }}>{section.heading}</h3>
                    <ol className="space-y-1.5 pl-6 list-decimal">
                      {section.items.map((item, j) => (
                        <li key={j} className="text-[11px] text-gray-600 leading-relaxed pl-1">{item}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* PAGE 11: Signature */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Signatures</p>
              <h2 className="text-3xl font-extrabold mb-2" style={{ color: '#2d4a2d' }}>{content.signature.title}</h2>
              <p className="font-medium mb-8" style={{ color: '#8BC34A' }}>{content.signature.headline}</p>
              <p className="text-gray-600 leading-relaxed mb-12 text-[14px]">{content.signature.intro}</p>
              <div className="grid grid-cols-2 gap-10 mt-8">
                {[content.signature.client, content.signature.agency].map((sig, i) => (
                  <div key={i}>
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#8BC34A' }}>{sig.role}</p>
                    <div className="border-b-2 border-gray-300 pb-1 mb-2" style={{ height: '60px' }} />
                    <p className="font-bold text-[14px]" style={{ color: '#2d4a2d' }}>{sig.name}</p>
                    <p className="text-[12px] text-gray-500">{sig.company}</p>
                    <div className="mt-6">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Date</p>
                      <div className="border-b border-gray-300" style={{ height: '24px' }} />
                    </div>
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
                <p className="text-center text-gray-400 text-sm max-w-sm">
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
