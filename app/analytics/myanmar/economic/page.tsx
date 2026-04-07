'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ArrowUpDown, 
  Factory, 
  Warehouse, 
  Globe, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Briefcase 
} from 'lucide-react';
import { 
  economicIndicators, 
  projectExposures, 
  getVerificationStatusColor 
} from '@/mock-data/myanmar-intelligence';
import { useAppStore } from '@/store/useAppStore';
import Link from 'next/link';

export default function EconomicPage() {
  const store = useAppStore();
  // Find role for current user
  const userRole = store.currentUser 
    ? store.roles.find(r => r.id === store.currentUser?.roleId) 
    : null;
  // Simple role check for analytics access
  const hasAccess = userRole && userRole.permissions.analytics !== 'none';
  if (!hasAccess) {
    return <div className="flex items-center justify-center p-8 bg-gray-50 text-gray-600">
      <h3>Доступ запрещен</h3>
      <p>Для просмотра этого дашборда требуется минимальные разрешения 'read' в аналитике.</p>
    </div>;
  }

  const indicators = economicIndicators;

  // Группировка по категориям
  const currencyIndicators = indicators.filter(i => i.type === 'Курс валюты');
  const inflationIndicators = indicators.filter(i => i.type === 'Инфляция');
  const gdpIndicators = indicators.filter(i => i.type === 'ВВП');
  const tradeIndicators = indicators.filter(i => i.type === 'Торговый баланс');
  const resourceIndicators = indicators.filter(i => i.type === 'Добыча ресурсов');
  const investmentIndicators = indicators.filter(i => i.type === 'Инвестиции');

  // Проекты с макроэкономическим влиянием
  const macroProjects = projectExposures.filter(p => 
    p.impactTypes.includes('Макроэкономический')
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
          <span className="text-slate-900">Экономика</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Экономика</h1>
        <p className="text-slate-600 mt-1">
          Макроэкономические показатели, валютный рынок и инвестиционный климат
        </p>
      </div>

      {/* Ключевые индикаторы */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Курс валюты */}
        {currencyIndicators.map((indicator) => (
          <Card key={indicator.id} className="border-l-4 border-l-red-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{indicator.name}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">
                    {indicator.value.toLocaleString('ru-RU')}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{indicator.unit}</p>
                </div>
                <div className="rounded-full p-3 bg-red-100">
                  <DollarSign className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className={`flex items-center text-sm font-medium ${
                  indicator.changePercent > 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {indicator.changePercent > 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {indicator.changePercent > 0 ? '+' : ''}{indicator.changePercent.toFixed(1)}%
                </span>
                <span className="text-xs text-slate-500">за неделю</span>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Инфляция */}
        {inflationIndicators.map((indicator) => (
          <Card key={indicator.id} className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{indicator.name}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">
                    {indicator.value.toFixed(1)}%
                  </p>
                  <p className="text-xs text-slate-500 mt-1">годовых</p>
                </div>
                <div className="rounded-full p-3 bg-orange-100">
                  <ArrowUpDown className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-sm text-slate-500">Прогноз:</span>
                <span className="text-sm font-medium text-red-600">до {indicator.forecast}%</span>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* ВВП */}
        {gdpIndicators.map((indicator) => (
          <Card key={indicator.id} className="border-l-4 border-l-amber-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Рост ВВП</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">
                    {indicator.value.toFixed(1)}%
                  </p>
                  <p className="text-xs text-slate-500 mt-1">год к году</p>
                </div>
                <div className="rounded-full p-3 bg-amber-100">
                  <TrendingUp className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-sm text-slate-500">Было:</span>
                <span className="text-sm font-medium text-slate-700">{indicator.previousValue}%</span>
                <span className="text-xs text-red-600">↓</span>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Инвестиции */}
        {investmentIndicators.map((indicator) => (
          <Card key={indicator.id} className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Прямые иностранные инвестиции</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">
                    ${indicator.value.toFixed(1)}B
                  </p>
                  <p className="text-xs text-slate-500 mt-1">млрд USD</p>
                </div>
                <div className="rounded-full p-3 bg-blue-100">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className={`flex items-center text-sm font-medium ${
                  indicator.changePercent > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {indicator.changePercent > 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {indicator.changePercent > 0 ? '+' : ''}{indicator.changePercent.toFixed(0)}%
                </span>
                <span className="text-xs text-slate-500">к прошлому году</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Детализация показателей */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Все индикаторы */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Экономические индикаторы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {indicators.map((indicator) => (
                <div key={indicator.id} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-slate-900">{indicator.name}</h4>
                      <p className="text-sm text-slate-500">{indicator.type}</p>
                    </div>
                    <Badge className={getVerificationStatusColor(indicator.verificationStatus)}>
                      {indicator.verificationStatus}
                    </Badge>
                  </div>
                  <div className="flex items-end justify-between mt-2">
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {indicator.type === 'Курс валюты' 
                          ? indicator.value.toLocaleString('ru-RU')
                          : indicator.type === 'Добыча ресурсов'
                            ? indicator.value.toLocaleString('ru-RU')
                            : `${indicator.value.toFixed(1)}`
                        }
                        <span className="text-sm font-normal text-slate-500 ml-1">{indicator.unit}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center text-sm font-medium ${
                        indicator.changePercent > 0 && (indicator.type === 'Курс валюты' || indicator.type === 'Инфляция' || indicator.type === 'Торговый баланс')
                          ? 'text-red-600' 
                          : indicator.changePercent > 0
                            ? 'text-green-600'
                            : 'text-red-600'
                      }`}>
                        {indicator.changePercent > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span className="ml-1">{Math.abs(indicator.changePercent).toFixed(1)}%</span>
                      </span>
                      {indicator.forecast && (
                        <p className="text-xs text-slate-500 mt-1">Прогноз: {indicator.forecast.toLocaleString('ru-RU')}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Влияние на проекты */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Влияние на проекты
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {macroProjects.map((exposure) => (
                <div key={exposure.id} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-slate-900">{exposure.projectName}</h4>
                      <p className="text-sm text-slate-500">{exposure.projectCode}</p>
                    </div>
                    <Badge variant="outline">{exposure.region}</Badge>
                  </div>
                  <p className="text-sm text-slate-700 mt-2">{exposure.recommendedAction}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Тепловая карта рисков */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Тепловая карта экономических рисков по регионам
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[

              { region: 'Штат Шан', risk: 82, factor: 'Конфликт + логистика', color: 'bg-red-500' },
              { region: 'Штат Ракхайн', risk: 75, factor: 'Политическая нестабильность', color: 'bg-red-400' },
              { region: 'Янгон', risk: 55, factor: 'Валютный риск', color: 'bg-amber-500' },
              { region: 'Мандалай', risk: 65, factor: 'Логистика + безопасность', color: 'bg-amber-600' },
              { region: 'Нейпьидо', risk: 48, factor: 'Регуляторный риск', color: 'bg-yellow-500' },
              { region: 'Прибрежные регионы', risk: 58, factor: 'Логистика', color: 'bg-amber-500' },
            ].map((item) => (
              <div key={item.region} className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-900">{item.region}</span>
                  <span className={`px-2 py-1 rounded text-white text-sm font-medium ${item.color}`}>
                    {item.risk}%
                  </span>
                </div>
                <p className="text-sm text-slate-600">{item.factor}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}