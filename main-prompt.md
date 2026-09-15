You are a senior React/TypeScript product designer and frontend architect.

Build the frontend MVP for:

GLINTPM PRIVATE
Owner's Project Control & Assurance Platform

PRODUCT

GlintPM Private is an executive project-controls and assurance platform for owners of high-value construction projects.

The user should feel that this is a premium private-office product—not a generic construction management application.

PRIMARY USER

The primary user is a property owner, HNWI, investor, executive or diaspora client who wants to understand:

- How much have I spent?
- How much more will I spend?
- Are we on schedule?
- Is the contractor performing?
- What payments are pending?
- What variations are being requested?
- What are the biggest risks?
- What requires my decision?

SECONDARY USERS

- GlintPM Project Controls team
- Project Manager
- Site Inspector
- Consultant
- Organization Admin

TECHNOLOGY

Use:

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui or equivalent accessible component system
- TanStack Query
- React Hook Form
- Zod
- Recharts
- Axios or equivalent API client

The frontend must communicate with the Django REST API.

Do NOT hardcode project data in production components.

Create a centralized API service layer.

DESIGN DIRECTION

Premium.

Think:

Private wealth office
+
Project controls
+
Executive dashboard

Avoid:

- overly colorful dashboards
- cartoonish construction graphics
- excessive cards
- unnecessary animations
- dense ERP interfaces
- generic SaaS appearance

Use a sophisticated neutral interface with restrained use of the GlintPM brand accent.

Typography should be highly readable.

The interface must work beautifully on:

- desktop
- tablet
- mobile

OWNER EXPERIENCE

The owner should be able to understand the health of a ₦500m project within 30 seconds.

The home screen should answer:

PROJECT STATUS

Money
Progress
Schedule
Contractor
Risk
Decisions

GLOBAL NAVIGATION

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

For Owner users, simplify the navigation to the most important areas.

LOGIN

Create:

/login

Fields:

Email
Password

Include:

Forgot password
Remember session
Login error handling

APP SHELL

Desktop:

Sidebar navigation
Top header
Organization/project selector
Notifications
User menu

Mobile:

Bottom navigation or collapsible sidebar.

PROJECT SELECTOR

Users with multiple projects should be able to switch projects quickly.

Display:

Project name
Location
Status

PROJECT DASHBOARD

Route:

/projects/:projectId/dashboard

This is the most important screen.

Header:

Project name
Project code
Location
Overall status

Example:

LUXURY RESIDENCE — LEKKI

₦500M PROJECT

Status:
ATTENTION REQUIRED

EXECUTIVE KPI SECTION

Display six primary indicators:

1. Budget
₦500M

2. Forecast Final Cost
₦545M

3. Physical Progress
55%

4. Schedule Variance
-7%

5. Open High Risks
4

6. Pending Decisions
3

Do not overload the screen.

FINANCIAL SUMMARY

Show:

Original Budget
Approved Budget
Actual Spend
Committed Cost
Forecast Final Cost
Variance

Create a clear chart showing:

Budget vs Actual vs Forecast

Use accessible tooltips.

SCHEDULE SUMMARY

Show:

Planned Progress
Actual Progress
Variance
Planned Completion
Forecast Completion

Create a planned-vs-actual progress chart.

RISK SUMMARY

Display:

Critical
High
Medium
Low

Use a risk matrix.

TOP RISKS

Show 3–5 most important risks.

Each risk:

Title
Impact
Probability
Owner
Due date
Status

PAYMENT SUMMARY

Show:

Pending Applications
Requested
Recommended
Approved
Paid

Create a payment table.

Example:

Application #12
Requested: ₦35M
Recommended: ₦29M
Status: Under Review

VARIATION SUMMARY

Show:

Proposed
Under Review
Approved
Rejected

Highlight significant variations.

CONTRACTOR PERFORMANCE

Create a contractor scorecard:

Programme
Quality
Resources
Procurement
Documentation
Responsiveness

Overall score:

72/100

DECISIONS REQUIRED

This should be highly visible.

Example:

"Variation #07 requires owner approval — ₦8.5M"

"Contractor recovery programme requires approval"

Each decision should have:

Issue
Financial impact
Deadline
Recommended action
CTA

EXECUTIVE SUMMARY

Show a concise AI-like/manual summary:

"Project progress is 7 percentage points behind plan. Forecast cost is currently ₦45M above the approved budget. The principal risks are MEP procurement and contractor productivity."

Do not implement AI initially.

The backend provides the summary.

PROJECTS PAGE

Route:

/projects

Display projects in a clean table/card hybrid.

Columns:

