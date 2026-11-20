
import { useEffect, useRef, useState } from 'react';

/**
 * LAB 4 - EXERCISE 1.3
 * Legacy Anti-Pattern: InputField
 *
 * Demonstrates:
 * - Redundant local state duplication.
 * - useEffect #1: syncToParent()
 * - Synchronization of external errors into local state.
 * - useEffect #5: autoScrollToError()
 * - Render-cycle execution logging.
 */

function LegacyInputField({
  name,
  label,
  type = 'text',
  placeholder = '',
  value,
  externalError = '',
  onChangeParent,
  onLog,
  onRenderCount
}) {
  // 1. Local State Duplication (Anti-Pattern)
  const [localValue, setLocalValue] = useState(value || '');
  const [localError, setLocalError] = useState('');

  const inputRef = useRef(null);

  // Render Logging
  onLog?.(`InputField[${name}] render (local state)`);
  onRenderCount?.();

  // Effect #1: Synchronize Local Input State to Parent
  useEffect(() => {
    onLog?.('useEffect #1: syncToParent()');

    onChangeParent(name, localValue);
  }, [localValue]);

  // Synchronize Parent Error Prop into Local State
  useEffect(() => {
    if (externalError !== localError) {
      onLog?.('InputField re-render (errors)');
      setLocalError(externalError);
    }
  }, [externalError]);

  // Effect #5: Automatically Scroll to Invalid Input
  useEffect(() => {
    if (localError) {
      onLog?.('useEffect #5: autoScrollToError()');

      if (inputRef.current) {
        // Simulate automatic scrolling and focusing.
        inputRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        inputRef.current.focus();
      }
    }
  }, [localError]);

  // Handle local input changes
  const handleChange = (event) => {
    setLocalValue(event.target.value);
  };

  return (
    <div className="form-group">
      <label
        className="form-label"
        htmlFor={`legacy-${name}`}
      >
        {label}
      </label>

      <input
        ref={inputRef}
        id={`legacy-${name}`}
        name={name}
        type={type}
        className={`form-input ${localError ? 'has-error' : ''}`}
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        aria-invalid={Boolean(localError)}
        aria-describedby={
          localError ? `legacy-${name}-error` : undefined
        }
      />

      {localError && (
        <span
          id={`legacy-${name}-error`}
          className="error-text"
          role="alert"
        >
          {localError}
        </span>
      )}
    </div>
  );
}

export default LegacyInputField;
