
import React from 'react';
import { motion } from 'framer-motion';
import AgentOrb from '../team/agent/AgentOrb';
import OrbGlowEffect from '../effects/OrbGlowEffect';
import { getTooltipText } from '../team/utils/getTooltipText';
import { Agent } from '@/types/agent';

interface OrbitingAgentProps {
  agent: Agent;
  position: {
    left: string | number;
    top: string | number;
  };
  isVisible: boolean;
  isPoweredUp: boolean;
  animationIntensity: "none" | "low" | "medium" | "high";
  isSelected: boolean;
  isFloating: boolean;
  index: number;
  orbitDelay: number;
  onClick: (agentName: string) => void;
  isMobile: boolean;
}

const OrbitingAgent: React.FC<OrbitingAgentProps> = ({
  agent,
  position,
  isVisible,
  isPoweredUp,
  animationIntensity,
  isSelected,
  isFloating,
  index,
  orbitDelay,
  onClick,
  isMobile
}) => {
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
        ...(position as any)
      }}
      transition={{ 
        duration: 0.8, 
        delay: orbitDelay,
        type: 'spring',
        damping: 12
      }}
    >
      {/* Agent content based on layout type */}
      {!isMobile && isFloating ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 60 + index * 10, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="relative"
        >
          <AgentFloatingContent 
            agent={agent}
            isPoweredUp={isPoweredUp}
            animationIntensity={animationIntensity}
            isSelected={isSelected}
            index={index}
            onClick={() => onClick(agent.name)}
            isMobile={isMobile}
          />
        </motion.div>
      ) : (
        <AgentFloatingContent 
          agent={agent}
          isPoweredUp={isPoweredUp}
          animationIntensity={animationIntensity}
          isSelected={isSelected}
          index={index}
          onClick={() => onClick(agent.name)}
          isMobile={isMobile}
        />
      )}
    </motion.div>
  );
};

// Extracted Agent floating content to its own component
interface AgentFloatingContentProps {
  agent: Agent;
  isPoweredUp: boolean;
  animationIntensity: "none" | "low" | "medium" | "high";
  isSelected: boolean;
  index: number;
  onClick: () => void;
  isMobile: boolean;
}

const AgentFloatingContent: React.FC<AgentFloatingContentProps> = ({
  agent,
  isPoweredUp,
  animationIntensity,
  isSelected,
  index,
  onClick,
  isMobile
}) => {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
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
          isActive={isSelected}
          onClick={onClick}
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
  );
};

export default OrbitingAgent;
