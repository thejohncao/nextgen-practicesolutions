
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const StoryAndFounderSection = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="glass-card p-8 md:p-12 rounded-xl">
          {/* Why We Built NextGen */}
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-gradient">
              Why We Built NextGen
            </h3>
            <p className="text-white/80 text-lg leading-relaxed max-w-3xl mx-auto">
              Running a modern practice shouldn't feel overwhelming. 
              We saw talented owners spending all their energy on admin, chasing patients, and fighting outdated systems.
              So we built NextGen — the AI-powered Operating System designed to automate, grow, and future-proof your business.
              Because the future of healthcare isn't just care — it's innovation.
            </p>
          </div>
          
          <Separator className="bg-white/10 my-8" />
          
          {/* Meet the Founder */}
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-gradient">
              Meet the Founder
            </h3>
            
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gradient-to-br from-nextgen-purple/20 to-nextgen-blue/20 p-1 mb-6">
                <div className="w-full h-full rounded-full bg-nextgen-dark flex items-center justify-center">
                  <span className="text-2xl md:text-3xl text-white font-heading">JC</span>
                </div>
              </div>
              
              <p className="text-white/80 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
                Jonathan Cao spent years building one of the most advanced AI-powered dental studios in the country.
                After mastering practice growth and automation firsthand, he founded NextGen to share the blueprint with others ready to lead the future.
                Today, Jonathan and the NextGen team help practice owners transform operations, accelerate growth, and reclaim their time — powered by AI.
              </p>
              
              <p className="text-xl text-white/90 italic mb-8">
                "The future belongs to those who automate, innovate, and scale. We're here to help you do it faster."
              </p>
              
              <Button variant="outline" className="border-white/20 hover:bg-white/5" asChild>
                <Link to="/story">Learn Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryAndFounderSection;
