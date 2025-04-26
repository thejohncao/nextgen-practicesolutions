
import React from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden text-white hover:bg-white/10"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 bg-nextgen-dark/95 backdrop-blur-xl border-white/10">
        <nav className="flex flex-col gap-4 mt-8">
          <Link 
            to="/solutions" 
            className="text-lg font-medium text-white hover:text-nextgen-purple transition-colors"
          >
            Solutions
          </Link>
          <Link 
            to="/academy" 
            className="text-lg font-medium text-white hover:text-nextgen-purple transition-colors"
          >
            Academy
          </Link>
          <Link 
            to="/resources" 
            className="text-lg font-medium text-white hover:text-nextgen-purple transition-colors"
          >
            Resources
          </Link>
          <Link 
            to="/story" 
            className="text-lg font-medium text-white hover:text-nextgen-purple transition-colors"
          >
            About
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
