export function detectDeficiencies(application, scheme) {
  const deficiencies = [];

  const rules = scheme.eligibilityRules;

  // 1. Document verification
  if (application.documentStatus !== "VERIFIED") {
    deficiencies.push("Required documents are not verified");
  }

  // 2. Category
  if (
    rules.requiredCategory &&
    application.category !== rules.requiredCategory
  ) {
    deficiencies.push(
      `Category ${application.category} does not satisfy required category ${rules.requiredCategory}`
    );
  }

  // 3. Marks
  if (application.marks < rules.minMarks) {
    deficiencies.push(
      `Marks ${application.marks} are below minimum required marks ${rules.minMarks}`
    );
  }

  // 4. Income
  if (application.income > rules.maxIncome) {
    deficiencies.push(
      `Income ₹${application.income} exceeds maximum allowed income ₹${rules.maxIncome}`
    );
  }

  return deficiencies;
}