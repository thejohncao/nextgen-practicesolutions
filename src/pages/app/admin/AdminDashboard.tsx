
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useHQAnalytics } from '@/hooks/useHQAnalytics';
import { 
  Users, 
  CreditCard, 
  DollarSign, 
  MapPin, 
  Bot,
  TrendingUp,
  Activity
} from 'lucide-react';
import AdminMetricCard from '@/components/admin/AdminMetricCard';
import AdminChart from '@/components/admin/AdminChart';

const AdminDashboard = () => {
  const { analytics, loading } = useHQAnalytics();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">NextGen OS Admin</h1>
          <p className="text-white/60">Mission Control for the NextGen Platform</p>
        </div>
        <Badge className="bg-nextgen-purple text-white">
          System Administrator
        </Badge>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminMetricCard
          title="Total Users"
          value={analytics?.totalUsers || 0}
          icon={Users}
          change="+12%"
          changeType="positive"
        />
        <AdminMetricCard
          title="Active Locations"
          value={analytics?.activeLocations || 0}
          icon={MapPin}
          change="+5%"
          changeType="positive"
        />
        <AdminMetricCard
          title="Monthly Revenue"
          value={`$${(analytics?.monthlyRevenue || 0).toLocaleString()}`}
          icon={DollarSign}
          change="+18%"
          changeType="positive"
        />
        <AdminMetricCard
          title="Credits in Circulation"
          value={analytics?.creditsInCirculation || 0}
          icon={CreditCard}
          change="-3%"
          changeType="negative"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Credit Usage Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AdminChart
              type="line"
              data={analytics?.creditUsageData || []}
              title="Credits Over Time"
            />
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Agent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AdminChart
              type="bar"
              data={analytics?.agentActivityData || []}
              title="Agent Interactions"
            />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent System Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics?.recentActivity?.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white font-medium">{activity.description}</p>
                  <p className="text-white/60 text-sm">{activity.timestamp}</p>
                </div>
                <Badge variant="outline" className="text-white border-white/20">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
