
import React from 'react';
import ChatConversation from './boardroom/ChatConversation';
import RainbowButton from './ui/rainbow-button';
import AgentResultCard from './results/AgentResultCard';
import { getDuplicatedResults } from '@/data/agentResults';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';

const DemoResultsSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const duplicatedResults = getDuplicatedResults().slice(0, 6);

  // Initialize Embla carousel
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      dragFree: true,
    },
    [
      AutoPlay({ 
        playOnInit: true, 
        delay: 5000, 
        stopOnInteraction: true,
        stopOnMouseEnter: true, 
      })
    ]
  );

  // Handle carousel navigation
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Handle mobile detection
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gray-800">
            See it in Action
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in" 
             style={{animationDelay: '100ms'}}>
            Watch how our AI team transforms dental practices through real-time interaction.
          </p>
        </div>

        {/* Two column layout for desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Demo conversation */}
          <div className="animate-fade-in-up border border-gray-200 bg-white rounded-xl shadow-md p-6" style={{animationDelay: '200ms'}}>
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
          
          {/* Right side - Results carousel */}
          <div className="animate-fade-in-up" style={{animationDelay: '300ms'}}>
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium text-gray-800">
                  <span className="bg-purple-100 text-purple-800 py-1 px-3 rounded-full text-sm mr-2">Results</span>
                  Real Practice Transformations
                </h3>
                
                {/* Carousel controls */}
                {!isMobile && (
                  <div className="flex space-x-2">
                    <button 
                      onClick={scrollPrev}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button 
                      onClick={scrollNext}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Results carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {duplicatedResults.map((result, index) => (
                  <div 
                    key={`${result.agent}-${result.title}-${index}`}
                    className="flex-none min-w-full md:min-w-[80%] px-2"
                  >
                    <AgentResultCard 
                      result={result}
                      index={index}
                      isMobile={isMobile}
                      isLightMode={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoResultsSection;
