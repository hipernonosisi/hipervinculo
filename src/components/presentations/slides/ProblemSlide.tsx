import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { XCircle, AlertTriangle } from 'lucide-react';

interface ProblemSlideProps {
  content: {
    title: string;
    headline: string;
    points: string[];
    insight: string;
    principle: string;
    principleNote: string;
  };
}

export function ProblemSlide({ content }: ProblemSlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-4">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-8" />
        <div className="w-12 h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      
      {/* Title */}
      <h2 
        className="text-2xl md:text-3xl font-extrabold mb-2"
        style={{ color: '#2d4a2d' }}
      >
        {content.title}
      </h2>
      
      {/* Headline */}
      <p className="text-lg text-gray-700 mb-4 font-medium">
        {content.headline}
      </p>
      
      {/* Problem points */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {content.points.map((point, index) => (
          <div 
            key={index}
            className="flex items-start gap-2 p-3 rounded-lg bg-white"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
            <span className="text-gray-700 text-sm">{point}</span>
          </div>
        ))}
      </div>
      
      {/* Insight box */}
      <div 
        className="p-4 rounded-xl mb-4 flex items-center gap-3"
        style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)' }}
      >
        <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
        <p className="text-base font-semibold text-red-700">
          {content.insight}
        </p>
      </div>
      
      {/* Principle */}
      <div 
        className="p-4 rounded-xl"
        style={{ backgroundColor: '#2d4a2d' }}
      >
        <p className="text-xl font-extrabold text-white mb-1">
          {content.principle}
        </p>
        <p className="text-white/80 text-sm">
          {content.principleNote}
        </p>
      </div>
    </div>
  );
}
