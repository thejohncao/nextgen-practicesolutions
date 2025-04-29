
import React, { useState, useEffect } from 'react';
import ChatConversation from './boardroom/ChatConversation';
import RainbowButton from './ui/rainbow-button';
import AgentResultCard from './results/AgentResultCard';
import { getFlattenedResults } from '@/data/agentResults';

const DemoResultsSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const allResults = getFlattenedResults();
  
  // Filter and organize results in the requested order
  const organizedResults = {
    leftColumn: [
      // Miles — Same-Week Scheduling
      allResults.find(r => r.agent === "Miles" && r.title.includes("Same-Week Scheduling")),
      // Devon — Treatment Follow-Ups
      allResults.find(r => r.agent === "Devon" && r.title.includes("ROI on Treatment Plan")),
      // Miles — No-Show Reduction
      allResults.find(r => r.agent === "Miles" && r.title.includes("No-Show")),
      // Devon — Treatment Acceptance Boost
      allResults.find(r => r.agent === "Devon" && r.title.includes("Case Acceptance")),
      // Miles — Insurance Collections Increase
      allResults.find(r => r.agent === "Miles" && r.title.includes("Insurance Collections"))
    ].filter(Boolean),
    
    rightColumn: [
      // Giselle — Google Reviews
      allResults.find(r => r.agent === "Giselle" && r.title.includes("Google Reviews")),
      // Alma — Team Onboarding
      allResults.find(r => r.agent === "Alma" && r.title.includes("Team Onboarding")),
      // Giselle — Lead Conversion
      allResults.find(r => r.agent === "Giselle" && r.title.includes("New Patient Leads")),
      // Alma — Staff Management Savings
      allResults.find(r => r.agent === "Alma" && r.title.includes("Staff Management")),
      // Giselle — Social Proof Growth (optional)
      allResults.find(r => r.agent === "Giselle" && !r.title.includes("Google Reviews") && !r.title.includes("New Patient Leads"))
    ].filter(Boolean)
  };

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
    <section className="py-16 relative overflow-hidden bg-[#121212] text-white" id="experience">
      {/* Animated background circles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Blue circle - Miles */}
        <div 
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]"
          style={{ animation: 'float 20s ease-in-out infinite' }}
        ></div>
        
        {/* Green circle - Giselle */}
        <div 
          className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] bg-green-500/10 rounded-full blur-[120px]"
          style={{ animation: 'float 24s ease-in-out infinite', animationDelay: '5s' }}
        ></div>
        
        {/* Purple circle - Devon */}
        <div 
          className="absolute top-2/3 left-1/3 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px]"
          style={{ animation: 'float 18s ease-in-out infinite', animationDelay: '3s' }}
        ></div>
        
        {/* Amber circle - Alma */}
        <div 
          className="absolute top-1/4 right-1/4 w-[280px] h-[280px] bg-amber-500/10 rounded-full blur-[90px]"
          style={{ animation: 'float 22s ease-in-out infinite', animationDelay: '8s' }}
        ></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-3 text-white">
            Experience Your AI Team in Action
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto animate-fade-in" 
             style={{animationDelay: '100ms'}}>
            See how your AI Executive Team transforms daily operations and drives real practice growth.
          </p>
        </div>

        {/* Two column layout for desktop, stacked for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left side - Demo conversation */}
          <div className="animate-fade-in-up glass-card bg-black/50 rounded-xl shadow-lg p-4 md:p-5 border border-white/10" style={{animationDelay: '200ms'}}>
            <div className="mb-4 text-lg font-medium text-white">
              <span className="bg-indigo-900/50 text-indigo-200 py-1 px-3 rounded-full text-sm mr-2">Demo</span>
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
          
          {/* Right side - Results Grid */}
          <div className="animate-fade-in-up" style={{animationDelay: '300ms'}}>
            <div>
              <h3 className="text-xl font-medium text-white mb-5">
                <span className="bg-purple-900/50 text-purple-200 py-1 px-3 rounded-full text-sm mr-2">Results</span>
                Real Practice Transformations
              </h3>
              
              {/* Results grid with 2 columns for desktop, 1 column for mobile */}
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-5`}>
                {/* Left column */}
                <div className="space-y-5">
                  {organizedResults.leftColumn.map((result, index) => (
                    result && (
                      <div 
                        key={`left-${result.agent}-${result.title}-${index}`} 
                        className="animate-section-transition"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <AgentResultCard 
                          result={result}
                          index={index}
                          isMobile={isMobile}
                          isLightMode={false}
                        />
                      </div>
                    )
                  ))}
                </div>
                
                {/* Right column */}
                <div className="space-y-5">
                  {organizedResults.rightColumn.map((result, index) => (
                    result && (
                      <div 
                        key={`right-${result.agent}-${result.title}-${index}`}
                        className="animate-section-transition"
                        style={{ animationDelay: `${(index + 0.5) * 100}ms` }}
                      >
                        <AgentResultCard 
                          result={result}
                          index={index + organizedResults.leftColumn.length}
                          isMobile={isMobile}
                          isLightMode={false}
                        />
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoResultsSection;
