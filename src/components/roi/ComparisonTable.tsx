
import React from 'react';
import { Check } from "lucide-react";

interface ComparisonDataItem {
  metric: string;
  traditional: string;
  nextgen: string;
  improvement: string;
}

interface ComparisonTableProps {
  comparisonData: ComparisonDataItem[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ comparisonData }) => {
  return (
    <div className="glass-card p-6 md:p-8 rounded-xl overflow-hidden animate-fade-in" style={{animationDelay: '400ms'}}>
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
  );
};

export default ComparisonTable;
