
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
  
  // Create a mapping for department names
  const getDepartmentName = (role: string) => {
    const roleLower = role.toLowerCase();
    if (roleLower.includes('growth')) return 'Practice Growth';
    if (roleLower.includes('management')) return 'Practice Management';
    if (roleLower.includes('dev')) return 'Practice Development';
    if (roleLower.includes('academy') || roleLower.includes('train')) return 'Practice Academy';
    return role;
  };
  
  return (
    <div className="p-6 sm:py-6 py-8">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="relative">
            <AgentChatAvatar agent={agent} hideDetails />
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-2">
            <span className="text-sm font-medium text-nextgen-dark/90 dark:text-white/90">
              {agent.charAt(0)} — {getDepartmentName(role)}
            </span>
          </div>
          <p className={`${bgColorClass} p-4 rounded-2xl text-nextgen-dark dark:text-white`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentMessage;
