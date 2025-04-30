
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { agents } from '@/data/agents';
import AgentChatAvatar from '@/components/AgentChatAvatar';
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AlmaDemo = () => {
  const alma = agents.find(agent => agent.name === 'Alma')!;
  
  const benefits = [
    "Automated SOPs delivery to new and existing staff",
    "Structured onboarding for every role",
    "Certification tracking and verification",
    "Weekly training reinforcement"
  ];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <FadeInSection direction="right">
        <div className="order-2 lg:order-1">
          <div className="aspect-video bg-gradient-to-br from-amber-900/30 to-amber-700/10 rounded-xl overflow-hidden flex items-center justify-center border border-amber-500/20">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center">
                <span className="text-2xl">▶️</span>
              </div>
              <p className="mt-4 text-white/70">Alma demo video coming soon</p>
            </div>
          </div>
        </div>
      </FadeInSection>
      
      <FadeInSection direction="left" delay={0.2}>
        <div className="order-1 lg:order-2">
          <div className="flex items-center mb-6">
            <AgentChatAvatar agent="alma" />
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-white">Alma</h3>
              <p className="text-white/70">{alma.title}</p>
            </div>
          </div>
          
          <p className="text-lg text-white mb-6">
            Alma trains every new hire and delivers SOPs automatically — no micromanagement needed.
          </p>
          
          <div className="space-y-3 mb-8">
            <h4 className="text-lg font-semibold text-white">What You Can Expect:</h4>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="mt-1 mr-3 h-5 w-5 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Check size={12} className="text-amber-500" />
                </div>
                <p className="text-white/80">{benefit}</p>
              </div>
            ))}
          </div>
          
          <Card className="bg-amber-500/10 border-amber-500/20">
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold text-white mb-2">Outcome:</h4>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Ramp-up time reduction</span>
                  <span className="text-amber-400 font-semibold">67%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Compliance with protocols</span>
                  <span className="text-amber-400 font-semibold">94%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Training consistency</span>
                  <span className="text-amber-400 font-semibold">100%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeInSection>
    </div>
  );
};

export default AlmaDemo;
