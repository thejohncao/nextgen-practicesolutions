
import React from 'react';
import { cn } from '@/lib/utils';
import AgentChatAvatar from './AgentChatAvatar';
import { AiMessage } from '@/hooks/useAiConversation';

// Define the AI agents with their properties
const agents = {
  miles: {
    name: "Miles",
    color: "from-[#3A86FF] to-[#7FDBFF]",
  },
  giselle: {
    name: "Giselle",
    color: "from-[#00C896] to-[#00FFB2]",
  },
  devon: {
    name: "Devon",
    color: "from-[#7B2CBF] to-[#B388EB]",
  },
  alma: {
    name: "Alma", 
    color: "from-[#00B4D8] to-[#90E0EF]",
  }
};

type AgentKey = keyof typeof agents;

interface AiMessageBubbleProps {
  message: AiMessage;
  isTyping?: boolean;
}

const AiMessageBubble: React.FC<AiMessageBubbleProps> = ({ message, isTyping = false }) => {
  return (
    <div 
      className={cn(
        "mb-4 max-w-[85%] rounded-xl p-3",
        message.isUser ? "bg-nextgen-dark/60 ml-auto" : 
        `bg-gradient-to-br ${agents[message.agent as AgentKey].color}/10 mr-auto`
      )}
    >
      {!message.isUser && (
        <div className="font-semibold text-sm mb-1 text-white/90">
          {agents[message.agent as AgentKey].name}
        </div>
      )}
      <div className="whitespace-pre-wrap text-white/90">
        {message.text}
      </div>
    </div>
  );
};

export default AiMessageBubble;
