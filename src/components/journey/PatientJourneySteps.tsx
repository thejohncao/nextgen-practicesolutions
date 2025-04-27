
import React from 'react';
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Connect",
    subtitle: "Finally break free from administrative chaos.",
    color: "from-blue-500/20 to-blue-500/10"
  },
  {
    title: "Unlock",
    subtitle: "Get your personalized AI team working for you.",
    color: "from-purple-500/20 to-purple-500/10"
  },
  {
    title: "Grow",
    subtitle: "Reclaim your time, your patients, and your life.",
    color: "from-green-500/20 to-green-500/10"
  }
];

const PatientJourneySteps = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {steps.map((step, index) => (
        <div 
          key={index}
          className={cn(
            "glass-card p-8 text-center transition-all duration-300 hover:scale-[1.02]",
            "bg-gradient-to-b",
            step.color
          )}
        >
          <h3 className="text-2xl font-heading font-bold mb-3">
            {step.title}
          </h3>
          <p className="text-sm text-white/60 leading-relaxed">
            {step.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PatientJourneySteps;
