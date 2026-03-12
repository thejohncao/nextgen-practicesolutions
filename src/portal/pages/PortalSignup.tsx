import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export default function PortalSignup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'owner' | 'manager'>('owner');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          name: name.trim(),
          portal_role: role,
        },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0D0E14] flex items-center justify-center p-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-xl">✓</span>
          </div>
          <h1 className="text-xl font-bold text-[#F9FAFB]">Check Your Email</h1>
          <p className="text-sm text-[#9CA3AF] mt-2">
            We've sent a confirmation link to <strong className="text-[#F9FAFB]">{email}</strong>.
            Click the link to activate your account.
          </p>
          <Link
            to="/portal/login"
            className="inline-block mt-6 text-sm font-medium text-[#F5A623] hover:text-[#E09800] transition"
          >
            Back to Sign In
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
          <h1 className="text-xl font-bold text-[#F9FAFB]">Create Account</h1>
          <p className="text-sm text-[#9CA3AF] mt-1">Get started with NextGen Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/[0.06] shadow-glass p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-xs text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#9CA3AF]">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dr. Jane Smith"
              required
              className="w-full px-3.5 py-2.5 text-sm text-[#F9FAFB] placeholder-[#6B7280] rounded-lg border border-white/[0.08] bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40 transition"
            />
          </div>

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
              placeholder="Min 6 characters"
              required
              minLength={6}
              className="w-full px-3.5 py-2.5 text-sm text-[#F9FAFB] placeholder-[#6B7280] rounded-lg border border-white/[0.08] bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#9CA3AF]">I am a...</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'owner' as const, label: 'Practice Owner / Doctor' },
                { value: 'manager' as const, label: 'Office Manager' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setRole(opt.value)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-medium border transition ${
                    role === opt.value
                      ? 'bg-[#F5A623]/10 border-[#F5A623]/40 text-[#F5A623]'
                      : 'bg-white/[0.02] border-white/[0.08] text-[#9CA3AF] hover:bg-white/[0.04]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg text-sm font-medium text-[#0B0C10] bg-[#F5A623] hover:bg-[#E09800] disabled:opacity-50 transition shadow-sm"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/portal/login"
            className="text-sm font-medium text-[#9CA3AF] hover:text-[#F9FAFB] transition"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
