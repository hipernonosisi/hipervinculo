import { useRef } from 'react';
import { Download, CheckCircle, FileText, RefreshCw, Server, Calendar, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { skyscraperProposalContent } from './data/skyscraperProposalContent';
import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import symbolHipervinculo from '@/assets/symbol-hipervinculo.png';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const iconMap: Record<string, React.ElementType> = {
  files: FileText,
  refresh: RefreshCw,
  server: Server,
  calendar: Calendar,
  dollar: DollarSign,
  clock: Clock,
};

export function SkyscraperProposal() {
  const documentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const content = skyscraperProposalContent;

  const handleDownloadPDF = async () => {
    if (!documentRef.current) return;
    toast({ title: 'Generating PDF...', description: 'Please wait while we prepare your document.' });

    try {
      const canvas = await html2canvas(documentRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = -(imgHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Proposal-Skyscraper-Construction.pdf');
      toast({ title: 'PDF Downloaded!', description: 'Your proposal has been saved.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to generate PDF.', variant: 'destructive' });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-10">
        <h2 className="text-sm sm:text-lg font-bold" style={{ color: '#2d4a2d' }}>
          Proposal — Skyscraper Construction
        </h2>
        <Button onClick={handleDownloadPDF} size="sm" className="gap-2" style={{ backgroundColor: '#8BC34A' }}>
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </div>

      {/* Scrollable Document */}
      <div className="flex-1 overflow-y-auto bg-gray-200 py-8">
        <div ref={documentRef} className="mx-auto bg-white shadow-xl" style={{ maxWidth: '800px', width: '100%' }}>
          {/* Cover */}
          <section className="relative p-12 pb-16" style={{ backgroundColor: '#2d4a2d', minHeight: '400px' }}>
            <img src={logoHipervinculo} alt="Hipervinculo" className="h-10 mb-12" style={{ filter: 'brightness(10)' }} />
            <div className="mt-auto">
              <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: '#8BC34A' }}>
                {content.cover.title}
              </p>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                {content.cover.subtitle}
              </h1>
              <p className="text-lg text-white/70">{content.cover.tagline}</p>
            </div>
            <div className="absolute bottom-0 right-0 w-48 h-48" style={{ background: 'linear-gradient(315deg, rgba(139,195,74,0.15) 0%, transparent 100%)' }} />
          </section>

          {/* About */}
          <section className="p-8 sm:p-12 border-b">
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#8BC34A' }}>About Us</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: '#2d4a2d' }}>{content.about.title}</h2>
            <p className="font-medium mb-4" style={{ color: '#8BC34A' }}>{content.about.headline}</p>
            <p className="text-gray-600 leading-relaxed mb-6">{content.about.description}</p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {content.about.stats.map((stat, i) => (
                <div key={i} className="text-center p-4 rounded-xl" style={{ backgroundColor: 'rgba(139,195,74,0.08)' }}>
                  <div className="text-2xl font-extrabold" style={{ color: '#8BC34A' }}>{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {content.about.credentials.map((cred, i) => (
                <span key={i} className="text-xs font-medium px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(139,195,74,0.1)', color: '#2d4a2d' }}>
                  {cred}
                </span>
              ))}
            </div>
          </section>

          {/* Web Service */}
          <section className="p-8 sm:p-12 border-b" style={{ backgroundColor: '#f8f9f5' }}>
            <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#8BC34A' }}>Service 1</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#2d4a2d' }}>{content.webService.title}</h2>
                <p className="font-medium mt-1" style={{ color: '#8BC34A' }}>{content.webService.headline}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold" style={{ color: '#8BC34A' }}>{content.webService.price}</div>
                <div className="text-xs text-gray-500">{content.webService.priceLabel}</div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">{content.webService.description}</p>
            <div className="space-y-3">
              {content.webService.includes.map((item, i) => (
                <div key={i} className="flex gap-3 bg-white p-4 rounded-xl" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(139,195,74,0.15)' }}>
                    <CheckCircle className="w-4 h-4" style={{ color: '#8BC34A' }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: '#2d4a2d' }}>{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Lead Gen Service */}
          <section className="p-8 sm:p-12 border-b">
            <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#8BC34A' }}>Service 2</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#2d4a2d' }}>{content.leadGenService.title}</h2>
                <p className="font-medium mt-1" style={{ color: '#8BC34A' }}>{content.leadGenService.headline}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold" style={{ color: '#8BC34A' }}>{content.leadGenService.retainer}</div>
                <div className="text-xs text-gray-500">{content.leadGenService.retainerLabel}</div>
                <div className="mt-2 pt-2 border-t">
                  <div className="text-xl font-extrabold" style={{ color: '#8BC34A' }}>{content.leadGenService.mediaSpend}</div>
                  <div className="text-xs text-gray-500">{content.leadGenService.mediaSpendLabel}</div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">{content.leadGenService.description}</p>
            <div className="space-y-3">
              {content.leadGenService.includes.map((item, i) => (
                <div key={i} className="flex gap-3 bg-white p-4 rounded-xl" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(139,195,74,0.15)' }}>
                    <CheckCircle className="w-4 h-4" style={{ color: '#8BC34A' }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: '#2d4a2d' }}>{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-0.5">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Investment Summary */}
          <section className="p-8 sm:p-12 border-b" style={{ backgroundColor: '#f8f9f5' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#8BC34A' }}>Investment</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: '#2d4a2d' }}>{content.investment.title}</h2>
            <p className="font-medium mb-6" style={{ color: '#8BC34A' }}>{content.investment.headline}</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {/* Setup */}
              <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h3 className="font-bold text-lg mb-1" style={{ color: '#2d4a2d' }}>{content.investment.setup.title}</h3>
                <div className="text-2xl font-extrabold mb-4" style={{ color: '#8BC34A' }}>{content.investment.setup.price}</div>
                <ul className="space-y-2">
                  {content.investment.setup.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#8BC34A' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Monthly */}
              <div className="bg-white rounded-xl p-6" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h3 className="font-bold text-lg mb-1" style={{ color: '#2d4a2d' }}>{content.investment.monthly.title}</h3>
                <div className="text-2xl font-extrabold mb-4" style={{ color: '#8BC34A' }}>{content.investment.monthly.price}</div>
                <ul className="space-y-2">
                  {content.investment.monthly.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#8BC34A' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center">{content.investment.note}</p>
          </section>

          {/* Terms & Conditions */}
          <section className="p-8 sm:p-12 border-b">
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#8BC34A' }}>Terms</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: '#2d4a2d' }}>{content.terms.title}</h2>
            <p className="font-medium mb-6" style={{ color: '#8BC34A' }}>{content.terms.headline}</p>
            <div className="space-y-3">
              {content.terms.sections.map((section, i) => {
                const Icon = iconMap[section.icon] || FileText;
                return (
                  <div key={i} className="flex gap-3 bg-white p-4 rounded-xl" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(139,195,74,0.15)' }}>
                      <Icon className="w-4 h-4" style={{ color: '#8BC34A' }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm" style={{ color: '#2d4a2d' }}>{section.title}</h3>
                      <p className="text-sm text-gray-600 mt-0.5">{section.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Contact */}
          <section className="relative" style={{ backgroundColor: '#2d4a2d' }}>
            <div className="grid sm:grid-cols-2">
              <div className="p-8 sm:p-12">
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#8BC34A' }}>Contact Us</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">{content.contact.title}</h2>
                <p className="text-white/70 mb-8">{content.contact.description}</p>
                <div className="space-y-4 text-white/80 text-sm">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Email</p>
                    <p>{content.contact.email}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Phone</p>
                    <p>{content.contact.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Location</p>
                    <p className="whitespace-pre-line">{content.contact.address}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Website</p>
                    <p>{content.contact.website}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center p-8 bg-white/5">
                <img src={symbolHipervinculo} alt="Hipervinculo" className="w-32 opacity-40" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
