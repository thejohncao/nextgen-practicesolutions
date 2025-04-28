
import React, { useCallback, useEffect, useState } from 'react';
import ChatConversation from './boardroom/ChatConversation';
import RainbowButton from './ui/rainbow-button';
import AgentResultCard from './results/AgentResultCard';
import { getDuplicatedResults } from '@/data/agentResults';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoPlay from 'embla-carousel-autoplay';

const DemoResultsSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const allResults = getDuplicatedResults();
  const firstRowResults = allResults.slice(0, 6);
  const secondRowResults = allResults.slice(6, 12);

  // Initialize Embla carousels for both rows
  const [firstRowRef, firstRowApi] = useEmblaCarousel(
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

  const [secondRowRef, secondRowApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      dragFree: true,
      startIndex: 2 // Stagger the second row
    },
    [
      AutoPlay({ 
        playOnInit: true, 
        delay: 6000, // Slightly different timing for visual interest
        stopOnInteraction: true,
        stopOnMouseEnter: true, 
      })
    ]
  );

  // Handle carousel navigation
  const scrollPrevFirst = useCallback(() => firstRowApi?.scrollPrev(), [firstRowApi]);
  const scrollNextFirst = useCallback(() => firstRowApi?.scrollNext(), [firstRowApi]);
  const scrollPrevSecond = useCallback(() => secondRowApi?.scrollPrev(), [secondRowApi]);
  const scrollNextSecond = useCallback(() => secondRowApi?.scrollNext(), [secondRowApi]);

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
        console.log('Chat button found in demo results, clicking...');
        chatButton.click();
      } else {
        console.log('Chat button not found, trying with a delay...');
        setTimeout(() => {
          const delayedChatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
          if (delayedChatButton) {
            console.log('Chat button found after delay, clicking...');
            delayedChatButton.click();
          } else {
            console.warn('Chat button still not found after delay');
          }
        }, 200);
      }
    } catch (error) {
      console.error('Error opening chat:', error);
    }
  };

  return (
    <section className="py-16 relative overflow-hidden scroll-transition bg-white" id="experience">
      {/* Subtle background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-100/40 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-100/40 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3 text-gray-800">
            Experience the Power of Your AI Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in" 
             style={{animationDelay: '100ms'}}>
            See how your AI Executive Team transforms daily operations, drives growth, and scales your practice with precision.
          </p>
        </div>

        {/* Two column layout for desktop, stacked for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left side - Demo conversation */}
          <div className="animate-fade-in-up border border-gray-200 bg-white rounded-xl shadow-md p-4 md:p-5" style={{animationDelay: '200ms'}}>
            <div className="mb-4 text-lg font-medium text-gray-800">
              <span className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full text-sm mr-2">Demo</span>
              How Your AI Team Works
            </div>
            
            <div className="chat-container" style={{ fontSize: '0.95rem' }}>
              <ChatConversation />
            </div>
            
            <div className="mt-6 text-center">
              <RainbowButton 
                size="lg"
                onClick={handleChatOpen}
              >
                Talk to Miles
              </RainbowButton>
            </div>
          </div>
          
          {/* Right side - Results carousel with two staggered rows */}
          <div className="animate-fade-in-up space-y-6" style={{animationDelay: '300ms'}}>
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  <span className="bg-purple-100 text-purple-800 py-1 px-3 rounded-full text-sm mr-2">Results</span>
                  Real Practice Transformations
                </h3>
                
                {/* First row carousel controls - only show on desktop */}
                {!isMobile && (
                  <div className="flex space-x-2">
                    <button 
                      onClick={scrollPrevFirst}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button 
                      onClick={scrollNextFirst}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
              
              {/* First row results carousel */}
              <div className="overflow-hidden" ref={firstRowRef}>
                <div className="flex gap-6">
                  {firstRowResults.map((result, index) => (
                    <div 
                      key={`row1-${result.agent}-${result.title}-${index}`}
                      className={`flex-none ${isMobile ? 'w-[85%]' : 'w-[85%] md:w-[300px]'}`}
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
            
            {/* Second row (only for desktop) */}
            {!isMobile && (
              <div>
                <div className="flex justify-end items-center mb-4">
                  {/* Second row carousel controls */}
                  <div className="flex space-x-2">
                    <button 
                      onClick={scrollPrevSecond}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button 
                      onClick={scrollNextSecond}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
                
                {/* Second row results carousel */}
                <div className="overflow-hidden" ref={secondRowRef}>
                  <div className="flex gap-6">
                    {secondRowResults.map((result, index) => (
                      <div 
                        key={`row2-${result.agent}-${result.title}-${index}`}
                        className="flex-none w-[300px]"
                      >
                        <AgentResultCard 
                          result={result}
                          index={index + 6}
                          isMobile={isMobile}
                          isLightMode={true}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoResultsSection;
