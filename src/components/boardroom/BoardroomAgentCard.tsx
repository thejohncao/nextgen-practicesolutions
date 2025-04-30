
import React from 'react';
import { Agent } from '@/types/agent';
import AgentQuote from './AgentQuote';
import AgentAvatar from '../AgentAvatar';
import ToolBadge from './ToolBadge';

interface BoardroomAgentCardProps {
  agent: Agent;
  quote: string;
}

const BoardroomAgentCard = ({ agent, quote }: BoardroomAgentCardProps) => {
  // Filter out "red" color if present to match AgentQuote allowed colors
  const agentColor = agent.color === 'red' ? 'purple' : agent.color;
  
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl p-5 animate-fade-in">
      {/* Header with avatar and name */}
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <AgentAvatar
            name={agent.name}
            role={agent.title}
            color={agent.color}
            size="md"
            isPrimary={true}
          />
        </div>
        <div className="ml-3">
          <h3 className="text-xl font-bold text-white">{agent.name}</h3>
          <p className="text-sm text-white/60">{agent.title}</p>
        </div>
      </div>
      
      {/* Agent quote */}
      <AgentQuote quote={quote} agentColor={agentColor} />
      
      {/* Agent description */}
      <p className="text-white/80 text-sm my-4">
        {agent.tagline}
      </p>
      
      {/* How agent helps */}
      <div className="mt-4">
        <h4 className="text-sm uppercase text-white/50 mb-2">How {agent.name} Helps:</h4>
        <ul className="space-y-2">
          {agent.activities?.map((activity, index) => (
            <li key={index} className="text-sm text-white/80 flex items-start gap-2">
              <span className="text-white/30">•</span>
              <span>{activity}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Tools */}
      {agent.tools && agent.tools.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm uppercase text-white/50 mb-2">Tools:</h4>
          <div className="flex flex-wrap gap-2">
            {agent.tools.map((tool, index) => (
              <ToolBadge 
                key={index}
                name={tool.name}
                icon={tool.icon}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardroomAgentCard;
