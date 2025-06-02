
import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RainbowButton from '@/components/ui/rainbow-button';
import { Link } from 'react-router-dom';

const PricingPlans = () => {
  const plans = [
    {
      name: "Spark",
      agents: "Alma (Academy Only)",
      tcAccess: "LMS Only",
      support: "Email",
      idealFor: "Solo Docs",
      features: [
        "Academy access",
        "Email support",
        "Basic training materials",
        "Community access"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Ignite",
      agents: "+ Miles",
      tcAccess: "+ Job Placement",
      support: "Priority Chat",
      idealFor: "Growing Teams",
      features: [
        "Everything in Spark",
        "Miles AI assistant",
        "Job placement network",
        "Priority chat support",
        "Advanced training"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Blaze",
      agents: "All Agents",
      tcAccess: "+ Real-Time AI Integration",
      support: "Dedicated Success Lead",
      idealFor: "DSOs",
      features: [
        "Everything in Ignite",
        "All AI agents",
        "Real-time integrations",
        "Dedicated success manager",
        "Custom implementation"
      ],
      cta: "Book a Demo",
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Choose Your Practice Plan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`glass-card h-full hover:shadow-lg transition-all duration-300 relative ${plan.popular ? 'border-nextgen-purple/50 scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-nextgen-purple to-nextgen-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-6">{plan.name}</h3>
                
                <div className="space-y-4 mb-8 text-left">
                  <div>
                    <span className="text-white/60 text-sm">Agents:</span>
                    <div className="text-white font-medium">{plan.agents}</div>
                  </div>
                  <div>
                    <span className="text-white/60 text-sm">TC Access:</span>
                    <div className="text-white font-medium">{plan.tcAccess}</div>
                  </div>
                  <div>
                    <span className="text-white/60 text-sm">Support:</span>
                    <div className="text-white font-medium">{plan.support}</div>
                  </div>
                  <div>
                    <span className="text-white/60 text-sm">Ideal For:</span>
                    <div className="text-white font-medium">{plan.idealFor}</div>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.popular ? (
                  <RainbowButton size="lg" className="w-full" asChild>
                    <Link to="/pricing">
                      {plan.cta}
                    </Link>
                  </RainbowButton>
                ) : (
                  <Button size="lg" variant="outline" className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10" asChild>
                    <Link to="/pricing">
                      {plan.cta}
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
