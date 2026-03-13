import React from 'react';
import { Button } from '@/components/ui/button';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { Calendar, Play } from 'lucide-react';
import NarrativePreview from './NarrativePreview';

const NarrativeDemoPlaceholder = () => (
  <section id="demo" className="py-24 relative overflow-hidden">
    {/* Subtle background shift */}
    <div className="absolute inset-0" style={{ background: 'rgba(45,90,123,0.03)' }} />

    <div className="container mx-auto px-4 relative z-10">
      <FadeInSection>
        <div className="text-center mb-12">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 tracking-wide"
            style={{ background: 'rgba(45,90,123,0.10)', border: '1px solid rgba(45,90,123,0.25)', color: '#4EADC5' }}
          >
            Interactive Demo
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Experience Narrative
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            The full interactive demo is coming soon. Book a live walkthrough to see Narrative
            in action with your practice's real data.
          </p>
        </div>
      </FadeInSection>

      {/* Demo frame */}
      <FadeInSection delay={0.2}>
        <div
          className="max-w-5xl mx-auto rounded-2xl overflow-hidden relative"
          style={{
            border: '1px solid rgba(45,90,123,0.2)',
            background: 'rgba(15,26,36,0.6)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
          }}
        >
          {/* Mock browser chrome */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}
          >
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 rounded-md bg-white/5 text-xs text-white/30 font-mono">
                narrative.nextgenpracticesolutions.com
              </div>
            </div>
          </div>

          {/* Content area with preview */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col items-center gap-8">
            {/* Two preview cards side by side on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
              <div>
                <div className="text-center mb-3">
                  <span className="text-xs font-medium text-white/30 uppercase tracking-wider">Patient View</span>
                </div>
                <NarrativePreview />
              </div>
              <div className="flex flex-col items-center justify-center">
                {/* Build mode placeholder */}
                <div className="text-center mb-3">
                  <span className="text-xs font-medium text-white/30 uppercase tracking-wider">Clinical View</span>
                </div>
                <div
                  className="w-full rounded-2xl p-6 flex flex-col items-center justify-center gap-4"
                  style={{
                    background: 'rgba(45,90,123,0.06)',
                    border: '1px dashed rgba(45,90,123,0.25)',
                    minHeight: 320,
                  }}
                >
                  {/* Simplified tooth chart sketch */}
                  <div className="grid grid-cols-8 gap-1 mb-2">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-5 h-6 rounded-sm"
                        style={{
                          background: [2, 5, 10, 13].includes(i)
                            ? 'rgba(78,173,197,0.3)'
                            : 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-5 h-6 rounded-sm"
                        style={{
                          background: [3, 7, 14].includes(i)
                            ? 'rgba(248,113,113,0.2)'
                            : 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-white/30 mt-2">Interactive tooth chart & treatment builder</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
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
                <Play className="mr-2 h-4 w-4" />
                Watch the Walkthrough
              </Button>
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  </section>
);

export default NarrativeDemoPlaceholder;
