
import React from 'react';
import { Clock, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const IconBlock = ({ 
  icon: Icon, 
  title, 
  children 
}: { 
  icon: React.ComponentType<any>;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col items-center space-y-4 max-w-xs text-center">
    <Icon size={32} className="text-nextgen-purple" strokeWidth={1.5} />
    <h3 className="text-xl font-medium text-white">{title}</h3>
    <p className="text-white/70 whitespace-pre-line leading-relaxed">
      {children}
    </p>
  </div>
);

const WhyWeBuiltSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-12">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient animate-fade-in">
            Why We Built NextGen Practice Solutions
          </h2>

          {/* Icon Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <IconBlock icon={Clock} title="Save Your Time">
              {"Eliminate busywork.\nAutomate operations.\nBuy back the hours you can never replace."}
            </IconBlock>

            <IconBlock icon={Zap} title="Recharge Your Energy">
              {"Remove chaos from your day.\nEmpower your team.\nGrow with momentum, not stress."}
            </IconBlock>

            <IconBlock icon={Heart} title="Win Back Your Life">
              {"Spend time with family.\nLead with vision, not exhaustion.\nBuild a life outside the office."}
            </IconBlock>
          </div>

          {/* Closing Text */}
          <p className="text-xl text-white/70 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '300ms' }}>
            NextGen gives you time, energy, and life back — so you can grow your practice without losing yourself.
          </p>

          {/* CTA Button */}
          <div className="pt-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <Button 
              asChild
              size="lg"
              className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8"
            >
              <Link to="/solutions">
                Meet Your AI Executive Team
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeBuiltSection;

