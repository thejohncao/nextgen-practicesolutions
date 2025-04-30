
import React, { useState, useEffect, useRef } from 'react';
import { patientJourney } from '@/data/patientJourney';
import AgentOrb from '../team/agent/AgentOrb';
import { getTooltipText } from '../team/utils/getTooltipText';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';
import { useIsMobile } from '@/hooks/use-mobile';

const PatientJourneyTimeline = () => {
  const [activeStage, setActiveStage] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Track scroll to highlight current stage
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      const stages = timelineRef.current.querySelectorAll('.timeline-stage');
      stages.forEach((stage, index) => {
        const rect = stage.getBoundingClientRect();
        // Consider a stage "in view" when it's in the middle of the viewport
        const inView = rect.top < window.innerHeight/2 && rect.bottom > window.innerHeight/2;
        
        if (inView && activeStage !== index) {
          setActiveStage(index);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeStage]);

  return (
    <div ref={timelineRef} className="relative py-16">
      {/* Vertical timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/10 z-0">
        {/* Animated progress line that grows as user scrolls */}
        <div 
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-nextgen-purple to-nextgen-blue transition-all duration-700"
          style={{ 
            height: `${Math.min(100, (activeStage + 1) * 33.3)}%`,
            opacity: 0.7 
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-32 md:gap-48 relative">
          {patientJourney.map((stage, index) => {
            // Determine which side to place the content (alternating)
            const isEven = index % 2 === 0;
            const isActive = activeStage === index;
            
            // Create refs to track when this item comes into view
            const [ref, inView] = useInView({
              triggerOnce: false,
              threshold: 0.5,
            });
            
            return (
              <div 
                ref={ref}
                key={stage.number} 
                className={cn(
                  "timeline-stage relative",
                  isMobile ? "ml-0" : (isEven ? "ml-0" : "ml-auto"),
                  "w-full md:w-1/2 transition-all duration-500"
                )}
                style={{
                  opacity: inView ? 1 : 0.3,
                  transform: inView ? 'translateY(0)' : 'translateY(20px)'
                }}
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
                    "border border-white/10 transition-all duration-500"
                  )}
                >
                  <div className="flex flex-col items-center gap-6">
                    {/* Agent orb */}
                    <div className="mb-2">
                      <AgentOrb 
                        name={stage.agent.name}
                        role={stage.agent.title}
                        color={stage.agent.color}
                        tooltipText={getTooltipText(stage.agent.name)}
                        isActive={isActive}
                        showLabel={true}
                        displayMode="fullName"
                      />
                    </div>
                    
                    {/* Stage info */}
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {stage.name}
                      </h3>
                      
                      {/* Sample chat preview */}
                      <div className="mt-4 space-y-2 max-w-md mx-auto">
                        {stage.sampleChat.map((message, chatIndex) => (
                          <div 
                            key={chatIndex} 
                            className={cn(
                              "p-3 rounded-lg text-sm max-w-[80%] animate-fade-in",
                              message.sender === 'visitor' ? 
                                "bg-white/10 text-white ml-auto" : 
                                `bg-${stage.agent.color}-500/20 mr-auto`
                            )}
                            style={{ animationDelay: `${chatIndex * 0.2}s` }}
                          >
                            {message.message}
                          </div>
                        ))}
                      </div>
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

export default PatientJourneyTimeline;
