
import React from 'react';
import { Button } from "@/components/ui/button";

const CustomIntegrationCTA = () => {
  // Function to handle opening the Miles chat
  const handleOpenChat = () => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) {
        chatButton.click();
        return;
      }
      
      // If not found immediately, try with a delay
      setTimeout(() => {
        const delayedChatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
        if (delayedChatButton) {
          delayedChatButton.click();
        } else {
          // Dispatch custom event as fallback
          const event = new CustomEvent('open-miles-chat');
          document.dispatchEvent(event);
        }
      }, 200);
    } catch (error) {
      console.error('Error opening chat:', error);
    }
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-nextgen-dark/95 to-nextgen-dark">
      <div className="container mx-auto max-w-4xl glass-card p-10 rounded-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-gradient">
          Ready to connect your entire practice ecosystem?
        </h2>
        <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto">
          Talk to Miles today and discover how our AI-powered integrations can streamline your workflow.
        </p>
        <Button 
          className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 py-6 h-auto text-lg shadow-lg shadow-nextgen-purple/20"
          onClick={handleOpenChat}
        >
          Talk to Miles
        </Button>
      </div>
    </section>
  );
};

export default CustomIntegrationCTA;
