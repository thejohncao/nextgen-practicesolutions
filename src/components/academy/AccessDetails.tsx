
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const AccessDetails = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-nextgen-dark via-nextgen-dark/95 to-nextgen-dark/90 z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-nextgen-purple/5 blur-3xl rounded-full -z-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-gradient">
              Access Details
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-6 border-nextgen-purple/20 text-center">
              <h3 className="text-nextgen-purple font-heading font-semibold mb-2">Blaze Clients</h3>
              <p className="text-2xl font-bold text-white mb-4">Included Free</p>
              <div className="flex items-center justify-center gap-2 text-white/70">
                <Check className="h-4 w-4 text-green-500" />
                <span>All access included</span>
              </div>
            </div>
            
            <div className="glass-card p-6 border-nextgen-blue/20 text-center">
              <h3 className="text-nextgen-blue font-heading font-semibold mb-2">Team License</h3>
              <p className="text-2xl font-bold text-white mb-4">$497<span className="text-sm text-white/70">/mo</span></p>
              <div className="flex items-center justify-center gap-2 text-white/70">
                <Check className="h-4 w-4 text-green-500" />
                <span>Per practice team</span>
              </div>
            </div>
            
            <div className="glass-card p-6 border-green-500/20 text-center">
              <h3 className="text-green-500 font-heading font-semibold mb-2">Certification</h3>
              <p className="text-2xl font-bold text-white mb-4">Included</p>
              <div className="flex items-center justify-center gap-2 text-white/70">
                <Check className="h-4 w-4 text-green-500" />
                <span>Digital badges awarded</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Book a Strategy Call
            </Button>
            
            <p className="mt-4 text-white/50 text-sm">
              See if Next-Gen Academy is right for your practice
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccessDetails;
