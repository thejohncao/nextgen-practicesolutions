"use client";

import { useState } from "react";

const procedures = [
  { name: "Porcelain Veneer", cost: 1600, insurance: 0 },
  { name: "Crown (PFM)", cost: 1200, insurance: 600 },
  { name: "Crown (Zirconia)", cost: 1500, insurance: 600 },
  { name: "Root Canal (Anterior)", cost: 900, insurance: 450 },
  { name: "Root Canal (Molar)", cost: 1200, insurance: 550 },
  { name: "Implant (Single)", cost: 3500, insurance: 0 },
  { name: "Extraction (Surgical)", cost: 350, insurance: 175 },
  { name: "Composite Filling", cost: 250, insurance: 125 },
  { name: "Whitening (In-Office)", cost: 500, insurance: 0 },
  { name: "Night Guard", cost: 450, insurance: 200 },
];

const membershipTiers = [
  { name: "Glow", discount: 0.10, monthly: 29 },
  { name: "Luminate", discount: 0.15, monthly: 49 },
  { name: "Radiate", discount: 0.20, monthly: 79 },
];

export function TreatmentEstimator() {
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [membership, setMembership] = useState<number | null>(null);

  const toggleProcedure = (name: string) => {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[name]) {
        delete next[name];
      } else {
        next[name] = 1;
      }
      return next;
    });
  };

  const updateQty = (name: string, qty: number) => {
    if (qty <= 0) {
      setSelected((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    } else {
      setSelected((prev) => ({ ...prev, [name]: qty }));
    }
  };

  const selectedItems = Object.entries(selected).map(([name, qty]) => {
    const proc = procedures.find((p) => p.name === name)!;
    return { ...proc, qty };
  });

  const subtotal = selectedItems.reduce((sum, item) => sum + item.cost * item.qty, 0);
  const insuranceCoverage = selectedItems.reduce((sum, item) => sum + item.insurance * item.qty, 0);
  const membershipDiscount = membership !== null ? Math.round((subtotal - insuranceCoverage) * membershipTiers[membership].discount) : 0;
  const patientCost = subtotal - insuranceCoverage - membershipDiscount;
  const monthlyPayment = patientCost > 0 ? Math.round(patientCost / 24) : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Procedure Selection */}
      <div className="lg:col-span-3 space-y-3">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
          Select Procedures
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {procedures.map((proc) => {
            const isSelected = selected[proc.name] !== undefined;
            return (
              <button
                key={proc.name}
                onClick={() => toggleProcedure(proc.name)}
                className={`flex items-center justify-between rounded-[10px] border p-3 text-left transition-all ${
                  isSelected
                    ? "border-[var(--color-accent)]/50 bg-[var(--color-accent)]/5"
                    : "border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-border-secondary)]"
                }`}
              >
                <div>
                  <p className="text-sm text-[var(--color-text-primary)]">{proc.name}</p>
                  <p className="text-xs text-[var(--color-text-tertiary)]">
                    ${proc.cost.toLocaleString()}
                    {proc.insurance > 0 && ` (ins: $${proc.insurance})`}
                  </p>
                </div>
                {isSelected && (
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => updateQty(proc.name, (selected[proc.name] || 1) - 1)}
                      className="h-6 w-6 rounded bg-[var(--color-bg-tertiary)] text-xs text-[var(--color-text-secondary)]"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs text-[var(--color-text-primary)]">{selected[proc.name]}</span>
                    <button
                      onClick={() => updateQty(proc.name, (selected[proc.name] || 1) + 1)}
                      className="h-6 w-6 rounded bg-[var(--color-bg-tertiary)] text-xs text-[var(--color-text-secondary)]"
                    >
                      +
                    </button>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="lg:col-span-2">
        <div className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-5 space-y-4 sticky top-24">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
            Cost Estimate
          </h3>

          {selectedItems.length === 0 ? (
            <p className="text-sm text-[var(--color-text-tertiary)] py-4 text-center">Select procedures to see estimate</p>
          ) : (
            <>
              <div className="space-y-2 border-b border-[var(--color-border-primary)] pb-4">
                {selectedItems.map((item) => (
                  <div key={item.name} className="flex justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)]">
                      {item.name} {item.qty > 1 && `×${item.qty}`}
                    </span>
                    <span className="text-[var(--color-text-primary)]">${(item.cost * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">Subtotal</span>
                  <span className="text-[var(--color-text-primary)]">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[var(--color-success)]">
                  <span>Insurance</span>
                  <span>-${insuranceCoverage.toLocaleString()}</span>
                </div>
                {membershipDiscount > 0 && (
                  <div className="flex justify-between text-[var(--color-accent)]">
                    <span>Membership</span>
                    <span>-${membershipDiscount.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Membership Selector */}
              <div>
                <p className="text-xs text-[var(--color-text-tertiary)] mb-2">Membership discount</p>
                <div className="flex gap-1">
                  {membershipTiers.map((tier, i) => (
                    <button
                      key={tier.name}
                      onClick={() => setMembership(membership === i ? null : i)}
                      className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-colors ${
                        membership === i
                          ? "bg-[var(--color-accent)] text-white"
                          : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]"
                      }`}
                    >
                      {tier.name} ({tier.discount * 100}%)
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-[var(--color-border-primary)] pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-[var(--color-text-primary)]">Your Cost</span>
                  <span className="text-[var(--color-accent)]">${patientCost.toLocaleString()}</span>
                </div>
                <p className="mt-2 text-center text-sm text-[var(--color-text-secondary)]">
                  or <span className="font-semibold text-[var(--color-text-primary)]">${monthlyPayment}/mo</span> with 24-month financing
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
