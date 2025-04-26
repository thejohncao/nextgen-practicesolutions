
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MilesBanner from './MilesBanner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const handleOpenChat = () => {
    const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
    if (chatButton) {
      chatButton.click();
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
