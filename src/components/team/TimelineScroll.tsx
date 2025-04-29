
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import AgentAvatar from '../AgentAvatar';
import { Agent } from '@/types/agent';
import { getAgentCardColor, getAgentBorderColor } from '@/utils/colorUtils';

interface TimelineScrollProps {
  agents: Agent[];
  className?: string;
}

const TimelineScroll: React.FC<TimelineScrollProps> = ({ agents, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // For horizontal scroll progress
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });
  
  // Transform the scroll progress to match our items
  const segmentPercent = 1 / Math.max(1, agents.length - 1);
  
  // Animate scroll position for active card visibility
  const scrollToCard = (index: number) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const cardWidth = container.scrollWidth / agents.length;
    const targetPosition = index * cardWidth;
    
    container.scrollTo({
      left: targetPosition,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const totalWidth = container.scrollWidth - container.clientWidth;
      const progress = container.scrollLeft / totalWidth;
      const segmentWidth = 1 / (agents.length - 1);
      const newActiveIndex = Math.min(
        agents.length - 1,
        Math.floor(progress / segmentWidth + 0.5)
      );
      
      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [agents.length, activeIndex]);

  const stageLabels = [
    'Attract & Engage',
    'Onboard & Convert', 
    'Retain & Grow',
    'Train & Scale'
  ];

  return (
    <div className={cn("py-12", className)} id="team">
      {/* Section header */}
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient">
          Meet Your AI Team
        </h2>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Every AI Agent specializes in a phase of growth. Together, they work as your full back office — without the overhead.
        </p>
      </div>
      
      {/* Timeline progress bar */}
      <div className="container mx-auto px-4 mb-8">
        <div className="w-full h-1 bg-white/10 relative mb-1">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-nextgen-purple to-nextgen-blue"
            style={{ 
              scaleX: scrollXProgress,
              transformOrigin: "left"
            }}
          />
        </div>
        
        {/* Stage labels */}
        <div className="flex justify-between">
          {stageLabels.map((label, idx) => (
            <button 
              key={idx}
              onClick={() => scrollToCard(idx)}
              className={cn(
                "text-sm transition-colors px-4 -mx-4 py-2 rounded",
                activeIndex === idx ? 
                  "text-white font-medium bg-white/5" : 
                  "text-white/50 hover:text-white/80"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Horizontal scrollable cards */}
      <div 
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-12"
        style={{ scrollbarWidth: 'none' }}
      >
        {agents.map((agent, idx) => (
          <div 
            key={agent.name}
            className="flex-shrink-0 w-full snap-center px-4"
          >
            <div 
              className={cn(
                "p-6 rounded-xl border backdrop-blur-lg transition-all",
                getAgentCardColor(agent.color),
                getAgentBorderColor(agent.color),
                activeIndex === idx ? "scale-100" : "scale-95 opacity-70"
              )}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Agent avatar */}
                <div className="flex-shrink-0">
                  <AgentAvatar
                    name={agent.name}
                    role={agent.title}
                    color={agent.color}
                    size="lg"
                    animated={true}
                    displayMode="fullName"
                    showLabel={true}
                  />
                </div>
                
                {/* Agent details */}
                <div className="flex-grow">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {agent.title}
                    </h3>
                    <p className="text-white/70">
                      {agent.tagline}
                    </p>
                  </div>
                  
                  {/* Features list */}
                  <ul className="space-y-2">
                    {agent.features.slice(0, 4).map((feature, fIdx) => {
                      // Split feature into title and description if it contains a separator
                      const parts = feature.split(" - ");
                      const title = parts[0];
                      const description = parts.length > 1 ? parts[1] : null;
                      
                      return (
                        <li 
                          key={fIdx} 
                          className="flex items-start gap-2"
                        >
                          <svg 
                            className={`h-5 w-5 mt-0.5 text-${agent.color}-500 flex-shrink-0`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>
                            <span className="font-medium text-white">{title}</span>
                            {description && <span className="text-white/60"> — {description}</span>}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Scroll buttons */}
      <div className="container mx-auto px-4 flex justify-center gap-4 mt-6">
        {agents.map((agent, idx) => (
          <button
            key={idx}
            onClick={() => scrollToCard(idx)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              activeIndex === idx 
                ? `bg-${agent.color}-500 scale-125` 
                : "bg-white/20 hover:bg-white/50"
            )}
            aria-label={`View ${agent.name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineScroll;
