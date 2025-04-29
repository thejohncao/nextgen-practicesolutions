
import React from 'react';
import { ArrowRight, Sparkles } from "lucide-react";
import PulseBeams from './effects/PulseBeams';
import FloatingAgentAvatars from './hero/FloatingAgentAvatars';
import HeroQuantumGrid from './effects/HeroQuantumGrid';
import LampEffect from './effects/LampEffect';
import SparkleText from './effects/SparkleText';
import RainbowButton from './ui/rainbow-button';
import CircleBackground from './effects/CircleBackground';

const HeroSection = () => {
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

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background effects layering */}
      <CircleBackground count={18} opacity={0.05} colorScheme="mixed" overlay={false}>
        <HeroQuantumGrid />
        <PulseBeams opacity={0.06} />
      </CircleBackground>
      
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
                <RainbowButton 
                  size="lg"
                  onClick={handleChatOpen}
                  className="h-auto group"
                >
                  Talk to Miles
                </RainbowButton>
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
