'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  FolderKanban,
  CheckSquare,
  Building2,
  Package,
  FileText,
  BarChart3,
  Search,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Главная', href: '/', icon: Home },
  { name: 'Проекты', href: '/projects', icon: FolderKanban },
  { name: 'Задачи', href: '/tasks', icon: CheckSquare },
  { name: 'Компании', href: '/companies', icon: Building2 },
  { name: 'Продукты', href: '/products', icon: Package },
  { name: 'Документы', href: '/documents', icon: FileText },
  { name: 'Аналитика', href: '/analytics', icon: BarChart3 },
  { name: 'Поиск', href: '/search', icon: Search },
  { name: 'Безопасность', href: '/security', icon: Shield },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold">Платформа РК</h1>
        <p className="text-sm text-slate-400 mt-1">Инвестиции</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
        © 2024 RC Investment Fund
      </div>
    </div>
  );
}
