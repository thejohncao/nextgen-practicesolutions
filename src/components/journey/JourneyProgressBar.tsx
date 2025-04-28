
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface JourneyProgressBarProps {
  currentStage: number;
  totalStages: number;
}

const JourneyProgressBar = ({ currentStage, totalStages }: JourneyProgressBarProps) => {
  const progress = (currentStage / totalStages) * 100;
  
  return (
    <div className="w-full max-w-[240px] flex items-center gap-4">
      <Progress 
        value={progress} 
        className="h-1.5 bg-white/10 rounded-full overflow-hidden" 
        indicatorClassName="bg-white/80 transition-all duration-500 ease-in-out"
      />
      <span className="text-sm text-white/70 whitespace-nowrap">
        Stage {currentStage} of {totalStages}
      </span>
    </div>
  );
};

export default JourneyProgressBar;
