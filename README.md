# FarmRoute Frontend

> FarmRoute is a web-based platform that connects Farmers and Traders by providing market intelligence, produce listings, storage discovery, and transport request services.

---

## Project Overview

FarmRoute aims to reduce post-harvest losses and improve market access by enabling users to:

- Register and authenticate securely.
- Access market price information.
- List agricultural produce.
- Discover available storage facilities.
- Request transportation services.
- Communicate within the platform (MVP scope permitting).

This repository contains the Frontend application built with React, Vite, and TypeScript.

---

# Project Status

**Current Phase**

Project Planning & Frontend Environment Setup

Development Status

🟡 In Progress

---

# MVP Scope

## Included

- User Authentication
- Farmer Dashboard
- Trader Dashboard
- Market Intelligence
- Produce Listings
- Storage Discovery
- Transport Request
- User Profile
- Mobile Responsive Design

## Excluded from MVP

- Payment Integration
- Escrow
- Commission System
- Dark Mode
- Multi-language Support

---

# User Roles

Current agreed MVP roles:

- Farmer
- Trader

### Transport Service

Transport remains a service within the platform.

Whether Transporters will have their own authentication flow and dashboard is pending Product Management confirmation for future iterations.

---

# Authentication Flow

## Registration

Choose Role

↓

Enter Registration Details

↓

Choose OTP Verification Method

- Email OTP

OR

- Phone Voice OTP

↓

Verify OTP

↓

Registration Successful

↓

Login

---

## Login

Phone Number

+

Password

↓

Dashboard

---

## Forgot Password

Enter Phone Number

↓

Choose OTP Method

↓

Verify OTP

↓

Create New Password

↓

Login

---

# Dashboard Structure

**Decided (see DECISIONS.md D-004):** A single shared dashboard route (`/dashboard`) is used, with one `DashboardPage` component conditionally rendering Farmer- or Trader-specific sections based on `user.role`. This supersedes the earlier "separate Farmer/Trader dashboards" framing below, which was the frontend team's default pending PM review — PM has since confirmed the shared-dashboard direction.

---

# Technology Stack

## Frontend

- React.js
- Vite
- TypeScript
- Tailwind CSS

## Routing

- React Router DOM

## API

- Axios

## Server State

- TanStack Query

## Forms

- React Hook Form
- Zod

## Real-time Communication

- Socket.IO Client

## Icons

- Lucide React

## Notifications

- React Hot Toast

---

# Project Structure

```
farmroute-frontend/

├── public/

├── src/

│   ├── assets/

│   ├── components/

│   │   ├── common/

│   │   ├── layout/

│   │   └── ui/

│   ├── constants/

│   ├── contexts/

│   ├── features/

│   │   ├── auth/

│   │   ├── dashboard/

│   │   ├── market/

│   │   ├── storage/

│   │   ├── listings/

│   │   ├── messaging/

│   │   ├── transport/

│   │   └── profile/

│   ├── hooks/

│   ├── layouts/

│   ├── pages/

│   ├── routes/

│   ├── services/

│   ├── styles/

│   ├── types/

│   └── utils/

├── .env.example

├── CHANGELOG.md

├── CONTRIBUTING.md

├── README.md

└── package.json
```

---

# Development Workflow

Git Workflow

```
main

↓

develop

↓

feature/<feature-name>
```

Example

```
feature/auth

feature/dashboard

feature/storage

feature/market

feature/listings

feature/profile
```

Repository Maintainer reviews Pull Requests before merging into `develop`.

After testing, `develop` is merged into `main`.

---

# Branch Strategy

- main → Stable MVP
- develop → Integration branch
- feature/* → Individual feature development

Developers should never push directly to `main`.

---

# Responsive Design

Development follows a **Mobile-First** approach.

Current implementation target:

- Mobile Layout (Primary)

Future layouts (Tablet/Desktop) will follow the approved UI/UX designs.

Tailwind default responsive breakpoints will be used unless updated by the UI/UX Team.

---

# UI/UX Status

Current Status

🟡 Partial Figma Received

Completed

- Mobile design fragments

Pending

- Complete application screens
- Desktop layouts
- Final design approval
- Branding assets

---

# Branding

Current

Logo

Placeholder

Primary Color

Green

Secondary

White

Text

Black

Brand colors and typography will follow the finalized UI/UX design system.

---

# Backend Integration

Current Status

Backend integration guide received.

Frontend implementation will use the backend API specification.

Pending

- Sample JSON responses
- API documentation (Swagger/OpenAPI or equivalent)

---

# Environment Variables

Create a `.env` file.

Example

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Do not commit `.env`.

Only commit `.env.example`.

---

# Installation

Clone repository

```
git clone <repository-url>
```

Navigate into the frontend project

```
cd farmroute-frontend
```

Install dependencies

```
npm install
```

Run development server

```
npm run dev
```

---

# Coding Standards

- Use TypeScript.
- Prefer functional components.
- Keep components reusable.
- Avoid duplicated code.
- Use feature-based architecture.
- Keep API logic inside `services`.
- Keep business logic separate from presentation components.

---

# Feature Ownership

Feature ownership will be assigned by the Frontend Team Lead during implementation.

---

# MVP Priorities

## P0 (Must Have)

- Authentication
- Dashboard
- Market Intelligence
- Produce Listings
- Storage
- User Profile

## P1 (Should Have)

- Messaging
- Transport Request

## P2 (Future Enhancement)

- Dark Mode
- Multi-language Support
- Payment Integration
- Escrow
- Commission System

---

# Pending Decisions

The following items remain pending and require confirmation before implementation:

- Final UI/UX designs and design tokens (typography, color, spacing) — Phase 2 has not started; placeholder green/white/black in use
- Final branding assets
- Backend sample API responses for Forgot Password / Reset Password (see DECISIONS.md D-009 — payload shape unconfirmed)
- Confirmation that `phone` is now returned in auth responses (backend confirmed it will ship before presentation — verify live before demo)
- Deployment platform

Resolved since last update (see DECISIONS.md for full record):
- ~~Product Management confirmation on dashboard architecture~~ — Decided, D-004
- ~~OTP verification method~~ — Decided, D-002
- ~~Login field (phone vs email)~~ — Decided, D-005 (backend correcting a deviation from spec)

---

# Related Documentation

- README.md
- ARCHITECTURE.md — in use, see for route table and auth implementation details
- DECISIONS.md — in use, canonical decision log; check here before re-asking a settled question
- CONTRIBUTING.md
- CHANGELOG.md

Recommended future additions:

- PROJECT_STATUS.md
- API_INTEGRATION.md

---

# License

Internal Hackathon Project.