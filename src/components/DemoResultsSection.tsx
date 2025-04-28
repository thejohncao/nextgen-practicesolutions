
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarCheck, PieChart } from "lucide-react";
import { Link } from 'react-router-dom';
import { getDuplicatedResults } from '@/data/agentResults';
import AgentResultCard from './results/AgentResultCard';

const DemoResultsSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const duplicatedResults = getDuplicatedResults().slice(0, 6); // Limit to 6 results for this section

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            See It In Action
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            Schedule a personalized demo and see real results from our AI team in action
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side: Demo CTA */}
          <div className="flex flex-col items-center lg:items-start justify-center space-y-8 glass-card p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-nextgen-purple/20 rounded-full blur-3xl"></div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <CalendarCheck className="h-4 w-4 text-nextgen-purple" />
              <span className="text-sm font-medium">Personalized Demo</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight relative z-10 text-center lg:text-left">
              Experience How NextGen Works For <span className="text-nextgen-purple">Your</span> Practice
            </h3>

            <div className="relative z-10 w-full max-w-md">
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg border border-white/10 mb-6">
                <div className="bg-gradient-to-br from-nextgen-dark to-nextgen-purple/20 w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-nextgen-purple/20 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:scale-105 transition-transform border border-white/20">
                    <div className="w-12 h-12 rounded-full bg-nextgen-purple flex items-center justify-center">
                      <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                asChild
                size="lg"
                className="w-full bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 py-6 h-auto text-lg rounded-lg shadow-lg hover:shadow-nextgen-purple/25 hover:scale-[1.02] transition-all duration-300 group"
              >
                <Link to="/demo" className="flex items-center justify-center">
                  Schedule Your Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right side: Results carousel */}
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <PieChart className="h-4 w-4 text-nextgen-purple" />
              <span className="text-sm font-medium">Real Results</span>
            </div>

            <div className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[450px] overflow-y-auto pr-4 styled-scrollbar">
                {duplicatedResults.map((result, index) => (
                  <div
                    key={`result-${index}`}
                    className="transform transition-all duration-500 animate-fade-in"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <AgentResultCard 
                      result={result}
                      index={index}
                      isMobile={false}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-nextgen-dark to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoResultsSection;
