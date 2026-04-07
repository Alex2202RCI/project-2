'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Globe,
  Shield,
  Truck,
  DollarSign,
  Bell,
  FolderKanban,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from 'lucide-react';
import {
  countryRiskSnapshot,
  riskAlerts,
  projectExposures,
  aiInsights,
  getRiskLevelColor,
  getVerificationStatusColor,
} from '@/mock-data/myanmar-intelligence';
import { useAppStore } from '@/store/useAppStore';
import { InteractiveMyanmarMap } from '@/components/custom/InteractiveMyanmarMap';
import Link from 'next/link';

export default function MyanmarOverviewPage() {
  const { projects, mapPoints } = useAppStore();
  const snapshot = countryRiskSnapshot;

  const affectedProjects = projects.filter(p => 
    projectExposures.some(pe => pe.projectId === p.id)
  );

  const criticalAlerts = riskAlerts.filter(a => a.severity === 'Критический' || a.severity === 'Высокий');
  const pendingInsights = aiInsights.filter(i => i.reviewStatus === 'Ожидает');

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <Link href="/analytics" className="hover:text-slate-700">Аналитика</Link>
          <span>/</span>
          <span className="text-slate-900">Мониторинг Мьянмы</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Политико-экономический мониторинг</h1>
        <p className="text-slate-600 mt-1">
          Республика Союз Мьянма — Executive Intelligence Dashboard
        </p>
      </div>

      {/* Статус и сводка */}
      <Card className="border-l-4 border-l-orange-500">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge className={getRiskLevelColor(snapshot.overallRisk)}>
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Уровень риска: {snapshot.overallRisk}
                </Badge>
                <span className="text-sm text-slate-500">
                  Обновлено: {new Date(snapshot.lastUpdate).toLocaleString('ru-RU')}
                </span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                {snapshot.analystSummary}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Что изменилось за 7 дней */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Что изменилось за 7 дней
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {snapshot.weeklyChanges.map((change, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    change.significance === 'high' ? 'bg-red-500' :
                    change.significance === 'medium' ? 'bg-amber-500' : 'bg-slate-400'
                  }`} />
                  <span className="text-sm font-medium text-slate-900">{change.indicator}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-500">{change.previousValue}</span>
                  <span className={`flex items-center gap-1 text-sm font-medium ${
                    change.trend === 'up' 
                      ? (change.indicator.includes('риск') || change.indicator.includes('конфликт') ? 'text-red-600' : 'text-green-600')
                      : change.trend === 'down'
                        ? (change.indicator.includes('риск') || change.indicator.includes('конфликт') ? 'text-green-600' : 'text-red-600')
                        : 'text-slate-600'
                  }`}>
                    {change.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : 
                     change.trend === 'down' ? <TrendingDown className="w-4 h-4" /> : null}
                    {change.currentValue}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {change.change > 0 ? '+' : ''}{change.change}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Интерактивная карта */}
      <InteractiveMyanmarMap points={mapPoints} />

      {/* Ключевые сигналы недели */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Ключевые сигналы недели
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {snapshot.keySignals.map((signal) => (
              <div key={signal.id} className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getRiskLevelColor(signal.severity)}>
                      {signal.severity}
                    </Badge>
                    {signal.verified && (
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Подтверждено
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date(signal.timestamp).toLocaleString('ru-RU')}
                  </span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">{signal.title}</h4>
                <p className="text-sm text-slate-600 mb-2">{signal.description}</p>
                <p className="text-xs text-slate-500">Источник: {signal.source}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* KPI карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Политическая стабильность</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{snapshot.politicalStability}</p>
                <p className="text-xs text-slate-500 mt-1">из 100</p>
              </div>
              <div className="rounded-full p-3 bg-red-100">
                <Globe className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Интенсивность конфликтов</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{snapshot.conflictIntensity}</p>
                <p className="text-xs text-slate-500 mt-1">из 100</p>
              </div>
              <div className="rounded-full p-3 bg-orange-100">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Операционная доступность</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{snapshot.operationalAccessibility}</p>
                <p className="text-xs text-slate-500 mt-1">из 100</p>
              </div>
              <div className="rounded-full p-3 bg-amber-100">
                <Truck className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Валютно-макроэкономический риск</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{snapshot.currencyMacroRisk}</p>
                <p className="text-xs text-slate-500 mt-1">из 100</p>
              </div>
              <div className="rounded-full p-3 bg-red-100">
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-3 bg-red-100">
                <Bell className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{snapshot.openAlerts}</p>
                <p className="text-sm text-slate-600">Открытых алертов</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-3 bg-orange-100">
                <FolderKanban className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{snapshot.affectedProjects}</p>
                <p className="text-sm text-slate-600">Проектов под воздействием</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-3 bg-amber-100">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{pendingInsights.length}</p>
                <p className="text-sm text-slate-600">AI-инсайтов на проверке</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Критические алерты */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Критические алерты
            </CardTitle>
            <Link href="/analytics/myanmar/risks">
              <Button variant="outline" size="sm">
                Все алерты
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {criticalAlerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <Badge className={getRiskLevelColor(alert.severity)}>
                    {alert.severity}
                  </Badge>
                  <div className="flex items-center gap-2">
                    {alert.acknowledged ? (
                      <Badge variant="outline" className="text-green-600">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Принято
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-amber-600">
                        <Clock className="w-3 h-3 mr-1" />
                        Ожидает
                      </Badge>
                    )}
                  </div>
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">{alert.title}</h4>
                <p className="text-sm text-slate-600 mb-2">{alert.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>Регион: {alert.region}</span>
                  <span>•</span>
                  <span>Проектов: {alert.affectedProjects.length}</span>
                  <span>•</span>
                  <span>{new Date(alert.timestamp).toLocaleDateString('ru-RU')}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Проекты под воздействием */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FolderKanban className="w-5 h-5" />
              Проекты под воздействием
            </CardTitle>
            <Link href="/analytics/myanmar/risks">
              <Button variant="outline" size="sm">
                Все проекты
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {projectExposures.slice(0, 4).map((exposure) => {
              const project = projects.find(p => p.id === exposure.projectId);
              return (
                <div key={exposure.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-900">{exposure.projectName}</h4>
                        <span className="text-sm text-slate-500">{exposure.projectCode}</span>
                      </div>
                      <p className="text-sm text-slate-600">{exposure.region} • {exposure.industry}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900">{exposure.currentRiskScore}</div>
                      <div className={`text-sm font-medium ${
                        exposure.riskChange7d > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {exposure.riskChange7d > 0 ? '+' : ''}{exposure.riskChange7d} за 7д
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {exposure.impactTypes.map((type) => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600">{exposure.recommendedAction}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Быстрые ссылки */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/analytics/myanmar/political">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full p-3 bg-blue-100">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Политическая ситуация</h3>
                  <p className="text-sm text-slate-600">Анализ политических событий</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/analytics/myanmar/economic">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full p-3 bg-green-100">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Экономика</h3>
                  <p className="text-sm text-slate-600">Макроэкономические индикаторы</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/analytics/myanmar/sources">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full p-3 bg-purple-100">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Источники и верификация</h3>
                  <p className="text-sm text-slate-600">Качество данных</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Дисклеймер */}
      <div className="text-sm text-slate-500 bg-slate-50 p-4 rounded-lg border border-slate-200">
        <strong>Дисклеймер:</strong> Данные аналитики основаны на открытых источниках и внутренних оценках. 
        AI-рекомендации носят информационный характер. Финальные решения принимаются руководством.
      </div>
    </div>
  );
}