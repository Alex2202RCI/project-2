'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FileText,
  Search,
  FolderOpen,
  Shield,
  Scale,
  FileCheck,
  FileSignature,
  FileBadge,
  BarChart3,
  Mail,
  Wrench,
  Image,
  Download,
  Eye,
  Calendar,
  User,
  ChevronRight,
  Lock,
  LockOpen,
  AlertTriangle,
} from 'lucide-react';
import { documents } from '@/mock-data/documents';
import { projects } from '@/mock-data/projects';

// Категории документов
const categories = [
  { id: 'all', name: 'Все документы', icon: FolderOpen, color: 'text-slate-600', bgColor: 'bg-slate-100' },
  { id: 'Меморандум', name: 'Меморандумы', icon: FileCheck, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { id: 'Правовая база', name: 'Правовая база', icon: Scale, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  { id: 'Лицензия', name: 'Лицензии', icon: FileBadge, color: 'text-amber-600', bgColor: 'bg-amber-100' },
  { id: 'Соглашение', name: 'Соглашения', icon: FileSignature, color: 'text-green-600', bgColor: 'bg-green-100' },
  { id: 'Договор', name: 'Договоры', icon: FileText, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
  { id: 'Финансовая модель', name: 'Финансовые модели', icon: BarChart3, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
  { id: 'Отчет', name: 'Отчеты', icon: FileText, color: 'text-cyan-600', bgColor: 'bg-cyan-100' },
  { id: 'Сертификат', name: 'Сертификаты', icon: FileBadge, color: 'text-teal-600', bgColor: 'bg-teal-100' },
  { id: 'Переписка', name: 'Переписка', icon: Mail, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  { id: 'Техническая документация', name: 'Техдокументация', icon: Wrench, color: 'text-gray-600', bgColor: 'bg-gray-100' },
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' Б';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' КБ';
  return (bytes / 1048576).toFixed(1) + ' МБ';
}

function getFileIcon(fileType: string) {
  if (fileType.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
  if (fileType.includes('excel') || fileType.includes('spreadsheet')) return <BarChart3 className="w-5 h-5 text-green-500" />;
  if (fileType.includes('image')) return <Image className="w-5 h-5 text-blue-500" />;
  return <FileText className="w-5 h-5 text-slate-500" />;
}

function getAccessBadge(accessLevel: string) {
  switch (accessLevel) {
    case 'Public':
      return { icon: <LockOpen className="w-3 h-3" />, text: 'Публичный', color: 'bg-green-100 text-green-800' };
    case 'Confidential':
      return { icon: <Lock className="w-3 h-3" />, text: 'Конфиденциально', color: 'bg-amber-100 text-amber-800' };
    case 'Strictly Confidential':
      return { icon: <AlertTriangle className="w-3 h-3" />, text: 'Строго конфиденциально', color: 'bg-red-100 text-red-800' };
    default:
      return { icon: <Lock className="w-3 h-3" />, text: accessLevel, color: 'bg-slate-100 text-slate-800' };
  }
}

export default function DocumentsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Фильтрация документов
  const filteredDocs = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.type === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Статистика по категориям
  const categoryStats = categories.map(cat => {
    const count = cat.id === 'all' 
      ? documents.length 
      : documents.filter(d => d.type === cat.id).length;
    return { ...cat, count };
  });

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Хранилище документов</h1>
        <p className="text-slate-600 mt-1">
          Ключевые документы: меморандумы, соглашения, лицензии, правовая база
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {categoryStats.filter(c => c.count > 0).map((cat) => {
          const Icon = cat.icon;
          return (
            <Card 
              key={cat.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCategory === cat.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <CardContent className="p-4">
                <div className={'p-2 rounded-lg ' + cat.bgColor + ' inline-block mb-2'}>
                  <Icon className={'w-5 h-5 ' + cat.color} />
                </div>
                <p className="text-sm font-medium text-slate-700 truncate">{cat.name}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{cat.count}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Поиск */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Поиск документов по названию или тегам..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Выбранная категория */}
      {selectedCategory !== 'all' && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Категория:</span>
          <Badge className="bg-blue-100 text-blue-800">
            {categories.find(c => c.id === selectedCategory)?.name}
          </Badge>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelectedCategory('all')}
            className="text-xs"
          >
            Сбросить
          </Button>
        </div>
      )}

      {/* Список документов */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5" />
              Документы
            </div>
            <span className="text-sm font-normal text-slate-500">
              {filteredDocs.length} из {documents.length}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredDocs.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">Документы не найдены</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-3"
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              >
                Сбросить фильтры
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDocs.map((doc) => {
                const category = categories.find(c => c.id === doc.type);
                const project = projects.find(p => p.id === doc.projectId);
                const accessBadge = getAccessBadge(doc.accessLevel);
                const Icon = category?.icon || FileText;

                return (
                  <div
                    key={doc.id}
                    className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start gap-4">
                      {/* Иконка категории */}
                      <div className={'p-3 rounded-lg ' + (category?.bgColor || 'bg-slate-100')}>
                        <Icon className={'w-6 h-6 ' + (category?.color || 'text-slate-600')} />
                      </div>

                      {/* Информация */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-slate-900 truncate">{doc.name}</h4>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(doc.uploadDate).toLocaleDateString('ru-RU')}
                              </span>
                              <span className="text-xs text-slate-500">v{doc.version}</span>
                              <span className="text-xs text-slate-500">{formatFileSize(doc.fileSize)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {getFileIcon(doc.fileType)}
                            <Badge className={accessBadge.color}>
                              {accessBadge.icon}
                              <span className="ml-1">{accessBadge.text}</span>
                            </Badge>
                          </div>
                        </div>

                        {/* Теги и проект */}
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          {project && (
                            <Badge variant="outline" className="text-xs">
                              {project.code}
                            </Badge>
                          )}
                          {doc.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Действия */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}