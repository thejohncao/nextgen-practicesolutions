import { useState, useMemo } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { getToothInfo } from './toothData';
import { getDiagnosesForTooth, type Diagnosis } from '../../data/diagnoses';
import { PROCEDURES, type Procedure } from '../../data/procedures';
import type { Phase } from '../../types';

interface ToothDrawerProps {
  toothNumber: number | null;
  open: boolean;
  onClose: () => void;
  onAddTreatment: (data: {
    toothNumber: number;
    diagnosis: string;
    treatmentCode: string;
    treatmentName: string;
    feeCents: number;
    durationMinutes: number;
    phase: Phase;
  }) => void;
}

export default function ToothDrawer({ toothNumber, open, onClose, onAddTreatment }: ToothDrawerProps) {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<Diagnosis | null>(null);
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);
  const [phase, setPhase] = useState<Phase>(1);

  const toothInfo = toothNumber ? getToothInfo(toothNumber) : null;
  const diagnoses = toothNumber ? getDiagnosesForTooth(toothNumber) : [];

  // Filter procedures based on selected diagnosis's suggested categories
  const filteredProcedures = useMemo(() => {
    if (!selectedDiagnosis) return PROCEDURES;
    return PROCEDURES.filter((p) =>
      selectedDiagnosis.suggestedCategories.includes(p.category)
    );
  }, [selectedDiagnosis]);

  function handleAdd() {
    if (!toothNumber || !selectedDiagnosis || !selectedProcedure) return;

    onAddTreatment({
      toothNumber,
      diagnosis: selectedDiagnosis.name,
      treatmentCode: selectedProcedure.code,
      treatmentName: selectedProcedure.name,
      feeCents: selectedProcedure.feeCents,
      durationMinutes: selectedProcedure.durationMinutes,
      phase,
    });

    // Reset and close
    setSelectedDiagnosis(null);
    setSelectedProcedure(null);
    setPhase(1);
    onClose();
  }

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      setSelectedDiagnosis(null);
      setSelectedProcedure(null);
      setPhase(1);
      onClose();
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl max-h-[70vh] bg-[var(--narrative-surface)]">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-[var(--narrative-text)]">
            {toothInfo
              ? `Tooth #${toothInfo.number} — ${toothInfo.name}`
              : 'Select Tooth'}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-5 pb-6">
          {/* Diagnosis Selector */}
          <div>
            <label className="block text-sm font-medium text-[var(--narrative-text)] mb-2">
              Diagnosis
            </label>
            <Select
              value={selectedDiagnosis?.code || ''}
              onValueChange={(code) => {
                const d = diagnoses.find((dx) => dx.code === code);
                setSelectedDiagnosis(d || null);
                setSelectedProcedure(null); // Reset procedure when diagnosis changes
              }}
            >
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Select diagnosis..." />
              </SelectTrigger>
              <SelectContent>
                {diagnoses.map((d) => (
                  <SelectItem key={d.code} value={d.code}>
                    <div>
                      <span className="font-medium">{d.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{d.code}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedDiagnosis && (
              <p className="text-xs text-[var(--narrative-text-secondary)] mt-1">
                {selectedDiagnosis.description}
              </p>
            )}
          </div>

          {/* Treatment Selector */}
          <div>
            <label className="block text-sm font-medium text-[var(--narrative-text)] mb-2">
              Treatment
            </label>
            <Select
              value={selectedProcedure?.code || ''}
              onValueChange={(code) => {
                const p = filteredProcedures.find((pr) => pr.code === code);
                setSelectedProcedure(p || null);
              }}
            >
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Select treatment..." />
              </SelectTrigger>
              <SelectContent>
                {filteredProcedures.map((p) => (
                  <SelectItem key={p.code} value={p.code}>
                    <div className="flex items-center justify-between w-full">
                      <span>{p.name}</span>
                      <span className="text-xs text-muted-foreground ml-3">
                        ${(p.feeCents / 100).toLocaleString()}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedProcedure && (
              <div className="flex items-center gap-4 mt-1 text-xs text-[var(--narrative-text-secondary)]">
                <span>{selectedProcedure.code}</span>
                <span>${(selectedProcedure.feeCents / 100).toLocaleString()}</span>
                <span>{selectedProcedure.durationMinutes}min</span>
              </div>
            )}
          </div>

          {/* Phase Assigner */}
          <div>
            <label className="block text-sm font-medium text-[var(--narrative-text)] mb-2">
              Phase
            </label>
            <div className="flex gap-2">
              {([1, 2, 3] as Phase[]).map((p) => {
                const colors = {
                  1: { bg: 'bg-[#E85D5D]', label: 'Urgent' },
                  2: { bg: 'bg-[#B68D40]', label: 'Important' },
                  3: { bg: 'bg-[#8B8B8B]', label: 'Maintenance' },
                };
                const c = colors[p];
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPhase(p)}
                    className={cn(
                      'flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all narrative-touch',
                      phase === p
                        ? 'border-current text-white ' + c.bg
                        : 'border-[var(--narrative-border)] text-[var(--narrative-text-secondary)] hover:border-gray-300'
                    )}
                  >
                    P{p} — {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add Button */}
          <Button
            onClick={handleAdd}
            disabled={!selectedDiagnosis || !selectedProcedure}
            className="w-full h-12 bg-narrative-gold hover:bg-narrative-gold-light text-white text-base font-medium"
          >
            Add to Plan
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
