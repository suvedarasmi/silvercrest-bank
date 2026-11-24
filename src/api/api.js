import { mockRequest, mockLogin } from './mock';
const base = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const mockEnabled = !base || import.meta.env.VITE_USE_MOCK_API === 'true';
const timeoutMs = 15000;
let token = localStorage.getItem('silvercrest-token') || '';
export const isMockMode = mockEnabled;
export function setToken(value) { token = value || ''; if (token) localStorage.setItem('silvercrest-token', token); else localStorage.removeItem('silvercrest-token'); }
export function getToken() { return token; }
export async function login(email, password, demoRole) {
  if (mockEnabled) { const result = await mockLogin(email, password, demoRole); setToken(result.token); return result; }
  // Backend authentication endpoint is assumed to return the Firebase ID token; align this path with the backend when its auth route is finalized.
  const result = await request('/api/auth/login', { method: 'POST', body: { email, password } });
  setToken(result.token); return result;
}
export async function logout() { setToken(''); }
export async function request(path, { method = 'GET', body, headers = {}, multipart = false } = {}) {
  if (mockEnabled) return mockRequest(path, method, body, token);
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(base + path, { method, headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(multipart ? {} : body !== undefined ? { 'Content-Type': 'application/json' } : {}), ...headers }, body: body === undefined ? undefined : multipart ? body : JSON.stringify(body), signal: controller.signal });
    const text = await response.text(); let data = null; try { data = text ? JSON.parse(text) : null; } catch { data = text; }
    if (!response.ok) { const message = data?.message || data?.error || `Request failed (${response.status})`; const error = new Error(message); error.status = response.status; error.data = data; throw error; }
    return data;
  } catch (error) { if (error.name === 'AbortError') throw new Error('Request timed out. Please try again.'); throw error; }
  finally { clearTimeout(timer); }
}
export const api = {
  me: () => request('/api/me'),
  register: formData => request('/api/register', { method: 'POST', body: formData, multipart: true }),
  applicationStatus: email => request(`/api/application-status?email=${encodeURIComponent(email)}`),
  accounts: () => request('/api/accounts'),
  statement: (accountId, query = '') => request(`/api/accounts/${encodeURIComponent(accountId)}/statement${query}`),
  beneficiaries: () => request('/api/beneficiaries'),
  addBeneficiary: body => request('/api/beneficiaries', { method: 'POST', body }),
  updateBeneficiary: (id, body) => request(`/api/beneficiaries/${id}`, { method: 'PATCH', body }),
  deleteBeneficiary: id => request(`/api/beneficiaries/${id}`, { method: 'DELETE' }),
  internalTransfer: body => request('/api/transfers/internal', { method: 'POST', body, headers: { 'Idempotency-Key': body.requestId || crypto.randomUUID() } }),
  scheduled: () => request('/api/scheduled-transfers'), createScheduled: body => request('/api/scheduled-transfers', { method: 'POST', body }), deleteScheduled: id => request(`/api/scheduled-transfers/${id}`, { method: 'DELETE' }),
  fds: () => request('/api/fds'), createFd: body => request('/api/fds', { method: 'POST', body }), closeFd: id => request(`/api/fds/${id}/close`, { method: 'POST' }),
  rds: () => request('/api/rds'), createRd: body => request('/api/rds', { method: 'POST', body }),
  loans: () => request('/api/loans'), applyLoan: body => request('/api/loans', { method: 'POST', body }), loanSchedule: id => request(`/api/loans/${id}/schedule`), prepayLoan: (id, body) => request(`/api/loans/${id}/prepay`, { method: 'POST', body }),
  cards: () => request('/api/cards'), requestCard: body => request('/api/cards', { method: 'POST', body }), cardAction: (id, action, body) => request(`/api/cards/${id}/${action}`, { method: 'POST', body }),
  serviceRequests: () => request('/api/service-requests'), createServiceRequest: body => request('/api/service-requests', { method: 'POST', body }), tickets: () => request('/api/tickets'), createTicket: body => request('/api/tickets', { method: 'POST', body }),
  notifications: () => request('/api/notifications'), markRead: id => request(`/api/notifications/${id}/read`, { method: 'POST' }), portfolio: () => request('/api/portfolio'),
  adminDashboard: () => request('/api/admin/dashboard'), applications: status => request(`/api/admin/applications${status ? `?status=${encodeURIComponent(status)}` : ''}`), decision: (id, body) => request(`/api/admin/applications/${id}/decision`, { method: 'POST', body }), customers: () => request('/api/admin/customers'), customerAction: (id, action) => request(`/api/admin/customers/${id}/${action}`, { method: 'POST' }),
  limits: id => request(`/api/admin/limits/${id}`), saveLimits: (id, body) => request(`/api/admin/limits/${id}`, { method: 'PUT', body }), defaultLimits: () => request('/api/admin/limits/default'), saveDefaultLimits: body => request('/api/admin/limits/default', { method: 'PUT', body }), bank: () => request('/api/admin/bank'), saveBank: body => request('/api/admin/bank', { method: 'PUT', body }), directory: () => request('/directory/banks'), adminLoans: () => request('/api/admin/loans'), loanDecision: (id, body) => request(`/api/admin/loans/${id}/decision`, { method: 'POST', body }), adminRequests: () => request('/api/admin/requests'), adminTransactions: () => request('/api/admin/transactions'), audit: () => request('/api/admin/audit-log'), reports: type => request(`/api/admin/reports?type=${encodeURIComponent(type || 'transactions')}&format=csv`)
};
