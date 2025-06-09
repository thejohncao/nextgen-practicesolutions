
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
      subtitle: "Licensing with backend access",
      description: "Licensing with backend access, GHL + SOPs. You retain all IP and get full platform access.",
      equity: "5–10%",
      ipRights: "You retain all IP",
      cta: "Learn More",
      link: "/pricing"
    },
    {
      icon: Handshake,
      title: "🤝 Strategic Co-Founder",
      subtitle: "Phantom → equity at scale",
      description: "Phantom → equity at scale (JUV-style). Co-branded partnership with shared growth.",
      equity: "10–15%",
      ipRights: "Co-branded",
      cta: "Explore Partnership",
      link: "/join"
    },
    {
      icon: Lock,
      title: "🔒 Full Merge",
      subtitle: "IP merges into company",
      description: "IP merges into company; Jonathan joins executive team. Complete integration and shared success.",
      equity: "20%+",
      ipRights: "Full integration",
      cta: "Schedule Call",
      link: "/demo"
    }
  ];

  return (
    <section className="section-spacing bg-gradient-to-b from-nextgen-dark to-black/95">
      <div className="container-liquid">
        <div className="text-center mb-16">
          <h2 className="text-headline-lg font-semibold bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent mb-8">
            💼 Partnership Models
          </h2>
          <p className="text-body-lg text-white/70 max-w-3xl mx-auto">
            Choose the partnership model that fits your practice's growth goals
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {models.map((model, index) => {
            const IconComponent = model.icon;
            return (
              <Card key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-350 hover:scale-105 h-full">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 rounded-full bg-nextgen-purple/20 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-nextgen-purple" />
                  </div>
                  <CardTitle className="text-body-lg text-white mb-2">
                    {model.title}
                  </CardTitle>
                  <p className="text-body text-nextgen-purple font-semibold">{model.subtitle}</p>
                </CardHeader>
                
                <CardContent className="pt-0 flex flex-col h-full">
                  <p className="text-white/70 mb-6 flex-shrink-0">{model.description}</p>
                  
                  <div className="flex-1 mb-6">
                    <div className="bg-white/5 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/60">Equity:</span>
                        <span className="text-nextgen-purple font-semibold">{model.equity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">IP Rights:</span>
                        <span className="text-white font-medium">{model.ipRights}</span>
                      </div>
                    </div>
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
