Continue building GlintPM Private.

STAGE 4 ONLY:
Inspections + Evidence + Documents

Stages 1–3 already exist.

Backend Stage 4 provides:
- Inspections
- Inspection Items
- Project Evidence
- Documents
- Document Folders
- Basic document versioning

Do not implement Reports, Notifications or advanced analytics yet.

OBJECTIVE

Build the evidence and inspection system around the principle:

Site → Evidence → Verification → Analysis → Decision

The owner should be able to understand what was observed, when it was observed, what evidence supports it, and where the relevant documents are.

ROUTES

Implement:

/projects/:id/inspections
/projects/:id/documents

INSPECTIONS

Inspection types:

ROUTINE
PAYMENT_VERIFICATION
PROGRESS_VERIFICATION
QUALITY
MILESTONE
SPECIAL

Create:
- inspection list
- inspection detail
- inspection status
- inspection date
- inspector
- inspection type
- summary
- findings

INSPECTION ITEMS

Display:
- item
- status
- observation
- notes
- evidence
- responsible party

Support statuses such as:
- PASS
- FAIL
- OBSERVATION
- NOT_APPLICABLE

EVIDENCE

Support:
- photos
- videos
- documents
- screenshots
- other evidence

Create:
- evidence gallery
- evidence metadata
- upload interface
- preview where appropriate
- evidence linked to inspections

IMPORTANT:

Do not assume every uploaded file is safe.

Frontend should validate:
- file size
- file type
- file name
- upload state

The backend remains responsible for final security validation.

DOCUMENTS

Create a document-management interface with:

Folders
Files
Document type
Version
Uploaded by
Uploaded date

Support:
- folder navigation
- document list
- upload
- download/view action
- version display

Do not build a full Google Drive clone.

OWNER EXPERIENCE

The key questions are:

"What evidence supports this claim?"

"When was this observed?"

"Who observed it?"

"Which document supports this?"

"Is this the latest version?"

DESIGN

Evidence should feel like a professional project record, not a social media photo gallery.

Use:
- clean gallery
- metadata
- timestamps
- project context
- clear document hierarchy

MOBILE

Inspection/evidence workflows should work well on mobile because site personnel may use phones.

API

Use TanStack Query.

Create:
useInspections()
useInspection()
useEvidence()
useDocuments()
useDocumentFolders()

Use React Hook Form + Zod where forms are needed.

FILE UPLOADS

Create reusable upload components.

Support:
- progress indicator
- upload success
- upload failure
- retry
- cancel where practical

Do not expose storage credentials to the browser.

TESTING

Test:
- inspection forms
- evidence upload validation
- document filtering
- folder navigation
- loading/error states
- permission-related UI

FINAL CHECK

Run:
npm run build
npm run lint

Do not implement Stage 5.