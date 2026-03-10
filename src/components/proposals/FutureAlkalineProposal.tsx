import { useRef, useState, useCallback } from 'react';
import { Download, CheckCircle, FileText, RefreshCw, Server, Calendar, DollarSign, Clock, Bot, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { futureAlkalineProposalContent } from './data/futureAlkalineProposalContent';
import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { useToast } from '@/hooks/use-toast';
import { pdf } from '@react-pdf/renderer';
import { FutureAlkalinePDFDocument } from './pdf/FutureAlkalinePDFDocument';

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
      className="relative mx-auto mb-8 shadow-xl overflow-hidden"
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

export function FutureAlkalineProposal() {
  const documentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const content = futureAlkalineProposalContent;

  const handleDownloadPDF = useCallback(async () => {
    setIsExporting(true);
    toast({ title: 'Generando PDF...', description: 'Por favor espere mientras preparamos su documento.' });

    try {
      const logoBase64 = await imageToBase64(logoHipervinculo);
      const blob = await pdf(
        <FutureAlkalinePDFDocument logoBase64={logoBase64} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Propuesta-Future-Alkaline-Water.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast({ title: 'PDF Descargado!', description: 'Su propuesta ha sido guardada.' });
    } catch (error) {
      console.error('PDF export error:', error);
      toast({ title: 'Error', description: 'Error al generar el PDF.', variant: 'destructive' });
    } finally {
      setIsExporting(false);
    }
  }, [toast]);

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-10">
        <h2 className="text-sm sm:text-lg font-bold" style={{ color: '#2d4a2d' }}>
          Propuesta — Future Alkaline Water
        </h2>
        <Button onClick={handleDownloadPDF} size="sm" className="gap-2" style={{ backgroundColor: '#8BC34A' }} disabled={isExporting}>
          <Download className="w-4 h-4" />
          Descargar PDF
        </Button>
      </div>

      {/* Scrollable Pages */}
      <div className="flex-1 overflow-y-auto bg-gray-300 py-8 px-4">
        <div ref={documentRef}>

          {/* PAGE 1: Cover */}
          <Page>
            <div className="flex flex-col" style={{ width: `${PAGE_WIDTH}px`, height: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="px-16 pt-14 pb-8">
                <img src={logoHipervinculo} alt="Hipervinculo" className="h-10" />
              </div>
              <div className="flex-1 flex flex-col justify-center px-16" style={{ backgroundColor: '#2d4a2d' }}>
                <p className="text-sm font-bold tracking-[0.2em] uppercase mb-6" style={{ color: '#8BC34A' }}>
                  {content.cover.title}
                </p>
                <h1 className="text-5xl font-extrabold text-white mb-5 leading-[1.1]">
                  {content.cover.subtitle}
                </h1>
                <p className="text-xl text-white/60 mb-10">{content.cover.tagline}</p>
                <div className="w-20 h-1 rounded-full" style={{ backgroundColor: '#8BC34A' }} />
              </div>
              <div className="px-16 py-6 flex items-center justify-between bg-white">
                <p className="text-xs text-gray-400 tracking-wider uppercase">Confidencial</p>
                <p className="text-xs text-gray-400">hipervinculo.net</p>
              </div>
            </div>
          </Page>

          {/* PAGE 2: About */}
          <Page>
            <div className="px-16 py-14" style={{ width: `${PAGE_WIDTH}px`, height: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Sobre Nosotros</p>
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

          {/* PAGE 3: Web Service */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, height: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Servicio 1</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.webService.title}</h2>
              <p className="font-medium mb-6" style={{ color: '#8BC34A' }}>{content.webService.headline}</p>
              <div className="rounded-2xl px-8 py-5 mb-8 flex items-center justify-between" style={{ backgroundColor: '#2d4a2d' }}>
                <div><div className="text-white/50 text-xs font-bold uppercase tracking-widest">Inversión</div></div>
                <div className="text-right">
                  <span className="text-4xl font-extrabold text-white">{content.webService.price}</span>
                  <span className="text-white/50 text-sm ml-2">{content.webService.priceLabel}</span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">{content.webService.description}</p>
              <div className="space-y-2.5 flex-1">
                {content.webService.includes.map((item, i) => (
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

          {/* PAGE 4: Google Ads Service */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, height: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-6" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Servicio 2</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.googleAdsService.title}</h2>
              <p className="font-medium mb-4" style={{ color: '#8BC34A' }}>{content.googleAdsService.headline}</p>
              <div className="rounded-2xl px-8 py-4 mb-5" style={{ backgroundColor: '#2d4a2d' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Retainer Mensual</div>
                    <div className="text-white/40 text-xs mt-1">Mes a Mes</div>
                  </div>
                  <span className="text-4xl font-extrabold text-white">{content.googleAdsService.retainer}</span>
                </div>
                <div className="border-t border-white/10 mt-3 pt-3 flex items-center justify-between">
                  <div>
                    <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Inversión en Medios Recomendada</div>
                    <div className="text-white/40 text-xs mt-1">{content.googleAdsService.mediaSpendNote}</div>
                  </div>
                  <span className="text-2xl font-extrabold text-white">{content.googleAdsService.mediaSpend}</span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4 text-[15px]">{content.googleAdsService.description}</p>
              <div className="space-y-2">
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

          {/* PAGE 5: Meta Ads Service */}
          <Page>
            <div className="px-16 py-12 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, height: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-5" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-1.5" style={{ color: '#8BC34A' }}>Servicio 3</p>
              <h2 className="text-2xl font-extrabold mb-0.5" style={{ color: '#2d4a2d' }}>{content.metaAdsService.title}</h2>
              <p className="font-medium text-sm mb-3" style={{ color: '#8BC34A' }}>{content.metaAdsService.headline}</p>
              <div className="rounded-2xl px-8 py-3.5 mb-3" style={{ backgroundColor: '#2d4a2d' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Retainer Mensual</div>
                    <div className="text-white/40 text-xs mt-0.5">Incluye hasta 10 creativos UGC con IA</div>
                  </div>
                  <span className="text-4xl font-extrabold text-white">{content.metaAdsService.retainer}</span>
                </div>
                <div className="border-t border-white/10 mt-2.5 pt-2.5 flex items-center justify-between">
                  <div>
                    <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Inversión en Medios Recomendada</div>
                    <div className="text-white/40 text-xs mt-0.5">{content.metaAdsService.mediaSpendNote}</div>
                  </div>
                  <span className="text-2xl font-extrabold text-white">{content.metaAdsService.mediaSpend}</span>
                </div>
              </div>
              <p className="text-gray-600 leading-snug mb-2 text-[13px]">{content.metaAdsService.description}</p>
              <p className="text-[12px] font-medium mb-3 px-4 py-2.5 rounded-xl" style={{ backgroundColor: 'rgba(139,195,74,0.1)', color: '#2d4a2d' }}>
                🎨 {content.metaAdsService.creativosNote}
              </p>
              <div className="space-y-1.5 flex-1">
                {content.metaAdsService.includes.map((item, i) => (
                  <div key={i} className="flex gap-3 p-2.5 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                    <div>
                      <h3 className="font-bold text-[13px]" style={{ color: '#2d4a2d' }}>{item.title}</h3>
                      <p className="text-[12px] text-gray-500 mt-0.5 leading-snug">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* PAGE 6: Bot Service - What it does */}
          <Page>
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, height: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="w-10 h-1 rounded-full mb-6" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Servicio 4</p>
              <h2 className="text-3xl font-extrabold mb-1" style={{ color: '#2d4a2d' }}>{content.botService.title}</h2>
              <p className="font-medium mb-4" style={{ color: '#8BC34A' }}>{content.botService.headline}</p>

              {/* Setup price */}
              <div className="rounded-2xl px-8 py-4 mb-5 flex items-center justify-between" style={{ backgroundColor: '#2d4a2d' }}>
                <div>
                  <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Setup e Instalación</div>
                  <div className="text-white/40 text-xs mt-1">Pago único</div>
                </div>
                <span className="text-4xl font-extrabold text-white">{content.botService.setupPrice}</span>
              </div>

              <p className="text-gray-600 leading-relaxed mb-4 text-[14px]">{content.botService.description}</p>

              <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: '#8BC34A' }}>El setup incluye:</p>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {content.botService.setupIncludes.map((item, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                    <p className="text-[13px] text-gray-600">{item}</p>
                  </div>
                ))}
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: '#8BC34A' }}>{content.botService.whyBot.title}</p>
              <div className="space-y-2 flex-1">
                {content.botService.whyBot.features.map((feat, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ backgroundColor: '#f8f9f5' }}>
                    <Bot className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                    <div>
                      <h3 className="font-bold text-[13px]" style={{ color: '#2d4a2d' }}>{feat.title}</h3>
                      <p className="text-[12px] text-gray-500 mt-0.5 leading-relaxed">{feat.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[12px] text-gray-500 mt-4 italic leading-relaxed border-l-2 pl-4" style={{ borderColor: '#8BC34A' }}>
                {content.botService.customBotNote}
              </p>
            </div>
          </Page>

          {/* PAGE 7: Bot Pricing Table */}
          <Page bg="#f8f9f5">
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, height: `${PAGE_HEIGHT}px`, backgroundColor: '#f8f9f5' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Planes del Bot</p>
              <h2 className="text-3xl font-extrabold mb-2" style={{ color: '#2d4a2d' }}>{content.botService.pricing.title}</h2>
              <p className="font-medium mb-6" style={{ color: '#8BC34A' }}>{content.botService.pricing.headline}</p>

              {/* Plan descriptions */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {(['starter', 'growth', 'advanced'] as const).map((planKey) => {
                  const plan = content.botService.pricing.plans[planKey];
                  return (
                    <div key={planKey} className="bg-white rounded-2xl p-5 relative" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: plan.recommended ? '2px solid #8BC34A' : '1px solid #e5e7eb' }}>
                      {plan.recommended && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: '#8BC34A' }}>
                          Recomendado
                        </div>
                      )}
                      <h3 className="font-extrabold text-lg mb-3" style={{ color: '#2d4a2d' }}>{plan.name}</h3>
                      <ul className="space-y-1.5">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex gap-2 items-start text-[12px] text-gray-600">
                            <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: '#8BC34A' }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Pricing table */}
              <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div className="grid grid-cols-4 text-center py-3 font-bold text-[13px]" style={{ backgroundColor: '#2d4a2d', color: 'white' }}>
                  <div>Conversaciones / Mes</div>
                  <div>Starter</div>
                  <div>Growth ⭐</div>
                  <div>Advanced</div>
                </div>
                {content.botService.pricing.tiers.map((tier, i) => (
                  <div key={i} className={`grid grid-cols-4 text-center py-3.5 text-[13px] ${i % 2 === 0 ? 'bg-white' : ''}`} style={{ backgroundColor: i % 2 !== 0 ? '#f8f9f5' : undefined }}>
                    <div className="font-bold" style={{ color: '#2d4a2d' }}>{tier.contacts}</div>
                    <div className="text-gray-600">{tier.starter}</div>
                    <div className="font-bold" style={{ color: '#8BC34A' }}>{tier.growth}</div>
                    <div className="text-gray-600">{tier.advanced}</div>
                  </div>
                ))}
              </div>

              <p className="text-[12px] text-gray-500 mt-4 text-center">{content.botService.pricing.note}</p>
            </div>
          </Page>

          {/* PAGE 8: Investment Summary */}
          <Page bg="#f8f9f5">
            <div className="px-16 py-14 flex flex-col" style={{ width: `${PAGE_WIDTH}px`, height: `${PAGE_HEIGHT}px`, backgroundColor: '#f8f9f5' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: '#8BC34A' }}>Inversión</p>
              <h2 className="text-3xl font-extrabold mb-2" style={{ color: '#2d4a2d' }}>{content.investment.title}</h2>
              <p className="font-medium mb-10" style={{ color: '#8BC34A' }}>{content.investment.headline}</p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {/* Setup investments */}
                <div className="bg-white rounded-2xl p-8" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <h3 className="font-bold text-lg mb-6" style={{ color: '#2d4a2d' }}>{content.investment.setup.title}</h3>
                  {content.investment.setup.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">{item.name}</span>
                      <span className="font-bold text-lg" style={{ color: '#2d4a2d' }}>{item.price}</span>
                    </div>
                  ))}
                  <div className="border-t pt-4 mt-4 flex items-center justify-between">
                    <span className="font-bold text-sm" style={{ color: '#2d4a2d' }}>Total Inicial</span>
                    <span className="text-3xl font-extrabold" style={{ color: '#8BC34A' }}>{content.investment.setup.total}</span>
                  </div>
                </div>

                {/* Monthly */}
                <div className="bg-white rounded-2xl p-8" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <h3 className="font-bold text-lg mb-6" style={{ color: '#2d4a2d' }}>{content.investment.monthly.title}</h3>
                  {content.investment.monthly.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">{item.name}</span>
                      <span className="font-bold" style={{ color: '#2d4a2d' }}>{item.price}</span>
                    </div>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <p className="text-[12px] text-gray-500 whitespace-pre-line leading-relaxed">{content.investment.monthly.mediaNote}</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <p className="text-xs text-gray-400 text-center leading-relaxed">{content.investment.note}</p>
              </div>
            </div>
          </Page>

          {/* PAGE 9: Terms & Conditions */}
          <Page>
            <div className="px-16 py-14" style={{ width: `${PAGE_WIDTH}px`, height: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
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
                      <div>
                        <h3 className="font-bold text-[15px]" style={{ color: '#2d4a2d' }}>{section.title}</h3>
                        <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{section.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Page>

          {/* PAGE 10: Legal Terms */}
          <Page bg="#f8f9f5">
            <div className="px-16 py-14" style={{ width: `${PAGE_WIDTH}px`, height: `${PAGE_HEIGHT}px`, backgroundColor: '#f8f9f5' }}>
              <div className="w-10 h-1 rounded-full mb-8" style={{ backgroundColor: '#8BC34A' }} />
              <h2 className="text-3xl font-extrabold mb-10" style={{ color: '#2d4a2d' }}>{content.legalTerms.title}</h2>
              <div className="space-y-8">
                {content.legalTerms.sections.map((section, i) => (
                  <div key={i}>
                    <h3 className="font-extrabold text-[15px] mb-3" style={{ color: '#2d4a2d' }}>{section.heading}</h3>
                    <ol className="space-y-2.5 pl-6 list-decimal">
                      {section.items.map((item, j) => (
                        <li key={j} className="text-sm text-gray-600 leading-relaxed pl-1">{item}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
          </Page>

          {/* PAGE 11: Contact + Closing */}
          <Page>
            <div className="flex flex-col" style={{ width: `${PAGE_WIDTH}px`, height: `${PAGE_HEIGHT}px`, backgroundColor: '#ffffff' }}>
              <div className="px-16 py-14 flex-1" style={{ backgroundColor: '#2d4a2d' }}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: '#8BC34A' }}>Contáctenos</p>
                <h2 className="text-3xl font-extrabold text-white mb-3">{content.contact.title}</h2>
                <p className="text-white/60 mb-10 text-[15px]">{content.contact.description}</p>
                <div className="grid grid-cols-2 gap-8 text-white/80">
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] mb-1.5" style={{ color: 'rgba(139,195,74,0.5)' }}>Email</p>
                      <p className="text-lg font-medium">{content.contact.email}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] mb-1.5" style={{ color: 'rgba(139,195,74,0.5)' }}>Teléfono</p>
                      <p className="text-lg font-medium">{content.contact.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] mb-1.5" style={{ color: 'rgba(139,195,74,0.5)' }}>Ubicación</p>
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
                  Sistemas de crecimiento basados en resultados para negocios listos para escalar.
                </p>
              </div>
            </div>
          </Page>

        </div>
      </div>
    </div>
  );
}
