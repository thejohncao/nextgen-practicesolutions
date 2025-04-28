
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Agent } from '@/types/agent';
import { Fuel, Calendar, Handshake, GraduationCap } from 'lucide-react';

interface TabItemProps {
  agent: Agent;
  index: number;
  activeTab: number;
  onClick: () => void;
}

const TabItem = ({ agent, index, activeTab, onClick }: TabItemProps) => {
  const isActive = activeTab === index;
  
  // Get agent color based on agent name
  const getAgentColorClass = (color: string): string => {
    switch(color) {
      case 'green': return "text-green-500";
      case 'blue': return "text-blue-500";
      case 'purple': return "text-purple-500";
      case 'gold': return "text-amber-500";
      default: return "text-white";
    }
  };

  // Get tab background color based on agent
  const getTabBgClass = (color: string, isActive: boolean): string => {
    if (!isActive) return "bg-black/30 hover:bg-black/50";
    
    switch(color) {
      case 'green': return "bg-green-500/20";
      case 'blue': return "bg-blue-500/20";
      case 'purple': return "bg-purple-500/20";
      case 'gold': return "bg-amber-500/20";
      default: return "bg-white/10";
    }
  };

  // Get tab border color based on agent
  const getTabBorderClass = (color: string, isActive: boolean): string => {
    if (!isActive) return "border-white/5";
    
    switch(color) {
      case 'green': return "border-green-500/30";
      case 'blue': return "border-blue-500/30";
      case 'purple': return "border-purple-500/30";
      case 'gold': return "border-amber-500/30";
      default: return "border-white/20";
    }
  };

  // Get glow filter based on agent color and active state
  const getGlowFilterClass = (color: string, isActive: boolean): string => {
    if (!isActive) return "";
    
    switch(color) {
      case 'green': return "filter url(#green-glow)";
      case 'blue': return "filter url(#blue-glow)";
      case 'purple': return "filter url(#purple-glow)";
      case 'gold': return "filter url(#gold-glow)";
      default: return "";
    }
  };

  // Get agent icon based on agent name
  const getAgentIcon = (agentName: string) => {
    switch(agentName) {
      case 'Giselle': return <Fuel className={`w-5 h-5 ${isActive ? 'text-green-400' : 'text-white/60'}`} />;
      case 'Miles': return <Calendar className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-white/60'}`} />;
      case 'Devon': return <Handshake className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'text-white/60'}`} />;
      case 'Alma': return <GraduationCap className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-white/60'}`} />;
      default: return null;
    }
  };

  return (
    <motion.button 
      onClick={onClick}
      className={cn(
        "relative",
        "flex items-center gap-2 px-5 py-2.5 rounded-t-lg",
        "border border-b-0",
        "cursor-pointer shadow-lg",
        getTabBgClass(agent.color, isActive),
        getTabBorderClass(agent.color, isActive),
        isActive ? "z-30 text-white font-bold" : "text-white/70 z-20"
      )}
      style={{
        filter: isActive ? getGlowFilterClass(agent.color, isActive) : "none"
      }}
      initial={false}
      animate={{ 
        y: isActive ? -4 : 0,
        scale: isActive ? 1 : 0.95
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 500, 
        damping: 30
      }}
      whileHover={{
        y: isActive ? -4 : -2,
        scale: 1,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      {/* Agent Icon */}
      {getAgentIcon(agent.name)}
      
      {/* Agent Name */}
      <span className={cn(
        "font-medium text-sm whitespace-nowrap",
        isActive && getAgentColorClass(agent.color)
      )}>
        {agent.name}
      </span>
      
      {/* Active Indicator - glowing line at top */}
      {isActive && (
        <motion.div 
          className={cn(
            "absolute -top-[2px] left-0 right-0 h-[3px] rounded-full",
            agent.color === 'green' ? "bg-green-400" :
            agent.color === 'blue' ? "bg-blue-400" :
            agent.color === 'purple' ? "bg-purple-400" : 
            "bg-amber-400"
          )}
          layoutId="activeTabIndicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
};

export default TabItem;
