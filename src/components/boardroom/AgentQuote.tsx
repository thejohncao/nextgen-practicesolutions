
import React from 'react';
import SparkleText from '../effects/SparkleText';

interface AgentQuoteProps {
  quote: string;
  agentColor: 'blue' | 'green' | 'purple' | 'gold';
}

const AgentQuote = ({ quote, agentColor }: AgentQuoteProps) => {
  const getColorClass = () => {
    switch (agentColor) {
      case 'blue': return 'text-blue-400';
      case 'green': return 'text-green-400';
      case 'purple': return 'text-purple-400';
      case 'gold': return 'text-amber-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="my-4 pl-4 border-l-2 border-white/20">
      <SparkleText>
        <p className={`italic text-sm ${getColorClass()}`}>
          &ldquo;{quote}&rdquo;
        </p>
      </SparkleText>
    </div>
  );
};

export default AgentQuote;
