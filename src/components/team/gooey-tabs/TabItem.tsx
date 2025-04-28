
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
  
  // Get folder tab color based on agent
  const getTabBgClass = (color: string, isActive: boolean): string => {
    if (!isActive) return "bg-black/50 hover:bg-black/70";
    
    switch(color) {
      case 'green': return "bg-green-500/30 border-b-0";
      case 'blue': return "bg-blue-500/30 border-b-0";
      case 'purple': return "bg-purple-500/30 border-b-0";
      case 'gold': return "bg-amber-500/30 border-b-0";
      default: return "bg-white/10 border-b-0";
    }
  };

  // Get tab border color based on agent
  const getTabBorderClass = (color: string, isActive: boolean): string => {
    if (!isActive) return "border-white/5 border-b-white/20";
    
    switch(color) {
      case 'green': return "border-green-500/50 border-b-transparent";
      case 'blue': return "border-blue-500/50 border-b-transparent";
      case 'purple': return "border-purple-500/50 border-b-transparent";
      case 'gold': return "border-amber-500/50 border-b-transparent";
      default: return "border-white/20 border-b-transparent";
    }
  };

  // Get glow filter class based on agent color and active state
  const getGlowFilterClass = (color: string, isActive: boolean): string => {
    if (!isActive) return "";
    
    switch(color) {
      case 'green': return "green-glow";
      case 'blue': return "blue-glow";
      case 'purple': return "purple-glow";
      case 'gold': return "gold-glow";
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
        "relative z-10 flex items-center px-4 pt-2 pb-3 rounded-t-lg",
        "border border-b-[3px] transition-all duration-300",
        "cursor-pointer shadow-md",
        getTabBgClass(agent.color, isActive),
        getTabBorderClass(agent.color, isActive),
        getGlowFilterClass(agent.color, isActive),
        isActive ? "text-white font-medium shadow-lg -mb-px translate-y-0" : "text-white/70 translate-y-1"
      )}
      initial={false}
      animate={{ 
        y: isActive ? 0 : 1,
        scale: isActive ? 1 : 0.95,
        zIndex: isActive ? 30 : 10
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      whileHover={{
        y: 0,
        scale: isActive ? 1 : 0.98,
        opacity: isActive ? 1 : 0.9
      }}
    >
      {/* Agent Icon */}
      <span className="mr-2">
        {getAgentIcon(agent.name)}
      </span>

      <span className="font-medium text-sm whitespace-nowrap">{agent.name}</span>
      
      {/* Active Tab Indicator - more subtle top line */}
      {isActive && (
        <motion.div 
          className={cn(
            "absolute -top-[1px] left-0 w-full h-[2px]",
            agent.color === 'green' ? "bg-green-400" :
            agent.color === 'blue' ? "bg-blue-400" :
            agent.color === 'purple' ? "bg-purple-400" : 
            "bg-amber-400"
          )}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
};

export default TabItem;
