
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AboutCreator = () => {
  const certifications = [
    "OpenAI Certified",
    "Google AI Certified", 
    "GHL Expert"
  ];

  return (
    <section className="section-spacing bg-gradient-to-b from-black/95 to-nextgen-dark">
      <div className="container-liquid">
        <div className="text-center mb-16">
          <h2 className="text-headline-lg font-semibold bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent mb-8">
            👤 About the Creator
          </h2>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-350 max-w-4xl mx-auto">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <div className="w-24 h-24 rounded-full bg-nextgen-purple/20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-nextgen-purple">JC</span>
              </div>
              <h3 className="text-headline font-bold text-white mb-2">Jonathan Cao</h3>
              <p className="text-body-lg text-nextgen-purple font-semibold mb-6">Founder, NextGen Practice Solutions</p>
            </div>
            
            <blockquote className="text-body-lg text-white/90 mb-8 italic max-w-2xl mx-auto">
              "My mission is to modernize practices — giving teams back their time and energy to focus on what matters most."
            </blockquote>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {certifications.map((cert, index) => (
                <Badge key={index} className="bg-nextgen-purple/20 text-nextgen-purple border border-nextgen-purple/30 px-4 py-2">
                  {cert}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutCreator;
