
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
        className="h-1 bg-white/10" 
        indicatorClassName="bg-white/80"
      />
      <span className="text-sm text-white/70">
        Stage {currentStage} of {totalStages}
      </span>
    </div>
  );
};

export default JourneyProgressBar;
