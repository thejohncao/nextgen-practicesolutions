
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Handshake, Lock } from 'lucide-react';

const JuvOwnershipModels = () => {
  const ownershipOptions = [
    {
      icon: <Zap className="h-8 w-8" />,
      option: "💠 Powered by NextGen",
      description: "JUV licenses the full platform stack",
      equity: "5%–10% share",
      terms: "Licensing + backend access",
      color: "border-blue-500/20 bg-blue-50/5"
    },
    {
      icon: <Handshake className="h-8 w-8" />,
      option: "🤝 Strategic Co-Founder",
      description: "External platform; Jonathan owns % of JUV",
      equity: "10%–15% equity",
      terms: "5-year vesting, shared roadmap",
      color: "border-green-500/20 bg-green-50/5"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      option: "🔒 IP Absorption",
      description: "Full merge; Jonathan joins team formally",
      equity: "20%+ equity",
      terms: "Full transfer, 4-year vest, board seat",
      color: "border-purple-500/20 bg-purple-50/5"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black/20 to-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            🧾 OWNERSHIP MODELS – HOW WE FORMALIZE THE PARTNERSHIP
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {ownershipOptions.map((option, index) => (
            <Card key={index} className={`glass-card hover:shadow-lg transition-all duration-300 group ${option.color}`}>
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6 group-hover:scale-110 transition-transform text-nextgen-purple">
                  {option.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {option.option}
                </h3>
                
                <p className="text-white/70 mb-4">
                  {option.description}
                </p>
                
                <div className="space-y-2">
                  <div className="text-nextgen-purple font-semibold">
                    {option.equity}
                  </div>
                  <div className="text-white/60 text-sm">
                    {option.terms}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JuvOwnershipModels;
