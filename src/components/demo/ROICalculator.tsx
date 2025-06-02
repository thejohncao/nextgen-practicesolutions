
import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RainbowButton from '@/components/ui/rainbow-button';
import { Link } from 'react-router-dom';

const ROICalculator = () => {
  const [staffCount, setStaffCount] = useState(3);
  const [monthlyPatients, setMonthlyPatients] = useState(150);
  const [avgTreatmentValue, setAvgTreatmentValue] = useState(2500);
  const [currentCollections, setCurrentCollections] = useState(75000);

  // Simple ROI calculations
  const aiSavings = staffCount * 2000; // $2k savings per staff member
  const collectionIncrease = currentCollections * 0.25; // 25% increase
  const totalROI = aiSavings + collectionIncrease;

  return (
    <section className="py-20 bg-black/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            What's the ROI for Your Practice?
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Calculator className="h-6 w-6 text-nextgen-purple" />
                  <h3 className="text-xl font-semibold text-white">Your Practice Details</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="staff" className="text-white/80">Number of front office staff</Label>
                    <Input
                      id="staff"
                      type="number"
                      value={staffCount}
                      onChange={(e) => setStaffCount(Number(e.target.value))}
                      className="mt-2 bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="patients" className="text-white/80">Monthly new patients</Label>
                    <Input
                      id="patients"
                      type="number"
                      value={monthlyPatients}
                      onChange={(e) => setMonthlyPatients(Number(e.target.value))}
                      className="mt-2 bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="treatment" className="text-white/80">Average treatment plan value</Label>
                    <Input
                      id="treatment"
                      type="number"
                      value={avgTreatmentValue}
                      onChange={(e) => setAvgTreatmentValue(Number(e.target.value))}
                      className="mt-2 bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="collections" className="text-white/80">Current monthly collections</Label>
                    <Input
                      id="collections"
                      type="number"
                      value={currentCollections}
                      onChange={(e) => setCurrentCollections(Number(e.target.value))}
                      className="mt-2 bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                  <h3 className="text-xl font-semibold text-white">Your ROI Impact</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      <span className="text-green-500 font-medium">Savings from AI</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      ${aiSavings.toLocaleString()}/month
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-blue-500" />
                      <span className="text-blue-500 font-medium">Collection increase from TCs</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      ${collectionIncrease.toLocaleString()}/month
                    </div>
                  </div>
                  
                  <div className="p-4 bg-nextgen-purple/10 border border-nextgen-purple/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="h-5 w-5 text-nextgen-purple" />
                      <span className="text-nextgen-purple font-medium">Total ROI impact</span>
                    </div>
                    <div className="text-3xl font-bold text-white">
                      ${totalROI.toLocaleString()}/month
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <RainbowButton size="lg" className="w-full" asChild>
                    <Link to="/pricing">
                      Book ROI Call
                    </Link>
                  </RainbowButton>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
