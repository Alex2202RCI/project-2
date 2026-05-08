'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DrillHole, MineralDeposit } from '@/types/mining';

interface MiningCrossSectionProps {
  drillHoles: DrillHole[];
  minerals: MineralDeposit[];
  depth: number;
  siteName: string;
}

const mineralColors: Record<string, string> = {
  gold: '#FFD700',
  antimony: '#C0C0C0',
  beryllium: '#90EE90',
  tantalum: '#4169E1',
  associated: '#FFA500',
};

const rockLayers = [
  { name: 'Почвенный слой', depth: 0, thickness: 2, color: '#8B4513' },
  { name: 'Глина', depth: 2, thickness: 15, color: '#DEB887' },
  { name: 'Песчаник', depth: 17, thickness: 30, color: '#F4A460' },
  { name: 'Сланцы', depth: 47, thickness: 40, color: '#708090' },
  { name: 'Гранитогнейсы', depth: 87, thickness: 100, color: '#A0522D' },
  { name: 'Амфиболиты', depth: 187, thickness: 150, color: '#2F4F4F' },
  { name: 'Кварцевые жилы', depth: 337, thickness: 50, color: '#E8E8E8' },
  { name: 'Кристаллическое основание', depth: 387, thickness: 113, color: '#4A4A4A' },
];

