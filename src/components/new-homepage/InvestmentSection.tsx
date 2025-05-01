
import React from 'react';
import { CreditCard } from 'lucide-react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import GlowingCard from '@/components/effects/GlowingCard';

const InvestmentSection = () => {
  return (
    <section className="py-24 bg-black/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollRevealWrapper animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gradient">
              An Investment in Scalability, Not Just Software
            </h2>
          </ScrollRevealWrapper>
          
          <ScrollRevealWrapper animation="fade-up" delay={0.1}>
            <p className="text-xl text-white/80 text-center mb-12 max-w-3xl mx-auto">
              NextGen is for practices ready to build a more consistent, less stressful, and highly scalable future.
            </p>
          </ScrollRevealWrapper>
          
          <ScrollRevealWrapper animation="fade-up" delay={0.2}>
            <GlowingCard className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-nextgen-purple/20 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-nextgen-purple" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">ROI You Can Count On</h3>
              <p className="text-white/80 text-lg">
                Most practices recover their investment within 30–60 days.
              </p>
            </GlowingCard>
          </ScrollRevealWrapper>
        </div>
      </div>
    </section>
  );
};

export default InvestmentSection;
