
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AgentOrb from '../../team/agent/AgentOrb';
import { Agent } from '@/types/agent';
import { getTooltipText } from '@/components/team/utils/getTooltipText';
import OrbGlowEffect from '../../effects/OrbGlowEffect';
import { useIsMobile } from '@/hooks/use-mobile';

interface AgentAvatarDisplayProps {
  agent: Agent;
  index: number;
  isVisible: boolean;
  isPoweredUp: boolean;
  animationIntensity: "none" | "low" | "medium" | "high";
  selectedAgent: string | null;
  mousePosition: { x: number; y: number };
  onAgentClick: (agentName: string) => void;
  expandedAgent: string | null;
}

const AgentAvatarDisplay: React.FC<AgentAvatarDisplayProps> = ({
  agent,
  index,
  isVisible,
  isPoweredUp,
  animationIntensity,
  selectedAgent,
  mousePosition,
  onAgentClick,
  expandedAgent
}) => {
  const isMobile = useIsMobile();
  const isExpanded = expandedAgent === agent.name;

  // Define positions with MORE SPACE between them
  const getPositions = () => {
    if (isMobile) {
      // Improved grid layout with much more spacing for mobile
      return [
        { x: '25%', y: '20%', delay: 0.2 }, // Top left (Giselle)
        { x: '75%', y: '20%', delay: 0.4 }, // Top right (Miles)
        { x: '25%', y: '70%', delay: 0.6 }, // Bottom left (Devon)
        { x: '75%', y: '70%', delay: 0.8 }, // Bottom right (Alma)
      ];
    } else {
      // Diamond distribution for desktop - more spread out
      return [
        { x: '30%', y: '25%', delay: 0.2 }, // Top left (Giselle)
        { x: '70%', y: '25%', delay: 0.4 }, // Top right (Miles)
        { x: '70%', y: '65%', delay: 0.6 }, // Bottom right (Devon)
        { x: '30%', y: '65%', delay: 0.8 }, // Bottom left (Alma)
      ];
    }
  };
  
  const positions = getPositions();

  // Calculate mouse influence with distance falloff
  const baseX = parseFloat(positions[index].x) / 100;
  const baseY = parseFloat(positions[index].y) / 100;
  
  // Adjust sensitivity based on agent - Miles is more responsive to mouse
  // Reduced sensitivity to prevent agents from getting too close to each other
  const sensitivity = isMobile ? 0 : (agent.name === 'Miles' ? 0.01 : 0.008);
  
  // Calculate position with mouse influence - creates a sense that agents are aware of user
  const x = `${(baseX * 100) + (mousePosition.x * sensitivity * 100)}%`;
  const y = `${(baseY * 100) + (mousePosition.y * sensitivity * 100)}%`;

  // Get abbreviated role for mobile display
  const getAbbreviatedRole = (role: string): string => {
    if (!isMobile) return role;
    
    const abbreviations: {[key: string]: string} = {
      "Practice Management": "PM",
      "Practice Growth": "PG",
      "Practice Development": "PD",
      "Practice Academy": "PA"
    };
    
    return abbreviations[role] || role;
  };

  return (
    <motion.div
      key={agent.name}
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      initial={{ 
        x: positions[index].x, 
        y: positions[index].y, 
        opacity: 0,
        scale: 0.8
      }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        x, 
        y
      }}
      transition={{ 
        duration: 0.8, 
        delay: positions[index].delay,
        type: 'spring',
        damping: 12,
        x: { duration: 1, ease: [0.25, 1, 0.5, 1] },
        y: { duration: 1, ease: [0.25, 1, 0.5, 1] }
      }}
    >
      {/* Agent orb with sequential glow/power-up animation */}
      <motion.div
        animate={{
          y: isMobile ? 0 : [0, -8, 0], // Disable floating on mobile
        }}
        transition={{
          duration: 6, // Shorter duration for smoother floating
          repeat: Infinity,
          repeatType: 'reverse',
          ease: "easeInOut",
          delay: index * 0.6,
        }}
        className="relative"
        aria-label={`${agent.name} - ${agent.title}`}
      >
        {/* Enhanced particle/glow effect when "powering up" */}
        {isPoweredUp && (
          <OrbGlowEffect 
            color={agent.color} 
            intensity={animationIntensity}
            size={isMobile ? "small" : "medium"} 
          />
        )}
        
        {/* Agent orb with proper label positioning */}
        <div className="flex flex-col items-center">
          <AgentOrb 
            name={agent.name}
            role={agent.title}
            color={agent.color}
            tooltipText={getTooltipText(agent.name)}
            animated={isPoweredUp}
            animationIntensity={isMobile ? "low" : animationIntensity}
            isActive={selectedAgent === agent.name}
            onClick={() => onAgentClick(agent.name)}
            displayMode="initial"
            showLabel={false} // Don't use internal labels
            poweredUp={isPoweredUp}
          />
          
          {/* Label positioned below orb with spacing and no wrapping */}
          {/* Enhanced mobile layout with tap-to-expand details */}
          <div className={`
            mt-3 md:mt-4
            text-center
            transition-all duration-300
            ${isPoweredUp ? 'opacity-100' : 'opacity-0'}
            ${isMobile ? 'max-w-[60px]' : 'max-w-[80px]'}
            ${isExpanded ? 'scale-110 bg-black/30 p-2 rounded-lg' : ''}
          `}>
            <div className="font-medium text-sm text-white whitespace-nowrap">
              {agent.name}
            </div>
            <div className="text-white/80 text-xs truncate">
              {isMobile && !isExpanded 
                ? getAbbreviatedRole(agent.title)
                : agent.title}
            </div>
            
            {/* Expanded details on mobile tap */}
            {isMobile && isExpanded && (
              <div className="mt-1 text-xs text-white/70 animate-fade-in max-w-[120px]">
                {getTooltipText(agent.name).slice(0, 60)}...
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AgentAvatarDisplay;
