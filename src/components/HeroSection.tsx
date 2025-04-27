
import React from 'react';
import { Shield, Star, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import QuantumGrid from './effects/QuantumGrid';
import SplashCursor from './ui/splash-cursor';

const HeroSection = () => {
  const handleChatOpen = () => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) {
        console.log('Chat button found, clicking...');
        chatButton.click();
      } else {
        console.log('Chat button not found, trying with a delay...');
        setTimeout(() => {
          const delayedChatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
          if (delayedChatButton) {
            console.log('Chat button found after delay, clicking...');
            delayedChatButton.click();
          } else {
            console.warn('Chat button not found in DOM after delay');
          }
        }, 200);
      }
    } catch (error) {
      console.error('Error opening chat:', error);
    }
  };

  return (
    <section className="relative flex items-center justify-center pt-24 pb-20">
      {/* Quantum Grid Background */}
      <QuantumGrid />
      
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
      
      {/* Background effects */}
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

      {/* Enhanced quantum-inspired background effects */}
      <div className="absolute inset-0 -z-10">
        {/* Animated gradient orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-nextgen-purple/10 blur-[100px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-nextgen-blue/10 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
        
        {/* Enhanced quantum grid pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>
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
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold leading-tight bg-gradient-to-br from-nextgen-purple via-nextgen-purple/90 to-nextgen-blue bg-clip-text text-transparent mb-6 animate-fade-in" style={{animationDelay: '400ms'}}>
          The AI-Powered Operating System for Modern Dental Practices
        </h1>
        
        <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto animate-fade-in backdrop-blur-sm rounded-xl p-4" style={{animationDelay: '500ms'}}>
          Automate growth, management, and development with your NextGen AI team.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{animationDelay: '600ms'}}>
          <Button 
            onClick={handleChatOpen}
            className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-6 py-2 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(155,135,245,0.5)]"
            size="lg"
          >
            Talk to Miles
          </Button>
          
          <Button 
            asChild
            variant="outline" 
            className="border border-white/20 bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-full transition-all duration-300"
            size="lg"
          >
            <Link to="/watch">
              See How It Works
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
