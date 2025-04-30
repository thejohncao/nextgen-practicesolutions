
import React, { useState } from 'react';
import { MessageSquare } from "lucide-react";
import AgentLauncherModal from '../agent-launcher/AgentLauncherModal';

const NavChatButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAgentSelect = (agentName: string) => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) {
        console.log('Chat button found in navbar, clicking immediately...');
        chatButton.click();
        
        // Store the selected agent in sessionStorage
        sessionStorage.setItem('nextgen_selected_agent', agentName);
      } else {
        console.log('Chat button not found, trying with a delay...');
        setTimeout(() => {
          const delayedChatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
          if (delayedChatButton) {
            console.log('Chat button found in navbar after delay, clicking...');
            delayedChatButton.click();
            
            // Store the selected agent in sessionStorage
            sessionStorage.setItem('nextgen_selected_agent', agentName);
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
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-nextgen-purple hover:bg-nextgen-purple/90 text-white rounded-lg transition-all"
        data-testid="navbar-miles-button"
      >
        <MessageSquare className="h-4 w-4" />
        <span>Talk to the AI Team</span>
      </button>
      
      <AgentLauncherModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSelectAgent={handleAgentSelect}
      />
    </>
  );
};

export default NavChatButton;
