
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ChatToggleButton from './ChatToggleButton';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import AiMessageBubble from './AiMessageBubble';
import { useAiConversation } from '../hooks/useAiConversation';
import { Dialog, DialogContent } from './ui/dialog';
import EmailCollectionDialog from './EmailCollectionDialog';
import { useIsMobile } from "../hooks/use-mobile";
import TypingIndicator from './TypingIndicator';
import { Button } from './ui/button';
import { RefreshCw, ArrowRight } from 'lucide-react';
import AgentChatPreview from './agent-launcher/AgentChatPreview';

interface AiAssistantProps {
  showPaths?: string[];
}

const AiAssistant = ({ showPaths = ['/', '/solutions', '/academy', '/features'] }: AiAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [hasShownEmailPrompt, setHasShownEmailPrompt] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { 
    messages, 
    sendMessage, 
    isTyping, 
    currentAgent, 
    isTimedOut,
    handleRetry,
    handleStartOver,
    changeAgent,
    clearConversation
  } = useAiConversation();
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Determine if we should show the assistant based on current path
  const shouldShow = showPaths.includes(location.pathname);

  useEffect(() => {
    const listener = () => {
      setIsOpen(true);
    };
    
    document.addEventListener('open-miles-chat', listener);
    return () => {
      document.removeEventListener('open-miles-chat', listener);
    };
  }, []);
  
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Handle agent change
  const handleAgentChange = (agentName: string) => {
    changeAgent(agentName);
  };

  // Modified function to only trigger email dialog for explicit signup requests
  const handleSendMessage = (message: string) => {
    // We only potentially show email dialog for explicit "get started" or "sign up" messages
    const isExplicitSignupRequest = 
      message.toLowerCase().includes('get started') || 
      message.toLowerCase().includes('sign up') ||
      message.toLowerCase().includes('register') ||
      message.toLowerCase().includes('join');
      
    // Show email dialog only on explicit signup request and if never shown before
    if (isExplicitSignupRequest && !hasShownEmailPrompt) {
      setHasShownEmailPrompt(true);
      setTimeout(() => setShowEmailDialog(true), 2000);
    }
    
    sendMessage(message);
  };

  // Return null if we shouldn't show on this path
  if (!shouldShow) return null;

  // Check if we should show the welcome message with agent preview
  const showAgentPreview = messages.length === 1 && !messages[0].isUser;

  return (
    <>
      <ChatToggleButton 
        isOpen={isOpen} 
        currentAgent={currentAgent} 
        onClick={() => setIsOpen(!isOpen)} 
        isTyping={isTyping}
      />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={`p-0 gap-0 border-none ${isMobile ? 'w-[95vw] max-w-[95vw] h-[80vh] max-h-[85vh] rounded-lg' : 'w-[450px] max-w-[450px] h-[75vh] max-h-[75vh] rounded-xl'}`}>
          <div className="flex flex-col h-full bg-[#151719] text-gray-50 rounded-lg overflow-hidden">
            <ChatHeader 
              isMinimized={isMinimized} 
              currentAgent={currentAgent} 
              onChangeAgent={handleAgentChange}
              onMinimize={(e) => setIsMinimized(!isMinimized)}
              onClose={() => setIsOpen(false)} 
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
                  onSelectSuggestion={(suggestion) => sendMessage(suggestion)}
                />
              )}
              
              {isTyping && (
                <TypingIndicator agent={currentAgent} />
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
              onSendMessage={handleSendMessage}
              messages={messages}
            />
          </div>
        </DialogContent>
      </Dialog>
      
      <EmailCollectionDialog
        triggerText=""
        buttonClassName="hidden"
        open={showEmailDialog}
        onOpenChange={setShowEmailDialog}
      />
    </>
  );
};

export default AiAssistant;
