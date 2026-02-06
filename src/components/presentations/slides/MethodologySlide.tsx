import logoHipervinculo from '@/assets/logo-hipervinculo.png';

interface MethodologySlideProps {
  title?: string;
  phase: string;
  items: Array<{ title: string; description: string }>;
  phaseNumber?: number;
}

export function MethodologySlide({ title, phase, items, phaseNumber = 1 }: MethodologySlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col p-8 overflow-hidden" style={{ backgroundColor: '#f8f9f5' }}>
      {/* Header with logo */}
      <div className="flex items-center justify-between mb-4">
        <img src={logoHipervinculo} alt="Hipervinculo" className="h-8" />
        <div className="w-12 h-1" style={{ backgroundColor: '#8BC34A' }} />
      </div>
      
      {/* Title (only on first methodology slide) */}
      {title && (
        <h2 
          className="text-2xl md:text-3xl font-extrabold mb-3"
          style={{ color: '#2d4a2d' }}
        >
          {title}
        </h2>
      )}
      
      {/* Phase header */}
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-extrabold text-white"
          style={{ backgroundColor: '#8BC34A' }}
        >
          {phaseNumber}
        </div>
        <h3 
          className="text-xl md:text-2xl font-bold"
          style={{ color: '#2d4a2d' }}
        >
          {phase}
        </h3>
      </div>
      
      {/* Methodology items */}
      <div className="grid grid-cols-1 gap-2 flex-1">
        {items.map((item, index) => (
          <div 
            key={index}
            className="p-3 rounded-lg bg-white flex gap-3 items-start"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            <div 
              className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: 'rgba(45, 74, 45, 0.1)', color: '#2d4a2d' }}
            >
              {String.fromCharCode(65 + index)}
            </div>
            <div>
              <h4 className="font-bold text-sm mb-0.5" style={{ color: '#2d4a2d' }}>
                {item.title}
              </h4>
              <p className="text-gray-600 text-xs leading-snug">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {[1, 2, 3, 4].map((num) => (
          <div 
            key={num}
            className="w-2.5 h-2.5 rounded-full transition-colors"
            style={{ 
              backgroundColor: num === phaseNumber ? '#8BC34A' : 'rgba(139, 195, 74, 0.2)'
            }}
          />
        ))}
      </div>
    </div>
  );
}
