
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import RainbowButton from '@/components/ui/rainbow-button';

const CertificationCTA = () => {
  return (
    <section className="py-16 md:py-20 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <div className="flex flex-col items-center text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient">
                Ready to Elevate Your Team?
              </h2>
              
              <p className="text-lg text-white/80 max-w-2xl">
                Transform your staff into confidence-driven experts who know exactly how to communicate,
                follow up, and close treatment with NextGen's certification programs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <RainbowButton asChild size="lg">
                  <Link to="/academy">
                    Enroll in the Academy
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </RainbowButton>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                  asChild
                >
                  <Link to="/academy/curriculum">
                    <Eye className="mr-2 h-5 w-5" />
                    Preview the Systems Operator Track
                  </Link>
                </Button>
              </div>
              
              <Button 
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/5"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Badge Samples
              </Button>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default CertificationCTA;
