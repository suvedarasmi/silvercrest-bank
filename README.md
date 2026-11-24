# Bank portal template

Register the bank with the SharedBank operator. Set its bank ID, name, IFSC and branding in `src/bank-config.js`. Set the common HTTPS Worker URL in `src/cloudflare-config.js`, or set the repository variable `VITE_X42_API_URL`.

On Node.js 22 or newer, run `npm ci` and `npm run dev` to work locally. The portal uses the bank's Firebase test account and displays live synthetic balances from the Worker.

Publish this folder to a GitHub repository and enable its GitHub Pages source with **GitHub Actions**. The supplied workflow deploys the `main` branch.

### Mock-mode sign-in

When no backend URL is configured, the app uses local mock data. Sign in through the login form with one of these accounts (password for both: `demo`):

- Customer: `customer@silvercrest.test`
- Admin: `admin@silvercrest.test`

The Customer Demo and Admin Demo shortcut buttons are intentionally removed; users must submit the login form.
