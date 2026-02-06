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
      
      {/* Services grid */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        {content.services.map((service, index) => (
          <div 
            key={index}
            className="p-5 rounded-xl bg-white flex items-start gap-4"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
          >
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(139, 195, 74, 0.15)' }}
            >
              <ArrowRight className="w-4 h-4" style={{ color: '#8BC34A' }} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1" style={{ color: '#2d4a2d' }}>
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
