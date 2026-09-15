Continue building GlintPM Private.

STAGE 6 ONLY:
Frontend Hardening + Security + Performance + Production Readiness

Stages 1–5 are complete.

Do not introduce major new product features.

OBJECTIVE

Prepare the frontend for production use by improving:

- security
- performance
- reliability
- accessibility
- error handling
- maintainability
- deployment readiness

SECURITY AUDIT

Review the entire frontend for:

- exposed secrets
- unsafe environment variables
- token leakage
- insecure storage
- XSS risks
- unsafe HTML rendering
- unsafe file handling
- authorization assumptions
- sensitive information in URLs
- console logging of sensitive data
- dependency vulnerabilities

IMPORTANT:

Never assume frontend permissions are security controls.

The Django backend remains authoritative for authorization.

Remove any frontend logic that could create a false security boundary.

AUTHENTICATION

Review:
- token handling
- logout
- token expiration
- refresh behavior
- 401 handling
- session restoration
- unauthorized redirects

Avoid infinite refresh loops.

API CLIENT

Review Axios configuration.

Ensure:
- consistent errors
- cancellation where appropriate
- timeout strategy
- authentication handling
- clean API abstraction

TYPESCRIPT

Run strict TypeScript checking.

Remove:
- any
- unnecessary casts
- duplicate interfaces
- dead types

PERFORMANCE

Audit:
- unnecessary renders
- unnecessary API requests
- large bundle dependencies
- chart rendering
- image loading
- query caching
- pagination
- code splitting

Use lazy loading for large route modules where appropriate.

Do not optimize prematurely.

ACCESSIBILITY

Audit:
- keyboard navigation
- labels
- focus states
- semantic HTML
- ARIA where appropriate
- color contrast
- screen-reader behavior
- modal behavior

RESPONSIVE DESIGN

Test:
- mobile
- tablet
- desktop
- very wide screens

Ensure:
- tables remain usable
- dashboards do not overflow
- charts resize correctly
- forms work on mobile

ERROR HANDLING

Implement polished handling for:

400
401
403
404
409
422
429
500
503
network failures

Create appropriate:
- error pages
- retry actions
- empty states
- loading states

DESIGN SYSTEM AUDIT

Review consistency of:

- typography
- spacing
- buttons
- cards
- badges
- forms
- tables
- dialogs
- navigation
- charts

Remove unnecessary visual complexity.

SEO

This is an authenticated application, so SEO is not the primary concern.

Ensure private application routes are not treated as public marketing content.

PWA/OFFLINE

Do not add offline functionality unless there is a strong product requirement.

Do not add unnecessary infrastructure.

TESTING

Expand automated tests for:

- authentication
- protected routes
- API failures
- permissions
- critical forms
- dashboard rendering
- payment workflow UI
- risk workflow
- document uploads
- notifications
- responsive components

BUILD

Ensure:

npm run lint
npm run build

both pass cleanly.

ENVIRONMENT

Create clear configuration for:

Development
Staging
Production

Never commit secrets.

DOCUMENTATION

Update README with:

- architecture
- local development
- environment variables
- build
- deployment
- API configuration
- authentication model
- testing
- troubleshooting

FINAL REVIEW

Perform a complete frontend code review.

Look for:
- duplicated logic
- dead components
- inconsistent naming
- unnecessary dependencies
- poor abstractions
- business logic inside UI
- API calls inside components
- inaccessible components
- security issues

Do not add new major features.

The final frontend should be production-ready and clean.