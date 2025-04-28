
import React from 'react';
import { TrendingUp, Check, Clock, Zap, Heart } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const comparisonData = [
  {
    metric: "Admin Staff Needed",
    traditional: "3–5 FTE",
    nextgen: "0–2 with AI",
    improvement: "-60%"
  },
  {
    metric: "Treatment Acceptance Rate",
    traditional: "~40%",
    nextgen: "70–80%+",
    improvement: "+100%"
  },
  {
    metric: "No-Show Rate",
    traditional: "25–30%",
    nextgen: "<10%",
    improvement: "-60%"
  },
  {
    metric: "Annual Revenue Growth",
    traditional: "3–5%",
    nextgen: "15–30%+",
    improvement: "+500%"
  }
];

const benefitCards = [
  {
    icon: Clock,
    title: "Save Your Time",
    description: "Eliminate busywork. Automate operations. Buy back the hours you can never replace."
  },
  {
    icon: Zap,
    title: "Recharge Your Energy",
    description: "Remove chaos from your day. Empower your team. Grow with momentum, not stress."
  },
  {
    icon: Heart,
    title: "Win Back Your Life",
    description: "Spend time with family. Lead with vision, not exhaustion. Build a life outside the office."
  }
];

const ROISection = () => {
  return (
    <section id="roi" className="section-padding py-20">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <TrendingUp className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">ROI Snapshot</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            Your Life, Upgraded by NextGen
          </h2>
          
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            We didn't just build software. We built freedom for practice owners.
          </p>
        </div>
        
        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {benefitCards.map((card, index) => (
            <div 
              key={index}
              className="glass-card p-6 rounded-xl flex flex-col items-center text-center space-y-4 transform transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="w-12 h-12 rounded-full bg-nextgen-purple/20 flex items-center justify-center mb-2">
                <card.icon size={24} className="text-nextgen-purple" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-medium text-white">{card.title}</h3>
              <p className="text-white/70 whitespace-pre-line leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="hidden md:block glass-card p-6 md:p-8 rounded-xl overflow-hidden mb-8">
          <div className="grid grid-cols-3 gap-4 mb-6 text-sm md:text-base">
            <div className="col-span-1 font-medium text-white/80">Metric</div>
            <div className="text-center font-medium text-white/80">
              <span className="block text-sm text-nextgen-gray mb-1">Old Way</span>
              Traditional Practice
            </div>
            <div className="text-center font-medium text-white/80">
              <span className="block text-sm text-nextgen-purple mb-1">AI-Powered Practice</span>
              With NextGen AI
            </div>
          </div>
          
          <div className="space-y-4">
            {comparisonData.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 py-4 border-t border-white/10">
                <div className="col-span-1 flex items-center text-white">
                  <Check className="h-4 w-4 text-nextgen-purple mr-2 flex-shrink-0" />
                  <span>{item.metric}</span>
                </div>
                <div className="flex justify-center items-center">
                  <div className="px-3 py-1 rounded-md bg-white/5 text-white/70">
                    {item.metric === "Treatment Acceptance Rate" ? (
                      <div className="flex items-center justify-center">
                        <div className="w-16 h-3 bg-white/10 rounded-full overflow-hidden mr-2">
                          <div className="h-full bg-nextgen-gray w-2/5"></div>
                        </div>
                        {item.traditional}
                      </div>
                    ) : (
                      item.traditional
                    )}
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="px-3 py-1 rounded-md bg-nextgen-purple/20 text-nextgen-purple font-medium">
                    {item.metric === "Treatment Acceptance Rate" ? (
                      <div className="flex items-center justify-center">
                        <div className="w-16 h-3 bg-white/10 rounded-full overflow-hidden mr-2">
                          <div className="h-full bg-nextgen-purple w-4/5"></div>
                        </div>
                        {item.nextgen}
                      </div>
                    ) : (
                      item.nextgen
                    )}
                    <span className="ml-2 text-xs bg-white/10 px-1.5 py-0.5 rounded-full text-white/80">
                      {item.improvement}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {comparisonData.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="glass-card p-6 rounded-xl space-y-4">
                    <div className="flex items-center text-white mb-4">
                      <Check className="h-4 w-4 text-nextgen-purple mr-2 flex-shrink-0" />
                      <span className="font-medium">{item.metric}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-white/60 mb-2">Traditional</div>
                        <div className="px-3 py-2 rounded-md bg-white/5 text-white/70">
                          {item.traditional}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-white/60 mb-2">With NextGen</div>
                        <div className="px-3 py-2 rounded-md bg-nextgen-purple/20 text-nextgen-purple">
                          {item.nextgen}
                          <span className="ml-2 text-xs bg-white/10 px-1.5 py-0.5 rounded-full text-white/80">
                            {item.improvement}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden" />
            <CarouselNext className="hidden" />
          </Carousel>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-sm text-white/50 max-w-2xl mx-auto">
            *Data based on performance metrics from 500+ dental practices using NextGen Practice Solutions 
            compared to industry averages. Results may vary based on practice size and location.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ROISection;
