-- ============================================================
-- SIH PS 26239 - AI-powered scholarship/fellowship platform
-- Database schema
-- ============================================================

DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS scheme_rules CASCADE;
DROP TABLE IF EXISTS schemes CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ------------------------------------------------------------
-- USERS
-- ------------------------------------------------------------
CREATE TABLE users (
  id              SERIAL PRIMARY KEY,
  name            VARCHAR(150) NOT NULL,
  email           VARCHAR(150) UNIQUE NOT NULL,
  password_hash   VARCHAR(255) NOT NULL,
  role            VARCHAR(20) NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'officer', 'admin')),
  phone           VARCHAR(20),
  state           VARCHAR(100),
  category        VARCHAR(20) DEFAULT 'ST',
  created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- SCHEMES
-- ------------------------------------------------------------
CREATE TABLE schemes (
  id              SERIAL PRIMARY KEY,
  name            VARCHAR(200) NOT NULL,
  description     TEXT,
  department      VARCHAR(150) DEFAULT 'Ministry of Tribal Affairs',
  required_docs   JSONB NOT NULL DEFAULT '[]',   -- e.g. ["caste_certificate","income_certificate","marksheet"]
  eligibility     JSONB NOT NULL DEFAULT '{}',   -- e.g. {"category":"ST","income_limit":250000,"min_percentage":60}
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- SCHEME_RULES (fine-grained, optional companion to schemes.eligibility)
-- Lets the rules engine evaluate rules stored as data, not hardcoded logic.
-- ------------------------------------------------------------
CREATE TABLE scheme_rules (
  id              SERIAL PRIMARY KEY,
  scheme_id       INTEGER NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,
  rule_type       VARCHAR(50) NOT NULL,   -- category | income | percentage | education_level | state | age
  operator        VARCHAR(10) NOT NULL,   -- '=', '<=', '>=', '<', '>', 'in'
  value           JSONB NOT NULL,         -- rule value, e.g. "ST", 250000, 60, ["UG","PG"], ["MP","OD"]
  message         VARCHAR(255),           -- human readable failure reason
  created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- APPLICATIONS
-- ------------------------------------------------------------
CREATE TABLE applications (
  id              SERIAL PRIMARY KEY,
  student_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  scheme_id       INTEGER NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,
  status          VARCHAR(30) NOT NULL DEFAULT 'submitted'
                    CHECK (status IN ('submitted','under_review','deficient','resubmitted','selected','rejected')),
  form_data       JSONB NOT NULL DEFAULT '{}',  -- flexible application form fields
  eligibility_result JSONB DEFAULT '{}',        -- cached result from rules engine at submit time
  remarks         TEXT,
  created_at      TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- DOCUMENTS
-- ------------------------------------------------------------
CREATE TABLE documents (
  id                  SERIAL PRIMARY KEY,
  application_id      INTEGER NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  doc_type            VARCHAR(100) NOT NULL,   -- e.g. caste_certificate
  original_name       VARCHAR(255) NOT NULL,
  stored_filename     VARCHAR(255) NOT NULL,
  file_path           VARCHAR(500) NOT NULL,
  mime_type           VARCHAR(100),
  size_bytes          INTEGER,
  verification_status VARCHAR(20) NOT NULL DEFAULT 'pending'
                        CHECK (verification_status IN ('pending','verified','flagged','rejected')),
  confidence_score    NUMERIC(5,2),
  verification_flags  JSONB DEFAULT '[]',
  uploaded_at         TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- AUDIT LOGS
-- ------------------------------------------------------------
CREATE TABLE audit_logs (
  id              SERIAL PRIMARY KEY,
  application_id  INTEGER REFERENCES applications(id) ON DELETE CASCADE,
  actor_id        INTEGER REFERENCES users(id),
  actor_role      VARCHAR(20),
  action          VARCHAR(100) NOT NULL,     -- e.g. status_change
  from_status     VARCHAR(30),
  to_status       VARCHAR(30),
  remarks         TEXT,
  created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- NOTIFICATIONS
-- ------------------------------------------------------------
CREATE TABLE notifications (
  id              SERIAL PRIMARY KEY,
  user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  application_id  INTEGER REFERENCES applications(id) ON DELETE CASCADE,
  title           VARCHAR(200) NOT NULL,
  message         TEXT NOT NULL,
  is_read         BOOLEAN NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------
-- Indexes
-- ------------------------------------------------------------
CREATE INDEX idx_applications_student ON applications(student_id);
CREATE INDEX idx_applications_scheme ON applications(scheme_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_documents_application ON documents(application_id);
CREATE INDEX idx_audit_logs_application ON audit_logs(application_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
