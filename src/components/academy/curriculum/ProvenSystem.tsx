
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCheck } from 'lucide-react';

const ProvenSystem = () => {
  const calloutPoints = [
    "Designed by practice owners who still run real teams",
    "Tested in active offices with real patients",
    "Optimized for GHL, CRM workflows, and automation layering"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-nextgen-dark/95 to-nextgen-dark">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gradient">
            A Proven System Built for Real Dental Teams
          </h2>
          
          <p className="text-lg text-white/80 text-center max-w-3xl mx-auto mb-16">
            Our curriculum is based on thousands of real consults, objections, and team interactions 
            across private practices and high-volume groups. 
            It's not fluff. It's not theory. It's plug-and-play.
          </p>
        </FadeInSection>
        
        <FadeInSection delay={0.2}>
          <div className="max-w-3xl mx-auto">
            <Card className="glass-card border-nextgen-purple/20">
              <CardContent className="p-8">
                <div className="space-y-4">
                  {calloutPoints.map((point, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCheck className="h-6 w-6 text-nextgen-purple mr-3 flex-shrink-0" />
                      <p className="text-lg text-white/90">{point}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default ProvenSystem;
