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
    <div className="relative w-full h-full flex flex-col p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-4">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-8" />
        <div className="w-12 h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      
      {/* Title */}
      <h2 
        className="text-2xl md:text-3xl font-extrabold mb-1"
        style={{ color: '#2d4a2d' }}
      >
        {content.title}
      </h2>
      
      {/* Headline */}
      <p 
        className="text-lg font-medium mb-4"
        style={{ color: '#8BC34A' }}
      >
        {content.headline}
      </p>
      
      {/* Metrics grid */}
      <div className="grid grid-cols-3 gap-3 mb-4 flex-1">
        {content.metrics.map((metric, index) => (
          <div 
            key={index}
            className="p-4 rounded-lg bg-white"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-5 h-5" style={{ color: '#8BC34A' }} />
              <h4 className="font-bold text-base md:text-lg" style={{ color: '#2d4a2d' }}>
                {metric.name}
              </h4>
            </div>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
      
      {/* Deliverables */}
      <div 
        className="p-5 rounded-xl"
        style={{ backgroundColor: '#2d4a2d' }}
      >
        <h3 className="text-xl font-bold text-white mb-3">Deliverables</h3>
        <div className="grid grid-cols-2 gap-3">
          {content.deliverables.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#8BC34A' }} />
              <span className="text-white/90 text-base">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
