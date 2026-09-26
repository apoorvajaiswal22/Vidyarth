export function normalizeCertificateNumber(value) {
  if (!value) return null;

  let normalized = value
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "");

  // Common OCR substitutions
  normalized = normalized
    .replace(/O/g, "0")
    .replace(/I/g, "1");

  return normalized;
}