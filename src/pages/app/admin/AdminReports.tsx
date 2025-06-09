
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-picker-range';
import { Badge } from '@/components/ui/badge';
import { useAdminReports } from '@/hooks/useAdminReports';
import { Download, FileText, BarChart3, TrendingUp } from 'lucide-react';
import AdminChart from '@/components/admin/AdminChart';

const AdminReports = () => {
  const { reports, generateReport, loading } = useAdminReports();
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [dateRange, setDateRange] = useState<any>(null);
  const [groupBy, setGroupBy] = useState('location');

  const reportTemplates = [
    { id: 'bookings', name: 'Bookings Report', icon: BarChart3 },
    { id: 'revenue', name: 'Revenue Analysis', icon: TrendingUp },
    { id: 'ltv', name: 'Customer LTV', icon: FileText },
    { id: 'churn', name: 'Churn Analysis', icon: BarChart3 }
  ];

  const handleGenerateReport = async () => {
    if (!selectedTemplate || !dateRange) return;
    
    await generateReport({
      template: selectedTemplate,
      dateRange,
      groupBy
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Custom Reports</h1>
          <p className="text-white/60">Generate detailed analytics and insights</p>
        </div>
        <Badge className="bg-nextgen-purple text-white">
          <FileText className="h-4 w-4 mr-2" />
          Report Center
        </Badge>
      </div>

      {/* Report Builder */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Report Builder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent className="bg-nextgen-dark border-white/10">
                {reportTemplates.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <DatePickerWithRange
              value={dateRange}
              onChange={setDateRange}
              className="bg-white/10 border-white/20 text-white"
            />

            <Select value={groupBy} onValueChange={setGroupBy}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-nextgen-dark border-white/10">
                <SelectItem value="location">Group by Location</SelectItem>
                <SelectItem value="timeframe">Group by Timeframe</SelectItem>
                <SelectItem value="coordinator">Group by Coordinator</SelectItem>
                <SelectItem value="treatment">Group by Treatment</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={handleGenerateReport}
              disabled={!selectedTemplate || !dateRange || loading}
              className="bg-nextgen-purple hover:bg-nextgen-purple/90"
            >
              {loading ? 'Generating...' : 'Generate Report'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Prebuilt Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <Card 
                  key={template.id} 
                  className="bg-white/5 border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <CardContent className="p-4 text-center">
                    <Icon className="h-8 w-8 mx-auto mb-2 text-nextgen-purple" />
                    <h3 className="text-white font-medium">{template.name}</h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Recent Reports</CardTitle>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div>
                  <h4 className="text-white font-medium">{report.name}</h4>
                  <p className="text-white/60 text-sm">
                    Generated {report.generatedAt} • {report.rows} rows
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-white border-white/20">
                    {report.status}
                  </Badge>
                  <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sample Charts */}
      {reports.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <AdminChart
                type="line"
                data={reports[0]?.chartData || []}
                title="Monthly Revenue"
              />
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Booking Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <AdminChart
                type="bar"
                data={reports[0]?.distributionData || []}
                title="Bookings by Location"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
