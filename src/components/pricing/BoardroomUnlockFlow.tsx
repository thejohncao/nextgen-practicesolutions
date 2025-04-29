
import React, { useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import AgentAvatar from '../AgentAvatar';
import { ScrollArea } from '../ui/scroll-area';
import { Clipboard, Megaphone, Handshake, GraduationCap, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";

// Updated stages with additional badges as per the requirements
const stages = [
  {
    name: "Spark",
    color: "#3b82f6", // Blue
    agents: [
      { name: "Miles", role: "Practice Management", color: "blue", icon: Clipboard }
    ],
    badges: ["Foundation Package Unlock"]
  },
  {
    name: "Ignite",
    color: "#22c55e", // Green
    agents: [
      { name: "Miles", role: "Operations", color: "blue", icon: Clipboard },
      { name: "Giselle", role: "Marketing", color: "green", icon: Megaphone }
    ],
    badges: ["Growth Package Unlock"]
  },
  {
    name: "Blaze",
    color: "#8b5cf6", // Purple
    agents: [
      { name: "Miles", role: "Operations", color: "blue", icon: Clipboard },
      { name: "Giselle", role: "Marketing", color: "green", icon: Megaphone },
      { name: "Devon", role: "Sales", color: "purple", icon: Handshake }
    ],
    badges: [
      "Development Package Unlock",
      "Advanced Automations",
      "KPI Dashboard Access"
    ]
  },
  {
    name: "Nova",
    color: "#f59e0b", // Orange
    agents: [
      { name: "Miles", role: "Operations", color: "blue", icon: Clipboard },
      { name: "Giselle", role: "Marketing", color: "green", icon: Megaphone },
      { name: "Devon", role: "Sales", color: "purple", icon: Handshake },
      { name: "Alma", role: "Training", color: "gold", icon: GraduationCap }
    ],
    badges: [
      "Full AI Boardroom Access",
      "Multi-Location Support"
    ]
  }
];

const BoardroomUnlockFlow = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="glass-card p-8 md:p-12 max-w-5xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-gradient">
          Unlock Your AI Executive Team as You Grow
        </h3>
      </div>

      <ScrollArea className="w-full pb-6" orientation="horizontal">
        <div className="flex space-x-4 md:space-x-6 pb-4 px-2 min-w-max">
          {/* Horizontal timeline with cards */}
          {stages.map((stage, index) => (
            <div 
              key={stage.name} 
              className="group relative w-64 md:w-72"
            >
              {/* Timeline connector */}
              {index < stages.length - 1 && (
                <div className="absolute top-10 right-0 w-4 md:w-6 h-0.5 bg-white/20 z-0 hidden md:block" />
              )}
              
              {/* Stage Card */}
              <div 
                className="glass-card p-5 rounded-xl transition-all duration-300 hover:scale-105 group-hover:shadow-glow h-full"
                style={{ borderColor: `${stage.color}40` }}
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="text-xl font-heading font-bold"
                    style={{ color: stage.color }}
                  >
                    {stage.name}
                  </div>
                  <div 
                    className="h-6 w-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${stage.color}30` }}
                  >
                    {index < stages.length - 1 && (
                      <ChevronRight 
                        size={16} 
                        className="text-white/70"
                      />
                    )}
                  </div>
                </div>
                
                {/* Agents Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {stage.agents.map((agent, agentIdx) => (
                    <div key={agentIdx} className="flex flex-col items-center">
                      <div className="relative">
                        <AgentAvatar 
                          name={agent.name} 
                          role={agent.role} 
                          color={agent.color}
                          size="sm"
                        />
                        <div 
                          className="absolute -bottom-1 -right-1 bg-white/10 rounded-full p-1"
                          style={{ backgroundColor: `${stage.color}30` }}
                        >
                          <agent.icon className="w-3 h-3" style={{ color: stage.color }} />
                        </div>
                      </div>
                      <span className="text-xs text-white/70 mt-1">{agent.role}</span>
                    </div>
                  ))}
                </div>
                
                {/* Badges */}
                <div className="mt-4 space-y-2">
                  {stage.badges.map((badge, badgeIdx) => (
                    <Badge 
                      key={badgeIdx}
                      className="bg-white/10 hover:bg-white/15 text-white text-xs w-full justify-center py-1"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="text-center mt-10">
        <p className="text-lg text-white/70 italic">
          Your practice deserves more than just tools — it deserves a full Executive Team, ready to grow with you.
        </p>
      </div>
    </div>
  );
};

export default BoardroomUnlockFlow;
