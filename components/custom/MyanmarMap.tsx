'use client';

import { MapPoint } from '@/types';
import { Card } from '@/components/ui/card';
import { Factory, Mountain, Anchor, Warehouse, TruckIcon } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface MyanmarMapProps {
  points: MapPoint[];
  onPointClick?: (point: MapPoint) => void;
}

const iconMap = {
  factory: Factory,
  mine: Mountain,
  port: Anchor,
  warehouse: Warehouse,
  logistics: TruckIcon,
};

const majorCities = [
  { name: 'Yangon', lat: 16.8661, lng: 96.1951 },
  { name: 'Mandalay', lat: 21.9588, lng: 96.0891 },
  { name: 'Naypyidaw', lat: 19.7633, lng: 96.0785 },
  { name: 'Mawlamyine', lat: 16.4919, lng: 97.6278 },
  { name: 'Pathein', lat: 16.7791, lng: 94.7325 },
  { name: 'Myitkyina', lat: 25.3833, lng: 97.3964 },
];

export function MyanmarMap({ points, onPointClick }: MyanmarMapProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Карта объектов — Мьянма</h3>
      <div
        className="relative rounded-lg overflow-hidden border border-slate-200 bg-cover bg-center bg-no-repeat"
        style={{
          height: '600px',
          backgroundImage: 'url(/снимок_экрана_2026-01-08_в_23.13.14.png)',
          backgroundSize: 'cover'
        }}
      >
        {points.map((point) => {
          const latScale = (28 - point.coordinates.lat) / (28 - 10);
          const lngScale = (point.coordinates.lng - 92) / (102 - 92);

          const leftPercent = 16 + lngScale * 67.5;
          const topPercent = 3 + latScale * 94;

          let bgColor = 'bg-blue-500';
          if (point.status === 'Активен') bgColor = 'bg-green-500';
          else if (point.status === 'Завершен') bgColor = 'bg-slate-500';
          else if (point.status === 'Планирование') bgColor = 'bg-amber-500';

          return (
            <div
              key={point.id}
              onClick={() => onPointClick?.(point)}
              className="absolute cursor-pointer group"
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div
                className={`w-5 h-5 ${bgColor} rounded-full border-2 border-white shadow-lg hover:scale-110 transition-transform`}
              />
              <div className="absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap text-xs font-semibold text-slate-900 bg-white/90 px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {point.name}
              </div>
            </div>
          );
        })}

        {majorCities.map((city) => {
          const latScale = (28 - city.lat) / (28 - 10);
          const lngScale = (city.lng - 92) / (102 - 92);
          const leftPercent = 16 + lngScale * 67.5;
          const topPercent = 3 + latScale * 94;

          return (
            <div
              key={city.name}
              className="absolute flex items-center gap-1"
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="w-1.5 h-1.5 bg-slate-700 rounded-full opacity-60" />
              <span className="text-[10px] font-medium text-slate-700 opacity-70 whitespace-nowrap pointer-events-none">
                {city.name}
              </span>
            </div>
          );
        })}

        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-md border border-slate-200">
          <div className="text-xs font-semibold text-slate-700 mb-2">Легенда</div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 border border-white shadow-sm"></div>
              <span className="text-xs text-slate-600">Активен</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500 border border-white shadow-sm"></div>
              <span className="text-xs text-slate-600">Планирование</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-500 border border-white shadow-sm"></div>
              <span className="text-xs text-slate-600">Завершен</span>
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md border border-slate-200">
          <div className="text-xs font-semibold text-slate-700">Объектов: {points.length}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        {points.filter(p => p.projectId).slice(0, 6).map((point) => {
          const Icon = iconMap[point.type];
          return (
            <div
              key={point.id}
              onClick={() => onPointClick?.(point)}
              className="p-3 border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="flex items-start gap-2">
                <Icon className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-900 truncate">
                    {point.name}
                  </div>
                  <StatusBadge status={point.status} className="mt-1" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}