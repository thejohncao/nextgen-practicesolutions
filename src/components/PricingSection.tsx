import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Spark",
    price: "$999",
    description: "Perfect for solo practices just getting started with AI",
    features: [
      "1 AI Agent (Miles)",
      "Automated scheduling",
      "Patient reminders",
      "Basic reporting",
      "Email support",
      "HIPAA compliance"
    ],
    popular: false,
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "Ignite",
    price: "$1,999",
    description: "Great for growing practices ready to scale operations",
    features: [
      "2 AI Agents (Miles + Giselle)",
      "Everything in Spark",
      "Marketing automation",
      "Social media management",
      "Lead generation tools",
      "Priority support"
    ],
    popular: true,
    color: "from-purple-500 to-purple-600"
  },
  {
    name: "Blaze",
    price: "$2,999",
    description: "For established practices wanting complete automation",
    features: [
      "3 AI Agents (Miles + Giselle + Devon)",
      "Everything in Ignite",
      "Patient engagement suite",
      "Treatment follow-up automation",
      "Advanced analytics",
      "Dedicated success manager"
    ],
    popular: false,
    color: "from-amber-500 to-amber-600"
  },
  {
    name: "Elite",
    price: "Custom",
    description: "Full enterprise solution for multi-location practices",
    features: [
      "All 4 AI Agents",
      "Everything in Blaze",
      "Operations & analytics (Ava)",
      "Multi-location management",
      "Custom integrations",
      "White-glove onboarding"
    ],
    popular: false,
    color: "from-green-500 to-green-600"
  }
];

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  
  const getPrice = (monthlyPrice: string) => {
    if (monthlyPrice === "Custom") return "Custom";
    const price = parseInt(monthlyPrice.replace("$", "").replace(",", ""));
    return isAnnual ? `$${(price * 10).toLocaleString()}/year` : `$${price.toLocaleString()}/month`;
  };

  return (
    <section id="pricing" className="section-padding py-20 bg-gradient-to-b from-nextgen-dark/95 to-nextgen-dark">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Choose Your Package
          </h2>
          
          <p className="text-lg text-white/70 mb-8">
            Each package unlocks a new department, led by its own AI-powered agent.
          </p>

          <div className="mt-6 inline-flex items-center gap-4 glass-card p-2 rounded-full animate-fade-in">
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
              className={`glass-card rounded-xl p-6 relative flex flex-col animate-fade-in
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
                <h3 className="text-2xl font-heading font-semibold text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline mt-2">
                  <span className="text-3xl font-bold text-white">{getPrice(plan.price)}</span>
                </div>
                <p className="mt-2 text-sm text-white/70">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-nextgen-purple mr-2 flex-shrink-0" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full mt-4 bg-gradient-to-r ${plan.color} text-white hover:opacity-90`}
              >
                Book Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              {/* Testimonial Quote (third plan only) */}
              {index === 2 && (
                <div className="mt-4 p-4 bg-white/5 rounded-lg text-sm animate-fade-in">
                  <p className="text-white/80 italic">
                    "NextGen helped us follow up with every lead, close more Invisalign cases, and reactivate patients we hadn't seen in a year."
                  </p>
                  <p className="text-xs text-white/60 mt-2">
                    — Kayla T., Treatment Coordinator
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-white/60 max-w-2xl mx-auto">
            All plans include a 14-day free trial. Cancel anytime. Need a custom solution?
            <a href="#" className="text-nextgen-purple hover:text-nextgen-purple/80 ml-1">
              Contact our sales team
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
