
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const JuvClosingStatement = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-nextgen-dark via-black/90 to-nextgen-purple/20">
        <div className="absolute inset-0 bg-black/50" style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.8) 100%)'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Card className="glass-card max-w-4xl mx-auto border-nextgen-purple/20 bg-black/20 backdrop-blur-xl">
          <CardContent className="p-8 lg:p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-nextgen-purple/20 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-nextgen-purple to-nextgen-blue rounded-full" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">
              Ready to Transform Your Practice?
            </h2>
            
            <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto">
              Join the next generation of dental practices leveraging AI to scale operations, 
              increase collections, and deliver exceptional patient experiences.
            </p>
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-nextgen-purple/30 to-transparent" />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default JuvClosingStatement;
