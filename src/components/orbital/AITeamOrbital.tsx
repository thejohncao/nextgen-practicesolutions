
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AgentOrb from '../team/agent/AgentOrb';
import { agents } from '@/data/agents';
import { getTooltipText } from '../team/utils/getTooltipText';
import ConnectingLines from '../integrations/ConnectedTeam/ConnectingLines';
import CentralGlow from '../integrations/ConnectedTeam/CentralGlow';
import { useIsMobile } from '@/hooks/use-mobile';

interface AITeamOrbitalProps {
  onAgentSelect?: (agentName: string) => void;
}

const AITeamOrbital: React.FC<AITeamOrbitalProps> = ({ onAgentSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  
  // Track mouse position for subtle hover effect
  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Get the container dimensions
      const containerEl = document.querySelector('.orbital-container');
      if (!containerEl) return;
      
      const rect = containerEl.getBoundingClientRect();
      
      // Calculate mouse position relative to the center of the container
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      
      setMousePosition({ x, y });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);
  
  useEffect(() => {
    // Animation sequence - staggered appearance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 400);
    
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
    
    // Call the external handler if provided
    if (onAgentSelect) {
      onAgentSelect(agentName);
    } else {
      // Fallback to trying to find the chat toggle button
      try {
        const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
        if (chatButton) {
          console.log('Chat button found, clicking...');
          chatButton.click();
          
          // Store the selected agent in sessionStorage for the chat component to pick up
          sessionStorage.setItem('nextgen_selected_agent', agentName);
        } else {
          console.warn('Chat toggle button not found');
        }
      } catch (error) {
        console.error('Error opening chat:', error);
      }
    }
  };
  
  // Mobile version is a vertical scroll
  if (isMobile) {
    return (
      <div className="space-y-12 py-8">
        <div className="text-center mb-8">
          <h3 className="text-xl font-medium text-white">Your AI Executive Team</h3>
          <p className="text-white/70">Who do you want to talk to?</p>
        </div>
        
        {orderedAgents.map((agent, index) => (
          <motion.div
            key={agent.name}
            className="flex items-center justify-center flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 20
            }}
            transition={{ 
              delay: 0.2 * index,
              duration: 0.6
            }}
          >
            <AgentOrb
              name={agent.name}
              role={agent.title}
              color={agent.color}
              size="lg"
              tooltipText={getTooltipText(agent.name)}
              animated={true}
              animationIntensity="medium"
              isActive={selectedAgent === agent.name}
              onClick={() => handleAgentClick(agent.name)}
              displayMode="fullName"
              showLabel={true}
            />
          </motion.div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="relative w-full h-[500px] orbital-container">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/20 rounded-full"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,135,245,0.1)_0,transparent_70%)]"></div>
      
      {/* Connecting lines between agents */}
      <ConnectingLines isVisible={isVisible} />
      
      {/* Central hub glow */}
      <CentralGlow isVisible={isVisible} />
      
      {/* Central label */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8
        }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="text-white text-sm font-medium whitespace-nowrap">
          Who do you want to talk to?
        </div>
      </motion.div>
      
      {/* Agent orbs */}
      {orderedAgents.map((agent, index) => {
        // Calculate mouse influence with distance falloff
        const baseX = parseFloat(positions[index].x) / 100;
        const baseY = parseFloat(positions[index].y) / 100;
        
        // Adjust mouse influence sensitivity
        const sensitivity = 0.02;
        
        // Calculate position with subtle mouse influence
        const x = `${(baseX * 100) + (mousePosition.x * sensitivity * 100)}%`;
        const y = `${(baseY * 100) + (mousePosition.y * sensitivity * 100)}%`;
        
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
              x: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
              y: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
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
                ease: "easeInOut",
                delay: index * 0.6,
              }}
              className="animate-hero-float relative"
            >
              <AgentOrb 
                name={agent.name}
                role={agent.title}
                color={agent.color}
                size="lg"
                tooltipText={getTooltipText(agent.name)}
                animated={true}
                animationIntensity="medium"
                isActive={selectedAgent === agent.name}
                onClick={() => handleAgentClick(agent.name)}
                displayMode="initial"
                showLabel={false}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AITeamOrbital;
