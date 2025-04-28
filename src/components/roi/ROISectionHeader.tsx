
import React from 'react';
import { TrendingUp } from "lucide-react";

const ROISectionHeader: React.FC = () => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
      <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
        <TrendingUp className="h-4 w-4 text-nextgen-purple" />
        <span className="text-sm font-medium text-white/80">ROI Snapshot</span>
      </div>
      
      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
        Your Life, Upgraded by NextGen.
      </h2>
      
      <p className="text-lg text-white/70">
        We didn't just build software. We built freedom for practice owners.
      </p>
    </div>
  );
};

export default ROISectionHeader;
