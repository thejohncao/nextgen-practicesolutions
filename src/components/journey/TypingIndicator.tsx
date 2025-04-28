
import React from 'react';
import AgentChatAvatar from '../AgentChatAvatar';

interface TypingIndicatorProps {
  agent: string;
}

const TypingIndicator = ({ agent }: TypingIndicatorProps) => {
  return (
    <div className="mb-4 max-w-[85%] rounded-xl p-3 mr-auto bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="flex items-center gap-2">
        <AgentChatAvatar agent={agent} hideDetails={true} />
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
