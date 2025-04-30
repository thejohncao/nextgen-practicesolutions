
import React, { useState } from 'react';
import RainbowButton from '../ui/rainbow-button';
import AgentLauncherModal from '../agent-launcher/AgentLauncherModal';

const TeamCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAgentSelect = (agentName: string) => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) {
        console.log('Chat button found in team CTA, clicking immediately...');
        chatButton.click();
        
        // Store the selected agent in sessionStorage
        sessionStorage.setItem('nextgen_selected_agent', agentName);
      } else {
        console.log('Chat button not found, trying with a delay...');
        setTimeout(() => {
          const delayedChatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
          if (delayedChatButton) {
            console.log('Chat button found in team CTA after delay, clicking...');
            delayedChatButton.click();
            
            // Store the selected agent in sessionStorage
            sessionStorage.setItem('nextgen_selected_agent', agentName);
          } else {
            console.warn('Chat button still not found in DOM after team CTA click');
          }
        }, 200);
      }
    } catch (error) {
      console.error('Error opening chat from team CTA:', error);
    }
  };

  return (
    <div className="text-center mt-8">
      <RainbowButton 
        onClick={() => setIsModalOpen(true)}
        size="lg"
      >
        Talk to the AI Team
      </RainbowButton>
      
      <AgentLauncherModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSelectAgent={handleAgentSelect}
      />
    </div>
  );
};

export default TeamCTA;
