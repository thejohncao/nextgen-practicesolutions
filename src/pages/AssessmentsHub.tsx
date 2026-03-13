import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { ArrowRight, ClipboardCheck, Clock, Lock } from 'lucide-react';

interface Assessment {
  slug: string;
  name: string;
  description: string;
  questionCount: number;
  status: 'built' | 'planned';
  primaryMapping: string;
  featured?: boolean;
}

const assessments: Assessment[] = [
  {
    slug: 'practice-health',
    name: 'Practice Health Assessment',
    description:
      'Broad 100-point assessment covering your entire practice. Identifies your weakest areas and recommends specific deep dives.',
    questionCount: 100,
    status: 'planned',
    primaryMapping: 'All 10 NextGen offers',
    featured: true,
  },
  {
    slug: 'case-acceptance',
    name: 'Case Acceptance Readiness',
    description:
      'Deep diagnostic of your treatment presentation and acceptance workflow — from clinical handoff to follow-up.',
    questionCount: 50,
    status: 'built',
    primaryMapping: 'Narrative',
  },
  {
    slug: 'speed-to-lead',
    name: 'Speed-to-Lead & Front Desk',
    description:
      'Evaluates your inbound lead handling, call response times, multi-channel coverage, and booking conversion.',
    questionCount: 40,
    status: 'planned',
    primaryMapping: 'Speed-to-Lead + AI Front Desk',
  },
  {
    slug: 'acquisition',
    name: 'Patient Acquisition Readiness',
    description:
      'Assesses your marketing, online presence, paid advertising, and referral systems for new patient generation.',
    questionCount: 40,
    status: 'planned',
    primaryMapping: 'Patient Acquisition Engine + Website Stack',
  },
  {
    slug: 'revenue-cycle',
    name: 'Revenue Cycle Health',
    description:
      'Examines your billing, collections, AR management, insurance verification, and financial controls.',
    questionCount: 40,
    status: 'planned',
    primaryMapping: 'Revenue Cycle OS',
  },
  {
    slug: 'retention',
    name: 'Patient Retention & Recall',
    description:
      'Evaluates your hygiene compliance, reactivation systems, schedule optimization, and patient experience.',
    questionCount: 40,
    status: 'planned',
    primaryMapping: 'Recall Engine',
  },
  {
    slug: 'data',
    name: 'Data & Visibility',
    description:
      'Measures your KPI awareness, reporting infrastructure, marketing attribution, and data-driven decision making.',
    questionCount: 40,
    status: 'planned',
    primaryMapping: 'Data & Dashboard',
  },
  {
    slug: 'team',
    name: 'Team Performance & Culture',
    description:
      'Assesses role clarity, training, communication, and culture — the people infrastructure behind your practice.',
    questionCount: 40,
    status: 'planned',
    primaryMapping: 'Team OS + FD & TC Performance',
  },
];

const featured = assessments.find((a) => a.featured);
const deepDives = assessments.filter((a) => !a.featured);

function AssessmentCard({ assessment }: { assessment: Assessment }) {
  const isAvailable = assessment.status === 'built';

  const inner = (
    <div
      className={`group relative rounded-xl border p-6 transition-all ${
        isAvailable
          ? 'border-white/10 bg-white/5 hover:border-amber-400/30 hover:bg-white/[0.08] cursor-pointer'
          : 'border-white/5 bg-white/[0.02] opacity-70'
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
            isAvailable
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-amber-500/10 text-amber-400'
          }`}
        >
          {isAvailable ? 'Available' : 'Coming Soon'}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          {assessment.questionCount} questions
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">
        {assessment.name}
      </h3>
      <p className="mt-2 text-sm text-gray-400">{assessment.description}</p>
      <p className="mt-3 text-xs text-gray-500">
        Maps to: {assessment.primaryMapping}
      </p>
      {isAvailable ? (
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-400 opacity-0 transition-opacity group-hover:opacity-100">
          Take Assessment <ArrowRight className="h-3 w-3" />
        </span>
      ) : (
        <span className="mt-4 inline-flex items-center gap-1 text-sm text-gray-600">
          <Lock className="h-3 w-3" /> Coming soon
        </span>
      )}
    </div>
  );

  if (isAvailable) {
    return <Link to={`/assessments/${assessment.slug}`}>{inner}</Link>;
  }
  return inner;
}

const AssessmentsHub = () => (
  <Layout>
    {/* Hero */}
    <section className="px-6 pt-24 pb-12 text-center">
      <h1 className="text-4xl font-bold text-white md:text-5xl">
        Know exactly where your practice stands.
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
        Eight diagnostic assessments covering every dimension of practice
        performance — from patient acquisition to case acceptance to revenue
        cycle.
      </p>
    </section>

    {/* Featured Assessment */}
    {featured && (
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-8 md:p-12">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
                <ClipboardCheck className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Start Here
                </span>
                <h2 className="mt-1 text-2xl font-normal text-white md:text-3xl">
                  {featured.name}
                </h2>
                <p className="mt-3 text-gray-400">
                  Not sure where to start? The Practice Health Assessment covers
                  everything in 15 minutes and tells you which deep dives matter
                  most.
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    {featured.questionCount} questions
                  </span>
                  <span className="text-sm text-gray-500">&middot;</span>
                  <span className="text-sm text-gray-500">~15 minutes</span>
                </div>
                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 rounded-lg border border-amber-400/30 bg-amber-400/10 px-6 py-3 text-sm font-medium text-amber-400">
                    <Lock className="h-4 w-4" />
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )}

    {/* Deep-Dive Grid */}
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-2xl font-normal text-white md:text-3xl">
          Deep-Dive Assessments
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-400">
          Focused diagnostics that go deep into specific areas of your practice.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {deepDives.map((a) => (
            <AssessmentCard key={a.slug} assessment={a} />
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default AssessmentsHub;
