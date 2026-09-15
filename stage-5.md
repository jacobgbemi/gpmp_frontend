Continue building GlintPM Private.

STAGE 5 ONLY:
Executive Dashboard + Reports + Notifications + Decisions

Stages 1–4 are already implemented.

Backend Stage 5 provides:
- finalized project dashboard
- executive summaries
- reports
- notifications
- decisions required
- audit-related data where appropriate

OBJECTIVE

Create the executive intelligence layer of GlintPM Private.

The product should answer:

"Where are we?"
"How much have we spent?"
"What is actually completed?"
"What could go wrong?"
"What requires my decision?"

OWNER DASHBOARD

Improve the project dashboard using the finalized backend dashboard API.

Prioritize:

1. Project health
2. Financial position
3. Schedule position
4. Physical progress
5. Payment exposure
6. Variations
7. Risks
8. Decisions required

Create an executive summary panel.

The summary must be based on backend data.

Do not introduce AI-generated conclusions.

DECISION REQUIRED

Create a decision section showing:

- decision title
- description
- project impact
- requested date
- priority
- status

Statuses:
OPEN
RESOLVED
DEFERRED

Create clear actions:
- Resolve
- Defer
- View details

REPORTS

Create:

/projects/:id/reports

Report types:

MONTHLY_EXECUTIVE
PROJECT_HEALTH
PAYMENT_REVIEW
PROGRESS
RISK
SPECIAL

Display:
- report title
- reporting period
- status
- created date
- generated date
- author
- download/view action

REPORT DETAIL

Create a professional report viewer.

The visual hierarchy should resemble an executive project report.

Include:
- project information
- reporting period
- executive summary
- financial summary
- progress
- schedule
- payments
- risks
- variations
- decisions

Use backend-provided report data.

NOTIFICATIONS

Create a notification system for:
- payment updates
- project status changes
- risk alerts
- variation updates
- new reports
- decisions requiring attention

Create:
- notification center
- unread count
- read/unread state
- notification detail
- mark as read

Avoid notification spam.

DESIGN PRINCIPLE

Notifications should help users act, not merely tell them things.

Examples:

"Payment Application #04 requires review."

"Project forecast exceeds approved budget."

"Three high-risk items require attention."

Do not invent these messages in the frontend if the backend provides notification content.

API

Use TanStack Query.

Create:
useReports()
useReport()
useNotifications()
useDecisions()
useProjectDashboard()

PERFORMANCE

The dashboard may contain many API calls.

Use:
- query caching
- parallel queries where appropriate
- backend aggregated dashboard data where available
- memoization only where necessary

Avoid N+1 frontend requests.

RESPONSIVE OWNER EXPERIENCE

The mobile experience should prioritize:

Project Health
↓
Financial Position
↓
Progress
↓
Schedule
↓
Risks
↓
Payments
↓
Decisions

DESIGN

Maintain premium private-office positioning.

Do not make the interface look like a generic project-management SaaS.

TESTING

Test:
- dashboard
- report rendering
- notification state
- decision workflow
- loading/error states
- responsive behavior

FINAL CHECK

Run:
npm run build
npm run lint

Do not implement Stage 6 yet.