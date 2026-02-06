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
      <div className="grid grid-cols-3 gap-2 mb-4">
        {content.metrics.map((metric, index) => (
          <div 
            key={index}
            className="p-3 rounded-lg bg-white"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <BarChart3 className="w-4 h-4" style={{ color: '#8BC34A' }} />
              <h4 className="font-bold text-xs" style={{ color: '#2d4a2d' }}>
                {metric.name}
              </h4>
            </div>
            <p className="text-xs text-gray-600 leading-snug">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
      
      {/* Deliverables */}
      <div 
        className="p-4 rounded-xl"
        style={{ backgroundColor: '#2d4a2d' }}
      >
        <h3 className="text-base font-bold text-white mb-2">Deliverables</h3>
        <div className="grid grid-cols-2 gap-2">
          {content.deliverables.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#8BC34A' }} />
              <span className="text-white/90 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
