
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Agent } from '@/types/agent';
import { agents } from '@/data/agents';
import AgentProfile from '../journey/AgentProfile';
import ChatSimulation from '../journey/ChatSimulation';
import TypingIndicator from '../journey/TypingIndicator';
import { getAgentCardColor, getAgentBorderColor } from '@/utils/colorUtils';

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
  const getSampleChat = (agentName: string) => {
    return [
      { sender: 'user', message: `Hi ${agentName}, how can you help my practice?` },
      { sender: 'agent', message: getAgentResponse(agentName) },
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

  // Get color class based on agent
  const getGradientClass = (index: number) => {
    const agent = orderedAgents[index];
    return `from-${agent.color}-500/10 to-${agent.color}-500/5`;
  };

  // Get border accent class based on agent
  const getBorderAccentClass = (index: number) => {
    const agent = orderedAgents[index];
    return `border-${agent.color}-500/20`;
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

        {/* Gooey Filter Navigation */}
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
          
          {/* Tab Navigation with Gooey Effect */}
          <div 
            className="relative flex bg-white/10 backdrop-blur-md rounded-full p-2 gap-1"
            style={{ filter: 'url(#gooey)', minWidth: '280px' }}
          >
            {orderedAgents.map((agent, index) => (
              <button 
                key={agent.name}
                onClick={() => setActiveTab(index)}
                className={cn(
                  "relative z-10 flex-1 py-2 px-4 rounded-full text-white font-medium text-sm transition-all duration-300",
                  activeTab === index ? "text-white" : "text-white/60 hover:text-white/80"
                )}
              >
                {agent.name}
              </button>
            ))}
            
            {/* Moving Highlight Blob */}
            <motion.div 
              className="absolute top-2 bottom-2 rounded-full bg-gradient-to-r from-nextgen-purple to-nextgen-purple/70"
              initial={false}
              animate={{ 
                left: `calc(${activeTab * 25}% + 2px)`, 
                right: `calc(${(3 - activeTab) * 25}% + 2px)` 
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
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
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {agent.name} - {agent.title}
                    </h3>
                  </div>
                  
                  <AgentProfile agent={agent} />
                </div>
                
                {/* Right Column: Chat Preview */}
                <div className="flex flex-col justify-center">
                  {isTyping && activeTab === index && (
                    <TypingIndicator agent={agent.name} />
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
