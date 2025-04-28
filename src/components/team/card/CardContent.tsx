
import React from 'react';
import { Agent } from '@/types/agent';
import AgentAvatar from '../../AgentAvatar';
import { getAgentBlurb } from '../utils/getAgentBlurb';

interface CardContentProps {
  agent: Agent;
}

const CardContent = ({ agent }: CardContentProps) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <AgentAvatar 
          name={agent.name}
          role={agent.title}
          color={agent.color}
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-white">
          {agent.name}
        </h3>
        <p className="text-white/70">
          {agent.title}
        </p>
        <p className="text-lg text-white/90">
          {getAgentBlurb(agent.name)}
        </p>
      </div>
    </div>
  );
};

export default CardContent;
