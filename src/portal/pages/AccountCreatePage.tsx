import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePractice } from '../context/PracticeContext';
import { ArrowLeft, Building2 } from 'lucide-react';

const PLANS = ['Starter', 'Growth', 'Scale', 'Enterprise'];

export default function AccountCreatePage() {
  const navigate = useNavigate();
  const { createPractice } = usePractice();

  const [name, setName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [location, setLocation] = useState('');
  const [plan, setPlan] = useState('Growth');

  const canSubmit = name.trim() && ownerName.trim() && ownerEmail.trim() && location.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    createPractice({
      name: name.trim(),
      ownerName: ownerName.trim(),
      ownerEmail: ownerEmail.trim(),
      locations: [location.trim()],
      plan,
    });
    navigate('/portal/onboarding');
  };

  const inputClass =
    'w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[#F9FAFB] placeholder-[#6B7280] text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40 transition';

  return (
    <div className="min-h-screen bg-[#0D0E14] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Back link */}
        <Link
          to="/portal/login"
          className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#9CA3AF] mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>

        {/* Card */}
        <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#0B0C10]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#F9FAFB]">Create New Practice</h1>
              <p className="text-xs text-[#6B7280]">Set up your practice portal account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Practice Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Bright Smile Dental"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Owner Name</label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="Dr. John Smith"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Email</label>
                <input
                  type="email"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  placeholder="john@practice.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Primary Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Downtown"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">Plan Tier</label>
              <div className="grid grid-cols-4 gap-2">
                {PLANS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPlan(p)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      plan === p
                        ? 'bg-[#F5A623] text-[#0B0C10]'
                        : 'bg-white/[0.04] text-[#9CA3AF] hover:bg-white/[0.08]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full mt-2 py-3 rounded-lg text-sm font-semibold text-[#0B0C10] bg-[#F5A623] hover:bg-[#E09800] disabled:opacity-40 disabled:cursor-not-allowed transition shadow-sm"
            >
              Create Practice & Start Onboarding
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
