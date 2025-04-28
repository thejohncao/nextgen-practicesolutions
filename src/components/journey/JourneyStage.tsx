
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
    <div className={`relative min-h-[400px] p-8 bg-gradient-to-br ${stage.gradientClass}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-4xl font-bold text-white/20">{stage.number}</span>
            <h3 className="text-2xl font-bold text-white mt-2">{stage.name}</h3>
          </div>
          <JourneyProgressBar currentStage={currentStage} totalStages={totalStages} />
        </div>
        
        <Card 
          onClick={() => setShowChat(true)}
          className="glass-card p-6 relative cursor-pointer transition-all duration-300 hover:shadow-glow hover:scale-[1.02]"
        >
          <div className="flex items-center gap-6">
            <AgentAvatar 
              name={stage.agent.name} 
              role={stage.agent.title}
              color={stage.agent.color}
            />
            <div>
              <h4 className="text-2xl font-bold text-white">{stage.agent.name}</h4>
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
