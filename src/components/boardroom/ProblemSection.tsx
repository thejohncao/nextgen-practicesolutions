
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const ProblemSection = () => {
  const painPoints = [
    "No clear visibility on follow-ups or team performance",
    "Treatment plans go cold without anyone noticing",
    "Owners stuck reacting instead of leading"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black/60 to-nextgen-dark/95">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gradient">
              The Problem
            </h2>
            
            <div className="text-xl md:text-2xl text-white text-center mb-12">
              <p>You can't scale chaos.</p>
              <p>You need to lead with clarity — but most practices rely on broken systems, undertrained staff, and disconnected data.</p>
            </div>
          </FadeInSection>
          
          <FadeInSection delay={0.2}>
            <h3 className="text-xl font-medium mb-6 text-center text-white/90">
              Common pain points:
            </h3>
            
            <div className="space-y-4">
              {painPoints.map((point, index) => (
                <Card key={index} className="glass-card bg-red-500/5 border-red-500/20">
                  <CardContent className="p-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
                    <p className="text-white/90">{point}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
