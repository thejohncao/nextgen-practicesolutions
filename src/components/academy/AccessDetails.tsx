
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import EmailCollectionForm from '../EmailCollectionForm';

const AccessDetails = () => {
  const pricingTiers = [
    {
      name: "Standard",
      price: "$497",
      description: "One-time payment for individual access",
      features: [
        "Full access to all Academy modules",
        "Downloadable scripts & templates",
        "Access to private community",
        "NextGen Practice Certification",
        "3 months support"
      ]
    },
    {
      name: "Team Access",
      price: "$997",
      description: "Train your entire team (up to 10 members)",
      features: [
        "Everything in Standard",
        "Multi-user accounts",
        "Team progress tracking",
        "Personalized onboarding session",
        "Priority support",
        "12 months support"
      ],
      highlight: true
    }
  ];

  return (
    <section className="py-24 relative bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-gradient">
            Access the Academy
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Choose the access tier that works best for your practice needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div 
              key={index} 
              className={`glass-card p-8 rounded-xl border ${tier.highlight ? 'border-nextgen-purple/50' : 'border-white/10'}`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-nextgen-purple text-white text-sm font-medium py-1 px-4 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-heading font-semibold mb-2 text-white">{tier.name}</h3>
                <div className="text-3xl md:text-4xl font-heading font-bold text-nextgen-purple mb-2">{tier.price}</div>
                <p className="text-white/70">{tier.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="rounded-full bg-nextgen-purple/20 p-1">
                      <Check className="h-4 w-4 text-nextgen-purple" />
                    </div>
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="w-full bg-nextgen-purple hover:bg-nextgen-purple/90">
                Get Started
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-2xl mx-auto text-center">
          <p className="text-white/80 mb-6">
            Have questions about which tier is right for your practice?
          </p>
          <EmailCollectionForm 
            buttonText="Schedule a Call"
            placeholder="Enter your email"
            className="max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default AccessDetails;
