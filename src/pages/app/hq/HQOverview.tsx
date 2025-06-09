
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, DollarSign, Users, TrendingUp, Building, Bot } from 'lucide-react';

const HQOverview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">HQ Overview</h1>
        <p className="text-white/70">Global analytics and platform management</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">$125,750</div>
            <div className="text-green-300 text-sm">+12% from last month</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              Active Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">1,247</div>
            <div className="text-blue-300 text-sm">Across all locations</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Credits Redeemed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">3,428</div>
            <div className="text-purple-300 text-sm">This month</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Avg LTV
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">$2,840</div>
            <div className="text-orange-300 text-sm">Per patient</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Tenants */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Building className="h-5 w-5" />
              Active Tenants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="text-white font-medium">JUV Aesthetics</div>
                  <div className="text-white/70 text-sm">5 locations • 324 patients</div>
                </div>
                <div className="text-green-400 text-sm">Active</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="text-white font-medium">Bespoke Wellness</div>
                  <div className="text-white/70 text-sm">3 locations • 198 patients</div>
                </div>
                <div className="text-green-400 text-sm">Active</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="text-white font-medium">NextGen Practice</div>
                  <div className="text-white/70 text-sm">1 location • 725 patients</div>
                </div>
                <div className="text-green-400 text-sm">Active</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Agent Status */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Agent Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div>
                    <div className="text-white font-medium">Miles</div>
                    <div className="text-white/70 text-sm">Practice Management</div>
                  </div>
                </div>
                <div className="text-green-400 text-sm">Online</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div>
                    <div className="text-white font-medium">Giselle</div>
                    <div className="text-white/70 text-sm">Marketing & Growth</div>
                  </div>
                </div>
                <div className="text-green-400 text-sm">Online</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div>
                    <div className="text-white font-medium">Devon</div>
                    <div className="text-white/70 text-sm">Sales & Development</div>
                  </div>
                </div>
                <div className="text-yellow-400 text-sm">Idle</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div>
                    <div className="text-white font-medium">Alma</div>
                    <div className="text-white/70 text-sm">Training & Education</div>
                  </div>
                </div>
                <div className="text-green-400 text-sm">Online</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HQOverview;
