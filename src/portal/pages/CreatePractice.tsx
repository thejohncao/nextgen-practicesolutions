import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePractice } from '../context/PracticeContext';
import { CheckCircle2 } from 'lucide-react';

const PMS_OPTIONS = ['Dentrix', 'Eaglesoft', 'Open Dental', 'Curve Dental', 'Denticon', 'Planet DDS', 'Other'];
const PROVIDER_OPTIONS = ['Solo', '2', '3', '4', '5+'];
const SPECIALTY_OPTIONS = ['General', 'General + Cosmetic', 'General + Implants', 'Cosmetic + Implants', 'Full Scope', 'Specialty'];
const YEARS_OPTIONS = ['<1', '1-3', '3-5', '5-10', '10-20', '20+'];

export default function CreatePractice() {
  const navigate = useNavigate();
  const { createPractice } = usePractice();

  const [name, setName] = useState('');
  const [doctor, setDoctor] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [pms, setPms] = useState('');
  const [providers, setProviders] = useState('');
  const [specialties, setSpecialties] = useState('');
  const [years, setYears] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const inputClass =
    'w-full px-3 py-2.5 rounded-lg bg-[#0E1720] border border-white/[0.08] text-sm text-[#F9FAFB] placeholder-[#4B5563] focus:outline-none focus:border-white/20 transition';
  const selectClass =
    'w-full px-3 py-2.5 rounded-lg bg-[#0E1720] border border-white/[0.08] text-sm text-[#F9FAFB] focus:outline-none focus:border-white/20 transition appearance-none';
  const labelClass = 'block text-xs font-medium text-[#9CA3AF] mb-1.5 uppercase tracking-wide';

  const handleSubmit = async () => {
    if (!name.trim() || !doctor.trim() || !email.trim()) {
      setError('Practice name, doctor name, and email are required.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await createPractice({
        name: name.trim(),
        ownerName: doctor.trim(),
        ownerEmail: email.trim(),
        locations: [location.trim()],
        plan: '',
        phone: phone.trim(),
        pms,
        providers,
        specialties,
        yearsInOperation: years,
      });
      navigate('/portal/onboard');
    } catch (e: any) {
      setError(e?.message || 'Failed to create practice.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0E14] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
            <span className="text-[#0B0C10] font-bold text-[10px]">NG</span>
          </div>
          <span className="text-sm font-semibold text-[#F9FAFB]">Create Your Practice</span>
        </div>

        <h1 className="text-xl font-bold text-[#F9FAFB] mb-1">Practice Profile</h1>
        <p className="text-sm text-[#6B7280] mb-6">
          Tell us about your practice so we can set up your portal.
        </p>

        {error && (
          <div className="mb-4 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className={labelClass}>Practice Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Bright Smile Dental" className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Lead Doctor / Owner</label>
              <input type="text" value={doctor} onChange={(e) => setDoctor(e.target.value)} placeholder="Dr. John Smith" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@practice.com" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Location</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Downtown" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Practice Management System</label>
              <select value={pms} onChange={(e) => setPms(e.target.value)} className={selectClass}>
                <option value="" disabled>Select PMS</option>
                {PMS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Number of Providers</label>
              <select value={providers} onChange={(e) => setProviders(e.target.value)} className={selectClass}>
                <option value="" disabled>Select</option>
                {PROVIDER_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Primary Specialties</label>
              <select value={specialties} onChange={(e) => setSpecialties(e.target.value)} className={selectClass}>
                <option value="" disabled>Select</option>
                {SPECIALTY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Years in Operation</label>
              <select value={years} onChange={(e) => setYears(e.target.value)} className={selectClass}>
                <option value="" disabled>Select</option>
                {YEARS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="mt-6 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-[#0B0C10] bg-[#F5A623] hover:bg-[#E09800] disabled:opacity-50 transition shadow-sm"
        >
          {submitting ? 'Creating...' : (
            <>
              Create Practice & Continue
              <CheckCircle2 className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
