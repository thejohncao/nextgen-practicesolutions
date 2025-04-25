
import React from 'react';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-nextgen-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-white">
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl">NextGen</span>
                <span className="text-nextgen-purple text-sm -mt-1">Practice Solutions</span>
              </div>
            </Link>
          </div>
          
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {/* Solutions Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white/80 hover:text-white transition-colors bg-transparent hover:bg-white/5">
                  Solutions
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-nextgen-dark/95 backdrop-blur-xl border border-white/10">
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link to="/solutions" className="block p-3 hover:bg-white/5 rounded-lg group">
                      <div className="text-sm font-medium text-white mb-1">Practice Management</div>
                      <div className="text-sm text-white/60">Run smoother with AI automation</div>
                    </Link>
                    <Link to="/solutions" className="block p-3 hover:bg-white/5 rounded-lg group">
                      <div className="text-sm font-medium text-white mb-1">Practice Growth</div>
                      <div className="text-sm text-white/60">Scale your patient acquisition</div>
                    </Link>
                    <Link to="/solutions" className="block p-3 hover:bg-white/5 rounded-lg group">
                      <div className="text-sm font-medium text-white mb-1">Practice Development</div>
                      <div className="text-sm text-white/60">Train and develop your team</div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Academy */}
              <NavigationMenuItem>
                <Link to="/academy" className="text-sm text-white/80 hover:text-white transition-colors px-4 py-2">
                  Academy
                </Link>
              </NavigationMenuItem>

              {/* Free Resources */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white/80 hover:text-white transition-colors bg-transparent hover:bg-white/5">
                  Free Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-nextgen-dark/95 backdrop-blur-xl border border-white/10">
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link to="/resources/playbook" className="block p-3 hover:bg-white/5 rounded-lg group">
                      <div className="text-sm font-medium text-white mb-1">AI Practice Playbook</div>
                      <div className="text-sm text-white/60">Download proven strategies and templates</div>
                    </Link>
                    <Link to="/resources/audit" className="block p-3 hover:bg-white/5 rounded-lg group">
                      <div className="text-sm font-medium text-white mb-1">Practice Audit Quiz</div>
                      <div className="text-sm text-white/60">Get your personalized growth plan</div>
                    </Link>
                    <Link to="/resources/roi" className="block p-3 hover:bg-white/5 rounded-lg group">
                      <div className="text-sm font-medium text-white mb-1">ROI Calculator</div>
                      <div className="text-sm text-white/60">Estimate your practice's potential</div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Pricing */}
              <NavigationMenuItem>
                <Link to="/pricing" className="text-sm text-white/80 hover:text-white transition-colors px-4 py-2">
                  Pricing
                </Link>
              </NavigationMenuItem>

              {/* About */}
              <NavigationMenuItem>
                <Link to="/story" className="text-sm text-white/80 hover:text-white transition-colors px-4 py-2">
                  About
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="text-sm hidden sm:flex hover:bg-white/5">
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
