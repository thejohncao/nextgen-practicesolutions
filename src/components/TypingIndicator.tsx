
import React from 'react';
import AgentChatAvatar from './AgentChatAvatar';

interface TypingIndicatorProps {
  agent: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ agent }) => {
  // Get agent-specific gradient class
  const getGradientClass = () => {
    switch(agent.toLowerCase()) {
      case 'giselle': return 'from-green-500/10 to-green-500/5';
      case 'miles': return 'from-blue-500/10 to-blue-500/5';
      case 'devon': return 'from-purple-500/10 to-purple-500/5';
      case 'alma': return 'from-amber-500/10 to-amber-500/5';
      default: return 'from-gray-800 to-gray-900';
    }
  };

  return (
    <div className={`max-w-[85%] rounded-xl p-3 mr-auto bg-gradient-to-br ${getGradientClass()} mb-3 animate-fade-in border border-white/5`}>
      <div className="flex items-center gap-2">
        <AgentChatAvatar agent={agent} hideDetails={false} isTyping={true} />
        <div className="flex gap-1 mt-1">
          <div className="h-2 w-2 rounded-full bg-white/70 animate-bounce"></div>
          <div className="h-2 w-2 rounded-full bg-white/70 animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="h-2 w-2 rounded-full bg-white/70 animate-bounce" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
