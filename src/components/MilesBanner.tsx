
import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface MilesBannerProps {
  onOpenChat: () => void;
}

const MilesBanner = ({ onOpenChat }: MilesBannerProps) => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Handle scroll events to show banner after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      // Only show banner after scrolling down a bit (300px)
      const scrollPosition = window.scrollY;
      if (scrollPosition > 300) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Control banner visibility based on timing and scroll position
  useEffect(() => {
    // Initial delay to prevent overlap with hero section
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Banner clicked, attempting to open chat...');
    const chatButton = document.querySelector('[data-testid="chat-toggle"]');
    
    if (chatButton) {
      console.log('Chat button found, clicking directly...');
      (chatButton as HTMLElement).click();
    } else {
      console.log('No chat button found, trying fallback handler...');
      onOpenChat();
    }
  };

  // Only show banner when both conditions are met:
  // 1. Initial delay has passed (isVisible=true)
  // 2. User has scrolled down (hasScrolled=true)
  const shouldShowBanner = isVisible && hasScrolled;

  return (
    <button 
      onClick={handleClick}
      className={cn(
        "w-full bg-[#F0F8FF] border-b border-blue-100/50 fixed bottom-0 left-0 right-0 z-[60] transition-all duration-300 ease-in-out",
        shouldShowBanner ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
        isMobile ? "h-[40px]" : "h-[50px]"
      )}
      data-testid="miles-banner"
    >
      <div className="container mx-auto h-full max-w-[1200px]">
        <div className="flex items-center justify-center h-full px-4">
          <p className={cn(
            "text-slate-800 font-semibold text-center",
            isMobile ? "text-sm" : "text-base md:text-lg"
          )}>
            Your Always-On AI Concierge — {' '}
            <span className="inline-flex animate-shimmer bg-gradient-to-r from-[#a3c9f9] via-white to-[#a3c9f9] bg-[length:400%_100%] bg-clip-text text-transparent">
              Meet Miles
            </span>
          </p>
        </div>
      </div>
    </button>
  );
};

export default MilesBanner;
