
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Play, Download } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="section-spacing bg-gradient-to-b from-mist-blue/30 to-crystal-white relative overflow-hidden">
      {/* Liquid Glass background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-glow-indigo/5 blur-3xl rounded-full animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-devon-primary/5 blur-3xl rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container-liquid relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-display text-liquid-gradient mb-8">
              The system is already built.
            </h2>
            <h3 className="text-headline text-liquid-slate mb-8">
              Let's scale it — together.
            </h3>
            <p className="text-body-lg text-liquid-slate/70 max-w-2xl mx-auto">
              Stop building from scratch. Start scaling with the most advanced practice management OS available today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild className="btn-liquid-primary group">
              <Link to="/demo" className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Book Founder Call
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Button>
            
            <Button asChild className="btn-liquid-secondary">
              <Link to="/watch" className="flex items-center">
                <Play className="h-5 w-5 mr-2" />
                View Demo
              </Link>
            </Button>
            
            <Button asChild className="btn-liquid-secondary">
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
