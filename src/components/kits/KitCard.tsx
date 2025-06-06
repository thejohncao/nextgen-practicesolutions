
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Kit } from '../../types/kits';
import { 
  Compass, 
  GraduationCap, 
  Megaphone, 
  Shield, 
  Laptop,
  ArrowRight 
} from 'lucide-react';

interface KitCardProps {
  kit: Kit;
}

const getKitIcon = (kitType: string) => {
  const iconClass = "h-8 w-8";
  
  switch (kitType) {
    case 'Launch':
      return <Compass className={iconClass} />;
    case 'Training':
      return <GraduationCap className={iconClass} />;
    case 'Marketing':
      return <Megaphone className={iconClass} />;
    case 'Compliance':
      return <Shield className={iconClass} />;
    case 'Technology':
      return <Laptop className={iconClass} />;
    default:
      return <Compass className={iconClass} />;
  }
};

const getKitEmoji = (kitType: string) => {
  switch (kitType) {
    case 'Launch':
      return '🧭';
    case 'Training':
      return '🎓';
    case 'Marketing':
      return '📢';
    case 'Compliance':
      return '🛡️';
    case 'Technology':
      return '💻';
    default:
      return '🧭';
  }
};

const KitCard: React.FC<KitCardProps> = ({ kit }) => {
  return (
    <Card className="glass-card hover:bg-white/10 transition-all duration-300 group h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-nextgen-purple/20 text-nextgen-purple group-hover:bg-nextgen-purple/30 transition-colors">
            {getKitIcon(kit.kit_type)}
          </div>
          <div className="text-3xl">
            {getKitEmoji(kit.kit_type)}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-nextgen-purple transition-colors">
            {kit.name}
          </h3>
          {kit.version && (
            <Badge variant="secondary" className="bg-white/10 text-white/80 border-white/20">
              {kit.version}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-white/70 text-sm leading-relaxed mb-6 line-clamp-3">
          {kit.description || 'Complete resources and tools for your practice.'}
        </p>
        
        <Link to={`/hq/kits/${kit.slug}`}>
          <Button 
            className="w-full bg-nextgen-purple hover:bg-nextgen-purple/90 text-white group-hover:shadow-lg transition-all duration-300"
            size="sm"
          >
            Explore Kit
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default KitCard;
