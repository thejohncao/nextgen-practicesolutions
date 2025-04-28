
import React from 'react';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  className?: string;
  children: React.ReactNode;
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 auto-rows-[320px] gap-4 mx-auto", className)}>
      {children}
    </div>
  );
}

interface BentoGridItemProps {
  className?: string;
  title?: string;
  description?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  children,
  colSpan = 1,
  rowSpan = 1,
}: BentoGridItemProps) {
  return (
    <div 
      className={cn(
        "group/bento relative overflow-hidden rounded-xl backdrop-blur-md bg-white/5 border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] p-4 sm:p-6 flex flex-col justify-between",
        colSpan === 2 && "md:col-span-2",
        colSpan === 3 && "md:col-span-3",
        rowSpan === 2 && "md:row-span-2",
        className
      )}
    >
      {header && <div className="mb-4">{header}</div>}
      
      {icon && (
        <div className="p-3 rounded-full bg-white/10 w-fit mb-4">
          {icon}
        </div>
      )}
      
      {title && (
        <div className="mb-2 mt-2">
          <h3 className="font-medium text-lg text-white">{title}</h3>
          {description && (
            <p className="text-sm text-white/70">{description}</p>
          )}
        </div>
      )}
      
      {children && <div className="flex-grow">{children}</div>}
      
      <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/[0.03] opacity-0 group-hover/bento:opacity-100 transition-opacity"></div>
      <div className="absolute inset-px rounded-xl p-px bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover/bento:opacity-100 transition-all duration-300 group-hover/bento:duration-700"></div>
    </div>
  );
}
