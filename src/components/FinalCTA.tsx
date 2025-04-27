
import React from 'react';
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  const handleChatOpen = () => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) {
        console.log('Chat button found in FinalCTA, clicking...');
        chatButton.click();
      } else {
        console.log('Chat button not found, trying with a delay...');
        setTimeout(() => {
          const delayedChatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
          if (delayedChatButton) {
            console.log('Chat button found after delay, clicking...');
            delayedChatButton.click();
          } else {
            console.warn('Chat button not found in DOM after delay');
          }
        }, 200);
      }
    } catch (error) {
      console.error('Error opening chat from FinalCTA:', error);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-nextgen-dark/80 to-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Your Next Generation Practice Starts Here.
          </h2>
          
          <p className="text-lg text-white/70 mb-8 max-w-3xl mx-auto">
            Whenever you're ready, we're here to help you automate, grow, and thrive.
          </p>
          
          <Button 
            onClick={handleChatOpen}
            className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 py-6 h-auto text-lg rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(155,135,245,0.5)]"
          >
            Talk to Miles — Start Your Journey
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
