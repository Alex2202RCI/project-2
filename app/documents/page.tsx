'use client';

import { useAppStore } from '@/store/useAppStore';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

export default function DocumentsPage() {
  const documents = useAppStore((state) => state.documents);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Документы</h1>
        <p className="text-slate-600 mt-1">Все документы системы</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
              >
                <FileText className="w-8 h-8 text-slate-400 flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-medium text-slate-900">{doc.name}</div>
                  <div className="text-sm text-slate-600 mt-1">{doc.type}</div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-slate-500">
                      {new Date(doc.uploadDate).toLocaleDateString('ru-RU')}
                    </span>
                    <span className="text-xs text-slate-500">v{doc.version}</span>
                    <Badge
                      variant={
                        doc.accessLevel === 'Strictly Confidential'
                          ? 'destructive'
                          : 'secondary'
                      }
                    >
                      {doc.accessLevel}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
