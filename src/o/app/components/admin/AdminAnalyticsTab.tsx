
import React from "react";
import { useHQAnalytics } from "@/hooks/useHQAnalytics";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { BarChart2, Users, FileText } from "lucide-react";

const AdminAnalyticsTab = () => {
  const { analytics, loading } = useHQAnalytics();

  if (loading) {
    return (
      <div className="text-apple-subtle flex justify-center items-center py-16">Loading analytics...</div>
    );
  }

  return (
    <div>
      <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="w-4 h-4" />
              Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.totalUsers}</div>
            <div className="text-apple-detail mt-1 text-sm">Total platform users</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart2 className="w-4 h-4" />
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${analytics.monthlyRevenue?.toLocaleString()}</div>
            <div className="text-apple-detail mt-1 text-sm">Revenue this month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="w-4 h-4" />
              Credits Redeemed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics.totalCreditsRedeemed}</div>
            <div className="text-apple-detail mt-1 text-sm">Credits redeemed this month</div>
          </CardContent>
        </Card>
      </div>
      {/* Charts, trends, recent activity placeholders */}
      <div className="mt-5">
        <div className="bg-[#F0F8FF] border border-[#FFD700]/10 rounded-2xl px-6 py-9 text-center text-apple-header">
          <span className="font-bold">Charts & trends coming soon!</span>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsTab;
