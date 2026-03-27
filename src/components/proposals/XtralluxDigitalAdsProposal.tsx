import { useRef, useState, useCallback } from 'react';
import { Download, CheckCircle, FileText, RefreshCw, Server, Calendar, DollarSign, Clock, BarChart3, Lock, TrendingUp, Monitor, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { xtralluxDigitalAdsContent } from './data/xtralluxDigitalAdsContent';
import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { useToast } from '@/hooks/use-toast';
import { pdf } from '@react-pdf/renderer';
import { XtralluxDigitalAdsPDFDocument } from './pdf/XtralluxDigitalAdsPDFDocument';

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

export function XtralluxDigitalAdsProposal() {
  const documentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const content = xtralluxDigitalAdsContent;

  const handleDownloadPDF = useCallback(async () => {
    setIsExporting(true);
    toast({ title: 'Generating PDF...', description: 'Please wait while we prepare your document.' });

    try {
      const logoBase64 = await imageToBase64(logoHipervinculo);
      const blob = await pdf(
        <XtralluxDigitalAdsPDFDocument logoBase64={logoBase64} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Proposal-XTRALLUX-Digital-Ads.pdf';
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
          Proposal — XTRALLUX (Digital Ads)
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
              {/* Exclusions note */}
              <div className="mt-6 p-4 rounded-xl border border-amber-200" style={{ backgroundColor: 'rgba(255,193,7,0.06)' }}>
                <h3 className="font-bold text-[14px] mb-1" style={{ color: '#2d4a2d' }}>{content.objective.exclusions.title}</h3>
                <p className="text-[12px] text-gray-500 leading-relaxed">{content.objective.exclusions.description}</p>
              </div>
            </div>
          </Page>

          {/* PAGE 4: Platform Access */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Requirements</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.platformAccess.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{content.platformAccess.headline}</p>
              <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">{content.platformAccess.description}</p>
              <div className="space-y-3 flex-1">
                {content.platformAccess.platforms.map((platform, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
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

          {/* PAGE 5: Meta Ads */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Service 1</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.metaAdsService.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{content.metaAdsService.headline}</p>
              <div className="rounded-2xl px-8 py-5 mb-6 flex items-center justify-between" style={{ backgroundColor: '#2d4a2d' }}>
                <div>
                  <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Included in Commission</div>
                  <div className="text-white/40 text-xs mt-1">Part of the 5% Shopify Net Sales Commission</div>
                </div>
                <span className="text-2xl font-extrabold text-white">5%</span>
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

          {/* PAGE 6: Google Ads */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Service 2</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.googleAdsService.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{content.googleAdsService.headline}</p>
              <div className="rounded-2xl px-8 py-5 mb-6 flex items-center justify-between" style={{ backgroundColor: '#2d4a2d' }}>
                <div>
                  <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Included in Commission</div>
                  <div className="text-white/40 text-xs mt-1">Part of the 5% Shopify Net Sales Commission</div>
                </div>
                <span className="text-2xl font-extrabold text-white">5%</span>
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

          {/* PAGE 7: Triple Whale */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Attribution</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.tripleWhaleService.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{content.tripleWhaleService.headline}</p>
              <div className="rounded-2xl px-8 py-5 mb-6 flex items-center justify-between" style={{ backgroundColor: '#2d4a2d' }}>
                <div>
                  <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Triple Whale Subscription</div>
                  <div className="text-white/40 text-xs mt-1">Paid Directly by Client to Triple Whale</div>
                </div>
                <TrendingUp className="w-8 h-8 text-white/70" />
              </div>
              <p className="text-gray-600 leading-relaxed mb-5 text-[15px]">{content.tripleWhaleService.description}</p>
              <div className="space-y-2.5 flex-1">
                {content.tripleWhaleService.features.map((item, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <BarChart3 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                    <div>
                      <h3 className="font-bold text-[14px]" style={{ color: '#2d4a2d' }}>{item.title}</h3>
                      <p className="text-[13px] text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* PAGE 8: Investment Summary */}
          <Page bg="#f8f9f5">
            <div className="px-16 py-12 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#f8f9f5' }}>
              <div className="w-10 h-1 rounded-full mb-6" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Investment</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.investment.title}</h2>
              <p className="font-medium mb-6" style={{ color: '#8BC34A' }}>{content.investment.headline}</p>

              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Commission */}
                <div className="bg-white rounded-2xl p-8" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <h3 className="font-bold text-[16px] mb-6" style={{ color: '#2d4a2d' }}>{content.investment.ongoing.title}</h3>
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <div>
                      <p className="text-[14px] text-gray-700 font-medium">{content.investment.ongoing.commission.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{content.investment.ongoing.commission.basis}</p>
                    </div>
                    <span className="text-5xl font-extrabold" style={{ color: '#8BC34A' }}>{content.investment.ongoing.commission.rate}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{content.investment.ongoing.commission.description}</p>
                </div>

                {/* Client Pays */}
                <div className="bg-white rounded-2xl p-8" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <h3 className="font-bold text-[16px] mb-6" style={{ color: '#2d4a2d' }}>{content.investment.ongoing.clientPays.title}</h3>
                  <div className="space-y-4">
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
              </div>

              {/* Commission Example */}
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
                      <span className={`text-[13px] font-semibold text-right ${row.type === 'deduction' ? 'text-red-400' : ''}`} style={row.type === 'revenue' ? { color: '#2d4a2d' } : undefined}>{row.value}</span>
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

              {/* ROAS Guarantee — highlighted banner */}
              <div className="rounded-2xl p-6 mb-5 relative overflow-hidden" style={{ backgroundColor: '#2d4a2d', boxShadow: '0 4px 20px rgba(45,74,45,0.3)' }}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10" style={{ backgroundColor: '#8BC34A', transform: 'translate(30%, -30%)' }} />
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(139,195,74,0.2)' }}>
                    <ShieldCheck className="w-7 h-7" style={{ color: '#8BC34A' }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] mb-1" style={{ color: '#8BC34A' }}>Performance Guarantee</p>
                    <h3 className="text-xl font-extrabold text-white mb-2">Net ROAS 2.0x Guarantee</h3>
                    <p className="text-white/70 text-[13px] leading-relaxed mb-3">
                      If in any given month the <span className="text-white font-semibold">Net ROAS</span> (Shopify Total Net Sales ÷ Total Ad Spend across all channels) does not reach a minimum of <span className="text-white font-extrabold text-[15px]">2.0x</span>, Hipervínculo will <span className="font-bold" style={{ color: '#8BC34A' }}>waive its 5% commission for that month entirely</span>.
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="px-4 py-2 rounded-xl" style={{ backgroundColor: 'rgba(139,195,74,0.15)' }}>
                        <span className="text-xs text-white/50">Minimum Net ROAS</span>
                        <span className="block text-2xl font-extrabold" style={{ color: '#8BC34A' }}>2.0x</span>
                      </div>
                      <div className="px-4 py-2 rounded-xl" style={{ backgroundColor: 'rgba(139,195,74,0.15)' }}>
                        <span className="text-xs text-white/50">If Not Met</span>
                        <span className="block text-lg font-extrabold text-white">$0 Commission</span>
                      </div>
                      <div className="px-4 py-2 rounded-xl flex-1" style={{ backgroundColor: 'rgba(139,195,74,0.15)' }}>
                        <span className="text-xs text-white/50">Formula</span>
                        <span className="block text-[13px] font-bold text-white">Shopify Net Sales ÷ Total Ad Spend</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

          {/* PAGE 9: Terms */}
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

          {/* PAGE 10: Agreement Details */}
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

          {/* PAGE 11: Contact */}
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
