import { useState } from 'react';
import { getPillar } from '../data/pillars';
import {
  almaHeroKPIs,
  almaDetailKPIs,
  academyPrograms as mockAcademyPrograms,
  rolePaths as mockRolePaths,
  sopLibrary as mockSopLibrary,
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
import PillarChecklist from '../components/PillarChecklist';
import { usePractice } from '../context/PracticeContext';
import { usePracticeData } from '../hooks/usePracticeData';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, BookOpen, Search } from 'lucide-react';

// ── Program Card ───────────────────────────────────────────────────

const statusLabel: Record<AcademyProgram['status'], string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  completed: 'Completed',
};

const statusColor: Record<AcademyProgram['status'], string> = {
  not_started: 'text-[#9CA3AF] bg-white/[0.06]',
  in_progress: 'text-amber-400 bg-amber-500/10',
  completed: 'text-emerald-400 bg-emerald-500/10',
};

function ProgramCard({ program }: { program: AcademyProgram }) {
  return (
    <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] shadow-glass p-5 flex flex-col gap-3 transition-all duration-200 hover:border-white/[0.10]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-[#F9FAFB]">{program.name}</h3>
        <span className={cn('text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap', statusColor[program.status])}>
          {statusLabel[program.status]}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {program.roles.map((r) => (
          <span key={r} className="text-[11px] font-medium bg-white/[0.06] text-[#9CA3AF] px-2 py-0.5 rounded-md">{r}</span>
        ))}
        <span className="text-[11px] text-[#6B7280] px-1">{program.duration}</span>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#9CA3AF]">Progress</span>
          <span className="text-xs font-semibold text-[#F9FAFB]">{program.progress}%</span>
        </div>
        <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all',
              program.progress === 100 ? 'bg-emerald-500' : 'bg-amber-500'
            )}
            style={{ width: `${program.progress}%` }}
          />
        </div>
      </div>
      <p className="text-[11px] text-[#6B7280]">Last activity: {program.lastActivity}</p>
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
    <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] shadow-glass overflow-hidden transition-all duration-200 hover:border-white/[0.10]">
      <div className="px-5 py-3.5 border-b border-white/[0.04] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#F9FAFB]">{path.role}</h3>
          <p className="text-[11px] text-[#6B7280]">{path.certLevels[path.currentLevel - 1]} &middot; {completed}/{total} modules</p>
        </div>
        <span className="text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
          Level {path.currentLevel}
        </span>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {required.length > 0 && (
          <div className="px-5 py-2">
            <p className="text-[10px] uppercase tracking-wider text-[#6B7280] font-semibold mb-1">Required</p>
            {required.map((m) => (
              <div key={m.id} className="flex items-center gap-2.5 py-1.5">
                {m.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-[#6B7280] flex-shrink-0" />
                )}
                <span className={cn('text-sm', m.completed ? 'text-[#6B7280]' : 'text-[#9CA3AF]')}>{m.name}</span>
              </div>
            ))}
          </div>
        )}
        {optional.length > 0 && (
          <div className="px-5 py-2">
            <p className="text-[10px] uppercase tracking-wider text-[#6B7280] font-semibold mb-1">Optional</p>
            {optional.map((m) => (
              <div key={m.id} className="flex items-center gap-2.5 py-1.5">
                {m.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-[#6B7280] flex-shrink-0" />
                )}
                <span className={cn('text-sm', m.completed ? 'text-[#6B7280]' : 'text-[#9CA3AF]')}>{m.name}</span>
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
      <BookOpen className="w-4 h-4 text-amber-400 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[#F9FAFB] font-medium truncate">{sop.title}</p>
        <p className="text-[11px] text-[#6B7280]">
          {sop.category} &middot; Updated {sop.lastUpdated} &middot; {sop.assignedRoles.join(', ')}
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-16 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full', sop.completionRate >= 90 ? 'bg-emerald-500' : sop.completionRate >= 70 ? 'bg-amber-500' : 'bg-red-400')}
            style={{ width: `${sop.completionRate}%` }}
          />
        </div>
        <span className="text-xs font-medium text-[#9CA3AF] w-8 text-right">{sop.completionRate}%</span>
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
  const { isDemo, getAlmaItemEnabled, toggleAlmaItem } = usePractice();
  const { academyPrograms, rolePaths, sopLibrary } = usePracticeData();

  const filteredPaths = roleFilter === 'All' ? rolePaths : rolePaths.filter((p) => p.role === roleFilter);

  const filteredSOPs = sopLibrary.filter((sop) => {
    const matchCategory = sopCategory === 'All' || sop.category === sopCategory;
    const matchSearch = !sopSearch || sop.title.toLowerCase().includes(sopSearch.toLowerCase());
    return matchCategory && matchSearch;
  });

  const programChecklist = mockAcademyPrograms.map((p) => ({
    id: p.id,
    name: p.name,
    enabled: getAlmaItemEnabled('programs', p.id),
  }));
  const moduleChecklist = mockRolePaths.flatMap((rp) =>
    rp.modules.map((m) => ({
      id: m.id,
      name: `${rp.role}: ${m.name}`,
      enabled: getAlmaItemEnabled('rolePaths', m.id),
    }))
  );
  const sopChecklist = mockSopLibrary.map((s) => ({
    id: s.id,
    name: s.title,
    enabled: getAlmaItemEnabled('sops', s.id),
  }));

  return (
    <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto space-y-8">
      <div data-tour="alma-hero"><PillarHero pillar={pillar} kpis={almaHeroKPIs} /></div>

      <SectionHeader title="Academy Overview" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricGrid title="Team Onboarding" metrics={almaDetailKPIs.teamOnboarding} />
        <MetricGrid title="Certifications" metrics={almaDetailKPIs.certifications} />
        <MetricGrid title="Training Activity" metrics={almaDetailKPIs.trainingActivity} />
        <MetricGrid title="SOP Library Usage" metrics={almaDetailKPIs.sopLibrary} />
      </div>

      <MiniChart data={trainingCompletionTrend} color="#F5A623" title="Modules Completed per Month" />

      {/* Onboarding Checklists (non-demo only) */}
      {!isDemo && (
        <div className="space-y-4">
          <PillarChecklist title="Training Programs Checklist" items={programChecklist} onToggle={(id) => toggleAlmaItem('programs', id)} />
          <PillarChecklist title="Role Learning Modules Checklist" items={moduleChecklist} onToggle={(id) => toggleAlmaItem('rolePaths', id)} />
          <PillarChecklist title="SOP Library Checklist" items={sopChecklist} onToggle={(id) => toggleAlmaItem('sops', id)} />
        </div>
      )}

      <SectionHeader title="Programs & Tracks" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {academyPrograms.map((prg) => (
          <ProgramCard key={prg.id} program={prg} />
        ))}
      </div>

      <SectionHeader title="Role-Based Learning Paths" />
      <div className="flex flex-wrap gap-2 mb-2">
        {roleFilters.map((f) => (
          <button
            key={f}
            onClick={() => setRoleFilter(f)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
              roleFilter === f ? 'bg-amber-600 text-white' : 'bg-white/[0.06] text-[#9CA3AF] hover:bg-white/[0.10]'
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

      <SectionHeader title="SOP Library" />
      <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] shadow-glass overflow-hidden">
        <div className="px-5 py-3.5 border-b border-white/[0.04] flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search SOPs..."
              value={sopSearch}
              onChange={(e) => setSopSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm text-[#F9FAFB] placeholder-[#6B7280] rounded-lg bg-white/[0.04] border border-white/[0.08] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {sopCategories.map((c) => (
              <button
                key={c}
                onClick={() => setSopCategory(c)}
                className={cn(
                  'px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-all',
                  sopCategory === c ? 'bg-amber-600 text-white' : 'bg-white/[0.06] text-[#9CA3AF] hover:bg-white/[0.10]'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {filteredSOPs.length > 0 ? (
            filteredSOPs.map((sop) => <SOPRow key={sop.id} sop={sop} />)
          ) : (
            <p className="px-5 py-8 text-sm text-[#6B7280] text-center">No SOPs match your search.</p>
          )}
        </div>
      </div>

      <SectionHeader title="Recommendations" />
      <div className="space-y-3">
        {almaInsights.map((ins) => (
          <InsightCard key={ins.id} insight={ins} />
        ))}
      </div>

      <CTACard
        title="Ask Alma to build or customize training for your team"
        buttonLabel="Create academy request"
        accent="alma"
      />
    </div>
  );
}
