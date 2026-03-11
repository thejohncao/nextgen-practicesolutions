import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  buttonLabel: string;
  href?: string;
  accent?: string;
  className?: string;
}

const accentGradients: Record<string, string> = {
  giselle: 'from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400',
  miles: 'from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400',
  devon: 'from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400',
  alma: 'from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400',
  brand: 'from-[#F5A623] to-amber-500 hover:from-amber-400 hover:to-amber-300',
};

export default function CTACard({ title, buttonLabel, href = '/portal/requests', accent = 'miles', className }: Props) {
  return (
    <div
      className={cn(
        'bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] shadow-glass p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4',
        className
      )}
    >
      <p className="text-sm font-medium text-[#9CA3AF]">{title}</p>
      <Link
        to={href}
        className={cn(
          'inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r shadow-sm transition-all',
          accentGradients[accent] || accentGradients.miles
        )}
      >
        {buttonLabel}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
