
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
  
  // Enhanced background classes with better contrast
  const getEnhancedBgClass = (baseClass: string) => {
    switch(baseClass) {
      case "bg-blue-500/20 dark:bg-blue-500/30": 
        return "bg-blue-500/30 border border-blue-500/40";
      case "bg-green-500/20 dark:bg-green-500/30":
        return "bg-green-500/30 border border-green-500/40";
      case "bg-purple-500/20 dark:bg-purple-500/30":
        return "bg-purple-500/30 border border-purple-500/40";
      case "bg-amber-500/20 dark:bg-amber-500/30":
        return "bg-amber-500/30 border border-amber-500/40";
      default:
        return baseClass;
    }
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
            <span className="text-sm font-medium text-white">
              {agent.charAt(0).toUpperCase() + agent.slice(1)} — {getDepartmentName(role)}
            </span>
          </div>
          <p className={`${getEnhancedBgClass(bgColorClass)} p-4 rounded-2xl text-white`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentMessage;
