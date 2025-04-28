
import React from 'react';
import { cn } from '@/lib/utils';
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
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
            <span className="text-sm font-medium text-white/90">
              {agent.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-2">
            <span className="text-sm font-medium text-nextgen-dark/90 dark:text-white/90">
              {agent.charAt(0).toUpperCase() + agent.slice(1)} — {role}
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
