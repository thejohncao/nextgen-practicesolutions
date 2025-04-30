
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface ToolBadgeProps {
  name: string;
  icon: string;
}

const ToolBadge = ({ name, icon }: ToolBadgeProps) => {
  // Use dynamic access to get the icon component safely
  const IconComponent = icon in Icons ? Icons[icon as keyof typeof Icons] : Icons.Zap;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-colors cursor-help">
            {React.createElement(IconComponent as React.ComponentType<LucideProps>, { 
              className: "w-4 h-4 text-white/80" 
            })}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-black/80 border-white/10 text-white">
          {name}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolBadge;
