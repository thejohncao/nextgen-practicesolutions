
import React from 'react';
import { Agent } from '@/types/agent';
import { Check } from 'lucide-react';

interface CardContentProps {
  agent: Agent;
}

const CardContent = ({ agent }: CardContentProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold text-white mb-1">{agent.name}</h3>
        <p className="text-sm text-white/80">{agent.title}</p>
      </div>
      
      <p className="text-white/90">{agent.tagline}</p>
      
      <div className="text-left">
        <ul className="space-y-2">
          {agent.features.slice(0, 3).map((feature, i) => {
            // Split feature text if it has a separator
            const parts = feature.split(' - ');
            const title = parts[0];
            const description = parts.length > 1 ? parts[1] : null;
            
            return (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Check className={`h-4 w-4 mt-1 text-${agent.color}-500 flex-shrink-0`} />
                <span>
                  <span className="font-medium">{title}</span>
                  {description && (
                    <span className="text-white/70"> — {description}</span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CardContent;
