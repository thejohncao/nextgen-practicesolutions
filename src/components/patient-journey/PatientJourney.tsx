
import React, { useState } from 'react';
import { patientJourney } from '@/data/patientJourney';
import { useIsMobile } from '@/hooks/use-mobile';
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation';
import { cn } from '@/lib/utils';
import JourneyStage from './JourneyStage';
import JourneyTimeline from './JourneyTimeline';

interface PatientJourneyProps {
  variant?: 'timeline' | 'fullscreen' | 'boardroom';
  className?: string;
}

/**
 * Unified Patient Journey component that can render in different visual styles
 */
const PatientJourney: React.FC<PatientJourneyProps> = ({
  variant = 'timeline',
  className
}) => {
  const [activeStage, setActiveStage] = useState(0);
  const isMobile = useIsMobile();
  const [sectionRef, isVisible] = useIntersectionAnimation();
  
  const handleStageChange = (index: number) => {
    setActiveStage(index);
  };
  
  return (
    <section 
      ref={sectionRef}
      className={cn(
        "py-12 md:py-20 bg-nextgen-dark",
        isVisible && "animate-fade-in",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Built to Run the Full Patient Journey
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto px-4">
            From first click to lifelong loyalty — our AI agents cover it all.
          </p>
        </div>
        
        {variant === 'timeline' && (
          <JourneyTimeline 
            stages={patientJourney} 
            activeStage={activeStage} 
            onStageChange={handleStageChange}
          />
        )}
        
        {variant === 'fullscreen' && (
          <div className="space-y-6 md:space-y-12">
            {patientJourney.map((stage, index) => (
              <div 
                key={stage.number} 
                className={cn(
                  "transition-all duration-500",
                  index === activeStage ? "opacity-100 scale-100" : "opacity-60 scale-95"
                )}
              >
                <JourneyStage
                  stage={stage}
                  isActive={index === activeStage}
                  onActivate={() => handleStageChange(index)}
                />
              </div>
            ))}
          </div>
        )}
        
        {variant === 'boardroom' && (
          <div className={cn(
            isMobile ? "grid grid-cols-1 gap-6" : "grid grid-cols-2 md:grid-cols-4 gap-4"
          )}>
            {patientJourney.map((stage, index) => (
              <div 
                key={stage.number} 
                className={cn(
                  "p-4 rounded-lg",
                  stage.gradientClass,
                  "transition-all duration-300 hover:shadow-lg"
                )}
              >
                <JourneyStage
                  stage={stage}
                  isActive={index === activeStage}
                  onActivate={() => handleStageChange(index)}
                  compact={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PatientJourney;
