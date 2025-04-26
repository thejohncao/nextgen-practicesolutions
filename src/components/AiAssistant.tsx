
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useAiConversation } from '@/hooks/useAiConversation';
import AiMessageBubble from './AiMessageBubble';
import TypingIndicator from './TypingIndicator';
import ChatToggleButton from './ChatToggleButton';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    messages, 
    isTyping, 
    currentAgent, 
    error, 
    sendMessage 
  } = useAiConversation();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const minimizeChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
  };

  return (
    <>
      {/* Chat toggle button */}
      <div 
        className={`fixed bottom-6 right-6 z-50 cursor-pointer transition-all duration-500 ease-in-out`}
        onClick={toggleChat}
      >
        <ChatToggleButton 
          isOpen={isOpen} 
          currentAgent={currentAgent}
          onClick={toggleChat}
        />
      </div>

      {/* Chat window */}
      <div 
        className={cn(
          "fixed z-50 transition-all duration-500 ease-in-out shadow-2xl",
          isOpen ? "bottom-6 right-6 opacity-100" : "bottom-[-50vh] right-[-50vh] opacity-0",
          isMinimized ? "bottom-6 right-6 h-14 w-14" : "h-[550px] w-[350px] md:w-[400px]"
        )}
      >
        {/* Chat header */}
        <ChatHeader 
          isMinimized={isMinimized}
          currentAgent={currentAgent}
          onMinimize={minimizeChat}
          onClose={() => setIsOpen(false)}
        />
        
        {!isMinimized && (
          <>
            {/* Messages container */}
            <div className="bg-nextgen-dark overflow-y-auto p-4 h-[calc(100%-110px)]">
              {messages.map((message, index) => (
                <AiMessageBubble key={index} message={message} />
              ))}
              
              {isTyping && <TypingIndicator agent={currentAgent} />}
              
              {error && (
                <div className="bg-red-900/20 border border-red-500/30 p-3 rounded-xl text-white/80 text-sm mb-4">
                  {error}
                </div>
              )}
              
              <div ref={messagesEndRef}></div>
            </div>
            
            {/* Message input */}
            <ChatInput 
              isTyping={isTyping}
              currentAgent={currentAgent}
              onSendMessage={sendMessage}
            />
          </>
        )}
      </div>
    </>
  );
};

export default AiAssistant;
