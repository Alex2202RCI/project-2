'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Globe,
  Search,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  ExternalLink,
  User,
  Shield,
  Star,
  RefreshCw,
} from 'lucide-react';
import {
  sources,
  verificationRecords,
  getVerificationStatusColor,
  getSourceReliabilityColor,
  getTagColor,
} from '@/mock-data/myanmar-intelligence';
import Link from 'next/link';

export default function SourcesPage() {
  // Группировка источников по типу
  const sourcesByType = sources.reduce((acc, source) => {
    if (!acc[source.type]) acc[source.type] = [];
    acc[source.type].push(source);
    return acc;
  }, {} as Record<string, typeof sources>);

  // Статистика по верификации
  const verifiedCount = sources.filter(s => s.verificationStatus === 'Подтверждено').length;
  const partiallyVerifiedCount = sources.filter(s => s.verificationStatus === 'Частично подтверждено').length;
  const pendingCount = sources.filter(s => s.verificationStatus === 'Требует верификации').length;
  const conflictingCount = sources.filter(s => s.verificationStatus === 'Противоречивые сигналы').length;

  // Источники по надежности
  const reliabilityStats = {
    A: sources.filter(s => s.reliability === 'A').length,
    B: sources.filter(s => s.reliability === 'B').length,
    C: sources.filter(s => s.reliability === 'C').length,
    D: sources.filter(s => s.reliability === 'D').length,
    E: sources.filter(s => s.reliability === 'E').length,
    F: sources.filter(s => s.reliability === 'F').length,
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
          <span className="text-slate-900">Источники</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Источники и верификация</h1>
        <p className="text-slate-600 mt-1">
          Управление источниками данных и проверка достоверности информации
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Всего источников</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{sources.length}</p>
              </div>
              <Globe className="w-8 h-8 text-slate-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Подтверждено</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{verifiedCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Требует проверки</p>
                <p className="text-3xl font-bold text-amber-600 mt-1">{pendingCount}</p>
              </div>
              <Clock className="w-8 h-8 text-amber-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Противоречивые</p>
                <p className="text-3xl font-bold text-purple-600 mt-1">{conflictingCount}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sources" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sources">Все источники</TabsTrigger>
          <TabsTrigger value="reliability">Надежность</TabsTrigger>
          <TabsTrigger value="verification">Верификация</TabsTrigger>
        </TabsList>

        <TabsContent value="sources">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Источники данных
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sources.map((source) => (
                  <div key={source.id} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-slate-900">{source.name}</h4>
                          <Badge className={getSourceReliabilityColor(source.reliability)}>
                            {source.reliability}
                          </Badge>
                          <Badge className={getTagColor(source.tag)}>
                            {source.tag}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">
                          {source.type} • {source.region} • {source.topic}
                        </p>
                      </div>
                      <Badge className={getVerificationStatusColor(source.verificationStatus)}>
                        {source.verificationStatus}
                      </Badge>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500">Дата публикации</p>
                        <p className="font-medium">{source.publishDate}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Дата получения</p>
                        <p className="font-medium">{source.receiveDate}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Достоверность</p>
                        <p className="font-medium">Уровень {source.credibility}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Подтверждений</p>
                        <p className="font-medium">{source.independentConfirmations}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 p-3 bg-slate-50 rounded">
                      <p className="text-sm text-slate-600">{source.internalNotes}</p>
                    </div>
                    
                    {source.url && (
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Открыть источник
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reliability">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Надежность источников
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-4">
                {['A', 'B', 'C', 'D', 'E', 'F'].map((level) => {
                  const count = reliabilityStats[level as keyof typeof reliabilityStats];
                  const levelColors: Record<string, string> = {
                    A: 'bg-green-500',
                    B: 'bg-blue-500',
                    C: 'bg-amber-500',
                    D: 'bg-orange-500',
                    E: 'bg-red-500',
                    F: 'bg-gray-500',
                  };
                  const levelLabels: Record<string, string> = {
                    A: 'Высокая',
                    B: 'Хорошая',
                    C: 'Средняя',
                    D: 'Ниже среднего',
                    E: 'Низкая',
                    F: 'Требует проверки',
                  };
                  
                  return (
                    <div key={level} className="text-center">
                      <div className={`w-16 h-16 rounded-full ${levelColors[level]} flex items-center justify-center text-white text-2xl font-bold mx-auto`}>
                        {level}
                      </div>
                      <p className="mt-2 font-medium text-slate-900">{levelLabels[level]}</p>
                      <p className="text-sm text-slate-500">{count} источник(ов)</p>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-8">
                <h4 className="font-semibold text-slate-900 mb-4">Описание уровней надежности</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded">
                    <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5" />
                    <div>
                      <p className="font-medium">A - Высокая надежность</p>
                      <p className="text-sm text-slate-600">Официальные международные организации, ведущие мировые СМИ с проверенной репутацией</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mt-1.5" />
                    <div>
                      <p className="font-medium">B - Хорошая надежность</p>
                      <p className="text-sm text-slate-600">Государственные источники, известные отраслевые издания, внутренняя аналитика</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-amber-50 rounded">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mt-1.5" />
                    <div>
                      <p className="font-medium">C - Средняя надежность</p>
                      <p className="text-sm text-slate-600">Независимые СМИ, отраслевые источники, местные контакты</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded">
                    <div className="w-3 h-3 rounded-full bg-slate-400 mt-1.5" />
                    <div>
                      <p className="font-medium">D-F - Пониженная надежность</p>
                      <p className="text-sm text-slate-600">Требуют дополнительной верификации из независимых источников</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                Записи верификации
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {verificationRecords.map((record) => {
                  const source = sources.find(s => s.id === record.sourceId);
                  return (
                    <div key={record.id} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-900">{source?.name}</h4>
                          <p className="text-sm text-slate-500">{source?.type}</p>
                        </div>
                        <Badge className={getVerificationStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500">Проверил</p>
                          <p className="font-medium">{record.verifiedBy}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Дата проверки</p>
                          <p className="font-medium">{new Date(record.verificationDate).toLocaleDateString('ru-RU')}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Уверенность</p>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-slate-200 rounded-full">
                              <div 
                                className="h-2 bg-blue-500 rounded-full" 
                                style={{ width: `${record.confidence}%` }}
                              />
                            </div>
                            <span className="text-sm">{record.confidence}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 p-3 bg-slate-50 rounded">
                        <p className="text-sm text-slate-600">{record.notes}</p>
                      </div>
                      
                      {record.conflictingSources && record.conflictingSources.length > 0 && (
                        <div className="mt-3">
                          <p className="text-sm text-slate-500">Противоречивые источники:</p>
                          <div className="flex gap-2 mt-1">
                            {record.conflictingSources.map((id) => {
                              const confSource = sources.find(s => s.id === id);
                              return confSource ? (
                                <Badge key={id} variant="outline">{confSource.name}</Badge>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}