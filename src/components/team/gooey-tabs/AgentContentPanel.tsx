
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Agent } from '@/types/agent';
import { getAgentCardColor, getAgentBorderColor } from '@/utils/colorUtils';
import { ChatMessage } from '@/data/patientJourney';
import AgentProfile from '../../journey/AgentProfile';
import ChatSimulation from '../../journey/ChatSimulation';
import TypingIndicator from '../../journey/TypingIndicator';

interface AgentContentPanelProps {
  agent: Agent;
  index: number;
  activeTab: number;
  isTyping: boolean;
  showChat: boolean;
  messages: ChatMessage[];
  stageTitle: string;
  quote: string;
  fullDescription: string;
}

const AgentContentPanel = ({ 
  agent,
  index,
  activeTab,
  isTyping,
  showChat,
  messages,
  stageTitle,
  quote,
  fullDescription
}: AgentContentPanelProps) => {
  // Get agent-specific styling classes
  const getAgentAccentColor = (color: string): string => {
    switch(color) {
      case 'green': return "from-green-500/30 to-green-700/10";
      case 'blue': return "from-blue-500/30 to-blue-700/10";
      case 'purple': return "from-purple-500/30 to-purple-700/10";
      case 'gold': return "from-amber-500/30 to-amber-700/10";
      default: return "from-white/20 to-white/5";
    }
  };
  
  const getAgentTextGradient = (color: string): string => {
    switch(color) {
      case 'green': return "from-green-300 to-green-100";
      case 'blue': return "from-blue-300 to-blue-100";
      case 'purple': return "from-purple-300 to-purple-100";
      case 'gold': return "from-amber-300 to-amber-100";
      default: return "from-white to-white/80";
    }
  };

  return (
    <motion.div
      key={agent.name}
      className={cn(
        "glass-card rounded-xl p-5 md:p-6 bg-gradient-to-br",
        getAgentCardColor(agent.color),
        getAgentBorderColor(agent.color)
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: activeTab === index ? 1 : 0,
        y: activeTab === index ? 0 : 20,
        display: activeTab === index ? 'block' : 'none'
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Agent-colored accent gradient at the top of the panel */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r",
        getAgentAccentColor(agent.color)
      )}></div>
      
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {/* Left Column: Agent Profile */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 mb-2 sm:mb-4">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              agent.color === 'green' ? "bg-green-500/20" :
              agent.color === 'blue' ? "bg-blue-500/20" :
              agent.color === 'purple' ? "bg-purple-500/20" : 
              "bg-amber-500/20"
            )}>
              <span className="font-bold text-white">{index + 1}</span>
            </div>
            <div>
              <h3 className={cn(
                "text-lg sm:text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                getAgentTextGradient(agent.color)
              )}>
                {stageTitle}
              </h3>
              <p className="text-sm text-white/70">{agent.name} - {agent.title}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-white/90">{fullDescription}</p>
            <p className={cn(
              "italic font-medium border-l-2 pl-3",
              agent.color === 'green' ? "border-green-500/50" :
              agent.color === 'blue' ? "border-blue-500/50" :
              agent.color === 'purple' ? "border-purple-500/50" : 
              "border-amber-500/50"
            )}>"{quote}"</p>
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
              messages={messages}
              onClose={() => {}}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AgentContentPanel;
