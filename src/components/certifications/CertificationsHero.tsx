
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import AnimatedHeading from '@/components/ui/animated-heading';
import BackgroundCircles from '@/components/effects/BackgroundCircles';

const CertificationsHero = () => {
  return (
    <section className="py-24 md:py-32 relative bg-gradient-to-b from-nextgen-dark to-nextgen-dark/95 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <BackgroundCircles 
          variant="default" 
          primaryColor="rgba(155, 135, 245, 0.12)" 
          secondaryColor="rgba(30, 174, 219, 0.08)" 
        />
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-nextgen-purple/10 blur-[100px] rounded-full animate-pulse-slow"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInSection>
            <AnimatedHeading
              text="Certifications That Build Confident, Conversion-Focused Teams"
              as="h1"
              className="text-4xl md:text-5xl lg:text-6xl mb-6"
            />
            
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              From front office communication to campaign execution — your team will walk away with real, 
              platform-backed skills and proof of mastery.
            </p>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default CertificationsHero;
