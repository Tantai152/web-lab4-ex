
import { useState, useRef } from 'react';
import RefactoredInputField from './RefactoredInputField.jsx';
import {
  validateAllFields,
  isFormObjectValid
} from '../../utils/validation.js';

/**
 * LAB 4 - EXERCISE 1.3
 * Refactored React 19: Derived-State SimpleForm
 *
 * Architecture:
 * - Single source of truth.
 * - Only values and touched are stored in React state.
 * - Validation errors are derived synchronously during render.
 * - Form validity is derived synchronously during render.
 * - Zero useEffect hooks.
 * - Explicit event-driven focus handling.
 */

function RefactoredSimpleForm({ onLog, onRenderCount }) {
  // 1. Single Source of Truth
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false
  });

  // 2. Input References for Event-Driven Focus
  const inputRefs = useRef({});

  // 3. Synchronous Derived State (No useEffect)
  const rawErrors = validateAllFields(values);

  const isValid = isFormObjectValid(values, rawErrors);

  // Show errors only after interaction or when a field contains a value.
  const visibleErrors = {
    username:
      touched.username || values.username
        ? rawErrors.username
        : '',

    email:
      touched.email || values.email
        ? rawErrors.email
        : '',

    password:
      touched.password || values.password
        ? rawErrors.password
        : ''
  };

  // Render Cycle Tracking
  onLog?.(
    'RefactoredSimpleForm render (1 synchronous derived-state pass — 0 useEffects)'
  );

  onRenderCount?.();

  // 4. Direct Parent Event Handlers
  const handleChange = (name, value) => {
    setValues((previousValues) => ({
      ...previousValues,
      [name]: value
    }));
  };

  const handleBlur = (name) => {
    setTouched((previousTouched) => ({
      ...previousTouched,
      [name]: true
    }));
  };

  // 5. Form Submission
  const handleSubmit = (event) => {
    event.preventDefault();

    onLog?.('SUBMIT EVENT: Validating form synchronously.');

    // Mark all fields as touched.
    setTouched({
      username: true,
      email: true,
      password: true
    });

    if (!isValid) {
      onLog?.('SUBMIT BLOCKED: Form contains validation errors.');

      // Find the first invalid field.
      const firstInvalidField = [
        'username',
        'email',
        'password'
      ].find((field) => rawErrors[field]);

      // Replace useEffect #5 with explicit event-driven focus.
      if (firstInvalidField && inputRefs.current[firstInvalidField]) {
        inputRefs.current[firstInvalidField].scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        inputRefs.current[firstInvalidField].focus();

        onLog?.(
          `EVENT-DRIVEN FOCUS: ${firstInvalidField}`
        );
      }

      return;
    }

    onLog?.('FORM SUBMITTED: All fields are valid.');
  };

  return (
    <section className="form-card refactored">
      <div className="form-card-header">
        <div>
          <h2 className="form-card-title">
            Refactored SimpleForm
          </h2>

          <p className="form-card-description">
            React 19 pattern using synchronous derived state and a
            single source of truth.
          </p>
        </div>

        <span className="architecture-badge">
          React 19 Derived State
        </span>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div
          ref={(element) => {
            inputRefs.current.username =
              element?.querySelector('input') ?? null;
          }}
        >
          <RefactoredInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Enter username (min. 3 characters)"
            value={values.username}
            error={visibleErrors.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div
          ref={(element) => {
            inputRefs.current.email =
              element?.querySelector('input') ?? null;
          }}
        >
          <RefactoredInputField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email address"
            value={values.email}
            error={visibleErrors.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div
          ref={(element) => {
            inputRefs.current.password =
              element?.querySelector('input') ?? null;
          }}
        >
          <RefactoredInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password (min. 6 characters)"
            value={values.password}
            error={visibleErrors.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <button
          type="submit"
          className="btn btn-submit"
          disabled={!isValid}
        >
          Submit Refactored Form
        </button>

        {!isValid && (
          <div className="form-status info">
            Complete all fields correctly to enable submission.
          </div>
        )}

        {isValid && (
          <div className="form-status success">
            All fields are valid. Form is ready to submit.
          </div>
        )}
      </form>

      <div style={{ marginTop: '20px' }}>
        <span className="render-counter-badge">
          0 useEffect chains
        </span>
      </div>
    </section>
  );
}

export default RefactoredSimpleForm;
