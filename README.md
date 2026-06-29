# Client Tracker

![Next.js](https://img.shields.io/badge/Next.js-black)
![React](https://img.shields.io/badge/React-TypeScript-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue)
![Stripe](https://img.shields.io/badge/Stripe-Test%20Mode-635BFF)
![License](https://img.shields.io/badge/License-MIT-green)

Client Tracker is a CRM-style application designed for freelancers and small consultancies to track leads, deals and revenue in one place.

## Live Demo

[Live Demo](https://client-tracker-dashboard.vercel.app/)

The live demo provides:

* Read-only access
* Seeded demo data
* No sign-up required

---

## Table of Contents

* [Preview](#preview)
* [Features](#features)
* [Architecture Overview](#architecture-overview)
* [Tech Stack](#tech-stack)
* [Authentication](#authentication)
* [Role-Based Access Control](#role-based-access-control)
* [Billing](#billing)
* [Analytics](#analytics)
* [Prerequisites](#prerequisites)
* [Running Locally](#running-locally)
* [Testing](#testing)
* [Deployment](#deployment)
* [Troubleshooting](#troubleshooting)
* [Contributing](#contributing)
* [License](#license)

---

## Preview

<p align="center">
  <img src="screenshots/dashboard.png" width="45%">
  <img src="screenshots/leads.png" width="45%">
</p>

<p align="center">
  <img src="screenshots/deals.png" width="45%">
  <img src="screenshots/billing.png" width="45%">
</p>

---

## Features

* Full CRUD operations for leads and deals
* Authentication with role-based access control (RBAC)
* Read-only demo mode with seeded data
* Server-side analytics using database aggregation
* Stripe subscription billing (test mode)

---

## Architecture Overview

The application follows a typical Next.js App Router architecture:

```
Browser
    │
    ▼
Next.js App Router
    │
    ├── Server Components
    ├── API Routes
    │
    ▼
Prisma ORM
    │
    ▼
PostgreSQL (Neon)
```

Authentication is handled through NextAuth, while subscription billing is implemented with Stripe in test mode.

---

## Tech Stack

### Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

### Backend / Infrastructure

* Next.js Server Components
* Next.js API Routes
* Prisma ORM
* PostgreSQL (Neon)
* NextAuth (OAuth)
* Stripe (Test Mode)

---

## Authentication

Authentication is implemented with:

* NextAuth
* Prisma Adapter
* OAuth providers (Google and GitHub)
* Database session strategy

### Demo Mode

```
NEXT_PUBLIC_DEMO_MODE=true
ENABLE_OAUTH=false
```

Characteristics:

* OAuth disabled
* Read-only access
* Seeded demo account

Ensure the demo user defined in `prisma/seed.ts` has been seeded before starting the application.

```bash
pnpm dlx prisma db seed
```

### Full Mode

```
NEXT_PUBLIC_DEMO_MODE=false
ENABLE_OAUTH=true
```

OAuth providers must also be configured through the project's environment variables. Refer to `.env.example` for the complete configuration.

---

## Role-Based Access Control

Two application roles are supported.

### Owner

* Full CRUD access
* View analytics
* Manage billing and subscriptions

### Viewer

* Read-only access
* View analytics
* Cannot modify data
* Cannot manage billing

### Role Assignment

* The first authenticated user becomes the `owner`.
* Subsequent users are assigned the `viewer` role.

### Permission Matrix

| Action               | Owner | Viewer |
| -------------------- | :---: | :----: |
| View leads           |   ✅   |    ✅   |
| Create or edit leads |   ✅   |    ❌   |
| View deals           |   ✅   |    ✅   |
| Create or edit deals |   ✅   |    ❌   |
| View analytics       |   ✅   |    ✅   |
| Manage billing       |   ✅   |    ❌   |

---

## Billing

Stripe is integrated in **test mode**.

Available plans:

* **Free** — limited number of deals
* **Pro** — unlimited deals

Rules:

* Deal limits are enforced when creating new deals.
* Existing deals remain accessible.
* Billing actions are restricted to Owners.

---

## Analytics

The dashboard provides aggregated business metrics, including:

* Total leads
* Total deals
* Won versus lost deals
* Total revenue

Analytics are calculated server-side using database aggregation queries.

---

## Prerequisites

Before running the project locally, ensure you have:

* Git
* Node.js
* pnpm
* Access to a PostgreSQL database (or Neon)



---

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/dnmore/client-tracker.git
cd client-tracker
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Copy the example environment file `.env.example` and populate the required values.
The complete list of required variables is defined there.

### 4. Run database migrations

```bash
pnpm prisma migrate dev
```

### 5. Seed the database

```bash
pnpm dlx prisma db seed
```

### 6. Start the development server

```bash
pnpm dev
```

The application will be available at:

```
http://localhost:3000
```

---

## Testing

Unit tests are implemented using **Jest**.

Current test coverage includes:

* **Page rendering**

  * Landing page
  * Dashboard page

* **Create Form**

  * Form validation and error handling
  * View-only mode (submit button disabled)
  * Full mode (submit button enabled)

* **Authentication / Data Access Layer**

  * `verifySession` returns the authenticated session when a user exists
  * `verifySession` redirects appropriately when no session is found

Run tests with command:

```bash
pnpm test
```
---

## Deployment

The application is deployed on Vercel and available [here](https://client-tracker-dashboard.vercel.app/)


---

## Troubleshooting

Common setup issues may include:

* Missing environment variables
* Database migrations not applied
* Database seed not executed before Demo Mode

If running Demo Mode, ensure the seeded demo user exists before launching the application.

---

## Contributing

Contributions are welcome.

Please open an issue to report bugs or suggest enhancements, or submit a pull request with proposed changes.

---

## License

This project is licensed under the MIT License.



