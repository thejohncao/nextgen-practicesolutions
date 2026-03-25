import { T } from "../data/assessmentData";

interface RingProps {
  pct: number;
  size?: number;
  stroke?: number;
  color?: string;
}

export function Ring({ pct, size = 90, stroke = 6, color = T.amber }: RingProps) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={circ - (pct / 100) * circ} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(.23,1,.32,1)" }}
      />
    </svg>
  );
}
