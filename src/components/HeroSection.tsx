
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Star, BadgeCheck } from "lucide-react";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Quantum-inspired background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-nextgen-purple/5 blur-3xl rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-nextgen-blue/5 blur-3xl rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 text-center relative">
        <div className="max-w-4xl mx-auto">
          {/* Floating trust badges */}
          <div className="flex justify-center gap-4 mb-8 animate-fade-in">
            <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2">
              <Shield className="h-4 w-4 text-nextgen-purple" />
              <span className="text-sm text-white/70">HIPAA Compliant</span>
            </div>
            <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2">
              <Star className="h-4 w-4 text-nextgen-purple" />
              <span className="text-sm text-white/70">Top Rated</span>
            </div>
            <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-nextgen-purple" />
              <span className="text-sm text-white/70">SOC 2 Certified</span>
            </div>
          </div>

          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm mb-6 animate-fade-in" style={{animationDelay: '200ms'}}>
            <span className="text-gradient-primary font-medium">Industry First</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold leading-tight bg-gradient-to-br from-nextgen-purple via-nextgen-purple/90 to-nextgen-blue bg-clip-text text-transparent mb-6 animate-fade-in" style={{animationDelay: '400ms'}}>
            The World's First AI Team for Dental Practices
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '600ms'}}>
            Transform your dental practice with our AI-powered platform. Automate routine tasks, enhance patient care, and drive unprecedented growth.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{animationDelay: '800ms'}}>
            <Button 
              size="lg"
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 transition-all duration-300 hover:scale-105"
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
