import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Check, Calculator, Shield } from "lucide-react";

const resources = [
  {
    title: "AI Practice Playbook",
    icon: FileText,
    description: "Learn the proven strategies top-performing dental practices use to implement AI solutions and maximize returns.",
    ctaText: "Download Playbook",
    bgColor: "from-blue-500 to-blue-600"
  },
  {
    title: "Practice Audit Quiz",
    icon: Check,
    description: "Take our 2-minute quiz to identify automation opportunities in your practice and get a personalized recommendation.",
    ctaText: "Start Quiz",
    bgColor: "from-purple-500 to-purple-600"
  },
  {
    title: "ROI Calculator",
    icon: Calculator,
    description: "Estimate how much time and money your practice could save by implementing NextGen AI solutions.",
    ctaText: "Calculate Savings",
    bgColor: "from-green-500 to-green-600"
  }
];

const ResourcesSection = () => {
  return (
    <section id="resources" className="section-padding py-20">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Shield className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">Built for Growth</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Free Resources
          </h2>
          
          <p className="text-lg text-white/70">
            Access our library of tools and guides to help you implement AI in your dental practice,
            even if you're not ready to purchase yet.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div key={index} className="glass-card rounded-xl p-6 flex flex-col">
                <div className={`rounded-lg p-4 bg-gradient-to-br ${resource.bgColor} self-start mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-heading font-semibold text-white mb-3">
                  {resource.title}
                </h3>
                
                <p className="text-white/70 mb-6 flex-grow">
                  {resource.description}
                </p>
                
                <Button 
                  variant="outline"
                  className="border-white/20 hover:bg-white/5 mt-auto"
                >
                  {resource.ctaText}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
