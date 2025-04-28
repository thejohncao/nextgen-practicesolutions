
import React from 'react';
import AgentChatAvatar from '../AgentChatAvatar';

interface AgentMessageProps {
  agent: string;
  role: string;
  message: string;
  bgColorClass: string;
}

const AgentMessage = ({ agent, role, message, bgColorClass }: AgentMessageProps) => {
  return (
    <div className={`${bgColorClass} p-2.5 md:p-3`}>
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
