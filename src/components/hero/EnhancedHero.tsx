
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RainbowButton from '@/components/ui/rainbow-button';
import SparkleText from '@/components/effects/SparkleText';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { agents } from '@/data/agents';
import { createSequence } from '@/lib/animationUtils';
import AgentGrid from './AgentGrid';
import { motion, AnimatePresence } from 'framer-motion';

const EnhancedHero = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const sequence = createSequence(0.3, 0.1);
  
  // Mouse parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Reference to the hero section for scroll tracking
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Handle agent selection
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
  
  // Get information about the selected agent for the spotlight effect
  const spotlightAgent = selectedAgent 
    ? agents.find(a => a.name === selectedAgent) 
    : null;
    
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
    <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden" ref={heroRef}>
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-nextgen-purple/10 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-nextgen-blue/10 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      </div>
      
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
                Run your front desk, nurture leads, close treatments, and train your staff — all powered by AI.
              </p>
            </ScrollRevealWrapper>
            
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
                <Link to="#boardroom-section">
                  <span className="flex items-center">
                    See How It Works
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
            </ScrollRevealWrapper>
          </div>
          
          {/* Right side - Agent Grid with enhanced animations */}
          <div className="relative h-[400px] md:h-[500px] z-30">
            <AgentGrid
              onAgentSelect={handleAgentSelect}
              selectedAgent={selectedAgent}
            />
            
            {/* Enhanced Agent spotlight content with framer-motion animations */}
            <AnimatePresence mode="wait">
              {spotlightAgent && (
                <motion.div
                  key={spotlightAgent.name}
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30, 
                    duration: 0.4 
                  }}
                  className={`mt-6 overflow-hidden`}
                >
                  <div className={`
                    glass-morphism rounded-lg p-5 border overflow-hidden relative
                    ${spotlightAgent.color === 'blue' ? 'border-blue-500/30' : ''}
                    ${spotlightAgent.color === 'green' ? 'border-green-500/30' : ''}
                    ${spotlightAgent.color === 'purple' ? 'border-purple-500/30' : ''}
                    ${spotlightAgent.color === 'gold' ? 'border-amber-500/30' : ''}
                  `}>
                    {/* Background glow effect */}
                    <div className={`
                      absolute -inset-1 blur-xl opacity-30
                      ${spotlightAgent.color === 'blue' ? 'bg-blue-500/20' : ''}
                      ${spotlightAgent.color === 'green' ? 'bg-green-500/20' : ''}
                      ${spotlightAgent.color === 'purple' ? 'bg-purple-500/20' : ''}
                      ${spotlightAgent.color === 'gold' ? 'bg-amber-500/20' : ''}
                      z-0
                    `}></div>
                    
                    <div className="relative z-10">
                      <motion.div 
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className={`
                          font-bold text-xl mb-1 flex items-center
                          ${spotlightAgent.color === 'blue' ? 'text-blue-300' : ''}
                          ${spotlightAgent.color === 'green' ? 'text-green-300' : ''}
                          ${spotlightAgent.color === 'purple' ? 'text-purple-300' : ''}
                          ${spotlightAgent.color === 'gold' ? 'text-amber-300' : ''}
                        `}>
                          {spotlightAgent.name} – {spotlightAgent.title}
                        </h3>
                      </motion.div>
                      
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <p className="text-white/90 text-sm leading-relaxed">{spotlightAgent.tagline}</p>
                      </motion.div>
                      
                      {/* Feature highlight */}
                      {spotlightAgent.features && spotlightAgent.features.length > 0 && (
                        <motion.div
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="mt-3"
                        >
                          <div className={`
                            text-xs font-medium inline-block px-2 py-1 rounded-full
                            ${spotlightAgent.color === 'blue' ? 'bg-blue-500/10 text-blue-200' : ''}
                            ${spotlightAgent.color === 'green' ? 'bg-green-500/10 text-green-200' : ''}
                            ${spotlightAgent.color === 'purple' ? 'bg-purple-500/10 text-purple-200' : ''}
                            ${spotlightAgent.color === 'gold' ? 'bg-amber-500/10 text-amber-200' : ''}
                          `}>
                            Featured Capability
                          </div>
                          <p className="text-xs text-white/70 mt-2">
                            {spotlightAgent.features[0].split(' - ')[0]}
                          </p>
                        </motion.div>
                      )}
                      
                      {/* Learn more link */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-3 text-right"
                      >
                        <Link 
                          to="#boardroom-section" 
                          className={`
                            text-xs font-medium flex items-center justify-end gap-1 hover:gap-2 transition-all duration-300
                            ${spotlightAgent.color === 'blue' ? 'text-blue-300' : ''}
                            ${spotlightAgent.color === 'green' ? 'text-green-300' : ''}
                            ${spotlightAgent.color === 'purple' ? 'text-purple-300' : ''}
                            ${spotlightAgent.color === 'gold' ? 'text-amber-300' : ''}
                          `}
                        >
                          Learn more 
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <ScrollRevealWrapper animation="fade-in" delay={1}>
          <div className="animate-bounce opacity-50">
            <ArrowRight className="h-5 w-5 transform rotate-90" />
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default EnhancedHero;
