
import React from 'react';
import { Agent } from '@/types/agent';
import AgentAvatar from '../AgentAvatar';
import SparkleText from '../effects/SparkleText';

interface AgentProfileProps {
  agent: Agent;
}

const AgentProfile = ({ agent }: AgentProfileProps) => {
  // Map the agent to a quote
  const getAgentQuote = (name: string) => {
    switch (name) {
      case 'Giselle': 
        return "Growth isn't accidental. It's a deliberate strategy we execute daily.";
      case 'Miles': 
        return "Your practice should run itself. Your time belongs to your patients.";
      case 'Devon': 
        return "Patients don't just need treatment. They need confidence in their decisions.";
      case 'Alma': 
        return "Your team can only deliver what they've been empowered to provide.";
      default: 
        return "";
    }
  };

  // Get color class based on agent
  const getAgentColorClass = (name: string) => {
    switch (name) {
      case 'Giselle': return 'text-green-500';
      case 'Miles': return 'text-blue-500';
      case 'Devon': return 'text-purple-500';
      case 'Alma': return 'text-amber-500';
      default: return 'text-white';
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <AgentAvatar 
          name={agent.name}
          role={agent.title}
          color={agent.color}
          size="md"
          animated={true}
          displayMode="initial"
          showLabel={true}
        />
      </div>
      
      <div className="space-y-2 sm:space-y-3">
        <h3 className="text-xl font-bold text-white">{agent.name}</h3>
        <p className="text-sm text-white/80">{agent.title}</p>
        
        <p className="text-sm text-white/70">
          {agent.tagline}
        </p>
        
        <SparkleText>
          <p className="text-sm italic text-white/90 mt-3 pb-1 border-b border-white/10">
            "{getAgentQuote(agent.name)}"
          </p>
        </SparkleText>
      </div>
    </div>
  );
};

export default AgentProfile;
