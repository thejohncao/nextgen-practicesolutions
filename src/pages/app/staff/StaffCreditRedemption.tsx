
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Search, CreditCard, User, Package } from 'lucide-react';
import { usePatients } from '@/hooks/usePatients';
import { useTreatments } from '@/hooks/useTreatments';
import { useCreditRedemption } from '@/hooks/useCreditRedemption';
import { useToast } from '@/hooks/use-toast';

const StaffCreditRedemption = () => {
  const { toast } = useToast();
  const { patients, searchTerm, setSearchTerm } = usePatients();
  const { treatments } = useTreatments();
  const { redeemCredits, loading } = useCreditRedemption();
  
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [selectedTreatment, setSelectedTreatment] = useState<any>(null);
  const [customCredits, setCustomCredits] = useState<number>(0);
  const [notes, setNotes] = useState('');

  const handleRedemption = async () => {
    if (!selectedPatient || (!selectedTreatment && customCredits === 0)) {
      toast({
        title: "Missing Information",
        description: "Please select a patient and treatment or enter custom credit amount",
        variant: "destructive"
      });
      return;
    }

    const creditsToRedeem = selectedTreatment ? selectedTreatment.credit_cost : customCredits;
    
    if (creditsToRedeem > selectedPatient.available_credits) {
      toast({
        title: "Insufficient Credits",
        description: `Patient only has ${selectedPatient.available_credits} credits available`,
        variant: "destructive"
      });
      return;
    }

    const result = await redeemCredits(
      selectedPatient.id,
      selectedTreatment?.id || 'manual',
      creditsToRedeem,
      notes || undefined
    );

    if (result.success) {
      setSelectedPatient(null);
      setSelectedTreatment(null);
      setCustomCredits(0);
      setNotes('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Credit Redemption</h1>
        <p className="text-white/70">Redeem patient credits for treatments and services</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Selection */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="h-5 w-5" />
              Select Patient
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
              <Input
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {patients.slice(0, 8).map((patient) => (
                <div
                  key={patient.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedPatient?.id === patient.id
                      ? 'bg-nextgen-purple/20 border-nextgen-purple'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">
                        {patient.first_name} {patient.last_name}
                      </div>
                      <div className="text-white/70 text-sm">{patient.email}</div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300">
                      {patient.available_credits} credits
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {selectedPatient && (
              <div className="p-4 bg-nextgen-purple/10 rounded-lg border border-nextgen-purple/30">
                <div className="text-white font-medium mb-2">Selected Patient:</div>
                <div className="text-white">
                  {selectedPatient.first_name} {selectedPatient.last_name}
                </div>
                <div className="text-white/70 text-sm">{selectedPatient.email}</div>
                <div className="text-green-400 text-sm mt-2">
                  Available Credits: {selectedPatient.available_credits}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Treatment/Service Selection */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Package className="h-5 w-5" />
              Select Treatment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {treatments.map((treatment) => (
                <div
                  key={treatment.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedTreatment?.id === treatment.id
                      ? 'bg-nextgen-purple/20 border-nextgen-purple'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => {
                    setSelectedTreatment(treatment);
                    setCustomCredits(0);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">{treatment.name}</div>
                      {treatment.description && (
                        <div className="text-white/70 text-sm">{treatment.description}</div>
                      )}
                      {treatment.category && (
                        <Badge variant="outline" className="border-white/20 text-white/70 mt-1">
                          {treatment.category}
                        </Badge>
                      )}
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-300">
                      {treatment.credit_cost} credits
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/20 pt-4">
              <Label htmlFor="custom-credits" className="text-white">Custom Credit Amount</Label>
              <Input
                id="custom-credits"
                type="number"
                placeholder="Enter custom amount..."
                value={customCredits || ''}
                onChange={(e) => {
                  setCustomCredits(parseInt(e.target.value) || 0);
                  setSelectedTreatment(null);
                }}
                className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            {(selectedTreatment || customCredits > 0) && (
              <div className="p-4 bg-nextgen-purple/10 rounded-lg border border-nextgen-purple/30">
                <div className="text-white font-medium mb-2">Selected:</div>
                {selectedTreatment ? (
                  <>
                    <div className="text-white">{selectedTreatment.name}</div>
                    <div className="text-blue-400 text-sm">
                      Cost: {selectedTreatment.credit_cost} credits
                    </div>
                  </>
                ) : (
                  <div className="text-white">
                    Custom redemption: {customCredits} credits
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Redemption Form */}
      {selectedPatient && (selectedTreatment || customCredits > 0) && (
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Complete Redemption
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white/5 rounded-lg">
              <div>
                <div className="text-white/70 text-sm">Patient</div>
                <div className="text-white font-medium">
                  {selectedPatient.first_name} {selectedPatient.last_name}
                </div>
              </div>
              <div>
                <div className="text-white/70 text-sm">Service</div>
                <div className="text-white font-medium">
                  {selectedTreatment ? selectedTreatment.name : 'Custom Redemption'}
                </div>
              </div>
              <div>
                <div className="text-white/70 text-sm">Credits to Redeem</div>
                <div className="text-white font-medium">
                  {selectedTreatment ? selectedTreatment.credit_cost : customCredits}
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="notes" className="text-white">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes about this redemption..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <Button
              onClick={handleRedemption}
              disabled={loading}
              className="w-full bg-nextgen-purple hover:bg-nextgen-purple/90"
            >
              {loading ? 'Processing...' : 'Redeem Credits'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StaffCreditRedemption;
