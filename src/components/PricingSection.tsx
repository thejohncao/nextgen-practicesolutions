import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';
import AgentAvatar from './AgentAvatar';
import EmailCollectionForm from './EmailCollectionForm';
import EmailCollectionDialog from './EmailCollectionDialog';

const plans = [
  {
    name: "Spark",
    subheader: "Build your base: streamlined operations, smart scheduling, and AI-powered front desk support.",
    price: "$999",
    yearlyPrice: "$9,990",
    description: "Foundation Package",
    includes: "Miles (Mgmt)",
    features: [
      "Practice management automation",
      "Automated scheduling",
      "Patient reminders",
      "Basic reporting",
      "Email support",
      "HIPAA compliance"
    ],
    agents: [
      { name: "Miles", role: "Practice Management", color: "blue" }
    ],
    popular: false,
    color: "from-blue-500 to-blue-600",
    buttonClass: "bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 text-white"
  },
  {
    name: "Ignite",
    subheader: "Fuel your momentum: lead generation, AI follow-up, and fully automated campaign workflows.",
    price: "$1,999",
    yearlyPrice: "$19,990",
    description: "Growth Package",
    includes: "+ Giselle (Growth)",
    features: [
      "Everything in Spark",
      "Marketing automation",
      "Social media management",
      "Lead generation tools",
      "Priority support",
      "Advanced analytics"
    ],
    agents: [
      { name: "Miles", role: "Practice Management", color: "blue" },
      { name: "Giselle", role: "Growth", color: "teal" }
    ],
    popular: true,
    color: "from-teal-500 to-teal-600",
    buttonClass: "bg-gradient-to-r from-teal-500 to-teal-600 hover:opacity-90 text-white"
  },
  {
    name: "Blaze",
    subheader: "Scale with confidence: treatment close systems, reactivation flows, and your dream team fully trained and deployed.",
    price: "$2,999",
    yearlyPrice: "$29,990",
    description: "Multiply Package",
    includes: "+ Devon (Development)",
    features: [
      "Everything in Ignite",
      "Patient engagement suite",
      "Treatment follow-up automation",
      "Advanced analytics",
      "Dedicated success manager",
      "Monthly strategy calls"
    ],
    agents: [
      { name: "Miles", role: "Practice Management", color: "blue" },
      { name: "Giselle", role: "Growth", color: "teal" },
      { name: "Devon", role: "Development", color: "purple" }
    ],
    popular: false,
    color: "from-purple-500 to-purple-600",
    buttonClass: "bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 text-white"
  },
  {
    name: "Nova",
    subheader: "For visionary practices: fully customized AI systems, enterprise automation, and hands-on executive strategy.",
    price: "Custom",
    yearlyPrice: "Custom",
    description: "Custom Package",
    includes: "+ Ava (Academy)",
    features: [
      "Everything in Blaze",
      "Operations & analytics",
      "Multi-location management",
      "Custom integrations",
      "White-glove onboarding",
      "Quarterly business reviews"
    ],
    agents: [
      { name: "Miles", role: "Practice Management", color: "blue" },
      { name: "Giselle", role: "Growth", color: "teal" },
      { name: "Devon", role: "Development", color: "purple" },
      { name: "Ava", role: "Academy", color: "gold" }
    ],
    popular: false,
    color: "from-amber-500 to-amber-600",
    buttonClass: "bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-90 text-white"
  }
];

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="section-padding py-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-nextgen-purple/10 blur-[100px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#E87C7C]/10 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[#7CE8D5]/5 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 relative">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Choose Your Package. Unlock Your AI Team.
          </h2>
          
          <p className="text-lg text-white/70 mb-8">
            Each package unlocks a new department, led by its own AI-powered agent.
          </p>

          <div className="mt-6 inline-flex items-center gap-4 glass-card p-2 rounded-full animate-fade-in backdrop-blur-xl">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !isAnnual ? 'bg-nextgen-purple text-white' : 'text-white/60 hover:text-white'
              }`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isAnnual ? 'bg-nextgen-purple text-white' : 'text-white/60 hover:text-white'
              }`}
              onClick={() => setIsAnnual(true)}
            >
              Annual (Save 2 Months)
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`glass-card rounded-xl p-6 relative flex flex-col animate-fade-in backdrop-blur-xl
                hover:shadow-[0_0_50px_rgba(155,135,245,0.1)] transition-all duration-500
                ${plan.popular ? 'ring-2 ring-nextgen-purple' : ''}
                ${isAnnual ? 'transform translate-x-0' : ''}`}
              style={{ 
                animationDelay: `${index * 200}ms`,
                transition: 'transform 0.3s ease-in-out'
              }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-nextgen-purple text-white text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-4">
                <h3 className={`text-2xl font-heading font-semibold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent mb-1`}>
                  {plan.name}
                </h3>
                <p className="text-sm text-white/70 mb-2">{plan.description}</p>
                <p className="text-sm text-white/90 mb-4">{plan.subheader}</p>
                <div className="flex items-baseline mt-2">
                  <span className="text-3xl font-bold text-white">
                    {isAnnual ? plan.yearlyPrice : plan.price}
                    {plan.price !== "Custom" && (
                      <span className="text-sm text-white/60">
                        {isAnnual ? '/year' : '/month'}
                      </span>
                    )}
                  </span>
                </div>
                {isAnnual && plan.price !== "Custom" && (
                  <p className="text-xs text-nextgen-purple mt-1">(2 months free)</p>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-3 md:gap-4">
                {plan.agents.map((agent, i) => (
                  <div key={i} className="relative">
                    <AgentAvatar
                      name={agent.name}
                      role={agent.role}
                      color={agent.color}
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-3 inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
                {plan.includes}
              </div>
              
              <ul className="space-y-3 my-6 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-nextgen-purple mr-2 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <EmailCollectionDialog
                triggerText={`Get Started with ${plan.name}`}
                buttonClassName={plan.buttonClass}
              />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <EmailCollectionDialog
            triggerText="Book a Demo to Find Your Fit"
            buttonSize="lg"
            buttonClassName="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
          />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
