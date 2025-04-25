
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from 'react-router-dom';

const StoryCTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center glass-card p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient mb-6">
            Ready to Join the Next Generation of Practice Owners?
          </h2>
          
          <p className="text-lg text-white/70 mb-8">
            Everything we built started with solving real problems. Let us help you solve yours.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-nextgen-purple hover:bg-nextgen-purple/90"
              asChild
            >
              <Link to="/demo">
                Book Your Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 hover:bg-white/5"
              asChild
            >
              <Link to="/watch">
                <Play className="mr-2 h-4 w-4" /> See the System in Action
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryCTA;
