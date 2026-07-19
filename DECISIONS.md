# DECISIONS.md

> Lightweight decision log for FarmRoute. Each entry records what was decided, who confirmed it, and why — so the reasoning isn't lost once the conversation that produced it scrolls away. Add new entries at the top.

---

## D-004: Shared dashboard implementation approach — role-based conditional rendering

- **Status:** Decided
- **Confirmed by:** Product Management (overall shared-dashboard direction); implementation approach chosen by Frontend
- **Decision:** Implement the single shared dashboard as one route (`/dashboard`) with one `DashboardPage` component that conditionally renders farmer- or trader-specific sections based on `user.role`, rather than fully separate dashboard components/routes per role.
- **Why:** Lowest implementation risk with MVP delivery imminent — one route, one data-fetching layer, no duplicated logic. Satisfies the PRD's "role determines home screen" requirement without the overhead of maintaining two page trees. Still leaves a clean seam (the role check) to split into fully separate dashboards later if needed.
- **Supersedes:** README.md's earlier framing of "separate Farmer/Trader dashboards" as the frontend team's default, which was explicitly pending PM review.

---

## D-003: Payments & Escrow — deferred, not built for MVP

- **Status:** Decided
- **Confirmed by:** Team decision ahead of MVP delivery
- **Decision:** Payment and escrow functionality (UI screen, commission logic, Paystack integration) is paused/abandoned for the current MVP. No payment-related routes, components, or service calls should be built or wired up at this stage.
- **Why:** Matches the original PRD scope, which explicitly lists "Payments and escrow" as out of scope for this sprint. The Backend Integration Guide had described a Payment/escrow service and screen; that portion is not being pursued for MVP given the delivery deadline.
- **Revisit:** Post-MVP, if reintroduced to scope.

---

## D-002: OTP verification method — Email OTP or Phone Voice OTP

- **Status:** Decided
- **Confirmed by:** Product Management, Frontend, and Backend
- **Decision:** Registration and password-reset OTP verification will use **Email OTP or Phone Voice OTP** (user's choice), as documented in README.md's Authentication Flow. Day-to-day login remains phone number + password, unchanged.
- **Why:** Agreed across PM/FE/BE in a prior working session.
- **Note / follow-up:** This differs from the OTP delivery method described in the original Backend Integration Guide and PRD (SMS-based OTP). Backend needs to implement email and voice OTP delivery channels instead of, or in addition to, SMS. Flag this in the next Frontend↔Backend sync to confirm backend implementation matches.

---

## D-001: Frontend Foundation before UI implementation

- **Status:** Decided
- **Confirmed by:** Frontend team working session
- **Decision:** Do not begin building pages until Project Foundation (Phase 1: dependency setup, path aliases, folder structure, Router, Axios, TanStack Query, auth context scaffolding, TypeScript interfaces) and a lightweight Design System pass (Phase 2: typography, color tokens, spacing, base reusable components) are complete.
- **Why:** Minimizes rework across a multi-developer team by giving everyone a stable, shared starting point before feature code is written.
- **Status of execution:** Vite project confirmed stable and pushed to GitHub. Tailwind CSS v4 configuration is the current in-progress step (verifying `tailwindcss`, `@tailwindcss/vite`, `@tailwindcss/postcss` installation before finalizing config approach).

---

## Open items not yet decided

- None currently blocking Frontend, per team's confirmation that all three prior open questions (OTP method, Payments/Escrow, dashboard architecture) are now resolved.
