
import React, { useRef } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronLeft, ChevronRight, Shield, User, Quote, Star } from 'lucide-react';
import { BentoGrid, BentoItem } from '@/components/ui/bento-grid';
import AnimatedHeading from '@/components/ui/animated-heading';
import FadeInSection from '@/components/ui/fade-in-section';
import BackgroundCircles from '@/components/effects/BackgroundCircles';
import AnimatedGrainOverlay from '@/components/effects/AnimatedGrainOverlay';
import { motion } from 'framer-motion';
import { useSectionScrollProgress } from '@/lib/animationUtils';
import ProgressiveCounter from './ui/ProgressiveCounter';

// Testimonial data with metrics
const testimonials = [{
  quote: "Within 30 days of installing NextGen, our no-shows dropped by half—and we didn't even change our staff.",
  author: "Dr. Rachel S.",
  title: "Cosmetic Dentist",
  initials: "RS",
  stars: 5,
  size: "normal",
  metric: { value: 50, suffix: "%", prefix: "", description: "Reduction in no-shows" }
}, {
  quote: "We doubled our case acceptance rate and saved $8,000/month in admin overhead. It's like hiring 3 full-time people—without payroll.",
  author: "Dr. Kevin M.",
  title: "Practice Owner",
  initials: "KM",
  stars: 5,
  size: "large",
  metric: { value: 8000, prefix: "$", suffix: "/mo", description: "Admin overhead savings" }
}, {
  quote: "NextGen helped us follow up with every lead, close more Invisalign cases, and reactivate patients we hadn't seen in a year.",
  author: "Kayla T.",
  title: "Treatment Coordinator",
  initials: "KT",
  stars: 5,
  size: "normal",
  metric: { value: 100, suffix: "%", prefix: "", description: "Lead follow-up rate" }
}, {
  quote: "The AI team does the work of 3 employees. Our front desk can focus on patients instead of paperwork.",
  author: "Dr. Jason F.",
  title: "Practice Owner",
  initials: "JF",
  stars: 5,
  size: "normal",
  metric: { value: 3, suffix: "x", prefix: "", description: "Staff productivity increase" }
}, {
  quote: "Miles creates recall campaigns automatically. We recovered $15,000 in lost production in the first month alone.",
  author: "Sarah M.",
  title: "Office Manager",
  initials: "SM",
  stars: 5,
  size: "normal",
  metric: { value: 15000, prefix: "$", suffix: "", description: "Recovered production" }
}];

