
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
    if (!isActive) return "bg-white/10 hover:bg-white/20";
    
    switch(color) {
      case 'green': return "bg-green-500/40";
      case 'blue': return "bg-blue-500/40";
      case 'purple': return "bg-purple-500/40";
      case 'gold': return "bg-amber-500/40";
      default: return "bg-white/30";
    }
  };

  // Get tab border color based on agent
  const getTabBorderClass = (color: string, isActive: boolean): string => {
    if (!isActive) return "border-white/20";
    
    switch(color) {
      case 'green': return "border-green-500/70";
      case 'blue': return "border-blue-500/70";
      case 'purple': return "border-purple-500/70";
      case 'gold': return "border-amber-500/70";
      default: return "border-white/50";
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
      case 'Giselle': return <Fuel className={`w-5 h-5 ${isActive ? 'text-green-400' : 'text-white/80'}`} />;
      case 'Miles': return <Calendar className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-white/80'}`} />;
      case 'Devon': return <Handshake className={`w-5 h-5 ${isActive ? 'text-purple-400' : 'text-white/80'}`} />;
      case 'Alma': return <GraduationCap className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-white/80'}`} />;
      default: return null;
    }
  };

  return (
    <motion.button 
      onClick={onClick}
      className={cn(
        "relative z-10 flex items-center px-6 py-3 rounded-lg",
        "border transition-all duration-300 flex-1",
        "cursor-pointer shadow-sm",
        getTabBgClass(agent.color, isActive),
        getTabBorderClass(agent.color, isActive),
        getGlowFilterClass(agent.color, isActive),
        isActive ? "text-white font-medium shadow-xl" : "text-white/90"
      )}
      initial={false}
      animate={{ 
        y: isActive ? -4 : 0,
        scale: isActive ? 1.05 : 1,
        zIndex: isActive ? 30 : 10
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      whileHover={{
        y: isActive ? -4 : -2,
        scale: isActive ? 1.05 : 1.02,
      }}
    >
      {/* Agent Icon */}
      <span className="mr-2">
        {getAgentIcon(agent.name)}
      </span>

      <div className="flex flex-col items-start">
        <span className="font-bold text-base">{agent.name}</span>
        <span className="text-xs opacity-90">{agent.title}</span>
      </div>
      
      {/* Active Tab Indicator */}
      {isActive && (
        <motion.div 
          className={cn(
            "absolute bottom-0 left-0 w-full h-1.5",
            agent.color === 'green' ? "bg-green-400" :
            agent.color === 'blue' ? "bg-blue-400" :
            agent.color === 'purple' ? "bg-purple-400" : 
            "bg-amber-400"
          )}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            animation: "tab-indicator-pulse 2s ease-in-out infinite"
          }}
        />
      )}
    </motion.button>
  );
};

export default TabItem;
