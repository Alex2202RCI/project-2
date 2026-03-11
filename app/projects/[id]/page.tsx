'use client';

import { useParams } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/custom/StatusBadge';
import { RiskBadge } from '@/components/custom/RiskBadge';
import { SimpleProgress } from '@/components/custom/SimpleProgress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;

  const getProjectById = useAppStore((state) => state.getProjectById);
  const getCompanyById = useAppStore((state) => state.getCompanyById);
  const getTasksByProject = useAppStore((state) => state.getTasksByProject);
  const getDocumentsByProject = useAppStore((state) => state.getDocumentsByProject);
  const getRisksByProject = useAppStore((state) => state.getRisksByProject);
  const getUserById = useAppStore((state) => state.getUserById);

  const project = getProjectById(projectId);
  const company = project ? getCompanyById(project.companyId) : null;
  const tasks = getTasksByProject(projectId);
  const documents = getDocumentsByProject(projectId);
  const risks = getRisksByProject(projectId);

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Проект не найден</p>
        <Link href="/projects">
          <Button variant="outline" className="mt-4">
            Вернуться к списку
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-slate-900">{project.name}</h1>
            <span className="text-slate-500">{project.code}</span>
          </div>
          <p className="text-slate-600">{company?.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={project.status} />
          <RiskBadge level={project.riskLevel} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-slate-500">Тип проекта</div>
            <div className="text-lg font-semibold text-slate-900 mt-1">
              {project.type}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-slate-500">Бюджет</div>
            <div className="text-lg font-semibold text-slate-900 mt-1">
              ${(project.budget / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-slate-500 mt-1">
              Израсходовано: ${(project.budgetSpent / 1000000).toFixed(1)}M
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-slate-500">Прогресс</div>
            <div className="text-lg font-semibold text-slate-900 mt-1">
              {project.progress}%
            </div>
            <SimpleProgress value={project.progress} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-slate-500">Регион</div>
            <div className="text-lg font-semibold text-slate-900 mt-1">
              {project.region || 'N/A'}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="tasks">Задачи ({tasks.length})</TabsTrigger>
          <TabsTrigger value="documents">Документы ({documents.length})</TabsTrigger>
          <TabsTrigger value="risks">Риски ({risks.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Описание проекта</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">{project.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ключевые вехи</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg"
                  >
                    {milestone.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{milestone.name}</div>
                      <div className="text-sm text-slate-600 mt-1">
                        {new Date(milestone.date).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                    {milestone.completed && (
                      <Badge className="bg-green-100 text-green-800">Выполнено</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Команда проекта</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.teamMembers.map((userId) => {
                  const user = getUserById(userId);
                  return user ? (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{user.name}</div>
                        <div className="text-sm text-slate-600">{user.department}</div>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Задачи проекта</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">{task.name}</div>
                        <div className="text-sm text-slate-600 mt-1">{task.category}</div>
                      </div>
                      <StatusBadge status={task.status} />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-slate-500">
                        {new Date(task.startDate).toLocaleDateString('ru-RU')} -{' '}
                        {new Date(task.endDate).toLocaleDateString('ru-RU')}
                      </span>
                      <span className="text-sm font-medium text-slate-900">
                        {task.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Документы проекта</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">{doc.name}</div>
                        <div className="text-sm text-slate-600 mt-1">{doc.type}</div>
                      </div>
                      <Badge
                        variant={
                          doc.accessLevel === 'Strictly Confidential'
                            ? 'destructive'
                            : doc.accessLevel === 'Confidential'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {doc.accessLevel}
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-500 mt-2">
                      {new Date(doc.uploadDate).toLocaleDateString('ru-RU')} • v
                      {doc.version}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <CardTitle>Риски проекта</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {risks.map((risk) => (
                  <div
                    key={risk.id}
                    className="p-4 border border-slate-200 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">{risk.title}</div>
                        <div className="text-sm text-slate-600 mt-1">
                          {risk.description}
                        </div>
                      </div>
                      <RiskBadge level={risk.level} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <div className="text-xs text-slate-500">Вероятность</div>
                        <div className="text-sm font-medium text-slate-900">
                          {risk.probability}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Влияние</div>
                        <div className="text-sm font-medium text-slate-900">
                          {risk.impact}%
                        </div>
                      </div>
                    </div>
                    {risk.mitigationPlan && (
                      <div className="mt-3 p-3 bg-slate-50 rounded">
                        <div className="text-xs font-medium text-slate-700 mb-1">
                          План снижения риска
                        </div>
                        <div className="text-sm text-slate-600">{risk.mitigationPlan}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
