
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
  showLabels?: boolean;
  displayMode?: 'initial' | 'fullName';
  animated?: boolean;
}

const AgentStackDisplay = ({ 
  agents, 
  isPrimary = false, 
  showLabels = true,
  displayMode = 'initial',
  animated = true
}: AgentStackDisplayProps) => {
  if (!agents || agents.length === 0) return null;

  // Primary agent is always the first in the array
  const primaryAgent = agents[0];
  const secondaryAgents = agents.slice(1);

  return (
    <div className="relative bg-transparent">
      {/* Primary Agent */}
      <div className="relative z-10 bg-transparent">
        <div className={`${isPrimary ? 'animate-pulse-slow' : ''} bg-transparent`}>
          <AgentAvatar
            name={primaryAgent.name}
            role={primaryAgent.role}
            color={primaryAgent.color}
            size={isPrimary ? "md" : "sm"}
            animated={animated}
            isPrimary={isPrimary}
            displayMode={displayMode}
            showLabel={showLabels}
          />
        </div>
      </div>

      {/* Secondary Agents (if any) */}
      {secondaryAgents.length > 0 && (
        <div className="flex -space-x-3 mt-2 bg-transparent">
          {secondaryAgents.map((agent, index) => (
            <div 
              key={agent.name} 
              className="relative bg-transparent" 
              style={{ 
                zIndex: 9 - index,
                opacity: 0.9 - (index * 0.1),
                transform: `translateX(${index * -5}px)`
              }}
            >
              <AgentAvatar
                name={agent.name}
                role={agent.role}
                color={agent.color}
                size="sm"
                animated={false}
                displayMode={displayMode}
                showLabel={false}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentStackDisplay;
