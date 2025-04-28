
import React from 'react';
import AgentOrb from '../team/agent/AgentOrb';
import { agents } from '@/data/agents';

// Reorder agents for visual consistency
const orderedAgents = agents.sort((a, b) => {
  const order = { 'Miles': 1, 'Giselle': 2, 'Devon': 3, 'Alma': 4 };
  return order[a.name] - order[b.name];
});

const getDepartmentName = (name: string) => {
  switch (name) {
    case 'Miles': return 'Practice Management';
    case 'Giselle': return 'Practice Growth';
    case 'Devon': return 'Practice Development';
    case 'Alma': return 'Practice Academy';
    default: return '';
  }
};

const FloatingAgentAvatars = () => {
  return (
    <div className="relative w-full h-full">
      {orderedAgents.map((agent, index) => (
        <div
          key={agent.name}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110"
          style={{
            animation: `float 6s ease-in-out infinite`,
            animationDelay: `${index * 1.5}s`,
            left: `${50 + Math.cos(index * (2 * Math.PI / 4)) * 25}%`,
            top: `${50 + Math.sin(index * (2 * Math.PI / 4)) * 25}%`,
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-nextgen-purple/10 rounded-full filter blur-xl animate-pulse-slow" 
              style={{animationDelay: `${index * 1}s`}}
            />
            <AgentOrb
              name={agent.name}
              role={agent.title}
              color={agent.color}
              tooltipText={getDepartmentName(agent.name)}
              animated={true}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingAgentAvatars;
