
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
  
  // Check if we should show the welcome message with agent preview
  // Show agent preview for first message only if it's the AI welcome message
  const showAgentPreview = messages.length === 1 && !messages[0].isUser;

  // Scroll to bottom when messages change
  React.useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping, timeoutLevel]);

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
            {/* Show conversation messages */}
            {messages.map((message, index) => (
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
            
            {isTyping && !isTimedOut && (
              <AgentLoadingIndicator agent={currentAgent} timeoutLevel={timeoutLevel} />
            )}
            
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
            messages={messages}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
