
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import AgentChatAvatar from './AgentChatAvatar';
import { AiMessage } from '@/hooks/useAiConversation';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  isExpanded?: boolean;
  onToggleExpansion?: () => void;
}

const AiMessageBubble: React.FC<AiMessageBubbleProps> = ({ 
  message, 
  isTyping = false,
  isExpanded = false,
  onToggleExpansion
}) => {
  const [shouldShowExpandButton, setShouldShowExpandButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const MAX_HEIGHT = 300; // Maximum height before showing "Read More" button
  
  useEffect(() => {
    // Check if content exceeds max height and should show expand button
    if (contentRef.current) {
      const shouldExpand = contentRef.current.scrollHeight > MAX_HEIGHT;
      setShouldShowExpandButton(shouldExpand);
    }
  }, [message.text]);

  return (
    <div 
      className={cn(
        "mb-4 max-w-[85%] rounded-xl p-3",
        message.isUser ? "bg-nextgen-dark/60 ml-auto" : 
        `bg-gradient-to-br ${agents[message.agent as AgentKey].color}/10 mr-auto`
      )}
    >
      {!message.isUser && (
        <div className="flex items-center gap-2 mb-2">
          <AgentChatAvatar agent={message.agent} hideDetails={false} />
          <div className="font-semibold text-sm text-white/90">
            {agents[message.agent as AgentKey].name}
          </div>
        </div>
      )}
      
      <div 
        ref={contentRef}
        className={cn(
          "whitespace-pre-wrap text-white/90 overflow-hidden",
          !isExpanded && shouldShowExpandButton && "max-h-[300px]",
          isExpanded ? "max-h-full" : ""
        )}
      >
        {message.text}
      </div>
      
      {shouldShowExpandButton && onToggleExpansion && (
        <button 
          onClick={onToggleExpansion}
          className="flex items-center gap-1 mt-2 text-xs text-white/50 hover:text-white/80 transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-3 w-3" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3" />
              Read more
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default AiMessageBubble;
