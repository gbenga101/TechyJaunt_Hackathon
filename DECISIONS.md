# DECISIONS.md

> Lightweight decision log for FarmRoute. Each entry records what was decided, who confirmed it, and why — so the reasoning isn't lost once the conversation that produced it scrolls away. Add new entries at the top.

---

## D-012: Transport scope — Integration Guide's fuller lifecycle may exceed PRD's explicit "Won't"

- **Status:** Open — flagged, not yet resolved, low urgency (Transport pages not yet built)
- **Confirmed by:** N/A — identified via PRD cross-check, not yet raised with anyone
- **Situation:** PRD explicitly lists "Full transport booking, driver assignment, and route optimization" under **Out of scope**, and states under Logistics Visibility: "System does not handle scheduling, tracking, or payment for transport (Won't this phase)." `FarmRoute_Backend_Integration_Guide.docx` §8 describes a fuller Transport service instead: status lifecycle `pending / accepted / in-transit / delivered`, plus proximity-based transporter matching and `transporterId` assignment.
- **Decision:** None yet. When Transport pages are built, default to the PRD's lighter version — a simple flag + basic yes/no or listed availability status — not the Integration Guide's fuller matching/assignment flow, unless Backend/PM explicitly confirm the fuller version is intended.
- **Next step:** Raise with Backend/PM before building Transport pages, not urgent before MVP presentation since those pages don't exist yet.

---

## D-011: AI/ML and Data Science roadmap tracks have no corresponding PRD requirement

- **Status:** Open — cross-team question, outside Frontend's ownership to resolve
- **Confirmed by:** N/A — identified via PRD cross-check, not yet raised with AI/ML or Data Science tracks
- **Situation:** `Farm2Market_Roadmap-3.docx` assigns AI/ML and Data Science their own daily deliverables (prediction workflow, AI integration, prediction model, AI usage log) and a dedicated Day 6 presentation slot ("AI/ML — AI Features"). The PRD's functional requirements contain no request for machine learning or AI features anywhere. The closest related item, the demand indicator, is explicitly scoped in both the PRD ("a simple indicator... not a numeric forecast") and the Integration Guide ("not a full model for MVP") as non-ML.
- **Decision:** None yet — this is not Frontend's call to make. Flagging so it doesn't go unnoticed before Day 6.
- **Next step:** Confirm with whoever owns the AI/ML and Data Science tracks what they're actually building, so the Day 6 "AI Features" presentation segment doesn't overstate scope relative to the PRD.

---

## D-010: Login mechanism — password-based (not per-login OTP) — PM confirmed as intentional post-PRD decision

- **Status:** Decided and confirmed
- **Confirmed by:** Product Management — phone + password was explicitly discussed and agreed after the PRD was dropped
- **Situation:** `Farm2Market_PRD7.pdf` Section 6 (Authentication, Must priority) describes login as OTP-via-SMS, bundling registration and login under one mechanism. The actual build uses phone + password for day-to-day login instead.
- **Decision:** Day-to-day login uses **phone number + password**, per PM's direct confirmation. This is a deliberate, PM-approved deviation from the PRD's original wording, not an oversight or drift.
- **Why:** PM confirmed this was discussed and agreed in a working session after the PRD was finalized — the PRD's OTP-per-login wording predates that conversation and was never updated to reflect it.
- **Supersedes:** PRD Section 6's Authentication requirement row, specifically the "OTP via SMS" login mechanism described there.

---

## D-009: Forgot Password / Reset Password payload — UNCONFIRMED, open item

- **Status:** Decided and Done
- **Confirmed by:** N/A — explicitly not yet answered by Backend
- **Situation:** Backend Dev Readme documents that `/auth/forgot-password`, `/auth/verify-otp` (reset), and `/auth/reset-password` exist and are built, but — unlike `/auth/signup` and `/auth/login` — no example request body was given for any of the three.
- **Decision:** Do not build the Forgot Password form UI against a guessed payload shape. `ForgotPasswordPayload`/`ResetPasswordPayload` types and the corresponding API functions are stubbed with fields marked `UNCONFIRMED` in code comments, not treated as verified.
- **Next step:** Ask Backend for the exact request body for all three endpoints before wiring up `ForgotPasswordPage.tsx` beyond its current placeholder.

---
- **Status:** Open — blocking Forgot Password UI build
- **Confirmed by:** N/A — explicitly not yet answered by Backend
- **Situation:** Backend Dev Readme documents that `/auth/forgot-password`, `/auth/verify-otp` (reset), and `/auth/reset-password` exist and are built, but — unlike `/auth/signup` and `/auth/login` — no example request body was given for any of the three.
- **Decision:** Do not build the Forgot Password form UI against a guessed payload shape. `ForgotPasswordPayload`/`ResetPasswordPayload` types and the corresponding API functions are stubbed with fields marked `UNCONFIRMED` in code comments, not treated as verified.
- **Next step:** Ask Backend for the exact request body for all three endpoints before wiring up `ForgotPasswordPage.tsx` beyond its current placeholder.

