'use client';

import { useAppStore } from '@/store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, Eye } from 'lucide-react';

export default function SecurityPage() {
  const roles = useAppStore((state) => state.roles);
  const auditLogs = useAppStore((state) => state.auditLogs);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Безопасность</h1>
        <p className="text-slate-600 mt-1">Управление безопасностью и аудит</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Уведомления о безопасности</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-3">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-red-900">Внимание!</div>
                <p className="text-sm text-red-800 mt-1">
                  Возможная фишинг-атака — не переходите по подозрительным ссылкам
                </p>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-amber-900">Напоминание</div>
                <p className="text-sm text-amber-800 mt-1">
                  Конфиденциальные данные запрещено пересылать на личные email
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Роли и права доступа</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {roles.map((role) => (
              <div
                key={role.id}
                className="p-4 border border-slate-200 rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium text-slate-900">{role.name}</div>
                    <div className="text-sm text-slate-600 mt-1">{role.description}</div>
                  </div>
                  <Badge variant="secondary">Активна</Badge>
                </div>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div>
                    <div className="text-xs text-slate-500">Проекты</div>
                    <Badge variant="outline" className="mt-1">
                      {role.permissions.projects}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Задачи</div>
                    <Badge variant="outline" className="mt-1">
                      {role.permissions.tasks}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Документы</div>
                    <Badge variant="outline" className="mt-1">
                      {role.permissions.documents}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Журнал событий (Аудит-лог)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-4 p-3 border border-slate-200 rounded-lg text-sm"
              >
                <Eye className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-slate-900">{log.userName}</span>
                    <Badge variant="outline">{log.action}</Badge>
                    <span className="text-slate-600">{log.objectName}</span>
                  </div>
                  <div className="text-slate-500 mt-1 text-xs">
                    {new Date(log.timestamp).toLocaleString('ru-RU')} • {log.ipAddress}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Статистика безопасности</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-900">0</div>
              <div className="text-sm text-green-700 mt-1">
                Заблокированных попыток доступа
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-900">{auditLogs.length}</div>
              <div className="text-sm text-blue-700 mt-1">Событий за месяц</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-2xl font-bold text-slate-900">0</div>
              <div className="text-sm text-slate-700 mt-1">Инцидентов за месяц</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
