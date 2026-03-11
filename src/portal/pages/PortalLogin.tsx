import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function PortalLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('sarah@brightsmile.com');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/portal');
  };

  return (
    <div className="min-h-screen bg-[#0D0E14] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-[#0B0C10] font-bold text-xl">NG</span>
          </div>
          <h1 className="text-xl font-bold text-[#F9FAFB]">NextGen Portal</h1>
          <p className="text-sm text-[#9CA3AF] mt-1">Sign in to your practice operating system</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/[0.04] backdrop-blur-sm rounded-2xl border border-white/[0.06] shadow-glass p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#9CA3AF]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@practice.com"
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
              className="w-full px-3.5 py-2.5 text-sm text-[#F9FAFB] placeholder-[#6B7280] rounded-lg border border-white/[0.08] bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40 transition"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded border-white/[0.20] bg-white/[0.04] text-[#F5A623] focus:ring-amber-500/20" />
              <span className="text-xs text-[#9CA3AF]">Remember me</span>
            </label>
            <button type="button" className="text-xs text-[#9CA3AF] hover:text-[#F9FAFB] transition">
              Forgot password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg text-sm font-medium text-[#0B0C10] bg-[#F5A623] hover:bg-[#E09800] transition shadow-sm"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-6 space-y-2">
          <p className="text-xs text-[#6B7280]">Demo mode — any credentials will work</p>
          <Link
            to="/portal/create"
            className="inline-block text-sm font-medium text-[#F5A623] hover:text-[#E09800] transition"
          >
            Create New Practice →
          </Link>
        </div>
      </div>
    </div>
  );
}
