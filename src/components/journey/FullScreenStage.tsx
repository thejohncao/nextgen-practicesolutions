
import React, { useState, useEffect, useRef } from 'react';
import { JourneyStage } from '@/data/patientJourney';
import AgentProfile from './AgentProfile';
import ChatSimulation from './ChatSimulation';
import TypingIndicator from './TypingIndicator';

interface FullScreenStageProps {
  stage: JourneyStage;
  isActive: boolean;
  onInView: () => void;
}

const FullScreenStage = ({ stage, isActive, onInView }: FullScreenStageProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && entries[0].intersectionRatio > 0.5) {
          onInView();
        }
      },
      { threshold: 0.5 }
    );
    
    if (stageRef.current) {
      observer.observe(stageRef.current);
    }
    
    return () => {
      if (stageRef.current) {
        observer.unobserve(stageRef.current);
      }
    };
  }, [onInView]);
  
  // Handle chat animation sequence
  useEffect(() => {
    if (isActive) {
      // First show typing indicator
      setIsTyping(true);
      
      // After 2 seconds, hide typing and show chat
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setShowChat(true);
      }, 1800);
      
      return () => {
        clearTimeout(typingTimer);
      };
    } else {
      // Reset when not active
      setIsTyping(false);
      setShowChat(false);
    }
  }, [isActive]);

  // Handle closing chat
  const handleCloseChat = () => {
    setShowChat(false);
  };
  
  return (
    <div 
      ref={stageRef}
      className={`min-h-screen w-full snap-start py-24 ${stage.gradientClass} flex items-center relative journey-stage`}
      id={`journey-stage-${stage.number}`}
      data-stage={stage.number}
    >
      <div className="container mx-auto px-4 relative">
        <div className="animate-fade-in-up max-w-4xl mx-auto" style={{animationDelay: "0.2s"}}>
          <div className="text-center mb-8">
            <span className="text-5xl md:text-6xl font-bold text-white/40 font-heading tracking-tight">
              {stage.number}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-heading mt-1">
              {stage.name}
            </h2>
          </div>
          
          <AgentProfile agent={stage.agent} />
          
          <div className="relative flex justify-center h-32">
            {isTyping && (
              <div className="absolute top-0 right-0 md:right-12 w-72 animate-fade-in">
                <TypingIndicator agent={stage.agent.name} />
              </div>
            )}
            
            {showChat && (
              <div className="absolute top-0 right-0 md:right-12 w-72">
                <ChatSimulation 
                  agentName={stage.agent.name}
                  agentRole={stage.agent.title}
                  messages={stage.sampleChat}
                  onClose={handleCloseChat}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenStage;
