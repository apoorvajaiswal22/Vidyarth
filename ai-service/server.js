require('dotenv').config();
const express = require('express');
const crypto = require('crypto');

const app = express();
const PORT = process.env.AI_PORT || 6000;

// Accept fairly large base64 payloads (documents up to ~5MB -> ~7MB base64)
app.use(express.json({ limit: '15mb' }));

/**
 * MEMBER 4 — AI DOCUMENT VERIFICATION SERVICE
 * ---------------------------------------------------------------
 * This is a working placeholder/mock implementation of the contract agreed
 * with the backend (Member 3), so the full pipeline can be demoed end-to-end
 * during the hackathon even before/if a real ML model is plugged in.
 *
 * Member 4 can swap out `runHeuristicVerification()` below for a real model
 * (OCR + classification + tampering/quality checks) without changing the
 * request/response contract, so nothing else in the system needs to change.
 *
 * CONTRACT
 * ---------------------------------------------------------------
 * POST /verify-document
 * Request JSON:
 *   {
 *     docType: string,        // e.g. "caste_certificate", "income_certificate"
 *     originalName: string,   // original uploaded filename
 *     mimeType: string,       // e.g. "application/pdf", "image/jpeg"
 *     fileBase64: string      // base64-encoded file contents
 *   }
 *
 * Response JSON (200):
 *   {
 *     verification_status: "verified" | "flagged" | "rejected",
 *     confidence_score: number,     // 0-100
 *     flags: string[]               // reasons / issues found, [] if none
 *   }
 *
 * On any internal error, respond with a non-2xx status. The backend
 * (utils/aiService.js) treats ANY non-2xx / timeout / unreachable service as
 * "pending" and never breaks the student's application because of it, so
 * this service does not need to be bulletproof for the pipeline to work —
 * but it should still degrade sensibly.
 */

const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
const MIN_REASONABLE_SIZE_BYTES = 500; // below this, treat as likely blank/corrupt
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

// Rough keyword hints per doc type, used for a very loose filename sanity check.
// (A real implementation would OCR the file content instead of trusting the filename.)
const DOC_TYPE_HINTS = {
  caste_certificate: ['caste', 'tribe', 'st', 'certificate'],
  income_certificate: ['income', 'salary', 'certificate'],
  marksheet: ['marksheet', 'mark', 'result', 'transcript'],
  bank_passbook: ['bank', 'passbook', 'account'],
  admission_letter: ['admission', 'offer', 'letter'],
};

function runHeuristicVerification({ docType, originalName, mimeType, buffer }) {
  const flags = [];

  // --- Structural checks ---
  if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
    flags.push('unsupported_file_type');
  }
  if (buffer.length < MIN_REASONABLE_SIZE_BYTES) {
    flags.push('file_too_small_possibly_blank');
  }
  if (buffer.length > MAX_SIZE_BYTES) {
    flags.push('file_exceeds_expected_size');
  }

  // --- Loose filename/doc-type consistency check (placeholder for real OCR) ---
  const hints = DOC_TYPE_HINTS[docType];
  if (hints) {
    const lowerName = (originalName || '').toLowerCase();
    const matchesHint = hints.some((h) => lowerName.includes(h));
    if (!matchesHint) {
      flags.push('filename_does_not_match_expected_document_type');
    }
  }

  // --- Deterministic pseudo-confidence derived from file content hash ---
  // (Stands in for a real model's confidence score; deterministic so the same
  // file always gets the same verdict, which is useful for demoing/testing.)
  const hash = crypto.createHash('sha256').update(buffer).digest('hex');
  const hashInt = parseInt(hash.slice(0, 8), 16);
  let confidence = 60 + (hashInt % 40); // baseline range 60-99

  // Penalize confidence for every structural flag found
  confidence -= flags.length * 20;
  confidence = Math.max(0, Math.min(100, confidence));

  let verification_status;
  if (flags.includes('unsupported_file_type') || confidence < 40) {
    verification_status = 'rejected';
  } else if (flags.length > 0 || confidence < 75) {
    verification_status = 'flagged';
  } else {
    verification_status = 'verified';
  }

  return {
    verification_status,
    confidence_score: Number(confidence.toFixed(2)),
    flags,
  };
}

app.post('/verify-document', (req, res) => {
  try {
    const { docType, originalName, mimeType, fileBase64 } = req.body;

    if (!fileBase64 || !docType) {
      return res.status(400).json({ success: false, message: 'docType and fileBase64 are required' });
    }

    const buffer = Buffer.from(fileBase64, 'base64');
    const result = runHeuristicVerification({ docType, originalName, mimeType, buffer });

    return res.status(200).json(result);
  } catch (err) {
    console.error('[ai-service] verification error:', err.message);
    return res.status(500).json({ success: false, message: 'Verification failed internally' });
  }
});

app.get('/health', (req, res) => {
  res.json({ success: true, message: 'AI verification service (mock) is running' });
});

app.listen(PORT, () => {
  console.log(`Member 4 AI verification service (mock) listening on port ${PORT}`);
});

module.exports = app;
