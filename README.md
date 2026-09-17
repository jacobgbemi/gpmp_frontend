# GlintPM Private — Frontend

Owner-side Project Control & Assurance platform. Stage 1 covers the
application foundation and authentication system only — no project,
payment, risk, variation, inspection, document or reporting features
yet (see `stage-1.md`).

## Tech stack

React · TypeScript · Vite · Tailwind CSS v4 · shadcn/ui-style
components (Radix primitives) · React Router · TanStack Query ·
Axios · React Hook Form · Zod · date-fns · Vitest.

Backend: Django REST Framework with JWT authentication (SimpleJWT).

## Installation

```bash
npm install
cp .env.example .env.local
# edit .env.local and point VITE_API_BASE_URL at your Django backend
npm run dev
```

## Environment variables

| Variable              | Description                                   | Example                 |
| ---------------------- | ---------------------------------------------- | ------------------------ |
| `VITE_API_BASE_URL`   | Base URL of the Django REST API (no trailing slash) | `http://localhost:8000` |

Only variables prefixed `VITE_` are exposed to the client bundle by
Vite — never put secrets in `.env*` files. `app/config.ts` is the
single place environment variables are read from; nothing else in
the app should touch `import.meta.env` directly.

## Commands

| Command             | Description                          |
| -------------------- | ------------------------------------- |
| `npm run dev`        | Start the Vite dev server             |
| `npm run build`      | Type-check (`tsc -b`) and build for production |
| `npm run preview`    | Preview the production build locally  |
| `npm run lint`       | Run oxlint                            |
| `npm run test`       | Run the test suite once (Vitest)      |
| `npm run test:watch` | Run tests in watch mode               |

## Project structure

```
src/
├── app/                  # App composition: App.tsx, router, providers, env config
├── components/
│   ├── ui/                # Reusable, unopinionated primitives (Button, Card, Dialog, ...)
│   ├── common/             # App-level shared components (Sidebar, ErrorState, route guards, ...)
│   └── forms/              # Reserved for shared form building blocks
├── layouts/               # AuthLayout, DashboardLayout — route-level shells
├── features/
│   └── auth/               # Everything auth: api/, components/, hooks/, schemas/, types/, pages/, context/
├── pages/                  # Standalone pages not tied to a feature (Dashboard, 404, 403, 500)
├── services/               # Cross-feature API clients (api.ts, authApi.ts, tokenStorage.ts)
├── hooks/                  # Reserved for cross-feature hooks
├── types/                  # Shared, backend-shape-agnostic types (ApiError, ...)
├── lib/                    # Framework-agnostic utilities (cn/tailwind-merge helper)
├── styles/                 # globals.css — Tailwind import + design tokens
└── main.tsx
```

**Architectural rule:** business logic never lives in page components.
Data flow is always `Page → Feature Hook → API Service → Backend`. UI,
API calls, schemas and types stay in separate files.

## Authentication architecture

Backend endpoints used:

- `POST /api/auth/token/` — login, returns `{ access, refresh }`
- `POST /api/auth/token/refresh/` — exchanges a refresh token for a new access token
- `GET /api/auth/me/` — returns the current user

**Token storage** (`services/tokenStorage.ts`, the only module allowed
to touch token storage directly):

- The **access token** is kept in memory only (a module-level
  variable). It is short-lived and never written to disk, limiting
  its exposure if a malicious script ever runs on the page.
- The **refresh token** is persisted to `localStorage` so a returning
  user isn't forced to log in on every reload. This is a pragmatic
  choice for a JWT-only backend; migrating the refresh token to a
  server-set httpOnly cookie is the natural next hardening step and
  would only require changes inside `tokenStorage.ts` and the
  refresh call in `services/api.ts`.

**Request/response flow** (`services/api.ts`):

- A request interceptor attaches `Authorization: Bearer <access token>`
  to every outgoing request.
- A response interceptor catches `401`s, transparently refreshes the
  access token (de-duplicating concurrent refreshes into a single
  in-flight request), and retries the original request once. If the
  refresh itself fails, tokens are cleared and the app is notified to
  redirect to `/login`.
- All errors are normalized into a single `ApiError` type
  (`types/api.ts`) with `status` and the parsed response `body`, so
  UI code never has to branch on Axios internals.

**Auth state** (`features/auth/context/`, exposed via `useAuth()`):

- `AuthProvider` is mounted once at the root (`app/providers.tsx`). On
  mount it attempts to restore a session from the persisted refresh
  token *before* rendering protected routes (`isLoading`), so
  authenticated users never see a flash of the login page on reload.
- Exposes `{ user, isAuthenticated, isLoading, login, logout }`.

**Route guards** (`components/common/`):

- `<ProtectedRoute />` redirects unauthenticated users to `/login`
  (preserving the attempted location so they return there after
  signing in).
- `<PublicRoute />` redirects authenticated users to `/dashboard`.

## Design system

Brand tokens live in `src/styles/globals.css` under Tailwind v4's
`@theme`, and are consumed everywhere as `bg-primary`,
`text-foreground`, `border-border`, etc. — never as hardcoded hex
values in components. Primary: deep teal `#085156`. Accent: lime
`#C6F325`, used sparingly for emphasis only.

## Testing

Tests cover login validation, protected/public route redirects, auth
state transitions and logout, using Vitest + React Testing Library.
Run with `npm run test`.

## Stage 1 scope

This stage intentionally stops at authentication and the app shell.
Projects, Payments, Risks, Variations, Inspections, Documents,
Reports and Notifications are out of scope until later stages — see
`stage-2.md` onward. Sidebar navigation items for those areas are
rendered as disabled placeholders.
