
import React from 'react';
import { cn } from '@/lib/utils';

interface VerticalProgressIndicatorProps {
  totalStages: number;
  activeStage: number;
  onStageClick?: (stage: number) => void;
}

const VerticalProgressIndicator = ({ 
  totalStages, 
  activeStage, 
  onStageClick 
}: VerticalProgressIndicatorProps) => {
  return (
    <div className="fixed right-6 md:right-10 top-1/2 transform -translate-y-1/2 z-50 hidden sm:flex flex-col gap-6">
      {Array.from({ length: totalStages }).map((_, index) => {
        const isCurrent = activeStage === index + 1;
        return (
          <button
            key={index}
            onClick={() => onStageClick?.(index + 1)}
            className="relative group"
            aria-label={`Go to stage ${index + 1}`}
          >
            {/* Larger click target with tooltip */}
            <div className={cn(
              "absolute -inset-3 bg-transparent rounded-full transition-opacity duration-300",
              isCurrent ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}>
              <span className="absolute left-0 transform -translate-x-full -translate-y-1/2 top-1/2 px-2 py-1 bg-black/80 backdrop-blur-sm border border-white/10 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-300">
                Stage {index + 1}
              </span>
            </div>
            
            {/* Indicator dot with stronger visual presence */}
            <div className={cn(
              "w-4 h-4 rounded-full transition-all duration-500",
              "border-2 border-white/50 hover:scale-125",
              isCurrent 
                ? "bg-white scale-110 hover:scale-125 shadow-[0_0_12px_rgba(255,255,255,0.7)]" 
                : "bg-white/30 hover:bg-white/60"
            )} />
          </button>
        );
      })}
    </div>
  );
};

export default VerticalProgressIndicator;
