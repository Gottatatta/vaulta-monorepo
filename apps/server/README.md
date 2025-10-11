# vaulta-server

Backend server for Vaulta: Express + MongoDB + AWS S3 + Authentication + Logging

This repository contains the backend that powers the Vaulta SDK and demo clients. It's a TypeScript-based Express server with JWT authentication, API key support, file storage using AWS S3, and Logtail logging integration.

Repository: https://github.com/hasnaintypes/vaulta-sdk

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Local development (PowerShell)](#local-development-powershell)
  - [Build and start](#build-and-start)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Endpoints & Usage](#api-endpoints--usage)
  - [Authentication](#authentication)
  - [API Keys](#api-keys)
  - [Files](#files)
- [Authentication & Security Notes](#authentication--security-notes)
- [Deployment](#deployment)
  - [Recommended production setup](#recommended-production-setup)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Contact](#contact)

---

## About

`vaulta-server` is the backend implementation that provides RESTful endpoints used by the Vaulta SDK and frontend clients. It includes user authentication, API key generation/validation, file upload endpoints (direct S3 uploads and server-side streaming), and analytics endpoints.

## Features

- JWT authentication with Passport
- API-key based access for programmatic uploads
- File upload handling (multer) and streaming to AWS S3 (AWS SDK v3)
- MongoDB models for users, API keys, files and storage
- Request validation using Zod
- Logtail integration for structured logging

## Tech Stack

- Node.js + Express (TypeScript)
- MongoDB (mongoose)
- AWS S3 (AWS SDK v3)
- Passport JWT
- Logtail & Winston
- Zod for request validation

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB instance (local or cloud)
- AWS account with an S3 bucket

### Local development (PowerShell)

```powershell
cd d:\Projects\_Personal\vaulta-mern\apps\server
npm install
cp .env.example .env
# Edit .env with your credentials (MongoDB, AWS, JWT secret, etc.)
npm run dev
```

- The server will run with `nodemon` and reload on code changes.

### Build and start

```powershell
npm run build
npm start
```

`npm run build` compiles TypeScript to `dist/`. `npm start` runs the compiled server.

## Environment Variables

Copy `.env.example` to `.env` and populate values for development and production:

Important variables (in `apps/server/.env.example`):

- `MONGO_URI` - MongoDB connection string
- `PORT` - HTTP port (default 3000)
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` - AWS credentials
- `S3_BUCKET` - S3 bucket name
- `JWT_SECRET` - JWT signing secret
- `LOGTAIL_TOKEN` - Logtail source token (optional)

Keep secrets out of source control.

## Project Structure

```
src/
├─ configs/          # DB, HTTP, S3 and logger configuration
├─ controllers/      # Express route controllers
├─ middlewares/      # Auth, error handling, validation
├─ models/           # Mongoose models
├─ routes/           # Express routes (public/internal)
├─ services/         # Business logic and S3 upload logic
├─ utils/            # helpers: jwt, logger, exceptions
└─ validators/       # Zod validators for requests
```

## API Endpoints & Usage

This section is a high-level overview. Inspect `src/routes` to see concrete route definitions.

### Authentication

- `POST /internal/auth/signup` - Sign up a new user
- `POST /internal/auth/login` - Login and receive JWT

### API Keys

- `POST /internal/apikeys` - Create a new API key (authenticated)
- `GET /internal/apikeys` - List API keys for user

### Files

- `POST /internal/files` - Upload files using server-side endpoint (requires auth)
- `POST /public/v1/files` - Public uploads using API key auth (for SDK to use)

## Authentication & Security Notes

- Use HTTPS in production.
- Protect `JWT_SECRET` and `AWS` keys.
- Rotate API keys and tokens as needed.
- Limit CORS origins to your client domains.

## Deployment

### Recommended production setup

- Host Node server (DigitalOcean / AWS EC2 / Heroku / Render)
- Use Managed MongoDB (Atlas) or self-hosted MongoDB
- Use S3 for file storage and set `S3_BUCKET` and credentials via environment variables
- Configure monitoring/logging (Logtail)
- Run behind a process manager (PM2) or containerize using Docker

## Contributing

- Fork → branch → PR
- Keep changes small and add tests where possible
- Run `npm run lint` and `npm run format` before opening a PR

## Troubleshooting

- MongoDB connection errors: check `MONGO_URI` and network access
- S3 upload failures: ensure bucket exists and credentials are correct
- Auth failures: ensure `JWT_SECRET` matches server configuration

## License

Apache-2.0

## Contact

Maintainer: Hasnain (GitHub: `hasnaintypes`)

- GitHub: https://github.com/hasnaintypes
- Repo: https://github.com/hasnaintypes/vaulta-sdk

---
