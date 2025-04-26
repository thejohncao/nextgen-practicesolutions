
import React from 'react';
import { Message } from '@/types/chat';
import { agents } from '@/utils/agentStyles';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const messageStyle = !message.isUser ? {
    backgroundColor: `rgba(${parseInt(agents[message.agent].baseColor.slice(1, 3), 16)}, ${parseInt(agents[message.agent].baseColor.slice(3, 5), 16)}, ${parseInt(agents[message.agent].baseColor.slice(5, 7), 16)}, 0.1)`
  } : undefined;

  return (
    <div 
      className={cn(
        "mb-4 max-w-[85%] rounded-xl p-3",
        message.isUser ? "bg-nextgen-dark/60 ml-auto" : "bg-gradient-to-br mr-auto"
      )}
      style={messageStyle}
    >
      {!message.isUser && (
        <div className="font-semibold text-sm mb-1 text-white/90">
          {agents[message.agent].name}
        </div>
      )}
      <div className="whitespace-pre-wrap text-white/90">
        {message.text}
      </div>
    </div>
  );
};

