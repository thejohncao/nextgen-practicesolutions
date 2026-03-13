import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, CheckCircle2, ChevronDown, ChevronUp, Download, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { CATS, Q, CC, computeScore, getGrade, getQuestionAnswer } from '../data/questions';
import { useAdminNotes } from '../hooks/useAdminData';
import { Recharts } from './AdminCharts';

interface ProfileData {
  id: string;
  email: string;
  name: string | null;
  first_name: string | null;
  last_name: string | null;
  practice_name: string | null;
  phone: string | null;
  created_at: string;
}

export default function AdminPracticeDetail() {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const { content: noteContent, save: saveNote, saving: noteSaving, loaded: noteLoaded } = useAdminNotes(userId!);
  const [noteText, setNoteText] = useState('');
  const [expandedCats, setExpandedCats] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (noteLoaded) setNoteText(noteContent);
  }, [noteLoaded, noteContent]);

  useEffect(() => {
    const load = async () => {
      const [{ data: prof }, { data: prog }] = await Promise.all([
        supabase.from('profiles').select('id, email, name, first_name, last_name, practice_name, phone, created_at').eq('id', userId!).single(),
        supabase.from('assessment_progress').select('answers').eq('user_id', userId!).maybeSingle(),
      ]);
      setProfile(prof);
      setAnswers((prog?.answers as Record<string, number>) || {});
      setLoading(false);
    };
    load();

    // Real-time updates
    const channel = supabase
      .channel(`admin-detail-${userId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'assessment_progress', filter: `user_id=eq.${userId}` }, (payload: any) => {
        if (payload.new?.answers) setAnswers(payload.new.answers as Record<string, number>);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [userId]);

  const sc = useMemo(() => computeScore(answers), [answers]);
  const grade = useMemo(() => getGrade(sc.total), [sc.total]);

  const toggleCat = (idx: number) => {
    setExpandedCats(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  // Top strengths/weaknesses
  const catScores = CATS.map((cat, i) => ({
    ...cat,
    earned: sc.categories[i].earned,
    answered: sc.categories[i].ans,
    cnt: CC[i],
    pct: CC[i] > 0 ? Math.round((sc.categories[i].earned / cat.weight) * 100) : 0,
  }));
  const sorted = [...catScores].sort((a, b) => a.pct - b.pct);
  const weakest = sorted.slice(0, 3);
  const strongest = [...sorted].reverse().slice(0, 3);

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const doctorName = profile.first_name || profile.last_name
    ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
    : profile.name || '—';

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back */}
      <Link to="/admin" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-white transition mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white">{profile.practice_name || 'Unnamed Practice'}</h1>
            <p className="text-sm text-[#9CA3AF] mt-1">{doctorName} · {profile.email}{profile.phone ? ` · ${profile.phone}` : ''}</p>
            <div className="flex items-center gap-3 mt-3">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium`}
                style={{ background: `${grade.color}20`, color: grade.color }}>
                {sc.answered === 100 ? 'Completed' : sc.answered > 0 ? 'In Progress' : 'Not Started'}
              </span>
              <span className="text-xs text-[#6B7280] font-mono">{sc.answered}/100 questions</span>
            </div>
          </div>

          {sc.answered > 0 && (
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold font-mono" style={{ color: grade.color }}>{sc.total}</div>
                <div className="text-xs text-[#6B7280]">/100 points</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold" style={{ color: grade.color }}>{grade.label}</div>
                <div className="text-xs text-[#6B7280]">Grade</div>
              </div>
            </div>
          )}
        </div>

        {sc.answered === 100 && (
          <button
            onClick={() => saveNote(noteText || 'Reviewed')}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 text-sm font-medium hover:bg-blue-500/20 transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            Mark as Reviewed
          </button>
        )}
      </div>

      {/* Category Breakdown */}
      <h2 className="text-lg font-semibold text-white mb-4">Category Breakdown</h2>
      <div className="space-y-3 mb-8">
        {CATS.map((cat, catIdx) => {
          const cs = sc.categories[catIdx];
          const expanded = expandedCats.has(catIdx);
          const catQs = Q.filter(q => q.c === catIdx);
          const pct = cat.weight > 0 ? Math.round((cs.earned / cat.weight) * 100) : 0;

          return (
            <div key={catIdx} className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              <button
                onClick={() => toggleCat(catIdx)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{cat.icon}</span>
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">{cat.name}</div>
                    <div className="text-xs text-[#6B7280]">{cs.ans}/{CC[catIdx]} answered · {cs.earned % 1 === 0 ? cs.earned : cs.earned.toFixed(1)}/{cat.weight} pts</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, background: cat.color }}
                    />
                  </div>
                  <span className="text-xs font-mono" style={{ color: cat.color }}>{pct}%</span>
                  {expanded ? <ChevronUp className="w-4 h-4 text-[#6B7280]" /> : <ChevronDown className="w-4 h-4 text-[#6B7280]" />}
                </div>
              </button>

              {expanded && (
                <div className="border-t border-white/[0.06] divide-y divide-white/[0.04]">
                  {catQs.map((q, qIdx) => {
                    const a = getQuestionAnswer(answers, catIdx, qIdx);
                    const ansLabel = a === 1 ? 'Yes' : a === 0.5 ? 'Partial' : a === 0 ? 'No' : '—';
                    const ansColor = a === 1 ? '#4ade80' : a === 0.5 ? '#fb923c' : a === 0 ? '#f87171' : '#374151';
                    const pts = a !== undefined ? (a === 1 ? '+1' : a === 0.5 ? '+0.5' : '0') : '—';

                    return (
                      <div key={qIdx} className="flex items-start gap-3 px-5 py-3">
                        <div
                          className="mt-1 w-2 h-2 rounded-full shrink-0"
                          style={{ background: ansColor }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#d1d5db]">{q.t}</p>
                          {q.m && <span className="text-[10px] text-[#F5A623] font-medium">HIGH IMPACT</span>}
                        </div>
                        <div className="shrink-0 text-right">
                          <div className="text-xs font-medium" style={{ color: ansColor }}>{ansLabel}</div>
                          <div className="text-[10px] text-[#6B7280] font-mono">{pts} pts</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Score Summary */}
      {sc.answered > 0 && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Score Summary</h2>

          {/* Category bar chart */}
          <div className="space-y-3 mb-6">
            {catScores.map(cs => (
              <div key={cs.id} className="flex items-center gap-3">
                <span className="text-xs text-[#9CA3AF] w-28 shrink-0 truncate">{cs.short}</span>
                <div className="flex-1 h-4 bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${cs.pct}%`, background: cs.color }}
                  />
                </div>
                <span className="text-xs font-mono text-[#9CA3AF] w-14 text-right">
                  {cs.earned % 1 === 0 ? cs.earned : cs.earned.toFixed(1)}/{cs.weight}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-4">
              <h3 className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-2">Top Strengths</h3>
              <ul className="space-y-1">
                {strongest.map(s => (
                  <li key={s.id} className="text-sm text-[#d1d5db] flex justify-between">
                    <span>{s.icon} {s.short}</span>
                    <span className="font-mono text-emerald-400">{s.pct}%</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-red-500/5 border border-red-500/20 p-4">
              <h3 className="text-xs font-medium text-red-400 uppercase tracking-wider mb-2">Key Gaps</h3>
              <ul className="space-y-1">
                {weakest.map(w => (
                  <li key={w.id} className="text-sm text-[#d1d5db] flex justify-between">
                    <span>{w.icon} {w.short}</span>
                    <span className="font-mono text-red-400">{w.pct}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Notes */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-3">Admin Notes</h2>
        <p className="text-xs text-[#6B7280] mb-3">Your observations, talking points for the review call, recommended NextGen offers.</p>
        <textarea
          value={noteText}
          onChange={e => setNoteText(e.target.value)}
          rows={5}
          className="w-full rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-[#6B7280] p-3 focus:outline-none focus:border-[#F5A623]/50 resize-y"
          placeholder="Write your notes here..."
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={() => saveNote(noteText)}
            disabled={noteSaving}
            className="px-4 py-2 rounded-lg bg-[#F5A623] text-[#0B0C10] text-sm font-semibold hover:bg-[#E09800] transition disabled:opacity-50"
          >
            {noteSaving ? 'Saving...' : 'Save Notes'}
          </button>
        </div>
      </div>

      {/* Export */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => exportPDF(profile, sc, answers, catScores, grade, weakest, strongest)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-sm text-[#9CA3AF] transition"
        >
          <Download className="w-4 h-4" />
          Export to PDF
        </button>
      </div>
    </div>
  );
}

function exportPDF(
  profile: any,
  sc: any,
  answers: Record<string, number>,
  catScores: any[],
  grade: any,
  weakest: any[],
  strongest: any[]
) {
  const doctorName = profile.first_name || profile.last_name
    ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim()
    : profile.name || '—';

  const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8">
<title>Practice Health Report - ${profile.practice_name || 'Practice'}</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 40px; color: #1a1a1a; }
  h1 { color: #00274D; font-size: 24px; margin-bottom: 4px; }
  h2 { color: #00274D; font-size: 16px; margin-top: 24px; border-bottom: 2px solid #F5A623; padding-bottom: 4px; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; border-bottom: 3px solid #00274D; padding-bottom: 16px; }
  .score { font-size: 48px; font-weight: bold; }
  .grade { font-size: 14px; text-transform: uppercase; letter-spacing: 2px; }
  table { width: 100%; border-collapse: collapse; margin-top: 8px; }
  td, th { padding: 6px 10px; text-align: left; border-bottom: 1px solid #eee; font-size: 13px; }
  th { background: #f8f9fa; color: #00274D; font-weight: 600; }
  .bar { height: 12px; border-radius: 6px; background: #e5e7eb; }
  .bar-fill { height: 100%; border-radius: 6px; }
  .footer { margin-top: 32px; padding-top: 12px; border-top: 2px solid #00274D; font-size: 11px; color: #666; display: flex; justify-content: space-between; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .card { background: #f8f9fa; border-radius: 8px; padding: 12px; }
  .card h3 { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
  ul { padding-left: 16px; margin: 0; }
  li { font-size: 13px; margin-bottom: 4px; }
</style></head><body>
  <div class="header">
    <div>
      <h1>${profile.practice_name || 'Practice Health Report'}</h1>
      <p style="color:#666;margin:0">${doctorName} · ${profile.email}</p>
      <p style="color:#999;margin:4px 0 0;font-size:12px">Generated ${format(new Date(), 'MMM d, yyyy')}</p>
    </div>
    <div style="text-align:right">
      <div class="score" style="color:${grade.color}">${sc.total}</div>
      <div class="grade" style="color:${grade.color}">${grade.label}</div>
      <div style="font-size:12px;color:#666">${sc.answered}/100 questions</div>
    </div>
  </div>

  <h2>Category Breakdown</h2>
  <table>
    <tr><th>Category</th><th>Score</th><th>Progress</th></tr>
    ${catScores.map(cs => `
      <tr>
        <td>${cs.icon} ${cs.name}</td>
        <td>${cs.earned % 1 === 0 ? cs.earned : cs.earned.toFixed(1)}/${cs.weight} (${cs.pct}%)</td>
        <td>${cs.answered}/${cs.cnt} answered</td>
      </tr>
    `).join('')}
  </table>

  <div class="two-col" style="margin-top:16px">
    <div class="card">
      <h3 style="color:#16a34a">Top Strengths</h3>
      <ul>${strongest.map(s => `<li>${s.icon} ${s.short} — ${s.pct}%</li>`).join('')}</ul>
    </div>
    <div class="card">
      <h3 style="color:#dc2626">Key Opportunities</h3>
      <ul>${weakest.map(w => `<li>${w.icon} ${w.short} — ${w.pct}%</li>`).join('')}</ul>
    </div>
  </div>

  <div class="footer">
    <span>NextGen Practice Solutions · app.nextgenpractice.org</span>
    <span>Confidential · For Internal Use Only</span>
  </div>
</body></html>`;

  const w = window.open('', '_blank');
  if (w) {
    w.document.write(html);
    w.document.close();
    setTimeout(() => w.print(), 300);
  }
}
