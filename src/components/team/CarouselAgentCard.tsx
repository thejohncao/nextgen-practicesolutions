
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import AgentAvatar from '../AgentAvatar';
import { Agent } from '@/types/agent';
import { cn } from '@/lib/utils';

interface CarouselAgentCardProps {
  agent: Agent;
  isActive: boolean;
  phaseDescription?: string;
  phaseColor?: string;
}

const CarouselAgentCard = ({ agent, isActive, phaseDescription, phaseColor = 'bg-white/5' }: CarouselAgentCardProps) => {
  const getBlurb = (name: string) => {
    switch (name) {
      case 'Miles':
        return "Keep your schedule full and your front office running effortlessly.";
      case 'Giselle':
        return "Turn leads into loyal, lifelong patients with automated nurturing.";
      case 'Devon':
        return "Boost case acceptance and grow your practice's bottom line.";
      case 'Alma':
        return "Train and empower your team with onboarding, SOPs, and education.";
      default:
        return "";
    }
  };

  return (
    <div className={cn(
      "glass-card p-6 rounded-xl text-center transition-all duration-300",
      "opacity-0 animate-fade-in",
      isActive && "shadow-glow",
      phaseColor
    )}>
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <AgentAvatar 
            name={agent.name}
            role={agent.title}
            color={agent.color}
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-white">
            {agent.name}
          </h3>
          <p className="text-white/70">
            {agent.title}
          </p>
          <p className="text-lg text-white/90">
            {getBlurb(agent.name)}
          </p>

          {/* Phase description/storytelling element */}
          {phaseDescription && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-sm italic text-white/80">
                "{phaseDescription}"
              </p>
            </div>
          )}
        </div>

        <Button 
          asChild
          variant="outline"
          className={cn(
            "mt-4 border-white/10 bg-white/5 hover:bg-white/10",
            "transition-all duration-300"
          )}
        >
          <Link to="/solutions">Learn More →</Link>
        </Button>
      </div>
    </div>
  );
};

export default CarouselAgentCard;
