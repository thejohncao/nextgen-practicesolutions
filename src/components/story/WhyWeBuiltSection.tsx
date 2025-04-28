
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Clock, Zap, Heart, ArrowRight } from 'lucide-react';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento/BentoGrid';

const WhyWeBuiltSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gradient animate-fade-in">
            Why We Built NextGen Practice Solutions
          </h2>
        </div>

        <BentoGrid className="mb-12">
          <BentoGridItem
            colSpan="col-span-3"
            className="text-center p-8"
            description="NextGen gives you time, energy, and life back — so you can grow your practice without losing yourself."
          >
            <div className="mt-6">
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
          </BentoGridItem>

          <BentoGridItem
            colSpan="col-span-1"
            icon={<Clock className="h-8 w-8 text-nextgen-purple" />}
            title="Save Your Time"
            description="Eliminate busywork. Automate operations. Buy back the hours you can never replace."
          >
            {/* Empty children to satisfy TypeScript requirement */}
            <div></div>
          </BentoGridItem>

          <BentoGridItem
            colSpan="col-span-1"
            icon={<Zap className="h-8 w-8 text-nextgen-purple" />}
            title="Recharge Your Energy"
            description="Remove chaos from your day. Empower your team. Grow with momentum, not stress."
          >
            {/* Empty children to satisfy TypeScript requirement */}
            <div></div>
          </BentoGridItem>

          <BentoGridItem
            colSpan="col-span-1"
            icon={<Heart className="h-8 w-8 text-nextgen-purple" />}
            title="Win Back Your Life"
            description="Spend time with family. Lead with vision, not exhaustion. Build a life outside the office."
          >
            {/* Empty children to satisfy TypeScript requirement */}
            <div></div>
          </BentoGridItem>
        </BentoGrid>
      </div>
    </section>
  );
};

export default WhyWeBuiltSection;
