import React from 'react';

const PracticeHealthHero = () => {
  return (
    <>
      {/* Wordmark */}
      <div className="absolute top-[44px] left-[48px] z-[100] ph-fadeUp ph-fadeUp-1">
        <div>
          <span className="font-bebas text-[13px] tracking-[0.35em] text-health-amber leading-none">
            NEXT
          </span>
          <span className="font-bebas text-[13px] tracking-[0.35em] text-health-text-main leading-none">
            GEN
          </span>
        </div>
        <div className="font-mono-dm text-[9px] tracking-[0.25em] text-health-text-dim mt-[5px] uppercase">
          Practice Solutions
        </div>
      </div>

      {/* Header block */}
      <div className="absolute top-[110px] left-[48px] z-[100] ph-fadeUp ph-fadeUp-2">
        <div className="font-mono-dm text-[10px] tracking-[0.2em] text-health-amber mb-[14px] uppercase flex items-center gap-[10px]">
          <span className="inline-block w-5 h-px bg-health-amber" />
          Audit Phase 04 / Stratigraphy
        </div>
        <h1 className="font-bebas text-[5.2rem] leading-[0.88] tracking-[0.02em] text-health-text-main">
          PRACTICE
          <br />
          <span className="text-health-amber">HEALTH</span>
          <br />
          INDEX
        </h1>
      </div>
    </>
  );
};

export default PracticeHealthHero;
