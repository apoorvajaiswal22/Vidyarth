# PS 26239 — Backend & Rules Engine
AI-powered Scholarship/Fellowship Assistance Platform for ST Students (Ministry of Tribal Affairs)

Built by **Member 3 — Backend & Rules Engine**. Node.js + Express + PostgreSQL.

---

## 1. Stack

- Node.js (v22) + Express
- PostgreSQL (JSONB for configurable scheme/rule data)
- JWT auth + bcrypt password hashing
- multer for file uploads
- Runs on **port 5000**

---

## 2. Setup / Run / Seed / Test

```bash
cd sih-backend
npm install

# 1. Create a PostgreSQL database + user (adjust to your machine)
sudo -u postgres psql -c "CREATE USER sih_user WITH PASSWORD 'sih_dev_pass123' CREATEDB;"
sudo -u postgres psql -c "CREATE DATABASE sih_scholarship OWNER sih_user;"

# 2. Copy env and adjust if needed (already pre-filled with dev defaults)
cp .env.example .env

# 3. Create tables
npm run db:init
# (equivalent to: psql -h localhost -U sih_user -d sih_scholarship -f db/schema.sql)

# 4. Seed demo data (admin/officer/student + 3 schemes)
npm run seed

# 5. Start the server (http://localhost:5000)
npm start

# 6. In a second terminal, run the end-to-end smoke test (server must be running)
npm test
```

`npm test` runs `scripts/test-flow.js`, which exercises the **entire workflow**: register → login → get schemes → eligibility check → apply with document upload → AI verification fallback (`pending`) → admin sees application → status transitions through `deficient` → re-upload → `resubmitted` → `selected` → audit log + notifications, plus role/permission checks. All 24 assertions currently pass.

### Demo credentials (development only — do not use in production)
| Role    | Email              | Password    |
|---------|--------------------|-------------|
| Admin   | admin@sih.test     | Password123 |
| Officer | officer@sih.test   | Password123 |
| Student | student@sih.test   | Password123 |

---

## 3. Database Tables

| Table | Purpose |
|---|---|
| `users` | student/officer/admin accounts, bcrypt password hash, role, state, category |
| `schemes` | scheme metadata; `required_docs` (JSONB array) and `eligibility` (JSONB object) drive the rules engine and frontend upload form |
| `scheme_rules` | optional granular rules (`rule_type`, `operator`, `value`, `message`) for schemes that need extra data-driven checks beyond `schemes.eligibility` |
| `applications` | one row per submission; `form_data` (JSONB) holds flexible applicant-entered fields; `eligibility_result` caches the rules-engine output at submit time; `status` drives the workflow |
| `documents` | uploaded file metadata + `verification_status`, `confidence_score`, `verification_flags` (from AI service or `pending`) |
| `audit_logs` | every status change (`from_status` → `to_status`, actor, remarks) |
| `notifications` | user-facing notifications created alongside every status change |

Full DDL: `db/schema.sql`.

---

## 4. Environment Variables (`.env`)

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=sih_scholarship
DB_USER=sih_user
DB_PASSWORD=...
JWT_SECRET=...
JWT_EXPIRES_IN=7d
UPLOAD_DIR=uploads
MAX_FILE_SIZE_MB=5
AI_SERVICE_URL=http://localhost:6000/verify-document   # Member 4's service
AI_SERVICE_TIMEOUT_MS=8000
CORS_ORIGIN=*
```

If `AI_SERVICE_URL` is unset, unreachable, or times out, document verification is **safely marked `pending`** — uploads and applications never fail because of this.

---

## 5. API Table

Base URL: `http://localhost:5000/api` (health check at `http://localhost:5000/health`)

| METHOD | ENDPOINT | AUTH | PURPOSE |
|---|---|---|---|
| POST | `/api/auth/register` | none | Student self-registration |
| POST | `/api/auth/login` | none | Student/officer/admin login |
| POST | `/api/admin/login` | none | Admin-only login (rejects non-admin accounts) |
| GET | `/api/schemes` | none | List active schemes (with `required_docs`, `eligibility`) |
| GET | `/api/schemes/:id` | none | Get one scheme |
| POST | `/api/schemes/:id/check-eligibility` | none | Run rules engine against a candidate profile, returns `eligible/reasons/failedRules` |
| POST | `/api/applications` | student (JWT) | Submit application: form fields + document uploads (multipart) |
| GET | `/api/applications` | student (JWT) | List the logged-in student's own applications |
| GET | `/api/applications/:id` | student(own)/officer/admin (JWT) | Get one application + its documents |
| PUT | `/api/applications/:id/documents` | student (JWT) | Upload/re-upload documents; auto-moves `deficient` → `resubmitted` |
| GET | `/api/admin/applications?status=&scheme=&state=` | officer/admin (JWT) | List/filter applications |
| PATCH | `/api/admin/applications/:id/status` | officer/admin (JWT) | Change status (validated transition; writes audit log + notification) |
| GET | `/api/admin/applications/:id/audit-log` | officer/admin (JWT) | Full audit trail for one application |

All protected routes require header: `Authorization: Bearer <token>`.

