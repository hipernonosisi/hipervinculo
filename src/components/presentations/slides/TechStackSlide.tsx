import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { Server } from 'lucide-react';

interface TechStackSlideProps {
  content: {
    title: string;
    headline: string;
    categories: Array<{
      name: string;
      tools: string[];
    }>;
  };
}

export function TechStackSlide({ content }: TechStackSlideProps) {
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
      
      {/* Tech categories */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        {content.categories.map((category, index) => (
          <div 
            key={index}
            className="p-5 rounded-xl bg-white"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: 'rgba(139, 195, 74, 0.15)' }}
              >
                <Server className="w-5 h-5" style={{ color: '#8BC34A' }} />
              </div>
              <h3 className="font-bold text-lg" style={{ color: '#2d4a2d' }}>
                {category.name}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.tools.map((tool, toolIndex) => (
                <span 
                  key={toolIndex}
                  className="px-3 py-1.5 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: 'rgba(45, 74, 45, 0.08)',
                    color: '#2d4a2d'
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
