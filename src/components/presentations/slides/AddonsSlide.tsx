import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { Plus } from 'lucide-react';

interface AddonsSlideProps {
  content: {
    title: string;
    items: Array<{
      title: string;
      price: string;
      description: string;
    }>;
  };
}

export function AddonsSlide({ content }: AddonsSlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-4">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-8" />
        <div className="w-12 h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      
      {/* Title */}
      <h2 
        className="text-2xl md:text-3xl font-extrabold mb-4"
        style={{ color: '#2d4a2d' }}
      >
        {content.title}
      </h2>
      
      {/* Add-on items - 3 columns for better fit */}
      <div className="grid grid-cols-3 gap-5 flex-1">
        {content.items.map((item, index) => (
          <div 
            key={index}
            className="p-6 rounded-xl bg-white flex flex-col"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(139, 195, 74, 0.15)' }}
              >
                <Plus className="w-6 h-6" style={{ color: '#8BC34A' }} />
              </div>
              <span 
                className="font-bold text-xl"
                style={{ color: '#8BC34A' }}
              >
                {item.price}
              </span>
            </div>
            <h3 className="font-bold text-xl md:text-2xl mb-2" style={{ color: '#2d4a2d' }}>
              {item.title}
            </h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
