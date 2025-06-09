
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Download, Play } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="section-spacing bg-gradient-to-b from-black/95 to-nextgen-dark relative overflow-hidden">
      {/* Dark Glass background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nextgen-purple/10 blur-3xl rounded-full animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-nextgen-blue/10 blur-3xl rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container-liquid relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-display bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent mb-8">
              🎯 Ready to Launch Your Own Branded Membership Engine?
            </h2>
            <p className="text-headline text-white/70 mb-8 max-w-2xl mx-auto">
              The system is already built. Just choose how you want to scale it.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white font-semibold rounded-lg px-6 py-3 transition-all duration-300 hover:scale-105 group">
              <Link to="/demo" className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Book Founder Call
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Button>
            
            <Button asChild className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium rounded-lg px-6 py-3 transition-all duration-300 hover:scale-105">
              <Link to="/downloads" className="flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Download One-Pager PDF
              </Link>
            </Button>
            
            <Button asChild className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium rounded-lg px-6 py-3 transition-all duration-300 hover:scale-105">
              <Link to="/watch" className="flex items-center">
                <Play className="h-5 w-5 mr-2" />
                See Full Demo Walkthrough
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
