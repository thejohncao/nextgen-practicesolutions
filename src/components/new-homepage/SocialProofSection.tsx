
import React from 'react';
import { Quote, ArrowRight, ShieldCheck } from 'lucide-react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const SocialProofSection = () => {
  return (
    <section className="py-24 bg-black/40 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gradient">
            Trusted by Leading Modern Practices
          </h2>
        </ScrollRevealWrapper>
        
        {/* Featured testimonial */}
        <ScrollRevealWrapper animation="fade-up" delay={0.1}>
          <div className="max-w-3xl mx-auto mt-12 mb-16">
            <div className="p-8 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 relative">
              <Quote className="h-8 w-8 text-nextgen-purple opacity-40 absolute top-4 left-4" />
              <blockquote className="text-xl md:text-2xl text-white/90 mt-6 mb-8 italic">
                "NextGen gave us systems, not just software. Our team is calmer, and our collections are up."
              </blockquote>
              <div>
                <p className="text-white font-medium">Dr. A. Smith</p>
                <p className="text-white/60 text-sm">Premier Dental, San Francisco</p>
              </div>
            </div>
          </div>
        </ScrollRevealWrapper>
        
        {/* Client logos */}
        <ScrollRevealWrapper animation="fade-up" delay={0.3}>
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-center text-white/60 mb-8">Powering efficient practices including:</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              <div className="h-12 w-32 bg-white/10 rounded-md backdrop-blur-sm flex items-center justify-center">
                <div className="text-white/70 font-medium">Clear Smile</div>
              </div>
              <div className="h-12 w-32 bg-white/10 rounded-md backdrop-blur-sm flex items-center justify-center">
                <div className="text-white/70 font-medium">Bright Dental</div>
              </div>
              <div className="h-12 w-32 bg-white/10 rounded-md backdrop-blur-sm flex items-center justify-center">
                <div className="text-white/70 font-medium">Premier Family</div>
              </div>
              <div className="h-12 w-32 bg-white/10 rounded-md backdrop-blur-sm flex items-center justify-center">
                <div className="text-white/70 font-medium">Wilson Dental</div>
              </div>
            </div>
          </div>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.4} className="text-center">
          <Link to="/resources" className="inline-flex items-center text-nextgen-purple hover:text-nextgen-purple/80 font-medium transition-colors">
            Explore Case Studies
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.5}>
          <div className="max-w-5xl mx-auto mt-16">
            <div className="flex flex-wrap items-center justify-center gap-6 p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-nextgen-purple" />
                <p className="text-white font-medium">HIPAA Compliant</p>
              </div>
              <div className="h-12 px-8 border-l border-white/10 flex items-center">
                <p className="text-white/70 font-medium">SOC 2 Certified</p>
              </div>
              <div className="h-12 px-8 border-l border-white/10 flex items-center">
                <p className="text-white/70 font-medium">ADA Compliant</p>
              </div>
            </div>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default SocialProofSection;
