import { ClientRequest } from '../types';
import StatusBadge from './StatusBadge';

const pillarLabels: Record<string, string> = {
  giselle: 'Growth',
  miles: 'Management',
  devon: 'Development',
  alma: 'Academy',
};

interface Props {
  requests: ClientRequest[];
  compact?: boolean;
}

export default function RequestTable({ requests, compact }: Props) {
  if (requests.length === 0) {
    return (
      <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] shadow-glass p-8 text-center">
        <p className="text-sm text-[#6B7280]">No requests found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] shadow-glass overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left text-xs font-medium text-[#9CA3AF] px-5 py-3">Title</th>
              <th className="text-left text-xs font-medium text-[#9CA3AF] px-3 py-3">Pillar</th>
              {!compact && (
                <th className="text-left text-xs font-medium text-[#9CA3AF] px-3 py-3 hidden md:table-cell">Priority</th>
              )}
              <th className="text-left text-xs font-medium text-[#9CA3AF] px-3 py-3">Status</th>
              {!compact && (
                <th className="text-left text-xs font-medium text-[#9CA3AF] px-3 py-3 hidden lg:table-cell">Updated</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-white/[0.02] transition">
                <td className="px-5 py-3 font-medium text-[#F9FAFB]">{req.title}</td>
                <td className="px-3 py-3 text-[#9CA3AF]">{pillarLabels[req.pillarSlug]}</td>
                {!compact && (
                  <td className="px-3 py-3 hidden md:table-cell">
                    <StatusBadge status={req.priority} />
                  </td>
                )}
                <td className="px-3 py-3">
                  <StatusBadge status={req.status} />
                </td>
                {!compact && (
                  <td className="px-3 py-3 text-[#6B7280] hidden lg:table-cell">
                    {new Date(req.updatedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
