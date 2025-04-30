
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface TubelightNavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  forceActive?: boolean;
}

const TubelightNavLink = ({ to, children, className, forceActive }: TubelightNavLinkProps) => {
  // Initialize isActive with forceActive value or false
  let isActive = forceActive || false;
  
  try {
    // Try to use useLocation, but don't crash if not in router context
    const location = useLocation();
    isActive = forceActive || location.pathname === to;
  } catch (e) {
    // If we're not in a Router context, we'll just use the forceActive prop
    console.log("TubelightNavLink rendered outside Router context");
  }

  return (
    <Link
      to={to}
      className={cn(
        "relative px-4 py-2 text-sm text-white/80 transition-colors hover:text-white group",
        "before:absolute before:inset-x-2 before:bottom-0 before:h-px",
        "before:bg-gradient-to-r before:from-nextgen-purple/40 before:via-nextgen-purple before:to-nextgen-purple/40",
        "before:opacity-0 hover:before:opacity-100",
        "before:transition-all before:duration-300",
        "after:absolute after:inset-x-2 after:bottom-0 after:h-px",
        "after:bg-gradient-to-r after:from-nextgen-purple/0 after:via-nextgen-purple/50 after:to-nextgen-purple/0",
        "after:blur-sm after:opacity-0 hover:after:opacity-100",
        "after:transition-all after:duration-300",
        isActive && "text-white before:opacity-100 after:opacity-100",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default TubelightNavLink;
