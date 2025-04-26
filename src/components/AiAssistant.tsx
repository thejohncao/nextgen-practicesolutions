
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, MinusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { agents, AgentKey } from '../utils/agentStyles';
import { useChat } from '@/hooks/useChat';
import { ChatMessage } from './chat/ChatMessage';
import { ChatInput } from './chat/ChatInput';

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const { messages, isTyping, currentAgent, sendMessage, initializeChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      <div 
        className={`fixed bottom-6 right-6 z-50 cursor-pointer transition-all duration-500 ease-in-out`}
        onClick={toggleChat}
      >
        {!isOpen && (
          <div className="relative">
            <div className={cn(
              "h-14 w-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-1000 ease-in-out",
              agents[currentAgent].colorClass
            )}>
              <MessageSquare className="text-white h-6 w-6" />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-radial blur-sm opacity-50 animate-pulse-slow"></div>
            <div className="absolute -inset-1 rounded-full bg-gradient-radial blur-md opacity-30 animate-pulse-slow"></div>
            
            <div className="absolute inset-0 rounded-full">
              <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-[ripple_3s_ease-out_infinite]"></div>
              <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-[ripple_3s_ease-out_1.5s_infinite]"></div>
            </div>
          </div>
        )}
      </div>

      <div 
        className={cn(
          "fixed z-50 transition-all duration-500 ease-in-out shadow-2xl",
          isOpen ? "bottom-6 right-6 opacity-100" : "bottom-[-50vh] right-[-50vh] opacity-0",
          isMinimized ? "bottom-6 right-6 h-14 w-14" : "h-[550px] w-[350px] md:w-[400px]"
        )}
      >
        <div 
          className={cn(
            "flex items-center justify-between px-4 py-3 rounded-t-xl transition-all duration-1000 ease-in-out",
            agents[currentAgent].colorClass,
            isMinimized && "rounded-full"
          )}
        >
          {!isMinimized && (
            <>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-radial animate-pulse-slow" style={{
                  background: `radial-gradient(circle, ${agents[currentAgent].baseColor}, ${agents[currentAgent].gradientColor})`
                }}>
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                  </div>
                </div>
                <div className="text-white font-medium">{agents[currentAgent].name}</div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={minimizeChat} 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <MinusIcon className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </>
          )}
        </div>
        
        {!isMinimized && (
          <>
            <div className="bg-nextgen-dark overflow-y-auto p-4 h-[calc(100%-110px)]">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {isTyping && (
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-xl mr-auto max-w-[85%] mb-4">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 rounded-full bg-white/70 animate-bounce"></div>
                    <div className="h-2 w-2 rounded-full bg-white/70 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="h-2 w-2 rounded-full bg-white/70 animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>
            
            <ChatInput onSend={sendMessage} currentAgent={currentAgent} />
          </>
        )}
      </div>
    </>
  );
};

export default AiAssistant;

