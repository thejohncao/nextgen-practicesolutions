
import React from 'react';
import { Check } from 'lucide-react';
import PricingCard from './pricing/PricingCard';
import BoardroomUnlockFlow from './pricing/BoardroomUnlockFlow';

const pricingData = [
  {
    name: "Spark",
    stage: "Foundation Package",
    bestFor: "Built for new practices or lean teams ready to automate operations and patient communication.",
    features: [
      "Your branded NextGen App (Basic CRM, Scheduling, Recall Automations)",
      "Access to your Practice Management AI Agent (Miles)",
      "Prebuilt Scheduling, Recall, and Patient Reactivation Workflows",
      "Front Office SOP Templates",
      "1:1 Onboarding and Setup Support"
    ],
    tagline: "Strengthen your foundation and streamline operations — no extra hires needed.",
    agent: {
      name: "Miles",
      role: "AI Front Office Concierge",
      color: "red"
    },
    ctaText: "Get Started with Spark"
  },
  {
    name: "Ignite",
    stage: "Growth Package",
    bestFor: "For practices ready to attract new patients, grow production, and expand faster.",
    features: [
      "Full access to your branded NextGen App (CRM, Patient Pipelines, Advanced Automations)",
      "Unlock your full AI Executive Boardroom (Miles, Giselle, Devon, Alma)",
      "Prebuilt Patient Acquisition, Nurturing, Case Acceptance, and Membership Growth Workflows",
      "Team Training SOPs + Templates",
      "1:1 Strategic Success Planning Session"
    ],
    tagline: "Ignite powerful growth with your full AI team running the playbook for you.",
    agent: {
      name: "Giselle",
      role: "AI Lead Nurturer",
      color: "green"
    },
    ctaText: "Ignite My Growth",
    isPopular: true
  },
  {
    name: "Blaze",
    stage: "Multiply Package",
    bestFor: "For established practices ready to scale aggressively, dominate their market, and maximize profitability.",
    features: [
      "Everything in Ignite, plus:",
      "Advanced multilocation, lifecycle, and referral automation systems",
      "Custom-built Growth Campaigns tailored to your goals",
      "Executive KPI Tracking Dashboard",
      "Optional Dedicated Strategic Success Manager"
    ],
    tagline: "Multiply your revenue and scale like a top-performing DSO — all powered by your NextGen Operating System and AI Executive Team.",
    agent: {
      name: "Devon",
      role: "AI Treatment Closer",
      color: "blue"
    },
    ctaText: "Blaze Ahead with Devon"
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
            Choose Your NextGen Package
          </h2>
          <p className="text-lg text-white/70">
            Build. Grow. Multiply.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pricingData.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>

        {/* Boardroom Unlock Flow */}
        <BoardroomUnlockFlow />

        <div 
          className="glass-card max-w-4xl mx-auto p-8 md:p-12 mt-16 animate-fade-in"
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
