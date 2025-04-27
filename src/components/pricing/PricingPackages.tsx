
import React from 'react';
import PricingCard from './PricingCard';

const packages = [
  {
    name: "Spark",
    stage: "Foundation Package",
    bestFor: "Best for Startups or Small Practices",
    tagline: "Built for new practices or lean teams ready to automate operations and patient communication.",
    features: [
      "Launch your branded NextGen App with streamlined scheduling, recall, and patient tracking",
      "Activate your Practice Management AI Agent (Miles) to organize your front office and reduce chaos",
      "Automate patient scheduling, recalls, and reactivations with proven workflows built in",
      "Empower your team with ready-to-use front office SOP templates",
      "Get live setup support with a 1:1 onboarding session tailored to your practice"
    ],
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
    bestFor: "Best for Growing Practices",
    tagline: "For practices ready to attract new patients, grow production, and expand faster.",
    features: [
      "Unlock your full AI Executive Boardroom — your complete management, marketing, sales, and training team",
      "Launch advanced patient pipelines and automations inside your branded NextGen App",
      "Deploy high-converting Patient Acquisition, Nurturing, and Membership Growth Campaigns instantly",
      "Strengthen your team with SOPs and onboarding templates designed to drive performance",
      "Accelerate your results with a 1:1 Strategic Success Planning Session focused on your growth goals"
    ],
    agent: {
      name: "Giselle",
      role: "Marketing",
      color: "green"
    },
    ctaText: "Unlock Ignite Package",
    isPopular: true
  },
  {
    name: "Blaze",
    stage: "Multiply Package",
    bestFor: "Best for Scaling Practices and DSOs",
    tagline: "For established practices ready to scale aggressively, dominate their market, and maximize profitability.",
    features: [
      "Maximize your full AI Executive Boardroom power with advanced multilocation and patient lifecycle systems",
      "Custom-build patient acquisition and retention campaigns tailored specifically to your market goals",
      "Track your performance at an executive level with our KPI Dashboard and reporting suite",
      "Boost high-value case conversions, referrals, and membership growth automatically",
      "(Optional) Add a Dedicated Strategic Success Manager to drive implementation and optimization"
    ],
    agent: {
      name: "Devon",
      role: "Sales",
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
