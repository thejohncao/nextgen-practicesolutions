
import React from 'react';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-nextgen-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
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

              <NavigationMenuItem>
                <Link to="/integrations" className="text-sm text-white/80 hover:text-white transition-colors px-4 py-2">
                  Integrations
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-white/80 hover:text-white transition-colors bg-transparent hover:bg-white/5">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-nextgen-dark/95 backdrop-blur-xl border border-white/10">
                  <div className="grid gap-3 p-4 w-[400px]">
                    <Link to="/academy" className="block p-3 hover:bg-white/5 rounded-lg group">
                      <div className="text-sm font-medium text-white mb-1">Academy</div>
                      <div className="text-sm text-white/60">World-class training for your dental team</div>
                    </Link>
                    <Link to="/story" className="block p-3 hover:bg-white/5 rounded-lg group">
                      <div className="text-sm font-medium text-white mb-1">Our Story</div>
                      <div className="text-sm text-white/60">Learn about our mission and vision</div>
                    </Link>
                    <Link to="/features" className="block p-3 hover:bg-white/5 rounded-lg group">
                      <div className="text-sm font-medium text-white mb-1">Features</div>
                      <div className="text-sm text-white/60">Explore our platform capabilities</div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/pricing" className="text-sm text-white/80 hover:text-white transition-colors px-4 py-2">
                  Pricing
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
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
