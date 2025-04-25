
import React from 'react';
import { TrendingUp, Check } from "lucide-react";

const comparisonData = [
  {
    metric: "Treatment Acceptance Rate",
    traditional: "40%",
    nextgen: "80%+",
    improvement: "+100%"
  },
  {
    metric: "No-Show Rate",
    traditional: "25%",
    nextgen: "<10%",
    improvement: "-60%"
  },
  {
    metric: "New Patient Acquisition",
    traditional: "15/month",
    nextgen: "30+/month",
    improvement: "+100%"
  },
  {
    metric: "Staff Hours on Admin Tasks",
    traditional: "60+ hrs/week",
    nextgen: "15 hrs/week",
    improvement: "-75%"
  },
  {
    metric: "Patient Communication",
    traditional: "Manual Follow-up",
    nextgen: "Automated",
    improvement: "24/7"
  },
  {
    metric: "Monthly Operating Cost",
    traditional: "$15,000+",
    nextgen: "From $999",
    improvement: "-93%"
  }
];

const ROISection = () => {
  return (
    <section id="roi" className="section-padding py-20">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <TrendingUp className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">ROI Snapshot</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            The NextGen Advantage
          </h2>
          
          <p className="text-lg text-white/70">
            See how practices using NextGen AI compare to traditional dental practices
            across key performance metrics.
          </p>
        </div>
        
        <div className="glass-card p-6 md:p-8 rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 gap-4 mb-6 text-sm md:text-base">
            <div className="col-span-1 font-medium text-white/80">Metric</div>
            <div className="text-center font-medium text-white/80">Traditional Practice</div>
            <div className="text-center font-medium text-white/80">With NextGen AI</div>
          </div>
          
          <div className="space-y-4">
            {comparisonData.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 py-4 border-t border-white/10">
                <div className="col-span-1 flex items-center text-white">
                  <Check className="h-4 w-4 text-nextgen-purple mr-2 flex-shrink-0" />
                  <span>{item.metric}</span>
                </div>
                <div className="flex justify-center items-center">
                  <div className="px-3 py-1 rounded-md bg-white/5 text-white/70">
                    {item.traditional}
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="px-3 py-1 rounded-md bg-nextgen-purple/20 text-nextgen-purple font-medium">
                    {item.nextgen}
                    <span className="ml-2 text-xs bg-white/10 px-1.5 py-0.5 rounded-full text-white/80">
                      {item.improvement}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-sm text-white/50 max-w-2xl mx-auto">
            *Data based on performance metrics from 500+ dental practices using NextGen Practice Solutions 
            compared to industry averages. Results may vary based on practice size and location.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ROISection;
