
import React from 'react';
import { motion } from 'framer-motion';
import { agents } from '@/data/agents';

interface AgentGridProps {
  onAgentSelect?: (agentName: string) => void;
  selectedAgent?: string | null;
}

const AgentGrid: React.FC<AgentGridProps> = ({ 
  onAgentSelect, 
  selectedAgent 
}) => {
  // Create a 2x2 grid of agents
  const gridAgents = [
    agents.find(a => a.name === 'Giselle'),
    agents.find(a => a.name === 'Miles'),
    agents.find(a => a.name === 'Devon'),
    agents.find(a => a.name === 'Alma')
  ].filter(Boolean);
  
  return (
    <div className="relative w-full h-full">
      <div className="grid grid-cols-2 gap-6 md:gap-10">
        {gridAgents.map((agent, index) => (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.2,
              ease: [0.23, 1, 0.32, 1] 
            }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                repeat: Infinity,
                repeatType: 'mirror',
                duration: 3 + index,
                ease: "easeInOut"
              }}
              onClick={() => onAgentSelect && onAgentSelect(agent.name)}
              className={`
                relative h-20 w-20 md:h-28 md:w-28 rounded-full cursor-pointer 
                flex items-center justify-center
                ${selectedAgent === agent.name ? 'ring-2 ring-offset-2 ring-white shadow-lg' : ''}
              `}
            >
              {/* Agent Avatar */}
              <div className={`
                absolute inset-0 rounded-full overflow-hidden
                bg-gradient-to-br 
                ${agent.color === 'blue' ? 'from-blue-400 to-blue-600' : ''}
                ${agent.color === 'green' ? 'from-green-400 to-green-600' : ''}
                ${agent.color === 'purple' ? 'from-purple-400 to-purple-600' : ''}
                ${agent.color === 'gold' ? 'from-amber-400 to-amber-600' : ''}
              `}>
                {agent.avatarImage ? (
                  <img 
                    src={agent.avatarImage} 
                    alt={agent.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold text-white">{agent.name[0]}</span>
                  </div>
                )}
              </div>
              
              {/* Glow effect */}
              <div className={`
                absolute -inset-1 rounded-full opacity-30 blur-sm
                bg-gradient-to-br 
                ${agent.color === 'blue' ? 'from-blue-300 to-blue-500' : ''}
                ${agent.color === 'green' ? 'from-green-300 to-green-500' : ''}
                ${agent.color === 'purple' ? 'from-purple-300 to-purple-500' : ''}
                ${agent.color === 'gold' ? 'from-amber-300 to-amber-500' : ''}
                ${selectedAgent === agent.name ? 'opacity-70' : ''}
              `} />
            </motion.div>
            
            {/* Agent Name and Title */}
            <div className="mt-3 text-center">
              <p className="font-bold text-white">{agent.name}</p>
              <p className="text-xs text-white/70">{agent.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AgentGrid;
