
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CreditCard, Plus, Search, Edit, Trash2, DollarSign } from 'lucide-react';
import { useTreatments } from '@/hooks/useTreatments';

const ServiceManagement = () => {
  const { treatments, loading } = useTreatments();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    credit_cost: 0,
    price_cents: 0,
    category: ''
  });

  const filteredTreatments = treatments.filter(treatment =>
    treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (treatment.category && treatment.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading services...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Service Management</h1>
          <p className="text-white/70">Manage treatments and services across all practices</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-nextgen-purple hover:bg-nextgen-purple/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-nextgen-dark border border-white/10">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Service</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="service-name" className="text-white">Service Name</Label>
                <Input
                  id="service-name"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Botox Treatment"
                />
              </div>
              <div>
                <Label htmlFor="service-category" className="text-white">Category</Label>
                <Input
                  id="service-category"
                  value={newService.category}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Injectables"
                />
              </div>
              <div>
                <Label htmlFor="service-description" className="text-white">Description</Label>
                <Textarea
                  id="service-description"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                  placeholder="Professional botox treatment for wrinkle reduction"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="credit-cost" className="text-white">Credit Cost</Label>
                  <Input
                    id="credit-cost"
                    type="number"
                    value={newService.credit_cost}
                    onChange={(e) => setNewService({ ...newService, credit_cost: Number(e.target.value) })}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="50"
                  />
                </div>
                <div>
                  <Label htmlFor="price" className="text-white">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newService.price_cents / 100}
                    onChange={(e) => setNewService({ ...newService, price_cents: Number(e.target.value) * 100 })}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="500"
                  />
                </div>
              </div>
              <Button className="w-full bg-nextgen-purple hover:bg-nextgen-purple/90">
                Create Service
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
              <CreditCard className="h-6 w-6 text-blue-400" />
              <div>
                <div className="text-lg font-bold text-white">{treatments.length}</div>
                <div className="text-white/70 text-xs">Total Services</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-green-400" />
              <div>
                <div className="text-lg font-bold text-white">
                  ${Math.round(treatments.reduce((sum, t) => sum + t.price_cents, 0) / treatments.length / 100) || 0}
                </div>
                <div className="text-white/70 text-xs">Avg Price</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-yellow-400" />
              <div>
                <div className="text-lg font-bold text-white">
                  {Math.round(treatments.reduce((sum, t) => sum + t.credit_cost, 0) / treatments.length) || 0}
                </div>
                <div className="text-white/70 text-xs">Avg Credits</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-white">
                  {[...new Set(treatments.map(t => t.category).filter(Boolean))].length}
                </div>
                <div className="text-white/70 text-xs">Categories</div>
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
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Services List */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Services ({filteredTreatments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTreatments.map((treatment) => (
              <div key={treatment.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-white font-medium">{treatment.name}</div>
                      {treatment.category && (
                        <Badge variant="outline" className="border-white/20 text-white/70">
                          {treatment.category}
                        </Badge>
                      )}
                      <Badge className={treatment.is_active ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}>
                        {treatment.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    
                    {treatment.description && (
                      <div className="text-white/70 text-sm mb-3">{treatment.description}</div>
                    )}
                    
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-white/70">
                        <span className="text-green-400 font-medium">${(treatment.price_cents / 100).toFixed(2)}</span>
                        <span className="ml-1">Price</span>
                      </div>
                      <div className="text-white/70">
                        <span className="text-blue-400 font-medium">{treatment.credit_cost}</span>
                        <span className="ml-1">Credits</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-500/30 text-red-300 hover:bg-red-500/20">
                      <Trash2 className="h-4 w-4" />
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

export default ServiceManagement;
