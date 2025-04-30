
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { FadeInSection } from '@/components/ui/fade-in-section';

const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-500/90 to-nextgen-purple">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="flex flex-col items-center text-center max-w-xl mx-auto">
            <Button
              asChild
              size="lg"
              className="bg-[#252428] hover:bg-[#363539] text-white px-8 mb-6"
            >
              <ScrollLink 
                to="certification-pathway" 
                smooth={true} 
                offset={-100} 
                duration={800}
                className="flex items-center cursor-pointer"
              >
                Start Certification Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </ScrollLink>
            </Button>
            
            <p className="text-white/90 text-sm">
              Built by operators. Backed by tech leaders. Designed for the next generation of practice success.
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default FinalCTA;
