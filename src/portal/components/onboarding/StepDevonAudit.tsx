import { usePractice } from '../../context/PracticeContext';
import { devonTools } from '../../data/mock';
import AuditToggleList from './AuditToggleList';

export default function StepDevonAudit() {
  const { getItemEnabled, toggleItem } = usePractice();

  const items = devonTools.map((t) => ({
    id: t.id,
    name: t.name,
    enabled: getItemEnabled('devon', t.id),
  }));

  return (
    <div>
      <h2 className="text-lg font-bold text-indigo-400 mb-1">Devon — Practice Development</h2>
      <p className="text-sm text-[#6B7280] mb-6">
        Which case acceptance tools and development programs are currently active?
      </p>
      <AuditToggleList
        title="Tools & Programs"
        subtitle="Case presentation, coaching, and conversion tools"
        items={items}
        onToggle={(id) => toggleItem('devon', id)}
        accentColor="bg-indigo-400"
      />
    </div>
  );
}
