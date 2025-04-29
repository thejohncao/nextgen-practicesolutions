
import React from 'react';
import { cn } from '@/lib/utils';
import AgentChatAvatar from '../AgentChatAvatar';
import { AiMessage } from '@/types/conversation';

interface ChatBubbleProps {
  message: AiMessage;
  isTyping?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isTyping = false }) => {
  // Get agent-specific gradient class
  const getBubbleClass = () => {
    if (message.isUser) {
      return 'bg-nextgen-purple/20 text-white';
    }
    
    switch(message.agent.toLowerCase()) {
      case 'giselle': return 'bg-green-500/10 text-white border border-green-500/20';
      case 'miles': return 'bg-blue-500/10 text-white border border-blue-500/20';
      case 'devon': return 'bg-purple-500/10 text-white border border-purple-500/20';
      case 'alma': return 'bg-amber-500/10 text-white border border-amber-500/20';
      default: return 'bg-white/10 text-white';
    }
  };

  return (
    <div 
      className={cn(
        "mb-4 max-w-[85%] rounded-xl p-3",
        message.isUser ? "bg-nextgen-dark/60 ml-auto" : 
        `${getBubbleClass()} mr-auto`
      )}
    >
      {!message.isUser && (
        <div className="flex items-center gap-2 mb-2">
          <AgentChatAvatar agent={message.agent} hideDetails={false} />
        </div>
      )}
      <div className="whitespace-pre-wrap text-white/90">
        {message.text}
      </div>
    </div>
  );
};

export default ChatBubble;
