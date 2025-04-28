
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
      color: "blue"
    },
    ctaText: "Talk to Miles"
  },
  {
    name: "Ignite",
    stage: "Growth Package",
    bestFor: "Best for Growing Practices",
    tagline: "For practices ready to attract new patients, grow production, and expand faster.",
    features: [
      "Unlock advanced patient pipelines and automations inside your branded NextGen App",
      "Deploy high-converting Patient Acquisition, Nurturing, and Membership Growth Campaigns",
      "Launch smart marketing campaigns with Giselle leading your growth strategies",
      "Strengthen your team with SOPs and onboarding templates designed to drive performance",
      "Accelerate your results with a 1:1 Strategic Success Planning Session"
    ],
    agent: {
      name: "Giselle",
      role: "Marketing",
      color: "green"
    },
    ctaText: "Talk to Miles",
    isPopular: true
  },
  {
    name: "Blaze",
    stage: "Development Package",
    bestFor: "Best for Scaling Practices",
    tagline: "For established practices ready to scale aggressively and maximize profitability.",
    features: [
      "Custom-build patient acquisition and retention campaigns for your market",
      "Track performance with our Executive KPI Dashboard and reporting suite",
      "Boost high-value case conversions with Devon's treatment acceptance system",
      "Maximize team performance with advanced training modules",
      "(Optional) Add a Dedicated Strategic Success Manager"
    ],
    agent: {
      name: "Devon",
      role: "Sales",
      color: "purple"
    },
    ctaText: "Talk to Miles"
  },
  {
    name: "Nova",
    stage: "Mastery Package",
    bestFor: "Best for Large Practices",
    tagline: "Your complete AI-powered operating system for multi-location success.",
    features: [
      "Smart Scheduling & Intelligent Recall System",
      "Growth Automations & Paid Ad Campaign Management",
      "Treatment Close Follow-Ups & Financing Integrations",
      "New Hire Onboarding & Training Automation",
      "Complete SOP Library & Staff Communication Playbooks",
      "Continuing Education Tracking & Reminders"
    ],
    agent: {
      name: "Alma",
      role: "Academy Director",
      color: "gold"
    },
    ctaText: "Talk to Miles",
    isMastery: true
  }
];

const PricingPackages = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {packages.map((pkg, index) => (
        <PricingCard key={index} {...pkg} />
      ))}
    </div>
  );
};

export default PricingPackages;