const TestimonialsSectionEnhanced = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useSectionScrollProgress(sectionRef);
  
  // Determine which testimonial to highlight based on scroll progress
  const highlightIndex = Math.min(
    Math.floor(scrollProgress * (testimonials.length + 1)), 
    testimonials.length - 1
  );
  
  // Generate stats for the story summary (when all testimonials are revealed)
  const showSummary = scrollProgress > 0.9;
  const totalSavings = testimonials.reduce((sum, t) => {
    if (t.metric?.prefix === "$" && t.metric?.suffix !== "/mo") {
      return sum + t.metric.value;
    }
    return sum;
  }, 0);

  return (
    <section ref={sectionRef} className="bg-nextgen-dark py-20 overflow-hidden relative">
      <BackgroundCircles variant="subtle" />
      <AnimatedGrainOverlay opacity={0.04} />
      
      <div className="container mx-auto px-4">
        <FadeInSection className="text-center mb-12">
          <AnimatedHeading
            text="Real Results From Real Practices"
            as="h2" 
            className="text-3xl md:text-4xl font-heading font-bold"
          />
          <p className="text-white/70 mt-4 max-w-2xl mx-auto">
            Discover the impact NextGen AI Executive Team makes in practices just like yours
          </p>
        </FadeInSection>
        
        {/* Progressive story metrics that build as you scroll */}
        <motion.div 
          className="flex flex-wrap justify-center gap-8 mb-12"
          style={{ opacity: showSummary ? 1 : 0 }}
          animate={{ opacity: showSummary ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="flex flex-col items-center bg-white/5 backdrop-blur-sm p-4 rounded-lg">
            <div className="text-3xl font-bold text-nextgen-purple mb-2">
              <ProgressiveCounter 
                value={totalSavings} 
                prefix="$" 
                duration={1.5} 
                active={showSummary}
              />
            </div>
            <div className="text-white/70 text-sm">Total Recovery</div>
          </div>
          
          <div className="flex flex-col items-center bg-white/5 backdrop-blur-sm p-4 rounded-lg">
            <div className="text-3xl font-bold text-nextgen-purple mb-2">
              <ProgressiveCounter 
                value={50} 
                suffix="%" 
                duration={1.5} 
                active={showSummary}
              />
            </div>
            <div className="text-white/70 text-sm">No-Show Reduction</div>
          </div>
          
          <div className="flex flex-col items-center bg-white/5 backdrop-blur-sm p-4 rounded-lg">
            <div className="text-3xl font-bold text-nextgen-purple mb-2">
              <ProgressiveCounter 
                value={3} 
                suffix="x" 
                duration={1.5} 
                active={showSummary}
              />
            </div>
            <div className="text-white/70 text-sm">Staff Productivity</div>
          </div>
        </motion.div>
        
        <FadeInSection delay={0.2}>
          <BentoGrid className="max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => {
              const isHighlighted = index <= highlightIndex;
              const delayFactor = index * 0.2;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isHighlighted ? 1 : 0.3, 
                    y: isHighlighted ? 0 : 10,
                    scale: index === highlightIndex ? 1.03 : 1
                  }}
                  transition={{ 
                    duration: 0.4, 
                    delay: isHighlighted ? delayFactor : 0,
                    ease: [0.25, 1, 0.5, 1]
                  }}
                  className="h-full"
                >
                  <BentoItem
                    span={testimonial.size === 'large' ? 'col' : 'none'}
                    variant={index % 2 === 0 ? 'default' : 'secondary'}
                    className={`backdrop-blur-sm transition-all duration-300 ${
                      index === highlightIndex ? 'ring-1 ring-nextgen-purple/50' : ''
                    }`}
                  >
                    <div className="flex flex-col h-full">
                      {/* Metric highlight at the top */}
                      {isHighlighted && testimonial.metric && (
                        <motion.div 
                          className="mb-4 p-2 bg-white/10 rounded-lg flex items-center gap-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ duration: 0.3, delay: delayFactor + 0.2 }}
                        >
                          <div className="text-2xl font-bold text-nextgen-purple flex-shrink-0">
                            <ProgressiveCounter 
                              value={testimonial.metric.value}
                              prefix={testimonial.metric.prefix}
                              suffix={testimonial.metric.suffix}
                              duration={1.0}
                              active={isHighlighted}
                            />
                          </div>
                          <div className="text-white/80 text-sm">{testimonial.metric.description}</div>
                        </motion.div>
                      )}
                      
                      <div className="mb-4">
                        <Quote className="h-6 w-6 text-nextgen-purple mb-2 opacity-50" />
                        <p className="text-white/80 italic mb-4">"{testimonial.quote}"</p>
                        
                        <motion.div 
                          className="flex items-center gap-0.5 mb-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHighlighted ? 1 : 0.5 }}
                          transition={{ duration: 0.3, delay: delayFactor + 0.1 }}
                        >
                          {[...Array(testimonial.stars)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{ scale: isHighlighted ? 1 : 0.9, opacity: isHighlighted ? 1 : 0.5 }}
                              transition={{ duration: 0.3, delay: delayFactor + 0.1 * i }}
                            >
                              <Star className="h-4 w-4 fill-nextgen-purple text-transparent" />
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                      
                      <motion.div 
                        className="flex items-center mt-auto"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: isHighlighted ? 1 : 0.5, y: isHighlighted ? 0 : 5 }}
                        transition={{ duration: 0.3, delay: delayFactor + 0.3 }}
                      >
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
                      </motion.div>
                    </div>
                  </BentoItem>
                </motion.div>
              );
            })}
          </BentoGrid>
        </FadeInSection>
        
        {/* Final conclusion that appears when all testimonials are viewed */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showSummary ? 1 : 0,
            y: showSummary ? 0 : 20
          }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <p className="text-xl text-white max-w-2xl mx-auto">
            Join hundreds of practices transforming their operations with NextGen's AI team — and see these results in your practice.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSectionEnhanced;
