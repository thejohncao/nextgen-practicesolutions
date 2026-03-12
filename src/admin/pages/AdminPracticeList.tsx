import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAdminAssessments, type AssessmentUser } from '../hooks/useAdminData';
import { RefreshCw, ChevronDown, Eye, Search } from 'lucide-react';
import { format } from 'date-fns';

const STATUS_CONFIG = {
  not_started: { label: 'Not Started', bg: 'bg-[#374151]', text: 'text-[#9CA3AF]' },
  in_progress: { label: 'In Progress', bg: 'bg-[#F5A623]/20', text: 'text-[#F5A623]' },
  completed: { label: 'Completed', bg: 'bg-emerald-500/20', text: 'text-emerald-400' },
  reviewed: { label: 'Reviewed', bg: 'bg-blue-500/20', text: 'text-blue-400' },
};

type SortKey = 'practice_name' | 'status' | 'score' | 'created_at';

export default function AdminPracticeList() {
  const { users, loading, refetch } = useAdminAssessments();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortKey>('created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const statusOrder = { reviewed: 0, completed: 1, in_progress: 2, not_started: 3 };

  const filtered = useMemo(() => {
    let list = [...users];

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(u =>
        (u.practice_name?.toLowerCase().includes(q)) ||
        (u.name?.toLowerCase().includes(q)) ||
        (u.email.toLowerCase().includes(q))
      );
    }

    if (statusFilter !== 'all') {
      list = list.filter(u => u.status === statusFilter);
    }

    list.sort((a, b) => {
      let cmp = 0;
      switch (sortBy) {
        case 'practice_name':
          cmp = (a.practice_name || '').localeCompare(b.practice_name || '');
          break;
        case 'status':
          cmp = statusOrder[a.status] - statusOrder[b.status];
          break;
        case 'score':
          cmp = a.score - b.score;
          break;
        case 'created_at':
          cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
      }
      return sortDir === 'desc' ? -cmp : cmp;
    });

    return list;
  }, [users, search, statusFilter, sortBy, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDir('desc');
    }
  };

  const doctorName = (u: AssessmentUser) => {
    if (u.first_name || u.last_name) return `${u.first_name || ''} ${u.last_name || ''}`.trim();
    return u.name || '—';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Assessment Dashboard</h1>
          <p className="text-sm text-[#6B7280] mt-1">{users.length} practices · {users.filter(u => u.status === 'completed').length} completed</p>
        </div>
        <button
          onClick={refetch}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] transition text-sm text-[#9CA3AF]"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search practice, doctor, email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#F5A623]/50"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-[#9CA3AF] focus:outline-none focus:border-[#F5A623]/50"
        >
          <option value="all">All Statuses</option>
          <option value="not_started">Not Started</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="reviewed">Reviewed</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/[0.06] bg-white/[0.02]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <Th label="Practice Name" sortKey="practice_name" current={sortBy} dir={sortDir} onSort={toggleSort} />
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">Doctor</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider hidden md:table-cell">Email</th>
              <Th label="Status" sortKey="status" current={sortBy} dir={sortDir} onSort={toggleSort} />
              <Th label="Score" sortKey="score" current={sortBy} dir={sortDir} onSort={toggleSort} />
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">Progress</th>
              <Th label="Date" sortKey="created_at" current={sortBy} dir={sortDir} onSort={toggleSort} />
              <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-[#6B7280]">No practices found</td>
              </tr>
            )}
            {filtered.map(u => {
              const sc = STATUS_CONFIG[u.status];
              return (
                <tr key={u.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition">
                  <td className="px-4 py-3 font-medium text-white">{u.practice_name || '—'}</td>
                  <td className="px-4 py-3 text-[#9CA3AF]">{doctorName(u)}</td>
                  <td className="px-4 py-3 text-[#6B7280] hidden md:table-cell">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${sc.bg} ${sc.text}`}>
                      {sc.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white font-mono">
                    {u.answered > 0 ? `${u.score}/100` : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${u.answered}%`,
                            background: u.answered === 100 ? '#4ade80' : '#F5A623',
                          }}
                        />
                      </div>
                      <span className="text-xs text-[#6B7280] font-mono">{u.answered}/100</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#6B7280] text-xs">
                    {format(new Date(u.created_at), 'MMM d, yyyy')}
                  </td>
                  <td className="px-4 py-3">
                    {u.answered > 0 ? (
                      <Link
                        to={`/admin/${u.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F5A623]/10 text-[#F5A623] text-xs font-medium hover:bg-[#F5A623]/20 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </Link>
                    ) : (
                      <span className="text-xs text-[#374151]">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ label, sortKey, current, dir, onSort }: {
  label: string;
  sortKey: SortKey;
  current: SortKey;
  dir: 'asc' | 'desc';
  onSort: (k: SortKey) => void;
}) {
  const active = current === sortKey;
  return (
    <th
      className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider cursor-pointer hover:text-white transition select-none"
      onClick={() => onSort(sortKey)}
    >
      <span className="flex items-center gap-1">
        {label}
        {active && (
          <ChevronDown className={`w-3 h-3 transition ${dir === 'asc' ? 'rotate-180' : ''}`} />
        )}
      </span>
    </th>
  );
}
