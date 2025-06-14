
import React from "react";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Search, ChevronDown } from "lucide-react";

const AdminUsersTab = () => {
  const { users, loading, updateUserRole, deactivateUser } = useAdminUsers();
  const [search, setSearch] = React.useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      (user.first_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (user.last_name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <Input
          className="w-[240px]"
          placeholder="Search users..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          startIcon={<Search className="mr-2 w-4 h-4 text-apple-detail" />}
        />
      </div>
      <div className="overflow-auto rounded-xl">
        <Table className="min-w-[760px]">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(loading ? Array(6).fill({}) : filteredUsers).map((user: any, i) => (
              <TableRow key={user.id || i}>
                <TableCell>
                  {user.first_name || user.last_name ? (
                    <>
                      {user.first_name} {user.last_name}
                    </>
                  ) : (
                    <span className="text-apple-subtle">Unknown</span>
                  )}
                </TableCell>
                <TableCell>{user.email || <span className="text-apple-subtle">-</span>}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      user.role === "admin"
                        ? "bg-red-500/10 text-red-600"
                        : user.role === "staff"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-green-600/10 text-green-600"
                    }
                  >
                    {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
                  </Badge>
                  {/* Role dropdown placeholder */}
                </TableCell>
                <TableCell>{user.tenant_id || <span className="text-apple-subtle">-</span>}</TableCell>
                <TableCell>
                  {user.last_login ? (
                    new Date(user.last_login).toLocaleString()
                  ) : (
                    <span className="text-apple-subtle">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="mr-1"
                    title="Edit Role"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    title="Deactivate"
                    onClick={() => deactivateUser(user.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && !loading && (
              <TableRow><TableCell colSpan={6}><div className="text-apple-subtle text-center py-4">No users found.</div></TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsersTab;
