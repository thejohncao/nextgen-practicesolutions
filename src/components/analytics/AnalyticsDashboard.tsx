
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, DollarSign, Calendar, CreditCard } from 'lucide-react';
import { useHQAnalytics } from '@/hooks/useHQAnalytics';

const AnalyticsDashboard = () => {
  const { analytics, loading } = useHQAnalytics();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading analytics...</div>
      </div>
    );
  }

  // Mock data for charts - in real implementation, this would come from the analytics hook
  const revenueData = [
    { month: 'Jan', revenue: 45000, patients: 120 },
    { month: 'Feb', revenue: 52000, patients: 135 },
    { month: 'Mar', revenue: 48000, patients: 128 },
    { month: 'Apr', revenue: 61000, patients: 155 },
    { month: 'May', revenue: 55000, patients: 142 },
    { month: 'Jun', revenue: 67000, patients: 168 },
  ];

  const creditsData = [
    { day: 'Mon', earned: 450, redeemed: 320 },
    { day: 'Tue', earned: 380, redeemed: 420 },
    { day: 'Wed', earned: 520, redeemed: 350 },
    { day: 'Thu', earned: 390, redeemed: 480 },
    { day: 'Fri', earned: 460, redeemed: 390 },
    { day: 'Sat', earned: 340, redeemed: 280 },
    { day: 'Sun', earned: 280, redeemed: 240 },
  ];

  const treatmentData = [
    { name: 'Botox', value: 35, color: '#8B5CF6' },
    { name: 'Fillers', value: 28, color: '#06B6D4' },
    { name: 'Microneedling', value: 20, color: '#10B981' },
    { name: 'Chemical Peels', value: 12, color: '#F59E0B' },
    { name: 'Other', value: 5, color: '#EF4444' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-white/70">Comprehensive insights and performance metrics</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/10 border border-white/20">
          <TabsTrigger value="overview" className="text-white data-[state=active]:bg-nextgen-purple">
            Overview
          </TabsTrigger>
          <TabsTrigger value="revenue" className="text-white data-[state=active]:bg-nextgen-purple">
            Revenue
          </TabsTrigger>
          <TabsTrigger value="patients" className="text-white data-[state=active]:bg-nextgen-purple">
            Patients
          </TabsTrigger>
          <TabsTrigger value="treatments" className="text-white data-[state=active]:bg-nextgen-purple">
            Treatments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4" />
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-1">
                  ${analytics.totalRevenue.toLocaleString()}
                </div>
                <div className="text-green-300 text-xs">+{analytics.monthlyGrowth}% this month</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  Active Patients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-1">
                  {analytics.totalPatients.toLocaleString()}
                </div>
                <div className="text-blue-300 text-xs">Across {analytics.activeTenants} locations</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2 text-sm">
                  <CreditCard className="h-4 w-4" />
                  Credits Redeemed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-1">
                  {analytics.totalCreditsRedeemed.toLocaleString()}
                </div>
                <div className="text-purple-300 text-xs">This month</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4" />
                  Avg LTV
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-1">
                  ${analytics.averageLTV.toLocaleString()}
                </div>
                <div className="text-orange-300 text-xs">Per patient</div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }} 
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10B981"
                      fill="url(#colorRevenue)"
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Credits Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={creditsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }} 
                    />
                    <Bar dataKey="earned" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="redeemed" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="treatments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Treatment Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={treatmentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {treatmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