---

## D-008: Services layer stays flat (`services/api/` only) — `services/queries/` split deferred

- **Status:** Decided
- **Confirmed by:** Frontend, given MVP time constraint
- **Decision:** For MVP, raw API request functions live in `services/api/` (e.g. `services/api/auth.ts`). TanStack Query hooks live in `services/queries/` (e.g. `services/queries/auth.queries.ts`) — this split already existed as empty scaffolding in the repo, so it was used as-is rather than restructured under deadline.
- **Why:** The folders already existed; using the existing scaffold was lower-risk than either flattening it or inventing a different structure under time pressure.
- **Note:** No further reorganization of this layer should be attempted before MVP delivery.

---

## D-007: `profileComplete` computed client-side for MVP

- **Status:** Decided
- **Confirmed by:** Product/Frontend, pending Backend
- **Decision:** Backend does not currently return `profileComplete` on the auth user object. Frontend computes it client-side in `AuthContext` as `Boolean(user.name && user.phone && user.role)` immediately after login/signup/verify, rather than trusting a backend field that doesn't exist yet.
- **Why:** Unblocks MVP without waiting on a backend field addition. Cheap to replace once backend ships the real field.
- **Revisit:** Post-MVP — once Backend adds a real `profileComplete` field, delete the client-side derivation and use the backend value directly.

---

## D-006: Auth endpoint names — backend's actual implementation is canonical, not the original Integration Guide draft

- **Status:** Decided
- **Confirmed by:** Frontend + Backend (via Backend Dev Readme doc)
- **Decision:** Frontend integrates against the endpoints Backend actually built: `POST /auth/signup`, `POST /auth/verify-register-otp`, `POST /auth/login`, `POST /auth/refresh-token`, `POST /auth/logout`, `POST /auth/logout-all`, `POST /auth/forgot-password`, `POST /auth/verify-otp` (reset only), `POST /auth/reset-password`.
- **Why:** `FarmRoute_Backend_Integration_Guide.docx` (Section 1) describes an earlier, unimplemented draft using `/register` and `/verify-otp` for signup — these names were never built. The Integration Guide is being corrected to match reality rather than treated as the source of truth.
- **Supersedes:** The endpoint names in the original Integration Guide's Section 1 Q&A.

---

## D-005: Login uses phone number + password — backend's `email`-based `/login` was a mistake, not a pivot

- **Status:** Decided
- **Confirmed by:** Product/Frontend (explicitly confirmed this was never an agreed change)
- **Decision:** Day-to-day login remains **phone number + password**, per the original PRD and Backend Integration Guide. Backend's live `/auth/login` currently accepts `email` instead of `phone` — this is a deviation from spec, not a decision anyone made, and Backend has been asked to correct it before MVP presentation.
- **Why:** Nothing in this decision log or any planning document ever recorded a switch to email-based login. Frontend's `LoginPage.tsx` and `services/api/auth.ts` are built sending `{ phone, password }`, matching the original spec — this will fail against the backend until Backend's fix ships.
- **Action required:** Test `POST /auth/login` with `{ phone, password }` against the live backend before the demo starts, once Backend confirms the fix is deployed.

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
- **Confirmed in practice:** Backend Dev Readme doc confirms this shipped — `otpChannel: "email" | "voice"` is accepted at signup, with automatic fallback to email if a voice call fails.

---

## D-001: Frontend Foundation before UI implementation

- **Status:** Decided
- **Confirmed by:** Frontend team working session
- **Decision:** Do not begin building pages until Project Foundation (Phase 1: dependency setup, path aliases, folder structure, Router, Axios, TanStack Query, auth context scaffolding, TypeScript interfaces) and a lightweight Design System pass (Phase 2: typography, color tokens, spacing, base reusable components) are complete.
- **Why:** Minimizes rework across a multi-developer team by giving everyone a stable, shared starting point before feature code is written.
- **Status of execution:** Tailwind CSS v4 confirmed working. Phase 1 auth wiring (Axios instance + interceptor, token storage, AuthContext, TanStack Query auth hooks, auth types) is complete. **Phase 2 (design system / shared `components/ui/`) has not started** — Login, Register, and OTP Verify pages were built ahead of Phase 2 using inline Tailwind utilities and a green/white/black placeholder palette, as an explicit deadline trade-off, not a reordering of the plan. `components/ui/` remains empty.

---

## Open items not yet decided

- **Forgot Password / Reset Password payload shape** — see D-009. Blocking.
- **`phone` field in auth responses** — Backend confirmed it will be added before presentation; not yet independently verified as live. Test before demo.
- **Design tokens (typography, color, border-radius, spacing)** — Phase 2 has not started. Placeholder green/white/black in use on built pages; to be replaced once Product Design shares final tokens.
- **Transport scope** — see D-012. Not urgent; not yet built.
- **AI/ML alignment with PRD** — see D-011. Not Frontend's to resolve; raise with the owning track.