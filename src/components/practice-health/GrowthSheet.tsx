import React from 'react';

const GrowthSheet = () => {
  return (
    <div className="ph-sheet ph-sheet-growth" id="sheet-growth">
      <span className="absolute top-[22px] right-[24px] text-[9px] tracking-[0.2em] text-health-text-dim uppercase">
        Ref: L-03 // Growth
      </span>
      <span className="font-bebas text-[72px] text-health-amber leading-none block mt-4">
        A+
      </span>
      <span className="text-[10px] text-health-text-mid tracking-[0.15em] uppercase mt-[6px] block">
        Stratigraphic Score — Practice Tier 1
      </span>
      <div className="ph-rule" />
      <p className="text-[11px] leading-[1.7] text-health-text-mid mt-[14px]">
        High potential detected in digital referral pipelines. Layer 3 indicates
        surplus local search authority (82/100). Conversion velocity exceeds
        regional benchmark by 1.4×.
      </p>
      <div className="grid grid-cols-2 gap-6 mt-7">
        <div className="border-l border-health-amber-dim pl-4">
          <span className="text-[9px] tracking-[0.18em] text-health-text-dim uppercase block">
            Revenue Upside
          </span>
          <span className="font-bebas text-[34px] tracking-[0.04em] block mt-1 text-health-amber">
            +$240k
          </span>
        </div>
        <div className="border-l border-health-amber-dim pl-4">
          <span className="text-[9px] tracking-[0.18em] text-health-text-dim uppercase block">
            Growth Velocity
          </span>
          <span className="font-bebas text-[34px] tracking-[0.04em] block mt-1 text-health-amber">
            1.4×
          </span>
        </div>
      </div>
    </div>
  );
};

export default GrowthSheet;
