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
    <div className="relative w-full h-full flex flex-col p-12 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-6">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-10" />
        <div className="w-16 h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      
      {/* Title */}
      <h2 
        className="text-4xl md:text-5xl font-extrabold mb-2"
        style={{ color: '#2d4a2d' }}
      >
        {content.title}
      </h2>
      
      {/* Headline */}
      <p 
        className="text-xl md:text-2xl font-medium mb-8"
        style={{ color: '#8BC34A' }}
      >
        {content.headline}
      </p>
      
      {/* Metrics grid */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {content.metrics.map((metric, index) => (
          <div 
            key={index}
            className="p-4 rounded-xl bg-white"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5" style={{ color: '#8BC34A' }} />
              <h4 className="font-bold" style={{ color: '#2d4a2d' }}>
                {metric.name}
              </h4>
            </div>
            <p className="text-sm text-gray-600">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
      
      {/* Deliverables */}
      <div 
        className="p-6 rounded-2xl"
        style={{ backgroundColor: '#2d4a2d' }}
      >
        <h3 className="text-xl font-bold text-white mb-4">Deliverables</h3>
        <div className="grid grid-cols-2 gap-3">
          {content.deliverables.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#8BC34A' }} />
              <span className="text-white/90">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
