
import React from 'react';
import PricingCard from './pricing/PricingCard';

const pricingData = [
  {
    name: "Spark",
    stage: "Foundation Stage",
    bestFor: "Practices building solid front office operations",
    features: [
      "Smart Calendar Automation",
      "New Patient Digital Intake Forms",
      "Live Two-Way Patient Messaging",
      "Recall and Reactivation Engine",
      "No-Show Rescue Automations",
      "Daily Operational KPI Dashboards"
    ],
    agent: {
      name: "Miles",
      role: "AI Front Office Concierge",
      color: "red"
    },
    ctaText: "Get Started with Spark"
  },
  {
    name: "Ignite",
    stage: "Growth Stage",
    bestFor: "Practices scaling new patient flow",
    features: [
      "Lead Capture Funnels",
      "Automated Follow-Up Sequences",
      "Referral Growth Engine",
      "Paid Ads Lead Pipeline Integrations",
      "Membership Growth Automation"
    ],
    agent: {
      name: "Giselle",
      role: "AI Lead Nurturer",
      color: "green"
    },
    ctaText: "Ignite My Growth",
    includesText: "Everything in Spark, PLUS:"
  },
  {
    name: "Blaze",
    stage: "Development Stage",
    bestFor: "Practices closing more high-ticket treatments",
    features: [
      "Consultation Day Prep Automation",
      "Financing Offer Integrations",
      "Post-Consult Follow-Up Campaigns",
      "Abandoned Treatment Reactivation",
      "Membership Retention Automation"
    ],
    agent: {
      name: "Devon",
      role: "AI Treatment Closer",
      color: "blue"
    },
    ctaText: "Blaze Ahead with Devon",
    includesText: "Everything in Spark + Ignite, PLUS:",
    isPopular: true
  },
  {
    name: "Nova",
    stage: "Mastery Stage",
    bestFor: "Practices mastering scale, team training, and multi-location growth",
    features: [
      "New Hire Onboarding Checklists",
      "SOP Library Access",
      "Training Video Portal",
      "Continuing Education Reminders",
      "Front Desk Communication Scripts",
      "Best Practices Playbooks"
    ],
    agent: {
      name: "Alma",
      role: "AI Training Assistant",
      color: "gold"
    },
    ctaText: "Level Up with Nova",
    includesText: "Everything in Spark + Ignite + Blaze, PLUS:"
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="section-padding py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-nextgen-purple/10 blur-[100px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#E87C7C]/10 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[#7CE8D5]/5 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Transparent Pricing — Scale Smarter, Stage by Stage
          </h2>
          <p className="text-lg text-white/70">
            Choose your perfect stage and unlock the AI agents that automate, grow, and scale your practice success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingData.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
