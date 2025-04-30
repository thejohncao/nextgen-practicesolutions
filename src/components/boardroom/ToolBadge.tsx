
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import * as Icons from 'lucide-react';

interface ToolBadgeProps {
  name: string;
  icon: keyof typeof Icons;
}

const ToolBadge = ({ name, icon }: ToolBadgeProps) => {
  const IconComponent = Icons[icon] ?? Icons.Zap;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-colors cursor-help">
            <IconComponent className="w-4 h-4 text-white/80" />
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