export function MiningCrossSection({ drillHoles, minerals, depth, siteName }: MiningCrossSectionProps) {
  const [hoveredHole, setHoveredHole] = useState<string | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const [selectedMineral, setSelectedMineral] = useState<string | null>(null);

  const svgWidth = 1000;
  const svgHeight = 600;
  const paddingTop = 80;
  const paddingBottom = 80;
  const paddingLeft = 80;
  const paddingRight = 80;
  
  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;
  
  const maxDepth = Math.max(depth, 500);
  const scaleY = chartHeight / maxDepth;
  const scaleX = chartWidth / (drillHoles.length + 1);

  const getY = (depthValue: number) => paddingTop + (depthValue * scaleY);
  const getX = (index: number) => paddingLeft + ((index + 1) * scaleX);

  return (
    <Card className="border-2 border-slate-200 overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Геологический разрез: {siteName}</CardTitle>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Глубина: {depth} м
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative bg-gradient-to-b from-sky-100 via-slate-50 to-slate-100 rounded-lg p-4">
          <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
            {/* Небо и поверхность */}
            <defs>
              <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#87CEEB" />
                <stop offset="100%" stopColor="#E0F0FF" />
              </linearGradient>
              <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8FBC8F" />
                <stop offset="100%" stopColor="#6B8E23" />
              </linearGradient>
            </defs>

            {/* Небо */}
            <rect x="0" y="0" width={svgWidth} height={paddingTop} fill="url(#skyGradient)" />
            
            {/* Солнце */}
            <circle cx={svgWidth - 100} cy={40} r={25} fill="#FFD700" opacity="0.8" />

            {/* Поверхность земли */}
            <path
              d={`M0,${paddingTop} Q${svgWidth/4},${paddingTop - 10} ${svgWidth/2},${paddingTop} T${svgWidth},${paddingTop}`}
              fill="url(#groundGradient)"
              stroke="#6B8E23"
              strokeWidth="2"
            />

            {/* Облака */}
            <g opacity="0.6">
              <ellipse cx={200} cy={30} rx={40} ry={15} fill="white" />
              <ellipse cx={220} cy={25} rx={30} ry={12} fill="white" />
            </g>

            {/* Геологические слои */}
            {rockLayers.map((layer, idx) => {
              const y = getY(layer.depth);
              const height = layer.thickness * scaleY;
              const isHovered = hoveredLayer === layer.name;
              
              return (
                <g key={idx}>
                  <rect
                    x={paddingLeft}
                    y={y}
                    width={chartWidth}
                    height={height}
                    fill={layer.color}
                    fillOpacity={isHovered ? 0.9 : 0.7}
                    stroke={isHovered ? '#000' : '#333'}
                    strokeWidth={isHovered ? 2 : 1}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredLayer(layer.name)}
                    onMouseLeave={() => setHoveredLayer(null)}
                  >
                    <title>{`${layer.name} (${layer.depth}м - ${layer.depth + layer.thickness}м)`}</title>
                  </rect>
                  {height > 20 && (
                    <text
                      x={paddingLeft + 10}
                      y={y + height / 2}
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                      style={{ textShadow: '1px 1px 2px black' }}
                    >
                      {layer.name}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Минеральные залежи */}
            {drillHoles.map((hole, holeIdx) => {
              const x = getX(holeIdx);
              return hole.minerals.map((mineral, minIdx) => {
                const mineralType = minerals.find(m => 
                  m.name.toLowerCase().includes(mineral.mineral.toLowerCase()) ||
                  mineral.mineral.toLowerCase().includes(m.type)
                )?.type || 'associated';
                
                const y1 = getY(mineral.depthFrom);
                const y2 = getY(mineral.depthTo);
                const isSelected = selectedMineral === mineral.mineral;
                
                return (
                  <g key={`${holeIdx}-${minIdx}`}>
                    <rect
                      x={x - 15}
                      y={y1}
                      width={30}
                      height={y2 - y1}
                      fill={mineralColors[mineralType] || '#FFA500'}
                      fillOpacity={isSelected ? 1 : 0.8}
                      stroke={isSelected ? '#000' : 'none'}
                      strokeWidth={2}
                      rx={3}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedMineral(isSelected ? null : mineral.mineral)}
                    >
                      <title>{`${mineral.mineral}: ${mineral.grade} г/т\nГлубина: ${mineral.depthFrom}-${mineral.depthTo}м`}</title>
                    </rect>
                    {y2 - y1 > 30 && (
                      <text
                        x={x}
                        y={(y1 + y2) / 2}
                        fill="white"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                        style={{ textShadow: '1px 1px 2px black' }}
                      >
                        {mineral.mineral}
                      </text>
                    )}
                  </g>
                );
              });
            })}

            {/* Скважины */}
            {drillHoles.map((hole, idx) => {
              const x = getX(idx);
              const isHovered = hoveredHole === hole.id;
              const holeDepth = Math.min(hole.depth, maxDepth);
              
              return (
                <g key={hole.id}>
                  {/* Ствол скважины */}
                  <line
                    x1={x}
                    y1={paddingTop}
                    x2={x}
                    y2={getY(holeDepth)}
                    stroke={isHovered ? '#FF4500' : '#8B4513'}
                    strokeWidth={isHovered ? 6 : 4}
                    strokeDasharray={hole.status === 'drilling' ? '10,5' : 'none'}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredHole(hole.id)}
                    onMouseLeave={() => setHoveredHole(null)}
                  >
                    <title>{`${hole.name}\nГлубина: ${hole.depth}м\nСтатус: ${hole.status}`}</title>
                  </line>

                  {/* Анимация бурения */}
                  {hole.status === 'drilling' && (
                    <circle cx={x} cy={getY(holeDepth)} r={8} fill="#FF4500" opacity="0.8" />
                  )}

                  {/* Устье скважины */}
                  <rect
                    x={x - 20}
                    y={paddingTop - 25}
                    width={40}
                    height={25}
                    fill="#696969"
                    rx={5}
                  />
                  <text
                    x={x}
                    y={paddingTop - 8}
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {hole.name}
                  </text>

                  {/* Маркеры глубины */}
                  {[100, 200, 300, 400, 500].filter(d => d <= holeDepth).map((d) => {
                    const y = getY(d);
                    return (
                      <g key={d}>
                        <line x1={x - 10} y1={y} x2={x + 10} y2={y} stroke="#666" strokeWidth="1" />
                        <text x={x + 15} y={y + 4} fill="#666" fontSize="8">
                          {d}м
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })}

            {/* Шкала глубины слева */}
            <g>
              {Array.from({ length: Math.ceil(maxDepth / 50) + 1 }, (_, i) => i * 50).map((d) => {
                const y = getY(d);
                return (
                  <g key={d}>
                    <line x1={paddingLeft - 10} y1={y} x2={paddingLeft} y2={y} stroke="#333" strokeWidth="2" />
                    <text x={paddingLeft - 15} y={y + 4} fill="#333" fontSize="12" textAnchor="end" fontWeight="bold">
                      {d}м
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Легенда минералов */}
            <g transform={`translate(${paddingLeft}, ${svgHeight - 60})`}>
              <rect x="0" y="0" width={chartWidth} height="50" fill="white" fillOpacity="0.9" rx="5" />
              <text x="10" y="20" fill="#333" fontSize="12" fontWeight="bold">Минералы:</text>
              {minerals.map((m, idx) => (
                <g key={m.type} transform={`translate(${80 + idx * 120}, 10)`}>
                  <rect x="0" y="0" width="12" height="12" fill={mineralColors[m.type]} rx="2" />
                  <text x="18" y="10" fill="#333" fontSize="10">{m.name}</text>
                </g>
              ))}
            </g>

            {/* Интерактивная подсказка */}
            {hoveredHole && (
              <g>
                {(() => {
                  const hole = drillHoles.find(h => h.id === hoveredHole);
                  if (!hole) return null;
                  return (
                    <g>
                      <rect
                        x={getX(drillHoles.indexOf(hole)) - 100}
                        y={paddingTop - 60}
                        width={200}
                        height={35}
                        fill="black"
                        fillOpacity="0.8"
                        rx="5"
                      />
                      <text x={getX(drillHoles.indexOf(hole))} y={paddingTop - 40} fill="white" fontSize="12" textAnchor="middle">
                        {hole.name}: {hole.depth}м
                      </text>
                    </g>
                  );
                })()}
              </g>
            )}
          </svg>

          {/* Информационная панель снизу */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 backdrop-blur p-3 rounded-lg">
              <h4 className="font-bold text-sm mb-2">Интерактивность:</h4>
              <ul className="text-xs space-y-1 text-slate-700">
                <li>• Наведите на скважины для деталей</li>
                <li>• Кликните на залежи для выбора</li>
                <li>• Наведите на слои для названия</li>
              </ul>
            </div>
            <div className="bg-white/80 backdrop-blur p-3 rounded-lg">
              <h4 className="font-bold text-sm mb-2">Статус скважин:</h4>
              <div className="flex gap-2 flex-wrap">
                {drillHoles.map(h => (
                  <Badge key={h.id} variant={h.status === 'completed' ? 'default' : h.status === 'drilling' ? 'destructive' : 'secondary'}>
                    {h.name}: {h.depth}м
                  </Badge>
                ))}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur p-3 rounded-lg">
              <h4 className="font-bold text-sm mb-2">Выбранный минерал:</h4>
              {selectedMineral ? (
                <Badge className="text-lg px-3 py-1" style={{ backgroundColor: mineralColors[selectedMineral.toLowerCase()] || '#888' }}>
                  {selectedMineral}
                </Badge>
              ) : (
                <p className="text-xs text-slate-600">Кликните на залежь для выбора</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}