
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import AnimatedHeading from '@/components/ui/animated-heading';
import { FadeInSection } from '@/components/ui/fade-in-section';

const CertificationHero = () => {
  return (
    <section className="py-24 md:py-32 relative bg-gradient-to-b from-nextgen-dark to-nextgen-dark/95 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-nextgen-purple/10 blur-[100px] rounded-full animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left: Hero Text */}
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <FadeInSection>
              <AnimatedHeading
                text="Become a Certified AI Operator"
                as="h1"
                className="text-4xl md:text-5xl lg:text-6xl mb-6"
              />

              <p className="text-lg md:text-xl text-white/80 mb-8">
                The first AI certification program designed exclusively for dental teams.
                Operate real AI agents. Replace busywork. Lead the future of practice operations.
              </p>

              <Button
                asChild
                size="lg"
                className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
              >
                <ScrollLink 
                  to="certification-pathway" 
                  smooth={true} 
                  offset={-100} 
                  duration={800}
                  className="flex items-center cursor-pointer"
                >
                  Start Certification
                  <ArrowRight className="ml-2 h-5 w-5" />
                </ScrollLink>
              </Button>
            </FadeInSection>
          </div>

          {/* Right: Badge Visual */}
          <div className="w-full md:w-1/2 flex justify-center">
            <FadeInSection delay={0.2}>
              <div className="relative">
                {/* Certificate Badge */}
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-nextgen-purple via-nextgen-blue to-nextgen-purple/70 flex items-center justify-center p-1 animate-pulse-slow">
                  <div className="w-full h-full rounded-full bg-nextgen-dark flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="text-white font-heading font-bold text-xl">NextGen</div>
                      <div className="text-white font-heading font-bold text-xl">CERTIFIED</div>
                      <div className="text-white/60 text-sm mt-2">AI Operator</div>
                    </div>
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 -z-10 bg-nextgen-purple/20 rounded-full blur-xl"></div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationHero;
