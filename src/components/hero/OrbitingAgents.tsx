
import React, { useState } from 'react';
import { agents } from '@/data/agents';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAgentAnimations } from './hooks/useAgentAnimations';
import { useOrbitPositions } from './utils/getOrbitPositions';
import OrbitingAgent from './OrbitingAgent';

interface OrbitingAgentsProps {
  onAgentSelect?: (agentName: string) => void;
  mousePosition?: { x: number; y: number };
  arrangeVertically?: boolean;
}

const OrbitingAgents = ({
  onAgentSelect,
  mousePosition = { x: 0, y: 0 },
  arrangeVertically = false
}: OrbitingAgentsProps) => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Use custom hooks for animation and positioning
  const { isVisible, agentsPoweredUp, orbAnimations } = useAgentAnimations(agents);
  const orbitPositions = useOrbitPositions(arrangeVertically);
  
  const handleAgentClick = (agentName: string) => {
    // Select agent and trigger any parent callbacks
    setSelectedAgent(agentName === selectedAgent ? null : agentName);
    if (onAgentSelect) onAgentSelect(agentName);
  };

  // Reordering agents to match patient journey
  const orderedAgents = [...agents].sort((a, b) => {
    const order = { 'Miles': 0, 'Giselle': 1, 'Devon': 2, 'Alma': 3 };
    return order[a.name] - order[b.name];
  });

  return (
    <div className="relative w-full h-full">
      {/* Central glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-nextgen-purple/10 blur-3xl animate-pulse-slow"></div>
      
      {/* Orbiting agents */}
      {orderedAgents.map((agent, index) => {
        const isPoweredUp = agentsPoweredUp[agent.name] || false;
        const animationIntensity = orbAnimations[agent.name] || "none";
        
        // Calculate position based on orbit or grid
        let positionStyle = {};
        
        if (arrangeVertically || isMobile) {
          // Grid or vertical positioning
          positionStyle = {
            left: orbitPositions[index].cx,
            top: orbitPositions[index].cy,
          };
        } else {
          // Calculate orbital position for desktop
          // Check if angle exists first to avoid TypeScript error
          const angle = (orbitPositions[index].angle || 0) + (mousePosition.x * 15);
          const radius = orbitPositions[index].radius;
          const radians = (angle * Math.PI) / 180;
          
          // Calculate position on the orbit
          const x = 50 + Math.cos(radians) * parseInt(radius as string);
          const y = 50 + Math.sin(radians) * parseInt(radius as string);
          
          positionStyle = {
            left: `${x}%`,
            top: `${y}%`,
          };
        }
        
        return (
          <OrbitingAgent
            key={agent.name}
            agent={agent}
            position={positionStyle}
            isVisible={isVisible}
            isPoweredUp={isPoweredUp}
            animationIntensity={animationIntensity}
            isSelected={selectedAgent === agent.name}
            isFloating={!arrangeVertically && !isMobile}
            index={index}
            orbitDelay={orbitPositions[index].delay}
            onClick={handleAgentClick}
            isMobile={isMobile}
          />
        );
      })}
    </div>
  );
};

export default OrbitingAgents;
