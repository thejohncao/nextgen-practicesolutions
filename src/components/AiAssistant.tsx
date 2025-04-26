import React, { useState, useRef } from 'react';
import { MessageSquare, X, MinusIcon, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChat } from '@/hooks/useChat';
import { agents } from '@/config/agents';
import ChatCTA from './ChatCTA';

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, currentAgent, addMessage, showCTA } = useChat();

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

  const sendMessage = async () => {
    if (input.trim() === "") return;

    addMessage(input, true, currentAgent);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "";

      if (input.toLowerCase().includes("growth") || input.toLowerCase().includes("strategy")) {
        aiResponse = "Let me bring in Giselle, our growth specialist.";
      } else if (input.toLowerCase().includes("train") || input.toLowerCase().includes("education")) {
        aiResponse = "Let me bring in Devon, our education expert.";
      } else if (input.toLowerCase().includes("team") || input.toLowerCase().includes("culture")) {
        aiResponse = "Let me bring in Alma, our team performance specialist.";
      } else {
        aiResponse = `I understand you're asking about "${input}". I can provide guidance on practice management, growth strategies, team culture, or clinical education. What specific aspect would you like to focus on?`;
      }

      addMessage(aiResponse, false, currentAgent);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div 
        className="fixed bottom-6 right-6 z-50 cursor-pointer transition-all duration-500 ease-in-out"
        onClick={toggleChat}
      >
        {!isOpen && (
          <div className="relative">
            <div 
              className={cn(
                "h-14 w-14 rounded-full flex items-center justify-center shadow-lg bg-gradient-radial",
                agents[currentAgent].color,
                "transition-all duration-1000 ease-in-out"
              )}
            >
              <MessageSquare className="text-white h-6 w-6" />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-radial blur-sm opacity-50 animate-pulse-slow"></div>
            
            <div className="absolute -inset-1 rounded-full">
              <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-[ripple_4s_ease-out_infinite]"></div>
              <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-[ripple_4s_ease-out_2s_infinite]"></div>
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
            "flex items-center justify-between px-4 py-3 rounded-t-xl bg-gradient-to-r",
            agents[currentAgent].color,
            "transition-all duration-1000 ease-in-out",
            isMinimized && "rounded-full"
          )}
        >
          {!isMinimized && (
            <>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-8 w-8 rounded-full bg-gradient-radial",
                  agents[currentAgent].color,
                  "transition-all duration-1000 ease-in-out",
                  "animate-pulse-slow"
                )}>
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
                <div 
                  key={index}
                  className={cn(
                    "mb-4 max-w-[85%] rounded-xl p-3",
                    message.isUser ? "bg-nextgen-dark/60 ml-auto" : 
                    `bg-gradient-to-br ${agents[message.agent].color}/10 mr-auto`,
                    "transition-all duration-300 ease-in-out"
                  )}
                >
                  {!message.isUser && (
                    <div className="font-semibold text-sm mb-1 text-white/90">
                      {agents[message.agent].name}
                    </div>
                  )}
                  <div className="whitespace-pre-wrap text-white/90">
                    {message.text}
                  </div>
                </div>
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
              {showCTA && <ChatCTA />}
              <div ref={messagesEndRef}></div>
            </div>
            
            <div className="p-3 border-t border-white/10 bg-nextgen-dark/80">
              <div className="relative">
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white/90 
                    placeholder-white/40 focus:outline-none focus:ring-1 resize-none"
                  placeholder="Ask a question..."
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button 
                  className={cn(
                    "absolute right-2 top-[50%] translate-y-[-50%] p-2 rounded-full",
                    "bg-gradient-to-r", 
                    agents[currentAgent].color,
                    input.trim() ? "opacity-100" : "opacity-50"
                  )}
                  onClick={sendMessage}
                  disabled={!input.trim()}
                >
                  <Send className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AiAssistant;
