import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/portal/reset-password`,
    });

    if (resetError) {
      setError(resetError.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0D0E14] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-[#0B0C10] font-bold text-xl">NG</span>
          </div>
          <h1 className="text-xl font-bold text-[#F9FAFB]">Reset Password</h1>
          <p className="text-sm text-[#9CA3AF] mt-1">We'll send you a reset link</p>
        </div>

        {sent ? (
          <div className="bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/[0.06] shadow-glass p-6 text-center">
            <p className="text-sm text-[#9CA3AF]">
              If an account exists for <strong className="text-[#F9FAFB]">{email}</strong>, you'll receive a password reset link shortly.
            </p>
            <Link
              to="/portal/login"
              className="inline-block mt-4 text-sm font-medium text-[#F5A623] hover:text-[#E09800] transition"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
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
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-sm font-medium text-[#0B0C10] bg-[#F5A623] hover:bg-[#E09800] disabled:opacity-50 transition shadow-sm"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <div className="text-center mt-6">
          <Link to="/portal/login" className="text-sm text-[#9CA3AF] hover:text-[#F9FAFB] transition">
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
