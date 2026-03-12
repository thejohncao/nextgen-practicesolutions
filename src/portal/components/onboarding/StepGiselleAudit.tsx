import { usePractice } from '../../context/PracticeContext';
import { giselleAssets } from '../../data/mock';
import { GROWTH_KPIS } from '../../data/kpiDefinitions';
import AuditToggleList from './AuditToggleList';
import KPIEntrySection from './KPIEntrySection';

export default function StepGiselleAudit() {
  const { getItemEnabled, toggleItem } = usePractice();

  const items = giselleAssets.map((a) => ({
    id: a.id,
    name: a.name,
    enabled: getItemEnabled('giselle', a.id),
  }));

  return (
    <div>
      <h2 className="text-lg font-bold text-emerald-400 mb-1">Giselle — Practice Growth</h2>
      <p className="text-sm text-[#6B7280] mb-6">
        Which marketing systems and assets does this practice currently have active?
      </p>
      <AuditToggleList
        title="Systems & Assets"
        subtitle="Marketing channels, website tools, and online presence"
        items={items}
        onToggle={(id) => toggleItem('giselle', id)}
        accentColor="bg-emerald-400"
      />
      <KPIEntrySection kpis={GROWTH_KPIS} pillarLabel="Growth" color="emerald" />
    </div>
  );
}
