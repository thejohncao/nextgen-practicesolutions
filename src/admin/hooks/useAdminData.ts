import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { computeScore } from '../data/questions';

export interface AssessmentUser {
  id: string;
  email: string;
  name: string | null;
  first_name: string | null;
  last_name: string | null;
  practice_name: string | null;
  phone: string | null;
  created_at: string;
  role: string;
  // Assessment data
  answers: Record<string, number> | null;
  current_view: number | null;
  assessment_updated_at: string | null;
  // Computed
  score: number;
  answered: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'reviewed';
}

export function useAdminAssessments() {
  const [users, setUsers] = useState<AssessmentUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    // Get all profiles (excluding admins)
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, email, name, first_name, last_name, practice_name, phone, created_at, role')
      .neq('role', 'admin');

    // Get all assessment progress
    const { data: progress } = await supabase
      .from('assessment_progress')
      .select('user_id, answers, current_view, updated_at');

    // Get admin notes to check reviewed status
    const { data: notes } = await supabase
      .from('admin_notes' as any)
      .select('user_id, content');

    const progressMap = new Map(
      (progress || []).map(p => [p.user_id, p])
    );
    const notesMap = new Map(
      ((notes as any[]) || []).map((n: any) => [n.user_id, n.content])
    );

    const mapped: AssessmentUser[] = (profiles || []).map(p => {
      const prog = progressMap.get(p.id);
      const ans = (prog?.answers as Record<string, number>) || {};
      const sc = computeScore(ans);
      const hasNote = notesMap.has(p.id);

      let status: AssessmentUser['status'] = 'not_started';
      if (sc.answered === 100) {
        status = hasNote ? 'reviewed' : 'completed';
      } else if (sc.answered > 0) {
        status = 'in_progress';
      }

      return {
        id: p.id,
        email: p.email,
        name: p.name,
        first_name: p.first_name,
        last_name: p.last_name,
        practice_name: p.practice_name,
        phone: p.phone,
        created_at: p.created_at,
        role: p.role,
        answers: Object.keys(ans).length > 0 ? ans : null,
        current_view: prog?.current_view ?? null,
        assessment_updated_at: prog?.updated_at ?? null,
        score: sc.total,
        answered: sc.answered,
        status,
      };
    });

    setUsers(mapped);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();

    // Subscribe to real-time assessment_progress changes
    const channel = supabase
      .channel('admin-assessment-progress')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'assessment_progress',
      }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { users, loading, refetch: fetchData };
}

export function useAdminNotes(userId: string) {
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('admin_notes' as any)
        .select('content')
        .eq('user_id', userId)
        .maybeSingle();
      if (data) setContent((data as any).content || '');
      setLoaded(true);
    };
    load();
  }, [userId]);

  const save = async (newContent: string) => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    await (supabase.from('admin_notes' as any) as any).upsert({
      user_id: userId,
      admin_id: user.id,
      content: newContent,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,admin_id' });
    
    setContent(newContent);
    setSaving(false);
  };

  return { content, save, saving, loaded };
}
