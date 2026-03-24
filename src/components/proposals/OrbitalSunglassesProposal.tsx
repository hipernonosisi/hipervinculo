import { useRef, useState, useCallback } from 'react';
import { Download, CheckCircle, FileText, Calendar, DollarSign, Clock, BarChart3, Target, Zap, TrendingUp, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { orbitalSunglassesProposalContent } from './data/orbitalSunglassesProposalContent';
import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { useToast } from '@/hooks/use-toast';
import { pdf } from '@react-pdf/renderer';
import { OrbitalSunglassesPDFDocument } from './pdf/OrbitalSunglassesPDFDocument';

const PAGE_WIDTH = 794;
const PAGE_HEIGHT = 1123;

const iconMap: Record<string, React.ElementType> = {
  files: FileText,
  calendar: Calendar,
  dollar: DollarSign,
  clock: Clock,
};

function Page({ children, bg = '#ffffff' }: { children: React.ReactNode; bg?: string }) {
  return (
    <div
      className="relative mx-auto mb-8 shadow-xl overflow-visible"
      style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: bg, pageBreakAfter: 'always' }}
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

export function OrbitalSunglassesProposal() {
  const documentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const content = orbitalSunglassesProposalContent;

  const handleDownloadPDF = useCallback(async () => {
    setIsExporting(true);
    toast({ title: 'Generando PDF...', description: 'Por favor espera mientras preparamos tu documento.' });
    try {
      const logoBase64 = await imageToBase64(logoHipervinculo);
      const blob = await pdf(<OrbitalSunglassesPDFDocument logoBase64={logoBase64} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Propuesta-Orbital-Sunglasses.pdf';
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
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-10">
        <h2 className="text-sm sm:text-lg font-bold" style={{ color: '#2d4a2d' }}>
          Propuesta — Orbital Sunglasses
        </h2>
        <Button onClick={handleDownloadPDF} size="sm" className="gap-2" style={{ backgroundColor: '#8BC34A' }} disabled={isExporting}>
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-300 py-8 px-4">
        <div ref={documentRef}>

          {/* PAGE 1: Cover */}
          <Page>
            <div className="flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px` }}>
              <div className="px-16 pt-14 pb-8 flex items-center justify-between">
                <img src={logoHipervinculo} alt="Hipervinculo" className="h-10" />
                <span className="text-xs text-gray-400 font-medium tracking-wider uppercase">{content.cover.alliance}</span>
              </div>
              <div className="flex-1 flex flex-col justify-center px-16" style={{ backgroundColor: '#2d4a2d' }}>
                <p className="text-sm font-bold tracking-[0.2em] uppercase mb-6" style={{ color: '#8BC34A' }}>
                  {content.cover.title}
                </p>
                <h1 className="text-5xl font-extrabold text-white mb-5 leading-[1.1] whitespace-pre-line">
                  {content.cover.subtitle}
                </h1>
                <p className="text-xl text-white/60 mb-4">{content.cover.tagline}</p>
                <p className="text-sm text-white/40 mb-10 tracking-wide">{content.cover.preparedFor}</p>
                <div className="w-20 h-1 rounded-full" style={{ backgroundColor: '#8BC34A' }} />
              </div>
              <div className="px-16 py-6 flex items-center justify-between bg-white">
                <p className="text-xs text-gray-400 tracking-wider uppercase">Confidencial</p>
                <p className="text-xs text-gray-400">hipervinculo.net · eclipseexperience.net</p>
              </div>
            </div>
          </Page>

          {/* PAGE 2: About — Alliance */}
          <Page>
            <div className="px-16 py-14" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px` }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Nuestra Alianza</p>
              <h2 className="text-3xl font-extrabold mb-2" style={{ color: '#2d4a2d' }}>{content.about.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{content.about.headline}</p>
              <p className="text-gray-600 leading-relaxed mb-8 text-[15px] whitespace-pre-line">{content.about.description}</p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {content.about.stats.map((stat, i) => (
                  <div key={i} className="text-center py-6 rounded-2xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <div className="text-4xl font-extrabold mb-1" style={{ color: '#8BC34A' }}>{stat.value}</div>
                    <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 mb-8">
                {content.about.credentials.map((cred, i) => (
                  <span key={i} className="text-sm font-medium px-5 py-2.5 rounded-full" style={{ backgroundColor: 'rgba(139,195,74,0.1)', color: '#2d4a2d' }}>
                    {cred}
                  </span>
                ))}
              </div>
              <div className="p-6 rounded-2xl" style={{ backgroundColor: '#f8f9f5' }}>
                <p className="text-[14px] text-gray-600 leading-relaxed italic">{content.about.allianceNote}</p>
              </div>
            </div>
          </Page>

          {/* PAGE 3: Assessment */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px` }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Diagnóstico</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.assessment.title}</h2>
              <p className="font-medium mb-6" style={{ color: '#8BC34A' }}>{content.assessment.headline}</p>
              <div className="space-y-4 flex-1">
                {content.assessment.sections.map((section, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(139,195,74,0.15)' }}>
                      <Target className="w-5 h-5" style={{ color: '#8BC34A' }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[16px] mb-1" style={{ color: '#2d4a2d' }}>{section.title}</h3>
                      <p className="text-[14px] text-gray-500 leading-relaxed">{section.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* PAGE 4: Setup Inicial & Dirección Visual */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px` }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Servicio 1</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.shopifyService.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{content.shopifyService.headline}</p>

              {/* Two pricing options */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-2xl px-6 py-5" style={{ backgroundColor: '#2d4a2d' }}>
                  <div className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">Setup Base</div>
                  <span className="text-3xl font-extrabold text-white">{content.shopifyService.basePrice}</span>
                  <p className="text-white/50 text-[11px] mt-1">Dirección visual + Fotografía IA + Revisión</p>
                </div>
                <div className="rounded-2xl px-6 py-5 border-2" style={{ borderColor: '#8BC34A', backgroundColor: 'rgba(139,195,74,0.05)' }}>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#8BC34A' }}>Con Shopify (Opcional)</div>
                  <span className="text-3xl font-extrabold" style={{ color: '#2d4a2d' }}>{content.shopifyService.fullPrice}</span>
                  <p className="text-[11px] text-gray-400 mt-1">Incluye desarrollo completo de tienda Shopify</p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-5 text-[14px]">{content.shopifyService.description}</p>

              <h3 className="font-extrabold text-[15px] mb-3" style={{ color: '#2d4a2d' }}>Incluido en Setup Base ($2,500)</h3>
              <div className="space-y-2 mb-5">
                {content.shopifyService.baseIncludes.map((item, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                    <div>
                      <h3 className="font-bold text-[13px]" style={{ color: '#2d4a2d' }}>{item.title}</h3>
                      <p className="text-[12px] text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl p-5 border" style={{ borderColor: 'rgba(139,195,74,0.3)', backgroundColor: 'rgba(139,195,74,0.04)' }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-extrabold text-[15px]" style={{ color: '#2d4a2d' }}>{content.shopifyService.shopifyAddon.title}</h3>
                  <span className="font-extrabold text-lg" style={{ color: '#8BC34A' }}>{content.shopifyService.shopifyAddon.price}</span>
                </div>
                <p className="text-[12px] text-gray-500 mb-3">{content.shopifyService.shopifyAddon.description}</p>
                <div className="space-y-1.5">
                  {content.shopifyService.shopifyAddon.includes.map((item, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                      <div>
                        <span className="font-bold text-[12px]" style={{ color: '#2d4a2d' }}>{item.title}</span>
                        <span className="text-[11px] text-gray-400 ml-1">— {item.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Page>

          {/* PAGE 5: Ads - Google */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px` }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Servicio 2</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.adsService.title}</h2>
              <p className="font-medium mb-5" style={{ color: '#8BC34A' }}>{content.adsService.headline}</p>
              <div className="rounded-2xl px-8 py-6 mb-6" style={{ backgroundColor: '#2d4a2d' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Gestión Continua</div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-white">$3,000</span>
                    <span className="text-white/50 text-sm ml-1">/mes mín.</span>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <p className="text-white/70 text-[13px] leading-relaxed">
                    <span className="font-semibold text-white/90">¿Cómo funciona?</span> Se cobra un retainer mensual de <span className="font-bold text-white">$3,000</span> como cuota mínima. Paralelamente, se calcula una comisión del <span className="font-bold text-white">10% sobre el Profit Neto</span>. <span className="font-semibold text-white/90">Siempre se cobra el mayor de los dos montos.</span>
                  </p>
                  <div className="flex gap-4 mt-3">
                    <div className="flex-1 rounded-xl px-4 py-2.5" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider font-bold">Si Profit Neto {'<'} $30K</p>
                      <p className="text-white text-sm font-bold mt-0.5">Se cobra $3,000 <span className="text-white/40 font-normal">(retainer)</span></p>
                    </div>
                    <div className="flex-1 rounded-xl px-4 py-2.5" style={{ backgroundColor: 'rgba(139,195,74,0.15)' }}>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider font-bold">Si Profit Neto {'>'} $30K</p>
                      <p className="text-white text-sm font-bold mt-0.5" style={{ color: '#8BC34A' }}>Se cobra 10% <span className="font-normal" style={{ color: 'rgba(139,195,74,0.6)' }}>(comisión)</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">{content.adsService.description}</p>

              <h3 className="font-extrabold text-[16px] mb-4" style={{ color: '#2d4a2d' }}>Google Ads</h3>
              <div className="space-y-2.5 mb-8">
                {content.adsService.googleAds.map((item, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                    <div>
                      <h3 className="font-bold text-[14px]" style={{ color: '#2d4a2d' }}>{item.title}</h3>
                      <p className="text-[13px] text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="font-extrabold text-[16px] mb-4" style={{ color: '#2d4a2d' }}>Meta Ads</h3>
              <div className="space-y-2.5 flex-1">
                {content.adsService.metaAds.map((item, i) => (
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

          {/* PAGE 6: Commitment */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px` }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Compromiso</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.commitment.title}</h2>
              <p className="font-medium mb-8" style={{ color: '#8BC34A' }}>{content.commitment.headline}</p>
              <div className="space-y-4 flex-1">
                {content.commitment.items.map((item, i) => {
                  const icons = [TrendingUp, Zap, BarChart3, Brain];
                  const Icon = icons[i] || TrendingUp;
                  return (
                    <div key={i} className="flex gap-4 p-6 rounded-2xl" style={{ backgroundColor: '#f8f9f5' }}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(139,195,74,0.15)' }}>
                        <Icon className="w-6 h-6" style={{ color: '#8BC34A' }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[16px] mb-1" style={{ color: '#2d4a2d' }}>{item.title}</h3>
                        <p className="text-[14px] text-gray-500 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Page>

          {/* PAGE 7: Investment Summary */}
          <Page bg="#f8f9f5">
            <div className="px-16 py-12 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#f8f9f5' }}>
              <div className="w-10 h-1 rounded-full mb-6" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Inversión</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.investment.title}</h2>
              <p className="font-medium mb-6" style={{ color: '#8BC34A' }}>{content.investment.headline}</p>

              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Setup */}
                <div className="bg-white rounded-2xl p-8" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <h3 className="font-bold text-[16px] mb-6" style={{ color: '#2d4a2d' }}>{content.investment.setup.title}</h3>
                  <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: '0 6px' }}>
                    <tbody>
                      {content.investment.setup.items.map((item, i) => (
                        <tr key={i}>
                          <td className="py-2 pr-4 align-top">
                            <div className="text-[14px] text-gray-700 font-medium">{item.name}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{item.detail}</div>
                          </td>
                          <td className="py-2 text-right align-top whitespace-nowrap">
                            <span className="font-extrabold text-xl" style={{ color: '#2d4a2d' }}>{item.price}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="border-t border-gray-200 pt-5 mt-4">
                    <span className="font-bold text-sm block mb-2" style={{ color: '#2d4a2d' }}>Total Setup</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold" style={{ color: '#8BC34A' }}>$2,500</span>
                      <span className="text-sm text-gray-400">—</span>
                      <span className="text-2xl font-extrabold" style={{ color: '#8BC34A' }}>$7,500</span>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">Dependiendo si incluye desarrollo Shopify</p>
                  </div>
                </div>

                {/* Ongoing */}
                <div className="bg-white rounded-2xl p-8" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <h3 className="font-bold text-[16px] mb-4" style={{ color: '#2d4a2d' }}>{content.investment.ongoing.title}</h3>
                  
                  {/* Retainer */}
                  <div className="rounded-xl p-4 mb-3" style={{ backgroundColor: '#f8f9f5' }}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[14px] text-gray-700 font-bold">Retainer Mensual</p>
                      <div className="text-right">
                        <span className="text-3xl font-extrabold" style={{ color: '#8BC34A' }}>$3,000</span>
                        <span className="text-sm text-gray-400 ml-1">/mes</span>
                      </div>
                    </div>
                    <p className="text-[12px] text-gray-500">Cuota mínima mensual garantizada</p>
                  </div>

                  {/* Divider with "ó" */}
                  <div className="flex items-center gap-3 my-2">
                    <div className="flex-1 border-t border-gray-200" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Se cobra el mayor</span>
                    <div className="flex-1 border-t border-gray-200" />
                  </div>

                  {/* Commission */}
                  <div className="rounded-xl p-4 mt-3" style={{ backgroundColor: '#f8f9f5' }}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[14px] text-gray-700 font-bold">Comisión sobre Profit</p>
                      <span className="text-3xl font-extrabold" style={{ color: '#8BC34A' }}>10%</span>
                    </div>
                    <p className="text-[12px] text-gray-500">{content.investment.ongoing.commission.basis}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-3 mt-4">
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      <span className="font-semibold text-gray-700">Regla simple:</span> {content.investment.ongoing.retainer.description}
                    </p>
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
                  <span className="text-[14px] font-bold" style={{ color: '#2d4a2d' }}>{content.investment.example.netProfit.label}</span>
                  <span className="text-xl font-extrabold text-right" style={{ color: '#8BC34A' }}>{content.investment.example.netProfit.value}</span>
                  <div className="col-span-2 border-t border-dashed border-gray-200 my-1" />
                  <span className="text-[13px] text-gray-500">{content.investment.example.retainerComparison.retainerLabel}</span>
                  <span className="text-[13px] font-semibold text-right text-gray-500">{content.investment.example.retainerComparison.retainerValue}</span>
                  <span className="text-[13px] text-gray-500">{content.investment.example.retainerComparison.commissionLabel}</span>
                  <span className="text-[13px] font-semibold text-right" style={{ color: '#2d4a2d' }}>{content.investment.example.retainerComparison.commissionValue}</span>
                  <div className="col-span-2 border-t border-gray-200 my-1" />
                  <span className="text-[14px] font-bold" style={{ color: '#2d4a2d' }}>{content.investment.example.retainerComparison.resultLabel}</span>
                  <span className="text-xl font-extrabold text-right" style={{ color: '#2d4a2d' }}>{content.investment.example.retainerComparison.resultValue}</span>
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

          {/* PAGE 8: Terms */}
          <Page>
            <div className="px-16 py-14" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px` }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Términos</p>
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

          {/* PAGE 9: Agreement Details */}
          <Page bg="#f8f9f5">
            <div className="px-16 py-14" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#f8f9f5' }}>
              <div className="w-10 h-1 rounded-full mb-6" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Acuerdo</p>
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

          {/* PAGE 10: Signature */}
          <Page bg="#f8f9f5">
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px`, backgroundColor: '#f8f9f5' }}>
              <div className="w-10 h-1 rounded-full mb-6" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Aceptación</p>
              <h2 className="text-3xl font-extrabold mb-3" style={{ color: '#2d4a2d' }}>Firma de Acuerdo</h2>
              <p className="text-sm text-gray-500 mb-12 max-w-lg">
                Al firmar este documento, ambas partes aceptan los términos y condiciones descritos en esta propuesta.
              </p>

              <div className="flex-1 flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-16">
                  {/* Client signature */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] mb-1" style={{ color: '#8BC34A' }}>El Cliente</p>
                    <p className="font-bold text-[15px] mb-1" style={{ color: '#2d4a2d' }}>Gustavo Holstein</p>
                    <p className="text-xs text-gray-400 mb-8">Orbital Sunglasses</p>
                    <div className="border-b-2 border-gray-300 mb-2 h-16" />
                    <p className="text-xs text-gray-400">Firma</p>
                    <div className="mt-6">
                      <div className="border-b border-gray-200 mb-2 h-8" />
                      <p className="text-xs text-gray-400">Fecha</p>
                    </div>
                  </div>

                  {/* Agency signature */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] mb-1" style={{ color: '#8BC34A' }}>La Agencia</p>
                    <p className="font-bold text-[15px] mb-1" style={{ color: '#2d4a2d' }}>Eclipse Marketing & CX + Hipervínculo</p>
                    <p className="text-xs text-gray-400 mb-8">Miguel Camacho — Director</p>
                    <div className="border-b-2 border-gray-300 mb-2 h-16" />
                    <p className="text-xs text-gray-400">Firma</p>
                    <div className="mt-6">
                      <div className="border-b border-gray-200 mb-2 h-8" />
                      <p className="text-xs text-gray-400">Fecha</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 text-center mt-8">
                Este documento tiene validez como acuerdo entre las partes una vez firmado por ambos representantes.
              </p>
            </div>
          </Page>

          {/* PAGE 11: Contact */}
          <Page>
            <div className="flex flex-col" style={{ width: `${PAGE_WIDTH}px`, minHeight: `${PAGE_HEIGHT}px` }}>
              <div className="px-16 py-14 flex-1" style={{ backgroundColor: '#2d4a2d' }}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: '#8BC34A' }}>Contáctanos</p>
                <h2 className="text-3xl font-extrabold text-white mb-3">{content.contact.title}</h2>
                <p className="text-white/60 mb-10 text-[15px]">{content.contact.description}</p>
                <div className="grid grid-cols-2 gap-8">
                  {content.contact.contacts.map((c, i) => (
                    <div key={i} className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{c.company}</h3>
                        <p className="text-white/50 text-sm">{c.name}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] mb-1" style={{ color: 'rgba(139,195,74,0.5)' }}>Email</p>
                        <p className="text-white font-medium">{c.email}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] mb-1" style={{ color: 'rgba(139,195,74,0.5)' }}>Teléfono</p>
                        <p className="text-white font-medium">{c.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] mb-1" style={{ color: 'rgba(139,195,74,0.5)' }}>Web</p>
                        <p className="text-white font-medium">{c.website}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center py-16 bg-white">
                <img src={logoHipervinculo} alt="Hipervinculo" className="h-12 mb-5" />
                <div className="w-12 h-1 rounded-full mb-5" style={{ backgroundColor: '#8BC34A' }} />
                <p className="text-center text-gray-400 text-sm max-w-sm">
                  Eclipse Marketing & CX + Hipervínculo — Enfocados en tus resultados.
                </p>
              </div>
            </div>
          </Page>

        </div>
      </div>
    </div>
  );
}
