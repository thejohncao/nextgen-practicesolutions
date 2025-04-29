
import React from 'react';

// Import the smaller, refactored components
import BackgroundEffect from './roi/BackgroundEffect';
import ROISectionHeader from './roi/ROISectionHeader';
import BenefitCardsGrid from './roi/BenefitCardsGrid';
import ComparisonChart from './roi/ComparisonChart';
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

const ROISection = () => {
  return (
    <section id="roi" className="section-padding py-24 relative overflow-hidden scroll-transition">
      <BackgroundEffect />
      
      <div className="container mx-auto px-4 relative z-10">
        <ROISectionHeader />
        
        {/* Updated 3-column card grid */}
        <BenefitCardsGrid />
        
        {/* New interactive comparison chart */}
        <ComparisonChart data={comparisonData} />
        
        <ROIFootnote />
      </div>
    </section>
  );
};

export default ROISection;
