
import React from 'react';
import { Button } from '@/components/ui/button';
import ChatConversation from './boardroom/ChatConversation';
import { ArrowRight } from 'lucide-react';
import AgentResultCard from './results/AgentResultCard';
import { getFlattenedResults } from '@/data/agentResults';

const DemoResultsSection = () => {
  // Get results for the cards
  const results = getFlattenedResults().slice(0, 6); // Limit to 6 results for performance

  return (
    <section className="py-16 lg:py-20 relative overflow-hidden scroll-transition">
      {/* Subtle background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-100/40 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-purple-100/40 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gray-800">
            See Real Results
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in" 
             style={{animationDelay: '100ms'}}>
            Watch how our AI team transforms dental practices through real-time interaction and delivers measurable outcomes.
          </p>
        </div>

        {/* Two-column layout on desktop, single column on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Demo Column */}
          <div className="animate-fade-in-up" style={{animationDelay: '200ms'}}>
            <div className="mb-6 text-xl font-medium text-gray-800">
              <span className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full text-sm mr-2">Demo</span>
              How Your AI Team Works
            </div>
            
            <div className="shadow-lg rounded-xl border border-gray-200 bg-white overflow-hidden">
              <div className="p-6 bg-gray-50">
                <ChatConversation />
              </div>
              
              <div className="p-6 text-center">
                <Button 
                  className="bg-[#6C63FF] hover:bg-[#5a52e0] text-white font-bold py-3 px-8 rounded-lg text-lg group"
                >
                  Schedule a Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Results Column */}
          <div className="space-y-4">
            <div className="mb-6 text-xl font-medium text-gray-800">
              <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm mr-2">Results</span>
              Real Outcomes From Our Clients
            </div>
            
            <div className="space-y-4 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {results.map((result, index) => (
                <div 
                  key={`result-${index}`} 
                  className="animate-fade-in-up"
                  style={{animationDelay: `${(index + 1) * 150}ms`}}
                >
                  <AgentResultCard
                    result={result}
                    index={index}
                    isMobile={false}
                    isLightMode={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoResultsSection;
