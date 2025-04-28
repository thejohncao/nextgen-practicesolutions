
import React, { useState } from 'react';
import { JourneyStage as JourneyStageType } from '@/data/patientJourney';
import JourneyProgressBar from './JourneyProgressBar';
import ChatSimulation from './ChatSimulation';
import { Card } from '@/components/ui/card';
import AgentAvatar from '../AgentAvatar';

interface JourneyStageProps {
  stage: JourneyStageType;
  currentStage: number;
  totalStages: number;
}

const JourneyStage = ({ stage, currentStage, totalStages }: JourneyStageProps) => {
  const [showChat, setShowChat] = useState(false);
  
  return (
    <div className={`relative min-h-[400px] md:min-h-[450px] p-6 sm:p-8 ${stage.gradientClass}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div>
            <span className="text-4xl sm:text-5xl font-bold text-white/40 font-heading tracking-tight">{stage.number}</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 font-heading">{stage.name}</h3>
          </div>
          <JourneyProgressBar currentStage={currentStage} totalStages={totalStages} />
        </div>
        
        <Card 
          onClick={() => setShowChat(true)}
          className="glass-card p-6 relative cursor-pointer transition-all duration-300 hover:shadow-glow hover:scale-[1.02] max-w-md mx-auto"
        >
          <div className="flex items-center gap-6">
            <AgentAvatar 
              name={stage.agent.name} 
              role={stage.agent.title}
              color={stage.agent.color}
              size="lg"
              animated={true}
            />
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-white">{stage.agent.name}</h4>
              <p className="text-white/70">{stage.agent.title}</p>
            </div>
          </div>
        </Card>
        
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
