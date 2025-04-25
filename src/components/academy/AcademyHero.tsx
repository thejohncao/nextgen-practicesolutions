
import React from 'react';
import { Button } from "@/components/ui/button";
import EmailCollectionForm from '../EmailCollectionForm';
import QuantumGrid from '../effects/QuantumGrid';

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
          <span className="text-gradient-primary font-medium">Next-Gen Academy</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold leading-tight bg-gradient-to-br from-nextgen-purple via-nextgen-purple/90 to-nextgen-blue bg-clip-text text-transparent mb-6 animate-fade-in" style={{animationDelay: '400ms'}}>
          Train Your Dental Team Like a Fortune 500 Company
        </h1>
        
        <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto animate-fade-in backdrop-blur-sm rounded-xl p-4" style={{animationDelay: '500ms'}}>
          Next-Gen Academy empowers modern practices with world-class, AI-powered training for Treatment Coordinators, Front Desk, and Practice Growth Teams.
        </p>
        
        <div className="flex justify-center animate-fade-in" style={{animationDelay: '600ms'}}>
          <Button 
            size="lg" 
            className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Academy Access
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AcademyHero;
