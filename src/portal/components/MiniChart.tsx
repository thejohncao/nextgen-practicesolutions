import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface DataPoint {
  month: string;
  value: number;
}

interface Props {
  data: DataPoint[];
  color?: string;
  title?: string;
  className?: string;
}

export default function MiniChart({ data, color = '#1EC97F', title, className }: Props) {
  return (
    <div className={cn('bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] shadow-glass p-5', className)}>
      {title && <h3 className="text-sm font-semibold text-[#F9FAFB] mb-3">{title}</h3>}
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: '#181B2D',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                fontSize: '12px',
                color: '#F9FAFB',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              }}
              itemStyle={{ color: '#F9FAFB' }}
              labelStyle={{ color: '#9CA3AF' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={`url(#grad-${color.replace('#', '')})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
