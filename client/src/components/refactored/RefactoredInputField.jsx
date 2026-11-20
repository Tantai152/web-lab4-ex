
/**
 * LAB 4 - EXERCISE 1.3
 * Refactored React 19: Stateless InputField
 *
 * Architecture:
 * - Zero useState hooks.
 * - Zero useEffect hooks.
 * - No duplicated local state.
 * - Fully controlled component.
 * - Single source of truth: RefactoredSimpleForm.
 */

function RefactoredInputField({
  name,
  label,
  type = 'text',
  placeholder = '',
  value = '',
  error = '',
  onChange,
  onBlur
}) {
  const inputId = `refactored-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="form-group">
      <label
        className="form-label"
        htmlFor={inputId}
      >
        {label}
      </label>

      <input
        id={inputId}
        name={name}
        type={type}
        className={`form-input ${error ? 'has-error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur?.(name)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />

      {error && (
        <span
          id={errorId}
          className="error-text"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
}

export default RefactoredInputField;
