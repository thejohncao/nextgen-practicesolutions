import { useState } from 'react';
import { usePractice } from '../../context/PracticeContext';

const PMS_OPTIONS = ['Dentrix', 'Eaglesoft', 'Open Dental', 'Curve Dental', 'Denticon', 'Planet DDS', 'Other'];
const PROVIDER_OPTIONS = ['Solo', '2', '3', '4', '5+'];
const SPECIALTY_OPTIONS = ['General', 'General + Cosmetic', 'General + Implants', 'Cosmetic + Implants', 'Full Scope', 'Specialty'];
const YEARS_OPTIONS = ['<1', '1-3', '3-5', '5-10', '10-20', '20+'];

export default function StepPracticeInfo() {
  const { activePractice, isDemo } = usePractice();

  const [name, setName] = useState(isDemo ? '' : activePractice.name);
  const [doctor, setDoctor] = useState(isDemo ? '' : activePractice.ownerName);
  const [location, setLocation] = useState(isDemo ? '' : activePractice.locations[0] ?? '');
  const [phone, setPhone] = useState(isDemo ? '' : activePractice.phone);
  const [email, setEmail] = useState(isDemo ? '' : activePractice.ownerEmail);
  const [pms, setPms] = useState(isDemo ? '' : activePractice.pms);
  const [providers, setProviders] = useState(isDemo ? '' : activePractice.providers);
  const [specialties, setSpecialties] = useState(isDemo ? '' : activePractice.specialties);
  const [years, setYears] = useState(isDemo ? '' : activePractice.yearsInOperation);

  const inputClass =
    'w-full px-3 py-2.5 rounded-lg bg-[#0E1720] border border-white/[0.08] text-sm text-[#F9FAFB] placeholder-[#4B5563] focus:outline-none focus:border-white/20 transition';
  const selectClass =
    'w-full px-3 py-2.5 rounded-lg bg-[#0E1720] border border-white/[0.08] text-sm text-[#F9FAFB] focus:outline-none focus:border-white/20 transition appearance-none';
  const labelClass = 'block text-xs font-medium text-[#9CA3AF] mb-1.5 uppercase tracking-wide';

  return (
    <div>
      <h2 className="text-lg font-bold text-[#F9FAFB] mb-1">Practice Profile</h2>
      <p className="text-sm text-[#6B7280] mb-6">
        Tell us about your practice so we can tailor your onboarding experience.
      </p>

      <div className="space-y-4">
        <div>
          <label className={labelClass}>Practice Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Bright Smile Dental" className={inputClass} data-field="name" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Lead Doctor / Owner</label>
            <input type="text" value={doctor} onChange={(e) => setDoctor(e.target.value)} placeholder="Dr. John Smith" className={inputClass} data-field="doctor" />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@practice.com" className={inputClass} data-field="email" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Location</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Downtown" className={inputClass} data-field="location" />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 123-4567" className={inputClass} data-field="phone" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Practice Management System</label>
            <select value={pms} onChange={(e) => setPms(e.target.value)} className={selectClass} data-field="pms">
              <option value="" disabled>Select PMS</option>
              {PMS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Number of Providers</label>
            <select value={providers} onChange={(e) => setProviders(e.target.value)} className={selectClass} data-field="providers">
              <option value="" disabled>Select</option>
              {PROVIDER_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Primary Specialties</label>
            <select value={specialties} onChange={(e) => setSpecialties(e.target.value)} className={selectClass} data-field="specialties">
              <option value="" disabled>Select</option>
              {SPECIALTY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Years in Operation</label>
            <select value={years} onChange={(e) => setYears(e.target.value)} className={selectClass} data-field="years">
              <option value="" disabled>Select</option>
              {YEARS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export function getPracticeFormData(): {
  name: string; doctor: string; location: string; phone: string; email: string;
  pms: string; providers: string; specialties: string; years: string;
} | null {
  const el = (field: string) => document.querySelector(`[data-field="${field}"]`) as HTMLInputElement | HTMLSelectElement | null;
  const name = el('name')?.value?.trim() ?? '';
  const doctor = el('doctor')?.value?.trim() ?? '';
  const email = el('email')?.value?.trim() ?? '';
  const location = el('location')?.value?.trim() ?? '';
  if (!name || !doctor || !email) return null;
  return {
    name,
    doctor,
    location,
    phone: el('phone')?.value?.trim() ?? '',
    email,
    pms: el('pms')?.value ?? '',
    providers: el('providers')?.value ?? '',
    specialties: el('specialties')?.value ?? '',
    years: el('years')?.value ?? '',
  };
}
