// ═══════════════════════════════════════════════════════════
// ASSESSMENT PAGE — Main orchestrator (formerly embedded in App.tsx)
// ═══════════════════════════════════════════════════════════

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import AuthModal from "@/components/AuthModal";
import { T, CATS, Q, CC } from "./data/assessmentData";
import { computeScore } from "./lib/assessmentScoring";
import { mono, bebas, sans, VIEW } from "./lib/styleHelpers";
import { TopBar } from "./components/TopBar";
import { HomeView } from "./components/HomeView";
import { IntroView } from "./components/IntroView";
import { QuestionView } from "./components/QuestionView";
import { ResultsView } from "./components/ResultsView";
import { ReportView } from "./components/ReportView";

export default function AssessmentPage() {
  const [ans, setAns] = useState<Record<string, number>>({});
  const [ci, setCi] = useState(0);
  const [qi, setQi] = useState(0);
  const [view, setView] = useState<number>(VIEW.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [pendingStart, setPendingStart] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const scroll = useCallback(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase.from("assessment_progress").select("*").eq("user_id", user.id).maybeSingle();
      if (data) {
        const savedAns = (data.answers as Record<string, number>) || {};
        setAns(savedAns);
        setCi(data.current_category);
        setQi(data.current_question);
        if (Object.keys(savedAns).length > 0) setView(data.current_view);
      }
    };
    load();
  }, [user]);

  const saveProgress = useCallback((newAns: Record<string, number>, newCi: number, newQi: number, newView: number) => {
    if (!user) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      await supabase.from("assessment_progress").upsert({
        user_id: user.id, answers: newAns, current_category: newCi,
        current_question: newQi, current_view: newView, updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
    }, 500);
  }, [user]);

  const sc = useMemo(() => computeScore(ans), [ans]);

  const handleAnswer = useCallback((key: string, val: number) => {
    setAns(p => {
      const next = { ...p, [key]: val };
      saveProgress(next, ci, qi, VIEW.Q);
      return next;
    });
    setTimeout(() => {
      const cQs = Q.filter(q => q.c === ci);
      if (qi < cQs.length - 1) { setQi(qi + 1); scroll(); }
    }, 280);
  }, [ci, qi, scroll, saveProgress]);

  const jumpCat = useCallback((c: number) => {
    setCi(c); setQi(0); setView(VIEW.INTRO); scroll();
    saveProgress(ans, c, 0, VIEW.INTRO);
  }, [scroll, ans, saveProgress]);

  const nextSection = useCallback(() => {
    if (ci < 5) {
      const n = ci + 1;
      const nv = n === 3 && sc.answered > 0 ? VIEW.CHECKPOINT : VIEW.INTRO;
      setCi(n); setQi(0); setView(nv); scroll();
      saveProgress(ans, n, 0, nv);
    } else {
      setView(VIEW.RESULTS); scroll();
      saveProgress(ans, ci, qi, VIEW.RESULTS);
    }
  }, [ci, sc.answered, scroll, ans, qi, saveProgress]);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  useEffect(() => {
    if (user && pendingStart) {
      setPendingStart(false);
      setCi(0); setQi(0); setView(VIEW.INTRO); scroll();
    }
  }, [user, pendingStart, scroll]);

  return (
    <div ref={ref} style={{ minHeight: "100vh", background: T.bg, color: T.textMain, display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,500;1,300&family=DM+Sans:wght@400;500;600&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:${T.bg};}
        @keyframes blink{0%,100%{opacity:.4}50%{opacity:1}}
        button{font-family:'DM Mono',monospace;}
      `}</style>

      <AuthModal open={authOpen} onClose={() => { setAuthOpen(false); setPendingStart(false); }} onAuth={() => { setAuthOpen(false); }} defaultMode={pendingStart ? "signup" : "login"} />

      {view === VIEW.HOME && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
          <div style={{ position: "absolute", width: 800, height: 500, left: "50%", top: "50%", transform: "translate(-50%,-50%)", background: `radial-gradient(ellipse,${T.amberGlow} 0%,transparent 65%)`, animation: "breathe 8s ease-in-out infinite" }} />
          <style>{`@keyframes breathe{0%,100%{opacity:.7;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.2)}}`}</style>
        </div>
      )}

      <div style={{ position: "fixed", left: 28, top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom,transparent,rgba(245,166,35,0.18) 30%,rgba(245,166,35,0.18) 70%,transparent)`, zIndex: 5, pointerEvents: "none" }} />

      {view === VIEW.REPORT ? (
        <ReportView sc={sc} onBack={() => { setView(VIEW.RESULTS); scroll(); }} />
      ) : (
        <>
          <TopBar answered={sc.answered} catColor={view !== VIEW.HOME ? CATS[ci].color : undefined} user={user} onLoginClick={() => setAuthOpen(true)} onLogout={handleLogout} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
            {view === VIEW.HOME && <HomeView onStart={() => { if (!user) { setPendingStart(true); setAuthOpen(true); return; } setCi(0); setQi(0); setView(VIEW.INTRO); scroll(); }} />}
            {view === VIEW.INTRO && <IntroView ci={ci} sc={sc} onBegin={() => { setQi(0); setView(VIEW.Q); scroll(); }} onJump={jumpCat} />}
            {view === VIEW.Q && (
              <QuestionView
                ci={ci} qi={qi} ans={ans} sc={sc}
                onAnswer={handleAnswer}
                onNext={(i?: number) => { const next = i !== undefined ? i : qi + 1; setQi(next); scroll(); }}
                onPrev={() => { if (qi > 0) { setQi(qi - 1); scroll(); } else if (ci > 0) jumpCat(ci - 1); }}
                onFinish={nextSection}
                onResults={() => { setView(VIEW.RESULTS); scroll(); }}
              />
            )}
            {view === VIEW.CHECKPOINT && (
              <div style={{ maxWidth: 560, margin: "0 auto", padding: "60px 32px", textAlign: "center" }}>
                <div style={{ ...bebas, fontSize: "3rem", color: CATS[ci].color, marginBottom: 8 }}>HALFWAY</div>
                <div style={{ ...bebas, fontSize: "1.8rem", color: T.textMain, marginBottom: 16 }}>THERE.</div>
                <p style={{ ...sans, fontSize: 15, color: T.textMid, lineHeight: 1.75, marginBottom: 28 }}>3 of 6 categories complete. Your progress is saved — take a break or keep going.</p>
                <button onClick={() => { setView(VIEW.INTRO); scroll(); }} style={{ background: CATS[ci].color, color: T.bg, border: "none", padding: "14px 36px", ...mono, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>Continue to Category 4 →</button>
              </div>
            )}
            {view === VIEW.RESULTS && (
              <ResultsView
                sc={sc}
                onReport={() => { setView(VIEW.REPORT); scroll(); }}
                onRetake={() => { setAns({}); setCi(0); setQi(0); setView(VIEW.HOME); scroll(); saveProgress({}, 0, 0, VIEW.HOME); }}
                onContinue={() => { for (let i = 0; i < 6; i++) { if (sc.cd[i].ans < CC[i]) { jumpCat(i); return; } } }}
              />
            )}
          </div>

          {view === VIEW.HOME && (
            <div style={{ ...mono, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 48px", borderTop: `1px solid ${T.border}`, maxWidth: 1100, margin: "0 auto", width: "100%" }}>
              <div style={{ fontSize: 8, color: T.textDim, letterSpacing: "0.15em", textTransform: "uppercase", lineHeight: 1.9 }}>
                NextGen Practice Solutions — Cao Consulting LLC<br />
                <span style={{ color: "rgba(245,166,35,0.4)" }}>■</span> Giselle · Miles · Devon
              </div>
              <div style={{ fontSize: 8, color: T.textDim, letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "right" }}>
                app.nextgenpractice.org<br />
                <span style={{ color: T.amberBorder }}>100-Point Practice Assessment</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
