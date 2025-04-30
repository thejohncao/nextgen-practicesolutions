
import React from 'react';
import { Agent } from '@/types/agent';
import AgentAvatar from '../AgentAvatar';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

interface AgentCardProps {
  agent: Agent;
  onSelect: (agentName: string) => void;
}

const AgentCard = ({ agent, onSelect }: AgentCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
    >
      <div className="flex items-center gap-3 mb-3">
        <AgentAvatar 
          name={agent.name} 
          role={agent.title} 
          color={agent.color}
          size="md"
        />
        <div>
          <h3 className="font-bold text-white">{agent.name}</h3>
          <p className="text-sm text-white/70">{agent.title}</p>
        </div>
      </div>
      
      <p className="text-sm text-white/80 mb-4">
        {agent.tagline.split(' — ')[0]}
      </p>
      
      <Button 
        onClick={() => onSelect(agent.name.toLowerCase())} 
        className="mt-auto w-full"
        variant="outline"
      >
        Talk to {agent.name}
      </Button>
    </motion.div>
  );
};

export default AgentCard;
