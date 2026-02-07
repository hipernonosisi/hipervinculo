import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { ArrowRight } from 'lucide-react';

interface OtherServicesSlideProps {
  content: {
    title: string;
    headline: string;
    services: Array<{
      title: string;
      description: string;
    }>;
  };
}

export function OtherServicesSlide({ content }: OtherServicesSlideProps) {
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
      
      {/* Services grid - 3 columns */}
      <div className="grid grid-cols-3 gap-4 flex-1">
        {content.services.map((service, index) => (
          <div 
            key={index}
            className="p-4 rounded-xl bg-white flex items-start gap-3"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(139, 195, 74, 0.15)' }}
            >
              <ArrowRight className="w-5 h-5" style={{ color: '#8BC34A' }} />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg mb-1" style={{ color: '#2d4a2d' }}>
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
