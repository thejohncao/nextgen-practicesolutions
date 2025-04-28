
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
  return (
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
              <h3 className="text-lg sm:text-xl font-bold text-white">{stageTitle}</h3>
              <p className="text-sm text-white/70">{agent.name} - {agent.title}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-white/90">{fullDescription}</p>
            <p className="italic text-white/80">"{quote}"</p>
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
