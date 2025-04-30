
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

interface HeroContentProps {
  welcomeComplete: boolean;
  isVisible: boolean;
}

const HeroContent: React.FC<HeroContentProps> = ({ welcomeComplete, isVisible }) => {
  const handleChatOpen = () => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) {
        chatButton.click();
      }
    } catch (error) {
      console.error('Error opening chat:', error);
    }
  };

  return (
    <div className="text-center max-w-3xl mx-auto">
      {/* Company Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20 
        }}
        transition={{ 
          duration: 0.5, 
          ease: [0.22, 1, 0.36, 1]
        }}
        className="mb-4 md:mb-6"
      >
        <h2 className="text-white text-xl md:text-2xl font-medium">
          NextGen Practice Solutions
        </h2>
      </motion.div>
      
      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20 
        }}
        transition={{ 
          duration: 0.5, 
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
      >
        Your AI Executive Team
      </motion.h1>
      
      {/* Subheader */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20 
        }}
        transition={{ 
          duration: 0.5, 
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8"
      >
        Experience the next generation of practice management with AI agents that grow, retain, and scale your business.
      </motion.p>
      
      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 20 
        }}
        transition={{ 
          duration: 0.5, 
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        <Button 
          onClick={handleChatOpen}
          className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 py-6 text-lg"
          size="lg"
        >
          Talk to Miles
        </Button>
      </motion.div>
    </div>
  );
};

export default HeroContent;
