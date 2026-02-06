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
    <div className="relative w-full h-full flex flex-col p-12 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-8">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-10" />
        <div className="w-16 h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      
      {/* Title */}
      <h2 
        className="text-4xl md:text-5xl font-extrabold mb-4"
        style={{ color: '#2d4a2d' }}
      >
        {content.title}
      </h2>
      
      {/* Headline */}
      <p className="text-xl md:text-2xl text-gray-700 mb-8 font-medium">
        {content.headline}
      </p>
      
      {/* Problem points */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {content.points.map((point, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 p-4 rounded-xl bg-white"
            style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
          >
            <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-500" />
            <span className="text-gray-700">{point}</span>
          </div>
        ))}
      </div>
      
      {/* Insight box */}
      <div 
        className="p-6 rounded-2xl mb-6 flex items-center gap-4"
        style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)' }}
      >
        <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0" />
        <p className="text-lg font-semibold text-red-700">
          {content.insight}
        </p>
      </div>
      
      {/* Principle */}
      <div 
        className="p-6 rounded-2xl"
        style={{ backgroundColor: '#2d4a2d' }}
      >
        <p className="text-2xl font-extrabold text-white mb-2">
          {content.principle}
        </p>
        <p className="text-white/80">
          {content.principleNote}
        </p>
      </div>
    </div>
  );
}
