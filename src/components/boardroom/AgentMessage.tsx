
import React from 'react';
import AgentChatAvatar from '../AgentChatAvatar';
import { useIsMobile } from '@/hooks/use-mobile';

interface AgentMessageProps {
  agent: string;
  role: string;
  message: string;
  bgColorClass: string;
}

const AgentMessage: React.FC<AgentMessageProps> = ({ agent, role, message, bgColorClass }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="p-6 sm:py-6 py-8">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="relative">
            <AgentChatAvatar agent={agent} />
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-2">
            <span className="text-sm font-medium text-gray-900">
              {agent.charAt(0).toUpperCase() + agent.slice(1)} — {role}
            </span>
          </div>
          <p className={`${bgColorClass} p-4 rounded-2xl text-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentMessage;