Project
Client
Budget
Progress
Forecast Cost
Completion
Status

Allow:

Search
Filter
Sort

PROJECT CREATION

Create project form.

Fields:

Project name
Project code
Project type
Location
Client
Contractor
Budget
Start date
Completion date

PROGRESS PAGE

Route:

/projects/:id/progress

Show:

planned vs actual progress
progress history
milestones
milestone status
latest progress update

Provide:

Add Progress Update

Form:

Reporting period
Planned progress
Actual progress
Narrative

PAYMENTS PAGE

Route:

/projects/:id/payments

Show payment applications.

Columns:

Application
Contractor
Requested
Recommended
Approved
Paid
Status
Date

Provide:

View
Review
Approve/recommend depending on permissions

Payment detail page should clearly distinguish:

REQUESTED
RECOMMENDED
APPROVED
PAID

This distinction is critical to the product.

VARIATIONS PAGE

Route:

/projects/:id/variations

Show:

Variation number
Description
Requested amount
Assessed amount
Approved amount
Status

Provide filtering by status.

RISK PAGE

Route:

/projects/:id/risks

Show:

Risk register

Columns:

Risk
Category
Probability
Impact
Score
Owner
Due Date
Status

Create a visual risk matrix.

Allow:

Create risk
Edit risk
Close risk
Filter risks

ISSUES PAGE

Separate project issues from risks.

Show:

Issue
Priority
Owner
Due date
Status

INSPECTIONS

Route:

/projects/:id/inspections

Show:

Inspection date
Inspector
Location
Overall status
Key findings

Inspection detail page:

Summary
Progress observations
Quality observations
Materials
Contractor
Safety
Commercial
Evidence/photos
Recommendations

SITE EVIDENCE

Create a gallery.

Display:

Photo
Date
Location
Description
Inspection

Allow users to open evidence in a lightbox/detail view.

DOCUMENTS

Create a professional document management interface.

Folders:

Contracts
BOQ
Drawings
Schedules
Payments
Variations
Reports
Inspections
Other

Support:

Upload
Download
Preview where supported
Version display
Search
Filter

REPORTS

Route:

/projects/:id/reports

Display monthly reports.

Example:

September 2026
Project Executive Report

Status:

Draft
Published

Report detail should look like an executive board report.

Sections:

Executive Summary
Project Status
Cost
Schedule
Progress
Risks
Contractor
Payments
Variations
Decisions
Recommendations

Provide:

View Report
Download PDF

TEAM

Display project team members.

Roles:

Owner
Project Manager
Project Controls
Inspector
Consultant
Viewer

SETTINGS

Organization settings

Project settings

User profile

Notifications

PERMISSIONS

Frontend must respect backend permissions.

Never rely on frontend permissions for security.

The backend is authoritative.

LOADING STATES

Every API-driven page must have:

Skeleton loading state
Empty state
Error state
Retry option

TOASTS

Use toast notifications for:

Successful save
Upload
Payment update
Variation update
Risk update
Report publication

FORMS

Use React Hook Form + Zod.

All forms must have:

- validation
- useful error messages
- disabled submit while saving
- success state
- API error handling

RESPONSIVE DESIGN

Owner dashboard must work especially well on mobile.

On mobile:

Prioritize:

1. Overall status
2. Financial position
3. Progress
4. Risks
5. Decisions

Hide secondary information behind expandable sections.

ACCESSIBILITY

Implement:

- semantic HTML
- keyboard navigation
- accessible forms
- accessible tables
- proper labels
- sufficient contrast
- ARIA only where necessary

PERFORMANCE

Use:

- TanStack Query caching
- pagination
- lazy loading
- code splitting
- optimized charts
- memoization only where useful

Do not fetch entire datasets when only summary data is required.

DESIGN SYSTEM

Create reusable components:

MetricCard
StatusBadge
RiskBadge
ProjectHeader
ProgressChart
CostChart
RiskMatrix
PaymentTable
VariationTable
DecisionCard
ExecutiveSummary
ProjectStatusGrid
EmptyState
LoadingSkeleton
DataTable
Modal
Drawer
Form components

Do not duplicate UI logic across pages.

ROUTING

Implement routes for:

/login

/dashboard

/projects

/projects/:id/dashboard

/projects/:id/progress

/projects/:id/payments

/projects/:id/payments/:paymentId

/projects/:id/variations

/projects/:id/risks

/projects/:id/issues

/projects/:id/inspections

/projects/:id/documents

/projects/:id/reports

/projects/:id/reports/:reportId

/projects/:id/team

/settings

AUTHENTICATION

Implement:

JWT login
Token refresh
Logout
Protected routes
Session persistence

