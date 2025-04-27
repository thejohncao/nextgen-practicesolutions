
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

interface AiAssistantProps {
  showPaths?: string[];
}

const AiAssistant = ({ showPaths = ['/', '/solutions', '/academy', '/features'] }: AiAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isTyping, currentAgent } = useAiConversation();
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
  }, [messages, isOpen]);

  // Return null if we shouldn't show on this path
  if (!shouldShow) return null;

  return (
    <>
      <ChatToggleButton 
        isOpen={isOpen} 
        currentAgent={currentAgent} 
        onClick={() => setIsOpen(!isOpen)} 
      />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={`p-0 gap-0 border-none ${isMobile ? 'w-[95vw] max-w-[95vw] h-[80vh] max-h-[85vh] rounded-lg' : 'w-[450px] max-w-[450px] h-[75vh] max-h-[75vh] rounded-xl'}`}>
          <div className="flex flex-col h-full bg-[#151719] text-gray-50 rounded-lg overflow-hidden">
            <ChatHeader 
              isMinimized={isMinimized} 
              currentAgent={currentAgent} 
              onMinimize={(e) => setIsMinimized(!isMinimized)}
              onClose={() => setIsOpen(false)} 
            />
            
            <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
              {messages.map((message, index) => (
                <AiMessageBubble
                  key={index}
                  message={message}
                />
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-nextgen-dark flex items-center justify-center shrink-0 border border-nextgen-purple/20">
                    <span className="text-sm font-medium text-nextgen-purple">M</span>
                  </div>
                  <div className="px-4 py-3 bg-nextgen-dark/50 backdrop-blur rounded-tr-xl rounded-br-xl rounded-bl-xl max-w-[85%] typing-indicator">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-white/30 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <ChatInput 
              isTyping={isTyping}
              currentAgent={currentAgent}
              onSendMessage={(message) => {
                if (messages.length === 0) {
                  // This is the first message, show email dialog after sending
                  setShowEmailDialog(true);
                }
                sendMessage(message);
              }}
              messages={messages}
            />
          </div>
        </DialogContent>
      </Dialog>
      
      <EmailCollectionDialog
        triggerText=""
        buttonClassName="hidden"
      />
    </>
  );
};

export default AiAssistant;
