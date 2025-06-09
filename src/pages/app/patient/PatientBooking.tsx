
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, CreditCard, Search, Filter } from 'lucide-react';
import { useCredits } from '@/hooks/useCredits';
import { useTreatments } from '@/hooks/useTreatments';
import { useToast } from '@/hooks/use-toast';

const PatientBooking = () => {
  const { availableBalance } = useCredits();
  const { treatments, loading } = useTreatments();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAffordableOnly, setShowAffordableOnly] = useState(false);

  const categories = ['all', ...new Set(treatments.map(t => t.category).filter(Boolean))];
  
  const filteredTreatments = treatments.filter(treatment => {
    const matchesSearch = treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (treatment.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesCategory = selectedCategory === 'all' || treatment.category === selectedCategory;
    const isAffordable = !showAffordableOnly || treatment.credit_cost <= availableBalance;
    
    return matchesSearch && matchesCategory && isAffordable;
  });

  const handleBookTreatment = (treatment: any) => {
    if (treatment.credit_cost > availableBalance) {
      toast({
        title: "Insufficient Credits",
        description: `You need ${treatment.credit_cost} credits but only have ${availableBalance}.`,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Treatment Booking",
      description: "Booking system coming soon! You'll be able to schedule treatments directly.",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading treatments...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Book Treatment</h1>
        <p className="text-white/70">Choose from available treatments and book your appointment</p>
      </div>

      {/* Credit Balance Banner */}
      <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-green-400" />
              <div>
                <div className="text-white font-medium">Available Credits</div>
                <div className="text-white/70 text-sm">Ready to use for treatments</div>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{availableBalance}</div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Treatments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="text-white text-sm">Search Treatments</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                <Input
                  id="search"
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>
            </div>
            
            <div className="sm:w-48">
              <Label htmlFor="category" className="text-white text-sm">Category</Label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-gray-800">
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="affordable"
              checked={showAffordableOnly}
              onChange={(e) => setShowAffordableOnly(e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="affordable" className="text-white text-sm">
              Show only treatments I can afford ({availableBalance} credits)
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Treatments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTreatments.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-white/60 text-lg">No treatments found matching your criteria</div>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setShowAffordableOnly(false);
              }}
              className="mt-4 border-white/20 text-white hover:bg-white/10"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          filteredTreatments.map((treatment) => {
            const canAfford = treatment.credit_cost <= availableBalance;
            
            return (
              <Card key={treatment.id} className={`bg-white/5 backdrop-blur-sm border ${
                canAfford ? 'border-white/10' : 'border-red-500/30'
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-white text-lg">{treatment.name}</CardTitle>
                    <Badge variant={canAfford ? "default" : "destructive"} className="ml-2">
                      {treatment.credit_cost} credits
                    </Badge>
                  </div>
                  {treatment.category && (
                    <Badge variant="outline" className="w-fit border-white/20 text-white/70">
                      {treatment.category}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {treatment.description && (
                    <p className="text-white/70 text-sm">{treatment.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Cost:</span>
                    <span className="text-white font-medium">{treatment.credit_cost} credits</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Price:</span>
                    <span className="text-white/60">${(treatment.price_cents / 100).toFixed(2)}</span>
                  </div>
                  
                  <Button
                    onClick={() => handleBookTreatment(treatment)}
                    disabled={!canAfford}
                    className={`w-full ${
                      canAfford 
                        ? 'bg-nextgen-purple hover:bg-nextgen-purple/90' 
                        : 'bg-gray-600 cursor-not-allowed'
                    }`}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    {canAfford ? 'Book Treatment' : 'Insufficient Credits'}
                  </Button>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PatientBooking;
