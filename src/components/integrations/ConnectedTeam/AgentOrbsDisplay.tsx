
import React from 'react';
import { motion } from 'framer-motion';
import { Agent } from '@/types/agent';
import AgentOrb from '@/components/team/agent/AgentOrb';
import { getTooltipText } from '@/components/team/utils/getTooltipText';

interface AgentOrbsDisplayProps {
  orderedAgents: Agent[];
  positions: { top: string; left: string }[];
  isVisible: boolean;
}

const AgentOrbsDisplay: React.FC<AgentOrbsDisplayProps> = ({ orderedAgents, positions, isVisible }) => {
  return (
    <>
      {orderedAgents.map((agent, index) => (
        <motion.div
          key={agent.name}
          className="absolute"
          style={{ 
            top: positions[index].top,
            left: positions[index].left,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 20
          }}
          transition={{ 
            delay: 0.3 * index,
            duration: 0.8,
            type: 'spring',
            damping: 12
          }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: index * 0.5,
            }}
          >
            <AgentOrb
              name={agent.name}
              role={agent.title}
              color={agent.color}
              tooltipText={getTooltipText(agent.name)}
              displayMode="initial"
              showLabel={false}
            />
          </motion.div>
        </motion.div>
      ))}
    </>
  );
};

export default AgentOrbsDisplay;
