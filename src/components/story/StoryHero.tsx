
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

const StoryHero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-nextgen-purple/5 blur-3xl rounded-full -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-nextgen-blue/5 blur-3xl rounded-full -z-10 animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm mb-6">
            <span className="text-gradient-primary font-medium">Our Journey</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-gradient mb-6">
            Building the Future of Dental Practice Management
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            From real-world dental practice challenges to revolutionary AI solutions—discover how we're transforming the industry.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-nextgen-purple hover:bg-nextgen-purple/90"
              asChild
            >
              <Link to="/demo">
                See It In Action <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryHero;
