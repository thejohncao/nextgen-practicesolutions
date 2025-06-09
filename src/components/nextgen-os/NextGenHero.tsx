
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, DollarSign, Play } from 'lucide-react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';

const NextGenHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-nextgen-dark via-nextgen-dark/95 to-black overflow-hidden">
      {/* Dark Glass Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-nextgen-purple/10 via-transparent to-nextgen-blue/10" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-nextgen-purple/30 rounded-full animate-float-slow" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-nextgen-blue/40 rounded-full animate-float-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-nextgen-purple/30 rounded-full animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container-liquid text-center relative z-10">
        <ScrollRevealWrapper animation="fade-up">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white text-caption-lg font-medium rounded-full backdrop-blur-sm">
              NextGen OS Platform
            </span>
          </div>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.1}>
          <h1 className="text-display-lg font-bold bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent mb-8 max-w-4xl mx-auto">
            The Operating System for Modern Practices
          </h1>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.15}>
          <p className="text-body-lg text-white/70 font-medium mb-12 max-w-5xl mx-auto">
            NextGen OS is a modular platform that lets practices launch fully branded membership programs, AI assistants, and modern workflows — with zero code and full control.
          </p>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white font-semibold rounded-lg px-6 py-3 transition-all duration-300 hover:scale-105 group">
              <Link to="/demo">
                <Calendar className="h-5 w-5 mr-2" />
                Book Demo
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Button>
            
            <Button asChild className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium rounded-lg px-6 py-3 transition-all duration-300 hover:scale-105">
              <Link to="/pricing">
                <DollarSign className="h-5 w-5 mr-2" />
                View Pricing
              </Link>
            </Button>
            
            <Button asChild className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium rounded-lg px-6 py-3 transition-all duration-300 hover:scale-105">
              <Link to="#how-it-works">
                <Play className="h-5 w-5 mr-2" />
                See How It Works
              </Link>
            </Button>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default NextGenHero;
