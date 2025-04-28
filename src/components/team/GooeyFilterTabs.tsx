
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Agent } from '@/types/agent';
import { agents } from '@/data/agents';
import AgentProfile from '../journey/AgentProfile';
import ChatSimulation from '../journey/ChatSimulation';
import TypingIndicator from '../journey/TypingIndicator';
import { getAgentCardColor, getAgentBorderColor } from '@/utils/colorUtils';
import { ChatMessage } from '@/data/patientJourney';

// Order agents to match patient journey
const orderedAgents = agents.sort((a, b) => {
  const order = { 'Giselle': 1, 'Miles': 2, 'Devon': 3, 'Alma': 4 };
  return order[a.name] - order[b.name];
});

interface GooeyFilterTabsProps {
  className?: string;
}

const GooeyFilterTabs = ({ className }: GooeyFilterTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Reset and show typing animation when tab changes
  useEffect(() => {
    setShowChat(false);
    setIsTyping(true);
    
    const typingTimer = setTimeout(() => {
      setIsTyping(false);
      setShowChat(true);
    }, 2000);
    
    return () => clearTimeout(typingTimer);
  }, [activeTab]);

  // Get sample chat for the active agent
  const getSampleChat = (agentName: string): ChatMessage[] => {
    const agentResponses: Record<string, string> = {
      'Giselle': "Fantastic choice! Let me help you schedule a complimentary consultation so we can get you glowing.",
      'Miles': "Of course! Let's find a new time that works best for you. I've sent you a few options to choose from.",
      'Devon': "You're in great hands. I can walk you through a customized plan and flexible options to help you feel confident moving forward.",
      'Alma': "No problem! I have an easy step-by-step training ready for you. You can start anytime, and I'll guide you through it."
    };

    const userMessages: Record<string, string> = {
      'Giselle': "I'm interested in a whitening treatment.",
      'Miles': "Can I reschedule my appointment?",
      'Devon': "I'm thinking about Invisalign, but not sure.",
      'Alma': "How do I learn the new front office workflow?"
    };

    return [
      { sender: "visitor", message: userMessages[agentName] || `Hi ${agentName}, how can you help my practice?` },
      { sender: "agent", message: agentResponses[agentName] || getAgentResponse(agentName) }
    ];
  };

  const getAgentResponse = (agentName: string) => {
    switch(agentName) {
      case 'Giselle': 
        return "I'll grow your practice by automating lead capture, nurturing, and converting them into loyal patients without manual effort.";
      case 'Miles': 
        return "I'll keep your schedule full and your front office running smoothly with smart scheduling, automated recall, and patient communication.";
      case 'Devon': 
        return "I'll boost your case acceptance rates with pre-consultation preparation, financing options, and automated follow-ups.";
      case 'Alma': 
        return "I'll ensure your team delivers consistent excellence through automated onboarding, training, and best practice protocols.";
      default: 
        return "I'm here to help your practice grow and thrive.";
    }
  };

  // Get agent stage title
  const getAgentStageTitle = (index: number): string => {
    switch(index) {
      case 0: return "01 - Attract & Engage";
      case 1: return "02 - Onboard & Convert";
      case 2: return "03 - Retain & Grow";
      case 3: return "04 - Train & Scale";
      default: return "";
    }
  };

  // Get agent quote
  const getAgentQuote = (agentName: string): string => {
    switch(agentName) {
      case 'Giselle': return "Growth isn't accidental. It's a deliberate strategy we execute daily.";
      case 'Miles': return "Efficiency isn't luck — it's the result of systems that work smarter for you.";
      case 'Devon': return "Growth isn't just new — it's maximizing the trust you've already built.";
      case 'Alma': return "Your growth is only as strong as the team you train behind it.";
      default: return "";
    }
  };

  // Get full agent description
  const getAgentFullDescription = (agentName: string): string => {
    switch(agentName) {
      case 'Giselle': return "Turns leads into loyal patients by nurturing every opportunity from first click to lifelong care.";
      case 'Miles': return "Streamlines front office operations, ensuring seamless scheduling, paperwork, and patient onboarding every step of the way.";
      case 'Devon': return "Strengthens patient loyalty and increases treatment acceptance by guiding patients through their next steps with clarity and care.";
      case 'Alma': return "Equips your team with proven training, SOPs, and continuous education to operate at the highest level.";
      default: return "";
    }
  };

  // Get folder tab color based on agent
  const getTabBgClass = (index: number, isActive: boolean): string => {
    if (!isActive) return "bg-white/5";
    
    const agent = orderedAgents[index];
    switch(agent.color) {
      case 'green': return "bg-green-500/10";
      case 'blue': return "bg-blue-500/10";
      case 'purple': return "bg-purple-500/10";
      case 'gold': return "bg-amber-500/10";
      default: return "bg-white/10";
    }
  };

  // Get tab border color based on agent
  const getTabBorderClass = (index: number, isActive: boolean): string => {
    if (!isActive) return "border-white/10";
    
    const agent = orderedAgents[index];
    switch(agent.color) {
      case 'green': return "border-green-500/20";
      case 'blue': return "border-blue-500/20";
      case 'purple': return "border-purple-500/20";
      case 'gold': return "border-amber-500/20";
      default: return "border-white/20";
    }
  };

  return (
    <div className={cn("relative py-16", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Meet Your AI Team
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto px-4">
            Experience how our AI agents work together to grow your practice at every stage
            of the patient journey.
          </p>
        </div>

        {/* Gooey Filter Tab Navigation */}
        <div className="relative flex justify-center mb-12">
          {/* SVG Filter for Gooey Effect */}
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <filter id="gooey">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="gooey"
              />
            </filter>
          </svg>
          
          {/* Folder-style Tab Navigation with Gooey Effect */}
          <div className="relative flex space-x-1 backdrop-blur-md rounded-lg overflow-visible gooey-blob">
            {orderedAgents.map((agent, index) => (
              <motion.button 
                key={agent.name}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "relative z-10 flex flex-col justify-center items-center px-6 py-3 rounded-tl-lg rounded-tr-lg",
                  "border-t border-l border-r transition-all duration-300",
                  "hover:bg-white/10",
                  getTabBgClass(index, activeTab === index),
                  getTabBorderClass(index, activeTab === index),
                  activeTab === index ? "text-white font-medium" : "text-white/70"
                )}
                initial={false}
                animate={{ 
                  y: activeTab === index ? -3 : 0,
                  scale: activeTab === index ? 1.03 : 1,
                  zIndex: activeTab === index ? 20 : 10
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <span className="font-bold text-base">{agent.name}</span>
                <span className="text-xs opacity-70">{agent.title}</span>
                
                {/* Active Tab Indicator */}
                {activeTab === index && (
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-0.5"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: agent.color === 'green' ? 'linear-gradient(to right, rgba(34, 197, 94, 0.3), rgba(34, 197, 94, 0.7))'
                        : agent.color === 'blue' ? 'linear-gradient(to right, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.7))'
                        : agent.color === 'purple' ? 'linear-gradient(to right, rgba(168, 85, 247, 0.3), rgba(168, 85, 247, 0.7))'
                        : 'linear-gradient(to right, rgba(251, 191, 36, 0.3), rgba(251, 191, 36, 0.7))'
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto">
          {orderedAgents.map((agent, index) => (
            <motion.div
              key={agent.name}
              className={`glass-card rounded-xl p-5 md:p-6 bg-gradient-to-br ${getAgentCardColor(agent.color)} border ${getAgentBorderColor(agent.color)}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: activeTab === index ? 1 : 0,
                y: activeTab === index ? 0 : 20,
                display: activeTab === index ? 'block' : 'none'
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {/* Left Column: Agent Profile */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3 mb-2 sm:mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-${agent.color}-500/20`}>
                      <span className="font-bold text-white">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">{getAgentStageTitle(index)}</h3>
                      <p className="text-sm text-white/70">{agent.name} - {agent.title}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-white/90">{getAgentFullDescription(agent.name)}</p>
                    <p className="italic text-white/80">"{getAgentQuote(agent.name)}"</p>
                    <AgentProfile agent={agent} />
                  </div>
                </div>
                
                {/* Right Column: Chat Preview */}
                <div className="flex flex-col justify-center">
                  {isTyping && activeTab === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <TypingIndicator agent={agent.name} />
                    </motion.div>
                  )}
                  
                  {showChat && activeTab === index && (
                    <ChatSimulation
                      agentName={agent.name}
                      agentRole={agent.title}
                      messages={getSampleChat(agent.name)}
                      onClose={() => {}}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button 
            className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            onClick={() => window.location.href = '/solutions'}
          >
            Meet Your Executive Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default GooeyFilterTabs;
