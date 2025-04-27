
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
  return (
    <div className={cn(
      "glass-card p-6 rounded-xl text-center transition-all duration-300",
      "opacity-0 animate-fade-in",
      isActive && "shadow-glow",
      phaseColor
    )}>
      <CardContent agent={agent} />
      
      <PhaseDescription description={phaseDescription} />

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
  );
};

export default CarouselAgentCard;
