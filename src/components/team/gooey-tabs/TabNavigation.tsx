
import React from 'react';
import { cn } from '@/lib/utils';
import { Agent } from '@/types/agent';
import TabItem from './TabItem';
import GooeyFilter from './GooeyFilter';
import { Folder } from 'lucide-react';

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
      <div className="relative z-10 w-full max-w-3xl">
        {/* Background - darker for better contrast */}
        <div className="absolute inset-0 rounded-xl bg-black/80 blur-md -z-10 transform scale-y-[0.7] scale-x-[1.02] -translate-y-1"></div>
        
        {/* Folder Tab Container */}
        <div className="relative">
          {/* Folder Tabs Header - simulates folder tabs at top */}
          <div className="flex space-x-1 mb-[-1px] relative z-20 px-2">
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
          
          {/* Folder Content Container - looks like an open folder */}
          <div className="relative rounded-xl rounded-tl-none overflow-hidden bg-[#1A1F2C]/90 border border-white/10 shadow-xl">
            {/* Folder Icon */}
            <div className="absolute top-4 right-4 text-white/30">
              <Folder className="h-6 w-6" />
            </div>
            
            {/* Visual separator between tabs and content */}
            <div className={`absolute h-1 top-0 left-0 transition-all duration-300 ${
              activeTab === 0 ? 'bg-green-500/60 w-1/4' :
              activeTab === 1 ? 'bg-blue-500/60 w-1/4 translate-x-[100%]' : 
              activeTab === 2 ? 'bg-purple-500/60 w-1/4 translate-x-[200%]' :
              'bg-amber-500/60 w-1/4 translate-x-[300%]'
            }`}></div>
            
            {/* Empty space for content (actual content rendered elsewhere) */}
            <div className="h-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
