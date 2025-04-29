
import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

const SolutionsHero = () => {
  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Sparkles className="h-5 w-5 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">AI-Powered Solutions</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-gradient">
            Meet Your AI Practice Growth Team
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Four specialized AI agents, each focused on a critical area of your practice's success — from front office operations to team development.
          </p>
          
          <div className="inline-flex items-center gap-2 text-nextgen-purple text-sm font-medium">
            <Bot className="h-5 w-5" />
            <span>Scroll down to explore each agent</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-nextgen-purple/10 blur-[100px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#E87C7C]/10 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      
      {/* Added floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 opacity-10 animate-float">
          <Bot className="h-12 w-12 text-white" />
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-10 animate-float" style={{animationDelay: '1s'}}>
          <Sparkles className="h-12 w-12 text-white" />
        </div>
      </div>
    </section>
  );
};

export default SolutionsHero;
