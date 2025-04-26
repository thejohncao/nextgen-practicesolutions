
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

  // Make the component accessible from outside
  useEffect(() => {
    // Add a data-testid to make it easier to find this component
    const chatToggleButton = document.querySelector('[data-testid="chat-toggle"]');
    if (!chatToggleButton) {
      const buttonElement = document.createElement('div');
      buttonElement.setAttribute('data-testid', 'chat-toggle');
      buttonElement.style.display = 'none';
      document.body.appendChild(buttonElement);
      
      // Add click event listener to this hidden element
      buttonElement.addEventListener('click', () => {
        console.log('Chat toggle clicked via data-testid element');
        setIsOpen(true);
        setIsMinimized(false);
      });
    }
  }, []);

  return (
    <>
      {/* Chat toggle button */}
      <div 
        className={`fixed bottom-6 right-6 z-50 cursor-pointer transition-all duration-500 ease-in-out`}
        onClick={toggleChat}
        data-testid="chat-toggle-visible"
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
              {messages.length === 0 && (
                <div className="p-4 rounded-lg bg-white/5 text-white/90 mb-4">
                  <p className="mb-3">Hey, I'm Miles — your AI Concierge here at NextGen.</p>
                  <p className="mb-4">What can I help you with today?</p>
                  
                  <div className="space-y-2">
                    <button onClick={() => sendMessage("I want to learn about Practice Growth Packages")}
                      className="w-full text-left px-3 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors">
                      ➔ Learn about Practice Growth Packages
                    </button>
                    <button onClick={() => sendMessage("Tell me about the Academy & Certification")}
                      className="w-full text-left px-3 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors">
                      ➔ Explore the Academy & Certification
                    </button>
                    <button onClick={() => sendMessage("I'd like to book a Discovery Call")} 
                      className="w-full text-left px-3 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors">
                      ➔ Book a Discovery Call
                    </button>
                    <button onClick={() => sendMessage("I have a question")}
                      className="w-full text-left px-3 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors">
                      ➔ Ask a Quick Question
                    </button>
                  </div>
                  <p className="mt-3 text-sm text-white/70">(Tap an option to get started!)</p>
                </div>
              )}
            
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
              messages={messages}
            />
          </>
        )}
      </div>
    </>
  );
};

export default AiAssistant;
