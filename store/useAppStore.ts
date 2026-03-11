import { create } from 'zustand';
import {
  projects,
  tasks,
  companies,
  documents,
  products,
  mapPoints,
  events,
  kpiData,
  users,
  stakeholders,
  roles,
  auditLogs,
  risks,
} from '@/mock-data';
import {
  Project,
  Task,
  Company,
  Document,
  Product,
  MapPoint,
  ActivityEvent,
  KPIData,
  User,
  Stakeholder,
  Role,
  AuditLog,
  Risk,
} from '@/types';

interface AppState {
  projects: Project[];
  tasks: Task[];
  companies: Company[];
  documents: Document[];
  products: Product[];
  mapPoints: MapPoint[];
  events: ActivityEvent[];
  kpiData: KPIData;
  users: User[];
  stakeholders: Stakeholder[];
  roles: Role[];
  auditLogs: AuditLog[];
  risks: Risk[];
  currentUser: User | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  getProjectById: (id: string) => Project | undefined;
  getTaskById: (id: string) => Task | undefined;
  getCompanyById: (id: string) => Company | undefined;
  getDocumentById: (id: string) => Document | undefined;
  getProductById: (id: string) => Product | undefined;
  getUserById: (id: string) => User | undefined;
  getTasksByProject: (projectId: string) => Task[];
  getDocumentsByProject: (projectId: string) => Document[];
  getRisksByProject: (projectId: string) => Risk[];
}

export const useAppStore = create<AppState>((set, get) => ({
  projects,
  tasks,
  companies,
  documents,
  products,
  mapPoints,
  events,
  kpiData,
  users,
  stakeholders,
  roles,
  auditLogs,
  risks,
  currentUser: users[0],
  searchQuery: '',

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  getProjectById: (id: string) => {
    return get().projects.find((p) => p.id === id);
  },

  getTaskById: (id: string) => {
    return get().tasks.find((t) => t.id === id);
  },

  getCompanyById: (id: string) => {
    return get().companies.find((c) => c.id === id);
  },

  getDocumentById: (id: string) => {
    return get().documents.find((d) => d.id === id);
  },

  getProductById: (id: string) => {
    return get().products.find((p) => p.id === id);
  },

  getUserById: (id: string) => {
    return get().users.find((u) => u.id === id);
  },

  getTasksByProject: (projectId: string) => {
    return get().tasks.filter((t) => t.projectId === projectId);
  },

  getDocumentsByProject: (projectId: string) => {
    return get().documents.filter((d) => d.projectId === projectId);
  },

  getRisksByProject: (projectId: string) => {
    return get().risks.filter((r) => r.projectId === projectId);
  },
}));
