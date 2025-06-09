
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Play, Download } from 'lucide-react';
import RainbowButton from '@/components/ui/rainbow-button';

const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
              The system is already built.
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Let's scale it — together.
            </h3>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Stop building from scratch. Start scaling with the most advanced practice management OS available today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RainbowButton size="lg" asChild className="px-8 py-4">
              <Link to="/demo" className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Book Founder Call
                <span className="ml-2">→</span>
              </Link>
            </RainbowButton>
            
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-4">
              <Link to="/watch" className="flex items-center">
                <Play className="h-5 w-5 mr-2" />
                View Demo
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-4">
              <Link to="/pricing" className="flex items-center">
                <Download className="h-5 w-5 mr-2" />
                License NextGen OS
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
