
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

  // Folder file styling for agent content
  const getAgentFolderStyle = (color: string): string => {
    switch(color) {
      case 'green': return "border-l-green-500/30";
      case 'blue': return "border-l-blue-500/30";
      case 'purple': return "border-l-purple-500/30";
      case 'gold': return "border-l-amber-500/30";
      default: return "border-l-white/20";
    }
  };

  return (
    <motion.div
      key={agent.name}
      className={cn(
        "rounded-xl rounded-tl-none p-4 md:p-5 border border-t-0 border-white/10",
        "bg-[#111827]/95 backdrop-blur-md"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: activeTab === index ? 1 : 0,
        y: activeTab === index ? 0 : 20,
        display: activeTab === index ? 'block' : 'none'
      }}
      transition={{ duration: 0.5 }}
    >
      {/* File header style element */}
      <div className="flex items-center mb-3 pb-2 border-b border-white/10">
        <div className={cn(
          "w-3 h-3 rounded-full mr-2",
          agent.color === 'green' ? "bg-green-400" :
          agent.color === 'blue' ? "bg-blue-400" :
          agent.color === 'purple' ? "bg-purple-400" : 
          "bg-amber-400"
        )}></div>
        <div className={cn(
          "text-lg font-semibold bg-gradient-to-r bg-clip-text text-transparent",
          getAgentTextGradient(agent.color)
        )}>
          {stageTitle}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {/* Left Column: Agent Profile and Description */}
        <div className={cn(
          "space-y-4 rounded-md border-l-2 pl-3 py-1",
          getAgentFolderStyle(agent.color)
        )}>
          <div className="flex items-center gap-3 mb-1">
            <div className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center",
              agent.color === 'green' ? "bg-green-500/20" :
              agent.color === 'blue' ? "bg-blue-500/20" :
              agent.color === 'purple' ? "bg-purple-500/20" : 
              "bg-amber-500/20"
            )}>
              <span className="font-bold text-white">{index + 1}</span>
            </div>
            <div>
              <h3 className="font-bold text-white">
                {agent.name} - {agent.title}
              </h3>
            </div>
          </div>
          
          <div className="space-y-3">
            {/* Removed both the fullDescription paragraph and the quote paragraph */}
            <AgentProfile agent={agent} />
          </div>
        </div>
        
        {/* Right Column: Chat Preview - styled like a chat window in folder */}
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
