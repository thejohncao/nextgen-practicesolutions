
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AgentOrb from '../team/agent/AgentOrb';
import { agents } from '@/data/agents';
import { getTooltipText } from '@/components/team/utils/getTooltipText';
import ConnectingLines from '../integrations/ConnectedTeam/ConnectingLines';
import CentralGlow from '../integrations/ConnectedTeam/CentralGlow';

interface FloatingAgentAvatarsProps {
  staggered?: boolean;
  onAgentSelect?: (agentName: string) => void;
}

const FloatingAgentAvatars = ({ staggered = false, onAgentSelect }: FloatingAgentAvatarsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Reorder agents to match patient journey
  const orderedAgents = [...agents].sort((a, b) => {
    const order = { 'Giselle': 1, 'Miles': 2, 'Devon': 3, 'Alma': 4 };
    return order[a.name] - order[b.name];
  });
  
  // Define positions for each agent in a diamond layout
  const positions = [
    { x: '25%', y: '25%', delay: 0.2 }, // Top left (Giselle)
    { x: '75%', y: '25%', delay: 0.4 }, // Top right (Miles)
    { x: '75%', y: '75%', delay: 0.6 }, // Bottom right (Devon)
    { x: '25%', y: '75%', delay: 0.8 }, // Bottom left (Alma)
  ];

  const handleAgentClick = (agentName: string) => {
    setSelectedAgent(agentName === selectedAgent ? null : agentName);
    if (onAgentSelect) onAgentSelect(agentName);
  };
  
  return (
    <div className="relative w-full h-full">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/20 rounded-full"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,135,245,0.1)_0,transparent_70%)]"></div>
      
      {/* Connecting diamond lines */}
      <ConnectingLines isVisible={isVisible} />
      
      {/* Central glow effect */}
      <CentralGlow isVisible={isVisible} />
      
      {/* Floating agents */}
      {orderedAgents.map((agent, index) => (
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
            x: positions[index].x, 
            y: positions[index].y
          }}
          transition={{ 
            duration: 0.8, 
            delay: staggered ? positions[index].delay : 0,
            type: 'spring',
            damping: 12
          }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 8, // Longer duration for more premium feel
              repeat: Infinity,
              repeatType: 'reverse',
              ease: "easeInOut", // Fixed: Changed from "easeInOutCubic" to "easeInOut"
              delay: index * 0.6,
            }}
            className="animate-hero-float relative"
          >
            <AgentOrb 
              name={agent.name}
              role={agent.title}
              color={agent.color}
              tooltipText={getTooltipText(agent.name)}
              animated={true}
              isActive={selectedAgent === agent.name}
              onClick={() => handleAgentClick(agent.name)}
              displayMode="initial"
              showLabel={false} // Default to not showing label (will show on hover)
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingAgentAvatars;
