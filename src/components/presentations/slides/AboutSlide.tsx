import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { CheckCircle } from 'lucide-react';

interface AboutSlideProps {
  content: {
    title: string;
    description: string;
    stats: Array<{ value: string; label: string }>;
    credentials: string[];
  };
}

export function AboutSlide({ content }: AboutSlideProps) {
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
      
      {/* Description */}
      <p className="text-base text-gray-700 mb-6 max-w-4xl leading-relaxed">
        {content.description}
      </p>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {content.stats.map((stat, index) => (
          <div 
            key={index}
            className="p-6 rounded-xl text-center"
            style={{ backgroundColor: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
          >
            <div 
              className="text-4xl md:text-5xl font-extrabold mb-2"
              style={{ color: '#8BC34A' }}
            >
              {stat.value}
            </div>
            <div className="text-sm md:text-base font-medium text-gray-600">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      
      {/* Credentials */}
      <div className="grid grid-cols-2 gap-4">
        {content.credentials.map((credential, index) => (
          <div key={index} className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#8BC34A' }} />
            <span className="text-gray-700 text-base md:text-lg font-medium">{credential}</span>
          </div>
        ))}
      </div>
      
      {/* Decorative corner */}
      <div 
        className="absolute bottom-0 right-0 w-32 h-32"
        style={{
          background: 'linear-gradient(315deg, rgba(139, 195, 74, 0.1) 0%, transparent 100%)'
        }}
      />
    </div>
  );
}
