
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const PromotionalBanner = () => {
  return (
    <div className="mx-4 my-4">
      <div className="bg-gradient-to-r from-coral-accent to-coral-accent/80 rounded-2xl p-6 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 opacity-20">
          <Sparkles className="w-24 h-24" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">SPRING SPECIAL</span>
          </div>
          
          <h2 className="text-xl font-bold mb-2">
            Spring Glow Package
          </h2>
          
          <p className="text-white/90 text-sm mb-4">
            Get 3 HydraFacials + LED Light Therapy for the price of 2. 
            Perfect for refreshing your skin this season.
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold">$450</span>
              <span className="text-white/80 text-sm line-through ml-2">$675</span>
              <div className="text-xs text-white/90">Save $225 • Members save $337.50</div>
            </div>
            
            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors">
              <span className="text-sm font-medium">Learn More</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;
