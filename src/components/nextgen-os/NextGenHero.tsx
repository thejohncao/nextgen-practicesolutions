
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp, Download, Users } from 'lucide-react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';

const NextGenHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-crystal-white via-mist-blue/30 to-crystal-white overflow-hidden">
      {/* Liquid Glass Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-glow-indigo/5 via-transparent to-devon-primary/5" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-glow-indigo/30 rounded-full animate-float-slow" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-giselle-primary/40 rounded-full animate-float-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-devon-primary/30 rounded-full animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container-liquid text-center relative z-10">
        <ScrollRevealWrapper animation="fade-up">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-6 py-3 liquid-glass-subtle text-liquid-slate text-caption-lg font-medium rounded-full">
              NextGen OS Platform
            </span>
          </div>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.1}>
          <h1 className="text-display-lg text-liquid-gradient mb-8 max-w-4xl mx-auto">
            The Operating System for Modern Practices
          </h1>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.15}>
          <p className="text-body-lg text-liquid-slate/70 font-medium mb-12 max-w-4xl mx-auto">
            Launch your own credit-based membership model. Powered by AI agents. Branded as you.
          </p>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-liquid-primary group">
              <Link to="/demo">
                <TrendingUp className="h-5 w-5 mr-2" />
                Book Demo
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Button>
            
            <Button asChild className="btn-liquid-secondary">
              <Link to="/downloads">
                <Download className="h-5 w-5 mr-2" />
                Download One-Pager
              </Link>
            </Button>
            
            <Button asChild className="btn-liquid-secondary">
              <Link to="/ai-team">
                <Users className="h-5 w-5 mr-2" />
                Meet Your AI Team
              </Link>
            </Button>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default NextGenHero;
