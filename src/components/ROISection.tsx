
import React from 'react';
import { Clock, Zap, Heart } from "lucide-react";

// Import the smaller, refactored components
import BackgroundEffect from './roi/BackgroundEffect';
import ROISectionHeader from './roi/ROISectionHeader';
import BenefitCard from './roi/BenefitCard';
import ComparisonTable from './roi/ComparisonTable';
import MobileComparisonCarousel from './roi/MobileComparisonCarousel';
import ROIFootnote from './roi/ROIFootnote';

const comparisonData = [
  {
    metric: "Admin Staff Needed",
    traditional: "3–5 FTE",
    nextgen: "0–2 with AI",
    improvement: "-60%"
  },
  {
    metric: "Treatment Acceptance Rate",
    traditional: "~40%",
    nextgen: "70–80%+",
    improvement: "+100%"
  },
  {
    metric: "No-Show Rate",
    traditional: "25–30%",
    nextgen: "<10%",
    improvement: "-60%"
  },
  {
    metric: "Annual Revenue Growth",
    traditional: "3–5%",
    nextgen: "15–30%+",
    improvement: "+500%"
  }
];

const benefitCards = [
  {
    icon: Clock,
    title: "Save Your Time",
    description: "Eliminate busywork. Automate operations. Buy back the hours you can never replace."
  },
  {
    icon: Zap,
    title: "Recharge Your Energy",
    description: "Remove chaos from your day. Empower your team. Grow with momentum, not stress."
  },
  {
    icon: Heart,
    title: "Win Back Your Life",
    description: "Spend time with family. Lead with vision, not exhaustion. Build a life outside the office."
  }
];

const ROISection = () => {
  return (
    <section id="roi" className="section-padding py-24 relative overflow-hidden scroll-transition bg-nextgen-dark">
      <BackgroundEffect />
      
      <div className="container mx-auto px-4 relative z-10">
        <ROISectionHeader />
        
        {/* Emotional Benefit Cards - Updated to 2-column grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {benefitCards.map((card, index) => (
            <BenefitCard 
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
              index={index}
            />
          ))}
        </div>
        
        {/* ROI Metrics - Desktop View */}
        <div className="hidden md:block">
          <ComparisonTable comparisonData={comparisonData} />
        </div>
        
        {/* ROI Metrics - Mobile View */}
        <MobileComparisonCarousel comparisonData={comparisonData} />
        
        <ROIFootnote />
      </div>
    </section>
  );
};

export default ROISection;
