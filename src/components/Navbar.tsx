
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { MessageSquare, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import MobileNav from './MobileNav';
import SolutionsMegaMenu from './navigation/SolutionsMegaMenu';
import FeaturesMegaMenu from './navigation/FeaturesMegaMenu';
import IntegrationsMegaMenu from './navigation/IntegrationsMegaMenu';
import AcademyMegaMenu from './navigation/AcademyMegaMenu';
import ResourcesMegaMenu from './navigation/ResourcesMegaMenu';
import { useIsMobile } from '@/hooks/use-mobile';
import TubelightNavLink from '@/components/ui/tubelight-nav-link';

const Navbar = () => {
  const [showSolutionsMenu, setShowSolutionsMenu] = useState(false);
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false);
  const [showIntegrationsMenu, setShowIntegrationsMenu] = useState(false);
  const [showAcademyMenu, setShowAcademyMenu] = useState(false);
  const [showResourcesMenu, setShowResourcesMenu] = useState(false);
  const isMobile = useIsMobile();
  
  // Add refs for each dropdown container
  const solutionsRef = useRef(null);
  const featuresRef = useRef(null);
  const integrationsRef = useRef(null);
  const academyRef = useRef(null);
  const resourcesRef = useRef(null);

  // Handle clicks outside of the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        solutionsRef.current && !solutionsRef.current.contains(event.target) &&
        featuresRef.current && !featuresRef.current.contains(event.target) &&
        integrationsRef.current && !integrationsRef.current.contains(event.target) &&
        academyRef.current && !academyRef.current.contains(event.target) &&
        resourcesRef.current && !resourcesRef.current.contains(event.target)
      ) {
        setShowSolutionsMenu(false);
        setShowFeaturesMenu(false);
        setShowIntegrationsMenu(false);
        setShowAcademyMenu(false);
        setShowResourcesMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close all other menus when one is opened
  const handleMenuToggle = (menu, state) => {
    // Close all menus first
    setShowSolutionsMenu(false);
    setShowFeaturesMenu(false);
    setShowIntegrationsMenu(false);
    setShowAcademyMenu(false);
    setShowResourcesMenu(false);
    
    // Then open the selected one
    if (menu === 'solutions') setShowSolutionsMenu(state);
    if (menu === 'features') setShowFeaturesMenu(state);
    if (menu === 'integrations') setShowIntegrationsMenu(state);
    if (menu === 'academy') setShowAcademyMenu(state);
    if (menu === 'resources') setShowResourcesMenu(state);
  };

  const handleChatOpen = () => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) {
        console.log('Chat button found in navbar, clicking immediately...');
        chatButton.click();
      } else {
        console.log('Chat button not found, trying with a delay...');
        setTimeout(() => {
          const delayedChatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
          if (delayedChatButton) {
            console.log('Chat button found in navbar after delay, clicking...');
            delayedChatButton.click();
          } else {
            console.warn('Chat button still not found in DOM after navbar click');
          }
        }, 200);
      }
    } catch (error) {
      console.error('Error opening chat from navbar:', error);
    }
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
                <div
                  ref={solutionsRef}
                  className="relative"
                  onMouseEnter={() => !isMobile && handleMenuToggle('solutions', true)}
                  onMouseLeave={() => !isMobile && handleMenuToggle('solutions', false)}
                >
                  <button 
                    className="text-white/80 hover:text-white transition-colors px-4 py-2 text-sm inline-flex items-center gap-1"
                    onClick={() => isMobile && handleMenuToggle('solutions', !showSolutionsMenu)}
                    aria-expanded={showSolutionsMenu}
                  >
                    Solutions
                    <ChevronDown className={cn("h-3.5 w-3.5 opacity-50 transition-transform", 
                      showSolutionsMenu && "transform rotate-180")} />
                  </button>
                  {showSolutionsMenu && <SolutionsMegaMenu />}
                </div>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <div
                  ref={featuresRef}
                  className="relative"
                  onMouseEnter={() => !isMobile && handleMenuToggle('features', true)}
                  onMouseLeave={() => !isMobile && handleMenuToggle('features', false)}
                >
                  <button 
                    className="text-white/80 hover:text-white transition-colors px-4 py-2 text-sm inline-flex items-center gap-1"
                    onClick={() => isMobile && handleMenuToggle('features', !showFeaturesMenu)}
                    aria-expanded={showFeaturesMenu}
                  >
                    Features
                    <ChevronDown className={cn("h-3.5 w-3.5 opacity-50 transition-transform", 
                      showFeaturesMenu && "transform rotate-180")} />
                  </button>
                  {showFeaturesMenu && <FeaturesMegaMenu />}
                </div>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <div
                  ref={integrationsRef}
                  className="relative"
                  onMouseEnter={() => !isMobile && handleMenuToggle('integrations', true)}
                  onMouseLeave={() => !isMobile && handleMenuToggle('integrations', false)}
                >
                  <button 
                    className="text-white/80 hover:text-white transition-colors px-4 py-2 text-sm inline-flex items-center gap-1"
                    onClick={() => isMobile && handleMenuToggle('integrations', !showIntegrationsMenu)}
                    aria-expanded={showIntegrationsMenu}
                  >
                    Integrations
                    <ChevronDown className={cn("h-3.5 w-3.5 opacity-50 transition-transform", 
                      showIntegrationsMenu && "transform rotate-180")} />
                  </button>
                  {showIntegrationsMenu && <IntegrationsMegaMenu />}
                </div>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <div
                  ref={academyRef}
                  className="relative"
                  onMouseEnter={() => !isMobile && handleMenuToggle('academy', true)}
                  onMouseLeave={() => !isMobile && handleMenuToggle('academy', false)}
                >
                  <button 
                    className="text-white/80 hover:text-white transition-colors px-4 py-2 text-sm inline-flex items-center gap-1"
                    onClick={() => isMobile && handleMenuToggle('academy', !showAcademyMenu)}
                    aria-expanded={showAcademyMenu}
                  >
                    Academy
                    <ChevronDown className={cn("h-3.5 w-3.5 opacity-50 transition-transform", 
                      showAcademyMenu && "transform rotate-180")} />
                  </button>
                  {showAcademyMenu && <AcademyMegaMenu />}
                </div>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <div
                  ref={resourcesRef}
                  className="relative"
                  onMouseEnter={() => !isMobile && handleMenuToggle('resources', true)}
                  onMouseLeave={() => !isMobile && handleMenuToggle('resources', false)}
                >
                  <button 
                    className="text-white/80 hover:text-white transition-colors px-4 py-2 text-sm inline-flex items-center gap-1"
                    onClick={() => isMobile && handleMenuToggle('resources', !showResourcesMenu)}
                    aria-expanded={showResourcesMenu}
                  >
                    Resources
                    <ChevronDown className={cn("h-3.5 w-3.5 opacity-50 transition-transform", 
                      showResourcesMenu && "transform rotate-180")} />
                  </button>
                  {showResourcesMenu && <ResourcesMegaMenu />}
                </div>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <TubelightNavLink to="/#pricing">
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
            <button
              onClick={handleChatOpen}
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-nextgen-purple hover:bg-nextgen-purple/90 text-white rounded-lg transition-all"
              data-testid="navbar-miles-button"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Talk to Miles</span>
            </button>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
