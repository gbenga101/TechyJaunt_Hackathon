# ROADMAP.md

> This document defines the implementation roadmap for the FarmRoute Frontend. It outlines the planned development phases from project setup through MVP delivery. It is intended to help contributors understand what has been completed, what is currently in progress, and what remains to be built.

---

# Roadmap Overview

| Phase | Status |
|--------|--------|
| Phase 0 — Planning & Documentation | ✅ Completed |
| Phase 1 — Project Foundation | 🟡 In Progress |
| Phase 2 — Shared UI Foundation | ⏳ Pending |
| Phase 3 — Authentication | ⏳ Pending |
| Phase 4 — Dashboard | ⏳ Pending |
| Phase 5 — Market Intelligence | ⏳ Pending |
| Phase 6 — Produce Listings | ⏳ Pending |
| Phase 7 — Storage | ⏳ Pending |
| Phase 8 — Messaging | ⏳ Pending |
| Phase 9 — Profile | ⏳ Pending |
| Phase 10 — Testing & Optimization | ⏳ Pending |
| Phase 11 — MVP Release | ⏳ Pending |

---

# Phase 0 — Planning & Documentation

## Objective

Establish the project requirements, architecture, documentation, and development standards before implementation begins.

### Completed

- [x] PRD review
- [x] Frontend planning
- [x] Folder architecture
- [x] Backend integration review
- [x] Documentation strategy
- [x] Development workflow
- [x] README
- [x] ARCHITECTURE
- [x] PROJECT_STATUS
- [x] DECISIONS

**Deliverable**

A documented frontend architecture ready for implementation.

---

# Phase 1 — Project Foundation

## Objective

Build the technical foundation that every feature will depend on.

### Completed

- [x] React + Vite + TypeScript
- [x] Repository restructuring
- [x] Tailwind CSS v4
- [x] Core dependency installation
- [x] Folder structure
- [x] TypeScript path aliases
- [x] React Router foundation
- [x] Placeholder routes
- [x] Placeholder pages

### Remaining

- [ ] TanStack Query Provider
- [ ] Axios client
- [ ] Environment variables
- [ ] Authentication Context
- [ ] Shared TypeScript models
- [ ] React Hot Toast provider
- [ ] Socket.IO client configuration
- [ ] API constants

**Deliverable**

A fully configured frontend foundation ready for feature development.

---

# Phase 2 — Shared UI Foundation

## Objective

Create reusable UI components and layout building blocks.

### Planned

- [ ] Button
- [ ] Input
- [ ] Card
- [ ] Badge
- [ ] Avatar
- [ ] Spinner
- [ ] Empty State
- [ ] Modal
- [ ] Toast wrapper
- [ ] Shared layout shell
- [ ] Navigation components

**Deliverable**

A reusable design system for the application.

---

# Phase 3 — Authentication

## Objective

Implement user authentication flows.

### Planned

- [ ] Login
- [ ] Registration
- [ ] OTP Verification
- [ ] Forgot Password
- [ ] Reset Password
- [ ] Protected routes
- [ ] Session persistence

**Deliverable**

A complete authentication experience integrated with the backend.

---

# Phase 4 — Dashboard

## Objective

Implement the shared dashboard experience.

### Planned

- [ ] Shared dashboard layout
- [ ] Farmer dashboard view
- [ ] Trader dashboard view
- [ ] Dashboard widgets
- [ ] Navigation integration

**Deliverable**

A role-aware dashboard using a single `/dashboard` route.

---

# Phase 5 — Market Intelligence

## Objective

Provide users with market information.

### Planned

- [ ] Market overview
- [ ] Commodity prices
- [ ] Search
- [ ] Filters
- [ ] Price history

**Deliverable**

Market intelligence module.

---

# Phase 6 — Produce Listings

## Objective

Allow users to manage produce listings.

### Planned

- [ ] Browse listings
- [ ] Listing details
- [ ] Create listing
- [ ] Edit listing
- [ ] Delete listing

**Deliverable**

Listings management module.

---

# Phase 7 — Storage

## Objective

Implement storage discovery and booking.

### Planned

- [ ] Storage search
- [ ] Storage details
- [ ] Booking flow

**Deliverable**

Storage module.

---

# Phase 8 — Messaging

## Objective

Enable communication between users.

### Planned

- [ ] Conversation list
- [ ] Chat interface
- [ ] Real-time messaging
- [ ] Message notifications

**Deliverable**

Messaging module.

---

# Phase 9 — Profile

## Objective

Allow users to manage their account.

### Planned

- [ ] View profile
- [ ] Edit profile
- [ ] Account settings

**Deliverable**

Profile module.

---

# Phase 10 — Testing & Optimization

## Objective

Prepare the application for MVP release.

### Planned

- [ ] Route testing
- [ ] API integration testing
- [ ] Responsive testing
- [ ] Accessibility review
- [ ] Performance optimization
- [ ] Bug fixing

**Deliverable**

Production-ready frontend.

---

# Phase 11 — MVP Release

## Objective

Deliver the agreed MVP.

### Planned

- [ ] Final documentation review
- [ ] Version tagging
- [ ] Release build
- [ ] Deployment handoff

**Deliverable**

FarmRoute Frontend MVP.

---

# Post-MVP

The following work is intentionally deferred until after MVP delivery.

- Payments
- Escrow
- Commission management
- Admin dashboard
- AI-powered recommendations
- Advanced analytics
- Reporting enhancements

---

# Success Criteria

The MVP will be considered complete when:

- All planned MVP modules are implemented.
- Backend integration is complete.
- Core user journeys function as expected.
- Documentation is up to date.
- Critical defects are resolved.

---

# Progress Tracking

When a phase is completed:

1. Update this document.
2. Update `PROJECT_STATUS.md`.
3. Record the milestone in `CHANGELOG.md`.
4. Update `README.md` or `ARCHITECTURE.md` if onboarding or architecture has changed.

---

# Related Documents

- README.md
- ARCHITECTURE.md
- PROJECT_STATUS.md
- DECISIONS.md
- CHANGELOG.md
- CONTRIBUTING.md