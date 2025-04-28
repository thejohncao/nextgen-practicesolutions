
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
    <div className={cn("relative flex justify-center mb-12", className)}>
      {/* SVG Filters for Gooey and Glow Effects */}
      <GooeyFilter />
      
      {/* Enhanced Folder-style Tab Navigation with Gooey Effect */}
      <div className="relative z-10">
        {/* Background Pill - enhances the gooey tab effect */}
        <div className="absolute inset-0 rounded-full bg-black/20 blur-md -z-10 transform scale-y-[0.7] scale-x-[1.02] -translate-y-1"></div>
        
        {/* Tab Container - the gooey blob effect is applied here */}
        <div className="relative flex space-x-1 backdrop-blur-sm rounded-lg overflow-visible gooey-blob">
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
      </div>
    </div>
  );
};

export default TabNavigation;
