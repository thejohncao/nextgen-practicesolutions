
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { agents } from '@/data/agents';
import AgentOrb from '../team/agent/AgentOrb';
import { getTooltipText } from '../team/utils/getTooltipText';
import OrbGlowEffect from '../effects/OrbGlowEffect';
import { useIsMobile } from '@/hooks/use-mobile';

interface OrbitingAgentsProps {
  onAgentSelect?: (agentName: string) => void;
  mousePosition?: { x: number; y: number };
}

interface OrbitPosition {
  cx: string;
  cy: string;
  radius: string;
  angle?: number; // Make angle optional
  delay: number;
}

const OrbitingAgents = ({
  onAgentSelect,
  mousePosition = { x: 0, y: 0 }
}: OrbitingAgentsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [agentsPoweredUp, setAgentsPoweredUp] = useState<{ [key: string]: boolean }>({});
  const [orbAnimations, setOrbAnimations] = useState<{ [key: string]: "none" | "low" | "medium" | "high" }>({});
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Initial delay to start animation sequence
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Power up agents in sequence with cinematic timing
      const agentNames = agents.map(a => a.name);
      
      // Wake up sequence - staggered
      agentNames.forEach((name, index) => {
        // First show the agent with low energy
        setTimeout(() => {
          setAgentsPoweredUp(prev => ({ ...prev, [name]: true }));
          setOrbAnimations(prev => ({ ...prev, [name]: "low" }));
        }, 400 * (index + 1));
        
        // Then increase energy to medium
        setTimeout(() => {
          setOrbAnimations(prev => ({ ...prev, [name]: "medium" }));
        }, 400 * (index + 1) + 800);
        
        // Finally reach full energy
        setTimeout(() => {
          setOrbAnimations(prev => ({ ...prev, [name]: "high" }));
        }, 400 * (index + 1) + 1600);
      });
      
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleAgentClick = (agentName: string) => {
    // Select agent and trigger any parent callbacks
    setSelectedAgent(agentName === selectedAgent ? null : agentName);
    if (onAgentSelect) onAgentSelect(agentName);
  };
  
  // Define orbit positions for each agent - using a diamond/circular layout
  const getOrbitPositions = (): OrbitPosition[] => {
    if (isMobile) {
      // 2x2 grid for mobile
      return [
        { cx: '25%', cy: '25%', radius: '0%', delay: 0.2 },  // Top-left (Giselle)
        { cx: '75%', cy: '25%', radius: '0%', delay: 0.4 },  // Top-right (Miles)
        { cx: '25%', cy: '75%', radius: '0%', delay: 0.6 },  // Bottom-left (Devon)
        { cx: '75%', cy: '75%', radius: '0%', delay: 0.8 },  // Bottom-right (Alma)
      ];
    } else {
      // Diamond/orbital layout for desktop
      return [
        { cx: '50%', cy: '50%', radius: '40%', angle: 45, delay: 0.2 },    // Top-right (Miles)
        { cx: '50%', cy: '50%', radius: '40%', angle: 135, delay: 0.4 },   // Top-left (Giselle)
        { cx: '50%', cy: '50%', radius: '40%', angle: 225, delay: 0.6 },   // Bottom-left (Devon)
        { cx: '50%', cy: '50%', radius: '40%', angle: 315, delay: 0.8 },   // Bottom-right (Alma)
      ];
    }
  };

  const orbitPositions = getOrbitPositions();
  
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
        let positionStyle: React.CSSProperties = {};
        
        if (isMobile) {
          // Grid positioning for mobile
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
          <motion.div
            key={agent.name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            initial={{ 
              opacity: 0,
              scale: 0.8
            }}
            animate={{ 
              opacity: isVisible ? 1 : 0,
              scale: isVisible ? 1 : 0.8,
              ...positionStyle
            }}
            transition={{ 
              duration: 0.8, 
              delay: orbitPositions[index].delay,
              type: 'spring',
              damping: 12
            }}
          >
            {/* Orbital motion animation */}
            <motion.div
              animate={!isMobile ? {
                rotate: [0, 360]
              } : undefined}
              transition={!isMobile ? {
                duration: 60 + index * 10, // Slow rotation
                repeat: Infinity,
                ease: "linear"
              } : undefined}
              className="relative"
            >
              {/* Agent floating animation */}
              <motion.div
                animate={{
                  y: [0, -8, 0]
                }}
                transition={{
                  duration: 6, 
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: "easeInOut",
                  delay: index * 0.6,
                }}
                className="relative"
                aria-label={`${agent.name} - ${agent.title}`}
              >
                {/* Enhanced glow effect */}
                {isPoweredUp && (
                  <OrbGlowEffect 
                    color={agent.color} 
                    intensity={animationIntensity}
                    size={isMobile ? "small" : "medium"} 
                  />
                )}
                
                {/* Agent orb with name label */}
                <div className="flex flex-col items-center">
                  <AgentOrb 
                    name={agent.name}
                    role={agent.title}
                    color={agent.color}
                    tooltipText={getTooltipText(agent.name)}
                    animated={isPoweredUp}
                    animationIntensity={animationIntensity}
                    isActive={selectedAgent === agent.name}
                    onClick={() => handleAgentClick(agent.name)}
                    displayMode="initial"
                    showLabel={false}
                    poweredUp={isPoweredUp}
                  />
                  
                  {/* Name label that appears on hover or when active */}
                  <motion.div 
                    className="mt-3 md:mt-4 text-center"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ 
                      opacity: isPoweredUp ? 1 : 0,
                      y: isPoweredUp ? 0 : -5
                    }}
                    transition={{
                      duration: 0.3,
                      delay: isPoweredUp ? 0.5 : 0
                    }}
                  >
                    <div className="font-medium text-sm text-white whitespace-nowrap">
                      {agent.name}
                    </div>
                    <div className="text-white/80 text-xs">
                      {agent.title}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default OrbitingAgents;
