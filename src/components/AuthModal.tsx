import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const T = {
  bg: "#07090f",
  bgMid: "#0d1220",
  amber: "#F5A623",
  amberBorder: "rgba(245,166,35,0.22)",
  textMain: "#dde3ee",
  textMid: "#8899b8",
  textDim: "#4a5568",
  border: "rgba(255,255,255,0.07)",
  red: "#f87171",
  grn: "#4ade80",
};

const mono: React.CSSProperties = { fontFamily: "'DM Mono',monospace" };
const bebas: React.CSSProperties = { fontFamily: "'Bebas Neue',sans-serif" };
const sans: React.CSSProperties = { fontFamily: "'DM Sans',sans-serif" };

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onAuth: () => void;
}

export default function AuthModal({ open, onClose, onAuth }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { first_name: firstName, last_name: lastName },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        setSuccess("Check your email to confirm your account, then log in.");
        setMode("login");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onAuth();
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={onClose}>
      <div style={{ background: T.bgMid, border: `1px solid ${T.amberBorder}`, borderRadius: 6, padding: 36, width: 400, maxWidth: "90vw" }}
        onClick={e => e.stopPropagation()}>
        <div style={{ ...bebas, fontSize: "1.8rem", color: T.amber, letterSpacing: "0.04em", marginBottom: 4, textAlign: "center" }}>
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </div>
        <p style={{ ...mono, fontSize: 9, color: T.textDim, textAlign: "center", letterSpacing: "0.15em", marginBottom: 24 }}>
          {mode === "login" ? "Sign in to resume your assessment" : "Save your progress and get your report"}
        </p>

        {error && <div style={{ ...mono, fontSize: 10, color: T.red, background: "rgba(248,113,113,0.08)", border: `1px solid ${T.red}30`, padding: "8px 12px", borderRadius: 3, marginBottom: 14 }}>{error}</div>}
        {success && <div style={{ ...mono, fontSize: 10, color: T.grn, background: "rgba(74,222,128,0.08)", border: `1px solid ${T.grn}30`, padding: "8px 12px", borderRadius: 3, marginBottom: 14 }}>{success}</div>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {mode === "signup" && (
            <div style={{ display: "flex", gap: 10 }}>
              <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name"
                style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}`, color: T.textMain, padding: "10px 14px", borderRadius: 3, ...sans, fontSize: 13, outline: "none" }} />
              <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name"
                style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}`, color: T.textMain, padding: "10px 14px", borderRadius: 3, ...sans, fontSize: 13, outline: "none" }} />
            </div>
          )}
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required
            style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}`, color: T.textMain, padding: "10px 14px", borderRadius: 3, ...sans, fontSize: 13, outline: "none" }} />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required minLength={6}
            style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}`, color: T.textMain, padding: "10px 14px", borderRadius: 3, ...sans, fontSize: 13, outline: "none" }} />

          <button type="submit" disabled={loading} style={{
            background: T.amber, color: T.bg, border: "none", padding: "12px 24px", borderRadius: 3,
            ...mono, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" as const, cursor: loading ? "wait" : "pointer", opacity: loading ? 0.6 : 1,
          }}>
            {loading ? "..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setSuccess(""); }}
            style={{ ...mono, background: "none", border: "none", color: T.amber, fontSize: 10, cursor: "pointer", letterSpacing: "0.1em" }}>
            {mode === "login" ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
