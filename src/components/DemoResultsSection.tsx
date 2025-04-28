
import React from 'react';
import { Button } from '@/components/ui/button';
import ChatConversation from './boardroom/ChatConversation';
import { ArrowRight } from 'lucide-react';

const DemoResultsSection = () => {
  return (
    <section className="py-12 relative overflow-hidden scroll-transition">
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
        <div className="max-w-3xl mx-auto animate-fade-in-up shadow-lg rounded-xl border border-gray-200 bg-white p-6" style={{animationDelay: '200ms'}}>
          <div className="mb-6 text-xl font-medium text-gray-800">
            <span className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full text-sm mr-2">Demo</span>
            How Your AI Team Works
          </div>
          
          <div className="max-h-[500px] overflow-auto rounded-lg border border-gray-100 p-4 bg-gray-50">
            <ChatConversation />
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              className="bg-[#6C63FF] hover:bg-[#5a52e0] text-white font-bold py-3 px-8 rounded-lg text-lg group"
            >
              Schedule a Demo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoResultsSection;
