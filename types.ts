export type UserRole = 'Student' | 'Farmer' | 'Gig Worker' | 'Citizen';

export interface Comment {
  id: string;
  userRole: UserRole;
  text: string;
  lang: string;
  category: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  reply: string;
  flagged: boolean;
  timestamp: Date;
}

export enum AppTab {
  CITIZEN = 'CITIZEN',
  DASHBOARD = 'DASHBOARD',
  ARCHITECTURE = 'ARCHITECTURE'
}

export interface MetricData {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}