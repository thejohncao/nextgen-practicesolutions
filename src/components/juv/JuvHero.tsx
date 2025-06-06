
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp, Zap } from 'lucide-react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';

const JuvHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-nextgen-dark via-black to-nextgen-dark overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-nextgen-purple/10 via-transparent to-nextgen-blue/10" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <ScrollRevealWrapper animation="fade-up">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-nextgen-purple/20 border border-nextgen-purple/30 rounded-full text-nextgen-purple text-sm font-medium">
              <Zap className="h-4 w-4" />
              💠 JUV x NextGen OS
            </span>
          </div>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.1}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient">
            The AI Operating System Behind the $10M Medspa Scale Plan
          </h1>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.2}>
          <div className="mb-6 p-6 bg-white/5 rounded-lg border border-nextgen-purple/20 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gradient">
              🧠 THE VISION
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-medium">
              JUV is the vision. NextGen is the engine.<br />
              We're building the first AI-powered medspa network — lean, automated, and built to scale to 100+ locations with minimal overhead.
            </p>
          </div>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 py-4">
              <Link to="/demo">
                <TrendingUp className="h-5 w-5 mr-2" />
                Let's Scale Together
              </Link>
            </Button>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default JuvHero;
