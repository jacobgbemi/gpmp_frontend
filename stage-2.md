Continue building the GlintPM Private frontend.

STAGE 2 ONLY:
Projects + Owner Dashboard

The frontend foundation and authentication from Stage 1 already exist.

The Django backend Stage 2 provides:
- Projects
- Budgets
- Budget Items
- Progress Updates
- Payment Applications
- Project Dashboard API

IMPORTANT:
Do not implement Risks, Variations, Inspections, Documents, Reports or Notifications yet.

OBJECTIVE

Build the Projects module and the first real owner-facing project dashboard.

The central UX principle is:

"An owner should understand the health of a high-value project within 30 seconds."

PRODUCT POSITIONING

GlintPM Private is an independent owner-side project control and assurance platform.

It is NOT:
- a generic construction ERP
- Primavera P6
- an accounting system
- a contractor management system

The frontend should emphasize:
- financial visibility
- schedule visibility
- physical progress
- payment exposure
- project health

PROJECT ROUTES

Implement:

/projects
/projects/:id/dashboard
/projects/:id/progress
/projects/:id/payments

Only implement these routes in this stage.

PROJECTS PAGE

Create a project portfolio page showing:

- Project name
- Project code
- Location
- Contract value
- Physical progress
- Planned progress
- Project status
- Overall health
- Last update

Provide:
- search
- filtering
- pagination
- loading state
- empty state
- error state

PROJECT DETAIL

Create a project shell/layout with project navigation:

Overview
Progress
Payments

Future navigation items can remain disabled or unavailable.

OWNER DASHBOARD

Build:

/projects/:id/dashboard

Dashboard sections:

1. Project header
- project name
- location
- project status
- contract value
- reporting date

2. KPI cards

Display:

Budget
Forecast Final Cost
Physical Progress
Schedule Variance
Pending Payments
Project Health

Use real backend values.

3. Financial summary

Show:
- Original Budget
- Approved Budget
- Actual Spend
- Committed Cost
- Forecast Final Cost
- Cost Variance

4. Budget chart

Create a clear Recharts visualization comparing:

Budget
Actual
Forecast

Do not create misleading charts.

5. Progress chart

Compare:

Planned Progress
Actual Progress

Display:
- current physical progress
- planned progress
- variance

6. Payment summary

Show:
- Amount Requested
- Amount Recommended
- Amount Approved
- Amount Paid
- Pending amount

IMPORTANT:

Never collapse these four payment values into one.

7. Executive status

Create a concise status panel explaining:
- financial status
- schedule status
- progress status
- payment status

Use backend data.

Do not invent AI-generated explanations.

8. Mobile responsiveness

The dashboard must work properly on:
- desktop
- tablet
- mobile

On mobile, prioritize:
1. Project status
2. Budget
3. Forecast
4. Progress
5. Schedule
6. Payments

9. API integration

Use TanStack Query.

Create feature-specific hooks such as:

useProjects()
useProject()
useProjectDashboard()
useProjectProgress()
useProjectPayments()

API calls must live in API service files.

Do not call Axios directly inside page components.

10. Types

Create strongly typed interfaces matching the Django API.

Do not invent fields that do not exist in the backend.

If backend response fields differ from assumptions, adapt the frontend to the actual API.

11. Formatting

Create reusable utilities for:
- currency
- percentages
- dates
- variance
- status labels

Support NGN properly.

Do not hard-code currency symbols throughout the UI.

12. UX states

Every major page must support:

Loading
Empty
Error
Success

Do not leave blank screens.

13. Performance

Use:
- TanStack Query caching
- query invalidation
- pagination
- select_related-compatible API expectations
- avoid unnecessary refetching

14. Design

Use the existing GlintPM Private design system from Stage 1.

The dashboard should feel:
- premium
- calm
- executive
- trustworthy

Avoid:
- giant charts
- dashboard clutter
- excessive cards
- unnecessary animations

15. DEMO PROJECT

The backend demo project is:

Luxury Residence — Lekki

Approximately:
- ₦500m project
- actual progress around 62%
- planned progress around 70%
- budget pressure
- pending payment
- project risks may exist later but do not implement risk UI yet

Use ONLY data returned by the backend.

Do not hard-code demo numbers into the frontend.

16. Testing

Test:
- project list
- project detail
- dashboard rendering
- loading states
- error states
- payment summary
- currency formatting
- progress calculations

17. Final checks

Run:
npm run build
npm run lint

Verify:
- authentication
- project API integration
- dashboard API integration
- responsive layout
- no console errors

STOP after Stage 2.
Do not implement Stage 3 features.