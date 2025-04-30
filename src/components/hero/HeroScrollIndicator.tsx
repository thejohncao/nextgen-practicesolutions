
import React from 'react';
import { ArrowRight } from "lucide-react";
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';

const HeroScrollIndicator = () => {
  return (
    <div className="absolute bottom-10 left-0 right-0 flex justify-center">
      <ScrollRevealWrapper animation="fade-in" delay={1}>
        <div className="animate-bounce opacity-50">
          <ArrowRight className="h-5 w-5 transform rotate-90" />
        </div>
      </ScrollRevealWrapper>
    </div>
  );
};

export default HeroScrollIndicator;
