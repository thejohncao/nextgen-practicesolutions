
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
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-20 hidden md:flex flex-col gap-4">
      {Array.from({ length: totalStages }).map((_, index) => (
        <button
          key={index}
          onClick={() => onStageClick?.(index + 1)}
          className={cn(
            "w-4 h-4 rounded-full transition-all duration-500",
            "border-2 border-white/30 hover:scale-125",
            activeStage === index + 1 
              ? "bg-white scale-110 hover:scale-125" 
              : "bg-white/20 hover:bg-white/50"
          )}
          aria-label={`Go to stage ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default VerticalProgressIndicator;
