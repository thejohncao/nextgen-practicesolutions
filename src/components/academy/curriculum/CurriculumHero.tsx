
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import EmailCollectionDialog from '../../EmailCollectionDialog';
import ScrollRevealWrapper from '../../animation/ScrollRevealWrapper';
import QuantumGrid from '../../effects/QuantumGrid';

const CurriculumHero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-24">
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
        <ScrollRevealWrapper animation="fade-up" delay={0.1}>
          <div className="inline-block px-3 py-1 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] text-sm mb-6">
            <span className="text-nextgen-purple font-medium uppercase tracking-widest">NextGen Certification</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-white mb-6">
            Your Certification Journey Starts Here
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Master the systems that power modern practices — from AI operations to case acceptance. Learn at your own pace. Graduate with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
            >
              Start Certification
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/10 hover:bg-white/5 group"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Sample Module
            </Button>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default CurriculumHero;
