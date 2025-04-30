
import React from 'react';
import AgentChatAvatar from '../AgentChatAvatar';

export interface AgentMessageProps {
  agent: string;
  role: string;
  message: string;
  bgColorClass?: string;
  delay?: number;
}

const AgentMessage = ({ agent, role, message, bgColorClass, delay = 0 }: AgentMessageProps) => {
  // Get shimmer effect class based on agent
  const getTextShimmerClass = () => {
    switch(agent.toLowerCase()) {
      case 'miles': return 'text-shimmer text-shimmer-blue';
      case 'giselle': return 'text-shimmer text-shimmer-green';
      case 'devon': return 'text-shimmer text-shimmer-purple';
      case 'alma': return 'text-shimmer text-shimmer-amber';
      default: return 'text-shimmer text-shimmer-blue';
    }
  };
  
  // Get message bubble style based on agent
  const getMessageBubbleClass = () => {
    switch(agent.toLowerCase()) {
      case 'miles': return 'bg-blue-900/20 border-blue-500/30';
      case 'giselle': return 'bg-green-900/20 border-green-500/30';
      case 'devon': return 'bg-purple-900/20 border-purple-500/30';
      case 'alma': return 'bg-amber-900/20 border-amber-500/30';
      default: return 'bg-blue-900/20 border-blue-500/30';
    }
  };
  
  return (
    <div className="flex items-start gap-3 pl-12 md:pl-16 pr-4 py-3">
      <div className="flex-shrink-0">
        <AgentChatAvatar agent={agent} hideDetails={true} />
      </div>
      
      <div className={`relative p-3 rounded-lg border ${getMessageBubbleClass()}`}>
        <div className="text-xs font-medium text-white/70 mb-1">{role}</div>
        <div className={`text-sm font-medium text-white ${getTextShimmerClass()}`}>{message}</div>
      </div>
    </div>
  );
};

export default AgentMessage;
