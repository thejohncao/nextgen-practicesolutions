
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface AdminMetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

const AdminMetricCard = ({ title, value, icon: Icon, change, changeType }: AdminMetricCardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'bg-green-500/20 text-green-400';
      case 'negative': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/60 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
            {change && (
              <Badge className={`${getChangeColor()} mt-2 text-xs`}>
                {change}
              </Badge>
            )}
          </div>
          <Icon className="h-8 w-8 text-nextgen-purple" />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminMetricCard;
