'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Shield, 
  Leaf, 
  DollarSign, 
  Activity, 
  Award,
  Drill,
  Truck,
  Settings,
  CheckCircle,
  AlertTriangle,
  Clock,
  MapPin,
  BarChart3,
  Zap
} from 'lucide-react';
import { miningSites } from '@/mock-data/mining-sites';
import { MiningCrossSection } from '@/components/custom/MiningCrossSection';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const stageLabels: Record<string, string> = {
  exploration: 'Геологоразведка',
  drilling: 'Бурение',
  evaluation: 'Оценка',
  extraction: 'Добыча',
  processing: 'Переработка',
};

const stageColors: Record<string, string> = {
  exploration: 'bg-blue-500',
  drilling: 'bg-cyan-500',
  evaluation: 'bg-yellow-500',
  extraction: 'bg-orange-500',
  processing: 'bg-green-500',
};

const mineralColors: Record<string, string> = {
  gold: '#FFD700',
  antimony: '#C0C0C0',
  beryllium: '#90EE90',
  tantalum: '#4169E1',
  associated: '#FFA500',
};

const mineralLabels: Record<string, string> = {
  gold: 'Золото',
  antimony: 'Сурьма',
  beryllium: 'Бериллий',
  tantalum: 'Тантал',
  associated: 'Попутные',
};

const statusIcons: Record<string, any> = {
  active: { icon: CheckCircle, color: 'text-green-600', label: 'Активно' },
  maintenance: { icon: Settings, color: 'text-yellow-600', label: 'Обслуживание' },
  standby: { icon: Clock, color: 'text-gray-600', label: 'Резерв' },
  broken: { icon: AlertTriangle, color: 'text-red-600', label: 'Сломано' },
};

const roleLabels: Record<string, string> = {
  chief_engineer: 'Главный инженер',
  geologist: 'Геолог',
  driller: 'Бурильщик',
  miner: 'Горняк',
  metallurgist: 'Металлург',
};

