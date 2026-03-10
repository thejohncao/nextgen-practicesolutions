import React from 'react';

interface LayerNavProps {
  activeLayer: number;
  onLayerChange: (index: number) => void;
}

const layers = [
  { id: 'clinical', label: 'L-01 Clinical' },
  { id: 'operational', label: 'L-02 Operations' },
  { id: 'growth', label: 'L-03 Growth' },
];

const LayerNav = ({ activeLayer, onLayerChange }: LayerNavProps) => {
  return (
    <div className="absolute left-[48px] bottom-[130px] flex flex-col gap-2 z-[100] ph-fadeUp ph-fadeUp-4">
      {layers.map((layer, index) => (
        <button
          key={layer.id}
          onClick={() => onLayerChange(index)}
          className={`flex items-center gap-[10px] font-mono-dm text-[9px] tracking-[0.15em] uppercase cursor-pointer transition-colors duration-200 bg-transparent border-none p-0 ${
            activeLayer === index ? 'text-health-amber' : 'text-health-text-dim hover:text-health-amber'
          }`}
        >
          <div
            className={`w-[6px] h-[6px] rounded-full transition-colors duration-200 ${
              activeLayer === index ? 'bg-health-amber' : 'bg-health-text-dim'
            }`}
          />
          {layer.label}
        </button>
      ))}
    </div>
  );
};

export default LayerNav;
