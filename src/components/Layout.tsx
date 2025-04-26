
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MilesBanner from './MilesBanner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const handleOpenChat = () => {
    try {
      // Try to find the chat button with a small delay to ensure it's mounted
      setTimeout(() => {
        const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
        if (chatButton) {
          console.log('Chat button found after delay, clicking...');
          chatButton.click();
        } else {
          console.warn('Chat button still not found in DOM after delay');
        }
      }, 100);
    } catch (error) {
      console.error('Error opening chat:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-nextgen-dark text-white">
      <MilesBanner onOpenChat={handleOpenChat} />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
