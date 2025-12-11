export type Language = 'zh' | 'en';
export type ModuleType = 'generation' | 'knowledge' | 'diagnosis' | 'analysis' | 'management';

export interface User {
  username: string;
  brand: string; // The tenant
  role: string;
  avatar: string;
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
export interface DiagnosisMetric {
  label: string;
  value: string | number;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
}

export interface ChartDataPoint {
  label: string;
  valueA: number; // e.g., WeCom
  valueB: number; // e.g., RedBook
}