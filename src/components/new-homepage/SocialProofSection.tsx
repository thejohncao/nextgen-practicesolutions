
import React from 'react';
import { Quote, ShieldCheck } from 'lucide-react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { cn } from '@/lib/utils';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  practice: string;
  delay: number;
}

const Testimonial = ({ quote, name, title, practice, delay }: TestimonialProps) => (
  <ScrollRevealWrapper animation="fade-up" delay={delay}>
    <div className="p-8 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-nextgen-purple/20 transition-all duration-300 relative">
      <Quote className="h-8 w-8 text-nextgen-purple opacity-40 absolute top-4 left-4" />
      <blockquote className="text-xl text-white/90 mt-6 mb-8 italic">
        "{quote}"
      </blockquote>
      <div>
        <p className="text-white font-medium">{name}</p>
        <p className="text-white/60 text-sm">{title}, {practice}</p>
      </div>
    </div>
  </ScrollRevealWrapper>
);

const SocialProofSection = () => {
  const testimonials = [
    {
      quote: "We closed more treatment in 1 month with Devon than we had in 3. And we didn't have to chase a single patient.",
      name: "Dr. Sarah Thompson",
      title: "Owner",
      practice: "Clear Smile Dental, Seattle"
    },
    {
      quote: "The Academy certification gave my front desk team a framework that eliminated the chaos. New hires are productive in days, not weeks.",
      name: "Maria Rodriguez",
      title: "Office Manager",
      practice: "Bright Dental Group"
    },
    {
      quote: "Having Miles handle our scheduling and confirmations freed up 15+ hours weekly. My team can finally focus on patient care instead of phone tag.",
      name: "Dr. James Wilson",
      title: "Practice Owner",
      practice: "Wilson Family Dentistry"
    }
  ];

  return (
    <section className="py-24 bg-black/40 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gradient">
            Trusted by Modern Dental Leaders Like You
          </h2>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.1}>
          <p className="text-xl text-white/80 text-center mb-12 max-w-3xl mx-auto">
            See what dental professionals are saying about NextGen Practice Solutions
          </p>
        </ScrollRevealWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              practice={testimonial.practice}
              delay={0.2 + (index * 0.1)}
            />
          ))}
        </div>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.5}>
          <div className="max-w-5xl mx-auto">
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-nextgen-purple" />
                  <p className="text-white font-medium">HIPAA Compliant</p>
                </div>
                <div className="text-white/60">
                  <p>Powering efficient practices including:</p>
                </div>
                <div className="flex flex-wrap gap-8 justify-center md:justify-end">
                  {/* Placeholder for client logos */}
                  <div className="h-8 w-24 bg-white/20 rounded-md"></div>
                  <div className="h-8 w-24 bg-white/20 rounded-md"></div>
                  <div className="h-8 w-24 bg-white/20 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.6} className="mt-8 text-center">
          <Link to="/resources" className="inline-flex items-center text-nextgen-purple hover:text-nextgen-purple/80 font-medium transition-colors">
            Read More Success Stories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

// Import missing component
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default SocialProofSection;
