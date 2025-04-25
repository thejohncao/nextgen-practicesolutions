
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

interface FeatureCarouselProps {
  agent?: string;
}

const FeatureCarousel = ({ agent }: FeatureCarouselProps) => {
  const isMobile = useIsMobile();

  // If agent is provided, find its index
  const initialSlide = agent ? featureSlides.findIndex(slide => slide.agent === agent) : 0;
  const slidesToShow = agent ? [featureSlides[initialSlide]] : featureSlides;

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        {!agent && (
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              AI Team Features
            </h1>
            <p className="text-lg text-white/70">
              Explore the powerful capabilities of your AI practice management team
            </p>
          </div>
        )}

        <Carousel
          className="w-full max-w-7xl mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {slidesToShow.map((slide) => (
              <CarouselItem key={slide.agent} className="basis-full">
                <AgentFeatureSlide {...slide} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {slidesToShow.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          )}
        </Carousel>
      </div>
    </section>
  );
};

export default FeatureCarousel;
