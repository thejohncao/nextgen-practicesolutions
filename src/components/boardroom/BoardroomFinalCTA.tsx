
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeInSection } from '@/components/ui/fade-in-section';
import EmailCollectionDialog from '@/components/EmailCollectionDialog';

const BoardroomFinalCTA = () => {
  return (
    <section className="py-20 relative bg-gradient-to-b from-nextgen-dark to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient">
              Scale Without Burnout
            </h2>
            
            <p className="text-lg md:text-xl text-white/80 mb-10">
              The Boardroom is where smart practice owners go to lead.
              No more guesswork. No more juggling platforms.
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
                <Link to="/pricing">
                  Compare Plans
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </FadeInSection>
        </div>
      </div>
      
      {/* Background effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-nextgen-purple/5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-nextgen-blue/5 blur-[100px] rounded-full"></div>
      </div>
    </section>
  );
};

export default BoardroomFinalCTA;
