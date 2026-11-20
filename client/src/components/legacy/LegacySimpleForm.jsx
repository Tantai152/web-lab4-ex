
import { useState, useEffect } from 'react';
import LegacyInputField from './LegacyInputField.jsx';
import {
  validateAllFields,
  isFormObjectValid
} from '../../utils/validation.js';

/**
 * LAB 4 - EXERCISE 1.3
 * Legacy Anti-Pattern: SimpleForm
 *
 * Demonstrates the chained useEffect architecture:
 *
 * Effect #1: syncToParent()       -> LegacyInputField
 * Effect #2: validateField()      -> LegacySimpleForm
 * Effect #3: calcFormValidity()   -> LegacySimpleForm
 * Effect #4: syncErrorsToChild()  -> LegacySimpleForm
 * Effect #5: autoScrollToError()  -> LegacyInputField
 *
 * Anti-patterns:
 * - Fragmented parent state.
 * - Redundant child state.
 * - useEffect-based state synchronization.
 * - Multiple cascading render cycles.
 */

function LegacySimpleForm({ onLog, onRenderCount }) {
  // 1. Fragmented Parent State (Anti-Pattern)
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [syncedChildErrors, setSyncedChildErrors] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [isValid, setIsValid] = useState(false);

  // Render Tracking
  onLog?.('SimpleForm render (parent state)');
  onRenderCount?.();

  // Parent handler called by LegacyInputField
  const handleChangeParent = (name, value) => {
    setValues((previousValues) => ({
      ...previousValues,
      [name]: value
    }));
  };

  // Effect #2: Validate Fields
  // Triggered whenever parent form values change.
  useEffect(() => {
    onLog?.('useEffect #2: validateField()');

    setErrors(validateAllFields(values));
  }, [values]);

  // Effect #3: Calculate Overall Form Validity
  // Triggered whenever values or errors change.
  useEffect(() => {
    onLog?.('useEffect #3: calcFormValidity()');

    setIsValid(isFormObjectValid(values, errors));
  }, [values, errors]);

  // Effect #4: Synchronize Parent Errors into Child Components
  // Triggered whenever validation errors change.
  useEffect(() => {
    onLog?.('useEffect #4: syncErrorsToChild()');

    setSyncedChildErrors({ ...errors });

    onLog?.(
      'CASCADE DETECTED: 5 re-renders / 1 keypress'
    );

    onLog?.(
      'WARNING: Race Conditions & Maximum update depth exceeded risk'
    );
  }, [errors]);

  // Form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) {
      onLog?.('SUBMIT BLOCKED: Form contains validation errors.');
      return;
    }

    onLog?.('FORM SUBMITTED: All fields are valid.');
  };

  return (
    <section className="form-card legacy">
      <div className="form-card-header">
        <div>
          <h2 className="form-card-title">
            Legacy SimpleForm
          </h2>

          <p className="form-card-description">
            useEffect chaining with duplicated parent and child state.
          </p>
        </div>

        <span className="architecture-badge">
          5-useEffect Anti-Pattern
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <LegacyInputField
          name="username"
          label="Username"
          type="text"
          placeholder="Enter username (min. 3 characters)"
          value={values.username}
          externalError={syncedChildErrors.username}
          onChangeParent={handleChangeParent}
          onLog={onLog}
          onRenderCount={onRenderCount}
        />

        <LegacyInputField
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email address"
          value={values.email}
          externalError={syncedChildErrors.email}
          onChangeParent={handleChangeParent}
          onLog={onLog}
          onRenderCount={onRenderCount}
        />

        <LegacyInputField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter password (min. 6 characters)"
          value={values.password}
          externalError={syncedChildErrors.password}
          onChangeParent={handleChangeParent}
          onLog={onLog}
          onRenderCount={onRenderCount}
        />

        <button
          type="submit"
          className="btn btn-submit"
          disabled={!isValid}
        >
          Submit Legacy Form
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
          Legacy Architecture: Effect-driven synchronization
        </span>
      </div>
    </section>
  );
}

export default LegacySimpleForm;
