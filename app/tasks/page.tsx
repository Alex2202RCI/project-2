'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/custom/StatusBadge';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function TasksPage() {
  const tasks = useAppStore((state) => state.tasks);
  const projects = useAppStore((state) => state.projects);
  const users = useAppStore((state) => state.users);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Задачи</h1>
          <p className="text-slate-600 mt-1">Все задачи по проектам</p>
        </div>
        <Button>Создать задачу</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Поиск задач..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="Завершено">Завершено</SelectItem>
                <SelectItem value="Не начато">Не начато</SelectItem>
                <SelectItem value="По графику">По графику</SelectItem>
                <SelectItem value="Частично выполнено">Частично выполнено</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTasks.map((task) => {
              const project = projects.find((p) => p.id === task.projectId);
              const assignee = users.find((u) => u.id === task.assigneeId);
              return (
                <div
                  key={task.id}
                  className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{task.name}</div>
                      <div className="text-sm text-slate-600 mt-1">
                        {project?.name} • {task.category}
                      </div>
                    </div>
                    <StatusBadge status={task.status} />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-slate-500">{assignee?.name}</span>
                    <span className="text-sm text-slate-500">
                      {new Date(task.endDate).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
