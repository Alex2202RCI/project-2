'use client';

import { useAppStore } from '@/store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CompaniesPage() {
  const companies = useAppStore((state) => state.companies);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Компании и стейкхолдеры</h1>
        <p className="text-slate-600 mt-1">Все компании и партнеры</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company) => (
          <Card key={company.id}>
            <CardHeader>
              <CardTitle className="text-lg">{company.name}</CardTitle>
              <Badge variant="secondary">{company.type}</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-slate-500">Страна:</span>
                  <span className="ml-2 text-slate-900">{company.country}</span>
                </div>
                {company.contact.email && (
                  <div>
                    <span className="text-slate-500">Email:</span>
                    <span className="ml-2 text-slate-900">{company.contact.email}</span>
                  </div>
                )}
                {company.contact.phone && (
                  <div>
                    <span className="text-slate-500">Телефон:</span>
                    <span className="ml-2 text-slate-900">{company.contact.phone}</span>
                  </div>
                )}
                <div>
                  <span className="text-slate-500">Проектов:</span>
                  <span className="ml-2 text-slate-900">{company.projects.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
