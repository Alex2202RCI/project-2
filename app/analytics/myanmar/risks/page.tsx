'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  MapPin,
  User,
  Eye,
  Bell,
} from 'lucide-react';
import {
  projectExposures,
  riskAlerts,
  getRiskLevelColor,
} from '@/mock-data/myanmar-intelligence';
import Link from 'next/link';

export default function RisksPage() {
  // Группировка рисков по уровням
  const criticalAlerts = riskAlerts.filter(a => a.severity === 'Критический');
  const highAlerts = riskAlerts.filter(a => a.severity === 'Высокий');
  const mediumAlerts = riskAlerts.filter(a => a.severity === 'Средний');
  const lowAlerts = riskAlerts.filter(a => a.severity === 'Низкий');

  // Группировка проектов по уровню риска
  const highRiskProjects = projectExposures.filter(p => p.currentRiskScore >= 70);
  const mediumRiskProjects = projectExposures.filter(p => p.currentRiskScore >= 50 && p.currentRiskScore < 70);
  const lowRiskProjects = projectExposures.filter(p => p.currentRiskScore < 50);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Критический':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'Высокий':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'Средний':
        return <Info className="w-5 h-5 text-amber-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-green-600';
  };

  const getRiskBarColor = (score: number) => {
    if (score >= 70) return 'bg-red-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-green-500';
  };

  const getDecisionStatusIcon = (status: string) => {
    switch (status) {
      case 'Подтверждено':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Отклонено':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'На пересмотре':
        return <Clock className="w-4 h-4 text-amber-600" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
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
          <span className="text-slate-900">Риски</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Риски по проектам</h1>
        <p className="text-slate-600 mt-1">
          Активные риски, их влияние на проекты и статус решений
        </p>
      </div>

      {/* Сводка по рискам */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Критические</p>
                <p className="text-3xl font-bold text-red-600 mt-1">{criticalAlerts.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Высокие</p>
                <p className="text-3xl font-bold text-orange-600 mt-1">{highAlerts.length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Средние</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">{mediumAlerts.length}</p>
              </div>
              <Info className="w-8 h-8 text-amber-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Низкие</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{lowAlerts.length}</p>
              </div>
              <Shield className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Риск-алерты */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Активные риск-алерты
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`p-4 rounded-lg border-l-4 ${
                  alert.severity === 'Критический' ? 'border-l-red-500 bg-red-50' :
                  alert.severity === 'Высокий' ? 'border-l-orange-500 bg-orange-50' :
                  alert.severity === 'Средний' ? 'border-l-amber-500 bg-amber-50' :
                  'border-l-blue-500 bg-blue-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  {getSeverityIcon(alert.severity)}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-900">{alert.title}</h4>
                        <p className="text-sm text-slate-600 mt-1">{alert.description}</p>
                      </div>
                      <Badge className={getRiskLevelColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {alert.region}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bell className="w-4 h-4" />
                        Уровень эскалации: {alert.escalationLevel}/5
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(alert.timestamp).toLocaleDateString('ru-RU')}
                      </span>
                      {alert.acknowledged ? (
                        <span className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          Подтверждено
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-amber-600">
                          <Eye className="w-4 h-4" />
                          Требует подтверждения
                        </span>
                      )}
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-slate-500">Затронутые проекты: </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {alert.affectedProjects.map((projectId) => (
                          <Badge key={projectId} variant="outline">{projectId}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Проекты по уровню риска */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Воздействие на проекты
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Высокий риск */}
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Высокий риск ({highRiskProjects.length})
              </h3>
              <div className="space-y-3">
                {highRiskProjects.map((exposure) => (
                  <div key={exposure.id} className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-slate-900">{exposure.projectName}</h4>
                          <Badge variant="outline">{exposure.projectCode}</Badge>
                          <Badge variant="outline">{exposure.region}</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mt-1">
                          Отрасли: {exposure.industry}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${getRiskScoreColor(exposure.currentRiskScore)}`}>
                          {exposure.currentRiskScore}
                        </p>
                        <p className="text-xs text-slate-500">текущий риск</p>
                      </div>
                    </div>
                    
                    {/* Шкала риска */}
                    <div className="mt-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-500">7 дней:</span>
                        <span className={exposure.riskChange7d > 0 ? 'text-red-600' : 'text-green-600'}>
                          {exposure.riskChange7d > 0 ? '+' : ''}{exposure.riskChange7d}
                        </span>
                        <span className="text-slate-400">|</span>
                        <span className="text-slate-500">30 дней:</span>
                        <span className={exposure.riskChange30d > 0 ? 'text-red-600' : 'text-green-600'}>
                          {exposure.riskChange30d > 0 ? '+' : ''}{exposure.riskChange30d}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full mt-1">
                        <div 
                          className={`h-2 rounded-full ${getRiskBarColor(exposure.currentRiskScore)}`}
                          style={{ width: `${exposure.currentRiskScore}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {exposure.impactTypes.map((type) => (
                        <Badge key={type} variant="secondary">{type}</Badge>
                      ))}
                    </div>
                    
                    <div className="mt-3 p-3 bg-white rounded border border-red-100">
                      <p className="text-sm font-medium text-red-800">Рекомендуемое действие:</p>
                      <p className="text-sm text-slate-700 mt-1">{exposure.recommendedAction}</p>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getDecisionStatusIcon(exposure.decisionStatus)}
                        <span className="text-sm text-slate-600">{exposure.decisionStatus}</span>
                        {exposure.decisionOwner && (
                          <span className="text-sm text-slate-400">• {exposure.decisionOwner}</span>
                        )}
                      </div>
                      <span className="text-sm text-slate-400">
                        Обновлено: {exposure.lastReviewDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Средний риск */}
            <div>
              <h3 className="text-lg font-semibold text-amber-600 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Средний риск ({mediumRiskProjects.length})
              </h3>
              <div className="space-y-3">
                {mediumRiskProjects.map((exposure) => (
                  <div key={exposure.id} className="p-4 border border-amber-200 rounded-lg bg-amber-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-slate-900">{exposure.projectName}</h4>
                          <Badge variant="outline">{exposure.projectCode}</Badge>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">{exposure.region} • {exposure.industry}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${getRiskScoreColor(exposure.currentRiskScore)}`}>
                          {exposure.currentRiskScore}
                        </p>
                        <div className="w-24 h-2 bg-slate-200 rounded-full mt-1">
                          <div 
                            className={`h-2 rounded-full ${getRiskBarColor(exposure.currentRiskScore)}`}
                            style={{ width: `${exposure.currentRiskScore}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">{exposure.recommendedAction}</p>
                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                      {getDecisionStatusIcon(exposure.decisionStatus)}
                      <span>{exposure.decisionStatus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Низкий риск */}
            {lowRiskProjects.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Низкий риск ({lowRiskProjects.length})
                </h3>
                <div className="space-y-3">
                  {lowRiskProjects.map((exposure) => (
                    <div key={exposure.id} className="p-4 border border-green-200 rounded-lg bg-green-50">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-900">{exposure.projectName}</h4>
                          <p className="text-sm text-slate-500">{exposure.region} • {exposure.industry}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${getRiskScoreColor(exposure.currentRiskScore)}`}>
                            {exposure.currentRiskScore}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}