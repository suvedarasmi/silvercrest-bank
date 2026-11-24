const STORE = 'silvercrest-mock-bank-v1';
const seed = {
  customers: [{ id: 'CUS1001', name: 'Ananya Sharma', email: 'customer@silvercrest.test', phone: '9876543210', status: 'ACTIVE', accountNumber: '•••• 4821', balanceMinor: 2487500, role: 'CUSTOMER' }, { id: 'CUS1002', name: 'Rohan Mehta', email: 'rohan@example.test', phone: '9876501234', status: 'ACTIVE', accountNumber: '•••• 1098', balanceMinor: 940000, role: 'CUSTOMER' }],
  applications: [{ id: 'APP2048', name: 'Priya Nair', email: 'priya@example.test', phone: '9876543211', submittedAt: '2026-11-22', status: 'PENDING', initialDepositMinor: 100000, pan: 'ABCDE•••4F', aadhaar: '•••• •••• 1234' }],
  accounts: [{ id: 'ACC1001', accountNumber: '100001004821', type: 'Savings Account', status: 'ACTIVE', balanceMinor: 2487500, availableMinor: 2437500, heldMinor: 50000, currency: 'INR' }, { id: 'ACC1002', accountNumber: '100001007712', type: 'Current Account', status: 'ACTIVE', balanceMinor: 500000, availableMinor: 500000, heldMinor: 0, currency: 'INR' }],
  transactions: [{ id: 'TXN92831', date: '2026-11-23T10:20:00+05:30', description: 'Salary credit', type: 'CREDIT', category: 'Income', amountMinor: 850000, status: 'COMPLETED', reference: 'SAL-NOV-92831' }, { id: 'TXN92830', date: '2026-11-22T18:45:00+05:30', description: 'Online shopping', type: 'DEBIT', category: 'Shopping', amountMinor: 429900, status: 'COMPLETED', reference: 'SC-92830' }, { id: 'TXN92829', date: '2026-11-21T13:12:00+05:30', description: 'Electricity bill', type: 'DEBIT', category: 'Bills', amountMinor: 183500, status: 'COMPLETED', reference: 'EB-92829' }, { id: 'TXN92828', date: '2026-11-20T09:05:00+05:30', description: 'Transfer from Rohan Mehta', type: 'CREDIT', category: 'Transfer', amountMinor: 250000, status: 'COMPLETED', reference: 'TR-92828' }, { id: 'TXN92827', date: '2026-11-19T20:30:00+05:30', description: 'Restaurant', type: 'DEBIT', category: 'Food', amountMinor: 124000, status: 'COMPLETED', reference: 'POS-92827' }],
  beneficiaries: [{ id: 'BEN1', name: 'Rohan Mehta', accountNumber: '••••1098', ifsc: 'SUVE0K7Q4N1', bankName: 'Silvercrest Bank', favourite: true }, { id: 'BEN2', name: 'Priya Nair', accountNumber: '••••4421', ifsc: 'HDFC0001234', bankName: 'HDFC Bank', favourite: false }],
  scheduledTransfers: [{ id: 'SCH1', beneficiary: 'Rohan Mehta', amountMinor: 250000, frequency: 'MONTHLY', nextDate: '2026-12-01', status: 'ACTIVE' }],
  fds: [{ id: 'FD1', amountMinor: 500000, rate: 7.1, tenureMonths: 12, startDate: '2026-10-01', maturityDate: '2027-10-01', maturityMinor: 535500, status: 'ACTIVE' }],
  rds: [{ id: 'RD1', monthlyMinor: 100000, rate: 6.8, tenureMonths: 12, paidMonths: 2, maturityMinor: 1240000, status: 'ACTIVE' }],
  loans: [{ id: 'LN1', type: 'Personal Loan', amountMinor: 5000000, rate: 11.5, tenureMonths: 36, emiMinor: 164800, outstandingMinor: 4720000, status: 'ACTIVE', nextDue: '2026-12-05' }, { id: 'LN2', type: 'Home Loan', amountMinor: 25000000, rate: 8.6, tenureMonths: 240, emiMinor: 218000, outstandingMinor: 25000000, status: 'PENDING', nextDue: '—' }],
  cards: [{ id: 'CARD1', type: 'Debit Card', masked: '•••• •••• •••• 4821', status: 'ACTIVE', limitMinor: 1000000, availableMinor: 1000000 }, { id: 'CARD2', type: 'Credit Card', masked: '•••• •••• •••• 9090', status: 'ACTIVE', limitMinor: 1500000, availableMinor: 980000, outstandingMinor: 520000, dueDate: '2026-12-10' }],
  serviceRequests: [{ id: 'SR1', type: 'Cheque Book', status: 'PROCESSING', createdAt: '2026-11-21' }],
  tickets: [{ id: 'TKT1', subject: 'Card transaction clarification', status: 'OPEN', createdAt: '2026-11-20', category: 'Cards' }],
  notifications: [{ id: 'NT1', title: 'Salary credited', body: '₹8,500.00 credited to your savings account.', date: '2026-11-23', read: false }, { id: 'NT2', title: 'Statement available', body: 'Your October account statement is ready.', date: '2026-11-01', read: true }],
  bank: { name: 'Silvercrest Bank', address: 'Chennai, Tamil Nadu', ifsc: 'SUVE0K7Q4NP', branches: ['Chennai Main Branch', 'Hosur Branch'] },
  limits: { perTransferMinor: 500000, dailyMinor: 700000 }, audit: [{ id: 'AUD1', actor: 'Admin', action: 'Customer approval reviewed', date: '2026-11-23T09:15:00+05:30' }],
  portfolio: { netWorthMinor: 2487500, depositsMinor: 500000, loansMinor: 4720000, allocation: [{ name: 'Cash & accounts', value: 60 }, { name: 'Deposits', value: 25 }, { name: 'Investments', value: 15 }] }
};
const read = () => { try { return JSON.parse(localStorage.getItem(STORE)) || structuredClone(seed); } catch { return structuredClone(seed); } };
const write = value => localStorage.setItem(STORE, JSON.stringify(value));
const nextId = prefix => prefix + Math.random().toString(36).slice(2, 8).toUpperCase();
export function resetMock() { localStorage.removeItem(STORE); }
export async function mockLogin(email, password) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  if (password !== 'demo') throw new Error('Invalid email or password. Use the demo credentials shown in the project README.');
  if (normalizedEmail === 'admin@silvercrest.test') return { token: 'demo-admin-token', role: 'ADMIN', email: normalizedEmail, profile: { name: 'Silvercrest Administrator', email: normalizedEmail } };
  if (normalizedEmail === 'customer@silvercrest.test') return { token: 'demo-customer-token', role: 'CUSTOMER', email: normalizedEmail, profile: { name: 'Ananya Sharma', email: normalizedEmail, customerId: 'CUS1001' } };
  throw new Error('Invalid email or password. Use a valid demo account.');
}
export async function mockRequest(path, method = 'GET', body, token = '') {
  const d = read(); const p = path.split('?')[0]; const parts = p.split('/').filter(Boolean); const id = parts.at(-1); const m = method.toUpperCase();
  if (p === '/api/me') return { role: token.includes('admin') ? 'ADMIN' : 'CUSTOMER', profile: token.includes('admin') ? { name: 'Silvercrest Administrator', email: 'admin@silvercrest.test' } : { name: 'Ananya Sharma', email: 'customer@silvercrest.test', customerId: 'CUS1001', phone: '9876543210' }, applicationStatus: 'APPROVED' };
  if (p === '/api/register' && m === 'POST') return { applicationId: nextId('APP'), status: 'SUBMITTED', message: 'Application submitted for review.' };
  if (p.startsWith('/api/application-status')) return { status: 'PENDING', message: 'Your application is awaiting review.' };
  if (p === '/api/accounts') return d.accounts;
  if (p.startsWith('/api/accounts/') && p.endsWith('/statement')) return d.transactions;
  if (p === '/api/portfolio') return d.portfolio;
  if (p === '/api/beneficiaries') { if (m === 'POST') { const item = { id: nextId('BEN'), ...body }; d.beneficiaries.push(item); write(d); return item; } return d.beneficiaries; }
  if (p.startsWith('/api/beneficiaries/')) { const idx = d.beneficiaries.findIndex(x => x.id === id); if (m === 'DELETE') { d.beneficiaries.splice(idx, 1); write(d); return { success: true }; } if (m === 'PATCH' || m === 'PUT') { d.beneficiaries[idx] = { ...d.beneficiaries[idx], ...body }; write(d); return d.beneficiaries[idx]; } return d.beneficiaries[idx]; }
  if (p === '/api/transfers/internal' && m === 'POST') { const row = { id: nextId('TXN'), date: new Date().toISOString(), description: body?.remarks || 'Internal transfer', type: 'DEBIT', category: 'Transfer', amountMinor: body?.amountMinor || 0, status: 'COMPLETED', reference: nextId('REF') }; d.transactions.unshift(row); const source=d.accounts.find(a=>(a.id||a.accountId)===body?.fromAccountId); const target=d.accounts.find(a=>(a.id||a.accountId)===body?.toAccountId); if(source){source.balanceMinor-=row.amountMinor;source.availableMinor-=row.amountMinor;} if(target){target.balanceMinor+=row.amountMinor;target.availableMinor+=row.amountMinor;} write(d); return row; }
  if (p === '/api/scheduled-transfers') { if (m === 'POST') { const item = { id: nextId('SCH'), status: 'ACTIVE', ...body }; d.scheduledTransfers.push(item); write(d); return item; } return d.scheduledTransfers; }
  if (p.startsWith('/api/scheduled-transfers/')) { if (m === 'DELETE') { d.scheduledTransfers = d.scheduledTransfers.filter(x => x.id !== id); write(d); return { success: true }; } return d.scheduledTransfers.find(x => x.id === id); }
  if (p === '/api/fds') { if (m === 'POST') { const item = { id: nextId('FD'), status: 'ACTIVE', ...body }; d.fds.push(item); write(d); return item; } return d.fds; }
  if (p.startsWith('/api/fds/') && p.endsWith('/close')) { const item = d.fds.find(x => x.id === parts[2]); if (item) item.status = 'CLOSED'; write(d); return item; }
  if (p === '/api/rds') { if (m === 'POST') { const item = { id: nextId('RD'), status: 'ACTIVE', paidMonths: 0, ...body }; d.rds.push(item); write(d); return item; } return d.rds; }
  if (p === '/api/loans') { if (m === 'POST') { const item = { id: nextId('LN'), status: 'PENDING', ...body }; d.loans.push(item); write(d); return item; } return d.loans; }
  if (p.startsWith('/api/loans/') && p.endsWith('/schedule')) { const loan = d.loans.find(x => x.id === parts[2]) || d.loans[0]; return Array.from({ length: loan?.tenureMonths || 12 }, (_, i) => ({ month: i + 1, dueDate: new Date(Date.now() + (i + 1) * 30 * 86400000).toISOString().slice(0, 10), emiMinor: loan?.emiMinor || 0, principalMinor: Math.round((loan?.amountMinor || 0) / (loan?.tenureMonths || 12)), interestMinor: Math.round((loan?.emiMinor || 0) * 0.2), balanceMinor: Math.max(0, (loan?.outstandingMinor || loan?.amountMinor || 0) - (i + 1) * Math.round((loan?.amountMinor || 0) / (loan?.tenureMonths || 12))) })); }
  if (p.startsWith('/api/loans/') && p.endsWith('/prepay')) { const loan = d.loans.find(x => x.id === parts[2]); if (loan) loan.outstandingMinor = Math.max(0, loan.outstandingMinor - (body?.amountMinor || 0)); write(d); return loan; }
  if (p === '/api/cards') { if (m === 'POST') { const item = { id: nextId('CARD'), type: 'Debit Card', masked: '•••• •••• •••• 0000', status: 'PENDING', ...body }; d.cards.push(item); write(d); return item; } return d.cards; }
  if (p.startsWith('/api/cards/') && parts.length === 4) { const card = d.cards.find(x => x.id === parts[2]); if (card) { if (parts[3] === 'block') card.status = 'BLOCKED'; if (parts[3] === 'unblock') card.status = 'ACTIVE'; if (parts[3] === 'limits') Object.assign(card, body); write(d); } return card; }
  if (p === '/api/service-requests') { if (m === 'POST') { const item = { id: nextId('SR'), status: 'SUBMITTED', createdAt: new Date().toISOString(), ...body }; d.serviceRequests.unshift(item); write(d); return item; } return d.serviceRequests; }
  if (p === '/api/tickets') { if (m === 'POST') { const item = { id: nextId('TKT'), status: 'OPEN', createdAt: new Date().toISOString(), ...body }; d.tickets.unshift(item); write(d); return item; } return d.tickets; }
  if (p === '/api/notifications') return d.notifications;
  if (p.startsWith('/api/notifications/') && p.endsWith('/read')) { const item = d.notifications.find(x => x.id === parts[2]); if (item) item.read = true; write(d); return item; }
  if (p === '/api/admin/dashboard') return { customers: d.customers.length, pendingApplications: d.applications.length, activeAccounts: d.accounts.length, transfersToday: 18, volumeMinor: 125000000, pendingLoans: d.loans.filter(x => x.status === 'PENDING').length, openRequests: d.serviceRequests.length };
  if (p.startsWith('/api/admin/applications/') && parts.length >= 4) { if (m === 'GET') return d.applications.find(x => x.id === parts[3]); if (m === 'POST') { const item = d.applications.find(x => x.id === parts[3]); if (item) { item.status = body.decision; item.remarks = body.remarks || ''; } write(d); return item; } }
  if (p === '/api/admin/applications') { const status=new URLSearchParams(path.split('?')[1]||'').get('status'); return status?d.applications.filter(x=>status.split('|').includes(x.status)):d.applications; }
  if (p === '/api/admin/customers') { if (m === 'PATCH') { const item = d.customers.find(x => x.id === body.id); if (item) Object.assign(item, body); write(d); return item; } return d.customers; }
  if (p.startsWith('/api/admin/customers/') && parts.length >= 5) { const item = d.customers.find(x => x.id === parts[3]); if (item) item.status = parts[4] === 'freeze' ? 'FROZEN' : 'ACTIVE'; write(d); return item; }
  if (p === '/api/admin/limits/default') { if (m === 'PUT') { d.limits = body; write(d); return d.limits; } return d.limits; }
  if (p.startsWith('/api/admin/limits/')) return d.limits;
  if (p === '/api/admin/bank') { if (m === 'PUT') { d.bank = body; write(d); return d.bank; } return d.bank; }
  if (p === '/directory/banks') return { banks: [{ bankId: 'P627', bankName: 'Silvercrest Bank', ifsc: 'SUVE0K7Q4NP', status: 'ACTIVE' }, { bankId: 'P664', bankName: 'Example Partner Bank', ifsc: 'EXMP0001234', status: 'ACTIVE' }] };
  if (p === '/api/admin/loans') return d.loans;
  if (p.startsWith('/api/admin/loans/') && parts[4] === 'decision') { const loan = d.loans.find(x => x.id === parts[3]); if (loan) loan.status = body.decision === 'APPROVE' ? 'APPROVED' : body.decision; write(d); return loan; }
  if (p === '/api/admin/requests') return d.serviceRequests;
  if (p === '/api/admin/transactions') return d.transactions;
  if (p === '/api/admin/audit-log') return d.audit;
  if (p === '/api/admin/reports') return d.transactions;
  return { success: true, message: 'Mock action completed' };
}
