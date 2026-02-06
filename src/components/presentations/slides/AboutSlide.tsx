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
    <div className="relative w-full h-full flex flex-col p-12 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-8">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-10" />
        <div className="w-16 h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      
      {/* Title */}
      <h2 
        className="text-4xl md:text-5xl font-extrabold mb-6"
        style={{ color: '#2d4a2d' }}
      >
        {content.title}
      </h2>
      
      {/* Description */}
      <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-4xl leading-relaxed">
        {content.description}
      </p>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-8 mb-10">
        {content.stats.map((stat, index) => (
          <div 
            key={index}
            className="p-6 rounded-2xl text-center"
            style={{ backgroundColor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
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
            <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#8BC34A' }} />
            <span className="text-gray-700 font-medium">{credential}</span>
          </div>
        ))}
      </div>
      
      {/* Decorative corner */}
      <div 
        className="absolute bottom-0 right-0 w-48 h-48"
        style={{
          background: 'linear-gradient(315deg, rgba(139, 195, 74, 0.1) 0%, transparent 100%)'
        }}
      />
    </div>
  );
}
