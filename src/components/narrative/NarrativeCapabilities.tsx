import React from 'react';
import { FadeInSection } from '@/components/ui/fade-in-section';
import {
  Monitor,
  Wrench,
  CircleDot,
  ClipboardList,
  CreditCard,
  Calculator,
  BookOpen,
  Maximize,
  Printer,
} from 'lucide-react';

const capabilities = [
  {
    icon: Monitor,
    title: 'Present Mode',
    desc: 'Full-screen, patient-facing guided journey. 9 screens designed to Apple HIG standards with animations, transitions, and a flow that feels like a premium app. Works on iPad or desktop.',
  },
  {
    icon: Wrench,
    title: 'Build Mode',
    desc: 'Clinical-facing workflow where the TC or clinician inputs patient data, charts findings, builds the treatment plan, and configures financial options — generating the patient journey automatically.',
  },
  {
    icon: CircleDot,
    title: 'Interactive Tooth Chart',
    desc: 'Visual charting with a condition catalog across urgent, monitor, elective, and aesthetic categories. Priority assignment (P1/P2/P3) and diagnosis-to-treatment auto-mapping.',
  },
  {
    icon: ClipboardList,
    title: 'Treatment Planning Engine',
    desc: 'Full procedure library with category-based pricing across Preventive, Restorative, Implants, Cosmetic, Surgical, and Orthodontic. Supports quantity adjustments, phase assignment, and plan variants.',
  },
  {
    icon: CreditCard,
    title: 'Membership Pricing Engine',
    desc: 'Real-time comparison of visitor vs. member pricing across tiers. Pricing rules handle general dentistry discounts and fixed-price implants/veneers automatically.',
  },
  {
    icon: Calculator,
    title: 'Financing Calculator',
    desc: 'Automatic computation of pay-in-full discount (5%), $0 down monthly (24 mo), and 20% down monthly options. Supports CareCredit, Cherry, and Affirm pathways.',
  },
  {
    icon: BookOpen,
    title: 'Patient Education Library',
    desc: 'Condition-specific education for every diagnosis: summary, causes, short/long-term risks, escalation notes, treatment options, and benefit framing across functional, aesthetic, and emotional dimensions.',
  },
  {
    icon: Maximize,
    title: 'Full-Arch Workflow',
    desc: 'Dedicated intake and pricing for full-arch cases. Solution comparison from Traditional Dentures to Fixed Zirconia, dual-arch pricing with volume discount, and phased allocation.',
  },
  {
    icon: Printer,
    title: 'Export & Print',
    desc: '2-page branded patient summary generated from the app. Page 1: clinical findings + diagnosis detail. Page 2: treatment plan + investment + payment options. Printable and PDF-ready.',
  },
];

const NarrativeCapabilities = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="container mx-auto px-4">
      <FadeInSection>
        <div className="text-center mb-16">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 tracking-wide"
            style={{ background: 'rgba(78,173,197,0.08)', border: '1px solid rgba(78,173,197,0.20)', color: '#4EADC5' }}
          >
            Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Everything your TC needs. Nothing they don't.
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            From clinical charting to patient-facing presentation — one integrated workflow.
          </p>
        </div>
      </FadeInSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {capabilities.map((cap, i) => (
          <FadeInSection key={i} delay={0.05 + i * 0.05}>
            <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 h-full hover:bg-white/[0.05] transition-colors group">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(45,90,123,0.10)' }}
              >
                <cap.icon className="w-5 h-5 group-hover:scale-110 transition-transform" style={{ color: '#4EADC5' }} />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{cap.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{cap.desc}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </div>
  </section>
);

export default NarrativeCapabilities;
