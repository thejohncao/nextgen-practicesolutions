
import React from 'react';
import { Agent } from '@/types/agent';
import AgentAvatar from '../../AgentAvatar';
import { getAgentMicroIntro } from '../utils/getAgentMicroIntro';

interface CardContentProps {
  agent: Agent;
}

const CardContent = ({ agent }: CardContentProps) => {
  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in">
      <div className="relative">
        <AgentAvatar 
          name={agent.name}
          role={agent.title}
          color={agent.color}
        />
      </div>

      <div className="space-y-3 text-center">
        <h3 className="text-2xl font-bold text-white">
          {agent.name}
        </h3>
        <p className="text-white/80">
          {agent.title}
        </p>
        <p className="text-sm text-white/60 font-light">
          {getAgentMicroIntro(agent.name)}
        </p>
      </div>
    </div>
  );
};

export default CardContent;
