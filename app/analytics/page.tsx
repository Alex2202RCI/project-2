'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  Brain,
  CheckCircle,
  Clock,
  ArrowRight,
  FileText,
  Building2,
  Calendar,
  Zap,
  ChevronRight,
  Download,
  RefreshCw,
  Activity,
  Shield,
  AlertCircle,
} from 'lucide-react';
import { projects } from '@/mock-data/projects';
import { tasks } from '@/mock-data/tasks';
import { riskAlerts, aiInsights, projectExposures } from '@/mock-data/myanmar-intelligence';
import Link from 'next/link';

export default function AnalyticsPage() {
  // Статистика проектов
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'Активен').length;
  const avgProgress = Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length);
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.budgetSpent, 0);
  const budgetUtilization = Math.round((totalSpent / totalBudget) * 100);

  // Задачи
  const overdueTasks = tasks.filter(t => {
    const endDate = new Date(t.endDate);
    const now = new Date();
    return t.status !== 'Завершено' && endDate < now;
  });

  const inProgressTasks = tasks.filter(t => t.status === 'Частично выполнено' || t.status === 'По графику');

  // Критические риски
  const criticalRisks = riskAlerts.filter(a => a.severity === 'Критический' || a.severity === 'Высокий');

  // Проекты с высоким риском
  const highRiskProjects = projectExposures.filter(p => p.currentRiskScore >= 60);

  // AI рекомендации
  const topInsights = aiInsights.slice(0, 3);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-blue-600';
    if (progress >= 40) return 'text-amber-600';
    return 'text-red-600';
  };

  const getProgressBg = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Активен':
        return <Badge className="bg-green-100 text-green-800">Активен</Badge>;
      case 'Планирование':
        return <Badge className="bg-blue-100 text-blue-800">Планирование</Badge>;
      case 'Завершен':
        return <Badge className="bg-slate-100 text-slate-800">Завершен</Badge>;
      case 'Приостановлен':
        return <Badge className="bg-red-100 text-red-800">Приостановлен</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Аналитика (ИИ-инсайты)</h1>
          <p className="text-slate-600 mt-1">
            AI-подсказки и аналитика на основе данных системы
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Обновить
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Экспорт отчета
          </Button>
        </div>
      </div>

      {/* KPI карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Активных проектов</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{activeProjects}</p>
                <p className="text-xs text-slate-500 mt-1">из {totalProjects} всего</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Средний прогресс</p>
                <p className={`text-3xl font-bold mt-1 ${getProgressColor(avgProgress)}`}>{avgProgress}%</p>
                <div className="w-24 h-1.5 bg-slate-200 rounded-full mt-2">
                  <div 
                    className={`h-1.5 rounded-full ${getProgressBg(avgProgress)}`}
                    style={{ width: `${avgProgress}%` }}
                  />
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Бюджет использован</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">{budgetUtilization}%</p>
                <p className="text-xs text-slate-500 mt-1">
                  ${(totalSpent / 1000000).toFixed(1)}M из ${(totalBudget / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Критических рисков</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{criticalRisks.length}</p>
                <p className="text-xs text-slate-500 mt-1">требуют внимания</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Авто-резюме проектов */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              Авто-резюме проектов
            </CardTitle>
            <Link href="/projects">
              <Button variant="ghost" size="sm" className="text-sm">
                Все проекты
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.slice(0, 5).map((project) => {
              const projectTasks = tasks.filter(t => t.projectId === project.id);
              const overdueProjectTasks = projectTasks.filter(t => {
                const endDate = new Date(t.endDate);
                return t.status !== 'Завершено' && endDate < new Date();
              });
              const projectRisk = projectExposures.find(p => p.projectId === project.id);

              return (
                <div key={project.id} className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-slate-900">{project.name}</h4>
                        {getStatusBadge(project.status)}
                        {projectRisk && projectRisk.currentRiskScore >= 60 && (
                          <Badge className="bg-red-100 text-red-800">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Риск: {projectRisk.currentRiskScore}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600">{project.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <div className={`text-2xl font-bold ${getProgressColor(project.progress)}`}>
                        {project.progress}%
                      </div>
                      <p className="text-xs text-slate-500">прогресс</p>
                    </div>
                  </div>
                  
                  <Progress value={project.progress} className="h-2 mb-3" />
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">
                        {new Date(project.startDate).toLocaleDateString('ru-RU')} - {new Date(project.endDate).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    {overdueProjectTasks.length > 0 && (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-xs font-medium">
                          {overdueProjectTasks.length} просроченных задач
                        </span>
                      </div>
                    )}
                  </div>

                  {/* AI рекомендация для проекта */}
                  {projectRisk && (
                    <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-slate-700">{projectRisk.recommendedAction}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Выявление рисков */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Выявление рисков
            </CardTitle>
            <Link href="/analytics/myanmar/risks">
              <Button variant="ghost" size="sm" className="text-sm">
                Все риски
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {criticalRisks.slice(0, 4).map((alert) => (
              <div
                key={alert.id}
                className={`p-4 border rounded-lg ${
                  alert.severity === 'Критический'
                    ? 'bg-red-50 border-red-200'
                    : 'bg-orange-50 border-orange-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    alert.severity === 'Критический' ? 'bg-red-100' : 'bg-orange-100'
                  }`}>
                    <AlertTriangle className={`w-5 h-5 ${
                      alert.severity === 'Критический' ? 'text-red-600' : 'text-orange-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-semibold ${
                        alert.severity === 'Критический' ? 'text-red-900' : 'text-orange-900'
                      }`}>
                        {alert.title}
                      </h4>
                      <Badge className={
                        alert.severity === 'Критический'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-orange-100 text-orange-800'
                      }>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className={`text-sm ${
                      alert.severity === 'Критический' ? 'text-red-800' : 'text-orange-800'
                    }`}>
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(alert.timestamp).toLocaleDateString('ru-RU')}
                      </span>
                      {alert.affectedProjects.length > 0 && (
                        <div className="flex gap-1">
                          {alert.affectedProjects.map((projectId) => (
                            <Badge key={projectId} variant="outline" className="text-xs">
                              {projectId}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* План vs Факт */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-green-600" />
            План vs Факт
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Общий прогресс */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-900">Общий прогресс</h4>
                </div>
                <span className="text-2xl font-bold text-green-600">{avgProgress}%</span>
              </div>
              <Progress value={avgProgress} className="h-3" />
              <p className="text-sm text-green-800 mt-3">
                По всем проектам выполнение плана составляет {avgProgress}%. 
                {avgProgress >= 70 
                  ? 'Большинство проектов идут по графику.' 
                  : 'Требуется ускорение реализации проектов.'}
                Отклонение по бюджету {budgetUtilization > 80 ? 'превышает плановые показатели' : 'в пределах нормы'}.
              </p>
            </div>

            {/* Бюджет */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Запланированный бюджет</span>
                  <span className="text-lg font-bold text-slate-900">${(totalBudget / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Фактически использовано</span>
                  <span className="text-lg font-bold text-amber-600">${(totalSpent / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Остаток</span>
                  <span className="text-lg font-bold text-green-600">${((totalBudget - totalSpent) / 1000000).toFixed(1)}M</span>
                </div>
              </div>

              <div className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Задач в работе</span>
                  <span className="text-lg font-bold text-blue-600">{inProgressTasks.length}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Просроченных задач</span>
                  <span className="text-lg font-bold text-red-600">{overdueTasks.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Завершено</span>
                  <span className="text-lg font-bold text-green-600">
                    {tasks.filter(t => t.status === 'Завершено').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Инсайты */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              AI-рекомендации
            </CardTitle>
            <Link href="/analytics/myanmar/decisions">
              <Button variant="ghost" size="sm" className="text-sm">
                Все инсайты
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topInsights.map((insight) => (
              <div key={insight.id} className="p-4 border border-slate-200 rounded-lg hover:border-purple-200 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    insight.confidence >= 80 ? 'bg-green-100' :
                    insight.confidence >= 60 ? 'bg-blue-100' : 'bg-amber-100'
                  }`}>
                    <Zap className={`w-5 h-5 ${
                      insight.confidence >= 80 ? 'text-green-600' :
                      insight.confidence >= 60 ? 'text-blue-600' : 'text-amber-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate-900">{insight.title}</h4>
                      <Badge className="text-xs">{insight.category}</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{insight.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Уверенность:</span>
                      <div className="flex items-center gap-1">
                        <div className="w-16 h-1.5 bg-slate-200 rounded-full">
                          <div 
                            className={`h-1.5 rounded-full ${
                              insight.confidence >= 80 ? 'bg-green-500' :
                              insight.confidence >= 60 ? 'bg-blue-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${insight.confidence}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium ${
                          insight.confidence >= 80 ? 'text-green-600' :
                          insight.confidence >= 60 ? 'text-blue-600' : 'text-amber-600'
                        }`}>
                          {insight.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Следующие шаги */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Следующие шаги
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Завершить просроченные задачи */}
            {overdueTasks.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-900">
                    Завершить просроченную задачу: "{task.name}"
                  </p>
                  <p className="text-xs text-red-700 mt-1">
                    Проект: {projects.find(p => p.id === task.projectId)?.name}
                  </p>
                </div>
                <Badge className="bg-red-100 text-red-800">Просрочена</Badge>
              </div>
            ))}

            {/* Начать запланированные задачи */}
            {tasks.filter(t => t.status === 'Не начато').slice(0, 2).map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900">
                    Начать задачу: "{task.name}"
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    Проект: {projects.find(p => p.id === task.projectId)?.name}
                  </p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Не начато</Badge>
              </div>
            ))}

            {/* Привлечь стейкхолдеров */}
            {highRiskProjects.slice(0, 2).map((exposure) => (
              <div key={exposure.id} className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <Shield className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-900">
                    Усилить контроль проекта: {exposure.projectName}
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    Риск: {exposure.currentRiskScore}/100 • {exposure.impactTypes.join(', ')}
                  </p>
                </div>
                <Badge className="bg-amber-100 text-amber-800">Высокий риск</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Дисклеймер */}
      <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg">
        <Brain className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-slate-700">Дисклеймер</p>
          <p className="text-sm text-slate-600 mt-1">
            Это AI-подсказки на основе данных системы. Финальные решения принимаются руководителем проекта.
            Данные обновляются в реальном времени. Последнее обновление: {new Date().toLocaleString('ru-RU')}.
          </p>
        </div>
      </div>
    </div>
  );
}