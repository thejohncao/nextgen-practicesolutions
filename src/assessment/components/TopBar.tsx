import type { User } from "@supabase/supabase-js";
import { T } from "../data/assessmentData";
import { mono, bebas } from "../lib/styleHelpers";

interface TopBarProps {
  answered: number;
  catColor?: string;
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export function TopBar({ answered, catColor, user, onLoginClick, onLogout }: TopBarProps) {
  const pct = Math.round((answered / 100) * 100);
  const col = catColor || T.amber;
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(7,9,15,0.95)", borderBottom: `1px solid ${T.border}`, backdropFilter: "blur(20px)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: col, opacity: .7, animation: "blink 2s ease-in-out infinite" }} />
          <span style={{ ...bebas, fontSize: 14, letterSpacing: "0.35em", color: T.amber }}>NEXT</span>
          <span style={{ ...bebas, fontSize: 14, letterSpacing: "0.35em", color: T.textMain }}>GEN</span>
          <span style={{ ...mono, fontSize: 9, color: T.textDim, letterSpacing: "0.2em", marginLeft: 4 }}>PRACTICE SOLUTIONS</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {answered > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 120, height: 1, background: "rgba(255,255,255,0.06)", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, height: "100%", background: col, width: `${pct}%`, transition: "width 0.4s" }} />
              </div>
              <span style={{ ...mono, fontSize: 9, color: col, letterSpacing: "0.15em" }}>{pct}% COMPLETE</span>
            </div>
          )}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ ...mono, fontSize: 8, color: T.textDim, letterSpacing: "0.1em" }}>{user.email?.split("@")[0]}</span>
              <button onClick={onLogout} style={{ ...mono, background: "none", border: `1px solid ${T.border}`, color: T.textDim, fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 10px", cursor: "pointer" }}>Sign Out</button>
            </div>
          ) : (
            <button onClick={onLoginClick} style={{ ...mono, background: "none", border: `1px solid ${T.amber}`, color: T.amber, fontSize: 8, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 10px", cursor: "pointer" }}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
}
