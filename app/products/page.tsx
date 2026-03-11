'use client';

import { useAppStore } from '@/store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ProductsPage() {
  const products = useAppStore((state) => state.products);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Продукты</h1>
        <p className="text-slate-600 mt-1">Все продукты и продуктовые линейки</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <Badge variant="secondary">{product.category}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-slate-700 mb-1">Описание</div>
                <p className="text-sm text-slate-600">{product.description}</p>
              </div>
              <div>
                <div className="text-sm font-medium text-slate-700 mb-2">Применение</div>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app, idx) => (
                    <Badge key={idx} variant="outline">
                      {app}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-slate-700 mb-2">Рынки</div>
                <div className="flex flex-wrap gap-2">
                  {product.markets.map((market, idx) => (
                    <Badge key={idx} variant="secondary">
                      {market}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm text-slate-500">
                  Сертификатов: {product.certificates.length}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
