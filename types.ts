export type Language = 'zh' | 'en';
export type ModuleType = 'generation' | 'knowledge' | 'diagnosis' | 'analysis' | 'management';

export interface User {
  username: string;
  brand: string; // The tenant
  role: string;
  avatar: string;
}

// Generation Memory Types
export interface MemoryContext {
  contextual: {
    timeNode: string; // e.g., "Morning", "Pre-event", "Birthday"
    specialNeeds: string; // e.g., "Preparing for wedding", "Pregnant"
    purchaseHistory: string; // e.g., "Bought Revitalift Serum last month"
    appointments: string; // e.g., "Facial booked for next Tuesday"
  };
  emotional: {
    communicationPref: string; // e.g., "Direct", "Chatty", "Needs reassurance"
    sensitiveTopics: string; // e.g., "Price sensitivity", "Allergy fears"
    successHistory: string; // e.g., "Liked the Vitamin C serum recommendation"
  };
}

// Knowledge Types
export interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'pdf' | 'docx' | 'img';
  size?: string;
  date: string;
}

export interface ServiceRecord {
  id: string;
  customerName: string;
  date: string;
  type: string; // e.g., Consultation, After-sales
  summary: string;
  status: 'Completed' | 'Pending';
}

export interface ChatRecord {
  id: string;
  customerName: string;
  date: string;
  topic: string;
  snippet: string;
  channel: 'WeCom' | 'Tmall';
}

// Management Types
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  avatar: string;
}

export interface PermissionNode {
  id: string;
  label: string;
  category: string;
}

export interface GenResult {
  id: string;
  text: string;
  version: number;
  originality: number;
  tokens: number;
  compliancePassed: boolean;
  timestamp: Date;
  prompt?: string;
}

export interface TagCategory {
  id: string;
  name: string;
  tags: string[];
}

export interface AudienceData {
  crm: TagCategory[];
  wecom: TagCategory[];
}

export interface TrendPoint {
  title: string;
  items: string[];
}

export interface TrendDetail {
  overview: string;
  points: TrendPoint[];
  tags: string[];
}

export interface TrendItem {
  id: string;
  rank: number;
  title: string;
  date: string;
  heat: number;
  description?: string;
  // New fields for detail view
  region?: string;
  sourceCount?: number;
  details?: TrendDetail;
}

export interface TrendCategory {
  id: string;
  hashtag: string;
  category: string; // e.g., "Aesthetics", "Skincare Tech"
  description: string;
  count: number;
  items: TrendItem[];
}

// Diagnosis Types
export interface DiagnosisKPI {
  id: string;
  label: string;
  value: string;
  trend: string; // "+2.3% vs Last Week"
  trendDirection: 'up' | 'down';
  iconType: 'click' | 'conversion' | 'like' | 'time' | 'coins' | 'wallet' | 'message' | 'zap';
}

export interface DiagnosisChannelData {
  channel: string;
  generated: number;
  used: number;
  clickRate: string;
  conversionRate: string;
  trend: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  frequency: number;
  lastUpdated: string;
}

export interface ModelHealthMetric {
  name: string;
  status: 'Healthy' | 'Degraded' | 'Down';
  latency: string;
  errorRate: string;
}