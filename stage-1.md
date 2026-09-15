You are building the frontend for GlintPM Private, a premium Owner-Side Project Control & Assurance platform.

TECH STACK
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- TanStack Query
- Axios
- React Hook Form
- Zod
- date-fns
- ESLint
- Prettier

The backend is Django REST Framework with JWT authentication.

IMPORTANT:
Do not implement features belonging to later stages.
Do not build Projects, Payments, Risks, Variations, Inspections, Documents, Reports or Notifications yet.

OBJECTIVE

Build the frontend foundation and authentication system.

The product should feel like a premium private-office platform for high-value property owners, not a generic construction management SaaS.

DESIGN DIRECTION

Use a restrained, professional visual system:
- premium
- clean
- trustworthy
- executive
- minimal
- highly readable
- responsive
- accessible

Avoid:
- excessive gradients
- excessive animations
- overly bright colors
- generic SaaS styling
- crowded dashboards
- unnecessary cards
- excessive text

The owner should eventually be able to understand a ₦500m+ project at a glance.

ARCHITECTURE

Use this structure:

src/
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   ├── providers.tsx
│   └── config.ts
├── components/
│   ├── ui/
│   ├── common/
│   └── forms/
├── layouts/
│   ├── AuthLayout.tsx
│   └── DashboardLayout.tsx
├── features/
│   └── auth/
│       ├── api/
│       ├── components/
│       ├── hooks/
│       ├── schemas/
│       ├── types/
│       └── pages/
├── pages/
├── services/
│   ├── api.ts
│   └── authApi.ts
├── hooks/
├── types/
├── lib/
│   └── utils.ts
├── styles/
│   └── globals.css
└── main.tsx

IMPLEMENT

1. Application configuration
- Read VITE_API_BASE_URL from environment variables.
- Create .env.example.
- Never expose secrets.
- Create centralized frontend configuration.

2. Axios API client
Create:
services/api.ts

Implement:
- Axios instance
- base URL
- JSON headers
- request interceptor for JWT access token
- response handling for authentication failures
- clean error handling

Do not hard-code the backend URL.

3. Authentication

Implement:
- Login page
- Login form
- Email
- Password
- validation using Zod
- loading state
- API error state
- logout
- current-user retrieval

Backend endpoints:

POST /api/auth/token/
POST /api/auth/token/refresh/
GET /api/auth/me/

Adapt the implementation to the actual backend API response shape rather than inventing incompatible fields.

4. Token handling

Implement a secure, maintainable authentication approach appropriate for the current JWT backend.

Keep token handling centralized.

Do not scatter localStorage/token logic throughout components.

5. Auth state

Create:
- AuthProvider or equivalent centralized auth state
- useAuth hook
- authenticated/unauthenticated states
- loading state while restoring authentication

6. Protected routes

Create:
- PublicRoute
- ProtectedRoute

Unauthenticated users should be redirected to /login.

Authenticated users should be redirected to /dashboard.

7. Layout

Create a basic authenticated application shell:
- sidebar
- top navigation
- user menu
- logout
- responsive mobile navigation

Navigation items can be placeholders for future stages:

Dashboard
Projects
Payments
Variations
Progress
Risks & Issues
Inspections
Documents
Reports
Team
Settings

Do not implement the pages yet.

8. Dashboard placeholder

Create /dashboard.

It should contain a professional empty-state message such as:

"Your project portfolio"
"Project intelligence and assurance at a glance."

Do not create fake project data.

9. Error handling

Create reusable handling for:
- 401
- 403
- 404
- 500
- network failure

10. Loading states

Create reusable loading components/skeletons.

11. UI foundation

Configure shadcn/ui and establish reusable components where appropriate:
- Button
- Card
- Input
- Label
- Dropdown/Menu
- Dialog
- Toast/notification
- Skeleton

Do not add dozens of components unnecessarily.

12. TypeScript

Use strict TypeScript.

Avoid:
- any
- unnecessary type assertions
- duplicated interfaces
- API types scattered across components

13. Code quality

Ensure:
- ESLint passes
- Prettier formatting
- npm run build succeeds
- no console errors
- no broken routes

14. Testing

Add basic tests for:
- login validation
- protected route behavior
- auth state
- logout

15. Documentation

Update README with:
- installation
- environment variables
- development command
- build command
- project structure
- authentication architecture

IMPORTANT ARCHITECTURAL RULE

Do not put business logic inside page components.

Prefer:

Page
→ Feature Hook
→ API Service
→ Backend

Keep UI, API calls, schemas and types separated.

FINAL CHECK

Before finishing:
- run npm run build
- run lint
- verify routing
- verify login against the real backend if available
- do not proceed to Stage 2