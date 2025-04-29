
import React from 'react';
import AgentAvatar from '../AgentAvatar';

interface AgentInfo {
  name: string;
  role: string;
  color: string;
}

interface AgentStackDisplayProps {
  agents: AgentInfo[];
  isPrimary?: boolean;
}

const AgentStackDisplay = ({ agents, isPrimary = false }: AgentStackDisplayProps) => {
  if (!agents || agents.length === 0) return null;

  // Primary agent is always the first in the array
  const primaryAgent = agents[0];
  const secondaryAgents = agents.slice(1);

  return (
    <div className="relative">
      {/* Primary Agent */}
      <div className="relative z-10">
        <AgentAvatar
          name={primaryAgent.name}
          role={primaryAgent.role}
          color={primaryAgent.color}
          size={isPrimary ? "md" : "sm"}
        />
      </div>

      {/* Secondary Agents (if any) */}
      {secondaryAgents.length > 0 && (
        <div className="flex -space-x-3 mt-2">
          {secondaryAgents.map((agent, index) => (
            <div 
              key={agent.name} 
              className="relative" 
              style={{ 
                zIndex: 9 - index,
                opacity: 0.9 - (index * 0.1),
              }}
            >
              <AgentAvatar
                name={agent.name}
                role={agent.role}
                color={agent.color}
                size="sm"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentStackDisplay;
