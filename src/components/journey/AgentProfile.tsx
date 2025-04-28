
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

  return (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto my-8">
      <div className="mb-6 animate-fade-in" style={{animationDelay: "0.4s"}}>
        <AgentAvatar 
          name={agent.name}
          role={agent.title}
          color={agent.color}
          size="lg"
          animated={true}
        />
      </div>
      
      <div className="space-y-4 animate-fade-in" style={{animationDelay: "0.6s"}}>
        <h3 className="text-2xl md:text-3xl font-bold text-white">{agent.name}</h3>
        <p className="text-lg text-white/80">{agent.title}</p>
        
        <p className="text-base md:text-lg text-white/70 max-w-2xl">
          {agent.tagline}
        </p>
        
        <SparkleText>
          <p className="text-lg md:text-xl italic text-white/90 mt-6">
            "{getAgentQuote(agent.name)}"
          </p>
        </SparkleText>
      </div>
    </div>
  );
};

export default AgentProfile;
