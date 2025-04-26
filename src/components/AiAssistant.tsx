
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, MinusIcon, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the AI agents with their properties
const agents = {
  miles: {
    name: "Miles",
    color: "from-[#3A86FF] to-[#7FDBFF]",
    mood: "Calm, confident",
    intro: "Hi, I'm Miles, your practice management AI. How can I help optimize your dental practice today?"
  },
  giselle: {
    name: "Giselle",
    color: "from-[#00C896] to-[#00FFB2]",
    mood: "Energetic, strategic",
    intro: "Hello, Giselle here. I specialize in practice growth strategies. What specific goals are you looking to achieve?"
  },
  devon: {
    name: "Devon",
    color: "from-[#7B2CBF] to-[#B388EB]",
    mood: "Educational, warm trust",
    intro: "I'm Devon, your clinical education specialist. What clinical workflows or training can I help with today?"
  },
  alma: {
    name: "Alma", 
    color: "from-[#00B4D8] to-[#90E0EF]",
    mood: "Professional, motivating",
    intro: "Alma here. I'm focused on team performance and patient experience. How can I help improve your practice culture?"
  }
};

type AgentKey = keyof typeof agents;

interface Message {
  text: string;
  isUser: boolean;
  agent: AgentKey;
  timestamp: Date;
}

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<AgentKey>("miles");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { 
          text: agents[currentAgent].intro,
          isUser: false, 
          agent: currentAgent,
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Detect agent handoffs in messages and change the agent
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.isUser) {
        // Check for handoff phrases
        if (lastMessage.text.includes("Let me bring in Giselle") || 
            lastMessage.text.includes("Giselle here")) {
          setCurrentAgent("giselle");
        } else if (lastMessage.text.includes("Let me bring in Devon") || 
                  lastMessage.text.includes("Devon here")) {
          setCurrentAgent("devon");
        } else if (lastMessage.text.includes("Let me bring in Alma") || 
                  lastMessage.text.includes("Alma here")) {
          setCurrentAgent("alma");
        } else if (lastMessage.text.includes("Back to Miles") || 
                  lastMessage.text.includes("Miles here")) {
          setCurrentAgent("miles");
        }
      }
    }
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

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = {
      text: input,
      isUser: true,
      agent: currentAgent,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Mock AI response with a delay to simulate thinking
    setTimeout(() => {
      // In a real implementation, you would call your GPT API here
      // For now, we'll use mock responses with handoffs

      let aiResponse = "";
      let nextAgent = currentAgent;

      // Simple demonstration of agent switching logic
      if (input.toLowerCase().includes("growth") || input.toLowerCase().includes("strategy")) {
        aiResponse = "Let me bring in Giselle, our growth specialist.\n\nGiselle here! I'd be happy to discuss growth strategies for your dental practice. What specific areas are you looking to improve?";
        nextAgent = "giselle";
      } else if (input.toLowerCase().includes("train") || input.toLowerCase().includes("education") || input.toLowerCase().includes("learn")) {
        aiResponse = "Let me bring in Devon, our education expert.\n\nDevon here! I'd love to help with training or educational resources. What specific skills or knowledge areas are you interested in?";
        nextAgent = "devon";
      } else if (input.toLowerCase().includes("team") || input.toLowerCase().includes("culture") || input.toLowerCase().includes("staff")) {
        aiResponse = "Let me bring in Alma, our team performance specialist.\n\nAlma here! I'm excited to help with your team and culture questions. What specific challenges are you facing with your practice team?";
        nextAgent = "alma";
      } else if (input.toLowerCase().includes("back") || input.toLowerCase().includes("miles")) {
        aiResponse = "Back to Miles, your practice management AI.\n\nMiles here! How else can I assist with your practice management needs?";
        nextAgent = "miles";
      } else {
        // Default response if no handoff is triggered
        aiResponse = `I understand you're asking about "${input}". I can provide guidance on practice management, growth strategies, team culture, or clinical education. What specific aspect would you like to focus on?`;
      }

      setMessages(prev => [...prev, {
        text: aiResponse,
        isUser: false,
        agent: nextAgent,
        timestamp: new Date()
      }]);
      
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
      {/* Chat toggle button */}
      <div 
        className={`fixed bottom-6 right-6 z-50 cursor-pointer transition-all duration-500 ease-in-out`}
        onClick={toggleChat}
      >
        {!isOpen && (
          <div className="relative">
            <div 
              className={`h-14 w-14 rounded-full flex items-center justify-center shadow-lg
                bg-gradient-radial ${agents[currentAgent].color} animate-pulse-glow`}
            >
              <MessageSquare className="text-white h-6 w-6" />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-radial blur-sm opacity-50 animate-pulse-slow"></div>
            <div className="absolute -inset-1 rounded-full bg-gradient-radial blur-md opacity-30 animate-pulse-slow"></div>
            
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full">
              <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-[ripple_3s_ease-out_infinite]"></div>
              <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-[ripple_3s_ease-out_1.5s_infinite]"></div>
            </div>
          </div>
        )}
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
        <div 
          className={cn(
            "flex items-center justify-between px-4 py-3 rounded-t-xl bg-gradient-to-r",
            `${agents[currentAgent].color}`,
            isMinimized && "rounded-full"
          )}
        >
          {!isMinimized && (
            <>
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-full bg-gradient-radial ${agents[currentAgent].color} animate-pulse-slow`}>
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
            {/* Messages container */}
            <div className="bg-nextgen-dark overflow-y-auto p-4 h-[calc(100%-110px)]">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "mb-4 max-w-[85%] rounded-xl p-3",
                    message.isUser ? "bg-nextgen-dark/60 ml-auto" : 
                    `bg-gradient-to-br ${agents[message.agent].color}/10 mr-auto`
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
              <div ref={messagesEndRef}></div>
            </div>
            
            {/* Message input */}
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
