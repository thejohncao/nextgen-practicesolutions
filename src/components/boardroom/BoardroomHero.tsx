
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeInSection } from '@/components/ui/fade-in-section';
import EmailCollectionDialog from '@/components/EmailCollectionDialog';

const BoardroomHero = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-black to-black/60 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInSection>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient">
              Run Your Practice from One AI-Powered Command Center
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-3xl mx-auto">
              The NextGen Boardroom gives you visibility, control, and scale — without micromanagement or burnout.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EmailCollectionDialog
                triggerText="Request a Demo"
                buttonVariant="default"
                buttonSize="lg"
                buttonClassName="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
              />

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/10 text-white hover:bg-white/10"
              >
                <Link to="/watch">
                  <Play className="mr-2 h-5 w-5" />
                  See How It Works
                </Link>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </div>

      {/* Background effect */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(75,85,245,0.15),transparent_50%)]"></div>
    </section>
  );
};

export default BoardroomHero;
