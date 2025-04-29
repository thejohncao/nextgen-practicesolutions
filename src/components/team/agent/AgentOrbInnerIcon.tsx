
import React from 'react';
import { Sprout, Handshake, GraduationCap, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AgentOrbInnerIconProps {
  agent: string;
  isActive?: boolean;
  className?: string;
  size?: number;
  // Added name prop for backwards compatibility
  name?: string;
  color?: string;
}

const AgentOrbInnerIcon: React.FC<AgentOrbInnerIconProps> = ({
  agent,
  isActive = false,
  className,
  size = 16,
  name // Use name if agent is not provided
}) => {
  // Use agent prop or fallback to name prop
  const agentName = agent || name || '';
  
  const getIconByAgent = () => {
    switch (agentName.toLowerCase()) {
      case 'giselle':
        return <Sprout size={size} className="text-green-300" />;
      case 'devon':
        return <Handshake size={size} className="text-purple-300" />;
      case 'alma':
        return <GraduationCap size={size} className="text-amber-300" />;
      case 'miles':
      default:
        return <Briefcase size={size} className="text-blue-300" />;
    }
  };
  
  const getDepartmentName = () => {
    switch (agentName.toLowerCase()) {
      case 'giselle':
        return 'Practice Growth';
      case 'devon':
        return 'Practice Development';
      case 'alma':
        return 'Practice Academy';
      case 'miles':
      default:
        return 'Practice Management';
    }
  };

  return (
    <div className={cn(
      "absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20",
      isActive && "opacity-100",
      className
    )}>
      <div className="bg-black/60 backdrop-blur-sm p-1.5 rounded-full">
        {getIconByAgent()}
      </div>
      
      <div className="mt-1 text-xs bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full text-white whitespace-nowrap">
        {getDepartmentName()}
      </div>
    </div>
  );
};

export default AgentOrbInnerIcon;
