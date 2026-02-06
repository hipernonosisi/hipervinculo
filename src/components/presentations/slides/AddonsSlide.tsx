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
    <div className="relative w-full h-full flex flex-col p-12 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-6">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-10" />
        <div className="w-16 h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      
      {/* Title */}
      <h2 
        className="text-4xl md:text-5xl font-extrabold mb-8"
        style={{ color: '#2d4a2d' }}
      >
        {content.title}
      </h2>
      
      {/* Add-on items */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        {content.items.map((item, index) => (
          <div 
            key={index}
            className="p-5 rounded-xl bg-white flex gap-4"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(139, 195, 74, 0.15)' }}
            >
              <Plus className="w-5 h-5" style={{ color: '#8BC34A' }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold" style={{ color: '#2d4a2d' }}>
                  {item.title}
                </h3>
                <span 
                  className="font-bold text-sm"
                  style={{ color: '#8BC34A' }}
                >
                  {item.price}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
