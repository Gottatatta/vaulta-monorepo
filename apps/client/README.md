# vaulta-client

[![Package](https://img.shields.io/badge/package-vaulta--client-blue)](#)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

A modern, responsive frontend client for the Vaulta file-upload SDK and API. Built with Vite + React + TypeScript and designed for use with Node.js/Next.js backends and the Vaulta SDK.

Repository: https://github.com/hasnaintypes/vaulta-sdk

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Local development (Windows PowerShell)](#local-development-windows-powershell)
  - [Build for production](#build-for-production)
- [Environment variables](#environment-variables)
- [Project structure](#project-structure)
- [Usage & examples](#usage--examples)
  - [Using the API client](#using-the-api-client)
  - [Integrating the Vaulta SDK](#integrating-the-vaulta-sdk)
- [Routing & pages](#routing--pages)
- [Deployment](#deployment)
  - [Vercel](#vercel)
- [Testing & linting](#testing--linting)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Contact](#contact)

---

## About

`vaulta-client` is the official example / demo client application for the Vaulta SDK. It demonstrates how to upload files, manage API keys, authenticate users, and integrate with the Vaulta API from a real-world frontend.

This client is intentionally modular: components live under `src/components`, features under `src/features`, and platform-specific API code is grouped in `src/app`.

## Features

- File upload UI and progress
- API key management UI
- Authentication pages (sign-in / sign-up)
- Dashboard and files listing
- Responsive layout with a sidebar and top navigation
- Example integrations for nextjs/browser and node backends

## Tech stack

- Vite + React + TypeScript
- Tailwind CSS for styling
- TSup for any local bundling (used elsewhere in repo)
- Uses the Vaulta SDK (package: `@vaulta.dev/sdk`) or local API client in `src/app/api-client.ts`

## Quick start

### Prerequisites

- Node.js 18+ (recommended)
- npm 9+ or yarn (instructions below use npm)

### Local development (Windows PowerShell)

Open PowerShell and run:

```powershell
cd d:\Projects\_Personal\vaulta-mern\apps\client
npm install
npm run dev
```

- The dev server (Vite) will start and you can open `http://localhost:5173` (or the address printed in the terminal).
- If you use a different port, Vite will print the active URL.

### Build for production

```powershell
npm run build
npm run preview
```

- `npm run build` creates an optimized production build in `dist/`.
- `npm run preview` serves the production build locally for smoke testing.

## Environment variables

This project uses environment variables. Copy the example and fill with your values:

```powershell
cd apps/client
copy .env.example .env
# then open apps/client/.env and fill values
```

Common variables (check `.env.example` for the exact keys):

- `VITE_API_BASE_URL` — URL of the backend API (for example your Vaulta API proxy)
- `VITE_SOME_FEATURE_FLAG` — feature flags (if applicable)

Note: Vite exposes variables starting with `VITE_` to the browser. Do NOT store secret server-only values in client-side `.env` files.

## Project structure

Top-level of `apps/client` (important files/folders):

- `src/` — application source code
  - `src/app/` — API client, hooks and global store (`api-client.ts`, `hook.ts`, `store.ts`)
  - `src/components/` — reusable UI components (file uploader, data table, navbar, etc.)
  - `src/pages/` — top-level pages and route-level components
  - `src/layouts/` — app and base layouts
  - `src/features/` — domain features (auth, files, apikeys)
  - `src/hooks/` — custom React hooks
  - `src/lib/` — small utilities and formatters
- `public/` — static public assets
- `index.html` — Vite HTML entry
- `vite.config.ts` — Vite config
- `package.json` — project scripts/dependencies
- `.env.example` — example environment variables
- `README.md` — this file

The code is organized to make it easy to extract components into a design system or move to a monorepo package if needed.

## Usage & examples

### Using the API client

`src/app/api-client.ts` contains the client wrapper used across the app to call your backend endpoints. Example usage inside a feature or component:

```tsx
import apiClient from '../app/api-client';

async function fetchFiles() {
  const res = await apiClient.get('/files');
  return res.data;
}
```

Open `src/app/api-client.ts` to see how the base URL and auth headers are constructed. Update `VITE_API_BASE_URL` to point to your local or remote API.

### Integrating the Vaulta SDK

If you plan to use the Vaulta SDK directly in the client (browser-only features), install the published package and import it in your components:

```bash
npm install @vaulta.dev/sdk
```

Example snippet (browser):

```ts
import { VaultaClient } from '@vaulta.dev/sdk';

const vaulta = new VaultaClient({ apiKey: import.meta.env.VITE_VAULTA_PUBLIC_KEY });
await vaulta.uploadFiles(fileInput.files[0]);
```

> Note: Keep API keys safe. For server-side uploads or server actions in Next.js, prefer a server-side API that uses your private key.

## Routing & pages

This app uses client-side routing (React Router or Vite + your chosen solution). Page entry points are in `src/pages/`. Key pages include:

- `auth` — sign-in and sign-up
- `files` — files listing and file uploader
- `apikeys` — API key management
- `overview` — dashboard

## Deployment

### Vercel

This project includes a `vercel.json` for Vercel deployment. To deploy:

1. Push your repository to GitHub (or connect GitHub repo in Vercel dashboard).
2. Create a new project in Vercel and select this repository.
3. In the Vercel dashboard set environment variables (same keys as `.env` but values for production).
4. Configure build command: `npm run build` and output directory: `dist` (Vite default preview uses `dist`).

After the first deployment, Vercel will build and host your client automatically.

## Testing & linting

This repo does not include a dedicated test runner by default. Recommended steps:

- Add Vitest or Jest for unit tests (`vitest` + `@testing-library/react` are recommended with Vite)
- Add ESLint + Prettier for consistent code style

Suggested scripts to add to `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "lint": "eslint 'src/**/*.{ts,tsx,js,jsx}'",
    "format": "prettier --write ."
  }
}
```

## Contributing

Thanks for contributing! Please follow these guidelines:

- Fork the repo and create a feature branch: `git checkout -b feat/my-change`
- Keep commits small and focused, use clear commit messages
- Open a PR to `master` and describe the change, include screenshots for UI work
- Run linting and tests before opening a PR

If you'd like to add features to the Vaulta SDK integration or add new pages, open an issue first to discuss the design.

## Troubleshooting

- If assets don't load, ensure `VITE_API_BASE_URL` is correct and the backend server is running.
- If you see CORS errors when calling the API, enable CORS on your backend or use a proxy during development.
- If you have environment variables not picked up by Vite, ensure they start with `VITE_`.

## License

This project is licensed under the Apache-2.0 License. See the top-level `LICENSE` file for details.

## Contact

Maintainer: Hasnain (GitHub: `hasnaintypes`)

- GitHub: https://github.com/hasnaintypes
- Repo: https://github.com/hasnaintypes/vaulta-sdk

---
