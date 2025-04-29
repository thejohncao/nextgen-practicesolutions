
import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LabelList
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface MetricData {
  metric: string;
  traditional: string;
  nextgen: string;
  improvement: string;
  traditionalValue: number;
  nextgenValue: number;
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
  const [showChart, setShowChart] = useState<boolean>(true);
  
  // Process data for chart visualization
  const chartData: MetricData[] = data.map(item => {
    // Extract numeric values for chart
    let traditionalValue = 0;
    let nextgenValue = 0;
    
    // Parse values from strings like "3-5 FTE" or "~40%"
    if (item.metric === "Admin Staff Needed") {
      traditionalValue = 4; // Average of 3-5
      nextgenValue = 1; // Average of 0-2
    }
    else if (item.metric === "Treatment Acceptance Rate") {
      traditionalValue = 40; // ~40%
      nextgenValue = 75; // Average of 70-80%
    }
    else if (item.metric === "No-Show Rate") {
      traditionalValue = 27.5; // Average of 25-30%
      nextgenValue = 10; // <10%
    }
    else if (item.metric === "Annual Revenue Growth") {
      traditionalValue = 4; // Average of 3-5%
      nextgenValue = 22.5; // Average of 15-30%
    }
    
    return {
      ...item,
      traditionalValue,
      nextgenValue
    };
  });

  // Chart configuration
  const chartConfig = {
    "Traditional": { color: "#8E9196" },
    "NextGen": { color: "#9b87f5" }
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 md:p-8 rounded-xl overflow-hidden animate-fade-in shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-xl font-medium text-white">What Happens When You Add NextGen AI to Your Practice</h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/70">Table</span>
          <Switch 
            checked={showChart} 
            onCheckedChange={setShowChart} 
            className="data-[state=checked]:bg-nextgen-purple"
          />
          <span className="text-sm text-white/70">Chart</span>
        </div>
      </div>
      
      <div className="text-sm text-white/70 mb-6">
        Real results from real practices — streamlined, automated, and optimized for growth.
      </div>
      
      {showChart ? (
        <div className="h-[400px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={chartData}
                margin={{ top: 20, right: 30, left: 120, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.5)" />
                <YAxis 
                  dataKey="metric" 
                  type="category" 
                  stroke="rgba(255,255,255,0.5)"
                  width={110}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar 
                  dataKey="traditionalValue" 
                  name="Traditional" 
                  fill={chartConfig.Traditional.color}
                  radius={[0, 0, 0, 0]}
                >
                  <LabelList 
                    dataKey="traditional" 
                    position="center" 
                    fill="white" 
                    style={{ fontWeight: 'bold' }}
                  />
                </Bar>
                <Bar 
                  dataKey="nextgenValue" 
                  name="NextGen" 
                  fill={chartConfig.NextGen.color}
                  radius={[0, 4, 4, 0]}
                >
                  <LabelList 
                    dataKey="nextgen" 
                    position="center" 
                    fill="white" 
                    style={{ fontWeight: 'bold' }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      ) : (
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
          
          {chartData.map((item, index) => (
            <React.Fragment key={index}>
              <div className="col-span-1 py-4 border-t border-white/10 flex items-center text-white">
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
      )}
      
      <div className="text-xs text-white/50 mt-4">
        *Data based on performance metrics from dental practices using NextGen Practice Solutions. Results may vary by practice size and location.
      </div>
    </div>
  );
};

export default ComparisonChart;
