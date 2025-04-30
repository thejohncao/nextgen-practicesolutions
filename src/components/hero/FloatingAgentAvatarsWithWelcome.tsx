
import React, { useState } from 'react';
import { agents } from '@/data/agents';
import { useIsMobile } from '@/hooks/use-mobile';
import AgentAvatarDisplay from './welcome/AgentAvatarDisplay';
import WelcomeBackground from './welcome/WelcomeBackground';
import useAgentPowerUp from './welcome/useAgentPowerUp';

interface FloatingAgentAvatarsWithWelcomeProps {
  staggered?: boolean;
  onAgentSelect?: (agentName: string) => void;
  mousePosition?: { x: number; y: number };
  welcomeComplete?: boolean;
  showFullNames?: boolean;
}

const FloatingAgentAvatarsWithWelcome = ({
  staggered = false,
  onAgentSelect,
  mousePosition = { x: 0, y: 0 },
  welcomeComplete = false,
  showFullNames = true
}: FloatingAgentAvatarsWithWelcomeProps) => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Use our custom hook for agent power-up animations
  const { agentsPoweredUp, orbAnimations, isVisible } = useAgentPowerUp(agents, welcomeComplete);
  
  // Reorder agents to match patient journey
  const orderedAgents = [...agents].sort((a, b) => {
    const order = { 'Giselle': 1, 'Miles': 2, 'Devon': 3, 'Alma': 4 };
    return order[a.name] - order[b.name];
  });

  const handleAgentClick = (agentName: string) => {
    // Mobile: toggle expanded agent details
    if (isMobile) {
      setExpandedAgent(expandedAgent === agentName ? null : agentName);
    }
    
    // General selection behavior for both mobile/desktop
    setSelectedAgent(agentName === selectedAgent ? null : agentName);
    if (onAgentSelect) onAgentSelect(agentName);
  };
  
  return (
    <div className="relative w-full h-full">
      <WelcomeBackground isVisible={isVisible} welcomeComplete={welcomeComplete} />
      
      {/* Floating agents with welcome animation sequence */}
      {orderedAgents.map((agent, index) => (
        <AgentAvatarDisplay
          key={agent.name}
          agent={agent}
          index={index}
          isVisible={isVisible}
          isPoweredUp={agentsPoweredUp[agent.name] || false}
          animationIntensity={orbAnimations[agent.name] || "none"}
          selectedAgent={selectedAgent}
          mousePosition={mousePosition}
          onAgentClick={handleAgentClick}
          expandedAgent={expandedAgent}
        />
      ))}
    </div>
  );
};

export default FloatingAgentAvatarsWithWelcome;
