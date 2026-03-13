import React from 'react';
import { Button } from '@/components/ui/button';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { Calendar, MessageSquare } from 'lucide-react';

const NarrativeCTA = () => (
  <section className="py-24 relative overflow-hidden">
    {/* Decorative orbs */}
    <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: 'rgba(45,90,123,0.10)' }} />
    <div className="absolute top-1/3 -right-32 w-[350px] h-[350px] rounded-full blur-[100px]" style={{ background: 'rgba(78,173,197,0.08)' }} />

    <div className="container mx-auto px-4 relative z-10">
      <FadeInSection>
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="backdrop-blur-xl rounded-3xl p-10 md:p-14"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(45,90,123,0.2)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
              See what Narrative can do for your practice.
            </h2>
            <p className="text-base md:text-lg text-white/50 mb-10 max-w-xl mx-auto leading-relaxed">
              We'll load your real procedures, pricing, and membership tiers — so you see exactly
              what your patients will experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="text-base px-8 py-6 rounded-xl font-medium text-white"
                style={{ background: '#2D5A7B' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#3A7299'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#2D5A7B'; }}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book a Live Demo
              </Button>
              <Button
                variant="outline"
                className="text-base px-8 py-6 rounded-xl font-medium border-white/10 text-white/70 hover:bg-white/5 hover:text-white"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Talk to Our Team
              </Button>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  </section>
);

export default NarrativeCTA;
