export type ProjectStatus = 'Активен' | 'Планирование' | 'Завершен' | 'Приостановлен';
export type ProjectType = 'Производство' | 'Добыча' | 'Инфраструктура' | 'Агро';
export type RiskLevel = 'Низкий' | 'Средний' | 'Высокий' | 'Критический';

export type TaskStatus =
  | 'Завершено'
  | 'Не начато'
  | 'Частично выполнено'
  | 'По графику'
  | 'Будущая задача'
  | 'Отложено'
  | 'Ожидание'
  | 'Отменено'
  | 'Изменение задачи';

export type TaskCategory =
  | 'Площадка'
  | 'Процедура MIC'
  | 'Ремонт и строительство'
  | 'Проект строительства'
  | 'Технологический проект'
  | 'Доставка сырья'
  | 'Монтаж оборудования'
  | 'Разработка продуктов'
  | 'Сертификация продукции'
  | 'Система продаж'
  | 'Эксплуатация'
  | 'Мобильные комплексы'
  | 'Ключевые документы проекта';

export type TaskPriority = 'Низкий' | 'Средний' | 'Высокий' | 'Критический';

export type StakeholderType =
  | 'Инвестор'
  | 'Оператор'
  | 'Партнер'
  | 'Госкомпания Мьянмы'
  | 'Министерство/Ведомство'
  | 'Подрядчик'
  | 'Внутренний сотрудник'
  | 'Управляющая компания';

export type DocumentType =
  | 'Договор'
  | 'Разрешение'
  | 'Финансовая модель'
  | 'Отчет'
  | 'Техническая документация'
  | 'Сертификат'
  | 'Переписка'
  | 'Скан/фото';

export type DocumentAccessLevel = 'Public' | 'Confidential' | 'Strictly Confidential';

export type ProductCategory =
  | 'Биопрепараты'
  | 'Органические удобрения'
  | 'Почвенные мелиораторы'
  | 'Монокремниевая кислота'
  | 'Никель'
  | 'Свинец, цинк, серебро';

export type EventType =
  | 'task_completed'
  | 'risk_detected'
  | 'document_added'
  | 'deadline_approaching'
  | 'milestone_reached';

export interface Project {
  id: string;
  code: string;
  name: string;
  type: ProjectType;
  description: string;
  companyId: string;
  progress: number;
  status: ProjectStatus;
  riskLevel: RiskLevel;
  budget: number;
  budgetSpent: number;
  startDate: string;
  endDate: string;
  location?: {
    lat: number;
    lng: number;
  };
  region?: string;
  teamMembers: string[];
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  name: string;
  date: string;
  completed: boolean;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  category: TaskCategory;
  projectId: string;
  assigneeId: string;
  observers: string[];
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  endDate: string;
  duration: number;
  budget?: number;
  dependencies: string[];
  progress: number;
  subtasks: Subtask[];
}

export interface Subtask {
  id: string;
  name: string;
  completed: boolean;
}

export interface Company {
  id: string;
  name: string;
  type: StakeholderType;
  country: string;
  description?: string;
  contact: {
    phone?: string;
    email?: string;
    address?: string;
  };
  projects: string[];
}

export interface Stakeholder {
  id: string;
  name: string;
  position: string;
  companyId: string;
  type: StakeholderType;
  contact: {
    phone?: string;
    email?: string;
  };
  projects: string[];
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  applications: string[];
  certificates: Certificate[];
  projectIds: string[];
  markets: string[];
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  projectId?: string;
  uploadDate: string;
  uploadedBy: string;
  version: number;
  accessLevel: DocumentAccessLevel;
  tags: string[];
  fileSize: number;
  fileType: string;
  url: string;
}

export interface MapPoint {
  id: string;
  name: string;
  type: 'factory' | 'mine' | 'port' | 'warehouse' | 'logistics';
  coordinates: {
    lat: number;
    lng: number;
  };
  projectId?: string;
  status: ProjectStatus;
  description: string;
}

export interface ActivityEvent {
  id: string;
  type: EventType;
  title: string;
  description: string;
  timestamp: string;
  projectId?: string;
  taskId?: string;
  userId: string;
  riskLevel?: RiskLevel;
}

export interface KPIData {
  activeProjects: number;
  tasksInProgress: number;
  tasksOverdue: number;
  highRisks: number;
  documentsForApproval: number;
  planCompletion: number;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  level: RiskLevel;
  probability: number;
  impact: number;
  projectId: string;
  status: 'Выявлен' | 'В обработке' | 'Устранен';
  mitigationPlan?: string;
  owner: string;
  detectedDate: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: 'view' | 'edit' | 'delete' | 'download' | 'upload';
  objectType: 'project' | 'task' | 'document' | 'company';
  objectId: string;
  objectName: string;
  ipAddress: string;
  details?: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: {
    projects: PermissionLevel;
    tasks: PermissionLevel;
    documents: PermissionLevel;
    companies: PermissionLevel;
    analytics: PermissionLevel;
    security: PermissionLevel;
  };
}

export type PermissionLevel = 'none' | 'read' | 'write' | 'delete' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  avatar?: string;
  department?: string;
}