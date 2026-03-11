import { cn } from '@/lib/utils';
import { Pillar, KPI } from '../types';
import KPIStatCard from './KPIStatCard';

interface Props {
  pillar: Pillar;
  kpis: KPI[];
}

const accentGradients: Record<string, string> = {
  giselle: 'from-emerald-500 to-emerald-400',
  miles: 'from-rose-600 to-rose-400',
  devon: 'from-indigo-500 to-indigo-400',
  alma: 'from-amber-500 to-amber-400',
};

const accentBgs: Record<string, string> = {
  giselle: 'bg-emerald-500/[0.06]',
  miles: 'bg-rose-500/[0.06]',
  devon: 'bg-indigo-500/[0.06]',
  alma: 'bg-amber-500/[0.06]',
};

export default function PillarHero({ pillar, kpis }: Props) {
  return (
    <div className={cn('rounded-2xl border border-white/[0.06] overflow-hidden', accentBgs[pillar.slug])}>
      <div className="px-6 lg:px-8 pt-8 pb-2">
        <div className="flex items-center gap-3 mb-2">
          <div
            className={cn(
              'w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-bold text-base',
              accentGradients[pillar.slug]
            )}
          >
            {pillar.agentName[0]}
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#F9FAFB]">{pillar.title}</h1>
            <p className="text-sm text-[#9CA3AF]">{pillar.description}</p>
          </div>
        </div>
      </div>
      <div className="px-6 lg:px-8 pb-6 pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {kpis.map((kpi) => (
          <KPIStatCard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            change={kpi.change}
            changeDirection={kpi.changeDirection}
            className="bg-white/[0.06]"
          />
        ))}
      </div>
    </div>
  );
}
