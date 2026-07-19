# ARCHITECTURE.md

> This document describes the architectural decisions, design principles, and implementation strategy for the FarmRoute frontend. It complements **README.md**, which focuses on project onboarding and setup.

---

# 1. Architecture Goals

The frontend architecture is designed to:

- Support parallel development by multiple frontend developers.
- Minimize merge conflicts.
- Keep business logic separate from presentation.
- Provide a scalable foundation for future features.
- Align with the Backend Integration Guide and Product Requirements Document (PRD).
- Deliver the agreed MVP without unnecessary complexity.

---

# 2. Architectural Principles

The project follows these core principles:

- Feature-first organization
- Component reusability
- Separation of concerns
- Type safety
- Predictable routing
- Centralized API communication
- Server-state management
- Progressive enhancement

Every architectural decision in this document supports one or more of these principles.

---

# 3. Feature-Based Folder Structure

Rather than organizing code by technical layer, FarmRoute groups functionality by business domain.

Example:

```text
features/
    auth/
    dashboard/
    market/
    listings/
    storage/
    messaging/
    profile/
```

## Why?

Each feature corresponds directly to a module in the PRD.

Benefits:

- easier onboarding
- reduced merge conflicts
- clearer ownership
- improved scalability
- easier testing

Shared code remains outside `features/`.

```text
components/
hooks/
layouts/
utils/
lib/
types/
```

These directories contain reusable code that is not tied to a single feature.

---

# 4. Project Structure

```text
src/
│
├── assets/
├── components/
│   ├── common/
│   ├── layout/
│   └── ui/
│
├── constants/
├── contexts/
├── features/
├── hooks/
├── layouts/
├── lib/
├── pages/
├── routes/
├── services/
│   └── api/
├── styles/
├── types/
├── utils/
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# 5. Current Foundation Status

## ✅ Implemented

- React + Vite + TypeScript
- Tailwind CSS v4
- ESLint
- Folder architecture
- TypeScript aliases
- React Router foundation
- Placeholder pages

## 🚧 Planned

- TanStack Query Provider
- Axios Client
- Authentication Context
- Shared Types
- Environment Variables
- Socket.IO Client
- Feature modules

---

# 6. Routing Architecture

Routing is handled using **React Router**.

Current route groups:

| Route | Purpose |
|--------|----------|
| /login | Login |
| /register | Registration |
| /dashboard | Shared dashboard |
| /market | Market Intelligence |
| /storage | Storage |
| /listings | Produce listings |
| /profile | User profile |
| * | Not Found |

Placeholder pages have been intentionally created before UI implementation.

This stabilizes navigation while allowing multiple developers to work independently.

---

# 7. Route Strategy

The application uses:

- BrowserRouter
- Centralized route constants
- Shared AppRouter component

Example:

```text
routes/
    AppRouter.tsx
    paths.ts
    index.ts
```

Route paths are centralized to prevent duplicated strings throughout the project.

---

# 8. Dashboard Strategy

The application uses a **single dashboard route**.

```text
/dashboard
```

The dashboard renders different views depending on the authenticated user's role.

Example:

```tsx
if (user.role === "farmer") {
    return <FarmerDashboard />
}

return <TraderDashboard />
```

Advantages:

- single route
- shared layout
- less duplication
- easier maintenance

This matches the agreed MVP scope.

---

# 9. Authentication Architecture

Authentication will use React Context.

Responsibilities include:

- login
- logout
- current user
- authentication state
- role information

The authentication provider will expose:

```ts
user

isAuthenticated

login()

logout()
```

Authentication implementation begins after API configuration.

---

# 10. API Architecture

All HTTP communication will use a single Axios client.

Planned location:

```text
src/lib/axios.ts
```

Responsibilities:

- Base URL
- JWT attachment
- Response interceptors
- Error handling
- Future refresh-token handling

Components should never call Axios directly.

Instead:

```text
Component

↓

Feature Hook

↓

API Service

↓

Axios Client

↓

Backend
```

---

# 11. Server-State Management

FarmRoute uses **TanStack Query**.

Reasoning:

Most frontend state comes from the backend.

Examples:

- listings
- prices
- storage availability
- messages
- user profile

Benefits:

- caching
- background refetching
- retry handling
- loading states
- error states

Redux is intentionally not used because it would introduce unnecessary complexity for the MVP.

---

# 12. Form Management

Forms will use:

- React Hook Form
- Zod

Responsibilities:

- validation
- submission
- error handling

Business validation rules remain shared with the backend.

---

# 13. Shared Components

Reusable components belong inside:

```text
components/ui/
```

Examples:

- Button
- Input
- Card
- Badge
- Spinner
- Modal
- Avatar
- EmptyState

Layout-specific components belong inside:

```text
components/layout/
```

Examples:

- Navbar
- Sidebar
- DashboardShell
- Footer

---

# 14. Library Configuration

Infrastructure libraries belong inside:

```text
lib/
```

Examples:

```text
axios.ts

queryClient.ts

socket.ts
```

These files configure third-party libraries.

They do not contain business logic.

---

# 15. Services Layer

Raw API request functions belong inside:

```text
services/api/
```

Examples:

```text
auth.ts

market.ts

storage.ts

listing.ts

profile.ts
```

These files contain HTTP requests only.

No UI logic belongs here.

---

# 16. Feature Layer

Each feature owns:

- components
- hooks
- pages (where appropriate)
- business logic

Example:

```text
features/

    listings/

        components/

        hooks/

        utils/
```

This keeps features isolated and easier to maintain.

---

# 17. TypeScript

Shared interfaces belong inside:

```text
types/
```

The goal is to mirror backend contracts.

Benefits:

- compile-time safety
- autocomplete
- safer refactoring
- consistent API integration

---

# 18. Payments

Payments are intentionally excluded from the MVP.

Do not implement:

- payment routes
- escrow
- commissions

until the MVP has been completed.

---

# 19. Documentation Strategy

The repository maintains:

- README.md
- ARCHITECTURE.md
- PROJECT_STATUS.md
- ROADMAP.md
- DECISIONS.md
- CHANGELOG.md
- CONTRIBUTING.md

Each document serves a unique purpose and should be updated alongside implementation milestones.

---

# 20. Current Implementation Phase

Current phase:

**Project Foundation**

Completed:

- Project setup
- Tailwind CSS
- Folder architecture
- TypeScript aliases
- React Router

Next:

- TanStack Query
- Axios
- Environment variables
- Authentication
- Shared models

After the foundation is complete, development will proceed feature-by-feature according to the project roadmap.

---

# 21. Scope

This document covers the **Frontend application architecture only**.

Backend architecture, AI/ML, Data Science, Cybersecurity, Digital Marketing, Brand Design, and Virtual Assistant activities are maintained separately and are outside the scope of this document.