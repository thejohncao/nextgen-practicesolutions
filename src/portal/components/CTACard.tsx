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
  giselle: 'from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600',
  miles: 'from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600',
  devon: 'from-violet-600 to-violet-500 hover:from-violet-700 hover:to-violet-600',
  alma: 'from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600',
};

export default function CTACard({ title, buttonLabel, href = '/portal/requests', accent = 'miles', className }: Props) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4',
        className
      )}
    >
      <p className="text-sm font-medium text-gray-700">{title}</p>
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
