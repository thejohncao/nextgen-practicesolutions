
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Crown } from 'lucide-react';

const CompareNextGenOS = () => {
  const [activeTab, setActiveTab] = useState('features');

  const competitors = ['Kleer', 'RepeatMD', 'Moxie', 'NextGen OS'];
  
  const comparisonData = {
    features: [
      {
        feature: 'Medspa + Dental Native',
        kleer: false,
        repeatmd: false,
        moxie: false,
        nextgen: true,
        advantage: true
      },
      {
        feature: 'Full Credit Engine',
        kleer: true,
        repeatmd: false,
        moxie: false,
        nextgen: true,
        advantage: true
      },
      {
        feature: 'White-labeled Frontend',
        kleer: false,
        repeatmd: true,
        moxie: false,
        nextgen: true,
        advantage: true
      },
      {
        feature: 'AI Agent Suite Included',
        kleer: false,
        repeatmd: false,
        moxie: false,
        nextgen: true,
        advantage: true
      },
      {
        feature: 'Multi-location Management',
        kleer: true,
        repeatmd: true,
        moxie: true,
        nextgen: true,
        advantage: false
      },
      {
        feature: 'Patient Communication',
        kleer: true,
        repeatmd: true,
        moxie: true,
        nextgen: true,
        advantage: false
      }
    ]
  };

  const getValueIcon = (value: boolean, isNextGen: boolean = false) => {
    if (value) {
      return <Check className={`h-5 w-5 ${isNextGen ? 'text-green-400' : 'text-green-500'}`} />;
    }
    return <X className="h-5 w-5 text-red-400" />;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-nextgen-dark to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
            Compare NextGen OS
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            See how NextGen OS stacks up against the competition
          </p>
        </div>

        <Card className="glass-card max-w-6xl mx-auto">
          <CardContent className="p-0">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 p-6 border-b border-white/10">
              <div className="font-semibold text-white">Feature</div>
              {competitors.map((competitor, index) => (
                <div 
                  key={competitor} 
                  className={`text-center font-semibold ${
                    competitor === 'NextGen OS' ? 'text-nextgen-purple' : 'text-white/70'
                  }`}
                >
                  {competitor === 'NextGen OS' && (
                    <Crown className="h-4 w-4 inline mr-1 text-amber-400" />
                  )}
                  {competitor}
                </div>
              ))}
            </div>

            {/* Comparison Rows */}
            {comparisonData.features.map((row, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-5 gap-4 p-6 border-b border-white/10 ${
                  row.advantage ? 'bg-nextgen-purple/5' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{row.feature}</span>
                  {row.advantage && (
                    <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full">
                      Your unfair advantage
                    </span>
                  )}
                </div>
                <div className="text-center">{getValueIcon(row.kleer)}</div>
                <div className="text-center">{getValueIcon(row.repeatmd)}</div>
                <div className="text-center">{getValueIcon(row.moxie)}</div>
                <div className="text-center">{getValueIcon(row.nextgen, true)}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CompareNextGenOS;
