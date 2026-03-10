import React, { useEffect, useRef, useCallback } from 'react';
import ClinicalSheet from './ClinicalSheet';
import OperationalSheet from './OperationalSheet';
import GrowthSheet from './GrowthSheet';

const StratigraphyStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isHoveredRef.current || !containerRef.current) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 14;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;

    const sheets = containerRef.current.querySelectorAll<HTMLElement>('.ph-sheet');
    const offsets = [
      { tx: 0, ty: 0, tz: 0 },
      { tx: -38, ty: -28, tz: 50 },
      { tx: -76, ty: -56, tz: 100 },
    ];

    sheets.forEach((sheet, i) => {
      const o = offsets[i];
      sheet.style.transform = `translate3d(${o.tx + x * (i + 1) * 0.5}px, ${o.ty + y * (i + 1) * 0.5}px, ${o.tz}px) rotateX(${14 - y * 0.3}deg) rotateY(${-18 + x * 0.3}deg) rotateZ(1.5deg)`;
    });
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    // Clear inline transforms so CSS hover rules take over
    if (containerRef.current) {
      containerRef.current.querySelectorAll<HTMLElement>('.ph-sheet').forEach((sheet) => {
        sheet.style.transform = '';
      });
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="ph-strat-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ClinicalSheet />
      <OperationalSheet />
      <GrowthSheet />
    </div>
  );
};

export default StratigraphyStack;
