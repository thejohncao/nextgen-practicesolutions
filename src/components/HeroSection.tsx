
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from "lucide-react";
import PulseBeams from './effects/PulseBeams';
import OrbitingAgents from './hero/OrbitingAgents';
import HeroQuantumGrid from './effects/HeroQuantumGrid';
import SparkleText from './effects/SparkleText';
import RainbowButton from './ui/rainbow-button';
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { agents } from '@/data/agents';
import BackgroundCircles from './effects/BackgroundCircles';
import AnimatedGrainOverlay from './effects/AnimatedGrainOverlay';
import AnimatedHeading from './ui/animated-heading';
import FadeInSection from './ui/fade-in-section';
import BoardroomDemo from './boardroom/BoardroomDemo';
import { useInView } from 'react-intersection-observer';

const HeroSection = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showBoardroomDemo, setShowBoardroomDemo] = useState(false);
  
  // Create refs for scroll tracking and animation
  const heroContentRef = useRef<HTMLDivElement>(null);
  
  // Use Intersection Observer to trigger the boardroom demo when scrolled to
  const { ref: boardroomTriggerRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
    rootMargin: '-100px 0px'
  });
  
  // Track mouse position for subtle orb movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse position (-0.5 to 0.5)
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Show the boardroom demo when scrolled into view
  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        setShowBoardroomDemo(true);
      }, 300);
    } else {
      setShowBoardroomDemo(false);
    }
  }, [inView]);
  
  const handleAgentSelect = (agentName: string) => {
    setSelectedAgent(prevSelected => prevSelected === agentName ? null : agentName);
  };
  
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
  
  const handleTeamButtonClick = () => {
    // Find the team section in the document and scroll to it
    const teamSection = document.getElementById('team');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Get information about the selected agent for the spotlight effect
  const spotlightAgent = selectedAgent 
    ? agents.find(a => a.name === selectedAgent) 
    : null;

  return (
    <section className="relative min-h-[100vh] flex flex-col overflow-hidden">
      {/* Above the fold hero section */}
      <div className="min-h-[90vh] flex items-center justify-center">
        {/* Background effects layering */}
        <HeroQuantumGrid />
        <PulseBeams opacity={0.06} />
        <BackgroundCircles variant="default" primaryColor="rgba(155, 135, 245, 0.12)" secondaryColor="rgba(30, 174, 219, 0.08)" />
        <AnimatedGrainOverlay opacity={0.05} />
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side: Content Block */}
            <div 
              ref={heroContentRef} 
              className="text-left space-y-8"
            >
              <FadeInSection delay={0.1} direction="up">
                <div className="inline-block px-3 py-1 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] text-sm mb-6">
                  <SparkleText delay={300}>
                    <span className="text-gradient-primary font-medium flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      The Future of Dental Practice Management
                    </span>
                  </SparkleText>
                </div>
              </FadeInSection>
              
              <AnimatedHeading 
                text="The World's First AI Team for Dental Practices"
                as="h1"
                className="text-4xl md:text-6xl lg:text-7xl leading-tight"
                type="word"
                staggerChildren={0.03}
                delay={0.3}
              />
              
              <FadeInSection delay={0.7} direction="up">
                <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl">
                  Scale without the stress. Our agents run your front desk, nurture leads, close treatment, and train your staff — while you sleep.
                </p>
              </FadeInSection>
              
              {/* Agent spotlight content shows when an agent is selected */}
              {spotlightAgent && (
                <FadeInSection delay={0.1} direction="up">
                  <div className="bg-black/30 backdrop-blur-md rounded-lg p-4 border border-white/10">
                    <h3 className="font-bold text-lg mb-1">{spotlightAgent.name} – {spotlightAgent.title}</h3>
                    <p className="text-white/80 text-sm">{spotlightAgent.tagline}</p>
                  </div>
                </FadeInSection>
              )}
              
              {/* CTA Buttons with improved animations */}
              <FadeInSection delay={0.9} direction="up">
                <div className="flex flex-col sm:flex-row gap-4">
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
              </FadeInSection>
              
              {/* Scroll indicator with better fade animation */}
              <FadeInSection delay={1.2} direction="up" className="flex justify-center mt-10 opacity-70">
                <div className="animate-bounce">
                  <ArrowRight className="h-5 w-5 transform rotate-90" />
                </div>
              </FadeInSection>
            </div>

            {/* Right Side: Orbiting Agents */}
            <div className="relative h-[500px] bg-transparent z-30">
              <OrbitingAgents 
                onAgentSelect={handleAgentSelect}
                mousePosition={mousePosition}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll-triggered boardroom demo section */}
      <div 
        ref={boardroomTriggerRef}
        className="min-h-[100vh] pt-24 pb-16 flex items-center justify-center"
      >
        <div className="container mx-auto px-4">
          <FadeInSection delay={0.1} direction="up" className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-2 text-gradient-primary">
              Built to Run the Full Patient Journey
            </h2>
            <p className="text-base sm:text-lg text-white/70">
              One decision. Four agents. Everything in motion — powered by AI.
            </p>
          </FadeInSection>
          
          <BoardroomDemo 
            activated={showBoardroomDemo}
            onTeamButtonClick={handleTeamButtonClick}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
