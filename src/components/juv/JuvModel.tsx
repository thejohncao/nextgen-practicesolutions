
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Calculator, TrendingUp } from 'lucide-react';

const JuvModel = () => {
  const modelData = [{
    metric: "Monthly Gross Revenue",
    oneLocation: "$30,000",
    hundredLocations: "$3,000,000"
  }, {
    metric: "Overhead (50%)",
    oneLocation: "$15,000",
    hundredLocations: "$1,500,000"
  }, {
    metric: "Net EBITDA (50%)",
    oneLocation: "$15,000",
    hundredLocations: "$1,500,000"
  }, {
    metric: "Net Income After Ops",
    oneLocation: "$15,000",
    hundredLocations: "$1,500,000/month"
  }];

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            💰 THE MODEL: How We Scale to $10M ARR
          </h2>
          <p className="text-xl text-white/70">
            Low overhead, high margins, AI-powered efficiency — built to scale exponentially.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Single Location */}
            <Card className="glass-card border-blue-500/20 bg-blue-50/5">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <DollarSign className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Single Location Model</h3>
                  <p className="text-white/60">Foundation for scalable growth</p>
                </div>
                
                <div className="space-y-4">
                  {modelData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-white/10 last:border-b-0">
                      <span className="text-white/80">{item.metric}</span>
                      <span className="text-blue-400 font-semibold">{item.oneLocation}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 100 Locations */}
            <Card className="glass-card border-green-500/20 bg-green-50/5">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">100 Locations Network</h3>
                  <p className="text-white/60">Exit-ready scale with AI automation</p>
                </div>
                
                <div className="space-y-4">
                  {modelData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-white/10 last:border-b-0">
                      <span className="text-white/80">{item.metric}</span>
                      <span className="text-green-400 font-semibold">{item.hundredLocations}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Insights */}
          <Card className="glass-card border-nextgen-purple/20 bg-nextgen-purple/5">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Calculator className="h-12 w-12 text-nextgen-purple mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">The AI Advantage</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-nextgen-purple mb-2">50%</div>
                  <p className="text-white/70">Lower overhead vs traditional medspas</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-nextgen-purple mb-2">100x</div>
                  <p className="text-white/70">Revenue scaling without proportional hiring</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-nextgen-purple mb-2">90%</div>
                  <p className="text-white/70">Operations automated through AI agents</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default JuvModel;
