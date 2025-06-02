
import React from 'react';
import { Check } from "lucide-react";

interface MetricData {
  metric: string;
  traditional: string;
  nextgen: string;
  improvement: string;
}

interface ComparisonChartProps {
  data: {
    metric: string;
    traditional: string;
    nextgen: string;
    improvement: string;
  }[];
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ data }) => {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 md:p-8 rounded-xl overflow-hidden animate-fade-in shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
      <div className="mb-6">
        <h3 className="text-xl font-medium text-white">What Happens When You Add NextGen AI to Your Practice</h3>
      </div>
      
      <div className="text-sm text-white/70 mb-6">
        Real results from real practices — streamlined, automated, and optimized for growth.
      </div>
      
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
        
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <div className="col-span-1 py-4 border-t border-white/10 flex items-center text-white">
              <Check className="h-4 w-4 text-nextgen-purple mr-2 flex-shrink-0" />
              {item.metric}
            </div>
            <div className="py-4 border-t border-white/10 flex justify-center items-center">
              <div className="px-3 py-1 rounded-md bg-white/5 text-white/70">
                {item.traditional}
              </div>
            </div>
            <div className="py-4 border-t border-white/10 flex justify-center items-center">
              <div className="px-3 py-1 rounded-md bg-nextgen-purple/20 text-nextgen-purple font-medium">
                {item.nextgen}
                <span className="ml-2 text-xs bg-white/10 px-1.5 py-0.5 rounded-full text-white/80">
                  {item.improvement}
                </span>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      
      <div className="text-xs text-white/50 mt-4">
        *Data based on performance metrics from dental practices using NextGen Practice Solutions. Results may vary by practice size and location.
      </div>
    </div>
  );
};

export default ComparisonChart;
