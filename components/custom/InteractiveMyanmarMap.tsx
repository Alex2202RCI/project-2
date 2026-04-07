'use client';

import { useEffect, useState } from 'react';
import { MapPoint } from '@/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import dynamic from 'next/dynamic';
import { Factory, Mountain, Anchor, Warehouse, TruckIcon, MapPin } from 'lucide-react';

// Динамический импорт Leaflet (работает только на клиенте)
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), { ssr: false });
const Tooltip = dynamic(() => import('react-leaflet').then(mod => mod.Tooltip), { ssr: false });
const LayersControl = dynamic(() => import('react-leaflet').then(mod => mod.LayersControl), { ssr: false });

const iconMap = {
  factory: Factory,
  mine: Mountain,
  port: Anchor,
  warehouse: Warehouse,
  logistics: TruckIcon,
};

const statusColors: Record<string, string> = {
  'Активен': '#22c55e',
  'Планирование': '#f59e0b',
  'Завершен': '#64748b',
  'Приостановлен': '#ef4444',
};

// Города Мьянмы
const cities = [
  { name: 'Yangon (Янгон)', lat: 16.8661, lng: 96.1951, population: '5.2 млн', description: 'Крупнейший город и бывшая столица' },
  { name: 'Mandalay (Мандалай)', lat: 21.9588, lng: 96.0891, population: '1.2 млн', description: 'Второй по величине город' },
  { name: 'Naypyidaw (Нейпьидо)', lat: 19.7633, lng: 96.0785, population: '1.0 млн', description: 'Столица Мьянмы' },
  { name: 'Mawlamyine (Моламьяйн)', lat: 16.4919, lng: 97.6278, population: '450 тыс', description: 'Столица штата Мон' },
  { name: 'Pathein (Патейн)', lat: 16.7791, lng: 94.7325, population: '240 тыс', description: 'Столица области Иравади' },
  { name: 'Myitkyina (Мьичина)', lat: 25.3833, lng: 97.3964, population: '150 тыс', description: 'Столица штата Качин' },
  { name: 'Sittwe (Ситуэ)', lat: 20.1462, lng: 92.8984, population: '180 тыс', description: 'Столица штата Ракхайн' },
  { name: 'Taunggyi (Таунджи)', lat: 20.7891, lng: 97.0378, population: '380 тыс', description: 'Столица штата Шан' },
  { name: 'Bago (Баго)', lat: 17.3352, lng: 96.4832, population: '280 тыс', description: 'Город в области Баго' },
  { name: 'Myeik (Мьейк)', lat: 12.4394, lng: 98.6003, population: '170 тыс', description: 'Город на юге Тенассерима' },
  { name: 'Dawei (Давей)', lat: 14.0833, lng: 98.1833, population: '140 тыс', description: 'Столица области Тенассерим' },
  { name: 'Lashio (Лашо)', lat: 22.9350, lng: 97.7483, population: '130 тыс', description: 'Город в штате Шан' },
  { name: 'Magway (Магуэ)', lat: 20.1500, lng: 94.9333, population: '90 тыс', description: 'Столица области Магуэ' },
  { name: 'Monywa (Монива)', lat: 22.1083, lng: 95.1350, population: '180 тыс', description: 'Город в области Сагайн' },
  { name: 'Meiktila (Мейтхила)', lat: 20.8778, lng: 95.8583, population: '170 тыс', description: 'Город в области Мандалай' },
];

// Штаты и области Мьянмы (примерные границы)
const states = [
  { name: 'Качин', center: [25.5, 97.5] as [number, number] },
  { name: 'Шан', center: [22.0, 97.5] as [number, number] },
  { name: 'Сикайн', center: [22.5, 95.0] as [number, number] },
  { name: 'Мандалай', center: [21.5, 96.0] as [number, number] },
  { name: 'Магуэ', center: [20.0, 94.5] as [number, number] },
  { name: 'Ракхайн', center: [19.5, 93.5] as [number, number] },
  { name: 'Баго', center: [18.0, 96.5] as [number, number] },
  { name: 'Нейпьидо', center: [19.76, 96.08] as [number, number] },
  { name: 'Янгон', center: [16.8, 96.2] as [number, number] },
  { name: 'Иравади', center: [17.0, 95.0] as [number, number] },
  { name: 'Мон', center: [16.5, 97.5] as [number, number] },
  { name: 'Кая', center: [19.0, 97.0] as [number, number] },
  { name: 'Тенассерим', center: [13.5, 98.5] as [number, number] },
];

