
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MilesBanner from './MilesBanner';
import { TooltipProvider } from "@/components/ui/tooltip"; // Added import

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const handleOpenChat = () => {
    try {
      // Try to find the chat button immediately first
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) {
        console.log('Chat button found immediately, clicking...');
        chatButton.click();
        return;
      }
      
      // If not found immediately, try with a delay to ensure it's mounted
      console.log('Chat button not found immediately, trying with delay...');
      setTimeout(() => {
        const delayedChatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
        if (delayedChatButton) {
          console.log('Chat button found after delay, clicking...');
          delayedChatButton.click();
        } else {
          // If still not found, try to create an event that the AiAssistant can listen to
          console.warn('Chat button still not found in DOM after delay');
          const event = new CustomEvent('open-miles-chat');
          document.dispatchEvent(event);
          console.log('Dispatched custom open-miles-chat event');
        }
      }, 200); // Increased timeout for better reliability
    } catch (error) {
      console.error('Error opening chat:', error);
    }
  };

  return (
    <TooltipProvider> {/* Added TooltipProvider */}
      <div className="flex flex-col min-h-screen bg-nextgen-dark text-white">
        <MilesBanner onOpenChat={handleOpenChat} />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  );
};

export default Layout;
