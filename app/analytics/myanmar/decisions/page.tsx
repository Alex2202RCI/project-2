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
} from 'lucide-react';
import {
  decisionLog,
  aiInsights,
  getVerificationStatusColor,
} from '@/mock-data/myanmar-intelligence';
import Link from 'next/link';

export default function DecisionsPage() {
  // Статистика решений
  const confirmedDecisions = decisionLog.filter(d => d.decision === 'Подтверждено');
  const rejectedDecisions = decisionLog.filter(d => d.decision === 'Отклонено');
  const pendingDecisions = decisionLog.filter(d => d.decision === 'Ожидает');

  // Статистика AI-инсайтов
  const pendingInsights = aiInsights.filter(i => i.reviewStatus === 'Ожидает');
  const acceptedInsights = aiInsights.filter(i => i.reviewStatus === 'Принято');
  const rejectedInsights = aiInsights.filter(i => i.reviewStatus === 'Отклонено');

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
    if (confidence >= 80) return 'bg-green-500';
    if (confidence >= 60) return 'bg-blue-500';
    if (confidence >= 40) return 'bg-amber-500';
    return 'bg-red-500';
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
          <span className="text-slate-900">Журнал решений</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Журнал решений</h1>
        <p className="text-slate-600 mt-1">
          История решений по сигналам и рекомендациям AI-аналитики
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Подтверждено</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{confirmedDecisions.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Отклонено</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{rejectedDecisions.length}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Ожидает решения</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">{pendingDecisions.length}</p>
              </div>
              <Clock className="w-8 h-8 text-amber-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="decisions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="decisions">Журнал решений</TabsTrigger>
          <TabsTrigger value="insights">AI-инсайты</TabsTrigger>
        </TabsList>

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

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI-инсайты
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight) => (
                  <div key={insight.id} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-slate-900">{insight.title}</h4>
                          <Badge className={getInsightBadgeColor(insight.reviewStatus || 'Ожидает')}>
                            {insight.reviewStatus || 'Ожидает'}
                          </Badge>
                          <Badge variant="outline">{insight.category}</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mt-2">{insight.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-500">Уверенность:</span>
                          <span className="font-bold text-slate-900">{insight.confidence}%</span>
                        </div>
                        <div className="w-20 h-2 bg-slate-200 rounded-full mt-1">
                          <div 
                            className={`h-2 rounded-full ${getConfidenceColor(insight.confidence)}`}
                            style={{ width: `${insight.confidence}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm font-medium text-purple-800">Гипотеза:</p>
                      <p className="text-sm text-slate-700 mt-1">{insight.hypothesis}</p>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-green-800 mb-2">Подтверждающие факты:</p>
                        <ul className="space-y-2">
                          {insight.supportingEvidence.map((evidence, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              {evidence}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-red-800 mb-2">Противоречивые факты:</p>
                        <ul className="space-y-2">
                          {insight.contradictingEvidence.map((evidence, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                              {evidence}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm font-medium text-slate-700 mb-2">Рекомендуемые действия:</p>
                      <div className="flex flex-wrap gap-2">
                        {insight.recommendedActions.map((action, i) => (
                          <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-sm text-slate-700">
                            <ArrowRight className="w-4 h-4" />
                            {action}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                      <span>Основано на {insight.basedOnSources.length} источниках</span>
                      <span>{new Date(insight.timestamp).toLocaleString('ru-RU')}</span>
                    </div>
                    
                    {insight.humanReviewRequired && (
                      <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-amber-600" />
                          <span className="text-sm font-medium text-amber-800">
                            Требуется проверка аналитика
                          </span>
                        </div>
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