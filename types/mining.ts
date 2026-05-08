export interface MiningSite {
  id: string;
  name: string;
  code: string;
  location: {
    lat: number;
    lng: number;
    region: string;
    depth?: number; // глубина в метрах
  };
  minerals: MineralDeposit[];
  currentStage: 'exploration' | 'drilling' | 'evaluation' | 'extraction' | 'processing';
  stagesProgress: {
    exploration: number;
    drilling: number;
    evaluation: number;
    extraction: number;
    processing: number;
  };
  metrics: MiningMetrics;
  equipment: EquipmentStatus[];
  achievements: Achievement[];
  team: TeamMember[];
  geologyData: GeologyData;
}

export interface MineralDeposit {
  type: 'gold' | 'antimony' | 'beryllium' | 'tantalum' | 'associated';
  name: string;
  grade: number; // г/т
  reserves: number; // тонн
  confidence: 'indicated' | 'inferred' | 'measured';
  extractionRate: number; // %
  marketPrice: number; // $/т
}

export interface MiningMetrics {
  totalReserves: number; // унции золотого эквивалента
  dailyProduction: number; // тонн руды/день
  gradeAverage: number; // г/т среднее
  recoveryRate: number; // % извлечения
  stripRatio: number; // коэффициент вскрыши
  costPerTon: number; // $/т
  netPresentValue: number; // $ млн
  internalRateOfReturn: number; // %
  paybackPeriod: number; // месяцы
  safetyIndex: number; // 0-100
  environmentalCompliance: number; // %
}

export interface EquipmentStatus {
  id: string;
  name: string;
  type: 'drill' | 'excavator' | 'truck' | 'crusher' | 'mill' | 'separator';
  status: 'active' | 'maintenance' | 'standby' | 'broken';
  efficiency: number; // %
  hoursOperated: number;
  nextMaintenance: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number; // 0-100
  category: 'exploration' | 'extraction' | 'efficiency' | 'safety' | 'innovation';
}

export interface TeamMember {
  id: string;
  name: string;
  role: 'chief_engineer' | 'geologist' | 'driller' | 'miner' | 'metallurgist';
  experience: number; // лет
  performance: number; // %
  avatar?: string;
}

export interface GeologyData {
  rockType: string;
  age: string; // геологический период
  structure: string;
  drillHoles: DrillHole[];
  samples: GeochemicalSample[];
  resistivityMap?: number[][]; // геофизические данные
}

export interface DrillHole {
  id: string;
  name: string;
  depth: number;
  coordinates: { x: number; y: number };
  minerals: {
    depthFrom: number;
    depthTo: number;
    mineral: string;
    grade: number;
  }[];
  status: 'planned' | 'drilling' | 'completed';
}

export interface GeochemicalSample {
  id: string;
  location: { x: number; y: number };
  depth: number;
  gold?: number; // г/т
  antimony?: number; // %
  beryllium?: number; // г/т
  tantalum?: number; // г/т
  other?: Record<string, number>;
}