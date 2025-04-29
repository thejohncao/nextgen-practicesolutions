
import React from 'react';
import { cn } from "@/lib/utils";
import PricingHero from './PricingHero';
import PricingPackagesEnhanced from './PricingPackagesEnhanced';
import BoardroomUnlockFlow from './BoardroomUnlockFlow';
import PricingCTA from './PricingCTA';

const PricingSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-nextgen-purple/10 blur-[100px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#E87C7C]/10 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>
      
      <PricingHero />
      <PricingPackagesEnhanced />
      <BoardroomUnlockFlow />
      <PricingCTA />
    </section>
  );
};

export default PricingSection;
