
import React, { useState, useEffect } from 'react';
import { JourneyStage as JourneyStageType } from '@/data/patientJourney';
import AgentProfile from './AgentProfile';
import TypingIndicator from './TypingIndicator';
import ChatSimulation from './ChatSimulation';

interface JourneyStageProps {
  stage: JourneyStageType;
  isActive: boolean;
}

const JourneyStage = ({ stage, isActive }: JourneyStageProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  
  useEffect(() => {
    if (isActive) {
      // Start typing animation when the stage becomes active
      setShowChat(false);
      setIsTyping(true);
      
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setShowChat(true);
      }, 2000);
      
      return () => clearTimeout(typingTimer);
    }
  }, [isActive]);
  
  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <span className="text-2xl sm:text-3xl font-bold text-white/40 font-heading">{stage.number}</span>
        <h3 className="text-lg sm:text-xl font-bold text-white mt-1">{stage.name}</h3>
      </div>
      
      <div className="flex-grow mb-6">
        <AgentProfile agent={stage.agent} />
      </div>
      
      <div className="mt-auto">
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
  );
};

export default JourneyStage;
