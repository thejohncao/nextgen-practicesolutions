
import React from 'react';
import AgentAvatar from '../AgentAvatar';
import { motion } from 'framer-motion';

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
  animated = false
}: AgentStackDisplayProps) => {
  if (!agents || agents.length === 0) return null;

  // Primary agent is always the first in the array
  const primaryAgent = agents[0];
  const secondaryAgents = agents.slice(1);
  
  // Premium animation easing
  const premiumEasing = [0.25, 1, 0.5, 1];

  return (
    <div className="relative bg-transparent">
      {/* Primary Agent */}
      <motion.div 
        className="relative z-10 bg-transparent"
        animate={animated && isPrimary ? { 
          scale: [1, 1.05, 1],
          filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"] 
        } : {}}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: premiumEasing
        }}
      >
        <div className={`${isPrimary ? 'animate-pulse-slow' : ''} bg-transparent`}>
          <AgentAvatar
            name={primaryAgent.name}
            role={primaryAgent.role}
            color={primaryAgent.color}
            size={isPrimary ? "md" : "sm"}
            animated={animated || isPrimary}
            isPrimary={isPrimary}
            displayMode={displayMode}
            showLabel={showLabels}
          />
        </div>
      </motion.div>

      {/* Secondary Agents (if any) */}
      {secondaryAgents.length > 0 && (
        <div className="flex -space-x-3 mt-2 bg-transparent">
          {secondaryAgents.map((agent, index) => (
            <motion.div
              key={agent.name} 
              className="relative bg-transparent" 
              style={{ 
                zIndex: 9 - index,
                opacity: 0.9 - (index * 0.1),
                transform: `translateX(${index * -5}px)`
              }}
              animate={animated ? { 
                y: [0, -3, 0] 
              } : {}}
              transition={{
                duration: 3,
                delay: index * 0.6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <AgentAvatar
                name={agent.name}
                role={agent.role}
                color={agent.color}
                size="sm"
                animated={animated}
                displayMode={displayMode}
                showLabel={false}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentStackDisplay;
