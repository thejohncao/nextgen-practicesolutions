import React from 'react';

const ClinicalSheet = () => {
  return (
    <div className="ph-sheet ph-sheet-clinical" id="sheet-clinical">
      <span className="absolute top-[22px] right-[24px] text-[9px] tracking-[0.2em] text-health-text-dim uppercase">
        Ref: L-01 // Clinical
      </span>
      <div className="grid grid-cols-2 gap-6 mt-12">
        <div className="border-l border-white/[0.08] pl-4">
          <span className="text-[9px] tracking-[0.18em] text-health-text-dim uppercase block">
            Patient Retention
          </span>
          <span className="font-bebas text-[34px] tracking-[0.04em] block mt-1 text-health-text-main">
            88.4%
          </span>
          <div className="ph-bar-track">
            <div className="ph-bar-fill" style={{ width: '88%' }} />
          </div>
        </div>
        <div className="border-l border-white/[0.08] pl-4">
          <span className="text-[9px] tracking-[0.18em] text-health-text-dim uppercase block">
            Case Acceptance
          </span>
          <span className="font-bebas text-[34px] tracking-[0.04em] block mt-1 text-health-text-main">
            62.1%
          </span>
          <div className="ph-bar-track">
            <div className="ph-bar-fill" style={{ width: '62%', animationDelay: '1.2s' }} />
          </div>
        </div>
      </div>
      <div className="ph-rule" style={{ marginTop: '32px' }} />
      <svg width="100%" height="70" viewBox="0 0 440 70">
        <path
          d="M0 55 Q 55 10, 110 45 T 220 25 T 330 60 T 440 18"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          className="ph-svg-line"
        />
      </svg>
    </div>
  );
};

export default ClinicalSheet;
