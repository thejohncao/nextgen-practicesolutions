
import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { MessageSquare, X } from 'lucide-react';
import { AiMessage } from '@/types/conversation';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import ChatBubble from './chat/ChatBubble';
import AgentSelectionScreen from './chat/AgentSelectionScreen';
import AgentLoadingIndicator from './chat/AgentLoadingIndicator';
import EmailCapture from './chat/EmailCapture';
import { useIsMobile } from '@/hooks/use-mobile';

const MAX_MESSAGES = 10; // Message limit before showing email capture

interface EnhancedAiChatProps {
  showPaths?: string[];
}

const EnhancedAiChat = ({ showPaths = ['/', '/solutions', '/academy', '/features'] }: EnhancedAiChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
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

  useEffect(() => {
    // Check if message limit is reached and we should show email capture
    if (messages.length >= MAX_MESSAGES && messages.filter(msg => msg.isUser).length >= 4) {
      setShowEmailCapture(true);
    }
  }, [messages]);
  
  const handleAgentSelect = (agentName: string) => {
    setCurrentAgent(agentName);
    
    // Add initial agent message based on selected agent
    const initialMessage = getAgentInitialMessage(agentName);
    
    setIsTyping(true);
    
    // Simulate typing delay for a more natural experience
    setTimeout(() => {
      setMessages([{
        text: initialMessage,
        isUser: false,
        agent: agentName,
        timestamp: new Date().toISOString(),
      }]);
      setIsTyping(false);
    }, 1000);
  };
  
  const getAgentInitialMessage = (agentName: string) => {
    switch(agentName.toLowerCase()) {
      case 'miles':
        return "Hi there — I'm Miles, your Practice Operations Specialist.\nIf you're looking to streamline front desk tasks, fix your schedule, or automate your recall system, I've got you covered.\n\nI can show you how to save 10+ hours a week by letting AI handle routine admin.\n\nWhat part of your practice operations is slowing you down the most right now?";
      case 'giselle':
        return "Hey, I'm Giselle — your Growth Strategist.\nIf you're trying to bring in more new patients, increase visibility, or turn leads into bookings, you're in the right place.\n\nI'll show you how to attract more of the patients you actually want — using automations that work 24/7.\n\nWant to grow with ads, social, referrals, or something else?";
      case 'devon':
        return "Devon here — I specialize in helping teams close more high-value treatment.\nWhether you're dealing with unaccepted treatment, objections, or patients ghosting after consults — we can fix that.\n\nI'll show you how to turn more \"I'll think about it\" into \"Let's get started.\"\n\nWhat's your #1 challenge right now when it comes to case acceptance?";
      case 'alma':
        return "Hi, I'm Alma — your training and team development assistant.\nI help practices build better teams with plug-and-play SOPs, onboarding tools, and training workflows.\n\nWhether you're hiring new staff or want to improve how your team runs, I've got templates and strategies ready.\n\nWant to talk hiring, onboarding, or team systems?";
      default:
        return "Hi there! How can I help you today?";
    }
  };
  
  const handleSendMessage = (userMessage: string) => {
    if (!userMessage.trim()) return;
    
    // Add user message
    const newUserMessage = {
      text: userMessage,
      isUser: true,
      agent: currentAgent || 'miles',
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    // Don't generate agent response if we're at the message limit
    if (messages.length >= MAX_MESSAGES - 1) {
      setShowEmailCapture(true);
      return;
    }
    
    // Simulate AI typing
    setIsTyping(true);
    
    // This would be where you'd call your actual AI service
    // For now we'll just simulate a response after a delay
    setTimeout(() => {
      const agentResponse = getSimulatedAgentResponse(currentAgent || 'miles', userMessage);
      
      setMessages(prev => [...prev, {
        text: agentResponse,
        isUser: false,
        agent: currentAgent || 'miles',
        timestamp: new Date().toISOString(),
      }]);
      
      setIsTyping(false);
    }, 1500);
  };
  
  const getSimulatedAgentResponse = (agent: string, userMessage: string) => {
    const responses: Record<string, string[]> = {
      'miles': [
        "Great question about operations. Many practices struggle with that exact issue. Let me share a few strategies that have worked well for our clients...",
        "I understand the challenges with scheduling. Here's what works: First, implement a confirmation system that reduces no-shows by 60%. Second, use these time-block templates...",
        "When it comes to recall systems, automation is key. Let me show you how we set up a 3-touch automated sequence that brought back 34% of overdue patients in just 30 days..."
      ],
      'giselle': [
        "That's a smart growth focus. Here's what's working right now: First, we need to audit your Google Business Profile to ensure it's optimized for local search visibility...",
        "For social media growth, content consistency is key. Let me share our 3-2-1 content framework that saves hours of planning time while boosting engagement by 40%...",
        "Paid ads are still one of the best ROI channels when done right. Let me show you our proven dental Facebook ad formula that's generating $14 return for every $1 spent..."
      ],
      'devon': [
        "Case acceptance is all about removing friction points. Based on what you've shared, here are 3 immediate changes you can make to your treatment presentation flow...",
        "Follow-up is where most practices lose momentum. Let me share our 9-5-2-1 follow-up sequence that's helped practices recover 42% of 'thinking about it' patients...",
        "Financing objections are common but solvable. Here's how we structure the conversation to make monthly payments the focus instead of total cost..."
      ],
      'alma': [
        "Team training is a crucial investment. Let me share our new hire onboarding checklist that reduces training time by 40% and improves retention significantly...",
        "SOPs are the foundation of consistent performance. Here's how we structure role-specific playbooks that make expectations crystal clear for every team member...",
        "For hiring, the job description is everything. Let me show you how we craft magnetic job posts that attract A-players instead of just candidates looking for any job..."
      ]
    };
    
    // Get random response for the selected agent
    const agentResponses = responses[agent.toLowerCase()] || responses.miles;
    const randomIndex = Math.floor(Math.random() * agentResponses.length);
    return agentResponses[randomIndex];
  };
  
  const handleCloseChat = () => {
    setIsOpen(false);
  };
  
  const handleEmailSubmit = (email: string) => {
    // This is where you'd send the email to your CRM or email service
    console.log(`Submitting email: ${email} for agent: ${currentAgent}`);
    
    // Show success notification
    toast({
      title: "Thank you!",
      description: "We've sent the resources to your inbox.",
      duration: 5000,
    });
    
    setEmailSubmitted(true);
  };
  
  const handleRequestExpert = () => {
    // This would connect to your scheduling system
    console.log(`User requested expert from chat with agent: ${currentAgent}`);
    
    // Show scheduling notification
    toast({
      title: "Let's schedule a call",
      description: "Opening our calendar to book your session.",
      duration: 5000,
    });
    
    // You could redirect to your scheduling page here
    window.open("https://nextgenpractice.org/demo", "_blank");
  };
  
  const handleResetChat = () => {
    setMessages([]);
    setCurrentAgent(null);
    setShowEmailCapture(false);
    setEmailSubmitted(false);
  };
  
  const renderChatToggleButton = () => {
    if (isOpen) return null;
    
    return (
      <div 
        className="fixed bottom-4 right-4 z-[100] cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Button className="h-14 w-14 rounded-full flex items-center justify-center shadow-lg bg-gradient-radial from-[#3A86FF] to-[#7FDBFF] hover:from-[#3A86FF] hover:to-[#4A90FF]">
          <MessageSquare className="text-white h-6 w-6" />
        </Button>
        <div className="absolute inset-0 rounded-full bg-gradient-radial blur-sm opacity-50 animate-pulse-slow"></div>
        <div className="absolute -inset-1 rounded-full bg-gradient-radial blur-md opacity-30 animate-pulse-slow"></div>
        
        {/* Enhanced ripple effect */}
        <div className="absolute inset-0 rounded-full">
          <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-[ripple_3s_ease-out_infinite]"></div>
          <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-[ripple_3s_ease-out_1.5s_infinite]"></div>
        </div>
      </div>
    );
  };
  
  return (
    <>
      {renderChatToggleButton()}
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={`p-0 gap-0 border-none ${isMobile ? 'w-[95vw] max-w-[95vw] h-[80vh] max-h-[85vh] rounded-lg' : 'w-[450px] max-w-[450px] h-[75vh] max-h-[75vh] rounded-xl'}`}>
          <div className="flex flex-col h-full bg-[#151719] text-gray-50 rounded-lg overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <span className="font-medium">NextGen AI Team</span>
              </div>
              <button 
                onClick={handleCloseChat}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
              {/* Agent Selection Screen */}
              {!currentAgent && (
                <AgentSelectionScreen onSelectAgent={handleAgentSelect} />
              )}
              
              {/* Chat Messages */}
              {currentAgent && (
                <>
                  {messages.map((message, index) => (
                    <ChatBubble key={index} message={message} />
                  ))}
                  
                  {isTyping && (
                    <AgentLoadingIndicator agent={currentAgent} />
                  )}
                  
                  {showEmailCapture && !emailSubmitted && (
                    <EmailCapture 
                      agentName={currentAgent} 
                      onSubmit={handleEmailSubmit}
                      onRequestExpert={handleRequestExpert}
                    />
                  )}
                  
                  {emailSubmitted && (
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg mt-4 animate-fade-in">
                      <p className="text-white">
                        Thanks! We've sent you the resources and a summary of our conversation. 
                      </p>
                      <Button 
                        onClick={handleResetChat} 
                        className="mt-3 bg-white/10 hover:bg-white/20 text-white"
                      >
                        Start New Conversation
                      </Button>
                    </div>
                  )}
                </>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat Input */}
            {currentAgent && !showEmailCapture && (
              <div className="border-t border-gray-800 p-3">
                <ChatInput 
                  isTyping={isTyping}
                  currentAgent={currentAgent}
                  onSendMessage={handleSendMessage}
                  messages={messages}
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EnhancedAiChat;
