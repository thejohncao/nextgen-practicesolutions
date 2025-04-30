
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import FloatingAgentAvatars from '@/components/hero/FloatingAgentAvatars';
import PulseBeams from '@/components/effects/PulseBeams';

const AiTeamHero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 z-0">
        <PulseBeams />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Hero content */}
          <FadeInSection delay={0.2}>
            <div className="space-y-6 max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient">
                The World's First AI Team for Dental Practices
              </h1>
              
              <p className="text-lg md:text-xl text-white/80">
                Automate the work. Amplify the human.
                Meet the 4 AI agents that run your front office, nurture leads, and close treatment while your team focuses on care.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
                >
                  <Link to="/join">
                    Book Your AI Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </FadeInSection>
          
          {/* Right side - Floating agent avatars */}
          <div className="hidden lg:block">
            <FadeInSection delay={0.5}>
              <FloatingAgentAvatars />
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiTeamHero;
