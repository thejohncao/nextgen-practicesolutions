
import React from 'react';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  className?: string;
  children: React.ReactNode;
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-3 auto-rows-[22rem] gap-4 max-w-7xl mx-auto w-full",
      className
    )}>
      {children}
    </div>
  );
}

interface BentoGridItemProps {
  className?: string;
  children: React.ReactNode;
  title?: string;
  description?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  colSpan?: "col-span-1" | "col-span-2" | "col-span-3";
  rowSpan?: "row-span-1" | "row-span-2" | "row-span-3";
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  children,
  colSpan = "col-span-1",
  rowSpan = "row-span-1"
}: BentoGridItemProps) {
  return (
    <div className={cn(
      "group/bento relative overflow-hidden",
      "rounded-3xl border border-white/[0.08]",
      "bg-gradient-to-b from-white/[0.08] to-transparent",
      "backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
      "transition-all duration-300",
      "hover:border-white/[0.12] hover:bg-white/[0.05]",
      "hover:shadow-[0_12px_48px_rgba(155,135,245,0.2)]",
      colSpan,
      rowSpan,
      className
    )}>
      <div className="p-6 h-full flex flex-col">
        {header}
        {(title || icon) && (
          <div className="flex items-center gap-3 mb-4">
            {icon && (
              <div className="p-2 w-10 h-10 rounded-lg bg-white/[0.08] flex items-center justify-center">
                {icon}
              </div>
            )}
            {title && (
              <h3 className="text-xl font-medium text-gradient">{title}</h3>
            )}
          </div>
        )}
        {description && (
          <p className="text-white/70 text-sm mb-4">{description}</p>
        )}
        {children}
      </div>
      
      {/* Hover effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover/bento:opacity-100 transition-opacity"
        style={{
          background: "radial-gradient(500px circle at var(--x) var(--y), rgba(155,135,245,0.06), transparent 40%)"
        }}
      />
    </div>
  );
}
