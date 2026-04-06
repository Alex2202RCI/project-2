'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Globe,
  Shield,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  MapPin,
  FileText,
  Lightbulb,
  AlertCircle,
} from 'lucide-react';
import {
  politicalEvents,
  countryRiskSnapshot,
  aiInsights,
  getRiskLevelColor,
  getVerificationStatusColor,
  getTagColor,
} from '@/mock-data/myanmar-intelligence';
import Link from 'next/link';

export default function PoliticalSituationPage() {
  const events = politicalEvents;
  const snapshot = countryRiskSnapshot;

  const confirmedEvents = events.filter(e => e.verificationStatus === 'Подтверждено');
  const disputedEvents = events.filter(e => e.verificationStatus === 'Частично подтверждено' || e.verificationStatus === 'Требует верификации');
  
  const politicalInsights = aiInsights.filter(i => 
    i.category === 'Политическая ситуация' || i.category === 'Региональный анализ'
  );

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <Link href="/analytics" className="hover:text-slate-700">Аналитика</Link>
          <span>/</span>
          <Link href="/analytics/myanmar" className="hover:text-slate-700">Мониторинг Мьянмы</Link>
          <span>/</span>
          <span className="text-slate-900">Политическая ситуация</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Политическая ситуация</h1>
        <p className="text-slate-600 mt-1">
          Анализ политических событий, конфликтов и governance в Мьянме
        </p>
      </div>

      {/* Статус центральной власти */}
      <Card className="border-l-4 border-l-red-500">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-full p-3 bg-red-100">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-lg font-semibold text-slate-900">Статус центральной власти</h2>
                <Badge className={getRiskLevelColor(snapshot.overallRisk)}>
                  Риск: {snapshot.overallRisk}
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <p className="text-sm text-slate-600">Политическая стабильность</p>
                  <p className="text-2xl font-bold text-slate-900">{snapshot.politicalStability}/100</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Интенсивность конфликтов</p>
                  <p className="text-2xl font-bold text-red-600">{snapshot.conflictIntensity}/100</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Операционная доступность</p>
                  <p className="text-2xl font-bold text-amber-600">{snapshot.operationalAccessibility}/100</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Логистический риск</p>
                  <p className="text-2xl font-bold text-slate-900">{snapshot.logisticalRisk}/100</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs для контента */}
      <Tabs defaultValue="events" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
          <TabsTrigger value="events">События</TabsTrigger>
          <TabsTrigger value="analysis">AI-анализ</TabsTrigger>
          <TabsTrigger value="facts">Подтверждённые факты</TabsTrigger>
          <TabsTrigger value="disputed">Требуют проверки</TabsTrigger>
        </TabsList>

        {/* События */}
        <TabsContent value="events" className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-slate-600">Всего событий: {events.length}</span>
            <Badge variant="outline" className="text-green-600">{confirmedEvents.length} подтверждено</Badge>
            <Badge variant="outline" className="text-amber-600">{disputedEvents.length} требует проверки</Badge>
          </div>

          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="font-normal">
                        {event.type}
                      </Badge>
                      <Badge className={getRiskLevelColor(event.impact)}>
                        {event.impact}
                      </Badge>
                      <Badge className={getVerificationStatusColor(event.verificationStatus)}>
                        {event.verificationStatus}
                      </Badge>
                    </div>
                    <span className="text-sm text-slate-500">
                      {new Date(event.timestamp).toLocaleString('ru-RU')}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{event.title}</h3>
                  <p className="text-slate-600 mb-4">{event.description}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">{event.region}</span>
                    <span className="text-slate-300">|</span>
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">
                      {event.actors.join(', ')}
                    </span>
                  </div>

                  {event.aiInterpretation && (
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">AI-интерпретация</span>
                      </div>
                      <p className="text-sm text-blue-800">{event.aiInterpretation}</p>
                    </div>
                  )}

                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <details className="group">
                      <summary className="cursor-pointer text-sm text-slate-600 hover:text-slate-900">
                        Подтверждённые факты и спорные сигналы
                      </summary>
                      <div className="mt-3 space-y-2">
                        {event.confirmedFacts.length > 0 && (
                          <div className="bg-green-50 border border-green-100 rounded p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-green-900">Подтверждено</span>
                            </div>
                            <ul className="text-sm text-green-800 space-y-1">
                              {event.confirmedFacts.map((fact, i) => (
                                <li key={i}>• {fact}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {event.disputedSignals.length > 0 && (
                          <div className="bg-amber-50 border border-amber-100 rounded p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <HelpCircle className="w-4 h-4 text-amber-600" />
                              <span className="text-sm font-medium text-amber-900">Требует верификации</span>
                            </div>
                            <ul className="text-sm text-amber-800 space-y-1">
                              {event.disputedSignals.map((signal, i) => (
                                <li key={i}>• {signal}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </details>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    {event.sources.map((source) => (
                      <Badge key={source.id} variant="outline" className="text-xs" title={source.name}>
                        <span className={`w-2 h-2 rounded-full ${
                          source.reliability === 'A' ? 'bg-green-500' :
                          source.reliability === 'B' ? 'bg-blue-500' :
                          source.reliability === 'C' ? 'bg-amber-500' : 'bg-red-500'
                        } mr-1.5`} />
                        {source.type}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* AI-анализ */}
        <TabsContent value="analysis" className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              <span className="text-sm text-amber-900 font-medium">
                AI-инсайты основаны на анализе паттернов и корреляций в данных. Требуют верификации аналитиком.
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {politicalInsights.map((insight) => (
              <Card key={insight.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge className={getTagColor('Аналитика')}>Аналитика</Badge>
                      <Badge variant="outline">{insight.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600">Уверенность:</span>
                      <span className={`text-sm font-medium ${
                        insight.confidence >= 80 ? 'text-green-600' :
                        insight.confidence >= 60 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {insight.confidence}%
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{insight.title}</h3>
                  <p className="text-slate-600 mb-4">{insight.description}</p>

                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">Гипотеза</span>
                    </div>
                    <p className="text-sm text-blue-800">{insight.hypothesis}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-900">Подтверждающие доказательства</span>
                      </div>
                      <ul className="text-sm text-green-800 space-y-1">
                        {insight.supportingEvidence.map((evidence, i) => (
                          <li key={i}>• {evidence}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-900">Противоречивые данные</span>
                      </div>
                      <ul className="text-sm text-amber-800 space-y-1">
                        {insight.contradictingEvidence.map((evidence, i) => (
                          <li key={i}>• {evidence}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-900">Рекомендуемые действия</span>
                    </div>
                    <ul className="text-sm text-slate-700 space-y-1">
                      {insight.recommendedActions.map((action, i) => (
                        <li key={i}>• {action}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      {new Date(insight.timestamp).toLocaleString('ru-RU')}
                    </div>
                    {insight.humanReviewRequired && (
                      <Badge variant="outline" className={
                        insight.reviewStatus === 'Ожидает' ? 'text-amber-600' :
                        insight.reviewStatus === 'Принято' ? 'text-green-600' : 'text-red-600'
                      }>
                        {insight.reviewStatus}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Подтверждённые факты */}
        <TabsContent value="facts" className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-900">
                Подтверждённые факты — информация, верифицированная из нескольких независимых источников
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {confirmedEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">{event.type}</Badge>
                        <Badge className={`text-xs ${getRiskLevelColor(event.impact)}`}>
                          {event.impact}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-slate-900 mb-1">{event.title}</h4>
                      <p className="text-sm text-slate-600">{event.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                        <span>{event.region}</span>
                        <span>•</span>
                        <span>{new Date(event.timestamp).toLocaleDateString('ru-RU')}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Требуют проверки */}
        <TabsContent value="disputed" className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              <span className="text-sm text-amber-900">
                Сигналы, требующие дополнительной верификации из-за противоречивых данных или недостаточного числа источников
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {disputedEvents.map((event) => (
              <Card key={event.id} className="border-amber-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">{event.type}</Badge>
                        <Badge className={`text-xs ${getVerificationStatusColor(event.verificationStatus)}`}>
                          {event.verificationStatus}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-slate-900 mb-1">{event.title}</h4>
                      <p className="text-sm text-slate-600">{event.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                        <span>{event.region}</span>
                        <span>•</span>
                        <span>{new Date(event.timestamp).toLocaleDateString('ru-RU')}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Дисклеймер */}
      <div className="text-sm text-slate-500 bg-slate-50 p-4 rounded-lg border border-slate-200">
        <strong>Дисклеймер:</strong> Данные аналитики основаны на открытых источниках и внутренних оценках. 
        Информация носит информационный характер и требует дополнительной верификации.
      </div>
    </div>
  );
}