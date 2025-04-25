import React, { useRef } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight, Shield } from 'lucide-react';

const testimonials = [
  {
    quote: "Within 30 days of installing NextGen, our no-shows dropped by half—and we didn't even change our staff.",
    author: "Dr. Rachel S.",
    title: "Cosmetic Dentist",
    initials: "RS"
  },
  {
    quote: "We doubled our case acceptance rate and saved $8,000/month in admin overhead. It's like hiring 3 full-time people—without payroll.",
    author: "Dr. Kevin M.",
    title: "Practice Owner",
    initials: "KM"
  },
  {
    quote: "NextGen helped us follow up with every lead, close more Invisalign cases, and reactivate patients we hadn't seen in a year.",
    author: "Kayla T.",
    title: "Treatment Coordinator",
    initials: "KT"
  }
];

const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="section-padding py-20">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Shield className="h-4 w-4 text-nextgen-purple" />
            <span className="text-sm font-medium text-white/80">Practice Success</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gradient">
            What Practice Owners Are Saying
          </h2>
        </div>
        
        {isMobile ? (
          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto scrollbar-none gap-4 pb-6 snap-x snap-mandatory"
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6 rounded-xl min-w-[80vw] snap-center flex flex-col"
                >
                  <div className="mb-4">
                    <Avatar className="h-12 w-12 bg-gradient-to-br from-nextgen-purple to-nextgen-blue">
                      <AvatarFallback className="text-white font-medium">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <p className="text-white/90 italic mb-4 flex-grow">
                    "{testimonial.quote}"
                  </p>
                  
                  <p className="text-sm text-white/70">
                    — {testimonial.author}, {testimonial.title}
                  </p>
                </div>
              ))}
            </div>
            <button 
              onClick={scrollLeft} 
              className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-nextgen-dark/80 rounded-full p-2 text-white/70"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={scrollRight} 
              className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-nextgen-dark/80 rounded-full p-2 text-white/70"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="glass-card p-6 rounded-xl relative overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="mb-4">
                  <Avatar className="h-12 w-12 bg-gradient-to-br from-nextgen-purple to-nextgen-blue">
                    <AvatarFallback className="text-white font-medium">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <p className="text-white/90 italic mb-4">
                  "{testimonial.quote}"
                </p>
                
                <p className="text-sm text-white/70">
                  — {testimonial.author}, {testimonial.title}
                </p>
                
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-nextgen-purple/5 rounded-full blur-xl"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
