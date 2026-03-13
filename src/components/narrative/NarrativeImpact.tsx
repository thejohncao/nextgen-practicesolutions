import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';

const stats = [
  {
    value: '40–60%',
    label: 'of diagnosed treatment goes unaccepted at the average practice.',
  },
  {
    value: '$1M',
    label: 'in unrealized production — for a practice diagnosing $2M annually at 50% acceptance.',
  },
  {
    value: '$200K–$500K+',
    label: 'recoverable per year with a 15% improvement in acceptance on high-ticket cases alone.',
  },
  {
    value: '$60K–$80K+',
    label: 'in recovered revenue from one additional full-arch case closed per quarter.',
  },
];

const NarrativeImpact = () => (
  <section className="py-24 relative overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0A1520 0%, #152535 50%, #0A1520 100%)' }} />

    {/* Decorative orbs */}
    <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px]" style={{ background: 'rgba(45,90,123,0.08)' }} />
    <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: 'rgba(78,173,197,0.06)' }} />

    <div className="container mx-auto px-4 relative z-10">
      <FadeInSection>
        <div className="text-center mb-16">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 tracking-wide"
            style={{ background: 'rgba(78,173,197,0.10)', border: '1px solid rgba(78,173,197,0.25)', color: '#4EADC5' }}
          >
            The Impact
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white">
            The math speaks for itself.
          </h2>
        </div>
      </FadeInSection>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        {stats.map((stat, i) => (
          <FadeInSection key={i} delay={0.1 + i * 0.1}>
            <div className="text-center sm:text-left">
              <div
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-3"
                style={{ color: '#4EADC5' }}
              >
                {stat.value}
              </div>
              <p className="text-base text-white/50 leading-relaxed max-w-xs">
                {stat.label}
              </p>
            </div>
          </FadeInSection>
        ))}
      </div>

      {/* Closing statement */}
      <FadeInSection delay={0.6}>
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="h-px w-16 mx-auto mb-8"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(78,173,197,0.4), transparent)' }}
          />
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-heading">
            Narrative doesn't just present treatment better.{' '}
            <span className="text-white font-semibold">
              It systematically removes the reasons patients say no.
            </span>
          </p>
        </div>
      </FadeInSection>
    </div>
  </section>
);

export default NarrativeImpact;
