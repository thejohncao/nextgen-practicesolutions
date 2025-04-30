
import React from 'react';
import { JourneyStage as JourneyStageType } from '@/data/patientJourney';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation';

interface JourneyTimelineProps {
  stages: JourneyStageType[];
  activeStage: number;
  onStageChange: (index: number) => void;
}

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  stages,
  activeStage,
  onStageChange
}) => {
  const isMobile = useIsMobile();
  const [timelineRef, isVisible] = useIntersectionAnimation<HTMLDivElement>();
  
  return (
    <div 
      ref={timelineRef} 
      className={cn(
        "relative transition-opacity duration-700",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Vertical timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/10 z-0">
        {/* Animated progress line that grows as user scrolls */}
        <div 
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-nextgen-purple to-nextgen-blue transition-all duration-700"
          style={{ 
            height: `${Math.min(100, (activeStage + 1) * 100 / stages.length)}%`,
            opacity: 0.7 
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-24 md:gap-32 relative">
          {stages.map((stage, index) => {
            const isEven = index % 2 === 0;
            const isActive = activeStage === index;
            const [stageRef, isStageVisible] = useIntersectionAnimation<HTMLDivElement>({
              threshold: 0.5,
              delay: index * 100,
            });
            
            return (
              <div 
                ref={stageRef}
                key={stage.number} 
                className={cn(
                  "timeline-stage relative",
                  isMobile ? "ml-0" : (isEven ? "ml-0" : "ml-auto"),
                  "w-full md:w-5/12 transition-all duration-500",
                  isStageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
                onClick={() => onStageChange(index)}
              >
                {/* Stage number bubble */}
                <div 
                  className={cn(
                    "absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10",
                    "w-12 h-12 rounded-full flex items-center justify-center",
                    "transition-all duration-500",
                    isActive ? 
                      `bg-${stage.agent.color}-500/30 border-${stage.agent.color}-500 border-2` : 
                      "bg-black/40 border-white/20 border"
                  )}
                >
                  <span className={cn(
                    "font-bold text-lg",
                    isActive ? "text-white" : "text-white/60"
                  )}>
                    {stage.number}
                  </span>
                </div>
                
                {/* Content card */}
                <div 
                  className={cn(
                    "p-6 rounded-xl",
                    isActive ? stage.gradientClass : "bg-black/20",
                    "border border-white/10 transition-all duration-500",
                    "cursor-pointer hover:shadow-lg"
                  )}
                >
                  <div className="flex flex-col items-center gap-6">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {stage.name}
                      </h3>
                      <p className="text-sm text-white/70">
                        {stage.agent.name} • {stage.agent.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JourneyTimeline;
