import { useState } from 'react';
import { toast } from 'sonner';
import { useNarrativePlan } from '../context/NarrativePlanContext';
import ToothChart from '../components/tooth-chart/ToothChart';
import ToothDrawer from '../components/tooth-chart/ToothDrawer';
import TreatmentList from '../components/builder/TreatmentList';
import type { Phase } from '../types';

export default function PlanBuilderPage() {
  const { items, phaseGroups, totalFeeCents, addItem, removeItem } = useNarrativePlan();
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleSelectTooth(toothNumber: number) {
    setSelectedTooth(toothNumber);
    setDrawerOpen(true);
  }

  async function handleAddTreatment(data: {
    toothNumber: number;
    diagnosis: string;
    treatmentCode: string;
    treatmentName: string;
    feeCents: number;
    durationMinutes: number;
    phase: Phase;
  }) {
    try {
      await addItem({
        tooth_number: data.toothNumber,
        diagnosis: data.diagnosis,
        treatment_code: data.treatmentCode,
        treatment_name: data.treatmentName,
        fee_cents: data.feeCents,
        duration_minutes: data.durationMinutes,
        phase: data.phase,
        phase_date: null,
        notes: null,
      });
      toast.success(`Added ${data.treatmentName} to Phase ${data.phase}`);
    } catch {
      toast.error('Failed to add treatment');
    }
  }

  async function handleRemoveItem(id: string) {
    try {
      await removeItem(id);
      toast.success('Treatment removed');
    } catch {
      toast.error('Failed to remove treatment');
    }
  }

  return (
    <div className="flex h-[calc(100vh-120px)]">
      {/* Main area: Tooth Chart */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
        <ToothChart
          selectedTooth={selectedTooth}
          onSelectTooth={handleSelectTooth}
          items={items}
        />
      </div>

      {/* Right sidebar: Treatment List */}
      <aside className="w-80 border-l border-[var(--narrative-border)] p-4">
        <TreatmentList
          phaseGroups={phaseGroups}
          totalFeeCents={totalFeeCents}
          onRemoveItem={handleRemoveItem}
        />
      </aside>

      {/* Tooth Drawer (bottom sheet) */}
      <ToothDrawer
        toothNumber={selectedTooth}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedTooth(null);
        }}
        onAddTreatment={handleAddTreatment}
      />
    </div>
  );
}
