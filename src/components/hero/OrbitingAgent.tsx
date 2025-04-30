
import React from 'react';
import { motion } from 'framer-motion';
import { Agent } from '@/types/agent';
import AgentFloatingContent from './AgentFloatingContent';

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
        left: position.left,
        top: position.top
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

export default OrbitingAgent;
