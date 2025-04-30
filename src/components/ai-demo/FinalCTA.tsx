
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import RainbowButton from '@/components/ui/rainbow-button';

const FinalCTA = () => {
  return (
    <section className="py-20 bg-black/40">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient">
              Ready to Activate Your AI Team?
            </h2>
            
            <p className="text-lg md:text-xl text-white/80 mb-10">
              No more missed leads. No more manual chaos. Just results.
            </p>
          </FadeInSection>
          
          <FadeInSection delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <RainbowButton 
                asChild
                size="lg" 
              >
                <Link to="/join">
                  Book Your Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </RainbowButton>
              
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="border-white/10 text-white hover:bg-white/10"
              >
                <Link to="/pricing">
                  Start with Spark
                </Link>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