API CONFIGURATION

Use environment variables:

VITE_API_BASE_URL

Never hardcode API URLs.

DEMO MODE

Provide realistic demo data only through a development/demo API or clearly separated mock layer.

Demo project:

LUXURY RESIDENCE — LEKKI

Budget:

₦500,000,000

Forecast:

₦545,000,000

Progress:

55%

Planned:

62%

Schedule:

7 percentage points behind

Use realistic risks, payments, variations and milestones.

Do not use lorem ipsum.

PRODUCT EXPERIENCE

The application should communicate:

"Your project is under control."

rather than:

"Here is another construction management dashboard."

The most important page is the OWNER DASHBOARD.

Build that page to an exceptionally high standard.

MVP PRIORITY

P0:

Authentication
Organizations
Projects
Project dashboard
Budget/cost
Progress
Payments
Variations
Risks
Inspections
Documents
Reports
Permissions

P1:

Notifications
Contractor scorecard
Advanced reporting
PDF export
Activity/audit interface

P2:

AI summaries
Predictive cost forecasting
Automated anomaly detection
Mobile field app
GPS/time-stamped evidence
Contractor portal
Client approval workflows

Do NOT build P2 features into the initial MVP unless the architecture requires supporting them.

OUTPUT

Generate the complete React/TypeScript application.

Include:

- project structure
- reusable components
- API layer
- authentication
- routing
- responsive UI
- forms
- charts
- tables
- loading/error states
- demo environment
- README
- environment configuration

The result should be production-quality and ready to connect to the Django backend.

------------------------
REACT FRONTEND STRUCTURE
------------------------
frontend/
│
├── public/
│   ├── favicon.svg
│   └── logo.svg
│
├── src/
│   │
│   ├── app/
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   ├── providers.tsx
│   │   └── config.ts
│   │
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── charts/
│   │   ├── tables/
│   │   ├── forms/
│   │   └── common/
│   │
│   ├── layouts/
│   │   ├── AuthLayout.tsx
│   │   ├── DashboardLayout.tsx
│   │   └── ProjectLayout.tsx
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── organizations/
│   │   ├── projects/
│   │   ├── costs/
│   │   ├── progress/
│   │   ├── payments/
│   │   ├── variations/
│   │   ├── risks/
│   │   ├── inspections/
│   │   ├── documents/
│   │   ├── reports/
│   │   ├── contractors/
│   │   └── notifications/
│   │
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── ProjectsPage.tsx
│   │   └── SettingsPage.tsx
│   │
│   ├── services/
│   │   ├── api.ts
│   │   ├── authApi.ts
│   │   ├── projectApi.ts
│   │   └── ...
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useProject.ts
│   │   └── ...
│   │
│   ├── types/
│   │   ├── auth.ts
│   │   ├── project.ts
│   │   ├── payment.ts
│   │   └── ...
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── formatCurrency.ts
│   │   └── formatDate.ts
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   └── main.tsx
│
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── Dockerfile
└── .env.example



==================================================
1. BRAND POSITIONING
==================================================
You are working on the frontend codebase for GlintPM Private.

TASK:
Update the frontend visual design system and UI styling to establish a professional, modern brand identity for GlintPM Private while maintaining a strong visual connection to the main GlintPM brand.

IMPORTANT:
Do NOT redesign the entire application or change existing functionality, routes, components, APIs, business logic, or content unless specifically required for the visual implementation.

The primary objective is to introduce the new GlintPM Private brand colors consistently and professionally throughout the existing frontend.

GlintPM Private is a technology/product extension of GlintPM.

The visual identity should communicate:

- Professionalism
- Technology
- Project management
- Business systems
- Automation
- Efficiency
- Trust
- Innovation
- Modern SaaS/product quality

It should look like a technology product belonging to GlintPM, NOT like an unrelated startup.

Maintain visual continuity with the main GlintPM brand wherever practical.

==================================================
2. PRIMARY BRAND COLORS
==================================================

Use the following official GlintPM Private colors:

PRIMARY — GLINT TEAL
HEX: #085156

ACCENT — GLINT LIME
HEX: #C6F325

These two colors should form the core visual identity.

#085156 should be the dominant brand color.

#C6F325 should be used as a controlled accent rather than a dominant background color.

Do NOT overuse the lime green.

Recommended approximate visual distribution:

- 60–70% white/light neutral space
- 20–30% Glint Teal
- 5–10% Glint Lime

The exact distribution can vary depending on the component.

==================================================
3. SUPPORTING COLORS
==================================================

Create a small supporting palette around the two brand colors.

Suggested colors:

Primary:
#085156

