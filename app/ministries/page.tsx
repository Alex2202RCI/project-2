'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Building2,
  Mail,
  FileText,
  Search,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Phone,
  Globe,
  User,
  Briefcase,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Ministry, MinistryCommunication, MinistryAgreement } from '@/types';
import { MinistryChat } from '@/components/custom/MinistryChat';

const cooperationLevelColors: Record<string, string> = {
  'Стратегический партнер': 'bg-emerald-100 text-emerald-800',
  'Ключевой партнер': 'bg-blue-100 text-blue-800',
  'Активное взаимодействие': 'bg-amber-100 text-amber-800',
  'Базовое взаимодействие': 'bg-slate-100 text-slate-800',
  'Нет взаимодействия': 'bg-red-100 text-red-800',
};

const communicationStatusColors: Record<string, string> = {
  'Ожидает ответа': 'bg-amber-100 text-amber-800',
  'Отправлено': 'bg-blue-100 text-blue-800',
  'Получено': 'bg-emerald-100 text-emerald-800',
  'На рассмотрении': 'bg-purple-100 text-purple-800',
  'Завершено': 'bg-slate-100 text-slate-800',
  'Отклонено': 'bg-red-100 text-red-800',
};

const agreementStatusColors: Record<string, string> = {
  'Действует': 'bg-emerald-100 text-emerald-800',
  'На подписании': 'bg-blue-100 text-blue-800',
  'Истек': 'bg-slate-100 text-slate-800',
  'Расторгнут': 'bg-red-100 text-red-800',
};

