
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import AgentLauncherModal from './agent-launcher/AgentLauncherModal';

interface MilesBannerProps {
  onOpenChat: () => void;
}

const MilesBanner = ({ onOpenChat }: MilesBannerProps) => {
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleAgentSelect = (agentName: string) => {
    try {
      // Store the selected agent in sessionStorage
      sessionStorage.setItem('nextgen_selected_agent', agentName);
      
      const chatButton = document.querySelector('[data-testid="chat-toggle"]');
      
      if (chatButton) {
        console.log('Chat button found, clicking directly...');
        (chatButton as HTMLElement).click();
      } else {
        console.log('No chat button found, trying fallback handler...');
        onOpenChat();
      }
    } catch (error) {
      console.error('Error opening chat from banner:', error);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "w-full bg-[#F0F8FF] border-b border-blue-100/50 z-[60] transition-opacity duration-300 ease-in-out opacity-0 animate-fade-in",
          isMobile ? "h-[40px]" : "h-[50px]"
        )}
      >
        <div className="container mx-auto h-full max-w-[1200px]">
          <div className="flex items-center justify-center h-full px-4">
            <p className={cn(
              "text-slate-800 font-semibold text-center",
              isMobile ? "text-sm" : "text-base md:text-lg"
            )}>
              Your Always-On AI Team — {' '}
              <span className="inline-flex animate-shimmer bg-gradient-to-r from-[#a3c9f9] via-white to-[#a3c9f9] bg-[length:400%_100%] bg-clip-text text-transparent">
                Meet Your Agents
              </span>
            </p>
          </div>
        </div>
      </button>
      
      <AgentLauncherModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSelectAgent={handleAgentSelect}
      />
    </>
  );
};

export default MilesBanner;
