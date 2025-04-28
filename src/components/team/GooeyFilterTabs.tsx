
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { agents } from '@/data/agents';
import TabNavigation from './gooey-tabs/TabNavigation';
import AgentContentPanel from './gooey-tabs/AgentContentPanel';
import { getAgentStageTitle, getAgentQuote, getAgentFullDescription, getSampleChat } from './gooey-tabs/utils';

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

  return (
    <div className={cn("relative py-12 mt-8", className)} id="ai-team">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Meet Your AI Team
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto px-4">
            Experience how our AI agents work together to grow your practice at every stage
            of the patient journey.
          </p>
        </div>

        <TabNavigation 
          agents={orderedAgents} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        {/* Content Area */}
        <div className="max-w-4xl mx-auto">
          {orderedAgents.map((agent, index) => (
            <AgentContentPanel
              key={agent.name}
              agent={agent}
              index={index}
              activeTab={activeTab}
              isTyping={isTyping}
              showChat={showChat}
              messages={getSampleChat(agent.name)}
              stageTitle={getAgentStageTitle(index)}
              quote={getAgentQuote(agent.name)}
              fullDescription={getAgentFullDescription(agent.name)}
            />
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
