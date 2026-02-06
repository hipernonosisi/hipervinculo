import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { CheckCircle } from 'lucide-react';

interface PricingSlideProps {
  content: {
    title: string;
    headline: string;
    setup: {
      title: string;
      price: string;
      includes: string[];
    };
    monthly: {
      title: string;
      price: string;
      includes: string[];
    };
    note: string;
  };
}

export function PricingSlide({ content }: PricingSlideProps) {
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
      
      {/* Pricing cards */}
      <div className="grid grid-cols-2 gap-6 flex-1">
        {/* Setup pricing */}
        <div 
          className="p-6 rounded-2xl bg-white flex flex-col"
          style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
        >
          <h3 className="text-xl font-bold mb-2" style={{ color: '#2d4a2d' }}>
            {content.setup.title}
          </h3>
          <div 
            className="text-3xl font-extrabold mb-4"
            style={{ color: '#8BC34A' }}
          >
            {content.setup.price}
          </div>
          <div className="space-y-2 flex-1">
            {content.setup.includes.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#8BC34A' }} />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Monthly pricing */}
        <div 
          className="p-6 rounded-2xl flex flex-col"
          style={{ backgroundColor: '#2d4a2d' }}
        >
          <h3 className="text-xl font-bold mb-2 text-white">
            {content.monthly.title}
          </h3>
          <div 
            className="text-3xl font-extrabold mb-4"
            style={{ color: '#8BC34A' }}
          >
            {content.monthly.price}
          </div>
          <div className="space-y-2 flex-1">
            {content.monthly.includes.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#8BC34A' }} />
                <span className="text-white/90 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Note */}
      <div 
        className="mt-6 p-4 rounded-xl text-center"
        style={{ backgroundColor: 'rgba(139, 195, 74, 0.1)' }}
      >
        <p className="font-medium" style={{ color: '#2d4a2d' }}>
          {content.note}
        </p>
      </div>
    </div>
  );
}
