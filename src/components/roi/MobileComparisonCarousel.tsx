
import React from 'react';
import { Check } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface ComparisonDataItem {
  metric: string;
  traditional: string;
  nextgen: string;
  improvement: string;
}

interface MobileComparisonCarouselProps {
  comparisonData: ComparisonDataItem[];
}

const MobileComparisonCarousel: React.FC<MobileComparisonCarouselProps> = ({ comparisonData }) => {
  return (
    <div className="md:hidden animate-fade-in" style={{animationDelay: '400ms'}}>
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
      </Carousel>
    </div>
  );
};

export default MobileComparisonCarousel;
