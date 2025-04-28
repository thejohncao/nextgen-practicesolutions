
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
      <GooeyFilter />
      
      {/* Folder-style Tab Navigation with Gooey Effect */}
      <div className="relative flex space-x-1 backdrop-blur-md rounded-lg overflow-visible gooey-blob">
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
  );
};

export default TabNavigation;
