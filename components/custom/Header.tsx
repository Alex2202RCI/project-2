'use client';

import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/useAppStore';

export function Header() {
  const currentUser = useAppStore((state) => state.currentUser);

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Операционный центр проектов в Республике Союз Мьянма
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-slate-600" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Уведомления</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start py-3">
                  <div className="font-medium">Задача просрочена</div>
                  <div className="text-sm text-slate-600">
                    Сертификация сырья и компонентов
                  </div>
                  <div className="text-xs text-slate-400 mt-1">2 часа назад</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start py-3">
                  <div className="font-medium">Новый документ</div>
                  <div className="text-sm text-slate-600">
                    Добавлен договор на строительство
                  </div>
                  <div className="text-xs text-slate-400 mt-1">5 часов назад</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start py-3">
                  <div className="font-medium">Высокий риск</div>
                  <div className="text-sm text-slate-600">
                    Задержка поставки оборудования
                  </div>
                  <div className="text-xs text-slate-400 mt-1">1 день назад</div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-sm font-medium text-slate-900">
                    {currentUser?.name}
                  </div>
                  <div className="text-xs text-slate-600">
                    {currentUser?.department}
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Профиль</DropdownMenuItem>
              <DropdownMenuItem>Настройки</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Выйти</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
