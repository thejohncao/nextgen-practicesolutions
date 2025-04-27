import React from 'react';
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { MessageSquare, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import MobileNav from './MobileNav';
import SolutionsMegaMenu from './navigation/SolutionsMegaMenu';
import FeaturesMegaMenu from './navigation/FeaturesMegaMenu';
import IntegrationsMegaMenu from './navigation/IntegrationsMegaMenu';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [showSolutionsMenu, setShowSolutionsMenu] = React.useState(false);
  const [showFeaturesMenu, setShowFeaturesMenu] = React.useState(false);
  const [showIntegrationsMenu, setShowIntegrationsMenu] = React.useState(false);
  const isMobile = useIsMobile();

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
                  className="relative"
                  onMouseEnter={() => !isMobile && setShowSolutionsMenu(true)}
                  onMouseLeave={() => !isMobile && setShowSolutionsMenu(false)}
                  onClick={() => isMobile && setShowSolutionsMenu(!showSolutionsMenu)}
                >
                  <button 
                    className="text-white/80 hover:text-white transition-colors px-4 py-2 text-sm inline-flex items-center gap-1"
                  >
                    Solutions
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                  </button>
                  {showSolutionsMenu && <SolutionsMegaMenu />}
                </div>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <div
                  className="relative"
                  onMouseEnter={() => !isMobile && setShowFeaturesMenu(true)}
                  onMouseLeave={() => !isMobile && setShowFeaturesMenu(false)}
                  onClick={() => isMobile && setShowFeaturesMenu(!showFeaturesMenu)}
                >
                  <button 
                    className="text-white/80 hover:text-white transition-colors px-4 py-2 text-sm inline-flex items-center gap-1"
                  >
                    Features
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                  </button>
                  {showFeaturesMenu && <FeaturesMegaMenu />}
                </div>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <div
                  className="relative"
                  onMouseEnter={() => !isMobile && setShowIntegrationsMenu(true)}
                  onMouseLeave={() => !isMobile && setShowIntegrationsMenu(false)}
                  onClick={() => isMobile && setShowIntegrationsMenu(!showIntegrationsMenu)}
                >
                  <button 
                    className="text-white/80 hover:text-white transition-colors px-4 py-2 text-sm inline-flex items-center gap-1"
                  >
                    Integrations
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                  </button>
                  {showIntegrationsMenu && <IntegrationsMegaMenu />}
                </div>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link 
                  to="/academy"
                  className="text-white/80 hover:text-white transition-colors px-4 py-2 text-sm"
                >
                  Academy
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <a 
                  href="/#pricing" 
                  className="text-white/80 hover:text-white transition-colors px-4 py-2 text-sm"
                >
                  Pricing
                </a>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-sm hidden sm:flex hover:bg-white/5">
              Login
            </Button>
            <button
              onClick={handleChatOpen}
              className={cn(
                "hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold",
                "animate-shimmer bg-[linear-gradient(110deg,#a3c9f9,45%,#fff,55%,#a3c9f9)] bg-[length:200%_100%]",
                "text-slate-800 rounded-full transition-colors"
              )}
              data-testid="navbar-miles-button"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Meet Miles</span>
            </button>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
