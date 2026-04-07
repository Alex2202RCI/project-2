'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
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
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Globe,
  TrendingUp,
  AlertTriangle,
  Database,
  FileCheck,
  Landmark,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Главная', href: '/', icon: Home },
  { name: 'Чат', href: '/chat', icon: MessageSquare },
  { name: 'Проекты', href: '/projects', icon: FolderKanban },
  { name: 'Задачи', href: '/tasks', icon: CheckSquare },
  { name: 'Компании', href: '/companies', icon: Building2 },
  { name: 'Министерства', href: '/ministries', icon: Landmark },
  { name: 'Продукты', href: '/products', icon: Package },
  { name: 'Документы', href: '/documents', icon: FileText },
  { 
    name: 'Аналитика', 
    href: '/analytics', 
    icon: BarChart3,
    children: [
      { name: 'Обзор', href: '/analytics', icon: BarChart3 },
      { name: 'Политико-экономический мониторинг', href: '/analytics/myanmar', icon: Globe },
    ]
  },
  { name: 'Поиск', href: '/search', icon: Search },
  { name: 'Безопасность', href: '/security', icon: Shield },
];

const myanmarSubNav = [
  { name: 'Обзор', href: '/analytics/myanmar', icon: BarChart3 },
  { name: 'Политическая ситуация', href: '/analytics/myanmar/political', icon: Globe },
  { name: 'Экономика', href: '/analytics/myanmar/economic', icon: TrendingUp },
  { name: 'Риски по проектам', href: '/analytics/myanmar/risks', icon: AlertTriangle },
  { name: 'Источники и верификация', href: '/analytics/myanmar/sources', icon: Database },
  { name: 'Журнал решений', href: '/analytics/myanmar/decisions', icon: FileCheck },
];

export function Sidebar() {
  const pathname = usePathname();
  const [analyticsExpanded, setAnalyticsExpanded] = useState(
    pathname?.startsWith('/analytics')
  );
  const [myanmarExpanded, setMyanmarExpanded] = useState(
    pathname?.startsWith('/analytics/myanmar')
  );

  const isAnalyticsActive = pathname?.startsWith('/analytics');
  const isMyanmarActive = pathname?.startsWith('/analytics/myanmar');

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold">Платформа РК</h1>
        <p className="text-sm text-slate-400 mt-1">Инвестиции</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          if (item.children) {
            return (
              <div key={item.name}>
                <button
                  onClick={() => setAnalyticsExpanded(!analyticsExpanded)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isAnalyticsActive
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </div>
                  {analyticsExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                
                {analyticsExpanded && (
                  <div className="ml-4 mt-1 space-y-1">
                    <Link
                      href="/analytics"
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                        pathname === '/analytics'
                          ? 'bg-slate-700 text-white'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      )}
                    >
                      <BarChart3 className="w-4 h-4" />
                      AI-инсайты
                    </Link>
                    
                    <div>
                      <button
                        onClick={() => setMyanmarExpanded(!myanmarExpanded)}
                        className={cn(
                          'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                          isMyanmarActive
                            ? 'bg-slate-700 text-white'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Globe className="w-4 h-4" />
                          Мониторинг Мьянмы
                        </div>
                        {myanmarExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                      
                      {myanmarExpanded && (
                        <div className="ml-4 mt-1 space-y-1">
                          {myanmarSubNav.map((subItem) => {
                            const isActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={cn(
                                  'flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors',
                                  isActive
                                    ? 'bg-slate-600 text-white'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                )}
                              >
                                <subItem.icon className="w-3.5 h-3.5" />
                                {subItem.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          }

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
