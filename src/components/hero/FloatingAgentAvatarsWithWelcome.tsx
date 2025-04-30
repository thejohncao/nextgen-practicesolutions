
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AgentOrb from '../team/agent/AgentOrb';
import { agents } from '@/data/agents';
import { getTooltipText } from '@/components/team/utils/getTooltipText';
import ConnectingLines from '../integrations/ConnectedTeam/ConnectingLines';
import CentralGlow from '../integrations/ConnectedTeam/CentralGlow';
import OrbGlowEffect from '../effects/OrbGlowEffect';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const [isVisible, setIsVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [agentsPoweredUp, setAgentsPoweredUp] = useState<{ [key: string]: boolean }>({});
  const [orbAnimations, setOrbAnimations] = useState<{ [key: string]: "none" | "low" | "medium" | "high" }>({});
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Initial delay to start the welcome sequence
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Power up agents in sequence with cinematic timing
      const agentNames = agents.map(a => a.name);
      
      // Wake up sequence - staggered with deliberate timing
      agentNames.forEach((name, index) => {
        // First show the agent with low energy
        setTimeout(() => {
          setAgentsPoweredUp(prev => ({ ...prev, [name]: true }));
          setOrbAnimations(prev => ({ ...prev, [name]: "low" }));
        }, 400 * (index + 1));
        
        // Then increase energy to medium after a short delay
        setTimeout(() => {
          setOrbAnimations(prev => ({ ...prev, [name]: "medium" }));
        }, 400 * (index + 1) + 800);
        
        // Finally reach full energy if welcome is complete
        setTimeout(() => {
          if (welcomeComplete) {
            setOrbAnimations(prev => ({ ...prev, [name]: "high" }));
          }
        }, 400 * (index + 1) + 1600);
      });
      
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Update agent animation intensity when welcome completes
  useEffect(() => {
    if (welcomeComplete) {
      const agentNames = agents.map(a => a.name);
      agentNames.forEach((name) => {
        setOrbAnimations(prev => ({ ...prev, [name]: "high" }));
      });
    }
  }, [welcomeComplete]);
  
  // Reorder agents to match patient journey
  const orderedAgents = [...agents].sort((a, b) => {
    const order = { 'Giselle': 1, 'Miles': 2, 'Devon': 3, 'Alma': 4 };
    return order[a.name] - order[b.name];
  });
  
  // Define positions for each agent with MORE SPACE between them
  // Using a diamond layout for desktop and a 2x2 grid for mobile
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

  const handleAgentClick = (agentName: string) => {
    // Mobile: toggle expanded agent details
    if (isMobile) {
      setExpandedAgent(expandedAgent === agentName ? null : agentName);
    }
    
    // General selection behavior for both mobile/desktop
    setSelectedAgent(agentName === selectedAgent ? null : agentName);
    if (onAgentSelect) onAgentSelect(agentName);
  };
  
  // Get abbreviated role for mobile display
  const getAbbreviatedRole = (role: string): string => {
    if (!isMobile) return role;
    
    const abbreviations: {[key: string]: string} = {
      "Practice Manager": "PM",
      "Growth Strategist": "GS",
      "Treatment Closer": "TC",
      "Academy Director": "AD"
    };
    
    return abbreviations[role] || role;
  };
  
  return (
    <div className="relative w-full h-full">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/20 rounded-full"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,135,245,0.1)_0,transparent_70%)]"></div>
      
      {/* Connecting diamond lines - now with animated drawing */}
      <ConnectingLines isVisible={isVisible} animated={true} />
      
      {/* Central glow effect - enhanced with pulse */}
      <CentralGlow 
        isVisible={isVisible} 
        pulseIntensity={welcomeComplete ? "high" : "low"} 
      />
      
      {/* Floating agents with welcome animation sequence */}
      {orderedAgents.map((agent, index) => {
        // Calculate mouse influence with distance falloff
        const baseX = parseFloat(positions[index].x) / 100;
        const baseY = parseFloat(positions[index].y) / 100;
        
        // Adjust sensitivity based on agent - Miles is more responsive to mouse
        // Reduced sensitivity to prevent agents from getting too close to each other
        const sensitivity = isMobile ? 0 : (agent.name === 'Miles' ? 0.01 : 0.008);
        
        // Calculate position with mouse influence - creates a sense that agents are aware of user
        const x = `${(baseX * 100) + (mousePosition.x * sensitivity * 100)}%`;
        const y = `${(baseY * 100) + (mousePosition.y * sensitivity * 100)}%`;
        
        // Determine if this agent is powered up
        const isPoweredUp = agentsPoweredUp[agent.name] || false;
        const animationIntensity = orbAnimations[agent.name] || "none";
        const isExpanded = expandedAgent === agent.name;
        
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
                  onClick={() => handleAgentClick(agent.name)}
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
      })}
    </div>
  );
};

export default FloatingAgentAvatarsWithWelcome;
