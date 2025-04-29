
import React from 'react';
import { cn } from "@/lib/utils";
import BackgroundEffect from '../roi/BackgroundEffect';
import PricingPackages from './PricingPackages';
import PricingHero from './pricing/PricingHero';
import BoardroomUnlockFlow from './pricing/BoardroomUnlockFlow';
import PricingCTA from './pricing/PricingCTA';

const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-20 overflow-hidden bg-nextgen-dark text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-nextgen-purple/10 blur-[100px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#E87C7C]/10 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>
      
      <PricingHero />
      
      <div className="container mx-auto px-4">
        <PricingPackages />
      </div>
      
      <BoardroomUnlockFlow />
      <PricingCTA />
    </section>
  );
};

export default PricingSection;
