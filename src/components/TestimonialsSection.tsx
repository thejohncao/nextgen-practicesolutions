
import React, { useRef } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight, Shield } from 'lucide-react';

const testimonials = [{
  quote: "Within 30 days of installing NextGen, our no-shows dropped by half—and we didn't even change our staff.",
  author: "Dr. Rachel S.",
  title: "Cosmetic Dentist",
  initials: "RS"
}, {
  quote: "We doubled our case acceptance rate and saved $8,000/month in admin overhead. It's like hiring 3 full-time people—without payroll.",
  author: "Dr. Kevin M.",
  title: "Practice Owner",
  initials: "KM"
}, {
  quote: "NextGen helped us follow up with every lead, close more Invisalign cases, and reactivate patients we hadn't seen in a year.",
  author: "Kayla T.",
  title: "Treatment Coordinator",
  initials: "KT"
}];

const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <section className="bg-nextgen-dark py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-center text-gradient">
          Trusted by Leading Practices
        </h2>
        
        <div className="relative">
          {/* Navigation arrows */}
          {!isMobile && (
            <>
              <button 
                onClick={scrollLeft} 
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 rounded-full text-white hover:bg-black/60 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={scrollRight} 
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 rounded-full text-white hover:bg-black/60 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          
          {/* Testimonials slider */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-full sm:w-[400px] bg-black/20 backdrop-blur-sm border border-white/10 p-6 rounded-xl snap-center"
              >
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 border-2 border-nextgen-purple">
                    <AvatarFallback className="bg-nextgen-purple/20 text-white">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-bold text-white">{testimonial.author}</p>
                    <p className="text-sm text-white/70">{testimonial.title}</p>
                  </div>
                  <Shield className="ml-auto h-5 w-5 text-nextgen-purple/80" />
                </div>
                <p className="text-white/80 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
