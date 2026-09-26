/**
 * Configurable Eligibility Rules Engine
 * ---------------------------------------------------------------
 * Reads rules from DB (schemes.eligibility JSONB and/or scheme_rules rows).
 * NOTHING here is hardcoded per-scheme — same function evaluates every scheme.
 *
 * Supported rule keys (in schemes.eligibility JSONB):
 *   category        -> exact match, e.g. "ST"
 *   income_limit    -> applicant.income <= income_limit
 *   min_percentage  -> applicant.percentage >= min_percentage
 *   education_level -> applicant.education_level must be in allowed list (string or array)
 *   states          -> applicant.state must be in allowed list (array) if provided
 *   min_age / max_age -> applicant.age bounds, only checked if applicant.age provided
 *
 * Supported scheme_rules rows (rule_type/operator/value) are merged in as an
 * additional, more granular way to express the same kinds of checks, so admins
 * can configure rules without redeploying code.
 *
 * Returns: { eligible: boolean, reasons: string[], failedRules: object[] }
 */

function evaluateEligibility(eligibility = {}, applicant = {}, extraRules = []) {
  const reasons = [];
  const failedRules = [];
  let eligible = true;

  const fail = (rule, message) => {
    eligible = false;
    reasons.push(message);
    failedRules.push(rule);
  };

  // ---- category ----
  if (eligibility.category !== undefined && eligibility.category !== null) {
    if (String(applicant.category || '').toUpperCase() !== String(eligibility.category).toUpperCase()) {
      fail(
        { rule_type: 'category', expected: eligibility.category, actual: applicant.category },
        `Category must be ${eligibility.category}, applicant is ${applicant.category || 'unspecified'}`
      );
    }
  }

  // ---- income ----
  if (eligibility.income_limit !== undefined && eligibility.income_limit !== null) {
    const income = Number(applicant.income);
    if (Number.isNaN(income)) {
      fail({ rule_type: 'income', expected: `<= ${eligibility.income_limit}`, actual: applicant.income }, 'Income not provided or invalid');
    } else if (income > Number(eligibility.income_limit)) {
      fail(
        { rule_type: 'income', expected: `<= ${eligibility.income_limit}`, actual: income },
        `Family income (${income}) exceeds limit of ${eligibility.income_limit}`
      );
    }
  }

  // ---- percentage / marks ----
  if (eligibility.min_percentage !== undefined && eligibility.min_percentage !== null) {
    const pct = Number(applicant.percentage);
    if (Number.isNaN(pct)) {
      fail({ rule_type: 'percentage', expected: `>= ${eligibility.min_percentage}`, actual: applicant.percentage }, 'Percentage not provided or invalid');
    } else if (pct < Number(eligibility.min_percentage)) {
      fail(
        { rule_type: 'percentage', expected: `>= ${eligibility.min_percentage}`, actual: pct },
        `Percentage (${pct}%) is below minimum required (${eligibility.min_percentage}%)`
      );
    }
  }

  // ---- education level ----
  if (eligibility.education_level) {
    const allowed = Array.isArray(eligibility.education_level)
      ? eligibility.education_level
      : [eligibility.education_level];
    if (!applicant.education_level || !allowed.map(String).map(s => s.toUpperCase()).includes(String(applicant.education_level).toUpperCase())) {
      fail(
        { rule_type: 'education_level', expected: allowed, actual: applicant.education_level },
        `Education level must be one of [${allowed.join(', ')}], applicant has ${applicant.education_level || 'unspecified'}`
      );
    }
  }

  // ---- state restriction ----
  if (eligibility.states && Array.isArray(eligibility.states) && eligibility.states.length > 0) {
    if (!applicant.state || !eligibility.states.map(String).map(s => s.toUpperCase()).includes(String(applicant.state).toUpperCase())) {
      fail(
        { rule_type: 'state', expected: eligibility.states, actual: applicant.state },
        `Scheme is restricted to states [${eligibility.states.join(', ')}], applicant is from ${applicant.state || 'unspecified'}`
      );
    }
  }

  // ---- age (only checked if applicant provided an age AND scheme defines bounds) ----
  if (applicant.age !== undefined && applicant.age !== null && applicant.age !== '') {
    const age = Number(applicant.age);
    if (!Number.isNaN(age)) {
      if (eligibility.min_age !== undefined && age < Number(eligibility.min_age)) {
        fail(
          { rule_type: 'age', expected: `>= ${eligibility.min_age}`, actual: age },
          `Age (${age}) is below minimum required (${eligibility.min_age})`
        );
      }
      if (eligibility.max_age !== undefined && age > Number(eligibility.max_age)) {
        fail(
          { rule_type: 'age', expected: `<= ${eligibility.max_age}`, actual: age },
          `Age (${age}) exceeds maximum allowed (${eligibility.max_age})`
        );
      }
    }
  }

  // ---- extra granular rules from scheme_rules table (data-driven, generic) ----
  for (const rule of extraRules) {
    const { rule_type, operator, value, message } = rule;
    const applicantValue = applicant[mapRuleTypeToField(rule_type)];
    const passed = applyOperator(applicantValue, operator, value);
    if (!passed) {
      fail(
        { rule_type, operator, expected: value, actual: applicantValue },
        message || `Failed rule: ${rule_type} ${operator} ${JSON.stringify(value)}`
      );
    }
  }

  return { eligible, reasons, failedRules };
}

function mapRuleTypeToField(ruleType) {
  const map = {
    category: 'category',
    income: 'income',
    percentage: 'percentage',
    education_level: 'education_level',
    state: 'state',
    age: 'age',
  };
  return map[ruleType] || ruleType;
}

function applyOperator(actual, operator, expected) {
  if (actual === undefined || actual === null || actual === '') return false;
  switch (operator) {
    case '=':
      return String(actual).toUpperCase() === String(expected).toUpperCase();
    case '<=':
      return Number(actual) <= Number(expected);
    case '>=':
      return Number(actual) >= Number(expected);
    case '<':
      return Number(actual) < Number(expected);
    case '>':
      return Number(actual) > Number(expected);
    case 'in':
      return Array.isArray(expected) && expected.map(String).map(s => s.toUpperCase()).includes(String(actual).toUpperCase());
    default:
      return true; // unknown operator: don't block application
  }
}

module.exports = { evaluateEligibility };
