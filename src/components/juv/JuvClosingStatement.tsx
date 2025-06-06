
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const JuvClosingStatement = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black/20 to-transparent">
      <div className="container mx-auto px-4">
        <Card className="glass-card max-w-4xl mx-auto border-nextgen-purple/20 bg-black/20 backdrop-blur-xl">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-nextgen-purple/20 flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-6">
              Ready to Scale Together?
            </h2>
            
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
              This isn't just a partnership proposal — it's a blueprint for building the future of automated healthcare. 
              Let's turn JUV into the category-defining AI-powered medspa network.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default JuvClosingStatement;
