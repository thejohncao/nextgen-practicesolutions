import React from 'react';
import { Check } from 'lucide-react';
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

const successFeatures = [
  "Dedicated Success Manager",
  "Priority Onboarding and Support",
  "Quarterly Optimization Reviews",
  "24/7 Automation Monitoring",
  "Success Guarantee: If we don't help you grow, we don't stop working."
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pricingData.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>

        <div 
          className="glass-card max-w-4xl mx-auto p-8 md:p-12 animate-fade-in"
          style={{ backdropFilter: 'blur(20px)' }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-heading font-bold mb-2 text-gradient">
              Included with Every NextGen Plan
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {successFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="rounded-full bg-nextgen-purple/20 p-1 mt-1">
                  <Check className="h-4 w-4 text-nextgen-purple" />
                </div>
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
