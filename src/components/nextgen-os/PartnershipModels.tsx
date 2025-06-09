
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Zap, Handshake, Lock, ArrowRight } from 'lucide-react';

const PartnershipModels = () => {
  const models = [
    {
      icon: Zap,
      title: "💠 Powered by NextGen",
      subtitle: "License Model",
      description: "Get full access to the NextGen OS platform with your branding. Perfect for established practices looking to modernize operations.",
      features: [
        "Complete platform access",
        "White-labeled frontend",
        "AI agent suite included",
        "Monthly licensing fee"
      ],
      cta: "Learn More",
      link: "/pricing"
    },
    {
      icon: Handshake,
      title: "🤝 Strategic Partner",
      subtitle: "Phantom Equity",
      description: "Partner with us for shared growth. Ideal for practices wanting to scale rapidly with our proven systems and ongoing support.",
      features: [
        "Revenue sharing model",
        "Dedicated support team",
        "Growth acceleration program",
        "Performance-based rewards"
      ],
      cta: "Explore Partnership",
      link: "/join"
    },
    {
      icon: Lock,
      title: "🔒 Full Merge",
      subtitle: "Equity + IP Integration",
      description: "Complete integration with NextGen. Best for practices ready to become part of our expanding network and share in our success.",
      features: [
        "Full equity participation",
        "IP rights sharing",
        "Executive team integration",
        "Maximum growth potential"
      ],
      cta: "Schedule Call",
      link: "/demo"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-nextgen-dark to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
            Partnership Models
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Choose the partnership model that fits your practice's growth goals
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {models.map((model, index) => {
            const IconComponent = model.icon;
            return (
              <Card key={index} className="glass-card border-nextgen-purple/20 hover:shadow-glow transition-all duration-300 h-full">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 rounded-full bg-nextgen-purple/20 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-nextgen-purple" />
                  </div>
                  <CardTitle className="text-xl text-white mb-2">
                    {model.title}
                  </CardTitle>
                  <p className="text-nextgen-purple font-semibold">{model.subtitle}</p>
                </CardHeader>
                
                <CardContent className="pt-0 flex flex-col h-full">
                  <p className="text-white/70 mb-6 flex-shrink-0">{model.description}</p>
                  
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-3">Includes:</h4>
                    <ul className="space-y-2 mb-6">
                      {model.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-white/70 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-nextgen-purple flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button asChild className="w-full bg-nextgen-purple hover:bg-nextgen-purple/80 mt-auto">
                    <Link to={model.link} className="flex items-center justify-center">
                      {model.cta}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnershipModels;
