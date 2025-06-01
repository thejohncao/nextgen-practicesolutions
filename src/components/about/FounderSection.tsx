
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import FadeInSection from '@/components/ui/fade-in-section';

const FounderSection = () => {
  return (
    <section className="py-20 bg-black/20">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-4">
              Meet the Founder
            </h2>
          </div>
        </FadeInSection>
        
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <FadeInSection>
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-nextgen-purple/20 to-nextgen-blue/20 p-1">
                    <div className="w-full h-full rounded-full bg-nextgen-dark flex items-center justify-center">
                      <span className="text-4xl text-white font-heading">JC</span>
                    </div>
                  </div>
                </div>
              </FadeInSection>
              
              <FadeInSection delay={0.2}>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold text-white mb-4">Jonathan Cao</h3>
                  <p className="text-white/70 text-sm mb-6">Founder & AI strategist</p>
                  
                  <p className="text-white/80 text-lg mb-6 leading-relaxed">
                    Built the automation system that doubled collections at Bespoke Dental Studios using certified treatment coordinators, AI workflows, and smart patient acquisition funnels.
                  </p>
                  
                  <p className="text-white/80 text-lg mb-8 leading-relaxed">
                    Now scaling that success to empower dental practices nationwide and future-proof the front office with AI-ready teams.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button variant="outline" className="border-white/20 hover:bg-white/5" asChild>
                      <Link to="/story">Learn Our Story</Link>
                    </Button>
                    
                    <Button variant="outline" className="border-white/20 hover:bg-white/5" asChild>
                      <a href="mailto:jonathan@nextgenpractice.org">
                        Contact Jonathan
                      </a>
                    </Button>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
