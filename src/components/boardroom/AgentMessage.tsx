
import React from 'react';
import AgentChatAvatar from '../AgentChatAvatar';

interface AgentMessageProps {
  agent: string;
  role: string;
  message: string;
  bgColorClass: string;
}

const AgentMessage = ({ agent, role, message, bgColorClass }: AgentMessageProps) => {
  // Get shimmer effect class based on agent
  const getTextShimmerClass = () => {
    switch(agent) {
      case 'miles': return 'text-shimmer text-shimmer-blue';
      case 'giselle': return 'text-shimmer text-shimmer-green';
      case 'devon': return 'text-shimmer text-shimmer-purple';
      case 'alma': return 'text-shimmer text-shimmer-amber';
      default: return 'text-shimmer text-shimmer-blue';
    }
  };
  
  // Get subtle glow effect based on agent color
  const getGlowColor = () => {
    switch(agent) {
      case 'miles': return 'border border-blue-900/30 shadow-[0_0_8px_rgba(59,130,246,0.25)]';
      case 'giselle': return 'border border-green-900/30 shadow-[0_0_8px_rgba(34,197,94,0.25)]';
      case 'devon': return 'border border-purple-900/30 shadow-[0_0_8px_rgba(168,85,247,0.25)]';
      case 'alma': return 'border border-amber-900/30 shadow-[0_0_8px_rgba(251,191,36,0.25)]';
      default: return 'border border-blue-900/30 shadow-[0_0_8px_rgba(59,130,246,0.25)]';
    }
  };
  
  return (
    <div className={`p-2.5 md:p-3 rounded-lg backdrop-blur-sm bg-black/90 ${getGlowColor()}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <AgentChatAvatar agent={agent} hideDetails={true} />
        </div>
        <div className="ml-2 md:ml-3">
          <div className="text-xs font-medium text-white/90">{role}</div>
          <div className={`text-sm font-medium ${getTextShimmerClass()}`}>{message}</div>
        </div>
      </div>
    </div>
  );
};

export default AgentMessage;
