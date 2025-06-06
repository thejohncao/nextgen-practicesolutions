
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { X, Check } from 'lucide-react';

const JuvBeforeAfter = () => {
  const comparisons = [
    {
      without: "10+ staff needed per 5 locations",
      with: "1 coordinator supports 10+ offices"
    },
    {
      without: "Manual onboarding + SOP chaos",
      with: "AI-led workflows and SOP auto-generation"
    },
    {
      without: "Missed calls, no-show gaps",
      with: "24/7 AI receptionist with reactivation logic"
    },
    {
      without: "Multiple tools, no visibility",
      with: "Unified CRM, dashboard, and referral engine"
    },
    {
      without: "Slow scale",
      with: "Plug-and-play kits ready to deploy tomorrow"
    }
  ];

  return (
    <section className="py-12 bg-nextgen-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            🪞 BEFORE & AFTER: What Happens When You Activate the OS
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Without NextGen */}
          <Card className="glass-card border-red-500/20 bg-red-50/5">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
                <X className="h-5 w-5" />
                Without NextGen
              </h3>
              <div className="space-y-4">
                {comparisons.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <X className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-white/80">{item.without}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* With NextGen */}
          <Card className="glass-card border-green-500/20 bg-green-50/5">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-green-400 mb-6 flex items-center gap-2">
                <Check className="h-5 w-5" />
                With NextGen
              </h3>
              <div className="space-y-4">
                {comparisons.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-white/80">{item.with}</p>
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

export default JuvBeforeAfter;