function MinistryCard({ ministry, onChatOpen }: { ministry: Ministry; onChatOpen: () => void }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{ministry.name}</CardTitle>
            <p className="text-sm text-slate-500 mt-1">{ministry.fullName}</p>
          </div>
          <Badge className={cn('ml-2', cooperationLevelColors[ministry.cooperationLevel] || 'bg-slate-100 text-slate-800')}>
            {ministry.cooperationLevel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{ministry.description}</p>
        
        {/* Имя министра */}
        {ministry.ministerName && ministry.ministerName !== 'Не назначен' && (
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
            <Briefcase className="w-4 h-4 text-slate-400" />
            <div>
              <span className="text-slate-400">Министр:</span>
              <span className="ml-2 font-medium text-slate-900">{ministry.ministerName}</span>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <MessageSquare className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600">{ministry.communicationsCount} писем</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FileText className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600">{ministry.agreementsCount} документов</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className={cn(ministry.pendingResponses > 0 ? 'text-amber-600' : 'text-slate-400')}>
              {ministry.pendingResponses} ожидают
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CalendarIcon className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600">
              {new Date(ministry.lastCommunicationDate).toLocaleDateString('ru-RU')}
            </span>
          </div>
        </div>

        {ministry.contact.contactPerson && ministry.contact.contactPerson !== 'Не назначен' && (
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
            <User className="w-4 h-4 text-slate-400" />
            <div>
              <span className="text-slate-400">Контактное лицо:</span>
              <span className="ml-2 font-medium text-slate-900">{ministry.contact.contactPerson}</span>
              {ministry.contact.contactPosition && (
                <span className="text-slate-500 ml-1">({ministry.contact.contactPosition})</span>
              )}
            </div>
          </div>
        )}

        <Button size="sm" className="w-full" onClick={onChatOpen}>
          <MessageSquare className="w-4 h-4 mr-2" />
          Написать
        </Button>
      </CardContent>
    </Card>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

export default function MinistriesPage() {
  const ministries = useAppStore((state) => state.ministries);
  const communications = useAppStore((state) => state.ministryCommunications);
  const agreements = useAppStore((state) => state.ministryAgreements);
  const [searchQuery, setSearchQuery] = useState('');
  const [cooperationFilter, setCooperationFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('ministries');
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);

  const filteredMinistries = ministries.filter((ministry) => {
    const matchesSearch =
      ministry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ministry.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCooperation =
      cooperationFilter === 'all' || ministry.cooperationLevel === cooperationFilter;
    return matchesSearch && matchesCooperation;
  });

  const pendingCommunications = communications.filter(
    (c) => c.status === 'Ожидает ответа' || c.status === 'Отправлено'
  );

  const activeAgreements = agreements.filter((a) => a.status === 'Действует');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Министерства и ведомства</h1>
          <p className="text-slate-600 mt-1">
            Управление коммуникациями с государственными органами Мьянмы
          </p>
        </div>
        <Button>
          <MessageSquare className="w-4 h-4 mr-2" />
          Новое письмо
        </Button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{ministries.length}</p>
                <p className="text-sm text-slate-500">Министерств</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{pendingCommunications.length}</p>
                <p className="text-sm text-slate-500">Ожидают ответа</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FileText className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{activeAgreements.length}</p>
                <p className="text-sm text-slate-500">Действующих соглашений</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{communications.length}</p>
                <p className="text-sm text-slate-500">Всего писем</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Основной контент */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="ministries">Министерства</TabsTrigger>
          <TabsTrigger value="communications">Коммуникации</TabsTrigger>
          <TabsTrigger value="agreements">Соглашения</TabsTrigger>
        </TabsList>

        <TabsContent value="ministries" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Поиск министерств..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={cooperationFilter} onValueChange={setCooperationFilter}>
                  <SelectTrigger className="w-full md:w-56">
                    <SelectValue placeholder="Уровень сотрудничества" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все уровни</SelectItem>
                    <SelectItem value="Стратегический партнер">Стратегический партнер</SelectItem>
                    <SelectItem value="Ключевой партнер">Ключевой партнер</SelectItem>
                    <SelectItem value="Активное взаимодействие">Активное взаимодействие</SelectItem>
                    <SelectItem value="Базовое взаимодействие">Базовое взаимодействие</SelectItem>
                    <SelectItem value="Нет взаимодействия">Нет взаимодействия</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMinistries.map((ministry) => (
                  <MinistryCard
                    key={ministry.id}
                    ministry={ministry}
                    onChatOpen={() => setSelectedMinistry(ministry)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Последние коммуникации</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {communications.map((comm) => {
                  const ministry = ministries.find((m) => m.id === comm.ministryId);
                  return (
                    <div
                      key={comm.id}
                      className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="font-medium text-slate-900">{comm.subject}</div>
                          <div className="text-sm text-slate-600 mt-1 flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5" />
                            {ministry?.name}
                          </div>
                        </div>
                        <Badge className={cn(communicationStatusColors[comm.status] || 'bg-slate-100')}>
                          {comm.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span>{comm.category}</span>
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {comm.author}
                          </span>
                        </div>
                        <span className="text-sm text-slate-500">
                          {new Date(comm.date).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agreements" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Соглашения и документы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {agreements.map((agr) => {
                  const ministry = ministries.find((m) => m.id === agr.ministryId);
                  return (
                    <div
                      key={agr.id}
                      className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="font-medium text-slate-900">{agr.title}</div>
                          <div className="text-sm text-slate-600 mt-1 flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5" />
                            {ministry?.name}
                          </div>
                        </div>
                        <Badge className={cn(agreementStatusColors[agr.status] || 'bg-slate-100')}>
                          {agr.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 mb-3">{agr.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <FileText className="w-3.5 h-3.5" />
                            {agr.type}
                          </span>
                          <span>
                            с {new Date(agr.effectiveDate).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                        {agr.expiryDate && (
                          <span className="text-sm text-slate-400">
                            до {new Date(agr.expiryDate).toLocaleDateString('ru-RU')}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Чат с министерством */}
      {selectedMinistry && (
        <MinistryChat
          ministry={selectedMinistry}
          agreements={agreements.filter((a) => a.ministryId === selectedMinistry.id)}
          onClose={() => setSelectedMinistry(null)}
        />
      )}
    </div>
  );
}
