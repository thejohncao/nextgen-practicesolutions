
import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-nextgen-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a href="#" className="text-white font-heading font-bold text-xl">
              NextGen<span className="text-nextgen-purple">PS</span>
            </a>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#ai-team" className="text-sm text-white/80 hover:text-white transition-colors">AI Team</a>
            <a href="#patient-journey" className="text-sm text-white/80 hover:text-white transition-colors">Patient Journey</a>
            <a href="#roi" className="text-sm text-white/80 hover:text-white transition-colors">ROI</a>
            <a href="#pricing" className="text-sm text-white/80 hover:text-white transition-colors">Pricing</a>
            <a href="#resources" className="text-sm text-white/80 hover:text-white transition-colors">Resources</a>
          </nav>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="text-sm hidden sm:flex">
              Login
            </Button>
            <Button className="bg-nextgen-purple text-white hover:bg-nextgen-purple/90">
              Book Demo
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
