
import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import AnimatedHeading from '@/components/ui/animated-heading';

const BoardroomPreviewSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-nextgen-dark to-black/80">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <AnimatedHeading
            text="The Modern Practice Dashboard"
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          />
        </FadeInSection>
        
        <FadeInSection delay={0.2}>
          <div className="max-w-5xl mx-auto relative">
            {/* Dashboard mockup */}
            <div className="glass-card border border-nextgen-purple/20 p-6 rounded-lg overflow-hidden">
              <div className="flex mb-6">
                {/* Left navigation */}
                <div className="w-48 border-r border-white/10 pr-4">
                  <div className="space-y-4">
                    {['Dashboard', 'Patients', 'Agents', 'Training', 'Reports', 'Automations'].map((item, index) => (
                      <div 
                        key={index} 
                        className={`px-3 py-2 rounded-md ${index === 0 ? 'bg-nextgen-purple/20 text-white' : 'text-white/60 hover:bg-white/5'} cursor-pointer transition-all`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Main content */}
                <div className="flex-1 pl-6">
                  {/* Top stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {['Practice Revenue', 'Agent ROI', 'Staff Training Progress'].map((stat, index) => (
                      <div key={index} className="glass-card p-4 rounded-md">
                        <h4 className="text-sm text-white/60 mb-2">{stat}</h4>
                        <div className="h-8 bg-white/5 rounded-md animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Activity feed */}
                  <div className="glass-card p-4 rounded-md mb-6">
                    <h4 className="text-sm text-white/60 mb-3">Activity Feed</h4>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((_, index) => (
                        <div key={index} className="flex items-center bg-white/5 p-2 rounded-md">
                          <div className="w-7 h-7 rounded-full bg-nextgen-purple/30 mr-3"></div>
                          <div className="flex-1">
                            <div className="h-3 w-3/4 bg-white/10 rounded-full mb-1"></div>
                            <div className="h-2 w-1/2 bg-white/5 rounded-full"></div>
                          </div>
                          <div className="text-xs text-white/40">Just now</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Toggle tabs */}
                  <div className="flex border-b border-white/10 mb-4">
                    {['Academy', 'CRM', 'Campaigns'].map((tab, index) => (
                      <div 
                        key={index} 
                        className={`px-4 py-2 ${index === 0 ? 'border-b-2 border-nextgen-purple text-white' : 'text-white/60'} cursor-pointer`}
                      >
                        {tab}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Glowing effect */}
            <div className="absolute -z-10 inset-0 blur-3xl bg-nextgen-purple/5 rounded-full"></div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default BoardroomPreviewSection;
