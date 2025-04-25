
import React from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { featureSlides } from '@/data/features';
import AgentFeatureSlide from './AgentFeatureSlide';
import { useIsMobile } from '@/hooks/use-mobile';

const FeatureCarousel = () => {
  const isMobile = useIsMobile();

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            AI Team Features
          </h1>
          <p className="text-lg text-white/70">
            Explore the powerful capabilities of your AI practice management team
          </p>
        </div>

        <Carousel
          className="w-full max-w-7xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {featureSlides.map((slide, index) => (
              <CarouselItem key={slide.agent} className="basis-full">
                <AgentFeatureSlide {...slide} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-4 mt-8">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default FeatureCarousel;
