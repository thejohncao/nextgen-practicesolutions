import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 pb-20 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-nextgen-purple/5 blur-3xl rounded-full -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm">
              <span className="text-gradient-primary font-semibold">Industry First</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold leading-tight text-gradient">
              The World's First AI Team for Dental Practices
            </h1>
            
            <p className="text-lg sm:text-xl text-white/70 max-w-lg">
              The world's first AI team designed to run your practice—so you can focus on care, not chaos.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white animate-fade-in"
                style={{ animationDelay: '200ms' }}
              >
                Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 hover:bg-white/5 animate-fade-in"
                style={{ animationDelay: '400ms' }}
              >
                <Play className="mr-2 h-4 w-4" /> See How It Works
              </Button>
            </div>

            {/* Testimonial Quote */}
            <div className="glass-card p-6 mt-8 animate-fade-in" style={{ animationDelay: '600ms' }}>
              <p className="text-white/90 italic">
                "Within 30 days of installing NextGen, our no-shows dropped by half—and we didn't even change our staff."
              </p>
              <p className="text-sm text-white/60 mt-2">
                — Dr. Rachel S., Cosmetic Dentist, Irvine, CA
              </p>
            </div>
            
            <div className="flex items-center gap-4 pt-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 border-2 border-nextgen-dark"></div>
                ))}
              </div>
              <p className="text-sm text-white/60">
                <span className="text-white font-medium">500+</span> practices trust NextGen
              </p>
            </div>
          </div>
          
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <div className="relative">
              <div className="glass-card p-6 rounded-2xl animate-pulse-glow">
                <div className="aspect-video bg-gradient-to-br from-nextgen-dark via-nextgen-dark to-nextgen-dark/80 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-nextgen-dark/80 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-full bg-nextgen-purple/20 flex items-center justify-center">
                        <Play className="h-8 w-8 text-nextgen-purple" />
                      </div>
                      <p className="mt-4 text-sm text-white/60">Watch Demo Video</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-nextgen-blue/10 rounded-full blur-xl"></div>
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-nextgen-purple/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
