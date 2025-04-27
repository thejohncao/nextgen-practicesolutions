
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
            <AgentChatAvatar agent={agent} hideDetails={isMobile} />
          </div>
        </div>
        <div className="flex-1">
          {isMobile && (
            <span className="text-xs font-medium text-nextgen-dark/60 dark:text-white/90 mb-1 block">
              {role}
            </span>
          )}
          <p className={`${bgColorClass} p-4 rounded-2xl text-nextgen-dark dark:text-white`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentMessage;
