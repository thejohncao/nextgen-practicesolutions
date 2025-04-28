
import React from 'react';
import { Button } from '@/components/ui/button';
import SectionHeader from './boardroom/SectionHeader';
import ChatConversation from './boardroom/ChatConversation';
import { getDuplicatedResults } from '@/data/agentResults';
import AgentResultCard from './results/AgentResultCard';
import { ArrowRight } from 'lucide-react';

const DemoResultsSection = () => {
  const duplicatedResults = getDuplicatedResults();
  // Take only first 4 results for more focused display
  const featuredResults = duplicatedResults.slice(0, 4);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-nextgen-purple/10 blur-[100px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#3E63DD]/10 blur-[80px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient animate-fade-in">
            See it in Action. See Real Results.
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '100ms'}}>
            Watch how our AI team transforms dental practices, then see the measurable outcomes from real customers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side: Demo/Conversation */}
          <div className="animate-fade-in-up" style={{animationDelay: '200ms'}}>
            <div className="mb-6 text-xl font-medium text-white opacity-90">
              <span className="bg-nextgen-purple/20 py-1 px-3 rounded-full text-sm mr-2">Demo</span>
              How Your AI Team Works
            </div>
            
            <ChatConversation />
            
            <div className="mt-8 text-center">
              <Button 
                className="bg-[#6C63FF] hover:bg-[#5a52e0] text-white font-bold py-3 px-8 rounded-lg text-lg group"
              >
                Schedule a Demo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right side: Results/Outcomes */}
          <div className="animate-fade-in-up" style={{animationDelay: '400ms'}}>
            <div className="mb-6 text-xl font-medium text-white opacity-90">
              <span className="bg-green-500/20 py-1 px-3 rounded-full text-sm mr-2">Results</span>
              Real Practice Outcomes
            </div>
            
            <div className="space-y-4 relative">
              {featuredResults.map((result, index) => (
                <div 
                  key={`${result.agent}-${result.title}-${index}`}
                  className={`transition-all duration-500 animate-fade-in-up`}
                  style={{animationDelay: `${index * 100 + 500}ms`}}
                >
                  <AgentResultCard 
                    result={result} 
                    index={index} 
                    isMobile={false} 
                  />
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                variant="outline"
                className="border-nextgen-purple/30 text-nextgen-purple hover:bg-nextgen-purple/10"
              >
                View All Results
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoResultsSection;
