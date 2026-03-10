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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition shadow-sm"
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
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">Submit a New Request</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600">Title</label>
          <input
            type="text"
            placeholder="What do you need?"
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600">Pillar</label>
          <select className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition">
            <option value="giselle">Growth (Giselle)</option>
            <option value="miles">Management (Miles)</option>
            <option value="devon">Development (Devon)</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600">Request Type</label>
          <select className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition">
            <option value="general">General</option>
            <option value="feature">Feature</option>
            <option value="support">Support</option>
            <option value="bug">Bug</option>
            <option value="strategy">Strategy</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600">Priority</label>
          <select className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition">
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-600">Description</label>
        <textarea
          placeholder="Describe your request in detail..."
          rows={3}
          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition resize-none"
        />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={onClose}
          className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition shadow-sm"
        >
          Submit Request
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
