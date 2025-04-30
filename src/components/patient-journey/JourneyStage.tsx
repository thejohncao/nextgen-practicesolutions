
import React, { useState, useEffect } from 'react';
import { JourneyStage as JourneyStageType } from '@/data/patientJourney';
import AgentOrb from '../team/agent/AgentOrb';
import { getTooltipText } from '../team/utils/getTooltipText';
import { cn } from '@/lib/utils';
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation';
import TypingIndicator from '../journey/TypingIndicator';
import ChatSimulation from '../journey/ChatSimulation';

interface JourneyStageProps {
  stage: JourneyStageType;
  isActive: boolean;
  onActivate?: () => void;
  compact?: boolean;
}

const JourneyStage: React.FC<JourneyStageProps> = ({
  stage,
  isActive,
  onActivate,
  compact = false
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [containerRef, isVisible] = useIntersectionAnimation<HTMLDivElement>({
    threshold: 0.7,
    triggerOnce: true
  });
  
  // Handle chat animation sequence
  useEffect(() => {
    if (isActive && isVisible) {
      // First show typing indicator
      setIsTyping(true);
      setShowChat(false);
      
      // After delay, hide typing and show chat
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setShowChat(true);
        
        if (onActivate) {
          onActivate();
        }
      }, 1500);
      
      return () => clearTimeout(typingTimer);
    }
  }, [isActive, isVisible, onActivate]);
  
  const handleStageClick = () => {
    if (onActivate) {
      onActivate();
    }
  };
  
  if (compact) {
    // Compact version for grid layouts
    return (
      <div 
        ref={containerRef}
        onClick={handleStageClick}
        className={cn(
          "cursor-pointer transition-all duration-300",
          "flex flex-col items-center text-center gap-3",
          isActive ? "opacity-100" : "opacity-80 hover:opacity-100"
        )}
      >
        <div className="mb-1">
          <span className="text-sm font-medium text-white/60">{stage.number}</span>
        </div>
        
        <AgentOrb 
          name={stage.agent.name}
          role={stage.agent.title}
          color={stage.agent.color}
          tooltipText={getTooltipText(stage.agent.name)}
          isActive={isActive}
          displayMode="initial"
          showLabel={true}
        />
        
        <h3 className="text-base font-bold text-white">{stage.name}</h3>
        
        {isTyping && (
          <div className="h-6 w-full">
            <TypingIndicator agent={stage.agent.name} small={true} />
          </div>
        )}
      </div>
    );
  }
  
  // Full version
  return (
    <div 
      ref={containerRef}
      className={cn(
        "p-6 rounded-xl transition-all duration-300",
        isActive ? "shadow-lg" : ""
      )}
      onClick={handleStageClick}
    >
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="flex-shrink-0">
          <AgentOrb 
            name={stage.agent.name}
            role={stage.agent.title}
            color={stage.agent.color}
            tooltipText={getTooltipText(stage.agent.name)}
            isActive={isActive}
            displayMode="fullName"
            showLabel={true}
          />
        </div>
        
        <div className="flex-grow">
          <div className="flex items-center mb-3 gap-2">
            <span className="text-2xl font-bold text-white/40 font-heading">{stage.number}</span>
            <h3 className="text-xl font-bold text-white">{stage.name}</h3>
          </div>
          
          <div className="relative min-h-[100px]">
            {isTyping && <TypingIndicator agent={stage.agent.name} />}
            
            {showChat && (
              <ChatSimulation
                agentName={stage.agent.name}
                agentRole={stage.agent.title}
                messages={stage.sampleChat}
                onClose={() => setShowChat(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyStage;
