# DECISIONS.md

> This document records significant technical and architectural decisions made during the development of the FarmRoute frontend. It explains **what was decided**, **why it was chosen**, and **what alternatives were considered**. It should be updated whenever a decision changes the project's architecture, development workflow, or implementation strategy.

---

# Decision Log

| ID | Decision | Status |
|----|----------|--------|
| D-001 | React + Vite + TypeScript | ✅ Accepted |
| D-002 | Tailwind CSS v4 | ✅ Accepted |
| D-003 | Feature-based Architecture | ✅ Accepted |
| D-004 | TypeScript Path Aliases | ✅ Accepted |
| D-005 | React Router | ✅ Accepted |
| D-006 | Single Shared Dashboard | ✅ Accepted |
| D-007 | TanStack Query | ✅ Accepted |
| D-008 | Axios as HTTP Client | ✅ Accepted |
| D-009 | React Context for Authentication | ✅ Accepted |
| D-010 | Shared UI Component Library | ✅ Accepted |
| D-011 | Payments Deferred from MVP | ✅ Accepted |
| D-012 | Documentation-first Workflow | ✅ Accepted |

---

# D-001 — React + Vite + TypeScript

## Decision

Use React with Vite and TypeScript as the frontend stack.

## Reason

- Fast development experience.
- Strong TypeScript support.
- Excellent ecosystem.
- Widely adopted by modern frontend teams.
- Good fit for the project's expected size.

## Alternatives Considered

- Next.js
- Create React App

## Outcome

Accepted.

---

# D-002 — Tailwind CSS v4

## Decision

Use Tailwind CSS v4 for styling.

## Reason

- Utility-first workflow.
- Consistent design implementation.
- Faster UI development.
- Reduced custom CSS.
- Improved maintainability.

## Alternatives Considered

- Bootstrap
- Material UI
- Styled Components

## Outcome

Accepted.

---

# D-003 — Feature-based Architecture

## Decision

Organize code by business features instead of technical layers.

Example:

```text
features/
    auth/
    market/
    listings/
    storage/
```

## Reason

- Maps directly to PRD modules.
- Easier ownership.
- Easier onboarding.
- Fewer merge conflicts.
- Better scalability.

## Alternatives Considered

Layer-first architecture:

```text
components/
hooks/
pages/
services/
```

## Outcome

Accepted.

---

# D-004 — TypeScript Path Aliases

## Decision

Use `@/*` as the root import alias.

Example:

```ts
import Button from "@/components/ui/Button";
```

instead of

```ts
import Button from "../../../../components/ui/Button";
```

## Reason

- Cleaner imports.
- Easier refactoring.
- Better readability.

## Outcome

Accepted.

---

# D-005 — React Router

## Decision

Use React Router for navigation.

## Reason

- Industry standard.
- Good nested routing support.
- Easy route protection.
- Flexible route composition.

## Outcome

Accepted.

---

# D-006 — Single Shared Dashboard

## Decision

Use one shared dashboard route:

```text
/dashboard
```

Render different dashboard views based on the authenticated user's role.

## Reason

- Less duplicated code.
- Shared layout.
- Simpler routing.
- Easier maintenance.

## Alternatives Considered

Separate routes:

```text
/farmer/dashboard

/trader/dashboard
```

## Outcome

Accepted.

---

# D-007 — TanStack Query

## Decision

Use TanStack Query for server-state management.

## Reason

Most application data originates from the backend.

Examples:

- Listings
- Market prices
- Storage
- Messages
- User profile

TanStack Query provides:

- caching
- background refetching
- retry logic
- loading states
- error handling

without introducing unnecessary global state.

## Alternatives Considered

Redux Toolkit

## Outcome

Accepted.

---

# D-008 — Axios

## Decision

Use a single configured Axios client.

## Planned Location

```text
src/lib/axios.ts
```

## Reason

- Centralized HTTP configuration.
- Request interceptors.
- Response interceptors.
- JWT handling.
- Easier API maintenance.

## Outcome

Accepted.

---

# D-009 — Authentication

## Decision

Authentication state will be managed using React Context.

## Responsibilities

- Current user
- Authentication status
- Login
- Logout
- User role

## Reason

Authentication is global application state but does not require a dedicated state management library.

## Outcome

Accepted.

---

# D-010 — Shared UI Components

## Decision

Build reusable UI components before feature implementation.

Location:

```text
components/ui/
```

## Reason

- Consistent UI.
- Reduced duplication.
- Faster feature development.
- Easier maintenance.

## Outcome

Accepted.

---

# D-011 — Payments Deferred

## Decision

Payments and escrow will not be implemented in the MVP.

## Reason

- Outside agreed MVP scope.
- Reduces implementation risk.
- Allows focus on core marketplace functionality.

## Outcome

Accepted.

---

# D-012 — Documentation-first Workflow

## Decision

Major implementation milestones should be accompanied by documentation updates.

Affected documents include:

- README.md
- ARCHITECTURE.md
- PROJECT_STATUS.md
- ROADMAP.md
- CHANGELOG.md

## Reason

- Keeps documentation synchronized with implementation.
- Improves onboarding.
- Prevents architecture drift.
- Makes project status easier to understand.

## Outcome

Accepted.

---

# Decision Principles

Future architectural decisions should:

- Align with the PRD.
- Stay within the agreed MVP scope.
- Reduce unnecessary complexity.
- Improve maintainability.
- Support team collaboration.
- Avoid premature optimization.

---

# Decision Review

Architectural decisions should only be revisited when:

- The PRD changes.
- Backend contracts change significantly.
- A chosen technology no longer meets project requirements.
- A change clearly improves maintainability without expanding MVP scope.

When a decision changes, update:

- DECISIONS.md
- ARCHITECTURE.md
- README.md (if onboarding is affected)
- CHANGELOG.md

---

# Related Documents

- README.md
- ARCHITECTURE.md
- PROJECT_STATUS.md
- ROADMAP.md
- CHANGELOG.md
- CONTRIBUTING.md