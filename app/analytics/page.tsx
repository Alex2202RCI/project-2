'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, AlertTriangle, Target } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Аналитика (ИИ-инсайты)</h1>
        <p className="text-slate-600 mt-1">
          AI-подсказки и аналитика на основе данных системы
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Авто-резюме проектов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex gap-3">
              <BarChart3 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-blue-900 mb-2">
                  Проект Mobile Factory Ruma
                </div>
                <p className="text-sm text-blue-800">
                  Проект выполнен на 78%. Критическая задача "Получение MIC-разрешения"
                  просрочена на 5 дней. Рекомендуем ускорить согласование с Ministry of
                  Cooperation.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Выявление рисков</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-orange-900 mb-2">
                  Задержка сертификации продукции
                </div>
                <p className="text-sm text-orange-800">
                  Задержка сертификации может сдвинуть запуск Mobile Factory Ruma на 2
                  месяца. Рекомендуем параллельную подачу документов в оба органа и
                  привлечение консультантов.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>План vs Факт</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex gap-3">
              <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-green-900 mb-2">Общий прогресс</div>
                <p className="text-sm text-green-800">
                  По всем проектам выполнение плана составляет 78%. Большинство проектов
                  идут по графику. Отклонение по бюджету минимально.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Следующие шаги</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex gap-3">
              <Target className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-purple-900 mb-2">
                  Рекомендуемые действия
                </div>
                <ul className="text-sm text-purple-800 space-y-2">
                  <li>• Завершить задачу "Сертификация сырья и компонентов"</li>
                  <li>• Начать задачу "Запуск продаж"</li>
                  <li>
                    • Привлечь стейкхолдера Ministry of Agriculture для проекта
                    Agricultural R&D Center
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Экспортировать отчет</Button>
      </div>

      <div className="text-sm text-slate-500 bg-slate-50 p-4 rounded-lg border border-slate-200">
        <strong>Дисклеймер:</strong> Это AI-подсказки на основе данных системы.
        Финальные решения принимаются руководителем проекта.
      </div>
    </div>
  );
}
