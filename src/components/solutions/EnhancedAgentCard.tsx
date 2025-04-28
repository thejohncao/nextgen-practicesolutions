
import React from 'react';
import AgentCard from '../AgentCard';
import GlowingCard from '../effects/GlowingCard';
import { Agent } from '@/types/agent';

interface EnhancedAgentCardProps {
  agent: Agent;
  isActive?: boolean;
}

const getAgentGlowColor = (color: string) => {
  const colors = {
    'red': 'rgba(239, 68, 68, 0.2)',
    'green': 'rgba(34, 197, 94, 0.2)',
    'blue': 'rgba(59, 130, 246, 0.2)',
    'purple': 'rgba(168, 85, 247, 0.2)',
    'gold': 'rgba(234, 179, 8, 0.2)',
  };
  return colors[color] || 'rgba(155, 135, 245, 0.2)';
};

const EnhancedAgentCard = ({ agent, isActive }: EnhancedAgentCardProps) => {
  return (
    <GlowingCard glowColor={getAgentGlowColor(agent.color)}>
      <AgentCard agent={agent} isActive={isActive} />
    </GlowingCard>
  );
};

export default EnhancedAgentCard;
