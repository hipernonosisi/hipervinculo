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
      <div className="grid grid-cols-3 gap-4 mb-6 flex-1">
        {content.metrics.map((metric, index) => (
          <div 
            key={index}
            className="p-5 rounded-xl bg-white"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6" style={{ color: '#8BC34A' }} />
              <h4 className="font-bold text-lg md:text-xl" style={{ color: '#2d4a2d' }}>
                {metric.name}
              </h4>
            </div>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
      
      {/* Deliverables */}
      <div 
        className="p-6 rounded-xl"
        style={{ backgroundColor: '#2d4a2d' }}
      >
        <h3 className="text-2xl font-bold text-white mb-4">Deliverables</h3>
        <div className="grid grid-cols-2 gap-4">
          {content.deliverables.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#8BC34A' }} />
              <span className="text-white/90 text-lg">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
