
import React from 'react';
import { cn } from '@/lib/utils';
import AgentChatAvatar from '../AgentChatAvatar';
import { AiMessage } from '@/types/conversation';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from '../ui/button';

interface ChatBubbleProps {
  message: AiMessage;
  isTyping?: boolean;
  isApiFailure?: boolean; 
  onRetry?: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  message, 
  isTyping = false, 
  isApiFailure = false,
  onRetry
}) => {
  // Get agent-specific gradient class
  const getBubbleClass = () => {
    if (message.isUser) {
      return 'bg-nextgen-purple/20 text-white';
    }
    
    switch(message.agent?.toLowerCase()) {
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
      
      {/* Show API failure recovery option */}
      {!message.isUser && isApiFailure && onRetry && (
        <div className="mt-3 flex items-center gap-2">
          <div className="text-xs text-amber-400 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            <span>AI service issue</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry}
            className="ml-auto h-6 px-2 py-0 text-xs border-white/10 hover:bg-white/5 flex items-center gap-1"
          >
            <RefreshCcw className="h-3 w-3 mr-1" /> Retry with AI
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
