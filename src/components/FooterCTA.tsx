import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

const FooterCTA = () => {
  const [showMobileCTA, setShowMobileCTA] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show mobile CTA after user scrolls past 500px
      if (window.scrollY > 500) {
        setShowMobileCTA(true);
      } else {
        setShowMobileCTA(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="section-padding py-20">
      <div className="container mx-auto">
        <div className="glass-card rounded-2xl p-8 md:p-12 lg:p-16 bg-gradient-to-br from-nextgen-purple/10 to-nextgen-blue/5 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-nextgen-purple/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-nextgen-blue/20 rounded-full blur-3xl -z-10"></div>
          
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-gradient">
              Ready to Run Your Practice Like a Fortune 500?
            </h2>
            
            <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto">
              Try NextGen risk-free and experience the difference in 30 days.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white" asChild>
                <Link to="/demo">
                  Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/5" asChild>
                <Link to="/join">Join the Movement</Link>
              </Button>
            </div>
            
            <p className="text-sm text-white/60 mt-6">
              Join the practices already transforming patient care with AI.
            </p>
            
            <div className="mt-8 flex flex-wrap justify-center gap-6 items-center">
              <div className="flex items-center gap-1 text-white/60 text-sm">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                HIPAA Compliant
              </div>
              <div className="flex items-center gap-1 text-white/60 text-sm">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                SOC 2 Certified
              </div>
              <div className="flex items-center gap-1 text-white/60 text-sm">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                14-Day Free Trial
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sticky Mobile CTA */}
      {showMobileCTA && (
        <div className="fixed bottom-0 left-0 w-full md:hidden bg-nextgen-dark/90 backdrop-blur-lg border-t border-white/10 z-50 animate-fade-in">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="text-sm text-white/80">Run Your Practice Smarter</div>
            <Button size="sm" className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white text-xs" asChild>
              <Link to="/demo">Book a Demo</Link>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default FooterCTA;
