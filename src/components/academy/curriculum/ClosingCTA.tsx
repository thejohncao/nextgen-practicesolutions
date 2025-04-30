
import React from 'react';
import { Button } from '@/components/ui/button';
import { FadeInSection } from '@/components/ui/fade-in-section';
import EmailCollectionDialog from '@/components/EmailCollectionDialog';

const ClosingCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-nextgen-dark/90 to-black">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center text-gradient">
            If Your Team Can Learn It, They Can Close It.
          </h2>
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-lg md:text-xl text-white/80 mb-4">
              You don't need more leads.
              You don't need to discount treatment.
              You need your team to be confident, consistent, and accountable — that's what the Academy delivers.
            </p>
            
            <p className="text-lg md:text-xl text-white/80">
              Whether you're hiring someone new or leveling up a seasoned team, this is the only 
              dental-specific certification that turns your staff into closers.
            </p>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white"
            >
              Enroll Your Team
            </Button>
            
            <EmailCollectionDialog 
              triggerText="Request Bulk Pricing for DSOs"
              buttonVariant="outline"
              buttonSize="lg"
              buttonClassName="border-white/10 hover:bg-white/5"
            />
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default ClosingCTA;
