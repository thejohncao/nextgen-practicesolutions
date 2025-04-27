
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface TubelightNavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  forceActive?: boolean;
}

const TubelightNavLink = ({ to, children, className, forceActive }: TubelightNavLinkProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "text-white/80 hover:text-white transition-colors px-4 py-2 text-sm inline-flex items-center gap-1",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default TubelightNavLink;
