import React from 'react';

const OperationalSheet = () => {
  return (
    <div className="ph-sheet ph-sheet-operational" id="sheet-operational">
      <span className="absolute top-[22px] right-[24px] text-[9px] tracking-[0.2em] text-health-text-dim uppercase">
        Ref: L-02 // Operations
      </span>
      <div className="grid grid-cols-2 gap-6 mt-12">
        <div className="border-l border-health-amber-dim pl-4">
          <span className="text-[9px] tracking-[0.18em] text-health-text-dim uppercase block">
            Chair Utilization
          </span>
          <span className="font-bebas text-[34px] tracking-[0.04em] block mt-1 text-health-amber">
            74.0%
          </span>
        </div>
        <div className="border-l border-health-amber-dim pl-4">
          <span className="text-[9px] tracking-[0.18em] text-health-text-dim uppercase block">
            Overhead Ratio
          </span>
          <span className="font-bebas text-[34px] tracking-[0.04em] block mt-1 text-health-amber">
            58.2%
          </span>
        </div>
      </div>
      <div className="mt-8 font-mono-dm text-[10px] leading-[1.9] text-health-amber tracking-[0.05em]">
        <span className="text-health-text-dim">&gt; INIT DIAGNOSTIC SCAN</span>
        <br />
        &gt; ANALYZING SCHEDULING FRICTION...
        <br />
        &gt; DETECTED 14% LATE-CANCEL DRIFT
        <br />
        <span className="text-health-text-dim">&gt; RECOMMENDATION QUEUED</span>
      </div>
    </div>
  );
};

export default OperationalSheet;