Primary Dark:
#063E42

Primary Light:
#E8F3F3

Accent:
#C6F325

Accent Soft:
#F2FBD0

Background:
#FFFFFF

Secondary Background:
#F7F9F8

Main Text:
#102A2C

Secondary Text:
#527073

Border:
#DCE7E7

Success:
Use a compatible green that does not visually compete with #C6F325.

Warning:
Use an accessible amber/orange.

Error:
Use an accessible red.

Do not introduce unnecessary brand colors.

==================================================
4. DESIGN SYSTEM
==================================================

Before modifying individual components, inspect the existing frontend architecture.

Determine:

- Framework
- CSS strategy
- Component structure
- Existing design tokens
- Tailwind configuration, if applicable
- CSS variables
- Theme/provider implementation
- Button components
- Cards
- Navigation
- Forms
- Tables
- Dashboard components
- Modals
- Alerts
- Badges
- Typography system

If a design-token system already exists, extend it rather than creating a second competing system.

If CSS variables are already used, define the brand colors as variables.

For example:

--color-primary: #085156;
--color-primary-dark: #063E42;
--color-primary-light: #E8F3F3;
--color-accent: #C6F325;
--color-accent-soft: #F2FBD0;
--color-background: #FFFFFF;
--color-surface: #F7F9F8;
--color-text: #102A2C;
--color-text-muted: #527073;
--color-border: #DCE7E7;

Use the project's existing naming conventions if they differ.

==================================================
5. NAVIGATION / HEADER
==================================================

Update the navigation to reflect the GlintPM Private identity.

Preferred approach:

- Clean white or very light background
- GlintPM Private logo/wordmark
- Glint Teal for important navigation elements
- Glint Lime used sparingly for selected states, small indicators, or CTA accents
- Subtle borders/shadows
- Modern SaaS appearance

Do not make the entire navigation lime green.

If there is a dark navigation/header variant, use:

Background: #085156
Text: #FFFFFF
Accent: #C6F325

Ensure text remains highly readable.

==================================================
6. BUTTONS
==================================================

Primary CTA:

Background: #085156
Text: #FFFFFF

Hover:
Use #063E42 or an appropriate darker teal.

Secondary CTA:
White/light background
Teal border
Teal text

Accent CTA:
Background: #C6F325
Text: #102A2C

Use the lime CTA only where it provides meaningful emphasis.

Avoid excessive lime buttons across the same screen.

Buttons should have:

- Consistent border radius
- Appropriate padding
- Clear hover states
- Focus states
- Disabled states
- Accessible contrast
- Smooth but subtle transitions

==================================================
7. CARDS
==================================================

Cards should remain clean and professional.

Preferred:

Background: #FFFFFF
Border: #DCE7E7
Text: #102A2C

Use Glint Teal for:

- Icons
- Headings
- Selected cards
- Important indicators

Use Glint Lime for:

- Small highlights
- Status indicators
- Decorative accents
- Important metrics
- Active states

Avoid making every card heavily colored.

==================================================
8. DASHBOARD / PRODUCT UI
==================================================

GlintPM Private is intended to feel like a serious business/product platform.

Dashboard interfaces should prioritize usability over decoration.

Use:

- Glint Teal for primary navigation and major data visualization elements
- Teal variations for related data series
- Glint Lime for highlighting important values, positive progress, selected metrics, or key actions
- Neutral colors for secondary information

Do NOT use #C6F325 for large amounts of text.

For charts:

Primary data:
#085156

Highlight:
#C6F325

Secondary data:
Use restrained teal/neutral variations.

Maintain strong visual hierarchy.

==================================================
9. FORMS
==================================================

Form controls should use the brand system consistently.

Default:

Background: #FFFFFF
Border: #DCE7E7
Text: #102A2C

Focus:

Border: #085156
Focus ring: a subtle transparent/soft version of #085156

Primary form actions:

#085156

Success states may use green, but do not confuse success indicators with the Glint Lime brand accent.

==================================================
10. TYPOGRAPHY
==================================================

Keep the existing typography if it is already professional and consistent.

If typography needs improvement, use a modern, highly readable sans-serif suitable for a professional SaaS/product platform.

Prioritize:

- Strong heading hierarchy
- Excellent readability
- Appropriate line height
- Clear dashboard labels
- Responsive typography

Avoid overly decorative fonts.

The product should feel:

Professional + Modern + Technical

rather than:

Playful + Gaming + Consumer app.

==================================================
11. LAYOUT
==================================================

Do not unnecessarily redesign existing layouts.

Improve visual consistency through:

