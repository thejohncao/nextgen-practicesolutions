import { ClientRequest } from '../types';
import StatusBadge from './StatusBadge';

const pillarLabels: Record<string, string> = {
  giselle: 'Growth',
  miles: 'Management',
  devon: 'Development',
};

interface Props {
  requests: ClientRequest[];
  compact?: boolean;
}

export default function RequestTable({ requests, compact }: Props) {
  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
        <p className="text-sm text-gray-400">No requests found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-xs font-medium text-gray-500 px-5 py-3">Title</th>
              <th className="text-left text-xs font-medium text-gray-500 px-3 py-3">Pillar</th>
              {!compact && (
                <th className="text-left text-xs font-medium text-gray-500 px-3 py-3 hidden md:table-cell">Priority</th>
              )}
              <th className="text-left text-xs font-medium text-gray-500 px-3 py-3">Status</th>
              {!compact && (
                <th className="text-left text-xs font-medium text-gray-500 px-3 py-3 hidden lg:table-cell">Updated</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {requests.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50/50 transition">
                <td className="px-5 py-3 font-medium text-gray-900">{req.title}</td>
                <td className="px-3 py-3 text-gray-500">{pillarLabels[req.pillarSlug]}</td>
                {!compact && (
                  <td className="px-3 py-3 hidden md:table-cell">
                    <StatusBadge status={req.priority} />
                  </td>
                )}
                <td className="px-3 py-3">
                  <StatusBadge status={req.status} />
                </td>
                {!compact && (
                  <td className="px-3 py-3 text-gray-400 hidden lg:table-cell">
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
