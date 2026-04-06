// =====================================================
// ТИПЫ ДАННЫХ ДЛЯ ПОЛИТИКО-ЭКОНОМИЧЕСКОЙ АНАЛИТИКИ МЬЯНМЫ
// =====================================================

// Уровни риска
export type IntelligenceRiskLevel = 'Критический' | 'Высокий' | 'Средний' | 'Низкий' | 'Минимальный';

// Статус верификации
export type VerificationStatus = 
  | 'Подтверждено' 
  | 'Частично подтверждено' 
  | 'Требует верификации' 
  | 'Противоречивые сигналы' 
  | 'Устарело' 
  | 'Архив';

// Тип источника
export type SourceType = 
  | 'Государственный' 
  | 'Международная организация' 
  | 'СМИ' 
  | 'NGO' 
  | 'Разведывательный' 
  | 'Коммерческий' 
  | 'Академический' 
  | 'Социальные сети';

// Уровень надежности источника
export type SourceReliability = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

// Уровень достоверности информации
export type InformationCredibility = '1' | '2' | '3' | '4' | '5' | '6';

// Тег события
export type EventTag = 'Факт' | 'Аналитика' | 'Предположение' | 'Предупреждение';

// Тип политического события
export type PoliticalEventType = 
  | 'Смена власти' 
  | 'Военный конфликт' 
  | 'Переговоры' 
  | 'Санкции' 
  | 'Протест' 
  | 'Выборы' 
  | 'Дипломатия' 
  | 'Законодательство';

// Тип экономического индикатора
export type EconomicIndicatorType = 
  | 'ВВП' 
  | 'Инфляция' 
  | 'Курс валюты' 
  | 'Торговый баланс' 
  | 'Инвестиции' 
  | 'Безработица' 
  | 'Добыча ресурсов' 
  | 'Экспорт';

// Тип влияния на проект
export type ImpactType = 'Политический' | 'Логистический' | 'Контрагентский' | 'Регуляторный' | 'Макроэкономический';

// Статус решения
export type DecisionStatus = 'Ожидает' | 'Подтверждено' | 'Отклонено' | 'На пересмотре';

// =====================================================
// ОСНОВНЫЕ СУЩНОСТИ
// =====================================================

// Снимок рисков страны
export interface CountryRiskSnapshot {
  id: string;
  timestamp: string;
  country: string;
  overallRisk: IntelligenceRiskLevel;
  politicalStability: number; // 0-100
  conflictIntensity: number; // 0-100
  operationalAccessibility: number; // 0-100
  logisticalRisk: number; // 0-100
  currencyMacroRisk: number; // 0-100
  openAlerts: number;
  affectedProjects: number;
  lastUpdate: string;
  analystSummary: string;
  weeklyChanges: WeeklyChange[];
  keySignals: KeySignal[];
}

// Изменение за неделю
export interface WeeklyChange {
  indicator: string;
  previousValue: number;
  currentValue: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  significance: 'high' | 'medium' | 'low';
}

// Ключевой сигнал
export interface KeySignal {
  id: string;
  title: string;
  description: string;
  severity: IntelligenceRiskLevel;
  timestamp: string;
  source: string;
  verified: boolean;
}

// Политическое событие
export interface PoliticalEvent {
  id: string;
  type: PoliticalEventType;
  title: string;
  description: string;
  timestamp: string;
  region: string;
  actors: string[];
  impact: IntelligenceRiskLevel;
  verificationStatus: VerificationStatus;
  sources: SourceRecord[];
  aiInterpretation?: string;
  confirmedFacts: string[];
  disputedSignals: string[];
}

// Экономический индикатор
export interface EconomicIndicator {
  id: string;
  type: EconomicIndicatorType;
  name: string;
  value: number;
  unit: string;
  previousValue: number;
  changePercent: number;
  timestamp: string;
  region?: string;
  forecast?: number;
  impactOnProjects: string;
  verificationStatus: VerificationStatus;
  source: SourceRecord;
}

// Источник данных
export interface SourceRecord {
  id: string;
  name: string;
  type: SourceType;
  publishDate: string;
  receiveDate: string;
  region: string;
  topic: string;
  reliability: SourceReliability;
  credibility: InformationCredibility;
  verificationStatus: VerificationStatus;
  independentConfirmations: number;
  url?: string;
  internalNotes: string;
  tag: EventTag;
  analystId: string;
}

// Запись верификации
export interface VerificationRecord {
  id: string;
  sourceId: string;
  verifiedBy: string;
  verificationDate: string;
  status: VerificationStatus;
  confidence: number; // 0-100
  notes: string;
  conflictingSources?: string[];
}

// Воздействие на проект
export interface ProjectExposure {
  id: string;
  projectId: string;
  projectName: string;
  projectCode: string;
  region: string;
  industry: string;
  currentRiskScore: number; // 0-100
  riskChange7d: number;
  riskChange30d: number;
  impactTypes: ImpactType[];
  recommendedAction: string;
  decisionStatus: DecisionStatus;
  decisionOwner?: string;
  lastReviewDate: string;
  affectedMilestones: string[];
  mitigationPlan?: string;
}

// Риск-алерт
export interface RiskAlert {
  id: string;
  title: string;
  description: string;
  severity: IntelligenceRiskLevel;
  category: string;
  region: string;
  timestamp: string;
  source: SourceRecord;
  affectedProjects: string[];
  escalationLevel: number; // 1-5
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  expiresAt?: string;
}

// AI-инсайт
export interface AIInsight {
  id: string;
  title: string;
  description: string;
  confidence: number; // 0-100
  category: string;
  timestamp: string;
  basedOnSources: string[];
  hypothesis: string;
  supportingEvidence: string[];
  contradictingEvidence: string[];
  recommendedActions: string[];
  humanReviewRequired: boolean;
  reviewStatus?: 'Ожидает' | 'Принято' | 'Отклонено';
}

// Ручная проверка
export interface HumanReview {
  id: string;
  insightId: string;
  reviewedBy: string;
  reviewDate: string;
  decision: 'Принято' | 'Отклонено' | 'Требует уточнения';
  comments: string;
  riskScoreChange?: number;
  affectedProjects: string[];
}

// Запись журнала решений
export interface DecisionLogEntry {
  id: string;
  timestamp: string;
  signal: string;
  aiRecommendation: string;
  decidedBy?: string;
  decision: DecisionStatus;
  decisionDate?: string;
  comments?: string;
  affectedProjects: string[];
  riskScoreChanged: boolean;
  previousRiskScore?: number;
  newRiskScore?: string;
  reevaluated: boolean;
  modelVersion?: string;
}

// =====================================================
// ФИЛЬТРЫ И ПАРАМЕТРЫ ЗАПРОСОВ
// =====================================================

export interface IntelligenceFilters {
  regions?: string[];
  riskLevels?: IntelligenceRiskLevel[];
  verificationStatus?: VerificationStatus[];
  sourceTypes?: SourceType[];
  dateFrom?: string;
  dateTo?: string;
  tags?: EventTag[];
  projectIds?: string[];
  impactTypes?: ImpactType[];
}

export interface DashboardMetrics {
  countryStatus: string;
  overallRisk: IntelligenceRiskLevel;
  politicalStability: number;
  conflictIntensity: number;
  operationalAccessibility: number;
  logisticalRisk: number;
  currencyMacroRisk: number;
  openCriticalAlerts: number;
  affectedProjectsCount: number;
  lastUpdate: string;
  sourcesQuality: {
    total: number;
    verified: number;
    pending: number;
    conflicting: number;
  };
}