- Consistent spacing
- Consistent border radius
- Consistent card treatment
- Consistent button styling
- Clear hierarchy
- Appropriate whitespace
- Responsive behavior

Use the existing spacing system where available.

Avoid excessive rounded cards and excessive shadows.

The overall design should resemble a polished modern B2B SaaS platform.

==================================================
12. BRAND CONNECTION TO GLINTPM
==================================================

Very important:

GlintPM Private must visually connect to the main GlintPM brand.

Do not introduce a completely different visual language.

The relationship should feel like:

GLINTPM
Corporate / Project Management / Consulting / Training

GLINTPM PRIVATE
Technology / Software / Automation / Digital Business Systems

#085156 should establish the family connection.

#C6F325 should provide GlintPM Private with a modern technology/product accent.

The result should look like:

"GlintPM, but its technology/product division."

Not:

"A completely different company."

==================================================
13. ACCESSIBILITY
==================================================

Do not sacrifice accessibility for branding.

Check:

- Text contrast
- Button contrast
- Form focus states
- Keyboard navigation
- Hover states
- Disabled states
- Error states
- Mobile usability

IMPORTANT:

Do not use #C6F325 as a background behind white text.

When #C6F325 is used as a background, use a dark text color such as #102A2C.

==================================================
14. RESPONSIVE DESIGN
==================================================

The brand implementation must work properly across:

- Desktop
- Laptop
- Tablet
- Mobile

Do not create separate desktop/mobile color systems.

The same design tokens should drive all breakpoints.

==================================================
15. LOGO / BRAND MARK
==================================================

If a GlintPM Private logo already exists in the project:

- Preserve its structure
- Apply the new color system appropriately
- Do not distort the logo
- Do not unnecessarily redesign it

If the existing logo already uses GlintPM's identity, prioritize visual consistency.

Do not randomly recolor the logo differently on different pages.

==================================================
16. MICRO-INTERACTIONS
==================================================

Use subtle transitions for:

- Buttons
- Links
- Cards
- Navigation
- Form controls

Preferred behavior:

- 150–250ms transitions
- Subtle hover elevation
- Subtle color transitions
- No excessive animations

The product should feel polished, not flashy.

==================================================
17. IMPLEMENTATION RULES
==================================================

Before making changes:

1. Inspect the entire frontend structure.
2. Identify the existing styling architecture.
3. Identify reusable components.
4. Identify existing design tokens/theme variables.
5. Reuse existing components wherever possible.
6. Avoid duplicated styling.
7. Implement the new brand colors centrally.
8. Refactor components to consume the centralized tokens.
9. Preserve all existing functionality.
10. Do not introduce unnecessary dependencies.

Prefer reusable design tokens over hardcoded colors scattered throughout the codebase.

Avoid code such as:

color: #085156;

repeated throughout dozens of components.

Instead use the project's existing theme/token architecture.

==================================================
18. DO NOT DO
==================================================

Do NOT:

- Rebuild the entire application
- Change the application's business logic
- Change API behavior
- Change routes
- Remove existing functionality
- Replace working components unnecessarily
- Overuse lime green
- Make the interface neon-looking
- Make every section teal
- Make every button lime
- Introduce unrelated colors
- Add excessive gradients
- Add excessive glassmorphism
- Add excessive shadows
- Make the UI look like a gaming application
- Make the product look disconnected from GlintPM

==================================================
19. FINAL VISUAL DIRECTION
==================================================

The finished interface should communicate:

"Professional project-management technology built by GlintPM."

Visual characteristics:

- Clean
- Modern
- Professional
- Technical
- Premium
- Trustworthy
- Efficient
- SaaS-oriented
- Enterprise-friendly
- Strong but restrained use of color

PRIMARY:
#085156

ACCENT:
#C6F325

Think:

Deep Teal + Lime Accent + White Space + Clean SaaS UI.

==================================================
20. EXECUTION
==================================================

Implement the changes directly in the existing frontend codebase.

After implementation:

1. Run the application.
2. Check all major pages.
3. Check desktop and mobile layouts.
4. Check navigation.
5. Check buttons.
6. Check forms.
7. Check cards.
8. Check dashboard components.
9. Check empty/loading/error states.
10. Check accessibility/contrast.
11. Search the codebase for old hardcoded brand colors that should now use the new design tokens.
12. Remove unnecessary duplicated styles.
13. Fix any visual inconsistencies discovered.

Do not stop after changing the global CSS.

Make sure the new GlintPM Private identity is actually visible and consistent throughout the entire existing frontend.

At the end, provide a concise summary of:

- Files/components changed
- Brand tokens introduced
- Major UI changes
- Any assumptions made
- Any remaining areas that require manual review