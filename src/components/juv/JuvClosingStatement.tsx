
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const JuvClosingStatement = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="glass-card border-nextgen-purple/20">
            <CardContent className="p-12">
              <div className="w-16 h-1 bg-gradient-to-r from-nextgen-purple to-nextgen-blue mx-auto mb-8 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
                Ready to Build the Future?
              </h2>
              <p className="text-xl text-white/80 leading-relaxed">
                The medspa industry is evolving rapidly. Those who embrace AI-powered automation 
                will lead the next generation of successful practices.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default JuvClosingStatement;
