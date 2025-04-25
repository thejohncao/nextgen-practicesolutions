
import React from 'react';
import { Button } from "@/components/ui/button";
import EmailCollectionDialog from '../EmailCollectionDialog';

const FinalCTA = () => {
  return (
    <section className="py-24 relative bg-gradient-to-b from-nextgen-dark to-nextgen-dark/95">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-gradient">
            Are You Ready to Build the Future?
          </h2>
          
          <p className="text-lg md:text-xl text-white/80 mb-12">
            Join a growing network of certified, future-ready professionals changing the face of modern practice management.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto"
            >
              Enroll Today
            </Button>
            
            <EmailCollectionDialog
              triggerText="Book a Discovery Call"
              buttonVariant="outline"
              buttonSize="lg"
              buttonClassName="border-white/10 hover:bg-white/5 px-8 py-6 text-lg rounded-lg w-full md:w-auto"
            />
          </div>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-nextgen-blue/10 blur-[100px] rounded-full animate-pulse-slow"></div>
      </div>
    </section>
  );
};

export default FinalCTA;
