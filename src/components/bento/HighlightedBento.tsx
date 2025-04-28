
import React from 'react';
import { BentoGridItem } from './BentoGrid';
import { cn } from '@/lib/utils';

interface HighlightedBentoProps {
  className?: string;
  heading: React.ReactNode;
  subheading?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  glowColor?: string;
  colSpan?: number;
  rowSpan?: number;
}

export function HighlightedBento({
  className,
  heading,
  subheading,
  icon,
  children,
  glowColor = "after:from-nextgen-purple after:to-nextgen-blue",
  colSpan,
  rowSpan,
}: HighlightedBentoProps) {
  return (
    <BentoGridItem 
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-white/[0.01] border border-white/10 shadow-xl after:absolute after:-z-10 after:rounded-[inherit] after:opacity-0 hover:after:opacity-100 after:transition-all after:inset-0 after:blur-2xl after:bg-gradient-to-br after:from-transparent after:to-transparent", 
        glowColor,
        className
      )}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          {icon && (
            <div className="mb-4 p-2 w-fit rounded-xl bg-white/5">
              {icon}
            </div>
          )}
          <div className="mb-4">
            <div className="text-xl font-bold text-white mb-1 group-hover:text-white transition-all">
              {heading}
            </div>
            {subheading && (
              <div className="text-white/70 group-hover:text-white/90 transition-all">
                {subheading}
              </div>
            )}
          </div>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </BentoGridItem>
  );
}
