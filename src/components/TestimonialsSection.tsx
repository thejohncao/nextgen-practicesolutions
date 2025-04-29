
import React, { useRef } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight, Shield, User, Quote, Star } from 'lucide-react';
import { BentoGrid, BentoItem } from '@/components/ui/bento-grid';
import AnimatedHeading from '@/components/ui/animated-heading';
import FadeInSection from '@/components/ui/fade-in-section';
import BackgroundCircles from '@/components/effects/BackgroundCircles';
import AnimatedGrainOverlay from '@/components/effects/AnimatedGrainOverlay';

const testimonials = [{
  quote: "Within 30 days of installing NextGen, our no-shows dropped by half—and we didn't even change our staff.",
  author: "Dr. Rachel S.",
  title: "Cosmetic Dentist",
  initials: "RS",
  stars: 5,
  size: "normal"
}, {
  quote: "We doubled our case acceptance rate and saved $8,000/month in admin overhead. It's like hiring 3 full-time people—without payroll.",
  author: "Dr. Kevin M.",
  title: "Practice Owner",
  initials: "KM",
  stars: 5,
  size: "large"
}, {
  quote: "NextGen helped us follow up with every lead, close more Invisalign cases, and reactivate patients we hadn't seen in a year.",
  author: "Kayla T.",
  title: "Treatment Coordinator",
  initials: "KT",
  stars: 5,
  size: "normal"
}, {
  quote: "The AI team does the work of 3 employees. Our front desk can focus on patients instead of paperwork.",
  author: "Dr. Jason F.",
  title: "Practice Owner",
  initials: "JF",
  stars: 5,
  size: "normal"
}, {
  quote: "Miles creates recall campaigns automatically. We recovered $15,000 in lost production in the first month alone.",
  author: "Sarah M.",
  title: "Office Manager",
  initials: "SM",
  stars: 5,
  size: "normal"
}];

const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="bg-nextgen-dark py-20 overflow-hidden relative">
      <BackgroundCircles variant="subtle" />
      <AnimatedGrainOverlay opacity={0.04} />
      
      <div className="container mx-auto px-4">
        <FadeInSection className="text-center mb-12">
          <AnimatedHeading
            text="Trusted by Leading Practices"
            as="h2" 
            className="text-3xl md:text-4xl font-heading font-bold"
          />
          <p className="text-white/70 mt-4 max-w-2xl mx-auto">
            Hear from practitioners who transformed their operations with NextGen AI Executive Team
          </p>
        </FadeInSection>
        
        <FadeInSection delay={0.2}>
          <BentoGrid className="max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <BentoItem
                key={index}
                span={testimonial.size === 'large' ? 'col' : 'none'}
                variant={index % 2 === 0 ? 'default' : 'secondary'}
                className="backdrop-blur-sm"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <Quote className="h-6 w-6 text-nextgen-purple mb-2 opacity-50" />
                    <p className="text-white/80 italic mb-4">"{testimonial.quote}"</p>
                    
                    <div className="flex items-center gap-0.5 mb-4">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-nextgen-purple text-transparent" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-auto">
                    <Avatar className="h-10 w-10 border-2 border-nextgen-purple">
                      <AvatarFallback className="bg-nextgen-purple/20 text-white">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="font-bold text-white text-sm">{testimonial.author}</p>
                      <p className="text-xs text-white/70">{testimonial.title}</p>
                    </div>
                    <Shield className="ml-auto h-4 w-4 text-nextgen-purple/80" />
                  </div>
                </div>
              </BentoItem>
            ))}
          </BentoGrid>
        </FadeInSection>
      </div>
    </section>
  );
};

export default TestimonialsSection;
