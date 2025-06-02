
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import RainbowButton from '@/components/ui/rainbow-button';
import { Card, CardContent } from '@/components/ui/card';

const DemoFinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-black/20 via-nextgen-purple/5 to-black/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card border-nextgen-purple/30 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-nextgen-purple/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-nextgen-blue/10 rounded-full blur-3xl"></div>
            
            <CardContent className="p-8 md:p-12 relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient">
                Let's Build Your AI-Powered Front Office
              </h2>
              
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join a new generation of practices who are saving time, closing more cases, and reducing burnout—one certified coordinator and smart agent at a time.
              </p>

              <RainbowButton size="lg" asChild>
                <Link to="/pricing" className="inline-flex items-center">
                  Book a Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </RainbowButton>

              <div className="mt-8">
                <p className="text-white/60 text-sm">
                  Ready to transform your practice? Let's talk about your specific needs.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DemoFinalCTA;
