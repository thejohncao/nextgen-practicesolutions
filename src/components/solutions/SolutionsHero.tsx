
import React from 'react';

const SolutionsHero = () => {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-gradient">
            Three Pillars. One Smart System for Practice Success.
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            NextGen Practice Solutions organizes everything your practice needs into three scalable, AI-powered divisions.
            Each pillar unlocks the systems, strategies, and support your practice needs to grow — stage by stage.
          </p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-nextgen-purple/10 blur-[100px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#E87C7C]/10 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
    </section>
  );
};

export default SolutionsHero;
