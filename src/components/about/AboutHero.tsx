
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';
import FadeInSection from '@/components/ui/fade-in-section';

const AboutHero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-nextgen-purple/5 blur-3xl rounded-full -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-nextgen-blue/5 blur-3xl rounded-full -z-10 animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      
      <div className="container mx-auto px-4 py-20 text-center">
        <FadeInSection>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-gradient mb-6">
              The Future of Dental Teams Starts Here
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              NextGen Practice Solutions is an AI-powered operating system for modern dental practices — built to train, automate, and scale high-performance front office teams.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-nextgen-purple hover:bg-nextgen-purple/90"
                asChild
              >
                <Link to="/academy">
                  Explore the Academy <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/5"
                asChild
              >
                <Link to="/join">
                  Become a Partner Practice
                </Link>
              </Button>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default AboutHero;
