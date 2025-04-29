
import React from 'react';
import { Button } from "@/components/ui/button";
import QuantumGrid from '../effects/QuantumGrid';
import { ArrowDown } from "lucide-react";
import { Link as ScrollLink } from "react-router-dom";
import { Link } from "react-router-dom";
import EmailCollectionDialog from '../EmailCollectionDialog';

const AcademyHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <QuantumGrid />
      
      {/* Background effects */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-b from-nextgen-dark/80 via-nextgen-dark to-nextgen-dark/90"></div>
      </div>

      <div className="absolute inset-0 -z-10">
        {/* Animated gradient orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-nextgen-purple/10 blur-[100px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-nextgen-blue/10 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 text-center relative">
        <div className="inline-block px-3 py-1 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] text-sm mb-6 animate-fade-in" style={{animationDelay: '300ms'}}>
          <span className="text-nextgen-purple font-medium uppercase tracking-widest">NextGen Academy</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-white mb-6 animate-fade-in" style={{animationDelay: '400ms'}}>
          Train Your Team. Grow Your Practice.
        </h1>
        
        <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '500ms'}}>
          NextGen Academy delivers world-class, AI-powered certification training to your Front Desk, Treatment Coordinators, and Managers — without micromanagement.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{animationDelay: '600ms'}}>
          <Button 
            asChild
            size="lg" 
            className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
          >
            <ScrollLink to="#certification">
              Learn About Certification
            </ScrollLink>
          </Button>
          
          <EmailCollectionDialog
            triggerText="Book a Strategy Call"
            buttonVariant="outline" 
            buttonSize="lg"
            buttonClassName="border-white/10 hover:bg-white/5"
          />
        </div>
      </div>
    </section>
  );
};

export default AcademyHero;
