import { normalizeCertificateNumber } from "./ocrNormalizationService.js";

export function verifyDocument(application, extractedData) {
  const matchedFields = [];
  const mismatches = [];

  // Name verification
  if (extractedData.name) {
    if (
      extractedData.name.trim().toLowerCase() ===
      application.name.trim().toLowerCase()
    ) {
      matchedFields.push("Name");
    } else {
      mismatches.push(
        `Name mismatch: application has "${application.name}" but document has "${extractedData.name}"`
      );
    }
  }

  // Category verification
  if (extractedData.category) {
    if (
      extractedData.category.trim().toUpperCase() ===
      application.category.trim().toUpperCase()
    ) {
      matchedFields.push("Category");
    } else {
      mismatches.push(
        `Category mismatch: application has "${application.category}" but document has "${extractedData.category}"`
      );
    }
  }

  // Certificate number verification
  if (extractedData.certificateNumber) {
    const applicationCertificate =
      normalizeCertificateNumber(application.certificateNumber);

    const documentCertificate =
      normalizeCertificateNumber(extractedData.certificateNumber);

    if (applicationCertificate === documentCertificate) {
      matchedFields.push("Certificate Number");
    } else {
      mismatches.push(
        `Certificate number mismatch: application has "${application.certificateNumber}" but document has "${extractedData.certificateNumber}"`
      );
    }
  }

  const verified = mismatches.length === 0;

  return {
    verified,
    matchedFields,
    mismatches
  };
}