
import React from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import RainbowButton from '@/components/ui/rainbow-button';
import { Button } from '@/components/ui/button';
import FloatingAgentAvatars from '@/components/hero/FloatingAgentAvatars';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  const handleOpenChat = () => {
    try {
      const chatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
      if (chatButton) {
        chatButton.click();
      } else {
        setTimeout(() => {
          const delayedChatButton = document.querySelector('[data-testid="chat-toggle"]') as HTMLButtonElement;
          if (delayedChatButton) {
            delayedChatButton.click();
          } else {
            const event = new CustomEvent('open-miles-chat');
            document.dispatchEvent(event);
          }
        }, 200);
      }
    } catch (error) {
      console.error('Error opening chat:', error);
    }
  };

  return (
    <section className="min-h-[90vh] flex items-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-nextgen-purple/10 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-nextgen-blue/10 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div>
            <ScrollRevealWrapper animation="fade-up" delay={0.1}>
              <div className="inline-block px-3 py-1 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)] text-sm mb-6">
                <span className="text-gradient-primary font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  The Future of Dental Practice Management
                </span>
              </div>
            </ScrollRevealWrapper>
            
            <ScrollRevealWrapper animation="fade-up" delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6 text-gradient">
                Less Burnout. More Growth.
              </h1>
            </ScrollRevealWrapper>
            
            <ScrollRevealWrapper animation="fade-up" delay={0.3}>
              <h2 className="text-xl md:text-2xl text-white/80 font-medium mb-4">
                The AI Operating System for Modern Dental Practices
              </h2>
              
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                NextGen integrates AI-powered training, automation, and certified talent to streamline operations, empower your team, and unlock predictable growth — all while preserving your unique practice identity.
              </p>
            </ScrollRevealWrapper>
            
            <ScrollRevealWrapper animation="fade-up" delay={0.4} className="flex flex-wrap gap-4">
              <RainbowButton 
                size="lg"
                className="h-auto"
                asChild
              >
                <Link to="/join" className="flex items-center">
                  Request a Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </RainbowButton>
              
              <Button
                variant="outline"
                size="lg" 
                className="border border-white/10 bg-white/5 text-white hover:bg-white/10"
                asChild
              >
                <Link to="/watch" className="flex items-center">
                  <Play className="mr-2 h-4 w-4" />
                  See How It Works
                </Link>
              </Button>
            </ScrollRevealWrapper>
          </div>
          
          {/* Right column - Visual element */}
          <div className="relative h-[400px] md:h-[500px]">
            <FloatingAgentAvatars />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
