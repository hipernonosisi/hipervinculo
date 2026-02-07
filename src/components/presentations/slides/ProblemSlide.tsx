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
    <div className="relative w-full h-full flex flex-col p-3 sm:p-6 md:p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-1 sm:mb-3 md:mb-4">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-4 sm:h-6 md:h-8" />
        <div className="w-8 sm:w-12 h-0.5 sm:h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      
      {/* Title */}
      <h2 
        className="text-sm sm:text-xl md:text-3xl font-extrabold mb-0.5 sm:mb-2"
        style={{ color: '#2d4a2d' }}
      >
        {content.title}
      </h2>
      
      {/* Headline */}
      <p className="text-[8px] sm:text-sm md:text-lg text-gray-700 mb-1 sm:mb-3 md:mb-4 font-medium">
        {content.headline}
      </p>
      
      {/* Problem points */}
      <div className="grid grid-cols-2 gap-1 sm:gap-2 mb-1 sm:mb-3 md:mb-4">
        {content.points.map((point, index) => (
          <div 
            key={index}
            className="flex items-start gap-1 sm:gap-2 p-1 sm:p-2 md:p-3 rounded-md sm:rounded-lg bg-white"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <XCircle className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mt-0.5 flex-shrink-0 text-red-500" />
            <span className="text-gray-700 text-[6px] sm:text-xs md:text-sm leading-tight">{point}</span>
          </div>
        ))}
      </div>
      
      {/* Insight box */}
      <div 
        className="p-1.5 sm:p-3 md:p-4 rounded-md sm:rounded-xl mb-1 sm:mb-3 md:mb-4 flex items-center gap-1 sm:gap-2 md:gap-3"
        style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)' }}
      >
        <AlertTriangle className="w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-500 flex-shrink-0" />
        <p className="text-[7px] sm:text-sm md:text-base font-semibold text-red-700 leading-tight">
          {content.insight}
        </p>
      </div>
      
      {/* Principle */}
      <div 
        className="p-1.5 sm:p-3 md:p-4 rounded-md sm:rounded-xl"
        style={{ backgroundColor: '#2d4a2d' }}
      >
        <p className="text-[8px] sm:text-base md:text-xl font-extrabold text-white mb-0.5 sm:mb-1 leading-tight">
          {content.principle}
        </p>
        <p className="text-white/80 text-[6px] sm:text-xs md:text-sm leading-tight">
          {content.principleNote}
        </p>
      </div>
    </div>
  );
}
