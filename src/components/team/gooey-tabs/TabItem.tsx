
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Agent } from '@/types/agent';

interface TabItemProps {
  agent: Agent;
  index: number;
  activeTab: number;
  onClick: () => void;
}

const TabItem = ({ agent, index, activeTab, onClick }: TabItemProps) => {
  const isActive = activeTab === index;
  
  // Get folder tab color based on agent
  const getTabBgClass = (color: string, isActive: boolean): string => {
    if (!isActive) return "bg-white/5";
    
    switch(color) {
      case 'green': return "bg-green-500/10";
      case 'blue': return "bg-blue-500/10";
      case 'purple': return "bg-purple-500/10";
      case 'gold': return "bg-amber-500/10";
      default: return "bg-white/10";
    }
  };

  // Get tab border color based on agent
  const getTabBorderClass = (color: string, isActive: boolean): string => {
    if (!isActive) return "border-white/10";
    
    switch(color) {
      case 'green': return "border-green-500/20";
      case 'blue': return "border-blue-500/20";
      case 'purple': return "border-purple-500/20";
      case 'gold': return "border-amber-500/20";
      default: return "border-white/20";
    }
  };

  return (
    <motion.button 
      onClick={onClick}
      className={cn(
        "relative z-10 flex flex-col justify-center items-center px-6 py-3 rounded-tl-lg rounded-tr-lg",
        "border-t border-l border-r transition-all duration-300",
        "hover:bg-white/10",
        getTabBgClass(agent.color, isActive),
        getTabBorderClass(agent.color, isActive),
        isActive ? "text-white font-medium" : "text-white/70"
      )}
      initial={false}
      animate={{ 
        y: isActive ? -3 : 0,
        scale: isActive ? 1.03 : 1,
        zIndex: isActive ? 20 : 10
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <span className="font-bold text-base">{agent.name}</span>
      <span className="text-xs opacity-70">{agent.title}</span>
      
      {/* Active Tab Indicator */}
      {isActive && (
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-0.5"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: agent.color === 'green' ? 'linear-gradient(to right, rgba(34, 197, 94, 0.3), rgba(34, 197, 94, 0.7))'
              : agent.color === 'blue' ? 'linear-gradient(to right, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.7))'
              : agent.color === 'purple' ? 'linear-gradient(to right, rgba(168, 85, 247, 0.3), rgba(168, 85, 247, 0.7))'
              : 'linear-gradient(to right, rgba(251, 191, 36, 0.3), rgba(251, 191, 36, 0.7))'
          }}
        />
      )}
    </motion.button>
  );
};

export default TabItem;
