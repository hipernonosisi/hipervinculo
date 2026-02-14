import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { FileText, RefreshCw, Server, Calendar, DollarSign, Clock } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  files: FileText,
  refresh: RefreshCw,
  server: Server,
  calendar: Calendar,
  dollar: DollarSign,
  clock: Clock,
};

interface ProposalTermsSlideProps {
  content: {
    title: string;
    headline: string;
    sections: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };
}

export function ProposalTermsSlide({ content }: ProposalTermsSlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col p-3 sm:p-6 md:p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-1 sm:mb-2 md:mb-3">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-4 sm:h-6 md:h-8" />
        <div className="w-8 sm:w-12 h-0.5 sm:h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>

      {/* Title */}
      <h2 className="text-sm sm:text-xl md:text-3xl font-extrabold mb-0.5 sm:mb-1" style={{ color: '#2d4a2d' }}>
        {content.title}
      </h2>
      <p className="text-[8px] sm:text-sm md:text-lg font-medium mb-1.5 sm:mb-3 md:mb-4" style={{ color: '#8BC34A' }}>
        {content.headline}
      </p>

      {/* Terms grid */}
      <div className="grid grid-cols-2 gap-1 sm:gap-2 md:gap-3 flex-1">
        {content.sections.map((section, index) => {
          const Icon = iconMap[section.icon] || FileText;
          return (
            <div
              key={index}
              className="p-1.5 sm:p-3 md:p-4 rounded-md sm:rounded-xl bg-white flex gap-1.5 sm:gap-2 md:gap-3"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            >
              <div
                className="w-5 h-5 sm:w-9 sm:h-9 md:w-11 md:h-11 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(139, 195, 74, 0.15)' }}
              >
                <Icon className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5" style={{ color: '#8BC34A' }} />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-[7px] sm:text-sm md:text-base mb-0.5 leading-tight" style={{ color: '#2d4a2d' }}>
                  {section.title}
                </h3>
                <p className="text-gray-600 text-[5px] sm:text-[10px] md:text-sm leading-tight">
                  {section.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Corner decoration */}
      <div
        className="absolute bottom-0 right-0 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32"
        style={{ background: 'linear-gradient(315deg, rgba(139, 195, 74, 0.1) 0%, transparent 100%)' }}
      />
    </div>
  );
}
