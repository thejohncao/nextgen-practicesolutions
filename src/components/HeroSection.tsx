
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-nextgen-purple/5 blur-3xl rounded-full -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-nextgen-blue/5 blur-3xl rounded-full -z-10 animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm mb-6">
            <span className="text-gradient-primary font-medium">Industry First</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold leading-tight bg-gradient-to-br from-nextgen-purple via-nextgen-purple/90 to-nextgen-blue bg-clip-text text-transparent mb-6">
            The World's First AI Team for Dental Practices
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Transform your dental practice with our AI-powered platform. Automate routine tasks, enhance patient care, and drive unprecedented growth.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-nextgen-purple hover:bg-nextgen-purple/90"
              asChild
            >
              <Link to="/demo">
                Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
