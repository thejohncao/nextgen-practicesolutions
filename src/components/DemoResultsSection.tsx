
import React from 'react';
import ChatConversation from './boardroom/ChatConversation';
import RainbowButton from './ui/rainbow-button';

const DemoResultsSection = () => {
  const handleChatOpen = () => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) {
        console.log('Chat button found in demo results, clicking immediately...');
        chatButton.click();
      } else {
        console.log('Chat button not found, trying with a delay...');
        setTimeout(() => {
          const delayedChatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
          if (delayedChatButton) {
            console.log('Chat button found in demo results after delay, clicking...');
            delayedChatButton.click();
          } else {
            console.warn('Chat button still not found in DOM after demo results click');
          }
        }, 200);
      }
    } catch (error) {
      console.error('Error opening chat from demo results:', error);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden scroll-transition bg-white">
      {/* Subtle background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-100/40 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-100/40 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gray-800">
            See it in Action
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in" 
             style={{animationDelay: '100ms'}}>
            Watch how our AI team transforms dental practices through real-time interaction.
          </p>
        </div>

        {/* Single column focus on the demo conversation */}
        <div className="max-w-3xl mx-auto animate-fade-in-up border border-gray-200 bg-white rounded-xl shadow-md p-6" style={{animationDelay: '200ms'}}>
          <div className="mb-6 text-xl font-medium text-gray-800">
            <span className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full text-sm mr-2">Demo</span>
            How Your AI Team Works
          </div>
          
          <ChatConversation />
          
          <div className="mt-8 text-center">
            <RainbowButton 
              size="lg"
              onClick={handleChatOpen}
            >
              Talk to Miles
            </RainbowButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoResultsSection;