export default function MiningPage() {
  const [selectedSite, setSelectedSite] = useState<string>(miningSites[0].id);
  const site = miningSites.find((s) => s.id === selectedSite) || miningSites[0];

  const pieData = site.minerals.map((m) => ({
    name: mineralLabels[m.type] || m.name,
    value: m.reserves,
    color: mineralColors[m.type] || '#8884d8',
  }));

  const stageProgressData = Object.entries(site.stagesProgress).map(([key, value]) => ({
    stage: stageLabels[key] || key,
    progress: value,
  }));

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Геологоразведка и добыча
          </h1>
          <p className="text-slate-600 mt-1 text-lg">
            Управление проектами геологоразведки и добычи полезных ископаемых
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {miningSites.length} активных участка
        </Badge>
      </div>

      {/* Общие метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Общие запасы</p>
                <p className="text-3xl font-bold text-blue-900 mt-1">
                  {(miningSites.reduce((sum, s) => sum + s.metrics.totalReserves, 0) / 1000000).toFixed(1)}M
                </p>
                <p className="text-sm text-slate-500 mt-1">унций Au экв.</p>
              </div>
              <BarChart3 className="w-12 h-12 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Добыча (средняя)</p>
                <p className="text-3xl font-bold text-green-900 mt-1">
                  {miningSites.reduce((sum, s) => sum + s.metrics.dailyProduction, 0).toLocaleString()}
                </p>
                <p className="text-sm text-slate-500 mt-1">тонн/день</p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Средний коэф. извлечения</p>
                <p className="text-3xl font-bold text-purple-900 mt-1">
                  {(miningSites.reduce((sum, s) => sum + s.metrics.recoveryRate, 0) / miningSites.length).toFixed(1)}%
                </p>
                <p className="text-sm text-slate-500 mt-1">эффективность</p>
              </div>
              <Activity className="w-12 h-12 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">NPV (чистый дисконтир. доход)</p>
                <p className="text-3xl font-bold text-orange-900 mt-1">
                  ${miningSites.reduce((sum, s) => sum + s.metrics.netPresentValue, 0).toFixed(0)}M
                </p>
                <p className="text-sm text-slate-500 mt-1">миллионов $</p>
              </div>
              <DollarSign className="w-12 h-12 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Выбор участка и детальная информация */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Участки добычи</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {miningSites.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSite(s.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedSite === s.id
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900">{s.name}</h3>
                  <Badge variant={s.currentStage === 'extraction' ? 'default' : 'secondary'}>
                    {stageLabels[s.currentStage]}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-2">{s.code} • {s.location.region}</p>
                <div className="flex flex-wrap gap-1">
                  {s.minerals.slice(0, 3).map((m) => (
                    <Badge key={m.type} variant="outline" className="text-xs">
                      {mineralLabels[m.type]}
                    </Badge>
                  ))}
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Прогресс</span>
                    <span>{s.stagesProgress[s.currentStage]}%</span>
                  </div>
                  <Progress value={s.stagesProgress[s.currentStage]} className="h-2" />
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <Card className="border-2 border-slate-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{site.name}</CardTitle>
                  <p className="text-slate-600 mt-1">{site.code} • {site.location.region}</p>
                </div>
                <div className="text-right">
                  <Badge className={`${stageColors[site.currentStage]} text-white text-lg px-4 py-2`}>
                    {stageLabels[site.currentStage]}
                  </Badge>
                  <p className="text-sm text-slate-500 mt-2">
                    Глубина: {site.location.depth} м
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="overview">Обзор</TabsTrigger>
                  <TabsTrigger value="minerals">Минералы</TabsTrigger>
                  <TabsTrigger value="equipment">Оборудование</TabsTrigger>
                  <TabsTrigger value="geology">Геология</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Запасы (Au экв.)', value: `${(site.metrics.totalReserves / 1000).toFixed(0)}K унций`, icon: BarChart3 },
                      { label: 'Добыча', value: `${site.metrics.dailyProduction} т/д`, icon: TrendingUp },
                      { label: 'Содержание (сред.)', value: `${site.metrics.gradeAverage} г/т`, icon: Activity },
                      { label: 'Коэф. извлечения', value: `${site.metrics.recoveryRate}%`, icon: Zap },
                      { label: 'Коэф. вскрыши', value: `${site.metrics.stripRatio}`, icon: MapPin },
                      { label: 'Стоимость тонны', value: `$${site.metrics.costPerTon}`, icon: DollarSign },
                      { label: 'IRR (доходность)', value: `${site.metrics.internalRateOfReturn}%`, icon: TrendingUp },
                      { label: 'Окупаемость', value: `${site.metrics.paybackPeriod} мес.`, icon: Clock },
                    ].map((metric, idx) => {
                      const { icon: Icon, label, value } = metric;
                      return (
                        <Card key={idx} className="bg-slate-50">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Icon className="w-5 h-5 text-slate-600" />
                              <span className="text-sm text-slate-600">{label}</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900">{value}</p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Прогресс по стадиям</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {stageProgressData.map((stage) => (
                          <div key={stage.stage}>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium text-slate-700">{stage.stage}</span>
                              <span className="text-sm font-bold text-slate-900">{stage.progress}%</span>
                            </div>
                            <Progress value={stage.progress} className="h-3" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Shield className="w-6 h-6 text-green-600" />
                          <span className="font-semibold text-green-900">Индекс безопасности</span>
                        </div>
                        <p className="text-4xl font-bold text-green-900">{site.metrics.safetyIndex}</p>
                        <Progress value={site.metrics.safetyIndex} className="mt-3 h-3 bg-green-200" />
                      </CardContent>
                    </Card>
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Leaf className="w-6 h-6 text-blue-600" />
                          <span className="font-semibold text-blue-900">Экологический комплаенс</span>
                        </div>
                        <p className="text-4xl font-bold text-blue-900">{site.metrics.environmentalCompliance}%</p>
                        <Progress value={site.metrics.environmentalCompliance} className="mt-3 h-3 bg-blue-200" />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="minerals" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Распределение запасов</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={(entry) => `${entry.name} (${entry.value.toLocaleString()} т)`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Детализация минералов</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {site.minerals.map((mineral) => (
                            <div key={mineral.type} className="p-4 border border-slate-200 rounded-lg">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: mineralColors[mineral.type] }}
                                  />
                                  <h4 className="font-semibold text-slate-900">{mineral.name}</h4>
                                </div>
                                <Badge variant="outline">
                                  {mineral.confidence === 'measured' ? 'Измерено' :
                                   mineral.confidence === 'indicated' ? 'Указано' : 'Предположено'}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                  <span className="text-slate-600">Содержание:</span>
                                  <span className="ml-2 font-bold">{mineral.grade} {mineral.type === 'antimony' ? '%' : 'г/т'}</span>
                                </div>
                                <div>
                                  <span className="text-slate-600">Запасы:</span>
                                  <span className="ml-2 font-bold">{mineral.reserves.toLocaleString()} т</span>
                                </div>
                                <div>
                                  <span className="text-slate-600">Извлечение:</span>
                                  <span className="ml-2 font-bold">{mineral.extractionRate}%</span>
                                </div>
                                <div>
                                  <span className="text-slate-600">Цена:</span>
                                  <span className="ml-2 font-bold">${mineral.marketPrice.toLocaleString()}/т</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Стоимость запасов по типам минералов</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={site.minerals.map(m => ({
                          name: m.name,
                          'Стоимость ($M)': (m.reserves * m.marketPrice) / 1000000,
                          'Запасы (т)': m.reserves,
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Legend />
                          <Bar yAxisId="left" dataKey="Стоимость ($M)" fill="#8884d8" />
                          <Bar yAxisId="right" dataKey="Запасы (т)" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="equipment" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {site.equipment.map((eq) => {
                      const status = statusIcons[eq.status];
                      const StatusIcon = status.icon;
                      return (
                        <Card key={eq.id} className="border-2 border-slate-200">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-semibold text-slate-900">{eq.name}</h4>
                                <p className="text-sm text-slate-600">Часов наработки: {eq.hoursOperated.toLocaleString()}</p>
                              </div>
                              <Badge className={`${status.color} bg-transparent border`}>
                                <StatusIcon className="w-4 h-4 mr-1" />
                                {status.label}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-slate-600">Эффективность</span>
                                  <span className="font-bold">{eq.efficiency}%</span>
                                </div>
                                <Progress value={eq.efficiency} className="h-2" />
                              </div>
                              <p className="text-sm text-slate-600">
                                Следующее ТО: {new Date(eq.nextMaintenance).toLocaleDateString('ru-RU')}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>

                <TabsContent value="geology" className="space-y-6">
                  <MiningCrossSection 
                    drillHoles={site.geologyData.drillHoles}
                    minerals={site.minerals}
                    depth={site.location.depth || 450}
                    siteName={site.name}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Геологические данные</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm text-slate-600">Тип породы:</span>
                            <p className="font-semibold text-slate-900">{site.geologyData.rockType}</p>
                          </div>
                          <div>
                            <span className="text-sm text-slate-600">Возраст:</span>
                            <p className="font-semibold text-slate-900">{site.geologyData.age}</p>
                          </div>
                          <div>
                            <span className="text-sm text-slate-600">Структура:</span>
                            <p className="font-semibold text-slate-900">{site.geologyData.structure}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Скважины ({site.geologyData.drillHoles.length})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {site.geologyData.drillHoles.map((hole) => (
                            <div key={hole.id} className="p-3 border border-slate-200 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-slate-900">{hole.name}</h4>
                                <Badge variant={hole.status === 'completed' ? 'default' : hole.status === 'drilling' ? 'destructive' : 'secondary'}>
                                  {hole.status === 'completed' ? 'Завершена' :
                                   hole.status === 'drilling' ? 'Бурение' : 'Запланирована'}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-600 mb-2">Глубина: {hole.depth} м</p>
                              <div className="space-y-1">
                                {hole.minerals.map((m, idx) => (
                                  <div key={idx} className="flex justify-between text-sm">
                                    <span className="text-slate-600">{m.mineral}:</span>
                                    <span className="font-medium">{m.grade} г/т ({m.depthFrom}-{m.depthTo} м)</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>График содержания по глубине (Скважина №1)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={
                          site.geologyData.drillHoles[0]?.minerals.map(m => ({
                            depth: `${(m.depthFrom + m.depthTo) / 2} м`,
                            grade: m.grade,
                            mineral: m.mineral,
                          })) || []
                        }>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="depth" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="grade" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </TabsContent>

              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Команда участка</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {site.team.map((member) => (
              <Card key={member.id} className="bg-slate-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{member.name}</h4>
                      <p className="text-sm text-slate-600">{roleLabels[member.role]}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Опыт:</span>
                      <span className="font-bold">{member.experience} лет</span>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Производительность:</span>
                        <span className="font-bold">{member.performance}%</span>
                      </div>
                      <Progress value={member.performance} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}