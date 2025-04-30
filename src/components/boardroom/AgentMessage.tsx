
import React from 'react';
import { motion } from 'framer-motion';
import AgentChatAvatar from '../AgentChatAvatar';

interface AgentMessageProps {
  agent: string;
  role: string;
  message: string;
  bgColorClass?: string;
  delay?: number;
}

const AgentMessage: React.FC<AgentMessageProps> = ({ 
  agent, 
  role, 
  message,
  bgColorClass = "bg-blue-500/30 dark:bg-blue-500/20",
  delay = 0 
}) => {
  return (
    <div className="p-3 flex">
      <div className="mr-3 flex-shrink-0">
        <AgentChatAvatar agent={agent} hideDetails={true} />
      </div>
      
      <div className="flex-1">
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <span className="font-medium text-white/90">{agent}</span>
            <span className="mx-2 text-white/40">•</span>
            <span className="text-sm text-white/60">{role}</span>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={`${bgColorClass} p-3 rounded-lg text-white backdrop-blur-sm`}
          >
            {message}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AgentMessage;
