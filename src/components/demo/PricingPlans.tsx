
import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RainbowButton from '@/components/ui/rainbow-button';
import { Link } from 'react-router-dom';
import ScrollRevealWrapper from '../animation/ScrollRevealWrapper';

const PricingPlans = () => {
  const plans = [
    {
      name: "Spark",
      agents: "Alma (Academy Only)",
      tcAccess: "LMS Only",
      support: "Email",
      idealFor: "Solo Docs",
      features: ["Academy access", "Email support", "Basic training materials", "Community access"],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Ignite",
      agents: "+ Miles",
      tcAccess: "+ Job Placement",
      support: "Priority Chat",
      idealFor: "Growing Teams",
      features: ["Everything in Spark", "Miles AI assistant", "Job placement network", "Priority chat support", "Advanced training"],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Blaze",
      agents: "All Agents",
      tcAccess: "+ Real-Time AI Integration",
      support: "Dedicated Success Lead",
      idealFor: "DSOs",
      features: ["Everything in Ignite", "All AI agents", "Real-time integrations", "Dedicated success manager", "Custom implementation"],
      cta: "Book a Demo",
      popular: false
    }
  ];

  return (
    <section className="py-24 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Choose Your Practice Plan
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Select the plan that fits your practice size and growth goals.
            </p>
          </div>
        </ScrollRevealWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <ScrollRevealWrapper 
              key={index} 
              animation="fade-up" 
              delay={0.1 * index}
            >
              <Card className={`relative bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 ${plan.popular ? 'ring-2 ring-nextgen-purple' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-nextgen-purple text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-white/70 mb-4">{plan.idealFor}</p>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <Check className="h-5 w-5 text-nextgen-purple mr-3 flex-shrink-0" />
                        <span className="text-white/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {plan.popular ? (
                    <RainbowButton className="w-full" asChild>
                      <Link to="/pricing">{plan.cta}</Link>
                    </RainbowButton>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10"
                      asChild
                    >
                      <Link to="/pricing">{plan.cta}</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </ScrollRevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
