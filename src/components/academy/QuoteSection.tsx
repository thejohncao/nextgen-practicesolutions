
import React from 'react';

const QuoteSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto glass-card p-12 bg-white/5">
          <blockquote className="text-2xl md:text-3xl font-heading font-semibold text-center text-white leading-relaxed">
            "From Chaos to Confidence.
            <br />
            <span className="text-nextgen-purple">Our Academy doesn't just train your team</span> — it transforms them into leaders ready to build the practices of tomorrow."
          </blockquote>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-nextgen-purple/10 blur-[100px] rounded-full animate-pulse-slow"></div>
      </div>
    </section>
  );
};

export default QuoteSection;
