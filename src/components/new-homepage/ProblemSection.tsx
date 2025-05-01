
import React from 'react';
import { AlertCircle, Users, Brain, Clock } from 'lucide-react';
import ScrollRevealWrapper from '@/components/animation/ScrollRevealWrapper';
import { cn } from '@/lib/utils';
import GlowingCard from '@/components/effects/GlowingCard';

const ProblemSection = () => {
  return (
    <section className="py-20 bg-black/40 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollRevealWrapper animation="fade-up">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gradient text-center">
              Running a practice shouldn't feel like managing chaos.
            </h2>
            
            <div className="space-y-6 text-white/80 text-lg">
              <p>
                The daily pressures are real: team burnout from repetitive tasks. Inconsistent training. 
                Unreliable staffing. Missed opportunities due to operational friction.
              </p>
              
              <p>
                Your focus should be on patient care and growth — not administrative overload.
              </p>
              
              <ScrollRevealWrapper animation="fade-up" delay={0.2}>
                <GlowingCard className="mt-8 p-6 md:p-8">
                  <blockquote className="text-xl md:text-2xl font-medium text-white/90 italic">
                    Whether you're an owner looking to scale, a manager trying to train and retain, 
                    or a coordinator overwhelmed by manual chaos — NextGen meets you where you are.
                  </blockquote>
                </GlowingCard>
              </ScrollRevealWrapper>
            </div>
          </div>
        </ScrollRevealWrapper>
        
        <ScrollRevealWrapper animation="fade-up" delay={0.3} className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start gap-4 p-5 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg">
              <div className="p-2 rounded-full bg-nextgen-purple/20 text-nextgen-purple">
                <Clock className="h-5 w-5" />
              </div>
              <p className="text-white/80">Administrative overload causing team burnout</p>
            </div>
            
            <div className="flex items-start gap-4 p-5 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg">
              <div className="p-2 rounded-full bg-nextgen-purple/20 text-nextgen-purple">
                <Brain className="h-5 w-5" />
              </div>
              <p className="text-white/80">Inconsistent training and knowledge gaps</p>
            </div>
            
            <div className="flex items-start gap-4 p-5 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg">
              <div className="p-2 rounded-full bg-nextgen-purple/20 text-nextgen-purple">
                <Users className="h-5 w-5" />
              </div>
              <p className="text-white/80">Staffing challenges and turnover issues</p>
            </div>
          </div>
        </ScrollRevealWrapper>
      </div>
    </section>
  );
};

export default ProblemSection;
