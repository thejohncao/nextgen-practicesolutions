
import React from 'react';
import { TrendingUp, Check } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SparkleText from './effects/SparkleText';

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

const ROISection = () => {
  return (
    <section id="roi" className="section-padding py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-nextgen-purple/8 blur-[150px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-nextgen-blue/8 blur-[120px] rounded-full animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <TrendingUp className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">ROI Snapshot</span>
          </div>
          
          <SparkleText>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
              The Results Speak for Themselves
            </h2>
          </SparkleText>
        </div>
        
        <div className="hidden md:block glass-card p-6 md:p-8 rounded-xl overflow-hidden backdrop-blur-lg border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
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
              <div 
                key={index} 
                className="grid grid-cols-3 gap-4 py-4 border-t border-white/10 hover:bg-white/5 transition-all duration-300"
              >
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
                  <div className="glass-card p-6 backdrop-blur-lg border border-white/10 rounded-xl hover:shadow-lg transition-all duration-300 hover:bg-white/5">
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
          <p className="text-sm text-white/50 max-w-2xl mx-auto glass-card px-4 py-2 inline-block backdrop-blur-md border border-white/5">
            *Data based on performance metrics from 500+ dental practices using NextGen Practice Solutions 
            compared to industry averages. Results may vary based on practice size and location.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ROISection;
