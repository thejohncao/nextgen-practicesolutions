
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const JuvFounderAlignment = () => {
  const alignmentPoints = [
    "Low cost, high-margin model = scalable and safe",
    "No need to hire 100 people — just activate the AI stack",
    "Full training academy, VA support, and launch playbooks included",
    "I've already built it — just plug it in and grow"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black/20 to-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            👥 FOUNDER ALIGNMENT: WHY THIS WORKS
          </h2>
        </div>

        <Card className="glass-card max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="space-y-6">
              {alignmentPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-lg text-white/90">{point}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-nextgen-purple/10 rounded-lg border border-nextgen-purple/20">
              <p className="text-xl text-white/90 italic text-center">
                "You don't need to build infrastructure. You need to activate the one that already exists."
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default JuvFounderAlignment;
