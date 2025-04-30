
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { agents } from '@/data/agents';
import AgentChatAvatar from '@/components/AgentChatAvatar';
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const MilesDemo = () => {
  const miles = agents.find(agent => agent.name === 'Miles')!;
  
  const benefits = [
    "Automatically confirms appointments 24/48 hours before",
    "Reschedules no-shows without staff intervention",
    "Integrates with any calendar system",
    "Provides detailed weekly scheduling reports"
  ];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <FadeInSection direction="right">
        <div>
          <div className="flex items-center mb-6">
            <AgentChatAvatar agent="miles" />
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-white">Miles</h3>
              <p className="text-white/70">{miles.title}</p>
            </div>
          </div>
          
          <p className="text-lg text-white mb-6">
            Miles manages scheduling, confirmations, and reporting with zero human follow-up.
          </p>
          
          <div className="space-y-3 mb-8">
            <h4 className="text-lg font-semibold text-white">What You Can Expect:</h4>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="mt-1 mr-3 h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Check size={12} className="text-blue-500" />
                </div>
                <p className="text-white/80">{benefit}</p>
              </div>
            ))}
          </div>
          
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold text-white mb-2">Outcome:</h4>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">No-show reduction</span>
                  <span className="text-blue-400 font-semibold">82%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Scheduling efficiency</span>
                  <span className="text-blue-400 font-semibold">3.5 hours saved/week</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Patient satisfaction</span>
                  <span className="text-blue-400 font-semibold">94%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeInSection>
      
      <FadeInSection direction="left">
        <div className="aspect-video bg-gradient-to-br from-blue-900/30 to-blue-700/10 rounded-xl overflow-hidden flex items-center justify-center border border-blue-500/20">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="text-2xl">▶️</span>
            </div>
            <p className="mt-4 text-white/70">Miles demo video coming soon</p>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default MilesDemo;
