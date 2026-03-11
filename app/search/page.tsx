'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const projects = useAppStore((state) => state.projects);
  const tasks = useAppStore((state) => state.tasks);
  const documents = useAppStore((state) => state.documents);
  const companies = useAppStore((state) => state.companies);

  const searchResults = {
    projects: projects.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.code.toLowerCase().includes(query.toLowerCase())
    ),
    tasks: tasks.filter((t) => t.name.toLowerCase().includes(query.toLowerCase())),
    documents: documents.filter((d) => d.name.toLowerCase().includes(query.toLowerCase())),
    companies: companies.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Поиск</h1>
        <p className="text-slate-600 mt-1">
          Поиск по проектам, задачам, документам и компаниям
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Введите запрос для поиска..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 text-lg"
            />
          </div>
        </CardContent>
      </Card>

      {query && (
        <div className="space-y-6">
          {searchResults.projects.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Проекты ({searchResults.projects.length})
                </h3>
                <div className="space-y-2">
                  {searchResults.projects.map((project) => (
                    <Link key={project.id} href={`/projects/${project.id}`}>
                      <div className="p-3 border border-slate-200 rounded hover:border-slate-300 transition-colors">
                        <div className="font-medium text-slate-900">{project.name}</div>
                        <div className="text-sm text-slate-600">{project.code}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {searchResults.tasks.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Задачи ({searchResults.tasks.length})
                </h3>
                <div className="space-y-2">
                  {searchResults.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 border border-slate-200 rounded hover:border-slate-300 transition-colors"
                    >
                      <div className="font-medium text-slate-900">{task.name}</div>
                      <div className="text-sm text-slate-600">{task.category}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {searchResults.documents.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Документы ({searchResults.documents.length})
                </h3>
                <div className="space-y-2">
                  {searchResults.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3 border border-slate-200 rounded hover:border-slate-300 transition-colors"
                    >
                      <div className="font-medium text-slate-900">{doc.name}</div>
                      <div className="text-sm text-slate-600">{doc.type}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {searchResults.companies.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Компании ({searchResults.companies.length})
                </h3>
                <div className="space-y-2">
                  {searchResults.companies.map((company) => (
                    <div
                      key={company.id}
                      className="p-3 border border-slate-200 rounded hover:border-slate-300 transition-colors"
                    >
                      <div className="font-medium text-slate-900">{company.name}</div>
                      <div className="text-sm text-slate-600">{company.type}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
