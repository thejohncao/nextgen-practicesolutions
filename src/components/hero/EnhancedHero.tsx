
import React, { useState } from 'react';
import { createSequence } from '@/lib/animationUtils';
import AgentGrid from './AgentGrid';
import HeroContent from './HeroContent';
import HeroSpotlight from './HeroSpotlight';
import HeroScrollIndicator from './HeroScrollIndicator';
import HeroBackground from './HeroBackground';

const EnhancedHero = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const sequence = createSequence(0.3, 0.1);
  
  // Handle agent selection
  const handleAgentSelect = (agentName: string) => {
    setSelectedAgent(prevSelected => prevSelected === agentName ? null : agentName);
  };
  
  const handleChatOpen = () => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) {
        console.log('Chat button found in hero, clicking immediately...');
        chatButton.click();
      } else {
        console.log('Chat button not found, trying with a delay...');
        setTimeout(() => {
          const delayedChatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
          if (delayedChatButton) {
            console.log('Chat button found in hero after delay, clicking...');
            delayedChatButton.click();
          } else {
            console.warn('Chat button still not found in DOM after hero click');
          }
        }, 200);
      }
    } catch (error) {
      console.error('Error opening chat from hero:', error);
    }
  };

  return (
    <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
      {/* Background layers */}
      <HeroBackground />
      
      {/* Responsive grid */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side content */}
          <HeroContent handleChatOpen={handleChatOpen} />
          
          {/* Right side - Agent Grid with enhanced animations */}
          <div className="relative h-[400px] md:h-[500px] z-30">
            <AgentGrid
              onAgentSelect={handleAgentSelect}
              selectedAgent={selectedAgent}
            />
            
            {/* Enhanced Agent spotlight content with framer-motion animations */}
            <HeroSpotlight selectedAgent={selectedAgent} />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <HeroScrollIndicator />
    </section>
  );
};

export default EnhancedHero;
