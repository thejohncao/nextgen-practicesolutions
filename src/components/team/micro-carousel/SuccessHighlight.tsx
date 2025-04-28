
import React from 'react';
import { Agent } from '@/types/agent';
import { Badge } from '@/components/ui/badge';

interface SuccessHighlightProps {
  agent: Agent;
  message: string;
}

const SuccessHighlight = ({ agent, message }: SuccessHighlightProps) => {
  const getBadgeVariant = (color: Agent['color']) => {
    switch (color) {
      case 'blue': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'green': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'purple': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'gold': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default: return '';
    }
  };

  return (
    <div className="glass-card p-4 min-w-[280px] sm:min-w-[320px] h-full">
      <div className="flex items-start gap-3">
        <Badge className={`${getBadgeVariant(agent.color)} px-2 py-1`}>
          {agent.name}
        </Badge>
      </div>
      <p className="mt-3 text-white/90 text-sm sm:text-base">{message}</p>
    </div>
  );
};

export default SuccessHighlight;
