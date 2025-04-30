
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
      // Dispatch custom event to open chat
      const event = new CustomEvent('open-miles-chat');
      document.dispatchEvent(event);
      console.log('Dispatched open-miles-chat event');
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
