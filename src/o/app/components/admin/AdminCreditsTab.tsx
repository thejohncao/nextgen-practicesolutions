
import React, { useState } from "react";
import { useAdminCredits } from "@/hooks/useAdminCredits";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, FileText, Edit } from "lucide-react";

const AdminCreditsTab = () => {
  const { credits, loading, refetch } = useAdminCredits();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? credits
    : credits.filter(c => [c.source || "", c.related_action || ""].includes(filter));

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-2 items-center">
        <select
          className="border px-3 py-2 rounded bg-[#F0F8FF] text-[#00274D]"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="all">All types</option>
          <option value="drop">Monthly Drop</option>
          <option value="bonus">Bonus</option>
          <option value="redemption">Redemption</option>
          <option value="manual_adjustment">Manual</option>
        </select>
        <Button
          className="ml-2"
          variant="outline"
          onClick={() => refetch()}
        >
          Refresh
        </Button>
        <Button className="ml-auto" variant="secondary">
          <FileText className="mr-1 w-4 h-4" />
          Export CSV
        </Button>
        <Button className="ml-2" variant="default">
          <Edit className="mr-1 w-4 h-4" />
          Manual Adjust
        </Button>
      </div>
      <div className="overflow-auto rounded-xl mt-3">
        <Table className="min-w-[760px]">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Balance After</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(loading ? Array(6).fill({}) : filtered).map((tx: any, idx) => (
              <TableRow key={tx.id || idx}>
                <TableCell>
                  {tx.created_at ? new Date(tx.created_at).toLocaleDateString() : <span className="text-apple-subtle">-</span>}
                </TableCell>
                <TableCell>
                  {tx.user_email || <span className="text-apple-subtle">-</span>}
                </TableCell>
                <TableCell>
                  <span className={`font-bold ${tx.amount > 0 ? "text-green-600" : "text-red-500"}`}>{tx.amount > 0 ? "+" : ""}{tx.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge>
                    {tx.source || <span className="text-apple-subtle">-</span>}
                  </Badge>
                </TableCell>
                <TableCell>
                  {tx.related_action || <span className="text-apple-subtle">-</span>}
                </TableCell>
                <TableCell>
                  {tx.balance_after == null ? (
                    <span className="text-apple-subtle">-</span>
                  ) : (
                    <span className="font-medium">{tx.balance_after}</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="text-apple-subtle text-center py-4">No credits found.</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminCreditsTab;
