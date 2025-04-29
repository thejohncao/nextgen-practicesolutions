
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import MobileNav from './MobileNav';
import SolutionsMegaMenu from './navigation/SolutionsMegaMenu';
import FeaturesMegaMenu from './navigation/FeaturesMegaMenu';
import IntegrationsMegaMenu from './navigation/IntegrationsMegaMenu';
import AcademyMegaMenu from './navigation/AcademyMegaMenu';
import ResourcesMegaMenu from './navigation/ResourcesMegaMenu';
import TubelightNavLink from './ui/tubelight-nav-link';
import NavDropdown from './navigation/NavDropdown';
import NavChatButton from './navigation/NavChatButton';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  
  // Handle menu toggle with consolidated state
  const handleMenuToggle = (menu: string, state: boolean) => {
    setActiveMenu(state ? menu : null);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-nextgen-dark/95 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-white">
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl">NextGen</span>
              <span className="text-nextgen-purple text-sm -mt-1">Practice Solutions</span>
            </div>
          </Link>
          
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="space-x-1">
              <NavigationMenuItem>
                <NavDropdown 
                  title="Solutions" 
                  menuId="solutions"
                  isOpen={activeMenu === "solutions"}
                  onToggle={handleMenuToggle}
                >
                  <SolutionsMegaMenu />
                </NavDropdown>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavDropdown 
                  title="Features" 
                  menuId="features"
                  isOpen={activeMenu === "features"}
                  onToggle={handleMenuToggle}
                >
                  <FeaturesMegaMenu />
                </NavDropdown>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavDropdown 
                  title="Integrations" 
                  menuId="integrations"
                  isOpen={activeMenu === "integrations"}
                  onToggle={handleMenuToggle}
                >
                  <IntegrationsMegaMenu />
                </NavDropdown>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavDropdown 
                  title="Academy" 
                  menuId="academy"
                  isOpen={activeMenu === "academy"}
                  onToggle={handleMenuToggle}
                >
                  <AcademyMegaMenu />
                </NavDropdown>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavDropdown 
                  title="Resources" 
                  menuId="resources"
                  isOpen={activeMenu === "resources"}
                  onToggle={handleMenuToggle}
                >
                  <ResourcesMegaMenu />
                </NavDropdown>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <TubelightNavLink to="/pricing">
                  Pricing
                </TubelightNavLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              className="text-sm hidden sm:flex hover:bg-white/5 transition-all"
              asChild
            >
              <Link to="/login">Login</Link>
            </Button>
            <NavChatButton />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
