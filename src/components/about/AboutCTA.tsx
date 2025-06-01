
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeInSection from '@/components/ui/fade-in-section';

const AboutCTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-4">
              Let's Work Together
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Ready to transform your practice with AI-trained teams and proven systems?
            </p>
          </div>
        </FadeInSection>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeInSection>
              <div className="glass-card p-6 text-center">
                <Users className="w-12 h-12 text-nextgen-purple mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-4">Explore the Academy</h3>
                <p className="text-white/70 text-sm mb-6">
                  Browse our certification programs and training modules
                </p>
                <Button 
                  className="w-full bg-nextgen-purple hover:bg-nextgen-purple/90"
                  asChild
                >
                  <Link to="/academy">
                    View Academy <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={0.1}>
              <div className="glass-card p-6 text-center">
                <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-4">Contact Jonathan</h3>
                <p className="text-white/70 text-sm mb-6">
                  Discuss custom solutions for your practice
                </p>
                <Button 
                  variant="outline"
                  className="w-full border-white/20 hover:bg-white/5"
                  asChild
                >
                  <a href="mailto:jonathan@nextgenpractice.org">
                    Send Email
                  </a>
                </Button>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={0.2}>
              <div className="glass-card p-6 text-center">
                <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-4">Join Partner Network</h3>
                <p className="text-white/70 text-sm mb-6">
                  Become a certified NextGen practice
                </p>
                <Button 
                  variant="outline"
                  className="w-full border-white/20 hover:bg-white/5"
                  asChild
                >
                  <Link to="/join">
                    Learn More
                  </Link>
                </Button>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