interface InteractiveMyanmarMapProps {
  points: MapPoint[];
  onPointClick?: (point: MapPoint) => void;
}

function InteractiveMap({ points, onPointClick }: InteractiveMyanmarMapProps) {
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    import('leaflet').then(leaflet => {
      setL(leaflet);
    });
  }, []);

  if (!L) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-slate-100 rounded-lg">
        <div className="text-slate-500">Загрузка карты...</div>
      </div>
    );
  }

  // Создаём кастомные иконки для маркеров
  const createCustomIcon = (color: string, size: number = 12) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2],
    });
  };

  const createCityIcon = () => {
    return L.divIcon({
      className: 'city-marker',
      html: `<div style="
        width: 8px;
        height: 8px;
        background-color: #475569;
        border: 1px solid white;
        border-radius: 50%;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      "></div>`,
      iconSize: [8, 8],
      iconAnchor: [4, 4],
      popupAnchor: [0, -4],
    });
  };

  return (
    <MapContainer
      center={[19.5, 96.0]}
      zoom={6}
      minZoom={5}
      maxZoom={12}
      style={{ height: '600px', width: '100%', borderRadius: '8px' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Маркеры объектов */}
      {points.map((point) => {
        const color = statusColors[point.status] || '#64748b';
        const Icon = iconMap[point.type];
        const icon = createCustomIcon(color, 14);

        return (
          <Marker
            key={point.id}
            position={[point.coordinates.lat, point.coordinates.lng]}
            icon={icon}
            eventHandlers={{
              click: () => onPointClick?.(point),
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <div className="font-semibold text-slate-900 mb-1">{point.name}</div>
                <div className="text-sm text-slate-600 mb-2">{point.description}</div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="secondary"
                    className="text-xs"
                    style={{
                      backgroundColor: `${color}20`,
                      color: color,
                    }}
                  >
                    {point.status}
                  </Badge>
                  <span className="text-xs text-slate-500 capitalize">{point.type}</span>
                </div>
                {point.projectId && (
                  <div className="text-xs text-slate-500">Проект: {point.projectId}</div>
                )}
                <div className="text-xs text-slate-400 mt-1">
                  {point.coordinates.lat.toFixed(4)}, {point.coordinates.lng.toFixed(4)}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* Города */}
      {cities.map((city) => (
        <Marker
          key={city.name}
          position={[city.lat, city.lng]}
          icon={createCityIcon()}
        >
          <Tooltip direction="top" offset={[0, -4]}>
            <div className="text-xs">
              <div className="font-semibold">{city.name}</div>
              <div className="text-slate-500">{city.population}</div>
            </div>
          </Tooltip>
          <Popup>
            <div className="min-w-[180px]">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span className="font-semibold text-slate-900">{city.name}</span>
              </div>
              <div className="text-sm text-slate-600 mb-1">{city.description}</div>
              <div className="text-xs text-slate-500">Население: {city.population}</div>
              <div className="text-xs text-slate-400 mt-1">
                {city.lat.toFixed(4)}, {city.lng.toFixed(4)}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Подписи штатов */}
      {states.map((state) => (
        <Marker
          key={state.name}
          position={state.center as [number, number]}
          icon={L.divIcon({
            className: 'state-label',
            html: `<div style="
              font-size: 11px;
              font-weight: 600;
              color: #64748b;
              text-align: center;
              text-shadow: 0 0 4px white, 0 0 4px white, 0 0 4px white;
              white-space: nowrap;
            ">${state.name}</div>`,
            iconSize: [80, 20],
            iconAnchor: [40, 10],
          })}
        />
      ))}
    </MapContainer>
  );
}

export function InteractiveMyanmarMap({ points, onPointClick }: InteractiveMyanmarMapProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Интерактивная карта объектов — Мьянма</h3>
          <p className="text-sm text-slate-500 mt-1">
            {points.length} объектов • {cities.length} городов • {states.length} штатов/областей
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-slate-600">Активен</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs text-slate-600">Планирование</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-500"></div>
            <span className="text-xs text-slate-600">Завершен</span>
          </div>
        </div>
      </div>

      <InteractiveMap points={points} onPointClick={onPointClick} />

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
                  <Badge
                    variant="secondary"
                    className="mt-1 text-xs"
                    style={{
                      backgroundColor: `${statusColors[point.status] || '#64748b'}20`,
                      color: statusColors[point.status] || '#64748b',
                    }}
                  >
                    {point.status}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}