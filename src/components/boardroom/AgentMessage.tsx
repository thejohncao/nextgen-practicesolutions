
import React from 'react';
import AgentChatAvatar from '../AgentChatAvatar';

interface AgentMessageProps {
  agent: string;
  role: string;
  message: string;
  bgColorClass: string;
}

const AgentMessage = ({ agent, role, message, bgColorClass }: AgentMessageProps) => {
  // Add shadow glow effect based on agent color
  const getGlowColor = () => {
    switch(agent) {
      case 'miles': return 'shadow-[0_0_12px_rgba(59,130,246,0.3)]';
      case 'giselle': return 'shadow-[0_0_12px_rgba(34,197,94,0.3)]';
      case 'devon': return 'shadow-[0_0_12px_rgba(168,85,247,0.3)]';
      case 'alma': return 'shadow-[0_0_12px_rgba(251,191,36,0.3)]';
      default: return '';
    }
  };
  
  return (
    <div className={`${bgColorClass} p-2.5 md:p-3 ${getGlowColor()}`}>
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
