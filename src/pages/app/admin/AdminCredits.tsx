
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAdminCredits } from '@/hooks/useAdminCredits';
import { Search, Filter, Download, CreditCard, TrendingUp, TrendingDown } from 'lucide-react';
import AdminChart from '@/components/admin/AdminChart';

const AdminCredits = () => {
  const { credits, creditStats, loading } = useAdminCredits();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredCredits = credits.filter(credit => {
    const matchesSearch = credit.user_email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || credit.source === typeFilter;
    return matchesSearch && matchesType;
  });

  const getCreditTypeBadge = (source: string) => {
    switch (source) {
      case 'referral': return 'bg-green-500/20 text-green-400 border-green-500/20';
      case 'bonus': return 'bg-purple-500/20 text-purple-400 border-purple-500/20';
      case 'purchase': return 'bg-blue-500/20 text-blue-400 border-blue-500/20';
      case 'promotional': return 'bg-amber-500/20 text-amber-400 border-amber-500/20';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading credit data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Credit Management</h1>
          <p className="text-white/60">Monitor and manage credit transactions</p>
        </div>
        <Button className="bg-nextgen-purple hover:bg-nextgen-purple/90">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Credit Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Credits Issued</p>
                <p className="text-2xl font-bold text-white">{creditStats?.totalIssued || 0}</p>
              </div>
              <CreditCard className="h-8 w-8 text-nextgen-purple" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Credits Redeemed</p>
                <p className="text-2xl font-bold text-white">{creditStats?.totalRedeemed || 0}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Credits in Circulation</p>
                <p className="text-2xl font-bold text-white">{creditStats?.inCirculation || 0}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Burn Rate</p>
                <p className="text-2xl font-bold text-white">{creditStats?.burnRate || 0}%</p>
              </div>
              <TrendingDown className="h-8 w-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credit Burn vs Earn Chart */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Credit Burn vs Earn Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminChart
            type="line"
            data={creditStats?.chartData || []}
            title="Credits Over Time"
          />
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                placeholder="Search by user email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-nextgen-dark border-white/10">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="bonus">Bonus</SelectItem>
                <SelectItem value="purchase">Purchase</SelectItem>
                <SelectItem value="promotional">Promotional</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Credit Transactions Table */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Credit Transactions ({filteredCredits.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-white/80">Date</TableHead>
                <TableHead className="text-white/80">User</TableHead>
                <TableHead className="text-white/80">Type</TableHead>
                <TableHead className="text-white/80">Amount</TableHead>
                <TableHead className="text-white/80">Balance After</TableHead>
                <TableHead className="text-white/80">Related Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCredits.map((credit) => (
                <TableRow key={credit.id} className="border-white/5">
                  <TableCell className="text-white">
                    {new Date(credit.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-white/80">{credit.user_email}</TableCell>
                  <TableCell>
                    <Badge className={getCreditTypeBadge(credit.source)}>
                      {credit.source}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white font-mono">
                    {credit.amount > 0 ? '+' : ''}{credit.amount}
                  </TableCell>
                  <TableCell className="text-white/80 font-mono">
                    {credit.balance_after || 'N/A'}
                  </TableCell>
                  <TableCell className="text-white/80">
                    {credit.related_action || 'Manual'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCredits;
