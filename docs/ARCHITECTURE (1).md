# ARCHITECTURE.md

> This document explains **how** the FarmRoute frontend is designed and **why**, as a companion to README.md (which covers onboarding). It reflects the state of the project as of the eve of MVP delivery.

---

## 1. Why a feature-based folder structure

Code is organized by domain (`features/auth`, `features/market`, `features/storage`, `features/listings`, `features/messaging`, `features/transport`, `features/profile`) rather than by technical layer (all components together, all hooks together, etc.).

Reasoning:
- Each feature maps directly to a PRD module (Storage & Logistics, Market Intelligence, Market Linkage), so a developer working a ticket only needs to open one folder.
- Reduces merge conflicts across a multi-developer team working in parallel during the sprint.
- Shared, cross-feature code (generic UI, layout, hooks, utils) stays outside `features/` so it's obvious what's reusable vs. domain-specific.

## 2. Why TanStack Query instead of Redux

- All frontend state is primarily **server state** (listings, prices, storage availability, messages) rather than complex client-only state.
- TanStack Query gives caching, background refetching, and loading/error states out of the box, which matches the PRD's non-functional requirement that core flows must work over intermittent 2G/3G connections — stale-while-revalidate behavior is a better fit than manually managed Redux state for that condition.
- Client-only UI state (modals, form state, toasts) is handled locally with React state or React Hook Form — there is no need for a global client-state library.

## 3. Why TypeScript

- The backend contract (see FarmRoute Backend Integration Guide) is well-specified with explicit field names and types for every resource (User, Listing, Storage, Transport Request, Message, Market data). TypeScript interfaces mirror this contract directly, catching integration mismatches at compile time rather than at runtime during demo.
- Multiple developers touching shared types benefits from IDE autocomplete and refactor safety.

## 4. Route organization

Routing is configured with React Router. Route groups:

| Route | Notes |
|---|---|
| `/login`, `/register`, `/otp-verify`, `/forgot-password` | Public, unauthenticated |
| `/dashboard` | **Single shared route**, role-based rendering (see §6) |
| `/market` | Market intelligence dashboard |
| `/storage` | Cold-storage search/booking |
| `/listings`, `/listings/new` | Marketplace / create listing |
| `/messages/:threadId` | Messaging/chat |
| `/profile` | Profile view/edit |

Placeholder routes are created before any UI implementation, per the agreed Phase 1 → Phase 3 sequencing, so navigation structure is stable before pages are built.

## 5. API communication

- A single Axios instance (`services/apiClient.ts`) holds the base URL (`VITE_API_BASE_URL`, defaulting to `http://localhost:5000/api/v1` in development), a request interceptor (attaches the JWT access token), and a response interceptor (placeholder for refresh-token handling / 401 redirect to login).
- All network calls live inside `services/`, never inside components directly — components call feature-level hooks (e.g., `useListings()`), which call `services/`, which call the Axios client. This keeps API logic testable and swappable independent of UI.
- Server response shape follows the backend's stated error contract: `{ success: false, error: { code, message, details? } }` for failures, so error handling can be centralized in the response interceptor.

## 6. Authentication & dashboard architecture

**Registration / OTP:** Registration uses **Email OTP or Phone Voice OTP** (user's choice at signup), per the confirmed decision across PM, Frontend, and Backend — this is the flow documented in README.md and takes precedence over any earlier SMS-only OTP spec referenced elsewhere. Login (day-to-day) remains phone number + password, unchanged from the original backend spec.

> Note for Backend coordination: this means the OTP delivery mechanism backend implements needs to support email and voice channels for registration/reset, not SMS. Flag this explicitly in your next BE sync if it hasn't been implemented yet, since the original Backend Integration Guide describes SMS-only OTP.

**Auth context** (`contexts/AuthContext.tsx`) exposes `login()`, `logout()`, `user`, `isAuthenticated`. `user.role` (`farmer` | `trader`) comes directly from the auth response — no secondary lookup is needed to determine what a user can see.

**Dashboard:** A **single shared dashboard route** (`/dashboard`) is used, per PM's confirmed decision, rather than two separate dashboard routes. Implementation: one `DashboardPage` component reads `user.role` from `AuthContext` and conditionally renders role-specific sections (e.g., `<FarmerDashboardView />` or `<TraderDashboardView />`) inside a shared layout shell. This satisfies the PRD requirement that "role determines which home screen the user sees" while keeping a single route, single data-fetching layer, and minimal duplication — the lowest-risk option this close to MVP. The role-check boundary is the intended seam if a future split into fully separate dashboard pages is ever needed.

## 7. Payments / Escrow — explicitly deferred

Per PRD scope and the team's decision ahead of MVP, **Payments and Escrow are out of scope** for this delivery. Any related UI (payment screen, commission display) and backend service work is paused, not built. Do not wire up payment-related routes or components for MVP; revisit post-MVP if reintroduced.

## 8. Shared components

Built independently of final page layouts, so they can be assembled once page work starts: `Button`, `Input`, `Card`, `Modal`, `Spinner`, `EmptyState`, `Badge`, `Avatar`, `Toast wrapper`. These live in `components/ui/`. Layout-level components (nav, shell, dashboard frame) live in `components/layout/`.

## 9. Auth implementation — completed for MVP

This section reflects the actual auth wiring completed in this repo, as of MVP build:

- **`lib/axios.ts`** — single Axios instance (`baseURL` from `VITE_API_BASE_URL`, which already includes `/api/v1` — request paths elsewhere must stay relative, e.g. `/auth/login`, not `/api/v1/auth/login`, to avoid double-versioning). A request interceptor attaches `Authorization: Bearer <token>` automatically, reading from `lib/tokenStorage.ts`.
- **`lib/tokenStorage.ts`** — plain (non-React) `localStorage`-backed token store. Exists because the axios interceptor runs outside React and can't call hooks; `AuthContext` also stays in sync with it so a page refresh doesn't lose the session.
- **`services/api/auth.ts`** — raw request functions for all real backend auth endpoints (see D-006 in DECISIONS.md for the confirmed endpoint names). Auth responses are typed as flat `AuthResponse`, **not** wrapped in the generic `ApiResponse<T>` — the real backend does not nest auth data under a `data` field.
- **`services/queries/auth.queries.ts`** — TanStack Query `useMutation` hooks (`useSignup`, `useVerifyRegisterOtp`, `useLogin`, `useLogout`, `useForgotPassword`, `useResetPassword`) wired to `AuthContext` and `tokenStorage`.
- **`contexts/AuthContext.tsx`** — holds `auth` state and computes `profileComplete` client-side (see D-007 in DECISIONS.md).
- **Pages built:** `Login`, `Register`, `OtpVerify` — fully wired to the above, using inline Tailwind utilities with a green/white/black placeholder palette (Phase 2 design system has not started; see D-001). `ForgotPassword` remains a placeholder pending the payload confirmation in D-009.

## 10. Current scope note

This document reflects **Frontend architecture only**. Data Science, AI/ML, Brand Design, Digital Marketing, Cybersecurity, and Virtual Assistant tracks from the overall project roadmap continue in parallel but are outside this document's scope and outside the frontend owner's direct responsibility (frontend coordinates with Backend and Product Management only).