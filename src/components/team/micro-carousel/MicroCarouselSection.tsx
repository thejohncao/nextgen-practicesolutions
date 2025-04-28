
import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { orderedAgents } from '../data/TeamPhases';
import SuccessHighlight from './SuccessHighlight';

const successHighlights = [
  { agentIndex: 1, message: "Miles auto-scheduled 4 new patients today." },
  { agentIndex: 0, message: "Giselle captured 17 new leads from your Facebook Ad overnight." },
  { agentIndex: 2, message: "Devon followed up with 6 unscheduled treatments this morning." },
  { agentIndex: 3, message: "Alma onboarded your new front desk team member in 1 hour." },
  { agentIndex: 1, message: "Miles optimized your schedule, reducing wait times by 35%." },
  { agentIndex: 0, message: "Giselle's campaign brought in 23 appointment requests this week." },
  { agentIndex: 2, message: "Devon increased case acceptance rate by 40% this month." },
  { agentIndex: 3, message: "Alma completed compliance training for the entire staff." },
];

const MicroCarouselSection = () => {
  const autoplayOptions = {
    delay: 5000,
    stopOnInteraction: false,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay(autoplayOptions)]
  );

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    pricingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-black/20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-8 text-center text-gradient">
          What Your AI Team Can Do For You
        </h2>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 py-4">
            {successHighlights.map((highlight, index) => (
              <div key={index} className="flex-[0_0_auto]">
                <SuccessHighlight
                  agent={orderedAgents[highlight.agentIndex]}
                  message={highlight.message}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-white/70 mb-4">Ready to Meet Your Team?</p>
          <Button 
            onClick={scrollToPricing}
            className="bg-[#6C63FF] hover:bg-[#5a52e0] text-white font-bold py-3 px-8 rounded-lg text-lg"
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MicroCarouselSection;
