
import React, { useState } from 'react';
import { cn } from "@/lib/utils";

interface SpliteTextProps {
  children: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  glitchOnHover?: boolean;
}

const SpliteText = ({ 
  children, 
  className,
  as: Component = 'div',
  glitchOnHover = true
}: SpliteTextProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Component 
      className={cn("relative inline-block", 
        glitchOnHover && "hover:text-transparent transition-colors duration-300",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
      {/* Base split layer */}
      <span className="absolute inset-0 text-white" aria-hidden="true">
        {children}
      </span>
      {/* Glitch effects */}
      <span 
        className={cn(
          "absolute inset-0 text-nextgen-purple translate-x-[1px] translate-y-[-1px]",
          isHovering && "animate-glitch-1"
        )} 
        aria-hidden="true"
      >
        {children}
      </span>
      <span 
        className={cn(
          "absolute inset-0 text-nextgen-blue translate-x-[-1px] translate-y-[1px]",
          isHovering && "animate-glitch-2"
        )} 
        aria-hidden="true"
      >
        {children}
      </span>
    </Component>
  );
};

export default SpliteText;
