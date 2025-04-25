
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const FounderSection = () => {
  return (
    <section id="founder" className="section-padding py-20">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Meet the Founder Behind the Movement
          </h2>
        </div>
        
        <div className="glass-card p-6 md:p-10 rounded-xl">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/3 flex justify-center">
              <div className="w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-nextgen-purple/20 to-nextgen-blue/20 p-1">
                <div className="w-full h-full rounded-full bg-nextgen-dark flex items-center justify-center">
                  <span className="text-3xl text-white font-heading">JC</span>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <p className="text-white/90 text-lg italic mb-6">
                "I created NextGen because I saw firsthand how outdated systems were holding back great practices. After doubling revenue at my own office through AI automation, I realized this wasn't just a tool—it was a movement. Now we're helping modern practices run smarter, close more treatment, and lead with purpose."
              </p>
              
              <div className="flex flex-col items-start">
                <p className="text-white font-semibold text-lg">
                  — Jonathan Cao
                </p>
                <p className="text-white/70 text-sm">
                  Founder of NextGen Practice Solutions
                </p>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="border-white/20 hover:bg-white/5" asChild>
                  <Link to="/story">Learn How We Built It</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
