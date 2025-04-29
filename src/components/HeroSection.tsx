
import React, { useState } from 'react';
import { ArrowRight, Sparkles } from "lucide-react";
import PulseBeams from './effects/PulseBeams';
import FloatingAgentAvatars from './hero/FloatingAgentAvatars';
import HeroQuantumGrid from './effects/HeroQuantumGrid';
import LampEffect from './effects/LampEffect';
import SparkleText from './effects/SparkleText';
import RainbowButton from './ui/rainbow-button';
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { agents } from '@/data/agents';

const HeroSection = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  
  const handleChatOpen = () => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) {
        console.log('Chat button found in hero, clicking immediately...');
        chatButton.click();
      } else {
        console.log('Chat button not found, trying with a delay...');
        setTimeout(() => {
          const delayedChatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
          if (delayedChatButton) {
            console.log('Chat button found in hero after delay, clicking...');
            delayedChatButton.click();
          } else {
            console.warn('Chat button still not found in DOM after hero click');
          }
        }, 200);
      }
    } catch (error) {
      console.error('Error opening chat from hero:', error);
    }
  };
  
  const handleAgentSelect = (agentName: string) => {
    setSelectedAgent(prevSelected => prevSelected === agentName ? null : agentName);
  };
  
  // Get information about the selected agent for the spotlight effect
  const spotlightAgent = selectedAgent 
    ? agents.find(a => a.name === selectedAgent) 
    : null;

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
              <div className="inline-block px-3 py-1 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] text-sm mb-6 animate-hero-fade">
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
              
              {/* Agent spotlight content shows when an agent is selected */}
              {spotlightAgent && (
                <div className="bg-black/30 backdrop-blur-md rounded-lg p-4 border border-white/10 animate-hero-fade-up animate-cinematic-delay-1">
                  <h3 className="font-bold text-lg mb-1">{spotlightAgent.name} – {spotlightAgent.title}</h3>
                  <p className="text-white/80 text-sm">{spotlightAgent.tagline}</p>
                </div>
              )}
              
              {/* CTA Buttons with improved animations */}
              <div className="flex flex-col sm:flex-row gap-4 animate-hero-fade-up animate-cinematic-delay-2">
                <RainbowButton 
                  size="lg"
                  onClick={handleChatOpen}
                  className="h-auto group"
                >
                  <span className="flex items-center">
                    Talk to Miles
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </RainbowButton>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all duration-300"
                  asChild
                >
                  <Link to="/solutions">
                    <span className="flex items-center">
                      See How It Works
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Button>
              </div>
              
              {/* Scroll indicator (optional) */}
              <div className="flex justify-center mt-10 animate-hero-fade-up animate-cinematic-delay-3 opacity-70">
                <div className="animate-bounce">
                  <ArrowRight className="h-5 w-5 transform rotate-90" />
                </div>
              </div>
            </div>
          </LampEffect>

          {/* Right Side: Enhanced Floating Avatars with higher z-index */}
          <div className="relative h-[500px] bg-transparent z-30">
            <FloatingAgentAvatars 
              staggered={true}
              onAgentSelect={handleAgentSelect}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
