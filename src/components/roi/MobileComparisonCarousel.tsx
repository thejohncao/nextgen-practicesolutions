
import React from 'react';
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="md:hidden space-y-6">
      {comparisonData.map((item, index) => (
        <div 
          key={index} 
          className={cn(
            "backdrop-blur-xl bg-white/5 border border-white/10",
            "p-5 rounded-xl animate-fade-in", 
            "shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
          )}
          style={{animationDelay: `${index * 100}ms`}}
        >
          <div className="flex items-center mb-4">
            <Check className="h-4 w-4 text-nextgen-purple mr-2" />
            <h4 className="text-lg font-medium text-white">{item.metric}</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-md bg-white/5">
              <div className="text-sm text-nextgen-gray mb-1">Old Way</div>
              <div className="font-medium text-white/80">{item.traditional}</div>
            </div>
            
            <div className="p-3 rounded-md bg-nextgen-purple/10">
              <div className="text-sm text-nextgen-purple mb-1">With NextGen AI</div>
              <div className="font-medium text-white flex items-center">
                {item.nextgen}
                <span className="ml-2 text-xs bg-white/10 px-1.5 py-0.5 rounded-full text-white/80">
                  {item.improvement}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileComparisonCarousel;
