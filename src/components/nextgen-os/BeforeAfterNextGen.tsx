
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { X, Check } from 'lucide-react';

const BeforeAfterNextGen = () => {
  const comparisons = [
    {
      without: "Manual onboarding chaos",
      with: "Automated workflows + SOPs"
    },
    {
      without: "Disconnected tools",
      with: "Unified dashboard + CRM + Wallet"
    },
    {
      without: "10+ staff to scale 5 offices",
      with: "1 VA can run 10+ offices"
    },
    {
      without: "Missed calls & ghosted leads",
      with: "24/7 AI agent follow-up"
    },
    {
      without: "No tracking",
      with: "Real-time LTV + retention metrics"
    }
  ];

  return (
    <section className="section-spacing bg-gradient-to-b from-nextgen-dark to-black/95">
      <div className="container-liquid">
        <div className="text-center mb-16">
          <h2 className="text-headline-lg font-semibold bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent mb-8">
            🪞 With vs Without NextGen OS
          </h2>
          <p className="text-body-lg text-white/70 max-w-3xl mx-auto">
            See the transformation when you activate the NextGen OS platform
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Without NextGen */}
          <Card className="bg-red-950/20 backdrop-blur-sm border border-red-500/20 hover:bg-red-950/30 transition-all duration-350">
            <CardContent className="p-8">
              <h3 className="text-headline font-bold text-red-400 mb-8 flex items-center gap-3">
                <X className="h-6 w-6" />
                Without NextGen
              </h3>
              <div className="space-y-6">
                {comparisons.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-body text-white/80">{item.without}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* With NextGen */}
          <Card className="bg-green-950/20 backdrop-blur-sm border border-green-500/20 hover:bg-green-950/30 transition-all duration-350">
            <CardContent className="p-8">
              <h3 className="text-headline font-bold text-green-400 mb-8 flex items-center gap-3">
                <Check className="h-6 w-6" />
                With NextGen OS
              </h3>
              <div className="space-y-6">
                {comparisons.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-body text-white/80">{item.with}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterNextGen;
