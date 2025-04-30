
import React from 'react';
import { agents } from '@/data/agents';

const AgentSectionGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {agents.map((agent) => (
        <div key={agent.name} className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full bg-${agent.color}-500`} />
          <div>
            <p className="font-medium text-white">
              {agent.name.charAt(0).toUpperCase() + agent.name.slice(1)}:
            </p>
            <p className="text-white/70 text-sm">{agent.tagline}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AgentSectionGrid;
