'use client';

import { KPICard } from '@/components/custom/KPICard';
import { MyanmarMap } from '@/components/custom/MyanmarMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppStore } from '@/store/useAppStore';
import {
  FolderKanban,
  CheckSquare,
  AlertTriangle,
  FileText,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  const kpiData = useAppStore((state) => state.kpiData);
  const mapPoints = useAppStore((state) => state.mapPoints);
  const events = useAppStore((state) => state.events);
  const projects = useAppStore((state) => state.projects);
  const tasks = useAppStore((state) => state.tasks);
  const currentUser = useAppStore((state) => state.currentUser);

  const myTasks = tasks.filter(
    (t) => t.assigneeId === currentUser?.id && t.status !== 'Завершено'
  ).slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Дежурная панель данных</h1>
        <p className="text-slate-600 mt-1">Обзор всех инвестиционных проектов</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title="Активных проектов"
          value={kpiData.activeProjects}
          icon={FolderKanban}
          iconColor="text-blue-600"
        />
        <KPICard
          title="Задач в работе"
          value={kpiData.tasksInProgress}
          icon={CheckSquare}
          iconColor="text-green-600"
        />
        <KPICard
          title="Просрочено"
          value={kpiData.tasksOverdue}
          icon={Clock}
          iconColor="text-red-600"
        />
        <KPICard
          title="Рисков (высокий)"
          value={kpiData.highRisks}
          icon={AlertTriangle}
          iconColor="text-orange-600"
        />
        <KPICard
          title="Документов на согласовании"
          value={kpiData.documentsForApproval}
          icon={FileText}
          iconColor="text-purple-600"
        />
        <KPICard
          title="Выполнение плана"
          value={`${kpiData.planCompletion}%`}
          icon={TrendingUp}
          iconColor="text-emerald-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MyanmarMap points={mapPoints} />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Лента событий</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.slice(0, 6).map((event) => (
                  <div key={event.id} className="flex gap-3 pb-4 border-b border-slate-100 last:border-0">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">
                        {event.title}
                      </div>
                      <div className="text-sm text-slate-600 mt-1">
                        {event.description}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {formatDistanceToNow(new Date(event.timestamp), {
                          addSuffix: true,
                          locale: ru,
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Мои задачи</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {myTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                  >
                    <div className="text-sm font-medium text-slate-900">
                      {task.name}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      {projects.find((p) => p.id === task.projectId)?.name}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-slate-500">
                        До {new Date(task.endDate).toLocaleDateString('ru-RU')}
                      </span>
                      <span className="text-xs font-medium text-blue-600">
                        {task.progress}%
                      </span>
                    </div>
                  </div>
                ))}
                {myTasks.length === 0 && (
                  <div className="text-sm text-slate-500 text-center py-4">
                    Нет активных задач
                  </div>
                )}
              </div>
              <Link href="/tasks">
                <Button variant="outline" className="w-full mt-4">
                  Все задачи
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
