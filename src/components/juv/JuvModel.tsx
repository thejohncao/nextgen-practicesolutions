
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Calculator, TrendingUp } from 'lucide-react';

const JuvModel = () => {
  const modelData = [
    {
      metric: "Monthly Gross Revenue",
      oneLocation: "$30,000",
      hundredLocations: "$3,000,000"
    },
    {
      metric: "Overhead (50%)",
      oneLocation: "$15,000",
      hundredLocations: "$1,500,000"
    },
    {
      metric: "Net EBITDA (50%)",
      oneLocation: "$15,000",
      hundredLocations: "$1,500,000"
    },
    {
      metric: "Net Income After Ops",
      oneLocation: "$15,000",
      hundredLocations: "$1,500,000/month"
    }
  ];

  return (
    <section className="py-20 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            📈 The Model
          </h2>
        </div>

        <Card className="glass-card max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 text-white font-semibold">Metric</th>
                    <th className="text-center py-4 text-white font-semibold">1 Location</th>
                    <th className="text-center py-4 text-white font-semibold">100 Locations</th>
                  </tr>
                </thead>
                <tbody>
                  {modelData.map((row, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="py-4 text-white/80">{row.metric}</td>
                      <td className="py-4 text-center text-nextgen-purple font-semibold">{row.oneLocation}</td>
                      <td className="py-4 text-center text-nextgen-purple font-semibold">{row.hundredLocations}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 p-6 bg-white/5 rounded-lg">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-6 w-6 text-nextgen-purple flex-shrink-0 mt-1" />
                <p className="text-white/80">
                  💡 Built with no leases and low fixed costs, JUV's hybrid model becomes massively scalable with the NextGen OS — unlocking profitability at every location without adding more staff.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default JuvModel;
