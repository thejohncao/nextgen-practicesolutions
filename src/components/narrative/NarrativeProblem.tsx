import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import { FileText, Eye, DollarSign, RefreshCw } from 'lucide-react';
import TreatmentPlanMock from './TreatmentPlanMock';
import NarrativePreview from './NarrativePreview';

const painClusters = [
  {
    icon: FileText,
    title: 'Built for Insurance, Not Patients',
    points: [
      'Treatment plans export CDT codes and fee schedules designed for claims processing',
      'Patients see procedure numbers and clinical jargon they can\'t interpret',
      'The format was never designed to educate, persuade, or build confidence',
    ],
  },
  {
    icon: Eye,
    title: 'No Visual Story, No Emotional Connection',
    points: [
      'No before/after imagery, no transformation visualization',
      'No patient education about conditions, risks, or why treatment matters',
      'No connection to what the patient actually cares about — their smile, comfort, confidence',
    ],
  },
  {
    icon: DollarSign,
    title: 'Financial Presentation That Kills Deals',
    points: [
      'One giant total at the bottom creates immediate sticker shock',
      'No phased care options, no plan variants, no payment pathway visualization',
      'Patients say "let me think about it" and never call back',
    ],
  },
  {
    icon: RefreshCw,
    title: 'No System, No Follow-Through',
    points: [
      'Quality of presentation depends entirely on which TC is presenting',
      'Patient walks out with a PDF that goes in a drawer or spam folder',
      'Zero post-visit engagement — no way to know if they opened it or considered it',
    ],
  },
];

const NarrativeProblem = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="container mx-auto px-4">
      {/* Section header */}
      <FadeInSection>
        <div className="text-center mb-16">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 tracking-wide"
            style={{ background: 'rgba(248,113,113,0.10)', border: '1px solid rgba(248,113,113,0.20)', color: '#f87171' }}
          >
            The Problem
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            This is what your patients see today.
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            A clinical document designed for insurance companies — not for the person deciding whether to invest in their health.
          </p>
        </div>
      </FadeInSection>

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20 items-center">
        <FadeInSection delay={0.1} direction="left">
          <div>
            <div className="text-center mb-4">
              <span className="text-sm font-medium text-white/40 uppercase tracking-wider">What your patients see today</span>
            </div>
            <TreatmentPlanMock />
          </div>
        </FadeInSection>

        <FadeInSection delay={0.3} direction="right">
          <div>
            <div className="text-center mb-4">
              <span className="text-sm font-medium uppercase tracking-wider" style={{ color: '#4EADC5' }}>What they could see</span>
            </div>
            <NarrativePreview />
          </div>
        </FadeInSection>
      </div>

      {/* Pain point clusters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {painClusters.map((cluster, i) => (
          <FadeInSection key={i} delay={0.1 + i * 0.1}>
            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 h-full hover:bg-white/[0.05] transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(248,113,113,0.08)' }}
                >
                  <cluster.icon className="w-4 h-4" style={{ color: '#f87171' }} />
                </div>
                <h3 className="text-base font-semibold text-white">{cluster.title}</h3>
              </div>
              <ul className="space-y-2">
                {cluster.points.map((pt, j) => (
                  <li key={j} className="text-sm text-white/50 leading-relaxed flex gap-2">
                    <span className="text-white/20 mt-1.5 shrink-0">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

export default NarrativeProblem;
