
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import EmailCollectionDialog from '../../EmailCollectionDialog';
import ScrollRevealWrapper from '../../animation/ScrollRevealWrapper';

const CurriculumCTA = () => {
  return (
    <section className="py-24 relative bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto glass-card p-10 text-center">
          <ScrollRevealWrapper animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-gradient">
              Start Your Certification Today
            </h2>
            
            <p className="text-lg text-white/80 mb-8">
              Learn more, test a sample, or speak with a training specialist.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button 
                size="lg"
                className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white w-full sm:w-auto"
              >
                Start Certification
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/10 hover:bg-white/5 group w-full sm:w-auto"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Sample Module
              </Button>
              
              <EmailCollectionDialog
                triggerText="Book Strategy Call"
                buttonVariant="secondary"
                buttonSize="lg"
                buttonClassName="w-full sm:w-auto"
              />
            </div>
          </ScrollRevealWrapper>
        </div>
      </div>
    </section>
  );
};

export default CurriculumCTA;
