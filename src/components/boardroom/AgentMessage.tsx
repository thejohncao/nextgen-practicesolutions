
import React from 'react';
import AgentChatAvatar from '../AgentChatAvatar';

interface AgentMessageProps {
  agent: string;
  role: string;
  message: string;
  bgColorClass: string;
}

const AgentMessage: React.FC<AgentMessageProps> = ({ agent, role, message, bgColorClass }) => {
  return (
    <div className="p-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <AgentChatAvatar agent={agent} />
        </div>
        <div className="flex-1">
          <span className="text-xs text-nextgen-dark/60 dark:text-white/60 mb-1 block">{role}</span>
          <p className={`${bgColorClass} p-4 rounded-2xl text-nextgen-dark dark:text-white`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentMessage;
