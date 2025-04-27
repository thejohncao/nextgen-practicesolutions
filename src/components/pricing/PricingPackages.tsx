
import React from 'react';
import PricingCard from './PricingCard';

const packages = [
  {
    name: "Spark",
    stage: "Foundation Package",
    bestFor: "Built for new practices or lean teams ready to automate operations and patient communication.",
    features: [
      "Your branded NextGen App (Basic CRM, Scheduling, Recall Automations)",
      "Practice Management AI Agent (Miles)",
      "Prebuilt Scheduling, Recall, and Reactivation Workflows",
      "Front Office SOP Templates",
      "1:1 Onboarding and Setup Support"
    ],
    tagline: "Strengthen your foundation and streamline operations — no extra hires needed.",
    agent: {
      name: "Miles",
      role: "Practice Management",
      color: "red"
    },
    ctaText: "Get Started with Spark"
  },
  {
    name: "Ignite",
    stage: "Growth Package",
    bestFor: "For practices ready to attract new patients, grow production, and expand faster.",
    features: [
      "Full NextGen App (Advanced CRM, Patient Pipelines, Automations)",
      "Full AI Executive Boardroom (Miles, Giselle, Devon, Alma)",
      "Prebuilt Patient Acquisition, Nurturing, and Membership Workflows",
      "Team Training SOPs + Templates",
      "1:1 Strategic Success Planning Session"
    ],
    tagline: "Ignite powerful growth with your full AI team running the playbook for you.",
    agent: {
      name: "Giselle",
      role: "Marketing and Growth",
      color: "green"
    },
    ctaText: "Unlock Ignite Package",
    isPopular: true
  },
  {
    name: "Blaze",
    stage: "Multiply Package",
    bestFor: "For established practices ready to scale aggressively, dominate their market, and maximize profitability.",
    features: [
      "Everything in Ignite Package",
      "Advanced Multilocation, Patient Lifecycle, and Referral Automation",
      "Custom Growth Campaigns",
      "Executive KPI Tracking Dashboard",
      "Optional Dedicated Strategic Success Manager"
    ],
    tagline: "Multiply your revenue and scale like a top-performing DSO — all powered by your NextGen Operating System and AI Executive Team.",
    agent: {
      name: "Devon",
      role: "Sales and Growth",
      color: "blue"
    },
    ctaText: "Scale with Blaze"
  }
];

const PricingPackages = () => {
  return (
    <div className="container mx-auto px-4 mb-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-gradient">
          Find the Right Package for Your Practice Growth Stage
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <PricingCard key={index} {...pkg} />
        ))}
      </div>
    </div>
  );
};

export default PricingPackages;
