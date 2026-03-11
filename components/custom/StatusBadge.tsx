import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ProjectStatus, TaskStatus } from '@/types';

interface StatusBadgeProps {
  status: ProjectStatus | TaskStatus;
  className?: string;
}

const statusColors: Record<string, string> = {
  'Активен': 'bg-green-100 text-green-800 hover:bg-green-100',
  'Планирование': 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  'Завершен': 'bg-slate-100 text-slate-800 hover:bg-slate-100',
  'Приостановлен': 'bg-orange-100 text-orange-800 hover:bg-orange-100',
  'Завершено': 'bg-green-100 text-green-800 hover:bg-green-100',
  'Не начато': 'bg-slate-100 text-slate-700 hover:bg-slate-100',
  'Частично выполнено': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  'По графику': 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  'Будущая задача': 'bg-slate-100 text-slate-600 hover:bg-slate-100',
  'Отложено': 'bg-orange-100 text-orange-700 hover:bg-orange-100',
  'Ожидание': 'bg-amber-100 text-amber-700 hover:bg-amber-100',
  'Отменено': 'bg-red-100 text-red-700 hover:bg-red-100',
  'Изменение задачи': 'bg-purple-100 text-purple-700 hover:bg-purple-100',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(statusColors[status] || 'bg-slate-100 text-slate-700', className)}
    >
      {status}
    </Badge>
  );
}
