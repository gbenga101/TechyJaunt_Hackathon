# 🌾 FarmRoute Frontend

Frontend application for **FarmRoute**, a digital agriculture platform designed to connect farmers and traders through market intelligence, produce listings, storage discovery, logistics coordination, and secure communication.

This repository contains the **Frontend Team's codebase** for the FarmRoute MVP.

---

# Project Overview

FarmRoute aims to reduce post-harvest losses and improve market access by providing a centralized platform where users can:

- Discover current market prices
- Create and manage produce listings
- Find nearby storage facilities
- Coordinate transportation
- Communicate directly with buyers and sellers
- Manage their profiles and activities from a unified dashboard

The project follows a **feature-based architecture** to enable multiple frontend developers to work independently with minimal merge conflicts while maintaining a scalable codebase.

---

# MVP Scope

The current MVP focuses on the following modules:

- Authentication
- Dashboard
- Market Intelligence
- Produce Listings
- Storage & Logistics
- Messaging
- User Profile

### Deferred (Out of Scope for MVP)

The following modules are intentionally excluded from the MVP and will be considered after the initial release:

- Payments
- Escrow
- Commission Management
- Admin Dashboard
- AI-powered Recommendations
- Analytics Dashboard

---

# Technology Stack

| Category | Technology |
|-----------|------------|
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM |
| Data Fetching | TanStack Query |
| HTTP Client | Axios |
| Forms | React Hook Form |
| Validation | Zod |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| Real-time Communication | Socket.IO Client |
| Linting | ESLint |

---

# Current Project Status

## ✅ Completed

- Repository initialized
- React + Vite + TypeScript setup
- Tailwind CSS v4 configured
- Project restructured into a single Vite application
- Core project dependencies installed
- Frontend folder architecture established
- TypeScript path aliases configured (`@/*`)
- React Router foundation implemented
- Placeholder pages created
- Documentation initialized

## 🚧 In Progress

Project Foundation

Upcoming work:

- TanStack Query Provider
- Axios API Client
- Environment Variables
- Authentication Context
- Shared TypeScript Models

---

# Project Structure

```text
.
├── docs/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── ui/
│   │
│   ├── constants/
│   ├── contexts/
│   ├── features/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   │   └── api/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env.example
├── ARCHITECTURE.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── PROJECT_STATUS.md
├── DECISIONS.md
├── ROADMAP.md
├── README.md
├── package.json
└── vite.config.ts
```

---

# Folder Overview

| Folder | Responsibility |
|----------|----------------|
| assets | Static assets such as images, icons and fonts |
| components | Shared reusable UI components |
| constants | Application constants and configuration |
| contexts | React Context providers |
| features | Feature-specific modules |
| hooks | Reusable custom hooks |
| layouts | Shared page layouts |
| lib | Third-party library configuration (Axios, Query Client, Socket, etc.) |
| pages | Route-level pages |
| routes | Routing configuration |
| services | API request functions |
| styles | Global styles |
| types | Shared TypeScript interfaces |
| utils | Utility/helper functions |

---

# Getting Started

## Clone the repository

```bash
git clone <repository-url>
cd TechyJaunt_Hackathon
```

---

## Install dependencies

```bash
npm install
```

---

## Start the development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

# Available Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

# Environment Variables

Create a `.env` file in the project root.

Example:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

> The exact API configuration will be finalized once backend integration begins.

---

# Development Workflow

To keep the project stable and maintainable, the team follows the workflow below for every implementation task.

1. Create or switch to the appropriate Git branch.
2. Implement one focused change.
3. Verify the application builds and runs successfully.
4. Update relevant documentation if architecture or setup changes.
5. Commit with a meaningful commit message.
6. Open a Pull Request for review before merging.

---

# Documentation

| Document | Purpose |
|-----------|---------|
| README.md | Project overview and onboarding |
| ARCHITECTURE.md | Frontend architecture and design decisions |
| CONTRIBUTING.md | Contribution guidelines |
| CHANGELOG.md | Project change history |
| PROJECT_STATUS.md | Current implementation progress |
| DECISIONS.md | Record of architectural decisions |
| ROADMAP.md | Implementation roadmap and milestones |

---

# Architecture Principles

The frontend follows these principles:

- Feature-first folder organization
- Reusable UI components
- Type-safe development with TypeScript
- Separation of business logic from presentation
- Centralized API communication
- Server-state management with TanStack Query
- Consistent routing structure
- Shared layouts and design system

For implementation details, see **ARCHITECTURE.md**.

---

# Team Responsibilities

This repository is maintained by the **Frontend Team**.

The frontend coordinates primarily with:

- Product Management
- Backend Team
- UI/UX Team

Other project tracks (AI/ML, Data Science, Digital Marketing, Cybersecurity, Virtual Assistant, etc.) operate independently and are outside the scope of this repository.

---

# Current Implementation Phase

The project is currently in the **Project Foundation** phase.

Completed:

- Project setup
- Tailwind CSS configuration
- Folder architecture
- TypeScript aliases
- React Router foundation

Next milestones:

- TanStack Query
- Axios client
- Authentication context
- Shared data models
- Design system
- Feature implementation

---

# Contributing

Please read **CONTRIBUTING.md** before creating branches or submitting pull requests.

---

# License

This project is proprietary and intended for the FarmRoute capstone project.

Unauthorized distribution or commercial use is prohibited unless approved by the project owners.