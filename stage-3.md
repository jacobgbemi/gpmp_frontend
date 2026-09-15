Continue building GlintPM Private.

STAGE 3 ONLY:
Risks + Variations + Issues

Stages 1 and 2 are already implemented.

Backend Stage 3 provides:
- Variations
- Risks
- Issues

Do not implement Inspections, Evidence, Documents, Reports or Notifications yet.

OBJECTIVE

Build a professional risk/change-control interface that helps an owner understand:

"What could increase my cost, delay my project, or require my decision?"

ROUTES

Implement:

/projects/:id/variations
/projects/:id/risks
/projects/:id/issues

VARIATIONS

Display:
- variation number
- title
- reason
- category
- requested amount
- estimated amount
- approved amount
- status
- date
- impact

Clearly distinguish:

Requested
Estimated
Approved

IMPORTANT BUSINESS RULE:

Only APPROVED variations affect the approved project budget.

Do not treat proposed or rejected variations as approved cost.

Create:
- variation table
- filters
- status badges
- detail view
- variation summary
- approval status

RISK MANAGEMENT

Display:
- risk title
- category
- probability
- impact
- risk score
- owner
- mitigation
- status
- target date

Create a 5×5 risk matrix.

Risk score:

Probability × Impact

Clearly distinguish:
- Low
- Medium
- High
- Critical

Create:
- risk list
- risk detail
- risk matrix
- filters
- status indicators

ISSUES

Display:
- issue title
- description
- severity
- status
- owner
- target date
- created date

Provide:
- issue table
- filtering
- detail view
- status handling

OWNER EXPERIENCE

Prioritize the questions:

1. What could cost me more?
2. What could delay my project?
3. What needs my attention?
4. What has already been approved?
5. What remains unresolved?

Avoid technical project-management jargon where unnecessary.

API

Use TanStack Query.

Create:
useVariations()
useVariation()
useRisks()
useRisk()
useIssues()
useIssue()

All API calls must remain in feature API modules.

FORMS

Use:
React Hook Form
Zod

Validate forms on the client.

Do not duplicate backend business rules unnecessarily.

DESIGN

Use the existing design system.

Risk and variation status should be visually obvious but restrained.

Avoid making the dashboard look like an alarm panel.

TESTING

Test:
- variation status
- approved variation behavior
- risk score
- risk matrix
- issue filtering
- form validation
- API errors

FINAL CHECK

Run:
npm run build
npm run lint

Do not implement Stage 4.