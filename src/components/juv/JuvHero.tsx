
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
              💠 JUV Master Copy Block
            </span>
          </div>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.1}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient">
            Powering JUV Medspa with NextGen OS
          </h1>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.2}>
          <p className="text-xl md:text-2xl text-white/80 mb-4 font-medium">
            The AI Operating System Behind the $100M Scale Plan
          </p>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.3}>
          <p className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto mb-8">
            We built the system. Now we scale the vision.<br />
            JUV Medspa runs on the NextGen OS — a plug-and-play AI platform built for healthcare businesses that want to grow without the overhead.
          </p>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 py-4">
              <Link to="/solutions">
                <TrendingUp className="h-5 w-5 mr-2" />
                Explore the Operating System
              </Link>
            </Button>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default JuvHero;
