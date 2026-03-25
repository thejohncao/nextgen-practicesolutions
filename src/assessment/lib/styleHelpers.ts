// ═══════════════════════════════════════════════════════════
// STYLE HELPERS — Shared inline style factories and font stacks
// ═══════════════════════════════════════════════════════════

import { T } from "../data/assessmentData";

export const card = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  background: "rgba(255,255,255,0.025)",
  border: `1px solid ${T.border}`,
  borderRadius: 4,
  padding: 28,
  ...extra,
});

export const amberCard = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  ...card(),
  background: "rgba(245,166,35,0.04)",
  border: `1px solid ${T.amberBorder}`,
  ...extra,
});

export const btn = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  background: "transparent",
  border: `1px solid ${T.amber}`,
  color: T.amber,
  padding: "13px 28px",
  fontFamily: "'DM Mono',monospace",
  fontSize: 11,
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  cursor: "pointer",
  ...extra,
});

export const mono: React.CSSProperties = { fontFamily: "'DM Mono',monospace" };
export const bebas: React.CSSProperties = { fontFamily: "'Bebas Neue',sans-serif" };
export const sans: React.CSSProperties = { fontFamily: "'DM Sans',sans-serif" };

export const VIEW = { HOME: 0, INTRO: 1, Q: 2, CHECKPOINT: 3, RESULTS: 4, REPORT: 5 } as const;
