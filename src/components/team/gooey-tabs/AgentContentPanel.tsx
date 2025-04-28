
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Agent } from '@/types/agent';
import { getAgentCardColor, getAgentBorderColor } from '@/utils/colorUtils';
import { ChatMessage } from '@/data/patientJourney';
import AgentProfile from '../../journey/AgentProfile';
import ChatSimulation from '../../journey/ChatSimulation';
import TypingIndicator from '../../journey/TypingIndicator';
import { File, Folder } from 'lucide-react';

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
      case 'green': return "from-green-500/20 to-green-500/10";
      case 'blue': return "from-blue-500/20 to-blue-500/10";
      case 'purple': return "from-purple-500/20 to-purple-500/10";
      case 'gold': return "from-amber-500/20 to-amber-500/10";
      default: return "from-white/10 to-white/5";
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

  return (
    <motion.div
      key={agent.name}
      className={cn(
        "rounded-xl rounded-tl-none p-5",
        "bg-[#121212] border border-t-0 border-white/10"
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
      <div className="flex items-center mb-4 pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <div className="ml-2 text-white/50 text-xs">{agent.name} - {stageTitle}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Agent Profile in a folder-style */}
        <div className={cn(
          "space-y-4 bg-black/20 rounded-md border-l-2 pl-3 py-2",
          getFolderSideColor(agent.color)
        )}>
          <div className="flex items-center gap-2">
            <Folder className={cn(
              "w-4 h-4",
              agent.color === 'green' ? "text-green-400" :
              agent.color === 'blue' ? "text-blue-400" :
              agent.color === 'purple' ? "text-purple-400" : 
              "text-amber-400"
            )} />
            <span className="text-white/80 font-medium text-sm">profile</span>
          </div>
          
          <AgentProfile agent={agent} />

          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <File className={cn(
                "w-4 h-4",
                agent.color === 'green' ? "text-green-400" :
                agent.color === 'blue' ? "text-blue-400" :
                agent.color === 'purple' ? "text-purple-400" : 
                "text-amber-400"
              )} />
              <span className="text-white/80 font-medium text-sm">description.txt</span>
            </div>
            <p className="text-white/70 text-sm pl-6">{fullDescription}</p>
          </div>

          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <File className={cn(
                "w-4 h-4",
                agent.color === 'green' ? "text-green-400" :
                agent.color === 'blue' ? "text-blue-400" :
                agent.color === 'purple' ? "text-purple-400" : 
                "text-amber-400"
              )} />
              <span className="text-white/80 font-medium text-sm">quote.txt</span>
            </div>
            <p className="text-white/90 text-sm italic pl-6">"{quote}"</p>
          </div>
        </div>
        
        {/* Right Column: Chat Preview in a terminal-style window */}
        <div className="flex flex-col justify-center">
          <div className="bg-black/30 border border-white/10 rounded-md p-2">
            <div className="flex items-center mb-2 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                </div>
                <div className="ml-2 text-white/50 text-xs">chat-simulation.sh</div>
              </div>
            </div>
            
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
    </motion.div>
  );
};

export default AgentContentPanel;
