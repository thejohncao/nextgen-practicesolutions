
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
  const getShimmerClass = () => {
    switch(agent) {
      case 'miles': return 'shimmer-blue';
      case 'giselle': return 'shimmer-green';
      case 'devon': return 'shimmer-purple';
      case 'alma': return 'shimmer-amber';
      default: return 'shimmer-blue';
    }
  };
  
  // Add shadow glow effect based on agent color
  const getGlowColor = () => {
    switch(agent) {
      case 'miles': return 'shadow-[0_0_12px_rgba(59,130,246,0.5)]';
      case 'giselle': return 'shadow-[0_0_12px_rgba(34,197,94,0.5)]';
      case 'devon': return 'shadow-[0_0_12px_rgba(168,85,247,0.5)]';
      case 'alma': return 'shadow-[0_0_12px_rgba(251,191,36,0.5)]';
      default: return '';
    }
  };
  
  return (
    <div className={`p-2.5 md:p-3 rounded-lg backdrop-blur-sm ${getShimmerClass()} ${getGlowColor()}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <AgentChatAvatar agent={agent} hideDetails={true} />
        </div>
        <div className="ml-2 md:ml-3">
          <div className="text-xs font-medium text-white/90">{role}</div>
          <div className="text-sm text-white">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default AgentMessage;
