
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import PulseBeams from './effects/PulseBeams';
import FloatingAgentAvatars from './hero/FloatingAgentAvatars';
import HeroQuantumGrid from './effects/HeroQuantumGrid';
import LampEffect from './effects/LampEffect';
import SparkleText from './effects/SparkleText';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background effects layering */}
      <HeroQuantumGrid />
      <PulseBeams opacity={0.06} />
      
      {/* Enhanced gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[45%] bg-nextgen-purple/15 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-nextgen-blue/15 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-[30%] left-[20%] w-[25%] h-[25%] bg-[#E87C7C]/10 blur-[80px] rounded-full animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Enhanced Copy Block */}
          <LampEffect>
            <div className="text-left space-y-8">
              <div className="inline-block px-3 py-1 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] text-sm mb-6 animate-fade-in">
                <SparkleText delay={300}>
                  <span className="text-gradient-primary font-medium flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    The Future of Dental Practice Management
                  </span>
                </SparkleText>
              </div>
              
              <SparkleText>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight text-gradient animate-hero-fade">
                  The World's First AI Team for Dental Practices
                </h1>
              </SparkleText>
              
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl animate-hero-fade animate-cinematic-delay-1">
                Deploy your Dream Team. Operate smarter. Grow faster. Lead effortlessly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-hero-fade-up animate-cinematic-delay-2">
                <Button 
                  asChild
                  size="lg"
                  className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 py-6 h-auto text-lg rounded-lg shadow-lg hover:shadow-nextgen-purple/25 hover:scale-[1.02] transition-all duration-300 group"
                >
                  <Link to="/solutions" className="flex items-center">
                    Meet Your Dream Team
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </LampEffect>

          {/* Right Side: Enhanced Floating Avatars */}
          <div className="relative h-[500px]">
            <FloatingAgentAvatars staggered={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
