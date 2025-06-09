
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Building, Users, DollarSign, Plus, Search, Settings, BarChart3 } from 'lucide-react';
import { useTenantManagement } from '@/hooks/useTenantManagement';
import { format } from 'date-fns';

const TenantManagement = () => {
  const { tenants, loading, createTenant } = useTenantManagement();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTenant, setNewTenant] = useState({
    name: '',
    slug: '',
    domain: ''
  });

  const handleCreateTenant = async () => {
    if (!newTenant.name || !newTenant.slug) return;

    const result = await createTenant(newTenant);
    if (result.success) {
      setIsCreateDialogOpen(false);
      setNewTenant({ name: '', slug: '', domain: '' });
    }
  };

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading tenants...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Tenant Management</h1>
          <p className="text-white/70">Manage and monitor all practice locations</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-nextgen-purple hover:bg-nextgen-purple/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-nextgen-dark border border-white/10">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Tenant</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">Practice Name</Label>
                <Input
                  id="name"
                  value={newTenant.name}
                  onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="JUV Aesthetics"
                />
              </div>
              <div>
                <Label htmlFor="slug" className="text-white">Slug</Label>
                <Input
                  id="slug"
                  value={newTenant.slug}
                  onChange={(e) => setNewTenant({ ...newTenant, slug: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="juv-aesthetics"
                />
              </div>
              <div>
                <Label htmlFor="domain" className="text-white">Domain (Optional)</Label>
                <Input
                  id="domain"
                  value={newTenant.domain}
                  onChange={(e) => setNewTenant({ ...newTenant, domain: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="juvaesthetics.com"
                />
              </div>
              <Button onClick={handleCreateTenant} className="w-full bg-nextgen-purple hover:bg-nextgen-purple/90">
                Create Tenant
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Building className="h-6 w-6 text-blue-400" />
              <div>
                <div className="text-lg font-bold text-white">{tenants.length}</div>
                <div className="text-white/70 text-xs">Total Tenants</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-green-400" />
              <div>
                <div className="text-lg font-bold text-white">
                  {tenants.reduce((sum, t) => sum + (t.patient_count || 0), 0)}
                </div>
                <div className="text-white/70 text-xs">Total Patients</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-yellow-400" />
              <div>
                <div className="text-lg font-bold text-white">
                  ${tenants.reduce((sum, t) => sum + (t.monthly_revenue || 0), 0).toLocaleString()}
                </div>
                <div className="text-white/70 text-xs">Monthly Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-white">
                  {tenants.reduce((sum, t) => sum + (t.staff_count || 0), 0)}
                </div>
                <div className="text-white/70 text-xs">Total Staff</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
            <Input
              placeholder="Search tenants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tenants List */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Tenants ({filteredTenants.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTenants.map((tenant) => (
              <div key={tenant.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-white font-medium">{tenant.name}</div>
                      <Badge variant="outline" className="border-white/20 text-white/70">
                        {tenant.slug}
                      </Badge>
                      {tenant.domain && (
                        <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                          {tenant.domain}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="text-white/70">
                        <div className="text-white font-medium">{tenant.patient_count || 0}</div>
                        <div>Patients</div>
                      </div>
                      <div className="text-white/70">
                        <div className="text-white font-medium">{tenant.staff_count || 0}</div>
                        <div>Staff</div>
                      </div>
                      <div className="text-white/70">
                        <div className="text-white font-medium">${(tenant.monthly_revenue || 0).toLocaleString()}</div>
                        <div>Monthly Revenue</div>
                      </div>
                      <div className="text-white/70">
                        <div className="text-white font-medium">
                          {format(new Date(tenant.created_at), 'MMM dd, yyyy')}
                        </div>
                        <div>Created</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantManagement;
