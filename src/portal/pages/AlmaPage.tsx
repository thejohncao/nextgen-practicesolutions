import { useState } from 'react';
import { getPillar } from '../data/pillars';
import {
  almaHeroKPIs,
  almaDetailKPIs,
  academyPrograms,
  rolePaths,
  sopLibrary,
  almaInsights,
  trainingCompletionTrend,
} from '../data/mock';
import type { AcademyProgram, RolePath, SOPEntry } from '../data/mock';
import PillarHero from '../components/PillarHero';
import SectionHeader from '../components/SectionHeader';
import MetricGrid from '../components/MetricGrid';
import InsightCard from '../components/InsightCard';
import MiniChart from '../components/MiniChart';
import CTACard from '../components/CTACard';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, BookOpen, Search } from 'lucide-react';

// ── Program Card ───────────────────────────────────────────────────

const statusLabel: Record<AcademyProgram['status'], string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  completed: 'Completed',
};

const statusColor: Record<AcademyProgram['status'], string> = {
  not_started: 'text-gray-500 bg-gray-50',
  in_progress: 'text-amber-700 bg-amber-50',
  completed: 'text-emerald-700 bg-emerald-50',
};

function ProgramCard({ program }: { program: AcademyProgram }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-gray-900">{program.name}</h3>
        <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap', statusColor[program.status])}>
          {statusLabel[program.status]}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {program.roles.map((r) => (
          <span key={r} className="text-[11px] font-medium bg-gray-50 text-gray-600 px-2 py-0.5 rounded-md">{r}</span>
        ))}
        <span className="text-[11px] text-gray-400 px-1">{program.duration}</span>
      </div>
      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-xs font-semibold text-gray-700">{program.progress}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all',
              program.progress === 100 ? 'bg-emerald-500' : 'bg-amber-500'
            )}
            style={{ width: `${program.progress}%` }}
          />
        </div>
      </div>
      <p className="text-[11px] text-gray-400">Last activity: {program.lastActivity}</p>
    </div>
  );
}

// ── Role Learning Path Card ────────────────────────────────────────

function RolePathCard({ path }: { path: RolePath }) {
  const completed = path.modules.filter((m) => m.completed).length;
  const total = path.modules.length;
  const required = path.modules.filter((m) => m.required);
  const optional = path.modules.filter((m) => !m.required);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 border-b border-gray-50 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{path.role}</h3>
          <p className="text-[11px] text-gray-400">{path.certLevels[path.currentLevel - 1]} &middot; {completed}/{total} modules</p>
        </div>
        <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
          Level {path.currentLevel}
        </span>
      </div>
      <div className="divide-y divide-gray-50">
        {required.length > 0 && (
          <div className="px-5 py-2">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Required</p>
            {required.map((m) => (
              <div key={m.id} className="flex items-center gap-2.5 py-1.5">
                {m.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                )}
                <span className={cn('text-sm', m.completed ? 'text-gray-500' : 'text-gray-700')}>{m.name}</span>
              </div>
            ))}
          </div>
        )}
        {optional.length > 0 && (
          <div className="px-5 py-2">
            <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Optional</p>
            {optional.map((m) => (
              <div key={m.id} className="flex items-center gap-2.5 py-1.5">
                {m.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                )}
                <span className={cn('text-sm', m.completed ? 'text-gray-500' : 'text-gray-700')}>{m.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── SOP Row ────────────────────────────────────────────────────────

function SOPRow({ sop }: { sop: SOPEntry }) {
  return (
    <div className="flex items-center gap-4 px-5 py-3">
      <BookOpen className="w-4 h-4 text-amber-500 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-700 font-medium truncate">{sop.title}</p>
        <p className="text-[11px] text-gray-400">
          {sop.category} &middot; Updated {sop.lastUpdated} &middot; {sop.assignedRoles.join(', ')}
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full', sop.completionRate >= 90 ? 'bg-emerald-500' : sop.completionRate >= 70 ? 'bg-amber-500' : 'bg-red-400')}
            style={{ width: `${sop.completionRate}%` }}
          />
        </div>
        <span className="text-xs font-medium text-gray-500 w-8 text-right">{sop.completionRate}%</span>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────

const roleFilters = ['All', 'Front Desk', 'Treatment Coordinator', 'Hygiene', 'Assistant', 'Office Manager', 'Doctor'];
const sopCategories = ['All', 'Phones', 'Scheduling', 'Case Presentation', 'Billing', 'Recall', 'Huddles', 'AR'];

export default function AlmaPage() {
  const pillar = getPillar('alma')!;
  const [roleFilter, setRoleFilter] = useState('All');
  const [sopCategory, setSopCategory] = useState('All');
  const [sopSearch, setSopSearch] = useState('');

  const filteredPaths = roleFilter === 'All' ? rolePaths : rolePaths.filter((p) => p.role === roleFilter);

  const filteredSOPs = sopLibrary.filter((sop) => {
    const matchCategory = sopCategory === 'All' || sop.category === sopCategory;
    const matchSearch = !sopSearch || sop.title.toLowerCase().includes(sopSearch.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto space-y-8">
      <PillarHero pillar={pillar} kpis={almaHeroKPIs} />

      {/* Academy Overview */}
      <SectionHeader title="Academy Overview" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricGrid title="Team Onboarding" metrics={almaDetailKPIs.teamOnboarding} />
        <MetricGrid title="Certifications" metrics={almaDetailKPIs.certifications} />
        <MetricGrid title="Training Activity" metrics={almaDetailKPIs.trainingActivity} />
        <MetricGrid title="SOP Library Usage" metrics={almaDetailKPIs.sopLibrary} />
      </div>

      {/* Chart */}
      <MiniChart data={trainingCompletionTrend} color="#D97706" title="Modules Completed per Month" />

      {/* Programs & Tracks */}
      <SectionHeader title="Programs & Tracks" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {academyPrograms.map((prg) => (
          <ProgramCard key={prg.id} program={prg} />
        ))}
      </div>

      {/* Role-Based Learning Paths */}
      <SectionHeader title="Role-Based Learning Paths" />
      <div className="flex flex-wrap gap-2 mb-2">
        {roleFilters.map((f) => (
          <button
            key={f}
            onClick={() => setRoleFilter(f)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
              roleFilter === f ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPaths.map((path) => (
          <RolePathCard key={path.role} path={path} />
        ))}
      </div>

      {/* SOP Library */}
      <SectionHeader title="SOP Library" />
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-gray-50 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search SOPs..."
              value={sopSearch}
              onChange={(e) => setSopSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {sopCategories.map((c) => (
              <button
                key={c}
                onClick={() => setSopCategory(c)}
                className={cn(
                  'px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-all',
                  sopCategory === c ? 'bg-amber-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {filteredSOPs.length > 0 ? (
            filteredSOPs.map((sop) => <SOPRow key={sop.id} sop={sop} />)
          ) : (
            <p className="px-5 py-8 text-sm text-gray-400 text-center">No SOPs match your search.</p>
          )}
        </div>
      </div>

      {/* Recommendations */}
      <SectionHeader title="Recommendations" />
      <div className="space-y-3">
        {almaInsights.map((ins) => (
          <InsightCard key={ins.id} insight={ins} />
        ))}
      </div>

      {/* CTA */}
      <CTACard
        title="Ask Alma to build or customize training for your team"
        buttonLabel="Create academy request"
        accent="alma"
      />
    </div>
  );
}
