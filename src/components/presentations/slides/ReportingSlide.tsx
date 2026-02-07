import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { BarChart3, CheckCircle } from 'lucide-react';

interface ReportingSlideProps {
  content: {
    title: string;
    headline: string;
    metrics: Array<{ name: string; description: string }>;
    deliverables: string[];
  };
}

export function ReportingSlide({ content }: ReportingSlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col p-3 sm:p-6 md:p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-1 sm:mb-3 md:mb-4">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-4 sm:h-6 md:h-8" />
        <div className="w-8 sm:w-12 h-0.5 sm:h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      
      {/* Title */}
      <h2 
        className="text-sm sm:text-xl md:text-3xl font-extrabold mb-0.5 sm:mb-1"
        style={{ color: '#2d4a2d' }}
      >
        {content.title}
      </h2>
      
      {/* Headline */}
      <p 
        className="text-[8px] sm:text-sm md:text-lg font-medium mb-2 sm:mb-3 md:mb-4"
        style={{ color: '#8BC34A' }}
      >
        {content.headline}
      </p>
      
      {/* Metrics grid */}
      <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-3 mb-2 sm:mb-3 md:mb-4 flex-1">
        {content.metrics.map((metric, index) => (
          <div 
            key={index}
            className="p-1.5 sm:p-3 md:p-4 rounded-md sm:rounded-lg bg-white"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <div className="flex items-center gap-1 sm:gap-2 mb-0.5 sm:mb-1">
              <BarChart3 className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5" style={{ color: '#8BC34A' }} />
              <h4 className="font-bold text-[7px] sm:text-sm md:text-lg leading-tight" style={{ color: '#2d4a2d' }}>
                {metric.name}
              </h4>
            </div>
            <p className="text-[5px] sm:text-xs md:text-base text-gray-600 leading-tight sm:leading-relaxed">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
      
      {/* Deliverables */}
      <div 
        className="p-2 sm:p-4 md:p-5 rounded-md sm:rounded-xl"
        style={{ backgroundColor: '#2d4a2d' }}
      >
        <h3 className="text-[9px] sm:text-base md:text-xl font-bold text-white mb-1 sm:mb-2 md:mb-3">Deliverables</h3>
        <div className="grid grid-cols-2 gap-1 sm:gap-2 md:gap-3">
          {content.deliverables.map((item, index) => (
            <div key={index} className="flex items-center gap-1 sm:gap-2">
              <CheckCircle className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" style={{ color: '#8BC34A' }} />
              <span className="text-white/90 text-[6px] sm:text-xs md:text-base leading-tight">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
