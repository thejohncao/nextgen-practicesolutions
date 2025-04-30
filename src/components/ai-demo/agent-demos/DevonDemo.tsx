
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { agents } from '@/data/agents';
import AgentChatAvatar from '@/components/AgentChatAvatar';
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const DevonDemo = () => {
  const devon = agents.find(agent => agent.name === 'Devon')!;
  
  const benefits = [
    "Automatic follow-up on presented treatment plans",
    "Persuasive messaging tailored to treatment type",
    "Handles financing questions and objections",
    "Reactivates cold cases automatically"
  ];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <FadeInSection direction="right">
        <div>
          <div className="flex items-center mb-6">
            <AgentChatAvatar agent="devon" />
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-white">Devon</h3>
              <p className="text-white/70">{devon.title}</p>
            </div>
          </div>
          
          <p className="text-lg text-white mb-6">
            Devon follows up on every unscheduled case and brings them back to the chair.
          </p>
          
          <div className="space-y-3 mb-8">
            <h4 className="text-lg font-semibold text-white">What You Can Expect:</h4>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="mt-1 mr-3 h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Check size={12} className="text-purple-500" />
                </div>
                <p className="text-white/80">{benefit}</p>
              </div>
            ))}
          </div>
          
          <Card className="bg-purple-500/10 border-purple-500/20">
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold text-white mb-2">Outcome:</h4>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Monthly recovered revenue</span>
                  <span className="text-purple-400 font-semibold">$25K+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Case acceptance increase</span>
                  <span className="text-purple-400 font-semibold">34%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Follow-up compliance</span>
                  <span className="text-purple-400 font-semibold">100%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeInSection>
      
      <FadeInSection direction="left">
        <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-purple-700/10 rounded-xl overflow-hidden flex items-center justify-center border border-purple-500/20">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center">
              <span className="text-2xl">▶️</span>
            </div>
            <p className="mt-4 text-white/70">Devon demo video coming soon</p>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default DevonDemo;
