
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { agents } from '@/data/agents';
import TabNavigation from './gooey-tabs/TabNavigation';
import AgentContentPanel from './gooey-tabs/AgentContentPanel';
import { getAgentStageTitle, getAgentQuote, getAgentFullDescription, getSampleChat } from './gooey-tabs/utils';
import TeamSectionHeader from './TeamSectionHeader';

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
    }, 1200);
    
    return () => clearTimeout(typingTimer);
  }, [activeTab]);

  return (
    <div className={cn("relative py-8 mt-0 bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-sm", className)} id="ai-team">
      <div className="container mx-auto px-4">
        <TeamSectionHeader />

        <div className="mt-6 mb-10 max-w-4xl mx-auto">
          <TabNavigation 
            agents={orderedAgents} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
  
          {/* Content Area */}
          <div className="bg-transparent max-w-4xl mx-auto">
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
