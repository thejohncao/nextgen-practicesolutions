import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { usePortalAuth } from '../context/PortalAuthContext';

export default function PortalLogin() {
  const navigate = useNavigate();
  const { user, profile, isLoading } = usePortalAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading || !user) return;

    if (profile?.role === 'admin' || profile?.practice_id) {
      navigate('/portal', { replace: true });
      return;
    }

    navigate('/portal/create', { replace: true });
  }, [isLoading, navigate, profile, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError('');
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        setError(authError.message);
        return;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0E14] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-[#0B0C10] font-bold text-xl">NG</span>
          </div>
          <h1 className="text-xl font-bold text-[#F9FAFB]">NextGen Portal</h1>
          <p className="text-sm text-[#9CA3AF] mt-1">Sign in to your practice operating system</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/[0.06] shadow-glass p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-xs text-red-400">
              {error}
            </div>
          )}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#9CA3AF]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@practice.com"
              required
              className="w-full px-3.5 py-2.5 text-sm text-[#F9FAFB] placeholder-[#6B7280] rounded-lg border border-white/[0.08] bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40 transition"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#9CA3AF]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-3.5 py-2.5 text-sm text-[#F9FAFB] placeholder-[#6B7280] rounded-lg border border-white/[0.08] bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40 transition"
            />
          </div>
          <div className="flex items-center justify-end">
            <Link to="/portal/forgot-password" className="text-xs text-[#9CA3AF] hover:text-[#F9FAFB] transition">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg text-sm font-medium text-[#0B0C10] bg-[#F5A623] hover:bg-[#E09800] disabled:opacity-50 transition shadow-sm"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/portal/signup"
            className="inline-block text-sm font-medium text-[#F5A623] hover:text-[#E09800] transition"
          >
            Create an account →
          </Link>
        </div>
      </div>
    </div>
  );
}