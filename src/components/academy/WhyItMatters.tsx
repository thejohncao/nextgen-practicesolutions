
import React from 'react';
import { Check } from "lucide-react";

const WhyItMatters = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-nextgen-dark via-nextgen-dark/95 to-nextgen-dark z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-gradient">
            The Fastest-Growing Practices Have One Thing in Common: Trained Teams.
          </h2>
          
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-xl">
            <p className="text-lg text-white/80 mb-6">
              Most practices lose thousands every month—not because of bad dentistry, but because of missed calls, unscheduled treatment, and untrained teams.
            </p>
            
            <p className="text-lg text-white/80">
              Next-Gen Academy closes that gap by certifying your staff in real-world sales, systems, and patient experience excellence—without creating extra work for you.
            </p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg">
                <div className="rounded-full bg-green-500/20 p-1 mt-1">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-white/70 text-left text-sm">Stop wasting $10k+/month on missed calls and unscheduled treatment</p>
              </div>
              
              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg">
                <div className="rounded-full bg-green-500/20 p-1 mt-1">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-white/70 text-left text-sm">Train your team without taking time away from patients</p>
              </div>
              
              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg">
                <div className="rounded-full bg-green-500/20 p-1 mt-1">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-white/70 text-left text-sm">Implement proven systems that increase case acceptance</p>
              </div>
              
              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-lg">
                <div className="rounded-full bg-green-500/20 p-1 mt-1">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-white/70 text-left text-sm">Convert more new patients and improve retention</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItMatters;
