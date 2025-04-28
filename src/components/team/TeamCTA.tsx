
import React from 'react';
import RainbowButton from '../ui/rainbow-button';

const TeamCTA = () => {
  const handleChatOpen = () => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) {
        console.log('Chat button found in team CTA, clicking immediately...');
        chatButton.click();
      } else {
        console.log('Chat button not found, trying with a delay...');
        setTimeout(() => {
          const delayedChatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
          if (delayedChatButton) {
            console.log('Chat button found in team CTA after delay, clicking...');
            delayedChatButton.click();
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
        onClick={handleChatOpen}
        size="lg"
      >
        Talk to Miles
      </RainbowButton>
    </div>
  );
};

export default TeamCTA;
