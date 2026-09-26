export function extractDocumentFields(text) {
  const fields = {
    name: null,
    category: null,
    certificateNumber: null
  };

  // Extract name
  const nameMatch = text.match(/Name\s*:\s*([^\n]+)/i);

  if (nameMatch) {
    fields.name = nameMatch[1].trim();
  }

  // Extract category
  const categoryMatch = text.match(/Category\s*:\s*([^\n]+)/i);

  if (categoryMatch) {
    fields.category = categoryMatch[1].trim().toUpperCase();
  }

  // Extract certificate number
  const certificateMatch = text.match(
    /Certificate\s*(?:No|Number)\s*:\s*([A-Z0-9]+)/i
  );

  if (certificateMatch) {
    fields.certificateNumber = certificateMatch[1].trim().toUpperCase();
  }

  return fields;
}