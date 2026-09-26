export function checkEligibility(application, scheme) {
  const passedChecks = [];
  const reasons = [];

  const rules = scheme.eligibilityRules;

  // 1. Category check
  if (
    rules.requiredCategory &&
    application.category !== rules.requiredCategory
  ) {
    reasons.push(
      `Applicant category ${application.category} does not satisfy required category ${rules.requiredCategory}`
    );
  } else {
    passedChecks.push("Category requirement satisfied");
  }

  // 2. Marks check
  if (application.marks < rules.minMarks) {
    reasons.push(
      `Marks ${application.marks} are below minimum required marks ${rules.minMarks}`
    );
  } else {
    passedChecks.push("Minimum marks requirement satisfied");
  }

  // 3. Income check
  if (application.income > rules.maxIncome) {
    reasons.push(
      `Income ₹${application.income} exceeds maximum allowed income ₹${rules.maxIncome}`
    );
  } else {
    passedChecks.push("Income requirement satisfied");
  }

  // 4. Document verification check
  if (application.documentStatus !== "VERIFIED") {
    reasons.push("Required documents are not verified");
  } else {
    passedChecks.push("Documents verified");
  }

  return {
    eligible: reasons.length === 0,
    passedChecks,
    reasons
  };
}