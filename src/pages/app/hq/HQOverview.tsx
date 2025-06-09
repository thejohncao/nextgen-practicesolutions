
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, DollarSign, Users, TrendingUp, Building, Bot, Activity, CreditCard } from 'lucide-react';
import { useHQAnalytics } from '@/hooks/useHQAnalytics';
import { useTenantManagement } from '@/hooks/useTenantManagement';
import { Link } from 'react-router-dom';

const HQOverview = () => {
  const { analytics, loading: analyticsLoading } = useHQAnalytics();
  const { tenants, loading: tenantsLoading } = useTenantManagement();

  const loading = analyticsLoading || tenantsLoading;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading HQ overview...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">HQ Overview</h1>
          <p className="text-white/70">Global analytics and platform management</p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Link to="/app/hq/tenants">Manage Tenants</Link>
          </Button>
          <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Link to="/app/hq/services">Manage Services</Link>
          </Button>
        </div>
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
            <div className="text-3xl font-bold text-white">
              ${analytics.totalRevenue.toLocaleString()}
            </div>
            <div className="text-green-300 text-sm">+{analytics.monthlyGrowth}% from last month</div>
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
            <div className="text-3xl font-bold text-white">
              {analytics.totalPatients.toLocaleString()}
            </div>
            <div className="text-blue-300 text-sm">Across {analytics.activeTenants} locations</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Credits Redeemed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">
              {analytics.totalCreditsRedeemed.toLocaleString()}
            </div>
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
            <div className="text-3xl font-bold text-white">
              ${analytics.averageLTV.toLocaleString()}
            </div>
            <div className="text-orange-300 text-sm">Per patient</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Tenants */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Building className="h-5 w-5" />
              Top Performing Tenants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topPerformingTenants.map((tenant, index) => (
                <div key={tenant.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-nextgen-purple flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="text-white font-medium">{tenant.name}</div>
                      <div className="text-white/70 text-sm">{tenant.patients} patients</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-medium">${tenant.revenue.toLocaleString()}</div>
                    <div className="text-white/60 text-sm">Monthly</div>
                  </div>
                </div>
              ))}
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
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Online</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div>
                    <div className="text-white font-medium">Giselle</div>
                    <div className="text-white/70 text-sm">Marketing & Growth</div>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Online</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div>
                    <div className="text-white font-medium">Devon</div>
                    <div className="text-white/70 text-sm">Sales & Development</div>
                  </div>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Idle</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div>
                    <div className="text-white font-medium">Alma</div>
                    <div className="text-white/70 text-sm">Training & Education</div>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Online</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">99.9%</div>
              <div className="text-white/70 text-sm">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">24ms</div>
              <div className="text-white/70 text-sm">Avg Response</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">0</div>
              <div className="text-white/70 text-sm">Critical Issues</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HQOverview;
