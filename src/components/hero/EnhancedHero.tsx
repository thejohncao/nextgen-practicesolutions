
import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RainbowButton from '@/components/ui/rainbow-button';
import SparkleText from '@/components/effects/SparkleText';
import ParallaxSection, { ParallaxLayer } from '@/components/effects/ParallaxSection';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { agents } from '@/data/agents';
import { createSequence } from '@/lib/animationUtils';

const EnhancedHero = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const sequence = createSequence(0.3, 0.1);
  
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
  
  // Get information about the selected agent for the spotlight effect
  const spotlightAgent = selectedAgent 
    ? agents.find(a => a.name === selectedAgent) 
    : null;
    
  // Mouse parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the center of the window
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <ParallaxSection className="min-h-[90vh] flex items-center justify-center">
      {/* Background layers - parallax effect */}
      <ParallaxLayer className="absolute inset-0 z-0" speed={-0.1}>
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-nextgen-purple/10 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-nextgen-blue/10 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      </ParallaxLayer>
      
      {/* Responsive grid */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side content */}
          <div className="relative">
            <ScrollRevealWrapper animation="fade-up" delay={sequence.next()}>
              <div className="inline-block px-3 py-1 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] text-sm mb-6">
                <SparkleText delay={300}>
                  <span className="text-gradient-primary font-medium flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    The Future of Dental Practice Management
                  </span>
                </SparkleText>
              </div>
            </ScrollRevealWrapper>
            
            <ScrollRevealWrapper animation="fade-up" delay={sequence.next()}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6">
                <span className="text-gradient">The World's First</span><br />
                <span className="text-gradient">AI Team for</span><br />
                <span className="text-gradient">Dental Practices</span>
              </h1>
            </ScrollRevealWrapper>
            
            <ScrollRevealWrapper animation="fade-up" delay={sequence.next()}>
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl mb-8">
                Deploy your Dream Team. Operate smarter. Grow faster. Lead effortlessly.
              </p>
            </ScrollRevealWrapper>
            
            {/* Agent spotlight content */}
            {spotlightAgent && (
              <ScrollRevealWrapper animation="fade-in" delay={0.1}>
                <div className="bg-black/30 backdrop-blur-md rounded-lg p-4 border border-white/10 mb-8">
                  <h3 className="font-bold text-lg mb-1">{spotlightAgent.name} – {spotlightAgent.title}</h3>
                  <p className="text-white/80 text-sm">{spotlightAgent.tagline}</p>
                </div>
              </ScrollRevealWrapper>
            )}
            
            <ScrollRevealWrapper animation="fade-up" delay={sequence.next()} className="flex flex-col sm:flex-row gap-4">
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
            </ScrollRevealWrapper>
          </div>
          
          {/* Right side - Agent display area with subtle mouse parallax */}
          <div className="relative h-[500px] z-30">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Floating orb elements that respond to mouse position */}
              <div 
                className="absolute w-[250px] h-[250px] bg-nextgen-blue/20 rounded-full blur-[40px]"
                style={{
                  transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
                  transition: 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)'
                }}
              ></div>
              <div 
                className="absolute w-[200px] h-[200px] bg-nextgen-purple/25 rounded-full blur-[30px]" 
                style={{
                  transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
                  transition: 'transform 0.4s cubic-bezier(0.33, 1, 0.68, 1)'
                }}
              ></div>
              <div 
                className="absolute w-[150px] h-[150px] bg-white/5 rounded-full blur-[20px]"
                style={{
                  transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
                  transition: 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)'
                }}
              ></div>
              
              {/* Subtle dots grid with perspective */}
              <div className="absolute inset-0">
                <div className="grid grid-cols-6 gap-4 h-full w-full opacity-30">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div 
                      key={i}
                      className="w-1 h-1 rounded-full bg-white/30"
                      style={{
                        transform: `translate(${mousePosition.x * ((i % 6) - 3) * 2}px, ${mousePosition.y * (Math.floor(i / 6) - 3) * 2}px)`,
                        transition: 'transform 0.3s ease-out'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              
              {/* Agent avatars would be inserted here */}
              <div className="relative z-10">
                {/* We'd integrate with FloatingAgentAvatars here */}
                <div className="text-center text-white/60">
                  <p>AI Agents Display</p>
                  {/* This is a placeholder - the actual avatars component would be used here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <ScrollRevealWrapper animation="fade-in" delay={1.5}>
          <div className="animate-bounce opacity-50">
            <ArrowRight className="h-5 w-5 transform rotate-90" />
          </div>
        </ScrollRevealWrapper>
      </div>
    </ParallaxSection>
  );
};

export default EnhancedHero;
