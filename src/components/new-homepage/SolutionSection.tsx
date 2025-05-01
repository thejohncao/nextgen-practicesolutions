
import React from 'react';
import { BrainCircuit } from 'lucide-react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import GlowingCard from '@/components/effects/GlowingCard';
import { cn } from '@/lib/utils';

const SolutionSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-black/40 to-black/20">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,135,245,0.15),transparent_50%)] z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <GlowingCard 
          className="p-8 md:p-12 backdrop-blur-xl"
          glowColor="rgba(155, 135, 245, 0.3)"
        >
          <div className="max-w-5xl mx-auto">
            <ScrollRevealWrapper animation="fade-up">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full flex items-center justify-center bg-nextgen-purple/20 backdrop-blur-lg">
                  <BrainCircuit className="h-6 w-6 text-nextgen-purple" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center text-gradient">
                The Shift: Meet the NextGen AI Operating System
              </h2>
            </ScrollRevealWrapper>
            
            <ScrollRevealWrapper animation="fade-up" delay={0.2}>
              <div className="space-y-6 text-white/80 text-lg max-w-3xl mx-auto">
                <p>
                  NextGen is engineered to fundamentally change how your dental practice operates. 
                  Built on proven automation infrastructure (GoHighLevel), we wrapped it in a proprietary 
                  dental workflow framework that delivers true leverage.
                </p>
                
                <p>
                  It's not just software — it's a unified operating system that merges AI-powered training, 
                  intelligent automation, and playbook-ready talent into one powerful solution.
                </p>
                
                <p className="font-medium text-xl text-white/90 text-center">
                  This is how modern dental work gets done.
                </p>
              </div>
            </ScrollRevealWrapper>
            
            <ScrollRevealWrapper animation="fade-up" delay={0.3}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
                  <h3 className="text-lg font-medium text-nextgen-purple mb-2">AI-Powered Training</h3>
                  <p className="text-white/70">Standardized SOPs and certifications</p>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
                  <h3 className="text-lg font-medium text-nextgen-blue mb-2">Intelligent Automation</h3>
                  <p className="text-white/70">AI-driven workflow optimization</p>
                </div>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
                  <h3 className="text-lg font-medium text-nextgen-green mb-2">Pre-Certified Talent</h3>
                  <p className="text-white/70">System-ready professionals</p>
                </div>
              </div>
            </ScrollRevealWrapper>
          </div>
        </GlowingCard>
      </div>
    </section>
  );
};

export default SolutionSection;
