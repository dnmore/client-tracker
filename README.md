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

- No signup required  
- Safe demo environment  
- Read-only access  

## Table of Contents


- [Preview](#preview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Authentication](#authentication)
- [Role-Based Access Control](#role-based-access-control)
- [Billing](#billing)
- [Analytics](#analytics)
- [Running Locally](#running-locally)
- [Contributions](#contributions)
- [License](#license)



# Preview

<p align="center">
  <img src="screenshots/dashboard.png" width="45%">
  <img src="screenshots/leads.png" width="45%">
</p>

<p align="center">
  <img src="screenshots/deals.png" width="45%">
  <img src="screenshots/billing.png" width="45%">
</p>

# Features

- Full CRUD for leads and deals  
- Authentication with role-based access control (RBAC)
- Secure demo environment (no user data required)   
- Server-side analytics and data aggregation  
- Subscription billing with Stripe (test mode)  



# Tech Stack

## Frontend

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- shadcn/ui


## Backend / Infrastructure

- Next.js Server Components & API Routes
- Prisma ORM
- PostgreSQL (Neon)
- NextAuth (OAuth)
- Stripe (Test Mode)

---

# Authentication

- NextAuth with Prisma adapter
- OAuth providers (Google, GitHub)
- Database session strategy

## Authentication Modes

The application supports two distinct modes controlled via environment variables.

### Demo Mode 

- OAuth providers disabled
- Read-only access 
- Uses seeded demo account

```env
NEXT_PUBLIC_DEMO_MODE=true
ENABLE_OAUTH=false

```
Ensure your demo user email is defined in `prisma/seed.ts` and seeded before running the app.

```bash

pnpm dlx prisma db seed

   ```

### Full Mode

Enable OAuth providers:

```env
NEXT_PUBLIC_DEMO_MODE=false
ENABLE_OAUTH=true

```

---

# Role-Based Access Control

The application implements two roles:

## OWNER

- Full CRUD access
- Access to analytics
- Manage billing and subscriptions

## VIEWER

- Read-only access 
- Can view analytics
- Cannot modify data or manage billing

## Role Assignment

- The first authenticated user is assigned the `owner` role
- All subsequent users are assigned the `viewer` role


## Permission Matrix

| Action | Owner | Viewer |
|------|------|------|
| View leads | ✅ | ✅ |
| Create/edit leads | ✅ | ❌ |
| View deals | ✅ | ✅ |
| Create/edit deals | ✅ | ❌ |
| View analytics | ✅ | ✅ |
| Manage billing | ✅ | ❌ |



# Billing 

Billing is implemented using **Stripe (test mode)**.

## Plans

**Free** — limited number of deals  
**Pro** — unlimited deals

## Enforcement Rules

- Deals limit is enforced at creation time
- Existing deals can always be viewed
- Billing actions are restricted to **Owners only**

# Analytics 

The dashboard provides aggregated insights:

- Total leads created
- Total deals created
- Deals won vs lost
- Total Revenue


Analytics are computed server-side using database aggregation queries to ensure accuracy and consistency.

---

# Running Locally

1. Clone the repository and install dependencies
```bash

   git clone https://github.com/dnmore/client-tracker.git
   cd client-tracker

   ```
2. Install dependencies
```bash

   pnpm install

   ```
3. Configure environment variables

Create `.env` file in the root directory and configure environment variables (OAuth, database, Stripe test keys)

4. Run database migrations

```bash

   pnpm prisma migrate dev

   ```
5. Seed the database


```bash

   pnpm dlx prisma db seed

   ```

6. Start the development server

```bash

   pnpm dev

   ```

   The application will be available at:

   ```

   http://localhost:3000

   ```
# Contributions

Contributions are welcome.
Feel free to open issues or submit pull requests.

# License

MIT License

