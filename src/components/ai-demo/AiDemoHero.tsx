
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { ArrowRight, Play } from 'lucide-react';
import RainbowButton from '@/components/ui/rainbow-button';

const AiDemoHero = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-black to-black/60 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInSection>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient">
              Meet Your AI Team
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto">
              These 4 AI agents run your front office — so you can focus on high-value care, not busywork.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <RainbowButton 
                asChild
                size="lg"
              >
                <Link to="/join">
                  Book a Live Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </RainbowButton>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/10 text-white hover:bg-white/10"
              >
                <Link to="/watch">
                  <Play className="mr-2 h-5 w-5" />
                  Watch How It Works
                </Link>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </div>

      {/* Background effect */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(155,135,245,0.15),transparent_50%)]"></div>
    </section>
  );
};

export default AiDemoHero;
