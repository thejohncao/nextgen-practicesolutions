
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Agent } from '@/types/agent';
import { agents } from '@/data/agents';
import AgentOrb from '../team/agent/AgentOrb';

interface AgentSelectionScreenProps {
  onSelectAgent: (agentName: string) => void;
}

const AgentSelectionScreen: React.FC<AgentSelectionScreenProps> = ({ onSelectAgent }) => {
  // Filter to get only the 4 main agents in the correct order
  const mainAgents = ['miles', 'giselle', 'devon', 'alma'];
  const sortedAgents = mainAgents.map(name => 
    agents.find(a => a.name.toLowerCase() === name)
  ).filter(Boolean) as Agent[];

  // Animation stagger effect
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70 } }
  };

  const getAgentDescription = (agentName: string) => {
    switch(agentName.toLowerCase()) {
      case 'miles':
        return "Operations & Scheduling";
      case 'giselle':
        return "Growth & Marketing";
      case 'devon':
        return "Treatment Acceptance";
      case 'alma':
        return "Training & Team";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-3"
      >
        Meet Your AI Team
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-white/70 max-w-2xl mx-auto mb-10"
      >
        Choose the specialist you want to talk to —
        and get immediate, actionable strategies for your practice.
      </motion.p>

      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-4 w-full max-w-4xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {sortedAgents.map((agent) => (
          <motion.div 
            key={agent.name} 
            className="flex flex-col items-center"
            variants={item}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            onClick={() => onSelectAgent(agent.name)}
          >
            <div className="relative group cursor-pointer">
              <div className="agent-orb">
                <AgentOrb
                  name={agent.name}
                  role={agent.title}
                  color={agent.color}
                  tooltipText=""
                  animated={true}
                  animationIntensity="medium"
                  showLabel={false}
                />
              </div>
              
              <div className="mt-4 text-center">
                <h3 className={cn(
                  "font-bold text-lg",
                  agent.name.toLowerCase() === 'miles' && "text-blue-400",
                  agent.name.toLowerCase() === 'giselle' && "text-green-400",
                  agent.name.toLowerCase() === 'devon' && "text-purple-400",
                  agent.name.toLowerCase() === 'alma' && "text-amber-400",
                )}>
                  {agent.name}
                </h3>
                <p className="text-white/70 text-sm">{getAgentDescription(agent.name)}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AgentSelectionScreen;
