import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Calendar, Mail, MessageSquare, BookOpen } from "lucide-react";
import { Link } from 'react-router-dom';

const plans = [
  {
    name: "Spark",
    price: "$999",
    yearlyPrice: "$9,990",
    description: "Perfect for solo practices just getting started with AI",
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
      { name: "Miles", icon: Calendar, color: "from-blue-500 to-blue-600" }
    ],
    popular: false,
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "Ignite",
    price: "$1,999",
    yearlyPrice: "$19,990",
    description: "Great for growing practices ready to scale operations",
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
      { name: "Miles", icon: Calendar, color: "from-blue-500 to-blue-600" },
      { name: "Giselle", icon: Mail, color: "from-green-500 to-green-600" }
    ],
    popular: true,
    color: "from-purple-500 to-purple-600"
  },
  {
    name: "Blaze",
    price: "$2,999",
    yearlyPrice: "$29,990",
    description: "For established practices wanting complete automation",
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
      { name: "Miles", icon: Calendar, color: "from-blue-500 to-blue-600" },
      { name: "Giselle", icon: Mail, color: "from-green-500 to-green-600" },
      { name: "Devon", icon: MessageSquare, color: "from-purple-500 to-purple-600" }
    ],
    popular: false,
    color: "from-amber-500 to-amber-600"
  },
  {
    name: "Elite",
    price: "Custom",
    yearlyPrice: "Custom",
    description: "Full enterprise solution for multi-location practices",
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
      { name: "Miles", icon: Calendar, color: "from-blue-500 to-blue-600" },
      { name: "Giselle", icon: Mail, color: "from-green-500 to-green-600" },
      { name: "Devon", icon: MessageSquare, color: "from-purple-500 to-purple-600" },
      { name: "Ava", icon: BookOpen, color: "from-amber-500 to-amber-600" }
    ],
    popular: false,
    color: "from-green-500 to-green-600"
  }
];

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="section-padding py-20 bg-gradient-to-b from-nextgen-dark/95 to-nextgen-dark">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Choose Your Package. Unlock Your AI Team.
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
                  <span className="text-3xl font-bold text-white">
                    {isAnnual ? plan.yearlyPrice : plan.price}
                    {isAnnual && plan.price !== "Custom" ? <span className="text-sm text-white/60">/year</span> : <span className="text-sm text-white/60">/month</span>}
                  </span>
                </div>
                {isAnnual && plan.price !== "Custom" && (
                  <p className="text-xs text-nextgen-purple mt-1">(2 months free)</p>
                )}
                
                {/* Agent Icons */}
                <div className="mt-4 flex gap-2">
                  {plan.agents.map((agent, i) => {
                    const AgentIcon = agent.icon;
                    return (
                      <div 
                        key={i} 
                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${agent.color} flex items-center justify-center`} 
                        title={agent.name}
                      >
                        <AgentIcon className="h-4 w-4 text-white" />
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-3 inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
                  {plan.includes}
                </div>
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
                asChild
              >
                <Link to="/demo">
                  Book Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button size="lg" className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white" asChild>
            <Link to="/demo">Book a Demo to Find Your Fit</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
