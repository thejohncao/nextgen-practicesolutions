import { useState } from 'react';
import { clientRequests } from '../data/mock';
import { RequestStatus, PillarSlug } from '../types';
import SectionHeader from '../components/SectionHeader';
import RequestTable from '../components/RequestTable';
import { cn } from '@/lib/utils';
import { Plus, X } from 'lucide-react';

const statusFilters: { label: string; value: RequestStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'New', value: 'new' },
  { label: 'Reviewing', value: 'reviewing' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Waiting', value: 'waiting_on_client' },
  { label: 'Done', value: 'done' },
];

export default function RequestsPage() {
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'all'>('all');
  const [showForm, setShowForm] = useState(false);

  const filtered = clientRequests.filter(
    (r) => statusFilter === 'all' || r.status === statusFilter
  );

  return (
    <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
      <SectionHeader
        title="Requests"
        subtitle="Client request center"
        action={
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#0B0C10] bg-[#F5A623] hover:bg-[#E09800] transition shadow-sm"
          >
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showForm ? 'Cancel' : 'New Request'}
          </button>
        }
      />

      {/* New Request Form */}
      {showForm && <NewRequestForm onClose={() => setShowForm(false)} />}

      {/* Filters */}
      <div className="flex gap-1 flex-wrap">
        {statusFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setStatusFilter(f.value)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
              statusFilter === f.value
                ? 'bg-white/[0.08] text-[#F9FAFB]'
                : 'bg-white/[0.06] text-[#9CA3AF] hover:bg-white/[0.10]'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <RequestTable requests={filtered} />
    </div>
  );
}

function NewRequestForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] shadow-glass p-6 space-y-4">
      <h3 className="text-sm font-semibold text-[#F9FAFB]">Submit a New Request</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#9CA3AF]">Title</label>
          <input
            type="text"
            placeholder="What do you need?"
            className="w-full px-3 py-2 text-sm text-[#F9FAFB] placeholder-[#6B7280] rounded-lg border border-white/[0.08] bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40 transition"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#9CA3AF]">Pillar</label>
          <select className="w-full px-3 py-2 text-sm text-[#F9FAFB] rounded-lg border border-white/[0.08] bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40 transition">
            <option value="giselle">Growth (Giselle)</option>
            <option value="miles">Management (Miles)</option>
            <option value="devon">Development (Devon)</option>
            <option value="alma">Academy (Alma)</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#9CA3AF]">Request Type</label>
          <select className="w-full px-3 py-2 text-sm text-[#F9FAFB] rounded-lg border border-white/[0.08] bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40 transition">
            <option value="general">General</option>
            <option value="feature">Feature</option>
            <option value="support">Support</option>
            <option value="bug">Bug</option>
            <option value="strategy">Strategy</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[#9CA3AF]">Priority</label>
          <select className="w-full px-3 py-2 text-sm text-[#F9FAFB] rounded-lg border border-white/[0.08] bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40 transition">
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-[#9CA3AF]">Description</label>
        <textarea
          placeholder="Describe your request in detail..."
          rows={3}
          className="w-full px-3 py-2 text-sm text-[#F9FAFB] placeholder-[#6B7280] rounded-lg border border-white/[0.08] bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/40 transition resize-none"
        />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-lg text-sm font-medium text-[#0B0C10] bg-[#F5A623] hover:bg-[#E09800] transition shadow-sm"
        >
          Submit Request
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2.5 rounded-lg text-sm font-medium text-[#9CA3AF] hover:bg-white/[0.06] transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
