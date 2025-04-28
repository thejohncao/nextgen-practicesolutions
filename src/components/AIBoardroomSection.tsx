
import React from 'react';
import SectionHeader from './boardroom/SectionHeader';
import ChatConversation from './boardroom/ChatConversation';
import RainbowButton from './ui/rainbow-button';

const AIBoardroomSection = () => {
  const handleChatOpen = () => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) {
        console.log('Chat button found in boardroom, clicking immediately...');
        chatButton.click();
      } else {
        console.log('Chat button not found, trying with a delay...');
        setTimeout(() => {
          const delayedChatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
          if (delayedChatButton) {
            console.log('Chat button found in boardroom after delay, clicking...');
            delayedChatButton.click();
          } else {
            console.warn('Chat button still not found in DOM after boardroom click');
          }
        }, 200);
      }
    } catch (error) {
      console.error('Error opening chat from boardroom:', error);
    }
  };

  return (
    <section 
      id="ai-boardroom" 
      className="section-padding py-20 bg-[#F1F3F6] dark:bg-nextgen-dark/70"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeader />
        <ChatConversation />
        <div className="text-center mt-12">
          <RainbowButton 
            onClick={handleChatOpen}
            size="lg"
          >
            Talk to Miles
          </RainbowButton>
        </div>
      </div>
    </section>
  );
};

export default AIBoardroomSection;
