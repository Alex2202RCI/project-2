'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatusBadge } from '@/components/custom/StatusBadge';
import { RiskBadge } from '@/components/custom/RiskBadge';
import { SimpleProgress } from '@/components/custom/SimpleProgress';
import { Search, Filter } from 'lucide-react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ProjectsPage() {
  const projects = useAppStore((state) => state.projects);
  const companies = useAppStore((state) => state.companies);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || project.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Проекты</h1>
          <p className="text-slate-600 mt-1">Все инвестиционные проекты</p>
        </div>
        <Button>Создать проект</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Поиск по названию или коду проекта..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Тип проекта" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                <SelectItem value="Производство">Производство</SelectItem>
                <SelectItem value="Добыча">Добыча</SelectItem>
                <SelectItem value="Инфраструктура">Инфраструктура</SelectItem>
                <SelectItem value="Агро">Агро</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="Активен">Активен</SelectItem>
                <SelectItem value="Планирование">Планирование</SelectItem>
                <SelectItem value="Завершен">Завершен</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProjects.map((project) => {
              const company = companies.find((c) => c.id === project.companyId);
              return (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <div className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {project.name}
                          </h3>
                          <span className="text-sm text-slate-500">{project.code}</span>
                        </div>
                        <p className="text-sm text-slate-600">{company?.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={project.status} />
                        <RiskBadge level={project.riskLevel} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <div className="text-xs text-slate-500">Тип</div>
                        <div className="text-sm font-medium text-slate-900">
                          {project.type}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Регион</div>
                        <div className="text-sm font-medium text-slate-900">
                          {project.region || 'N/A'}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Бюджет</div>
                        <div className="text-sm font-medium text-slate-900">
                          ${(project.budget / 1000000).toFixed(1)}M
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Период</div>
                        <div className="text-sm font-medium text-slate-900">
                          {new Date(project.startDate).toLocaleDateString('ru-RU', {
                            month: 'short',
                            year: 'numeric',
                          })}{' '}
                          -{' '}
                          {new Date(project.endDate).toLocaleDateString('ru-RU', {
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-500">Прогресс</span>
                        <span className="text-sm font-semibold text-slate-900">
                          {project.progress}%
                        </span>
                      </div>
                      <SimpleProgress value={project.progress} />
                    </div>
                  </div>
                </Link>
              );
            })}

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500">Проекты не найдены</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
