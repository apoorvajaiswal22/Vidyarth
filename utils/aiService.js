const fs = require('fs');
require('dotenv').config();

const AI_SERVICE_URL = process.env.AI_SERVICE_URL;
const TIMEOUT_MS = Number(process.env.AI_SERVICE_TIMEOUT_MS) || 8000;

/**
 * Calls Member 4's AI document verification service, if configured/reachable.
 * Contract (agreed interface): POST { docType, filePath/fileBase64 } -> JSON:
 *   { verification_status: 'verified'|'flagged'|'rejected', confidence_score: number, flags: string[] }
 *
 * On ANY failure (service down, timeout, bad response, not configured), this
 * NEVER throws — it resolves to a safe 'pending' result so uploads/applications
 * never break because Member 4's service isn't ready yet.
 */
async function verifyDocument({ docType, filePath, originalName, mimeType }) {
  const fallback = {
    verification_status: 'pending',
    confidence_score: null,
    verification_flags: ['ai_service_unavailable'],
  };

  if (!AI_SERVICE_URL) {
    return fallback;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const fileBuffer = fs.readFileSync(filePath);
    const fileBase64 = fileBuffer.toString('base64');

    const response = await fetch(AI_SERVICE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        docType,
        originalName,
        mimeType,
        fileBase64,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return fallback;
    }

    const result = await response.json();

    return {
      verification_status: result.verification_status || 'pending',
      confidence_score: typeof result.confidence_score === 'number' ? result.confidence_score : null,
      verification_flags: Array.isArray(result.flags) ? result.flags : (result.verification_flags || []),
    };
  } catch (err) {
    console.warn('[aiService] verification unavailable, marking pending:', err.message);
    return fallback;
  }
}

module.exports = { verifyDocument };
