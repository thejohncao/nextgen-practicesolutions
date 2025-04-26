
import React, { useState, useRef, useEffect } from 'react';
import AgentAvatar from '@/components/AgentAvatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { agents } from '@/data/agents';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  agentName: string;
}

interface FloatingChatPanelProps {
  isOpen: boolean;
  onAgentChange: (agentName: string) => void;
}

const initialMessages: Message[] = [
  { 
    id: '1', 
    text: "Hi there! I'm Miles, your practice management assistant. How can I help you today?", 
    sender: 'agent',
    agentName: 'Miles'
  }
];

const FloatingChatPanel = ({ isOpen, onAgentChange }: FloatingChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate agent responses based on keywords
  const determineAgentResponse = (message: string): { responseText: string; agentName: string } => {
    const lowerMessage = message.toLowerCase();
    
    // Simple keyword matching for different agents
    if (lowerMessage.includes('schedule') || lowerMessage.includes('appointment') || lowerMessage.includes('booking')) {
      return { 
        responseText: "I can definitely help with scheduling. When would you like to book your appointment?", 
        agentName: 'Miles' 
      };
    } else if (lowerMessage.includes('marketing') || lowerMessage.includes('leads') || lowerMessage.includes('growth')) {
      return { 
        responseText: "This is Giselle speaking. I can help with your marketing needs. Would you like to discuss growth strategies?", 
        agentName: 'Giselle' 
      };
    } else if (lowerMessage.includes('treatment') || lowerMessage.includes('patient') || lowerMessage.includes('case')) {
      return { 
        responseText: "Devon here. Let's talk about improving your patient experiences and treatment acceptance rates.", 
        agentName: 'Devon' 
      };
    } else if (lowerMessage.includes('training') || lowerMessage.includes('learn') || lowerMessage.includes('team')) {
      return { 
        responseText: "Hi, I'm Alma. I can help with staff training and system optimization. What does your team need?", 
        agentName: 'Alma' 
      };
    }
    
    // Default back to Miles
    return { 
      responseText: "Thanks for your message. How else can I assist with your practice management today?", 
      agentName: 'Miles' 
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      agentName: ''
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate agent thinking
    setTimeout(() => {
      const { responseText, agentName } = determineAgentResponse(input);
      
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'agent',
        agentName
      };
      
      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
      onAgentChange(agentName);
      
      const newQuestionCount = questionCount + 1;
      setQuestionCount(newQuestionCount);
      
      // Show CTA after 2 questions
      if (newQuestionCount === 2) {
        setTimeout(() => {
          const ctaMessage: Message = {
            id: (Date.now() + 2).toString(),
            text: "Would you like to schedule a strategy call with our team? We can help you implement these ideas in your practice.",
            sender: 'agent',
            agentName: 'Miles'
          };
          setMessages(prev => [...prev, ctaMessage]);
          onAgentChange('Miles');
        }, 2000);
      }
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-nextgen-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col animate-fade-in">
      {/* Chat header */}
      <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="flex-shrink-0">
          <AgentAvatar name={messages[messages.length - 1]?.agentName || 'Miles'} role="AI Assistant" isActive={isTyping} />
        </div>
        <div>
          <h3 className="font-medium">NextGen AI Team</h3>
          <p className="text-sm text-white/70">Always available to help</p>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'agent' && (
              <div className="flex-shrink-0 mr-2 mt-1">
                <AgentAvatar 
                  name={message.agentName} 
                  role="" 
                  isActive={false} 
                />
              </div>
            )}
            
            <div 
              className={`
                max-w-[70%] rounded-2xl px-4 py-2
                ${message.sender === 'user' 
                  ? 'bg-nextgen-purple/30 text-white ml-2' 
                  : 'bg-white/10 text-white'}
              `}
            >
              {message.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex-shrink-0 mr-2">
              <AgentAvatar name="Miles" role="" isActive={true} />
            </div>
            <div className="bg-white/10 text-white rounded-2xl px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef}></div>
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Input
            className="flex-1 bg-white/10 border-white/20"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="bg-nextgen-purple hover:bg-nextgen-purple/80"
            disabled={isTyping || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FloatingChatPanel;
