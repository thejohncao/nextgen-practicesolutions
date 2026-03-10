import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PortalLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('sarah@brightsmile.com');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/portal');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-xl">NG</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">NextGen Portal</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to your practice operating system</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@practice.com"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded border-gray-300 text-gray-900 focus:ring-gray-900/20" />
              <span className="text-xs text-gray-500">Remember me</span>
            </label>
            <button type="button" className="text-xs text-gray-500 hover:text-gray-900 transition">
              Forgot password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition shadow-sm"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Demo mode — any credentials will work
        </p>
      </div>
    </div>
  );
}
