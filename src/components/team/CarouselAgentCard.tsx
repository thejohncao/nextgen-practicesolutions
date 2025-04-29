
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Agent } from '@/types/agent';
import { cn } from '@/lib/utils';
import CardContent from './card/CardContent';
import PhaseDescription from './card/PhaseDescription';

interface CarouselAgentCardProps {
  agent: Agent;
  isActive: boolean;
  phaseDescription?: string;
  phaseColor?: string;
}

const CarouselAgentCard = ({ 
  agent, 
  isActive, 
  phaseDescription, 
  phaseColor = 'bg-white/5' 
}: CarouselAgentCardProps) => {
  // Get accent color class based on agent color
  const getAccentColorClass = (color: string) => {
    switch(color.toLowerCase()) {
      case 'green': return 'bg-green-500/10 border-green-500/20';
      case 'blue': return 'bg-blue-500/10 border-blue-500/20';
      case 'purple': return 'bg-purple-500/10 border-purple-500/20';
      case 'gold': return 'bg-amber-500/10 border-amber-500/20';
      default: return 'bg-white/10 border-white/20';
    }
  };

  return (
    <div className={cn(
      "h-full glass-card p-6 rounded-xl text-center transition-all duration-300",
      "border border-white/10",
      isActive ? "shadow-glow" : "",
      isActive ? getAccentColorClass(agent.color) : phaseColor
    )}>
      <CardContent agent={agent} />
      
      {phaseDescription && (
        <PhaseDescription description={phaseDescription} />
      )}

      <Button 
        asChild
        variant="outline"
        className={cn(
          "mt-4 border-white/10 bg-white/5 hover:bg-white/10",
          "w-full transition-all duration-300"
        )}
      >
        <Link to="/solutions">Learn More →</Link>
      </Button>
    </div>
  );
};

export default CarouselAgentCard;
