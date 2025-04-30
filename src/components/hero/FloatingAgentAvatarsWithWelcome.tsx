
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AgentOrb from '../team/agent/AgentOrb';
import { agents } from '@/data/agents';
import { getTooltipText } from '@/components/team/utils/getTooltipText';
import ConnectingLines from '../integrations/ConnectedTeam/ConnectingLines';
import CentralGlow from '../integrations/ConnectedTeam/CentralGlow';
import OrbGlowEffect from '../effects/OrbGlowEffect';

interface FloatingAgentAvatarsWithWelcomeProps {
  staggered?: boolean;
  onAgentSelect?: (agentName: string) => void;
  mousePosition?: { x: number; y: number };
  welcomeComplete?: boolean;
}

const FloatingAgentAvatarsWithWelcome = ({
  staggered = false,
  onAgentSelect,
  mousePosition = { x: 0, y: 0 },
  welcomeComplete = false
}: FloatingAgentAvatarsWithWelcomeProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [agentsPoweredUp, setAgentsPoweredUp] = useState<{ [key: string]: boolean }>({});
  
  useEffect(() => {
    // Initial delay to start the welcome sequence
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Power up agents in sequence
      const agentNames = agents.map(a => a.name);
      agentNames.forEach((name, index) => {
        setTimeout(() => {
          setAgentsPoweredUp(prev => ({ ...prev, [name]: true }));
        }, 400 * (index + 1));
      });
      
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
      
      {/* Connecting diamond lines - now with animated drawing */}
      <ConnectingLines isVisible={isVisible} animated={true} />
      
      {/* Central glow effect - enhanced with pulse */}
      <CentralGlow isVisible={isVisible} pulseIntensity={welcomeComplete ? "high" : "low"} />
      
      {/* Floating agents with welcome animation sequence */}
      {orderedAgents.map((agent, index) => {
        // Calculate mouse influence with distance falloff
        const baseX = parseFloat(positions[index].x) / 100;
        const baseY = parseFloat(positions[index].y) / 100;
        
        // Adjust sensitivity based on agent
        const sensitivity = agent.name === 'Miles' ? 0.03 : 0.02;
        
        // Calculate position with mouse influence
        const x = `${(baseX * 100) + (mousePosition.x * sensitivity * 100)}%`;
        const y = `${(baseY * 100) + (mousePosition.y * sensitivity * 100)}%`;
        
        // Determine if this agent is powered up
        const isPoweredUp = agentsPoweredUp[agent.name] || false;
        
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
              delay: staggered ? positions[index].delay : 0,
              type: 'spring',
              damping: 12,
              x: { duration: 1, ease: [0.25, 1, 0.5, 1] },
              y: { duration: 1, ease: [0.25, 1, 0.5, 1] }
            }}
          >
            {/* Agent orb with sequential glow/power-up animation */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 8, // Longer duration for more premium feel
                repeat: Infinity,
                repeatType: 'reverse',
                ease: "easeInOut",
                delay: index * 0.6,
              }}
              className="animate-hero-float relative"
            >
              {/* Particle/glow effect when "powering up" */}
              {isPoweredUp && (
                <OrbGlowEffect color={agent.color} />
              )}
              
              <AgentOrb 
                name={agent.name}
                role={agent.title}
                color={agent.color}
                tooltipText={getTooltipText(agent.name)}
                animated={isPoweredUp}
                animationIntensity={isPoweredUp ? "high" : "none"}
                isActive={selectedAgent === agent.name}
                onClick={() => handleAgentClick(agent.name)}
                displayMode="initial"
                showLabel={isPoweredUp} // Only show labels after power up
                poweredUp={isPoweredUp}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingAgentAvatarsWithWelcome;
