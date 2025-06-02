
import React, { useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import AgentAvatar from '../AgentAvatar';
import { ScrollArea } from '../ui/scroll-area';
import { Clipboard, Megaphone, Handshake, GraduationCap, ChevronRight } from 'lucide-react';
import { cn } from "@/lib/utils";

// Updated stages with additional badges as per the requirements
const stages = [{
  name: "Spark",
  color: "#3b82f6",
  // Blue
  agents: [{
    name: "Miles",
    role: "Practice Management",
    color: "blue",
    icon: Clipboard
  }],
  badges: ["Foundation Package Unlock"]
}, {
  name: "Ignite",
  color: "#22c55e",
  // Green
  agents: [{
    name: "Miles",
    role: "Operations",
    color: "blue",
    icon: Clipboard
  }, {
    name: "Giselle",
    role: "Marketing",
    color: "green",
    icon: Megaphone
  }],
  badges: ["Growth Package Unlock"]
}, {
  name: "Blaze",
  color: "#8b5cf6",
  // Purple
  agents: [{
    name: "Miles",
    role: "Operations",
    color: "blue",
    icon: Clipboard
  }, {
    name: "Giselle",
    role: "Marketing",
    color: "green",
    icon: Megaphone
  }, {
    name: "Devon",
    role: "Sales",
    color: "purple",
    icon: Handshake
  }],
  badges: ["Development Package Unlock", "Advanced Automations", "KPI Dashboard Access"]
}, {
  name: "Nova",
  color: "#f59e0b",
  // Orange
  agents: [{
    name: "Miles",
    role: "Operations",
    color: "blue",
    icon: Clipboard
  }, {
    name: "Giselle",
    role: "Marketing",
    color: "green",
    icon: Megaphone
  }, {
    name: "Devon",
    role: "Sales",
    color: "purple",
    icon: Handshake
  }, {
    name: "Alma",
    role: "Training",
    color: "gold",
    icon: GraduationCap
  }],
  badges: ["Full AI Boardroom Access", "Multi-Location Support"]
}];

const BoardroomUnlockFlow = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="py-20 bg-gradient-to-b from-nextgen-dark to-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Your AI Boardroom Unlocks as You Grow
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Start with one agent and unlock your full executive team as your practice scales
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stages.map((stage, index) => (
              <div key={stage.name} className="relative">
                <div className="glass-card p-6 h-full">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-white mb-2" style={{ color: stage.color }}>
                      {stage.name}
                    </h3>
                  </div>

                  <div className="space-y-4 mb-6">
                    {stage.agents.map((agent, agentIndex) => (
                      <div key={agent.name} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-${agent.color}-500/20`}>
                          <agent.icon className={`h-4 w-4 text-${agent.color}-500`} />
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">{agent.name}</div>
                          <div className="text-white/60 text-xs">{agent.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {stage.badges.map((badge, badgeIndex) => (
                      <Badge key={badgeIndex} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Connecting arrow for desktop */}
                {index < stages.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-nextgen-purple to-nextgen-blue transform -translate-y-1/2 z-10">
                    <ChevronRight className="absolute -right-2 -top-2 h-4 w-4 text-nextgen-purple" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardroomUnlockFlow;
