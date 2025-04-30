
import React from 'react';
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RainbowButton from '@/components/ui/rainbow-button';
import SparkleText from '@/components/effects/SparkleText';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { createSequence } from '@/lib/animationUtils';

interface HeroContentProps {
  handleChatOpen: () => void;
}

const HeroContent = ({ handleChatOpen }: HeroContentProps) => {
  const sequence = createSequence(0.3, 0.1);
  
  return (
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
  );
};

export default HeroContent;
