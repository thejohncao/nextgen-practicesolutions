import React from 'react';
import { Shield, Star, BadgeCheck } from "lucide-react";
import EmailCollectionForm from './EmailCollectionForm';
import AuroraBackground from './effects/AuroraBackground';
import SplashCursor from './ui/splash-cursor';

const HeroSection = () => {
  return (
    <AuroraBackground className="relative flex items-center justify-center pt-24 pb-20">
      {/* Splash Cursor Effect */}
      <SplashCursor 
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        DENSITY_DISSIPATION={2.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        PRESSURE_ITERATIONS={20}
        CURL={3}
        TRANSPARENT={true}
        BACK_COLOR={{ r: 0.2, g: 0, b: 0.5 }}
        COLOR_UPDATE_SPEED={10}
      />
      
      {/* Background video */}
      <div className="absolute inset-0 -z-20">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-10"
        >
          <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container mx-auto px-4 py-20 text-center relative">
        {/* Enhanced floating trust badges with glass effect */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-all duration-300 animate-fade-in">
            <Shield className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm text-white/70">HIPAA Compliant</span>
          </div>
          <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-all duration-300 animate-fade-in" style={{animationDelay: '100ms'}}>
            <Star className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm text-white/70">Top Rated</span>
          </div>
          <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] hover:bg-white/10 transition-all duration-300 animate-fade-in" style={{animationDelay: '200ms'}}>
            <BadgeCheck className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm text-white/70">SOC 2 Certified</span>
          </div>
        </div>

        <div className="inline-block px-3 py-1 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] text-sm mb-6 animate-fade-in hover:bg-white/10 transition-all duration-300" style={{animationDelay: '300ms'}}>
          <span className="text-gradient-primary font-medium">Industry First</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold leading-tight bg-gradient-to-br from-nextgen-purple via-nextgen-purple/90 to-nextgen-blue bg-clip-text text-transparent mb-6 animate-fade-in" style={{animationDelay: '400ms'}}>
          The World's First AI Team for Dental Practices
        </h1>
        
        <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto animate-fade-in backdrop-blur-sm rounded-xl p-4" style={{animationDelay: '500ms'}}>
          Transform your dental practice with our AI-powered platform. Automate routine tasks, enhance patient care, and drive unprecedented growth.
        </p>
        
        <div className="max-w-md mx-auto animate-fade-in" style={{animationDelay: '600ms'}}>
          <EmailCollectionForm 
            buttonText="Get Started" 
            placeholder="Enter your work email"
          />
        </div>
      </div>
    </AuroraBackground>
  );
};

export default HeroSection;
