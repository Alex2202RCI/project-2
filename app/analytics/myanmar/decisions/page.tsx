'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ClipboardList,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  TrendingUp,
  TrendingDown,
  Brain,
  ArrowRight,
  Calendar,
  Target,
  Zap,
  BarChart3,
  PieChart,
  Activity,
  Shield,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useState } from 'react';
import {
  decisionLog,
  aiInsights,
  riskAlerts,
  projectExposures,
  getVerificationStatusColor,
} from '@/mock-data/myanmar-intelligence';
import Link from 'next/link';

export default function DecisionsPage() {
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  // Статистика решений
  const confirmedDecisions = decisionLog.filter(d => d.decision === 'Подтверждено');
  const rejectedDecisions = decisionLog.filter(d => d.decision === 'Отклонено');
  const pendingDecisions = decisionLog.filter(d => d.decision === 'Ожидает');

  // Статистика AI-инсайтов
  const pendingInsights = aiInsights.filter(i => i.reviewStatus === 'Ожидает');
  const acceptedInsights = aiInsights.filter(i => i.reviewStatus === 'Принято');
  const rejectedInsights = aiInsights.filter(i => i.reviewStatus === 'Отклонено');

  // Статистика по категориям инсайтов
  const insightsByCategory = aiInsights.reduce((acc, insight) => {
    acc[insight.category] = (acc[insight.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Средняя уверенность AI
  const avgConfidence = Math.round(aiInsights.reduce((sum, i) => sum + i.confidence, 0) / aiInsights.length);

  // Критические алерты
  const criticalAlerts = riskAlerts.filter(a => a.severity === 'Критический' || a.severity === 'Высокий');

  // Проекты с высоким риском
  const highRiskProjects = projectExposures.filter(p => p.currentRiskScore >= 60);

  const getDecisionIcon = (decision: string) => {
    switch (decision) {
      case 'Подтверждено':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Отклонено':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'На пересмотре':
        return <Clock className="w-5 h-5 text-amber-600" />;
      default:
        return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const getDecisionBadgeColor = (decision: string) => {
    switch (decision) {
      case 'Подтверждено':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Отклонено':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'На пересмотре':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getInsightBadgeColor = (status: string) => {
    switch (status) {
      case 'Принято':
        return 'bg-green-100 text-green-800';
      case 'Отклонено':
        return 'bg-red-100 text-red-800';
      case 'Ожидает':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-blue-600';
    if (confidence >= 40) return 'text-amber-600';
    return 'text-red-600';
  };

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-500';
    if (confidence >= 60) return 'bg-blue-500';
    if (confidence >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-orange-600';
    if (score >= 40) return 'text-amber-600';
    return 'text-green-600';
  };

  const getRiskBgColor = (score: number) => {
    if (score >= 80) return 'bg-red-500';
    if (score >= 60) return 'bg-orange-500';
    if (score >= 40) return 'bg-amber-500';
    return 'bg-green-500';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Макроэкономика':
        return <BarChart3 className="w-4 h-4" />;
      case 'Логистика':
        return <Target className="w-4 h-4" />;
      case 'Региональный анализ':
        return <PieChart className="w-4 h-4" />;
      default:
        return <Brain className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <Link href="/analytics" className="hover:text-slate-700">Аналитика</Link>
          <span>/</span>
          <Link href="/analytics/myanmar" className="hover:text-slate-700">Мониторинг Мьянмы</Link>
          <span>/</span>
          <span className="text-slate-900">AI-инсайты и решения</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">AI-инсайты и решения</h1>
        <p className="text-slate-600 mt-1">
          Аналитика на основе искусственного интеллекта и журнал принятых решений
        </p>
      </div>

      {/* KPI карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Точность AI</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">{avgConfidence}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">+5% за месяц</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Принято решений</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{confirmedDecisions.length}</p>
                <p className="text-xs text-slate-500 mt-1">из {decisionLog.length} всего</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Ожидают решения</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">{pendingDecisions.length + pendingInsights.length}</p>
                <p className="text-xs text-slate-500 mt-1">требуют внимания</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Критических рисков</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{criticalAlerts.length}</p>
                <p className="text-xs text-slate-500 mt-1">требуют действий</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Визуализация данных */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Распределение AI-инсайтов по категориям */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <PieChart className="w-5 h-5 text-purple-600" />
              Распределение инсайтов по категориям
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(insightsByCategory).map(([category, count]) => {
                const percentage = Math.round((count / aiInsights.length) * 100);
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(category)}
                        <span className="text-sm font-medium text-slate-700">{category}</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-900">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full">
                      <div className="h-2 bg-purple-500 rounded-full" style={{ width: percentage + '%' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Уровень риска по проектам */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="w-5 h-5 text-red-600" />
              Уровень риска по проектам
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectExposures.slice(0, 5).map((project) => (
                <div key={project.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-slate-700">{project.projectCode}</span>
                      <span className="text-xs text-slate-500 ml-2">{project.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${getRiskScoreColor(project.currentRiskScore)}`}>
                        {project.currentRiskScore}
                      </span>
                      {project.riskChange7d > 0 ? (
                        <span className="text-xs text-red-600 flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" />
                          +{project.riskChange7d}
                        </span>
                      ) : (
                        <span className="text-xs text-green-600 flex items-center gap-0.5">
                          <TrendingDown className="w-3 h-3" />
                          {project.riskChange7d}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full h-2 bg-slate-200 rounded-full">
                      <div className="h-2 rounded-full" style={{ width: project.currentRiskScore + '%', backgroundColor: getRiskBgColor(project.currentRiskScore) }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Статистика решений */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ClipboardList className="w-5 h-5" />
            Статистика решений
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600">{confirmedDecisions.length}</p>
              <p className="text-sm text-slate-600 mt-1">Подтверждено</p>
              <p className="text-xs text-slate-500 mt-1">
                {Math.round((confirmedDecisions.length / decisionLog.length) * 100)}% от общего числа
              </p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-3">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-3xl font-bold text-red-600">{rejectedDecisions.length}</p>
              <p className="text-sm text-slate-600 mt-1">Отклонено</p>
              <p className="text-xs text-slate-500 mt-1">
                {Math.round((rejectedDecisions.length / decisionLog.length) * 100)}% от общего числа
              </p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-3">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-3xl font-bold text-amber-600">{pendingDecisions.length}</p>
              <p className="text-sm text-slate-600 mt-1">Ожидает решения</p>
              <p className="text-xs text-slate-500 mt-1">
                {Math.round((pendingDecisions.length / decisionLog.length) * 100)}% от общего числа
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            AI-инсайты
            {pendingInsights.length > 0 && (
              <Badge className="bg-amber-100 text-amber-800 text-xs">{pendingInsights.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="decisions" className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4" />
            Журнал решений
          </TabsTrigger>
        </TabsList>

        <TabsContent value="insights">
          <div className="space-y-4">
            {aiInsights.map((insight) => (
              <Card key={insight.id} className="overflow-hidden">
                <CardContent className="p-0">
                  {/* Заголовок инсайта */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg ${
                            insight.confidence >= 80 ? 'bg-green-100' :
                            insight.confidence >= 60 ? 'bg-blue-100' :
                            insight.confidence >= 40 ? 'bg-amber-100' : 'bg-red-100'
                          }`}>
                            {getCategoryIcon(insight.category)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 text-lg">{insight.title}</h4>
                            <div className="flex items-center gap-3 mt-1">
                              <Badge className={getInsightBadgeColor(insight.reviewStatus || 'Ожидает')}>
                                {insight.reviewStatus || 'Ожидает'}
                              </Badge>
                              <Badge variant="outline" className="text-xs">{insight.category}</Badge>
                              <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(insight.timestamp).toLocaleDateString('ru-RU')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600">{insight.description}</p>
                      </div>
                      
                      {/* Уверенность */}
                      <div className="text-center ml-4">
                        <div className={`text-2xl font-bold ${getConfidenceColor(insight.confidence)}`}>
                          {insight.confidence}%
                        </div>
                        <p className="text-xs text-slate-500">уверенность</p>
                        <div className="w-16 h-1.5 bg-slate-200 rounded-full mt-1">
                          <div 
                            className={`h-1.5 rounded-full ${getConfidenceBg(insight.confidence)}`}
                            style={{ width: insight.confidence + '%' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Гипотеза */}
                    <div className="p-4 bg-purple-50 rounded-lg mb-4">
                      <div className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-purple-800">Гипотеза:</p>
                          <p className="text-sm text-slate-700 mt-1">{insight.hypothesis}</p>
                        </div>
                      </div>
                    </div>

                    {/* Рекомендуемые действия */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Рекомендуемые действия:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {insight.recommendedActions.map((action, i) => (
                          <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-sm text-slate-700">
                            <ArrowRight className="w-3 h-3" />
                            {action}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Кнопка развернуть */}
                    <button
                      onClick={() => setExpandedInsight(expandedInsight === insight.id ? null : insight.id)}
                      className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                    >
                      {expandedInsight === insight.id ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Скрыть детали
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          Показать детали ({insight.basedOnSources.length} источников)
                        </>
                      )}
                    </button>
                  </div>

                  {/* Развернутые детали */}
                  {expandedInsight === insight.id && (
                    <div className="border-t border-slate-100 p-6 bg-slate-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Подтверждающие факты */}
                        <div>
                          <h5 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Подтверждающие факты
                          </h5>
                          <ul className="space-y-2">
                            {insight.supportingEvidence.map((evidence, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-600 bg-white p-2 rounded">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                {evidence}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Противоречивые факты */}
                        <div>
                          <h5 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Противоречивые факты
                          </h5>
                          <ul className="space-y-2">
                            {insight.contradictingEvidence.map((evidence, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-600 bg-white p-2 rounded">
                                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                {evidence}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Источники */}
                      <div className="mt-6">
                        <h5 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                          <Info className="w-4 h-4" />
                          Источники данных
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {insight.basedOnSources.map((sourceId) => (
                            <Badge key={sourceId} variant="outline" className="text-xs">
                              {sourceId}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Требуется проверка */}
                      {insight.humanReviewRequired && (
                        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-amber-600" />
                            <span className="text-sm font-medium text-amber-800">
                              Требуется проверка аналитика
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="decisions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                История решений
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {decisionLog.map((entry, index) => (
                  <div key={entry.id} className="relative">
                    {/* Timeline connector */}
                    {index < decisionLog.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-slate-200" />
                    )}
                    
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          entry.decision === 'Подтверждено' ? 'bg-green-100' :
                          entry.decision === 'Отклонено' ? 'bg-red-100' : 'bg-amber-100'
                        }`}>
                          {getDecisionIcon(entry.decision)}
                        </div>
                      </div>
                      
                      <div className="flex-1 pb-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-slate-900">{entry.signal}</h4>
                              <Badge className={getDecisionBadgeColor(entry.decision)}>
                                {entry.decision}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(entry.timestamp).toLocaleString('ru-RU')}
                            </p>
                          </div>
                          {entry.modelVersion && (
                            <Badge variant="outline" className="text-xs">
                              {entry.modelVersion}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Brain className="w-4 h-4 text-purple-600 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-purple-800">Рекомендация AI:</p>
                              <p className="text-sm text-slate-700 mt-1">{entry.aiRecommendation}</p>
                            </div>
                          </div>
                        </div>
                        
                        {entry.decidedBy && (
                          <div className="mt-3 flex items-center gap-2 text-sm">
                            <User className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-600">Принял решение:</span>
                            <span className="font-medium text-slate-900">{entry.decidedBy}</span>
                            {entry.decisionDate && (
                              <span className="text-slate-400">
                                • {new Date(entry.decisionDate).toLocaleString('ru-RU')}
                              </span>
                            )}
                          </div>
                        )}
                        
                        {entry.comments && (
                          <div className="mt-3 p-3 bg-white border border-slate-200 rounded-lg">
                            <p className="text-sm text-slate-700">{entry.comments}</p>
                          </div>
                        )}
                        
                        {entry.riskScoreChanged && (
                          <div className="mt-3 flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-500">Изменение риска:</span>
                              <span className="font-medium text-slate-700">{entry.previousRiskScore}</span>
                              <ArrowRight className="w-4 h-4 text-slate-400" />
                              <span className={`font-bold ${
                                Number(entry.newRiskScore) > (entry.previousRiskScore || 0) ? 'text-red-600' : 'text-green-600'
                              }`}>
                                {entry.newRiskScore}
                              </span>
                            </div>
                            {entry.reevaluated && (
                              <Badge variant="outline" className="text-xs">
                                Переоценка
                              </Badge>
                            )}
                          </div>
                        )}
                        
                        {entry.affectedProjects.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm text-slate-500">Затронутые проекты:</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {entry.affectedProjects.map((projectId) => (
                                <Badge key={projectId} variant="outline">{projectId}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
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