
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { agents } from '@/data/agents';
import AgentChatAvatar from '@/components/AgentChatAvatar';
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const GiselleDemo = () => {
  const giselle = agents.find(agent => agent.name === 'Giselle')!;
  
  const benefits = [
    "Instant lead follow-up within 30 seconds",
    "AI-driven qualification quizzes",
    "Multi-touchpoint nurture sequences",
    "Smart appointment booking with deposit collection"
  ];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <FadeInSection direction="right">
        <div className="order-2 lg:order-1">
          <div className="aspect-video bg-gradient-to-br from-green-900/30 to-green-700/10 rounded-xl overflow-hidden flex items-center justify-center border border-green-500/20">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-2xl">▶️</span>
              </div>
              <p className="mt-4 text-white/70">Giselle demo video coming soon</p>
            </div>
          </div>
        </div>
      </FadeInSection>
      
      <FadeInSection direction="left" delay={0.2}>
        <div className="order-1 lg:order-2">
          <div className="flex items-center mb-6">
            <AgentChatAvatar agent="giselle" />
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-white">Giselle</h3>
              <p className="text-white/70">{giselle.title}</p>
            </div>
          </div>
          
          <p className="text-lg text-white mb-6">
            Giselle handles every lead from first form to booked consult — via quiz, text, and nurture sequences.
          </p>
          
          <div className="space-y-3 mb-8">
            <h4 className="text-lg font-semibold text-white">What You Can Expect:</h4>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="mt-1 mr-3 h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check size={12} className="text-green-500" />
                </div>
                <p className="text-white/80">{benefit}</p>
              </div>
            ))}
          </div>
          
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold text-white mb-2">Outcome:</h4>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Lead-to-consult conversion</span>
                  <span className="text-green-400 font-semibold">+72%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Average qualification time</span>
                  <span className="text-green-400 font-semibold">2.3 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Show rate</span>
                  <span className="text-green-400 font-semibold">89%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeInSection>
    </div>
  );
};

export default GiselleDemo;
