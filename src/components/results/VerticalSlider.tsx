import React, { useEffect, useState, useRef } from 'react';
import { AgentResult } from '@/types/agentResults';
import AgentResultCard from './AgentResultCard';
import AgentAvatar from '../AgentAvatar';

interface VerticalSliderProps {
  results: AgentResult[];
  agentName: string; // Added to resolve type errors
  agentRole: string;
  agentColor: 'blue' | 'green' | 'purple' | 'red' | 'gold';
}

const VerticalSlider: React.FC<VerticalSliderProps> = ({ 
  results, 
  agentName,
  agentRole,
  agentColor
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!results || results.length <= 1) return;
    
    if (!paused) {
      timerRef.current = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % results.length);
      }, 5000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, results]);

  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);
  const handleDotClick = (index: number) => setActiveIndex(index);

  if (!results || results.length === 0) return null;

  return (
    <div 
      className="h-full w-full rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm p-4 sm:p-5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Agent header */}
      <div className="flex items-center gap-3 mb-5">
        <AgentAvatar
          name={agentName} 
          role={agentRole}
          color={agentColor}
          size="sm"
        />
        <div>
          <h3 className="text-lg font-bold text-white">{agentName}</h3>
          <p className="text-sm text-white/60">{agentRole}</p>
        </div>
      </div>
      
      {/* Result cards */}
      <div className="relative h-[calc(100%-80px)] overflow-hidden">
        {results.map((result, index) => (
          <div
            key={index}
            className={`absolute w-full transition-all duration-500 ease-in-out ${
              index === activeIndex ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-8 -z-10'
            }`}
          >
            <AgentResultCard 
              result={result} 
              agent={agentName}
              color={agentColor}
            />
          </div>
        ))}
      </div>
      
      {/* Navigation dots */}
      {results.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {results.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === activeIndex ? 'bg-white' : 'bg-white/30'
              }`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to result ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VerticalSlider;
