
import React from 'react';
import { MessageSquare } from "lucide-react";

const NavChatButton = () => {
  const handleChatOpen = React.useCallback(() => {
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
            // Try to dispatch a custom event as a fallback
            const event = new Event('open-miles-chat');
            document.dispatchEvent(event);
          }
        }, 200);
      }
    } catch (error) {
      console.error('Error opening chat from navbar:', error);
    }
  }, []);

  return (
    <button
      onClick={handleChatOpen}
      className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-nextgen-purple hover:bg-nextgen-purple/90 text-white rounded-lg transition-all"
      data-testid="navbar-miles-button"
    >
      <MessageSquare className="h-4 w-4" />
      <span>Talk to Miles</span>
    </button>
  );
};

export default NavChatButton;
