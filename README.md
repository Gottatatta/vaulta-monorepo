# Vaulta Monorepo

This repository contains the Vaulta SDK (TypeScript), a demo frontend client, and an Express backend server.

Directory layout

```
/apps
  /client   # Vite + React frontend (vaulta-client)
  /server   # Express + TypeScript backend (vaulta-server)
/package    # The @vaulta.dev SDK (TypeScript library)
```

This README documents how to develop, build, test and release the components in this monorepo.

## Table of contents

- [Getting started](#getting-started)
- [Scripts (root)](#scripts-root)
- [Package-specific scripts](#package-specific-scripts)
- [Environment variables](#environment-variables)
- [Development workflow](#development-workflow)
- [Publishing the SDK](#publishing-the-sdk)
- [Contributing](#contributing)

---

## Getting started

Install dependencies for each package (run from repo root):

```powershell
npm run install:all
```

Alternatively, if you use `pnpm` or `yarn` workspaces you can switch to that arrangement (recommended for larger projects).

## Scripts (root)

The root `package.json` contains convenience scripts to build and operate the individual packages. Important scripts:

- `npm run install:all` — install dependencies for SDK, server and client
- `npm run build` — build SDK, server and client (invokes each package's build script)
- `npm run dev:client` — start the client dev server
- `npm run dev:server` — start the server in dev mode (nodemon)
- `npm run format` — run Prettier across the repo
- `npm run publish:sdk` — run the SDK `release` script (changesets) from the `package` folder

Run them from the repo root:

```powershell
npm run build
npm run dev:client
```

## Package-specific scripts

Each package has its own `package.json`. Key scripts:

- `package/` (SDK)
  - `npm run build` — bundle the SDK using `tsup`
  - `npm run release` — run changesets publish flow (version + publish)

- `apps/client/` (frontend)
  - `npm run dev` — start Vite dev server
  - `npm run build` — build production assets
  - `npm run preview` — preview production build locally

- `apps/server/` (backend)
  - `npm run dev` — start server with `nodemon`
  - `npm run build` — compile TypeScript
  - `npm start` — run compiled server from `dist/`

## Environment variables

Each package contains a `.env.example`. Copy it to `.env` and fill the required values.

- `apps/client/.env` — uses `VITE_` prefixed environment variables for browser-exposed config
- `apps/server/.env` — server variables: `MONGO_URI`, `JWT_SECRET`, `AWS` credentials, etc.
- `package` (SDK) — typically doesn't require env vars, but examples may reference them

Ensure secrets are not committed and are stored in GitHub Actions secrets or your deployment platform.

## Development workflow

1. `npm run install:all` from the repo root
2. Start the server: `npm run dev:server`
3. Start the client: `npm run dev:client`
4. Make changes in `src/` of the relevant package and push a PR when ready

## Publishing the SDK

The SDK uses Changesets for change-management. Typical flow:

1. From `package/`: `npx changeset` — create a changeset and provide a summary
2. Commit the changeset file and push a branch/PR
3. Merge to `master` — the GitHub Action will run `npx changeset version` and `npx changeset publish` (configured in `.github/workflows`)

For a first-time manual publish from your machine (if needed):

```powershell
cd package
npm run build
npm publish --access public
```

## Contributing

- Fork and create a feature branch
- Run `npm run format` and the package-specific linters/tests before PR
- Keep changes small and document major design decisions in the PR description
