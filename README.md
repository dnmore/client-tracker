# Client Tracker

![Next.js](https://img.shields.io/badge/Next.js-black)
![React](https://img.shields.io/badge/React-TypeScript-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue)
![Stripe](https://img.shields.io/badge/Stripe-635BFF)
![License](https://img.shields.io/badge/License-MIT-green)

## Live Demo

[Live Demo](https://client-tracker-dashboard.vercel.app/)

The live demo provides:

- Read-only access
- Seeded demo data
- No sign-up required

---

# Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Technology Stack](#technology-stack)
- [Architecture Overview](#architecture-overview)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running Locally](#running-locally)
- [Running Tests](#running-tests)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Security Notes](#security-notes)
- [Performance Considerations](#performance-considerations)
- [Contributing Guidelines](#contributing-guidelines)
- [License](#license)

---

# Project Overview

Client Tracker is a CRM-style application built for freelancers and small consultancies to manage leads, track deals, monitor revenue, and manage subscription billing from a single dashboard.

The application provides:

- Lead management
- Deal tracking
- Revenue analytics
- Role-based access control
- OAuth authentication
- Stripe subscription billing (test mode)

A public demo mode allows prospective users to explore the application using seeded read-only data without authentication.

---

# Features

## CRM

- Full CRUD operations for leads
- Full CRUD operations for deals

## Authentication

- NextAuth authentication
- Google OAuth
- GitHub OAuth
- Database session strategy

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

## Data Table Utilities

- Search
- Filtering

---

## Demo Mode

Supports a read-only demonstration mode.

Characteristics:

- OAuth disabled
- Seeded demo account
- Read-only UI
- No registration required

Configuration:

```env
NEXT_PUBLIC_DEMO_MODE=true
ENABLE_OAUTH=false
```

---

## Billing

Stripe integration 

Plans:

- Free
- Pro

Business rules:

- Free plan limits the number of deals
- Existing deals remain accessible
- Billing management restricted to Owners

---

## Analytics

Server-side aggregated analytics including:

- Total leads
- Total deals
- Won deals
- Lost deals
- Total revenue

---

# Screenshots

<p align="center">
  <img src="screenshots/dashboard.png" width="45%">
  <img src="screenshots/leads.png" width="45%">
</p>

<p align="center">
  <img src="screenshots/deals.png" width="45%">
  <img src="screenshots/billing.png" width="45%">
</p>

---

# Technology Stack

## Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

## Backend

- Next.js Server Components
- Next.js API Routes

## Database

- PostgreSQL
- Prisma ORM
- Neon

## Authentication

- NextAuth
- Prisma Adapter
- Google OAuth
- GitHub OAuth

## Payments

- Stripe 

## Testing

- Jest

---

# Architecture Overview

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

Authentication is handled by NextAuth.

Business metrics are calculated server-side using database aggregation queries.

Stripe is used for subscription billing.

---

# Folder Structure

The project is organized into the following major directories:

```
client-tracker/
│
├── tests/
├── app/
│   └── api
│           ├── auth
│           └── stripe
├── components/
├── lib/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   
├── types/
├── screenshots/
├── .env.example
├── package.json
└── README.md
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/dnmore/client-tracker.git
```

Navigate into the project:

```bash
cd client-tracker
```

Install dependencies:

```bash
pnpm install
```

---

# Environment Variables

Copy the example environment file.

```bash
cp .env.example .env
```

Populate all required values defined in:

```
.env.example
```

Demo Mode:

```env
NEXT_PUBLIC_DEMO_MODE=true
ENABLE_OAUTH=false
```

Full Application:

```env
NEXT_PUBLIC_DEMO_MODE=false
ENABLE_OAUTH=true
```

When Full Mode is enabled, OAuth providers must also be configured.

---

# Database Setup

Run database migrations:

```bash
pnpm prisma migrate dev
```

Seed the database:

```bash
pnpm dlx prisma db seed
```

When running Demo Mode, ensure the seeded demo user defined in:

```
prisma/seed.ts
```

has been created before starting the application.

---

# Running Locally

Start the development server:

```bash
pnpm dev
```

Application URL:

```
http://localhost:3000
```

---

# Running Tests

The project uses **Jest**.

Current coverage includes:

## Pages

- Landing page
- Dashboard page

## Forms

- Validation
- Error handling
- Demo mode behavior
- Full mode behavior

## Authentication

Tests for:

- `verifySession`
- Authenticated session handling
- Redirect behavior when unauthenticated

Run the test suite:

```bash
pnpm test
```

---

# Deployment

The application is deployed on **Vercel**.

Typical deployment workflow:

1. Push the repository to your Git provider.
2. Import the project into Vercel.
3. Configure all required environment variables.
4. Deploy.

External services that must be configured:

- Neon Database
- Google OAuth
- GitHub OAuth
- Stripe 


---

# API Documentation

The application exposes API routes for authentication and Stripe payment processing.

The project exposes API routes under:

```text
app/api/
```

### Authentication

```text
/api/auth/[...nextauth]
```

Handles authentication using NextAuth with GitHub and Google OAuth.

### Stripe Checkout

```text
/api/stripe/checkout
```

Handles Stripe checkout session

### Stripe Webhook

```text
/api/stripe/webhook
```

Handles Stripe webhook events

Supported events:

- `checkout.session.completed`
    - Updates the corresponding user plan from **FREE** to **PRO**.
- `customer.subscription.deleted`
    - Updates the corresponding user plan from **PRO** to **FREE**.

### Stripe Portal

```text
/api/stripe/portal
```

Handles Stripe Customer Portal sessions, allowing users to manage their subscription.

---

# Security Notes

Authentication is implemented using:

- NextAuth
- OAuth providers
- Database session strategy

Authorization is enforced through role-based access control (RBAC) with two roles:

- Owner
- Viewer

Demo Mode disables OAuth and exposes only seeded read-only data.

---

# Performance Considerations

The application incorporates several performance optimizations:

### Server-side Data Caching

- Uses `unstable_cache` to cache database queries powering the admin dashboard analytics and data tables.

### On-Demand Cache Invalidation

- Uses `revalidateTag` to invalidate cached data associated with specific cache tags.
- Uses `revalidatePath` throughout admin server actions to refresh affected routes after data mutations.

### Optimized Loading Experience

- Implements a dedicated `loading.tsx` with an animated loader for the dashboard routes.

---

# Contributing Guidelines

Contributions are welcome.

Please:

1. Open an issue for bugs or feature requests.
2. Fork the repository.
3. Create a feature branch.
4. Submit a pull request describing your changes.

Please ensure all existing tests continue to pass before submitting a pull request.

---

# License

This project is licensed under the **MIT License**.

