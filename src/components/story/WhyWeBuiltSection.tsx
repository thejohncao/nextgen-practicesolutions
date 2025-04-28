
import React from 'react';
import { Clock, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SparkleText from '../effects/SparkleText';

const IconBlock = ({ 
  icon: Icon, 
  title, 
  children 
}: { 
  icon: React.ComponentType<any>;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="glass-card p-8 hover:bg-white/10 transition-all duration-300 group transform hover:-translate-y-1">
    <div className="flex flex-col items-center space-y-4 relative">
      <div className="rounded-xl bg-nextgen-purple/20 p-4 relative group-hover:scale-110 transition-transform duration-300">
        <Icon size={32} className="text-nextgen-purple" strokeWidth={1.5} />
        <div className="absolute inset-0 bg-nextgen-purple/20 blur-xl scale-0 group-hover:scale-100 transition-transform duration-300" />
      </div>
      <h3 className="text-xl font-medium text-white">{title}</h3>
      <p className="text-white/70 whitespace-pre-line leading-relaxed">
        {children}
      </p>
    </div>
  </div>
);

const WhyWeBuiltSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-nextgen-purple/10 blur-[100px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#E87C7C]/10 blur-[100px] rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-12">
          {/* Enhanced Title with SparkleText */}
          <div className="max-w-4xl mx-auto">
            <SparkleText>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient animate-fade-in">
                Why We Built NextGen Practice Solutions
              </h2>
            </SparkleText>
          </div>

          {/* Enhanced Icon Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
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

          {/* Enhanced Closing Text */}
          <div className="glass-card max-w-3xl mx-auto p-8 backdrop-blur-2xl">
            <p className="text-xl text-white/70">
              NextGen gives you time, energy, and life back — so you can grow your practice without losing yourself.
            </p>

            {/* Enhanced CTA Button */}
            <div className="mt-8">
              <Button 
                asChild
                size="lg"
                className="bg-nextgen-purple hover:bg-nextgen-purple/90 text-white px-8 py-6 h-auto text-lg rounded-lg shadow-lg hover:shadow-nextgen-purple/25 hover:scale-[1.02] transition-all duration-300"
              >
                <Link to="/solutions">
                  Meet Your AI Executive Team
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeBuiltSection;
