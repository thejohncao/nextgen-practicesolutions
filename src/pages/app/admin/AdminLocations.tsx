
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAdminLocations } from '@/hooks/useAdminLocations';
import { MapPin, Search, Plus, ExternalLink, UserPlus, Settings } from 'lucide-react';

const AdminLocations = () => {
  const { locations, loading, createLocation, assignCoordinator } = useAdminLocations();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.subdomain?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/20';
      case 'pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/20';
      case 'inactive': return 'bg-red-500/20 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading locations...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Partner Locations</h1>
          <p className="text-white/60">Manage tenant locations and partnerships</p>
        </div>
        <Button className="bg-nextgen-purple hover:bg-nextgen-purple/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Location
        </Button>
      </div>

      {/* Location Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Locations</p>
                <p className="text-2xl font-bold text-white">{locations.length}</p>
              </div>
              <MapPin className="h-8 w-8 text-nextgen-purple" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Active Locations</p>
                <p className="text-2xl font-bold text-white">
                  {locations.filter(l => l.status === 'active').length}
                </p>
              </div>
              <Badge className="bg-green-500/20 text-green-400">Active</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total MRR</p>
                <p className="text-2xl font-bold text-white">
                  ${locations.reduce((acc, l) => acc + (l.mrr || 0), 0).toLocaleString()}
                </p>
              </div>
              <Badge className="bg-blue-500/20 text-blue-400">Revenue</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Avg Users/Location</p>
                <p className="text-2xl font-bold text-white">
                  {Math.round(locations.reduce((acc, l) => acc + (l.active_users || 0), 0) / locations.length) || 0}
                </p>
              </div>
              <Badge className="bg-purple-500/20 text-purple-400">Users</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
          </div>
        </CardContent>
      </Card>

      {/* Locations Table */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Locations ({filteredLocations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead className="text-white/80">Name</TableHead>
                <TableHead className="text-white/80">Subdomain</TableHead>
                <TableHead className="text-white/80">Status</TableHead>
                <TableHead className="text-white/80">Active Users</TableHead>
                <TableHead className="text-white/80">MRR</TableHead>
                <TableHead className="text-white/80">Credits</TableHead>
                <TableHead className="text-white/80">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLocations.map((location) => (
                <TableRow key={location.id} className="border-white/5">
                  <TableCell className="text-white font-medium">
                    {location.name}
                  </TableCell>
                  <TableCell className="text-white/80">
                    {location.subdomain ? (
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{location.subdomain}</span>
                        <ExternalLink className="h-3 w-3 text-white/40" />
                      </div>
                    ) : (
                      'Not configured'
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(location.status)}>
                      {location.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white/80">
                    {location.active_users || 0}
                  </TableCell>
                  <TableCell className="text-white/80">
                    ${(location.mrr || 0).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-white/80">
                    {location.credits_in_circulation || 0}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <UserPlus className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
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

export default AdminLocations;
