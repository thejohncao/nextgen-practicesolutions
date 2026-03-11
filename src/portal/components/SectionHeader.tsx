import { cn } from '@/lib/utils';

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
  action?: React.ReactNode;
}

export default function SectionHeader({ title, subtitle, className, action }: Props) {
  return (
    <div className={cn('flex items-end justify-between gap-4', className)}>
      <div>
        <h2 className="text-lg font-semibold text-[#F9FAFB]">{title}</h2>
        {subtitle && <p className="text-sm text-[#9CA3AF] mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