### Response format (all endpoints)
Success:
```json
{ "success": true, "message": "...", "data": { } }
```
Error:
```json
{ "success": false, "message": "..." }
```

---

## 6. Status Workflow (state machine, enforced server-side)

```
submitted → under_review → deficient → resubmitted → under_review → selected
                        └────────────────────────────────────────→ rejected
```
Any transition not in this graph is rejected with `400` and a message stating the allowed next states. Every valid transition, in one DB transaction:
1. updates `applications.status`
2. inserts an `audit_logs` row
3. inserts a `notifications` row for the student

`deficient → resubmitted` happens automatically when the student calls `PUT /api/applications/:id/documents` while the application is `deficient`.

---

## 7. Rules Engine (data-driven, not hardcoded)

`utils/rulesEngine.js` exports `evaluateEligibility(eligibility, applicant, extraRules)`. The **same function** evaluates every scheme — behavior comes entirely from each scheme's `eligibility` JSONB (and optional `scheme_rules` rows), so admins can add new schemes without code changes.

Supported keys in `schemes.eligibility`:
- `category` — exact match (e.g. `"ST"`)
- `income_limit` — applicant income must be `<=` this
- `min_percentage` — applicant percentage must be `>=` this
- `education_level` — string or array of allowed levels
- `states` — array of allowed states (omit for no restriction)
- `min_age` / `max_age` — only checked if applicant supplies an age

Returns:
```json
{ "eligible": false, "reasons": ["Family income (900000) exceeds limit of 250000"], "failedRules": [ { "rule_type": "income", "expected": "<= 250000", "actual": 900000 } ] }
```

---

## 8. Request/Response Examples

### Register
```
POST /api/auth/register
{ "name": "Asha Munda", "email": "asha@example.com", "password": "Password123",
  "phone": "9876543210", "state": "Jharkhand", "category": "ST" }
```
→ `201` `{ success: true, data: { user: {...}, token: "<jwt>" } }`

### Check eligibility
```
POST /api/schemes/1/check-eligibility
{ "category": "ST", "income": 100000, "percentage": 75, "education_level": "UG", "state": "Odisha" }
```
→ `{ success: true, data: { eligible: true, reasons: [], failedRules: [] } }`

### Submit application (multipart/form-data)
Fields: `scheme_id`, plus any applicant profile fields (`category`, `income`, `percentage`, `education_level`, `state`, `age`, ...) — all become `applications.form_data`.
**File upload field names = doc type**, matching a scheme's `required_docs`, e.g.:
- `caste_certificate` (file)
- `income_certificate` (file)
- `marksheet` (file)
- `bank_passbook` (file)
- `admission_letter` (file)

Allowed file types: PDF, JPG, PNG. Max size: 5 MB each (configurable via `MAX_FILE_SIZE_MB`).

→ `201`
```json
{ "success": true, "data": {
  "application": { "id": 1, "status": "submitted", ... },
  "documents": [ { "doc_type": "caste_certificate", "verification_status": "pending", ... } ],
  "eligibility": { "eligible": true, "reasons": [], "failedRules": [] }
}}
```

### Admin status change
```
PATCH /api/admin/applications/1/status
{ "status": "deficient", "remarks": "Income certificate unclear, please re-upload" }
```
→ `200` `{ success: true, message: "Status updated to deficient", data: { application: {...} } }`

Invalid transition example (`submitted` → `selected` directly):
→ `400` `{ success: false, message: "Invalid status transition: cannot move from 'submitted' to 'selected'. Allowed: [under_review]" }`

---

## 9. Notes for Other Members

- **Frontend (Member 1/2):** Use the API table above. Send file uploads as `multipart/form-data` with field names equal to the doc type (from that scheme's `required_docs` array) so `documents.doc_type` is meaningful. JWT goes in `Authorization: Bearer <token>` after login/register.
- **AI/ML (Member 4):** Implement `POST /verify-document` at whatever URL you set as `AI_SERVICE_URL`. Expected request: `{ docType, originalName, mimeType, fileBase64 }`. Expected response: `{ verification_status: "verified"|"flagged"|"rejected", confidence_score: number, flags: string[] }`. Until your service is ready (or if it's ever down), this backend automatically marks documents `pending` and never blocks the student.
- **Database:** All schema in `db/schema.sql`. Schemes/rules are pure data — add new schemes via `INSERT INTO schemes (...)` with new JSONB, no backend code changes needed.

---

## 10. Security Checklist (implemented)

- ✅ Parameterized SQL everywhere (no string-concatenated queries)
- ✅ JWT auth middleware + role middleware (`student`/`officer`/`admin`)
- ✅ `user_id` / `student_id` always taken from verified JWT, never from request body
- ✅ bcrypt password hashing (10 salt rounds)
- ✅ File type allow-list (PDF/JPG/PNG) + size limit (multer)
- ✅ Centralized error handler — no stack traces or secrets leaked to clients
- ✅ CORS enabled (configurable origin)
- ✅ `.env` for all secrets/config, `.env.example` committed instead
- ✅ Ownership checks (students can only view/modify their own applications)
