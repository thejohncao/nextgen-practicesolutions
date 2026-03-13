import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { Search, Lightbulb, Award, Clock, Wallet } from 'lucide-react';

const yeses = [
  {
    num: '01',
    title: 'Yes to the Problem',
    icon: Search,
    description: 'Before patients agree to treatment, they need to understand what\'s wrong.',
    points: [
      'Condition visualized on an interactive tooth chart with clear, non-clinical language',
      'Education content explains what\'s happening, why it matters, and what happens if they wait',
      'Escalation framing: "A $340 filling today vs. a $3,300 root canal + crown in 12 months"',
    ],
  },
  {
    num: '02',
    title: 'Yes to the Solution',
    icon: Lightbulb,
    description: 'Patients need to feel they have options — not that they\'re being sold.',
    points: [
      'Treatment options presented as Plan A / Plan B / Plan C — giving patients agency',
      'Phased care (P1 / P2 / P3) breaks treatment into digestible stages',
      'Visual journey shows the transformation, not just a procedure list',
    ],
  },
  {
    num: '03',
    title: 'Yes to the Provider',
    icon: Award,
    description: 'Patients choose practices they trust. The presentation is a trust signal.',
    points: [
      'Practice branding, provider credentials, and quality signals built into every screen',
      'Apple-quality interface signals this is a modern, premium practice',
      'Embedded patient education for every condition type',
    ],
  },
  {
    num: '04',
    title: 'Yes to the Timeline',
    icon: Clock,
    description: 'Ambiguity kills commitment. Clarity about "what happens next" closes cases.',
    points: [
      'Clear phase timeline: what happens now, what happens in 3–6 months, what\'s long-term',
      'Scheduling context reduces ambiguity and creates commitment to next steps',
      'Patients see a journey, not an open-ended to-do list',
    ],
  },
  {
    num: '05',
    title: 'Yes to the Investment',
    icon: Wallet,
    description: 'Price is never the real objection — it\'s uncertainty about value and affordability.',
    points: [
      'Side-by-side visitor vs. member pricing comparison with real-time savings',
      'Multiple payment pathways: pay in full, $0 down financing, 20% down options',
      'Patients see exactly what they\'re paying, how they\'re paying, and what they\'re saving',
    ],
  },
];

const NarrativeFiveYes = () => (
  <section className="py-24 relative overflow-hidden">
    {/* Background accent */}
    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(45,90,123,0.03) 50%, transparent 100%)' }} />

    <div className="container mx-auto px-4 relative z-10">
      <FadeInSection>
        <div className="text-center mb-16">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 tracking-wide"
            style={{ background: 'rgba(45,90,123,0.10)', border: '1px solid rgba(45,90,123,0.25)', color: '#4EADC5' }}
          >
            The Framework
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Five commitments. One{' '}
            <span style={{ color: '#4EADC5' }}>yes.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Narrative guides patients through five psychological commitments — each one building on the last —
            until saying yes feels like the obvious next step.
          </p>
        </div>
      </FadeInSection>

      {/* Timeline cards */}
      <div className="max-w-3xl mx-auto relative">
        {/* Vertical line */}
        <div
          className="absolute left-6 md:left-8 top-0 bottom-0 w-px hidden sm:block"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(45,90,123,0.3) 10%, rgba(45,90,123,0.3) 90%, transparent)' }}
        />

        {yeses.map((y, i) => (
          <FadeInSection key={i} delay={0.1 + i * 0.08}>
            <div className="flex gap-4 md:gap-6 mb-8 last:mb-0">
              {/* Number badge */}
              <div className="shrink-0 relative z-10">
                <div
                  className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(45,90,123,0.12)', border: '1px solid rgba(45,90,123,0.25)' }}
                >
                  <y.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#4EADC5' }} />
                </div>
              </div>

              {/* Content */}
              <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 md:p-6 flex-1 hover:bg-white/[0.05] transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono font-medium" style={{ color: '#4EADC5' }}>{y.num}</span>
                  <h3 className="text-lg font-semibold text-white">{y.title}</h3>
                </div>
                <p className="text-sm text-white/40 mb-4">{y.description}</p>
                <ul className="space-y-2">
                  {y.points.map((pt, j) => (
                    <li key={j} className="text-sm text-white/60 leading-relaxed flex gap-2">
                      <span style={{ color: '#4EADC5' }} className="mt-0.5 shrink-0">›</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

export default NarrativeFiveYes;
