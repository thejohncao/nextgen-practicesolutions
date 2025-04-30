
import React from 'react';
import { cn } from '@/lib/utils';

interface AgentSuggestionChipProps {
  suggestion: string;
  onClick: () => void;
  color?: string;
}

const AgentSuggestionChip = ({ 
  suggestion, 
  onClick, 
  color = 'blue' 
}: AgentSuggestionChipProps) => {
  const getColorClass = () => {
    switch (color) {
      case 'green': return 'border-green-500/20 hover:bg-green-500/10';
      case 'purple': return 'border-purple-500/20 hover:bg-purple-500/10';
      case 'gold': return 'border-amber-500/20 hover:bg-amber-500/10';
      default: return 'border-blue-500/20 hover:bg-blue-500/10';
    }
  };
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 text-sm text-white/80 border rounded-lg transition-colors",
        "bg-white/5 hover:text-white",
        getColorClass()
      )}
    >
      {suggestion}
    </button>
  );
};

export default AgentSuggestionChip;
