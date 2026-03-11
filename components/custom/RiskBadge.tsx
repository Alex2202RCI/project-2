import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RiskLevel } from '@/types';

interface RiskBadgeProps {
  level: RiskLevel;
  showIcon?: boolean;
  className?: string;
}

const riskColors: Record<RiskLevel, string> = {
  'Низкий': 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200',
  'Средний': 'bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200',
  'Высокий': 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200',
  'Критический': 'bg-red-100 text-red-800 hover:bg-red-100 border-red-200',
};

export function RiskBadge({ level, showIcon = true, className }: RiskBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(riskColors[level], className)}
    >
      {showIcon && <AlertTriangle className="w-3 h-3 mr-1" />}
      {level}
    </Badge>
  );
}
