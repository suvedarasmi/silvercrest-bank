# SilverCrest UI additions

This UI is built on the original SilverCrest portal. Only `src/main.jsx` was changed among existing source files. New UI, API adapter, mock data and CSS are added as separate files.

## Local demo

Run `npm ci` and `npm run dev`. With no `VITE_API_BASE_URL`, the application uses local mock data persisted in browser localStorage. Customer demo and Admin demo are available from the sign-in page. Demo data is not real banking data.

## Backend mode

Set `VITE_API_BASE_URL` to the Node/Express API base URL. The adapter sends Bearer tokens and JSON requests with a 15-second timeout. The brief did not provide the authentication endpoint; `POST /api/auth/login` is assumed to return `{token, role, profile}`. Confirm or adapt that route before connecting to the real backend. No secrets should be placed in `VITE_*` variables.

Registration uses multipart `POST /api/register` and sends `initialDepositMinor=100000` (₹1,000). Other screens use the endpoints listed in the assignment brief. The central SharedBank directory is read-only.

## Protected original files

The following uploaded files are byte-identical to the original archive: `src/LiveBank.jsx`, `src/live-api.js`, `src/amount.js`, `src/cloudflare-config.js`, `src/bank-config.js`, `src/live.css`, `src/style.css`, `package.json`, `package-lock.json`, and `vite.config.js`. The existing LiveBank is mounted inside the Transfers page without changing its Worker sign-in, polling, transfer or activity code.

## Mock-mode scope

Browser-only mock data supports the UI before the backend is ready. Demo records and savings goals are local to this browser. Some workflows such as payments, statements, and non-API banking tools are UI/demo-only until a backend endpoint exists. Real authentication cannot be completed until the backend auth endpoint is confirmed.
