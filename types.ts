
export type Language = 'zh' | 'en';
export type ModuleType = 'generation' | 'knowledge' | 'diagnosis' | 'analysis' | 'management';

export interface User {
  username: string;
  brand: string; // The tenant
  role: string;
  avatar: string;
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
