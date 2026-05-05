const API_BASE = '';

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }
  return response.json();
}

export const api = {
  // Auth
  checkUsername: (username: string) =>
    fetchJSON<{ available: boolean }>(`/api/auth/check/${username}`),
  register: (username: string) =>
    fetchJSON<{ success: boolean; user: import('@/types').User }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username }),
    }),
  login: (username: string) =>
    fetchJSON<{ success: boolean; user: import('@/types').User }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username }),
    }),
  getUser: (username: string) =>
    fetchJSON<import('@/types').User>(`/api/auth/user/${username}`),

  // Templates
  getCategories: () =>
    fetchJSON<import('@/types').Category[]>('/api/templates/categories'),
  getTemplates: (categoryId: string, page?: number, limit?: number, search?: string) =>
    fetchJSON<{ templates: import('@/types').Template[]; total: number; page: number; totalPages: number }>(
      `/api/templates/category/${categoryId}?page=${page || 1}&limit=${limit || 20}&search=${search || ''}`
    ),
  getAllTemplates: (page?: number, limit?: number, search?: string, category?: string) =>
    fetchJSON<{ templates: import('@/types').Template[]; total: number; page: number; totalPages: number }>(
      `/api/templates/all?page=${page || 1}&limit=${limit || 20}&search=${search || ''}&category=${category || ''}`
    ),
  getTemplate: (templateId: string) =>
    fetchJSON<import('@/types').Template & { html: string }>(`/api/templates/${templateId}`),

  // Deploy
  checkDeploy: (username: string) =>
    fetchJSON<import('@/types').DeployCheck>('/api/deploy/check', {
      method: 'POST',
      body: JSON.stringify({ username }),
    }),
  deploy: (username: string, templateId: string, data: Record<string, string>) =>
    fetchJSON<{ success: boolean; deployment: import('@/types').Deployment; freeDeploysLeft: number; credits: number }>('/api/deploy', {
      method: 'POST',
      body: JSON.stringify({ username, templateId, data }),
    }),
  getUserDeployments: (username: string) =>
    fetchJSON<import('@/types').Deployment[]>(`/api/deploy/user/${username}`),

  // Credits
  getCredits: (username: string) =>
    fetchJSON<{ credits: number; history: any[] }>(`/api/credits/${username}`),

  // Admin
  adminLogin: (password: string) =>
    fetchJSON<{ success: boolean; token: string }>('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    }),
  getAdminStats: (password: string) =>
    fetchJSON<any>('/api/admin/stats', { headers: { 'x-admin-key': password } }),
  getAdminUsers: (password: string) =>
    fetchJSON<import('@/types').User[]>('/api/admin/users', { headers: { 'x-admin-key': password } }),
  getAdminDeployments: (password: string) =>
    fetchJSON<import('@/types').Deployment[]>('/api/admin/deployments', { headers: { 'x-admin-key': password } }),
  getPublicSettings: () =>
    fetchJSON<{ theme: import('@/types').ThemeSettings; contact: import('@/types').ContactInfo; limits: import('@/types').Limits; maintenanceMode: boolean; maintenanceMessage: string }>('/api/admin/public-settings'),
  getMaintenanceStatus: () =>
    fetchJSON<{ enabled: boolean; message: string }>('/api/admin/maintenance-status'),
  assignCredits: (password: string, username: string, amount: number, note?: string) =>
    fetchJSON('/api/credits/assign', {
      method: 'POST',
      headers: { 'x-admin-key': password },
      body: JSON.stringify({ username, amount, note }),
    }),
  removeCredits: (password: string, username: string, amount: number, note?: string) =>
    fetchJSON('/api/credits/remove', {
      method: 'POST',
      headers: { 'x-admin-key': password },
      body: JSON.stringify({ username, amount, note }),
    }),
  toggleMaintenance: (password: string, enabled: boolean, message?: string) =>
    fetchJSON('/api/admin/maintenance', {
      method: 'POST',
      headers: { 'x-admin-key': password },
      body: JSON.stringify({ enabled, message }),
    }),
  updateTheme: (password: string, theme: Partial<import('@/types').ThemeSettings>) =>
    fetchJSON('/api/admin/theme', {
      method: 'POST',
      headers: { 'x-admin-key': password },
      body: JSON.stringify(theme),
    }),
  updateContact: (password: string, contact: Partial<import('@/types').ContactInfo>) =>
    fetchJSON('/api/admin/contact', {
      method: 'POST',
      headers: { 'x-admin-key': password },
      body: JSON.stringify(contact),
    }),
  updateLimits: (password: string, limits: Partial<import('@/types').Limits>) =>
    fetchJSON('/api/admin/limits', {
      method: 'POST',
      headers: { 'x-admin-key': password },
      body: JSON.stringify(limits),
    }),
  banUser: (password: string, username: string, ban: boolean) =>
    fetchJSON('/api/admin/user/ban', {
      method: 'POST',
      headers: { 'x-admin-key': password },
      body: JSON.stringify({ username, ban }),
    }),
};
