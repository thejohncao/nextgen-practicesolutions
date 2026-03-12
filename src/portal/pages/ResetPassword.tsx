import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === 'PASSWORD_RECOVERY' || (event === 'SIGNED_IN' && session)) {
        setReady(true);
        setIsVerifying(false);
      }
    });

    const initializeRecovery = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));

      const errorDescription = queryParams.get('error_description');
      if (errorDescription) {
        if (!mounted) return;
        setError(decodeURIComponent(errorDescription));
        setReady(false);
        setIsVerifying(false);
        return;
      }

      const type = hashParams.get('type') ?? queryParams.get('type');
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      const code = queryParams.get('code');

      if (type === 'recovery' && accessToken && refreshToken) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (!mounted) return;

        if (sessionError) {
          setError('This reset link is invalid or has expired. Please request a new one.');
          setReady(false);
        } else {
          setReady(true);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
        setIsVerifying(false);
        return;
      }

      if (type === 'recovery' && code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

        if (!mounted) return;

        if (exchangeError) {
          setError('This reset link is invalid or has expired. Please request a new one.');
          setReady(false);
        } else {
          setReady(true);
          window.history.replaceState({}, document.title, window.location.pathname);
        }
        setIsVerifying(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();

      if (!mounted) return;

      if (session) {
        setReady(true);
      } else {
        setError('This reset link is invalid or has expired. Please request a new one.');
        setReady(false);
      }
      setIsVerifying(false);
    };

    void initializeRecovery();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    navigate('/portal');
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#0D0E14] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-[#9CA3AF]">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#0D0E14] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/[0.06] shadow-glass p-6 text-center space-y-3">
          <h1 className="text-lg font-bold text-[#F9FAFB]">Reset link issue</h1>
          <p className="text-sm text-[#9CA3AF]">{error || 'This reset link is invalid or has expired. Please request a new one.'}</p>
          <Link
            to="/portal/forgot-password"
            className="inline-block text-sm font-medium text-[#F5A623] hover:text-[#E09800] transition"
          >
            Request a new reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0E14] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-[#0B0C10] font-bold text-xl">NG</span>
          </div>
          <h1 className="text-xl font-bold text-[#F9FAFB]">Set New Password</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/[0.06] shadow-glass p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-xs text-red-400">
              {error}
            </div>
          )}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#9CA3AF]">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              required
              minLength={6}
              className="w-full px-3.5 py-2.5 text-sm text-[#F9FAFB] placeholder-[#6B7280] rounded-lg border border-white/[0.08] bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40 transition"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#9CA3AF]">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm your password"
              required
              className="w-full px-3.5 py-2.5 text-sm text-[#F9FAFB] placeholder-[#6B7280] rounded-lg border border-white/[0.08] bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40 transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg text-sm font-medium text-[#0B0C10] bg-[#F5A623] hover:bg-[#E09800] disabled:opacity-50 transition shadow-sm"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/portal/login" className="text-sm text-[#9CA3AF] hover:text-[#F9FAFB] transition">
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
