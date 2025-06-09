
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface Report {
  id: string;
  name: string;
  generatedAt: string;
  rows: number;
  status: 'completed' | 'processing' | 'failed';
  chartData?: any[];
  distributionData?: any[];
}

interface ReportRequest {
  template: string;
  dateRange: any;
  groupBy: string;
}

export function useAdminReports() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);

  const generateReport = async (request: ReportRequest) => {
    if (!profile || profile.role !== 'admin') return;

    setLoading(true);
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newReport: Report = {
        id: Date.now().toString(),
        name: `${request.template} Report`,
        generatedAt: new Date().toLocaleString(),
        rows: Math.floor(Math.random() * 1000) + 100,
        status: 'completed',
        chartData: [
          { name: 'Jan', value: 4000 },
          { name: 'Feb', value: 3000 },
          { name: 'Mar', value: 5000 },
          { name: 'Apr', value: 4500 },
          { name: 'May', value: 6000 },
          { name: 'Jun', value: 5500 }
        ],
        distributionData: [
          { name: 'Location A', value: 400 },
          { name: 'Location B', value: 300 },
          { name: 'Location C', value: 200 },
          { name: 'Location D', value: 100 }
        ]
      };

      setReports(prev => [newReport, ...prev]);

      toast({
        title: "Report Generated",
        description: "Your report has been generated successfully",
      });

    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Load some sample reports on mount
  useEffect(() => {
    if (profile && profile.role === 'admin') {
      setReports([
        {
          id: '1',
          name: 'Monthly Revenue Report',
          generatedAt: '2025-01-08 10:30 AM',
          rows: 456,
          status: 'completed'
        },
        {
          id: '2',
          name: 'User Engagement Analysis',
          generatedAt: '2025-01-07 2:15 PM',
          rows: 1234,
          status: 'completed'
        }
      ]);
    }
  }, [profile]);

  return {
    reports,
    loading,
    generateReport
  };
}
