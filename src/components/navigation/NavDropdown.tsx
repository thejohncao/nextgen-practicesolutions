
import React, { useRef, useState } from 'react';
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from '@/hooks/use-mobile';

interface NavDropdownProps {
  title: string;
  menuId: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: (menu: string, state: boolean) => void;
}

const NavDropdown = ({ title, menuId, children, isOpen, onToggle }: NavDropdownProps) => {
  const isMobile = useIsMobile();
  const menuRef = useRef<HTMLDivElement>(null);
  
  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={() => !isMobile && onToggle(menuId, true)}
      onMouseLeave={() => !isMobile && onToggle(menuId, false)}
    >
      <button 
        className="text-white/80 hover:text-white transition-colors px-4 py-2 text-sm inline-flex items-center gap-1"
        onClick={() => isMobile && onToggle(menuId, !isOpen)}
        aria-expanded={isOpen}
      >
        {title}
        <ChevronDown className={cn("h-3.5 w-3.5 opacity-50 transition-transform", 
          isOpen && "transform rotate-180")} />
      </button>
      {isOpen && children}
    </div>
  );
};

export default NavDropdown;
