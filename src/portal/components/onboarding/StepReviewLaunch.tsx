import { usePractice } from '../../context/PracticeContext';
import { giselleAssets, milesWorkflows, devonTools, academyPrograms, sopLibrary, rolePaths } from '../../data/mock';
import { GROWTH_KPIS, MANAGEMENT_KPIS, DEVELOPMENT_KPIS } from '../../data/kpiDefinitions';
import { pillarScore, healthScore, scoreGrade, gradeColor } from '../../utils/kpiScoring';
import { TrendingUp, Settings2, GraduationCap, BookOpen, Building2, MapPin, Monitor, Users, Stethoscope, Clock } from 'lucide-react';

function ScoreRing({ score, size = 140, stroke = 10 }: { score: number; size?: number; stroke?: number }) {
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const pct = Math.min(score, 100) / 100;
  const grade = scoreGrade(score);
  const color = gradeColor(grade);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.23,1,.32,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold" style={{ color }}>{Math.round(score)}</span>
        <span className="text-[10px] text-[#6B7280] uppercase tracking-wider mt-0.5">Month 0</span>
      </div>
    </div>
  );
}

export default function StepReviewLaunch() {
  const { activePractice, getItemEnabled, getAlmaItemEnabled, onboardingState } = usePractice();

  const allKpis = onboardingState?.kpis ?? {};
  const gScore = pillarScore(GROWTH_KPIS, allKpis);
  const mScore = pillarScore(MANAGEMENT_KPIS, allKpis);
  const dScore = pillarScore(DEVELOPMENT_KPIS, allKpis);
  const overall = healthScore([gScore, mScore, dScore]);

  const totalKpis = GROWTH_KPIS.length + MANAGEMENT_KPIS.length + DEVELOPMENT_KPIS.length;
  const allDefs = [...GROWTH_KPIS, ...MANAGEMENT_KPIS, ...DEVELOPMENT_KPIS];
  const kpisCaptured = allDefs.filter(d => allKpis[d.id]?.current != null).length;
  const targetsSet = allDefs.filter(d => allKpis[d.id]?.target != null).length;
  const blank = totalKpis - kpisCaptured;

  const growthFilled = GROWTH_KPIS.filter(d => allKpis[d.id]?.current != null).length;
  const mgmtFilled = MANAGEMENT_KPIS.filter(d => allKpis[d.id]?.current != null).length;
  const devFilled = DEVELOPMENT_KPIS.filter(d => allKpis[d.id]?.current != null).length;

  // Systems counts
  const giselleCount = giselleAssets.filter(a => getItemEnabled('giselle', a.id)).length;
  const milesCount = milesWorkflows.filter(w => getItemEnabled('miles', w.id)).length;
  const devonCount = devonTools.filter(t => getItemEnabled('devon', t.id)).length;
  const almaProgCount = academyPrograms.filter(p => getAlmaItemEnabled('programs', p.id)).length;
  const almaModCount = rolePaths.flatMap(r => r.modules).filter(m => getAlmaItemEnabled('rolePaths', m.id)).length;
  const almaSopCount = sopLibrary.filter(s => getAlmaItemEnabled('sops', s.id)).length;
  const almaCount = almaProgCount + almaModCount + almaSopCount;
  const almaTotal = academyPrograms.length + rolePaths.flatMap(r => r.modules).length + sopLibrary.length;
  const totalActive = giselleCount + milesCount + devonCount + almaCount;
  const totalSystems = giselleAssets.length + milesWorkflows.length + devonTools.length + almaTotal;

  const pillarBreakdown = [
    { name: 'Growth', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', filled: growthFilled, total: GROWTH_KPIS.length, score: gScore },
    { name: 'Management', icon: Settings2, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', filled: mgmtFilled, total: MANAGEMENT_KPIS.length, score: mScore },
    { name: 'Development', icon: GraduationCap, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', filled: devFilled, total: DEVELOPMENT_KPIS.length, score: dScore },
  ];

  const systemsPillars = [
    { name: 'Giselle — Growth', icon: TrendingUp, color: 'text-emerald-400', count: giselleCount, total: giselleAssets.length },
    { name: 'Miles — Management', icon: Settings2, color: 'text-rose-400', count: milesCount, total: milesWorkflows.length },
    { name: 'Devon — Development', icon: GraduationCap, color: 'text-indigo-400', count: devonCount, total: devonTools.length },
    { name: 'Alma — Academy', icon: BookOpen, color: 'text-amber-400', count: almaCount, total: almaTotal },
  ];

  const profileItems = [
    { icon: Building2, label: 'Practice', value: activePractice.name },
    { icon: Users, label: 'Doctor', value: activePractice.ownerName },
    { icon: MapPin, label: 'Location', value: activePractice.locations.join(', ') },
    { icon: Monitor, label: 'PMS', value: activePractice.pms || '—' },
    { icon: Stethoscope, label: 'Providers', value: activePractice.providers || '—' },
    { icon: Clock, label: 'Specialties', value: activePractice.specialties || '—' },
  ];

  const nextSteps = [
    'Your practice profile and baseline KPIs are saved.',
    'AI agents begin analyzing your data and generating insights.',
    'Within 48 hours, your personalized dashboard populates with recommendations.',
    'Your dedicated account team reaches out to schedule your kickoff call.',
  ];

  return (
    <div>
      <h2 className="text-lg font-bold text-[#F9FAFB] mb-1">Baseline Scorecard Complete</h2>
      <p className="text-sm text-[#6B7280] mb-6">
        Here's a summary of {activePractice.name || 'your practice'}'s baseline assessment.
      </p>

      {/* Score Ring */}
      <div className="flex justify-center mb-6">
        <ScoreRing score={overall ?? 0} />
      </div>

      {/* Overall grade label */}
      {overall !== null && (
        <div className="text-center mb-6">
          <span
            className="text-sm font-semibold px-3 py-1 rounded-full"
            style={{
              color: gradeColor(scoreGrade(overall)),
              backgroundColor: gradeColor(scoreGrade(overall)) + '18',
            }}
          >
            {scoreGrade(overall)}
          </span>
        </div>
      )}

      {/* Practice Profile Summary */}
      <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 mb-4">
        <h4 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">Practice Profile</h4>
        <div className="grid grid-cols-2 gap-3">
          {profileItems.map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <item.icon className="w-3.5 h-3.5 text-[#6B7280] flex-shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-[#6B7280] block">{item.label}</span>
                <span className="text-xs text-[#E5E7EB] font-medium truncate block">{item.value || '—'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3 text-center">
          <span className="text-lg font-bold text-[#10B981]">{kpisCaptured}</span>
          <span className="text-lg text-[#6B7280]">/{totalKpis}</span>
          <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mt-1">KPIs Captured</p>
        </div>
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3 text-center">
          <span className="text-lg font-bold text-[#3B82F6]">{targetsSet}</span>
          <span className="text-lg text-[#6B7280]">/{totalKpis}</span>
          <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mt-1">Targets Set</p>
        </div>
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3 text-center">
          <span className="text-lg font-bold text-[#6B7280]">{blank}</span>
          <p className="text-[10px] text-[#6B7280] uppercase tracking-wider mt-1">Blank / Untracked</p>
        </div>
      </div>

      {/* Pillar Breakdown */}
      <div className="space-y-3 mb-4">
        {pillarBreakdown.map(p => {
          const pct = p.total > 0 ? (p.filled / p.total) * 100 : 0;
          return (
            <div key={p.name} className={`${p.bg} border ${p.border} rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <p.icon className={`w-4 h-4 ${p.color}`} />
                  <span className={`text-sm font-medium ${p.color}`}>{p.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#9CA3AF]">{p.filled} of {p.total} baselined</span>
                  {p.score !== null && (
                    <span
                      className="text-xs font-semibold px-1.5 py-0.5 rounded"
                      style={{ color: gradeColor(scoreGrade(p.score)), backgroundColor: gradeColor(scoreGrade(p.score)) + '18' }}
                    >
                      {Math.round(p.score)}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/[0.06]">
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: gradeColor(scoreGrade(p.score ?? 0)) }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Systems Activation */}
      <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">Systems Activation</span>
          <span className="text-sm text-[#F5A623] font-semibold">{totalActive} / {totalSystems}</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/[0.06] mb-4">
          <div
            className="h-1.5 rounded-full bg-[#F5A623] transition-all duration-500"
            style={{ width: `${totalSystems > 0 ? (totalActive / totalSystems) * 100 : 0}%` }}
          />
        </div>
        <div className="space-y-2">
          {systemsPillars.map(p => (
            <div key={p.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p.icon className={`w-3.5 h-3.5 ${p.color}`} />
                <span className="text-xs text-[#E5E7EB]">{p.name}</span>
              </div>
              <span className="text-xs text-[#6B7280]">{p.count} / {p.total}</span>
            </div>
          ))}
        </div>
      </div>

      {/* What Happens Next */}
      <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4">
        <h4 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-3">What Happens Next</h4>
        <div className="space-y-3">
          {nextSteps.map((step, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-[#F5A623]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-[#F5A623]">{i + 1}</span>
              </div>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
