
/**
 * LAB 4 - EXERCISE 1.3
 * Pure Validation Rules Utility
 *
 * Shared by:
 * - Legacy Anti-Pattern Form
 * - Refactored React 19 Form
 *
 * All functions are synchronous and pure:
 * - No React hooks
 * - No side effects
 * - No state mutations
 */

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Supported form fields
const FORM_FIELDS = ['username', 'email', 'password'];

/**
 * Validate an individual field.
 *
 * @param {string} name - Field name
 * @param {string} value - Field value
 * @returns {string} Error message or empty string if valid
 */
export function validateFieldValue(name, value) {
  const normalizedValue = String(value ?? '').trim();

  switch (name) {
    case 'username':
      if (!normalizedValue) {
        return 'Username is required.';
      }

      if (normalizedValue.length < 3) {
        return 'Username must be at least 3 characters.';
      }

      return '';

    case 'email':
      if (!normalizedValue) {
        return 'Email is required.';
      }

      if (!EMAIL_REGEX.test(normalizedValue)) {
        return 'Please enter a valid email address.';
      }

      return '';

    case 'password':
      if (!normalizedValue) {
        return 'Password is required.';
      }

      if (normalizedValue.length < 6) {
        return 'Password must be at least 6 characters.';
      }

      return '';

    default:
      return '';
  }
}

/**
 * Validate all form fields.
 *
 * @param {Object} values - Form values
 * @returns {{ username: string, email: string, password: string }}
 */
export function validateAllFields(values = {}) {
  return FORM_FIELDS.reduce((errors, fieldName) => {
    errors[fieldName] = validateFieldValue(
      fieldName,
      values[fieldName]
    );

    return errors;
  }, {});
}

/**
 * Determine whether the entire form is valid.
 *
 * All fields must:
 * 1. Contain a non-empty value.
 * 2. Have an empty validation error string.
 *
 * @param {Object} values - Form values
 * @param {Object} errors - Validation errors
 * @returns {boolean}
 */
export function isFormObjectValid(values = {}, errors = {}) {
  return FORM_FIELDS.every((fieldName) => {
    const hasValue = String(values[fieldName] ?? '').trim().length > 0;
    const hasNoError = !errors[fieldName];

    return hasValue && hasNoError;
  });
}
