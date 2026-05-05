export interface User {
  id: string;
  username: string;
  createdAt: string;
  lastLogin: string;
  deploysToday: number;
  lastDeployDate: string | null;
  totalDeploys: number;
  credits: number;
  isAdmin: boolean;
  isBanned: boolean;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail: string | null;
  fields: TemplateField[];
  createdAt: string;
  deployments: number;
  html?: string;
}

export interface TemplateField {
  key: string;
  label: string;
  type: 'text' | 'textarea';
  default: string;
}

export interface Deployment {
  id: string;
  username: string;
  templateId: string;
  url: string;
  data: Record<string, string>;
  deployedAt: string;
  views: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface AdminSettings {
  password: string;
  theme: ThemeSettings;
  maintenanceMode: boolean;
  maintenanceMessage: string;
  contact: ContactInfo;
  limits: Limits;
  analytics: Analytics;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  cardColor: string;
  textColor: string;
  title: string;
  logo: string | null;
  favicon: string | null;
}

export interface ContactInfo {
  whatsapp: string;
  telegram: string;
  email: string;
}

export interface Limits {
  freeDeploysPerDay: number;
  creditCostPerDeploy: number;
}

export interface Analytics {
  totalUsers: number;
  totalDeployments: number;
  totalTemplates: number;
  activeUsers: number;
}

export interface DeployCheck {
  canDeploy: boolean;
  freeDeploysLeft: number;
  credits: number;
  creditCost: number;
}
