
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Agent } from '@/types/agent';
import AgentProfile from '../../journey/AgentProfile';
import ChatSimulation from '../../journey/ChatSimulation';
import TypingIndicator from '../../journey/TypingIndicator';
import { ChatMessage } from '@/data/patientJourney';
import { Folder, FileText } from 'lucide-react';

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
      case 'green': return "from-green-500/10 to-green-500/5";
      case 'blue': return "from-blue-500/10 to-blue-500/5";
      case 'purple': return "from-purple-500/10 to-purple-500/5";
      case 'gold': return "from-amber-500/10 to-amber-500/5";
      default: return "from-white/5 to-white/0";
    }
  };

  // Get folder side color
  const getFolderSideColor = (color: string): string => {
    switch(color) {
      case 'green': return "border-l-green-500/30";
      case 'blue': return "border-l-blue-500/30";
      case 'purple': return "border-l-purple-500/30";
      case 'gold': return "border-l-amber-500/30";
      default: return "border-l-white/20";
    }
  };
  
  // Get icon color
  const getIconColor = (color: string): string => {
    switch(color) {
      case 'green': return "text-green-400";
      case 'blue': return "text-blue-400";
      case 'purple': return "text-purple-400";
      case 'gold': return "text-amber-400";
      default: return "text-white/70";
    }
  };

  return (
    <motion.div
      key={agent.name}
      className={cn(
        "rounded-xl rounded-tl-none p-4",
        "bg-black/80 border border-t-0 border-white/10"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: activeTab === index ? 1 : 0,
        y: activeTab === index ? 0 : 20,
        display: activeTab === index ? 'block' : 'none'
      }}
      transition={{ duration: 0.5 }}
    >
      {/* File header with simulated title bar */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <div className="ml-2 text-white/60 text-xs font-mono">{agent.name} - {stageTitle}</div>
        </div>
        <div className="text-white/40 text-xs font-mono">agent-profile.sh</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Agent Profile in a folder-style */}
        <div className={cn(
          "bg-black/30 rounded-md border-l-2 pl-3 py-3",
          getFolderSideColor(agent.color)
        )}>
          {/* Profile section */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Folder className={getIconColor(agent.color)} size={16} />
              <span className="text-white/80 font-mono text-sm">profile/</span>
            </div>
            
            <div className="pl-6">
              <AgentProfile agent={agent} />
            </div>
          </div>
          
          {/* Description file */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className={getIconColor(agent.color)} size={16} />
              <span className="text-white/80 font-mono text-sm">about.md</span>
            </div>
            <p className="text-white/70 text-sm pl-6">{fullDescription}</p>
          </div>
          
          {/* Quote file */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className={getIconColor(agent.color)} size={16} />
              <span className="text-white/80 font-mono text-sm">quote.txt</span>
            </div>
            <p className="text-white/90 text-sm italic pl-6">"{quote}"</p>
          </div>
        </div>
        
        {/* Right Column: Chat Preview in a terminal-style window */}
        <div className="flex flex-col justify-center">
          <div className="bg-black/50 border border-white/10 rounded-md overflow-hidden">
            <div className="bg-black/40 px-3 py-1.5 border-b border-white/10 flex items-center">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
              </div>
              <div className="ml-2 text-white/50 text-xs font-mono">chat-simulation.sh</div>
            </div>
            
            <div className="p-3">
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
        </div>
      </div>
    </motion.div>
  );
};

export default AgentContentPanel;
