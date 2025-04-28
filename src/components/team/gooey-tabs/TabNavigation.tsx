
import React from 'react';
import { cn } from '@/lib/utils';
import { Agent } from '@/types/agent';
import TabItem from './TabItem';
import GooeyFilter from './GooeyFilter';

interface TabNavigationProps {
  agents: Agent[];
  activeTab: number;
  setActiveTab: (index: number) => void;
  className?: string;
}

const TabNavigation = ({ agents, activeTab, setActiveTab, className }: TabNavigationProps) => {
  return (
    <div className={cn("relative flex justify-center mb-0", className)}>
      {/* SVG Filters for Gooey and Glow Effects */}
      <GooeyFilter />
      
      {/* Enhanced Folder-style Tab Navigation with Gooey Effect */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Folder Tabs Header - simulates folder tabs at top */}
        <div className="flex space-x-1 relative z-20 px-4 pt-2" style={{ filter: "url(#gooey)" }}>
          {agents.map((agent, index) => (
            <TabItem 
              key={agent.name}
              agent={agent}
              index={index}
              activeTab={activeTab}
              onClick={() => setActiveTab(index)}
            />
          ))}
        </div>
        
        {/* Visual separator between tabs and content */}
        <div className={`absolute h-1 top-0 left-0 transition-all duration-300 ${
          activeTab === 0 ? 'bg-green-500/90 w-1/4' :
          activeTab === 1 ? 'bg-blue-500/90 w-1/4 translate-x-[100%]' : 
          activeTab === 2 ? 'bg-purple-500/90 w-1/4 translate-x-[200%]' :
          'bg-amber-500/90 w-1/4 translate-x-[300%]'
        }`}></div>
      </div>
    </div>
  );
};

export default TabNavigation;
