import React, { useRef } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { useIsMobile } from "../../hooks/use-mobile";
import ChatHeader from '../ChatHeader';
import ChatInput from '../ChatInput';
import AiMessageBubble from '../AiMessageBubble';
import AgentChatPreview from '../agent-launcher/AgentChatPreview';
import AgentLoadingIndicator from '../AgentLoadingIndicator';
import { Button } from '../ui/button';
import { RefreshCw, ArrowRight } from 'lucide-react';
import { AiMessage } from '@/hooks/useAiConversation';

interface ChatDialogProps {
  isOpen: boolean;
  isMinimized: boolean;
  setIsMinimized: (value: boolean) => void;
  onOpenChange: (value: boolean) => void;
  messages: AiMessage[];
  isTyping: boolean;
  isTimedOut: boolean;
  timeoutLevel: 'none' | 'warning' | 'error';
  currentAgent: string;
  handleRetry: () => void;
  handleStartOver: () => void;
  onChangeAgent: (agent: string) => void;
  onSendMessage: (message: string) => void;
}

const ChatDialog: React.FC<ChatDialogProps> = ({
  isOpen,
  isMinimized,
  setIsMinimized,
  onOpenChange,
  messages,
  isTyping,
  isTimedOut,
  timeoutLevel,
  currentAgent,
  handleRetry,
  handleStartOver,
  onChangeAgent,
  onSendMessage
}) => {
  const isMobile = useIsMobile();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Show agent preview only if there are no user messages yet
  // This prevents showing welcome suggestions after a conversation has started
  const userMessages = messages.filter(msg => msg.isUser);
  const showAgentPreview = userMessages.length === 0;
  
  // Filter out duplicate welcome messages
  // If we have more than one AI message at the start without user messages in between, only keep the latest
  const filteredMessages = React.useMemo(() => {
    let result = [...messages];
    
    // If we have no user messages yet and multiple AI messages, only keep the last one
    if (userMessages.length === 0 && result.filter(m => !m.isUser).length > 1) {
      const lastAiMessageIndex = result.map(m => !m.isUser).lastIndexOf(true);
      if (lastAiMessageIndex >= 0) {
        result = [result[lastAiMessageIndex]];
      }
    }
    
    return result;
  }, [messages, userMessages.length]);

  // Check if the agent is "stuck" - when there's a message with empty content
  const hasEmptyResponse = filteredMessages.some(msg => !msg.isUser && msg.text.trim() === '');

  // Scroll to bottom when messages change
  React.useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filteredMessages, isOpen, isTyping, timeoutLevel]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={`p-0 gap-0 border-none ${isMobile ? 'w-[95vw] max-w-[95vw] h-[80vh] max-h-[85vh] rounded-lg' : 'w-[450px] max-w-[450px] h-[75vh] max-h-[75vh] rounded-xl'}`}>
        <div className="flex flex-col h-full bg-[#151719] text-gray-50 rounded-lg overflow-hidden">
          <ChatHeader 
            isMinimized={isMinimized} 
            currentAgent={currentAgent} 
            onChangeAgent={onChangeAgent}
            onMinimize={(e) => setIsMinimized(!isMinimized)}
            onClose={() => onOpenChange(false)} 
          />
          
          <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
            {/* Show conversation messages - filtered to remove duplicates */}
            {filteredMessages.map((message, index) => (
              <AiMessageBubble
                key={index}
                message={message}
              />
            ))}
            
            {/* Show agent welcome & suggestions only for new conversations */}
            {showAgentPreview && (
              <AgentChatPreview
                agentName={currentAgent}
                onSelectSuggestion={(suggestion) => onSendMessage(suggestion)}
              />
            )}
            
            {/* Show loading indicator when typing */}
            {isTyping && !isTimedOut && (
              <AgentLoadingIndicator agent={currentAgent} timeoutLevel={timeoutLevel} />
            )}
            
            {/* Handle empty responses with a helpful message */}
            {hasEmptyResponse && !isTyping && !isTimedOut && (
              <div className="p-4 mb-4 bg-[#000000] border border-amber-900/30 rounded-lg">
                <p className="text-white/90 mb-3">Sorry, it looks like {currentAgent.charAt(0).toUpperCase() + currentAgent.slice(1)} is having trouble responding. Would you like to try again?</p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1 border-white/20 hover:bg-white/5"
                    onClick={handleRetry}
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    Try again
                  </Button>
                </div>
              </div>
            )}
            
            {/* Show timeout error message */}
            {isTimedOut && (
              <div className="p-4 mb-4 bg-[#000000] border border-red-900/30 rounded-lg">
                <p className="text-white/90 mb-3">Sorry about that — I may have lost connection for a moment. Want to continue where we left off or start over?</p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-1 border-white/20 hover:bg-white/5"
                    onClick={handleRetry}
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    Yes, continue
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 border-white/20 hover:bg-white/5"
                    onClick={handleStartOver}
                  >
                    <ArrowRight className="h-3.5 w-3.5 mr-1" />
                    Start over
                  </Button>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <ChatInput 
            isTyping={isTyping || isTimedOut}
            currentAgent={currentAgent}
            onSendMessage={onSendMessage}
            messages={filteredMessages}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
